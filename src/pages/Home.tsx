import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = { /* Tipó de dados em formato de objeto */
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) { /* função adiciona a tarefa, ao array de estados, vindo  */
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle)

    if(taskWithSameTitle){
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }
    
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldTasks => [...tasks, newTask]) /* adiciona a nova tarefa ao final do array, juntamente com as tarefas, que, o array já possuia */

  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({...task}))

    const foundItem = updatedTasks.find(item => item.id === id);

    if (!foundItem)
      return;

      foundItem.done = !foundItem.done;
      setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',

        onPress: () => {
          const updatedTasks =  tasks.filter(task => task.id !== id); /* o "updatedTasks" são as tarefas, filtrando a tarefa recebida pelo id */
    
          setTasks(updatedTasks);
        }
        
      }
    ])
  }

  function handleEditTask({ taskId, taskNewTitle } : EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({...task})) /* desestruturação e copia do array  */

    const taskToBeUpdated = updatedTasks.find(task => task.id === taskId); /* verifica se existe o id da task */

    if (!taskToBeUpdated)
      return;

      taskToBeUpdated.title = taskNewTitle; /* Atualiza o titulo */
      setTasks(updatedTasks); /* seta o novo estado de tasks com o titulo atualizado */

  }

  return (
    <View style={styles.container}>
      {/* o Atributo taskCounter do Header recebe a quantidade de tasks, no array de estados, e, pega o valor utilizando a propriedade "lenght"  */}
      <Header tasksCounter={tasks.length} /> 
      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})