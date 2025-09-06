import { Stack } from 'expo-router'

const AuthRoutesLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  )
};

export default AuthRoutesLayout;
