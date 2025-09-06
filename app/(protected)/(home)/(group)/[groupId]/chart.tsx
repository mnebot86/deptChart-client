import { DataGrid, ScreenLayout } from "@/components"
import { useGroup } from '@/store/groups';
import { useCallback, useEffect, useState } from "react";
import { getSocket } from '@/api/socket';
import { getPlayersByUnit, updatePlayerString } from "@/api/players";
import { Text } from "@/components/ui/text";

const ChartScreen = () => {
  const { activeGroupId } = useGroup();

  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = getSocket();

    socket.on('player:string-updated', (updatedPlayer) => {
      setData((prev) => {
        const playerIndex = prev.findIndex((player) => player.id === updatedPlayer.id);

        if (playerIndex === -1) return prev;

        const updated = [...prev];

        updated[playerIndex] = updatedPlayer;

        return updated;
      });
    });

    return () => {
      socket.off('player:string-updated');
    };
  }, []);

  useEffect(() => {
    const fetchUnits = async () => {
      if (!activeGroupId) return;

      const res = await getPlayersByUnit(activeGroupId, 'OFFENSE');

      setData(res);
    }

    fetchUnits();
  }, [activeGroupId]);

  const columns = [
    { key: 'stringFirst', title: '1st' },
    { key: 'stringSecond', title: '2nd' },
    { key: 'stringThird', title: '3rd' },
    { key: 'stringFourth', title: '4th' },
  ];

  const sideColumns = [
    { key: 'quarterback', title: 'QB' },
    { key: 'runningback', title: 'RB' },
    { key: 'wideReceiver', title: 'WR' },
    { key: 'center', title: 'C' },
    { key: 'rightTackle', title: 'RT' },
    { key: 'leftGuard', title: 'LG' },
    { key: 'rightGuard', title: 'RG' },
    { key: 'tightend', title: 'TE' },
    { key: 'fullback', title: 'FB' },
  ];

  const menuItems = [{
    label: 'Switch to 1st',
    value: 'stringFirst'
  }, {
    label: 'Switch to 2nd',
    value: 'stringSecond'
  }, {
    label: 'Switch to 3rd',
    value: 'stringThird'
  }, {
    label: 'Switch to 4th',
    value: 'stringFourth'
  }]

  const handleStringChange = useCallback(async ({ player, value }) => {
    if (!player || !value) return;

    try {
      const rest = await updatePlayerString(player.id, {
        unit: player.unit,
        position: player.position,
        string: value,
      });

    } catch (error) {
      console.error('Failed to update player string:', error);
    }
  }, []);

  return (
    <ScreenLayout>
      <Text className="mb-6">Dept Chart</Text>

      <DataGrid
        data={data}
        columns={columns}
        sideColumns={sideColumns}
        menuItems={menuItems}
        onMenuPress={handleStringChange}
      />
    </ScreenLayout>
  )
}

export default ChartScreen;
