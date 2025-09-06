import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text } from 'react-native'
import React from 'react'
import ScreenLayout from '@/components/ScreenLayout'
import type { ClerkAPIError } from '@clerk/types'
import { Box } from '@/components/ui/box'
import { Heading } from '@/components/ui/heading'
import { Input, InputField } from '@/components/ui/input'
import { Button, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import { Center } from '@/components/ui/center'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errors, setErrors] = React.useState<ClerkAPIError[]>()

  const onSignInPress = async () => {
    setErrors(undefined);

    if (!isLoaded) return

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });

        router.replace('/');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const card = 'border border-gray-300 rounded-lg p-4 w-full max-w-md';

  return (
    <ScreenLayout>
      <Center className='flex-1 gap-4'>
        <Box className={card}>
          <Heading size="5xl">Sign in</Heading>

          <Input size="lg" className="mt-3">
            <InputField
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter email address"
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            />
          </Input>

          <Input size="lg" className="mt-3">
            <InputField
              value={password}
              placeholder="Enter password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </Input>

          <Button size="lg" className="mt-3" onPress={onSignInPress}>
            <ButtonText>Continue</ButtonText>
          </Button>

          <HStack space="md" className="mt-3">
            <Text>Already have an account?</Text>

            <Link href="/register">
              <Text>Sign up</Text>
            </Link>
          </HStack>

          {errors && (
            <Box className="mt-2">
              {errors.map((error, index) => (
                <Text key={index} className="text-red-700">
                  {error.longMessage}
                </Text>
              ))}
            </Box>
          )}
        </Box>
      </Center>
    </ScreenLayout>
  )
}
