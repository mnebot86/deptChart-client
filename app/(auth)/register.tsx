import React, { useState } from 'react'
import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo'
import type { ClerkAPIError } from '@clerk/types'
import { Link, useRouter } from 'expo-router'
import ScreenLayout from '@/components/ScreenLayout'
import { createUserAtRegister } from '@/api/users'
import { Center } from '@/components/ui/center'
import { Box } from '@/components/ui/box'
import { Heading } from '@/components/ui/heading'
import { Input, InputField } from '@/components/ui/input'
import { Button, ButtonText } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { HStack } from '@/components/ui/hstack'

const RegisterScreen = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [errors, setErrors] = React.useState<ClerkAPIError[]>()

  const onSignUpPress = async () => {
    setErrors(undefined);

    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true);
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
    }
  }

  const onVerifyPress = async () => {
    setErrors(undefined);

    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });

        try {
          await createUserAtRegister({ email: emailAddress, firstName, lastName });
        } catch (apiErr: any) {
          setErrors([{
            message: apiErr?.toString?.() || 'Failed to create user',
            longMessage: apiErr?.toString?.() || 'Failed to create user'
          } as ClerkAPIError]);
        }

        router.replace('/');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const card = 'border border-gray-300 rounded-lg p-4 w-full max-w-md';

  if (pendingVerification) {
    return (
      <ScreenLayout>
        <Center className='flex-1 gap-4'>
          <Box className={card}>
            <Heading className="mb-3" size="2xl">Verify your email</Heading>

            <Input size="lg" className="mt-3">
              <InputField
                value={code}
                placeholder="Enter your verification code"
                onChangeText={(code) => setCode(code)}
              />
            </Input>

            <Button size="lg" className="mt-3" onPress={onVerifyPress}>
              <ButtonText>Verify</ButtonText>
            </Button>
          </Box>

          {errors && (
            <Box className="mt-2">
              {errors.map((error, index) => (
                <Text key={index} className="text-red-700">
                  {error.longMessage}
                </Text>
              ))}
            </Box>
          )}
        </Center>
      </ScreenLayout>
    )
  }

  return (
    <ScreenLayout>
      <Center className='flex-1 gap-4'>
        <Box className={card}>
          <Heading className="mb-3" size="5xl">Sign up</Heading>

          <HStack space="md" className='w-full'>
            <Input size="lg" className='flex-1'>
              <InputField
                value={firstName}
                placeholder="First name"
                onChangeText={(firstName) => setFirstName(firstName)}
              />
            </Input>

            <Input size="lg" className='flex-1'>
              <InputField
                value={lastName}
                placeholder="Last name"
                onChangeText={(lastName) => setLastName(lastName)}
              />
            </Input>
          </HStack>

          <Input size="lg" className="mt-3">
            <InputField
              autoCapitalize="none"
              value={emailAddress}
              onChangeText={(email) => setEmailAddress(email)}
              placeholder="Enter email"
            />
          </Input>

          <Input size="lg" className="mt-3">
            <InputField
              autoCapitalize="none"
              value={password}
              placeholder="Enter password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </Input>

          <Button size="lg" className="mt-3" onPress={onSignUpPress}>
            <ButtonText>Continue</ButtonText>
          </Button>

          <HStack space="md" className="mt-3">
            <Text>Already have an account?</Text>

            <Link href="/login">
              <Text>Sign in</Text>
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

export default RegisterScreen;
