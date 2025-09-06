import { Tabs } from "expo-router"

const GroupLayout = () => {
  return (
    <Tabs screenOptions={{
      headerShown: false,
    }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="chart" />
      <Tabs.Screen name="router" />
      <Tabs.Screen name="createPlayersModal" options={{ href: null }} />
    </Tabs>
  )
};

export default GroupLayout;
