import React, {useEffect, useRef, useState} from 'react';

import {AppState, View, StyleSheet,Pressable,Image, Dimensions, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from "expo-font"


const ProfilePage = ({navigation, route}) => {
  // const focus = useIsFocused();
  const {records, user} = route.params

  // useEffect(() => {
  //   Font.loadAsync({
  //     'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf'),
  //   })
  // }, [])
  
 
  return (
    <View style={styles.container}>
      
      <View style={styles.profile}>
          <Text style={styles.label}>Id</Text>
          <Text style={styles.text}>{user.id}</Text>
      </View>
     <View style={styles.buttonWrapper}>
      <Pressable
        onPress={() => navigation.navigate('ChartPage', {records: records, user: user})}
        style={styles.chartButton}>
        <Image
          style={styles.image}
          source={require('../images/bar-chart.png')}
        />
      </Pressable>

      <Pressable style={styles.calendarButton} onPress={() => navigation.navigate('CalendarPage', {user: user})}>
        <Image
          style={styles.image}
          source={require('../images/calendar.png')}
        />
      </Pressable>
      <Pressable 
      style={styles.userButton}
     >
        <Image style={styles.currentImage} source={require('../images/user.png')} />
      </Pressable>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F3F0CA',
    backgroundColor: '#F4F4F4',
  },
  profile:{
    flexDirection: "row",
    justifyContent: "space-between"
  },
  label: {
    fontSize: 20,
    color: "#D6D6D5",
    marginRight: 20
    
  },
  text: {
    fontSize: 20,
    color: "#252525"
  },
  title: {
    fontSize: 30,
    fontWeight:800,
    color: '#971B2F',
    fontFamily: 'Pacifico-Regular',
  },

  calendarButton: {
    width: 100,
    height: 50,
    // borderRadius: 10,
    borderColor: '#252525',
    position: 'absolute',
    bottom: 0,
    right: 100,
    // left: 0,
    // borderWidth: 1,
  },
  chartButton: {
    width: 100,
    height: 50,
    // borderRadius: 10,
    borderColor: '#D6D6D5',
    position: 'absolute',
    bottom: 0,
    right: 200,
    // borderWidth: 1,
  },
  buttonWrapper: {
    width: Dimensions.get("window").width + 10,
    position: "absolute",
    bottom: 0,
    borderTopColor: '#D6D6D5',
    paddingTop: 10,
    borderWidth: 2,
    height: 70,
    backgroundColor: 'white'
  },
  userButton: {
    width: 100,
    height: 50,
    // borderRadius: 10,
    borderColor: '#D6D6D5',
    position: 'absolute',
    bottom: 0,
    right: 0,
    // borderWidth: 1,
  },
  image: {
    tintColor: '#D6D6D5',
    width: 50,
    height: 46,
  },
  currentImage:{
    tintColor: '#252525',
    width: 50,
    height: 46,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#D6D6D5',
    position: 'absolute',
    bottom: 60,
  },
});

export default ProfilePage;
