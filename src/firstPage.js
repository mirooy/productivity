import React, {useEffect, useRef, useState} from 'react';

import {AppState, View, StyleSheet, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from "expo-font"


const FirstPage = ({navigation}) => {
  const focus = useIsFocused();

  useEffect(() => {
    const fetchFonts = () => {
      Font.loadAsync({
        'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf'),
        'Bebas': require('../assets/fonts/Bebas.ttf'),
      })
    }
    if (focus) {
      fetchFonts()
      setTimeout(() => {
        navigation.navigate('LoginPage');
      }, 1500);
    }
  }, [focus]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Productivity</Text>
      <Text style={styles.description}>Track your screen time</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F3F0CA',
    backgroundColor: '#F4F4F4',
  },
  title: {
    fontSize: 40,
    fontWeight:800,
    color: '#971B2F',
    fontFamily: 'Pacifico-Regular',
  },
  description: {
    fontSize: 18,
    // fontWeight: 600,
    color: '#252525',
    fontFamily: 'Bebas',
  }
});

export default FirstPage;
