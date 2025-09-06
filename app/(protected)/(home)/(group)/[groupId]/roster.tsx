import React, { useCallback, useEffect, useState } from "react";
import { ScreenLayout } from "@/components"
import { router, useFocusEffect } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { getPlayers } from "@/api/players";
import { useGroup } from "@/store/groups";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonIcon } from "@/components/ui/button";
import { AddIcon } from "@/components/ui/icon";

const RosterScreen = () => {
  const { activeGroupId } = useGroup();

  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchPlayers = async () => {
        if (!activeGroupId) return;

        setLoading(true);

        try {
          const fetch = await getPlayers(activeGroupId);
          setPlayers(fetch);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      fetchPlayers();
    }, [activeGroupId])
  );

  const handleShowModal = useCallback(() => {
    router.push('./createPlayersModal')
  }, [router]);

  const renderItem = (({ item }: { item: { firstName: string, lastName: string } }) => {
    return (
      <Box className="p-1.5 rounded-md border border-gray-300 shadow-md mb-8">
        <Text>{item.firstName} {item.lastName}</Text>
      </Box>
    )
  })

  return (
    <ScreenLayout>
      {/* Action Bar Component */}
      <HStack className="p-1.5 rounded-md border border-gray-300 shadow-md mb-8">
        <Button size="lg" className="rounded-8 p-3.5" onPress={handleShowModal}>
          <ButtonIcon as={AddIcon} />
        </Button>
      </HStack>

      {/* Player List */}
      <FlashList
        data={players}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}

export default RosterScreen;
