import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useAuth } from '@clerk/clerk-expo'
import { useUser } from '@/store/users';

const ProtectedLayout = () => {
  const { isSignedIn, isLoaded } = useAuth()
  const { clearUser } = useUser();

  if (!isLoaded) {
    return <GestureHandlerRootView style={{ flex: 1 }} />
  }

  if (!isSignedIn) {
    clearUser();

    return <Redirect href='/login' />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer initialRouteName="(home)">
        <Drawer.Screen
          name="(home)"
          options={{
            drawerLabel: 'Home',
            title: 'Dashboard',
          }}
        />

        <Drawer.Screen
          name="(settings)"
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

export default ProtectedLayout;
