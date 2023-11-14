import { StatusBar } from 'expo-status-bar';
import { AppState, StyleSheet, Text, View , NativeModules, NativeEventEmitter} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React, {useRef, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useKeepAwake } from 'expo-keep-awake';


import FirstPage from './src/firstPage';
import LoginPage from './src/loginPage';
import SignupPage from './src/signupPage';
import CalendarPage from './src/calendarPage';
import ChartPage from './src/chartPage';
import DataSelectPage from './src/dataSelectPage';
import ProfilePage from './src/profilePage';

const Stack = createNativeStackNavigator();
export default function App() {
  // useKeepAwake()
  const appState = useRef(AppState.currentState);
  console.log(appState)
  const [ inactive, setInactive] = useState(0)
  const [ background, setBackground] = useState(0)

  // useEffect(() => {
    
  //   const subscription = AppState.addEventListener('change', nextAppState => { 
  //     // console.log("---", inactive)
  //     // console.log("---", background)
  //     // if (nextAppState == 'inactive')  {
  //     //   console.log('IN')
  //     //   setInactive(new Date())
  //     //   // console.log("INACTIVE" , new Date())
  //     // }
  //     // if (nextAppState == 'background')  {
  //     //   console.log('BAC')
  //     //   setBackground( new Date())
  //     //   console.log(background - inactive)
  //     // }
  //     // if (nextAppState == 'active'){
  //     //   console.log('AC')
  //     //   setInactive(0)
  //     //   setBackground(0)
  //     // }
  //   })
  //   return () => {
  //     subscription.remove();
  //   }
  // }, [])
  
  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       console.log('App has come to the foreground!');
  //     }

  //     appState.current = nextAppState;
  //     // setAppStateVisible(appState.current);
  //     console.log('AppState', appState.current);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

 
  useEffect(async () => {
    
    await AsyncStorage.setItem(
      'records',
      JSON.stringify({
        '2023-08-08': 2,
        '2023-08-09': 23,
        '2023-08-10': 2,
        '2023-08-11': 2,
        '2023-08-12': 2,
        '2023-08-13': 2,
        '2023-08-14': 22,
        '2023-08-16': 2,
        '2023-08-22': 2,
        '2023-08-24': 2,
        '2023-08-25': 18,
        '2023-08-26': 10,
        '2023-08-27': 12,
        '2023-09-01': 23,
        '2023-09-02': 15,
        '2023-09-03': 15,
        '2023-10-02': 12,
        '2023-10-22': 2,
        '2023-10-23': 2,
        '2023-10-24': 2,
        
      })
    );
     
  }, []);

  return (
<NavigationContainer>
      <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen name="Home" component={FirstPage}/>
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="SignupPage" component={SignupPage} />
      <Stack.Screen name="CalendarPage" component={CalendarPage} />
      <Stack.Screen name="ChartPage" component={ChartPage} />
      <Stack.Screen name="DataSelectPage" component={DataSelectPage} /> 
      <Stack.Screen name="ProfilePage" component={ProfilePage} /> 
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

