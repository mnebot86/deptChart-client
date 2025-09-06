import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { useUser } from '@/store/users'
import { Button, ButtonText } from './ui/button';

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const { clearUser } = useUser();

  const handleSignOut = async () => {
    try {
      clearUser();
      await signOut();

      Linking.openURL(Linking.createURL('/login'))
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <Button size="lg" className="mt-3 bg-red-700" onPress={handleSignOut}>
      <ButtonText>Sign out</ButtonText>
    </Button>
  )
}
