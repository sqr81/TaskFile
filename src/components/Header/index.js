import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const days = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];
const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

export default function Header() {
  const date = new Date();

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{`${days[date.getDay()]} ${date.getDate()} ${
        months[date.getMonth()]} ${date.getFullYear()
      }`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 25,
    paddingTop: 20,
  },
  date: {
    fontSize: 26,
    fontWeight: 'bold'
  }
});
