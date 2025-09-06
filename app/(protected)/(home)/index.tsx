import React, { useCallback, useEffect, useState } from 'react';
import { ScreenLayout } from '@/components'
import { getLoggedUser } from '@/api/users';
import { useUser } from '@/store/users';
import { useGroup } from '@/store/groups';
import { getGroups } from '@/api/groups';
import { FlashList } from "@shopify/flash-list";
import { IGroup, joinGroup } from '@/api/groups';
import { router } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { HStack } from '@/components/ui/hstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';

const Dashboard = () => {
  const { setUser, user } = useUser();
  const { setActiveGroupId } = useGroup();

  const [code, setCode] = useState('');
  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getLoggedUser();

        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.log('No logged user', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await getGroups();

      setGroups(res);
    }

    if (!user) return;

    fetchGroups()
  }, [user]);

  const handleShowModal = useCallback(() => {
    router.push('./createGroupModal')
  }, [router]);

  const submitJoinGroup = useCallback(async () => {
    if (!code) return;

    const payload = { code };

    try {
      const join = await joinGroup(payload);

      setGroups((prev) => [...prev, join]);
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error:', error.message);
      } else {
        console.log('Unknown error:', JSON.stringify(error, null, 2));
      }
    }
  }, [code]);

  const selectTeam = useCallback((id: string) => {
    setActiveGroupId(id);

    router.push(`/${id}`);
  }, [router, setActiveGroupId]);

  const renderItem = ({ item }: { item: IGroup }) => (
    <Pressable onPress={() => selectTeam(item._id)}>
      <Box className='border p-4 rounded-lg mb-4'>
        <Text>{item.name}</Text>
      </Box>
    </Pressable>
  );

  return (
    <ScreenLayout>
      {/* Search Bar */}
      <Box className='border p-4 rounded-lg mb-4'>
        <Heading>Create or Find Group</Heading>

        <Input className="mt-4" size="xl">
          <InputField
            placeholder="Enter code"
            value={code}
            onChangeText={setCode}
          />
        </Input>

        <HStack className="mt-4 justify-around">
          <Button size='xl' onPress={handleShowModal}>
            <ButtonText>Create</ButtonText>
          </Button>

          <Button size='xl' onPress={submitJoinGroup}>
            <ButtonText>Join</ButtonText>
          </Button>
        </HStack>
      </Box>

      {/* Group List */}
      <Box className="flex-1">
        <FlashList
          data={groups}
          renderItem={renderItem}
        />
      </Box>
    </ScreenLayout>
  )
}

export default Dashboard;
