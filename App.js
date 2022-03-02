/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
 import axios from 'axios';
 
 import TasksScreen from './src/screens/Tasks';
 import useCurrentLocationWeather from './src/hooks/useCurrentLocationWeather';
 import ShowModal from './src/components/modal/Index';
 
 // !!!! cle api a mettre dans un.env !!!!
 const API_URL = (lat, lon) =>
   `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b3d279c3d0ec08d4fc55a9c59238c55c&lang=fr&units=metric`;
 
 export default function App() {
   // hook récup coord user
   const {isAuthorized, error, data} = useCurrentLocationWeather();
 
   //previsions
   const getWeather = async location => {
     try {
       const response = await axios.get(
         API_URL(location.coords.latitude, location.coords.longitude),
       );
       setData(response.data);
       setIsLoading(false);
     } catch (e) {
       console.log('Erreur dans getWeather');
     }
   };
   //autorisation accès
   /*if (isAuthorized === false) {
     console.log(isAuthorized);
     return (
       <View style={styles.container}>
         <Text style={styles.text}>
           Vous devez nous donner accès a votre localisation.
         </Text>
       </View>
     );
   }*/
 
   //erreur
   if (error) {
     return (
       <View style={styles.container}>
         <Image
           style={styles.noSignal}
           source={require('././assets/icons/noSignal.png')}></Image>
       </View>
     );
   } else if (!data) {
     return (
       <>
         <Image
           style={styles.noSignal}
           source={require('././assets/icons/noSignal.png')}></Image>
         <TasksScreen />
       </>
     );
   } else {
     return (
       <>
         <SafeAreaView style={{flex: 1}}>
           <View>
             <Text>{data?.city?.name}</Text>
             <ShowModal data={data} />
           </View>
           <TasksScreen />
         </SafeAreaView>
       </>
     );
   }
 }
 
 const styles = StyleSheet.create({
   activityIndicator: {
     justifyContent: 'center',
     alignItems: 'center',
   },
 
   container: {
     flex: 1,
     backgroundColor: '#E7E7DE',
     paddingHorizontal: 65,
   },
 
   noSignal: {
     height: 30,
     width: 30,
     position: 'absolute',
     right: 20,
     top: 20,
   },
 });
 