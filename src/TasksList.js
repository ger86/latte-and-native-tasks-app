import React, {useState} from 'react';
import {
  Input,
  IconButton,
  Checkbox,
  Text,
  Box,
  VStack,
  HStack,
  Heading,
  Center,
  useToast,
  AddIcon,
  CloseIcon
} from 'native-base';

const instState = [
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
  const [list, setList] = useState(instState);
  const [inputValue, setInputValue] = useState('');
  const toast = useToast();

  function addItem(title) {
    if (title === '') {
      toast.show({
        title: 'Please Enter Text',
        status: 'warning'
      });
      return;
    }

    setList(function (prevList) {
      return [
        ...prevList,
        {
          title: title,
          isCompleted: false
        }
      ];
    });
  }

  function handleDelete(index) {
    setList((prevList) => {
      return prevList.filter((_, itemI) => itemI !== index);
    });
  }

  function handleStatusChange(index) {
    setList((prevList) => {
      const newList = [...prevList];
      newList[index].isCompleted = !newList[index].isCompleted;
      return newList;
    });
  }

  return (
    <Center w="100%">
      <Box maxW="300" w="100%">
        <Heading mb="2" size="md">
          Tareas
        </Heading>
        <VStack space={4}>
          <HStack space={2} h={8} mb={4}>
            <Input
              flex={1}
              onChangeText={(v) => setInputValue(v)}
              value={inputValue}
              placeholder="Add Task"
            />
            <IconButton
              borderRadius="sm"
              variant="solid"
              icon={<AddIcon size={4} />}
              onPress={() => {
                addItem(inputValue);
                setInputValue('');
              }}
            />
          </HStack>
          <VStack space={2}>
            {list.map((item, itemI) => (
              <HStack
                w="100%"
                h="25"
                mb={5}
                justifyContent="space-between"
                alignItems="center"
                key={item.title + itemI.toString()}
              >
                <Checkbox
                  isChecked={item.isCompleted}
                  onChange={() => handleStatusChange(itemI)}
                  value={item.title}
                  accessibilityLabel={item.title}
                />
                <Text
                  width="100%"
                  flexShrink={1}
                  textAlign="left"
                  mx="2"
                  strikeThrough={item.isCompleted}
                  _light={{
                    color: item.isCompleted ? 'gray.400' : 'coolGray.800'
                  }}
                  _dark={{
                    color: item.isCompleted ? 'gray.400' : 'coolGray.50'
                  }}
                  onPress={() => handleStatusChange(itemI)}
                >
                  {item.title}
                </Text>
                <IconButton
                  size="sm"
                  colorScheme="trueGray"
                  icon={<CloseIcon size={4} />}
                  onPress={() => handleDelete(itemI)}
                />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </Center>
  );
}
