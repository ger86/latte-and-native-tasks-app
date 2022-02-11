import React, {useState} from 'react';
import {
  Box,
  Heading,
  Input,
  VStack,
  HStack,
  Text,
  AddIcon,
  Checkbox,
  IconButton,
  CloseIcon,
  useToast
} from 'native-base';

const initialTasks = [
  {
    title: 'Preparar contenido del capítulo',
    isCompleted: true
  },
  {
    title: 'Escribir capítulo',
    isCompleted: false
  },
  {
    title: 'Preparar soluciones',
    isCompleted: false
  }
];

export default function TasksList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [inputValue, setInputValue] = useState('');
  const toast = useToast();

  function handleDelete(indexToDelete) {
    setTasks(function (currentTasks) {
      return currentTasks.filter((_, index) => index !== indexToDelete);
    });
  }

  function handleStatusChange(indexToChange) {
    setTasks(function (currentTasks) {
      const newTasks = [...currentTasks];
      newTasks[indexToChange].isCompleted = !newTasks[indexToChange].isCompleted;
      return newTasks;
    });
  }

  function onChangeText(v) {
    setInputValue(v);
  }

  function addTask() {
    if (inputValue !== '') {
      toast.show({
        title: 'Tarea creada',
        status: 'success'
      });
      setTasks(function (currentTasks) {
        return [
          ...currentTasks,
          {
            title: inputValue,
            isCompleted: false
          }
        ];
      });
    }
  }

  return (
    <Box>
      <Heading mb="2" size="md">
        Tareas
      </Heading>
      <VStack>
        <Box>
          <HStack space={2} h={8} mb={4}>
            <Input
              flex={1}
              onChangeText={onChangeText}
              value={inputValue}
              placeholder="Añadir tarea"
            />
            <IconButton
              borderRadius="sm"
              variant="solid"
              icon={<AddIcon size={4} />}
              onPress={addTask}
            />
          </HStack>
        </Box>
        {tasks.map((task, index) => (
          <HStack
            w="100%"
            h="25"
            mb={5}
            justifyContent="space-between"
            alignItems="center"
            key={task.title}
          >
            <Checkbox
              isChecked={task.isCompleted}
              onChange={() => handleStatusChange(index)}
              value={task.title}
              accessibilityLabel={task.title}
            />
            <Text
              width="100%"
              flexShrink={1}
              textAlign="left"
              mx="2"
              strikeThrough={task.isCompleted}
            >
              {task.title}
            </Text>
            <IconButton
              size="sm"
              colorScheme="trueGray"
              icon={<CloseIcon size={4} />}
              onPress={() => handleDelete(index)}
            />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
