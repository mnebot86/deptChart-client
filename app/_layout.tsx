import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'

import 'react-native-reanimated';
import '@/global.css';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <GluestackUIProvider mode="light">
        <Slot />
      </GluestackUIProvider>
    </ClerkProvider>
  )
}
