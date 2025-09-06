import { ScreenLayout } from "@/components";
import { useCallback, useState } from "react";
import { useGroup } from "@/store/groups";
import { router } from "expo-router";
import { createPlayers } from "@/api/players";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { AddIcon, RemoveIcon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";

const CreatePlayerModal = () => {
  const { activeGroupId } = useGroup();

  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([{ firstName: '', lastName: '' }]);

  const onCancel = useCallback(() => {
    setPlayers([{ firstName: '', lastName: '' }]);
    router.back();
  }, [router]);

  const handleRemovePlayer = (indexToRemove: number) => {
    setPlayers(players.filter((_, index) => index !== indexToRemove));
  };

  const handleCreatePlayers = useCallback(async () => {
    if (!activeGroupId) return;

    setLoading(true);

    try {
      await createPlayers({
        groupId: activeGroupId,
        players: players.map(player => ({
          firstName: player.firstName.trim(),
          lastName: player.lastName.trim()
        }))
      });

      router.back();
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error:', error.message);
      } else {
        console.log('Unknown error:', JSON.stringify(error, null, 2));
      }
    } finally {
      setLoading(false);
    }
  }, [activeGroupId, players, router]);

  return (
    <ScreenLayout>
      <Heading size="4xl">Add Players</Heading>

      <VStack className="flex-1 flex-col justify-between">
        <VStack className="w-full mt-4 mb-4">
          <Text>Player Name</Text>

          {players.map((player, index) => (
            <HStack key={index} className="w-full gap-2 mb-2 items-center">
              <Input size="xl" className="flex-1">
                <InputField
                  placeholder="First name"
                  value={player.firstName}
                  onChangeText={(text) => {
                    const updatedPlayers = [...players];
                    updatedPlayers[index].firstName = text;
                    setPlayers(updatedPlayers);
                  }}
                />
              </Input>

              <Input size="xl" className="flex-1">
                <InputField
                  placeholder="Last name"
                  value={player.lastName}
                  onChangeText={(text) => {
                    const updatedPlayers = [...players];
                    updatedPlayers[index].lastName = text;
                    setPlayers(updatedPlayers);
                  }}
                />
              </Input>

              {players.length > 1 && (
                <Button
                  variant="link"
                  onPress={() => handleRemovePlayer(index)}
                  className="ml-2"
                >
                  <ButtonIcon as={RemoveIcon} />
                </Button>
              )}
            </HStack>
          ))}

          <Button
            onPress={() => setPlayers([...players, { firstName: '', lastName: '' }])}
            className="self-end"
          >
            <ButtonIcon as={AddIcon} />
          </Button>
        </VStack>

        <Box className="pb-6">
          <Button size="xl" onPress={handleCreatePlayers}>
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
      </VStack>
    </ScreenLayout>
  )
}

export default CreatePlayerModal;
