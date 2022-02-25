/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from "react-native"

import TaskTile from './TaskTile';
import Header from '../../components/Header';
import TaskForm from './TaskForm';
import FloatingBtn from '../../components/FloatingBtn';
import Counter from '../../components/Counter';

export default function TasksScreen() {
    //Liste de taches
    //State pour garder en memoire les taches
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [tasks, setTasks] = useState([])

    //item = {title: "Hello world", isCompleted: false}
    const renderItem = ({ item }) => {
        return <TaskTile task={item} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />
    }

    //ajouter une fonction qui ajoute une tache au state

    //passer cette fonction au form
    const onAddTask = (title) => {
        setTasks([...tasks, {
            id: Date.now(),
            title,
            isCompleted: false
        }])
    }

    const onDeleteTask = (id) => {
        let newTasks = []

        tasks.forEach(t => {
            //si l id est different de l'id passe en param de la fonction
            if (t.id !== id) {
                newTasks.push(t)
                return
            }
        })
        setTasks(newTasks)
    }

    const onUpdateTask = (id) => {
        //creation nouvel array
        let newTasks = []
        //iteration sur les taches deja presente dans le state
        tasks.forEach(t => {
            //si l id est different de l'id passe en param de la fonction
            if (t.id !== id) {
                newTasks.push(t)
                return
            }
            //modifier la tache
            newTasks.push({
                //id est le meme que celui en param
                id,
                title: t.title,
                isCompleted: !t.isCompleted
            })
        })

        //on passe a la fonction setTasks le nouvel array newTasks
        setTasks(newTasks)
    }

    const _toggleForm = () => {
        setIsFormVisible(!isFormVisible)
    }

    // 2x TaskCounter => props nb & title
    // TasksList => retourner FlatList => TaskTile
    //Ajouter un boutton flottant => style absolute
    //callbak => rendu conditionnel du form
    return (
        <>
            <FlatList
                ListHeaderComponent={
                    <>
                        <Header />
                        {isFormVisible && <TaskForm onAddTask={onAddTask} />}
                        <View style={styles.containerCounters}>
                            <Counter nb={tasks.length} title="Tâches crées" />
                            <Counter nb={tasks.filter(t => t.isCompleted === true).length} title="Tâches effectuées" />
                        </View>
                    </>
                }
                contentContainerStyle={{ flexGrow: 1 }}
                data={tasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
            <FloatingBtn toggle={_toggleForm} isOpen={isFormVisible} />
        </>
    );
}

const styles = StyleSheet.create({
    containerCounters:{
        flexDirection:"row",
        justifyContent: "space-between",
        marginTop: 10,
        paddingHorizontal: 20,
    }
})
