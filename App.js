import {Center, NativeBaseProvider} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';
import TasksList from '#/TasksList';

export default function App() {
  return (
    <SafeAreaView>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <TasksList />
        </Center>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
