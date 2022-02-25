import React, {useState} from 'react';
import {View, Button, TextInput, StyleSheet} from 'react-native';

export default function TaskForm({onAddTask}) {
  const [newTitle, setNewTitle] = useState('');

  const onChangeText = val => {
    setNewTitle(val);
  };

  const onAddNewTask = () => {
    if (newTitle === '') return;
    onAddTask(newTitle);
    setNewTitle('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={newTitle}
        placeholder="Nouvelle tâche"
      />
      <Button title="Ajouter" onPress={onAddNewTask} color="#841584" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },

  input: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    width: '70%',
    height: 40,
  },
});
