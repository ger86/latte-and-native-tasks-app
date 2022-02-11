import React from 'react';
import {Box, NativeBaseProvider} from 'native-base';
import TasksList from '#/TasksList';
import {SafeAreaView} from 'react-native';

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <Box py="4" px="3">
          <TasksList />
        </Box>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
