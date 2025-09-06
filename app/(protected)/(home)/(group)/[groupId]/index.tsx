import React from 'react';
import { ScreenLayout } from '@/components';
import { useLocalSearchParams, router } from 'expo-router';
import { useGroup } from '@/store/groups';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
const GroupScreen = () => {
  const { groupId } = useLocalSearchParams();
  const { activeGroupId } = useGroup();

  return (
    <ScreenLayout>
      <Button variant='link' onPress={() => router.back()}>
        <ButtonText>Back</ButtonText>
      </Button>

      <Text>Params ID: {groupId}</Text>
      <Text>Active ID: {activeGroupId}</Text>

      {/* Coaches */}
      {/* roster */}
    </ScreenLayout>
  );
};

export default GroupScreen;
