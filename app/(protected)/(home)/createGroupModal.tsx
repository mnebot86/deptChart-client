import { createGroup } from "@/api/groups";
import { ScreenLayout } from "@/components";
import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { useCallback, useState } from "react";

const CreateGroupModal = () => {
  const [groupName, setGroupName] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const createGroups = useCallback(async () => {
    if (!code || !groupName) return;

    setLoading(true);

    const payload = {
      code,
      name: groupName
    };

    try {
      const res = await createGroup(payload);

      if (res) {
        console.log({ res });
      }
    } catch (error) {
      console.log('Error: ', JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  }, [code, groupName, loading]);

  const onCancel = useCallback(() => {
    setGroupName('');
    setCode('');

    router.back();
  }, [])

  return (
    <ScreenLayout>
      <Box>
        <Heading className="mb-8">Create A New Group</Heading>

        <VStack>
          <Input size="xl">
            <InputField
              placeholder="Enter group name"
              value={groupName}
              onChangeText={setGroupName}
            />
          </Input>

          <Input size="xl" className='mt-4 mb-4'>
            <InputField
              placeholder="Enter code"
              value={code}
              onChangeText={setCode}
            />
          </Input>
        </VStack>

        <Button size="xl" className="mb-4" onPress={createGroups}>
          {loading ? (
            <ButtonSpinner color="gray" />
          ) : (
            <ButtonText>Submit</ButtonText>
          )}
        </Button>

        <Button size="xl" onPress={onCancel}>
          <ButtonText>Cancel</ButtonText>
        </Button>
      </Box>
    </ScreenLayout>
  )
};

export default CreateGroupModal;
