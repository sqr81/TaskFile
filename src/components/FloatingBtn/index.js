import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
export default function floatingBtn({toggle, isOpen }) {
    return (
            <Pressable onPress={toggle} style={styles.btn}>
                <Text style = {styles.txt}>{isOpen ? "X" : "+"}</Text>
            </Pressable>
    );
}

const styles = StyleSheet.create({
    btn: {
        position: "absolute",
        right: 20,
        bottom: 20,
        backgroundColor: "orange",
        borderRadius:40,
        height:40,
        width:40,
        justifyContent: "center",
    },
    txt: {
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold",
        color:"white",
    }
})