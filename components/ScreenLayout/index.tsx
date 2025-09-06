import { SafeAreaView, StyleSheet } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { Box } from '@/components/ui/box';

const ScreenLayout = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Box className='flex-1 p-4'>
        {children}
      </Box>
    </SafeAreaView>
  )
};

export default ScreenLayout;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
