import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface TodoInputProps {
  addTask: (task: string) => void;
}

export function TodoInput({ addTask }: TodoInputProps) {
   const [task, setTask] = useState('');

  function handleAddNewTask() { /* Função que adiciona uma nova tarefas */
    if(task !== ''){
      addTask(task);
      setTask('');
    }
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.input} 
        placeholder="Adicionar uma nova tarefa..."
        placeholderTextColor="#B2B2B2"
        returnKeyType="send"
        selectionColor="#666666"
        value={task} /* nome da tarefa */
        onChangeText={setTask} /* No campo input ele captura o que é digitado e seta a tarefa com o "setTask" */
        onSubmitEditing={handleAddNewTask} /* Faz com que, ao clicar no enviar do teclado, chame a função e adiciona uma nova tarefa */
      />
      <TouchableOpacity
        testID="add-new-task-button"
        activeOpacity={0.7}
        style={styles.addButton}
        onPress={handleAddNewTask} /* Ao clicar no botão, chama a função de adicionar uma nova tarefa */
      >
        <Icon name="chevron-right" size={24} color="#B2B2B2" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginTop: -28,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 1,
    borderRightColor: '#EBEBEB',
    color: '#666666'
  },
  addButton: {
    backgroundColor: '#FFF',
    height: 56,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});