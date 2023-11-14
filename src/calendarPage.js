import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {format} from 'date-fns';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Pressable,
  Button,
  Dimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from "expo-font"

const CalendarPage = ({route, navigation}) => {
  const [hasRecord, setHasRecord] = useState(true);
  const [selectedDate, setSelectedDate] = useState(0);
  const [markedDate, setMarkedDate] = useState('');
  const [records, setRecords] = useState({});
  const {user} = route.params
  console.log(user)


  useEffect(() => {
    console.log('----------');
    Font.loadAsync({
      'Playpen': require('../assets/fonts/Playpen.ttf'),
    })
    const fetchData = async () => {
      const records = JSON.parse(await AsyncStorage.getItem('records'));
      console.log(records)
      if (records) {
        setRecords(records);
      }
    };
  
    fetchData();
  }, []);

  const today = format(new Date(), 'yyyy-MM-dd');
  console.log(records);
  const onClick = day => {
    if (records[day]) {
      setSelectedDate(records[day]);
      setHasRecord(true);
    } else {
      setSelectedDate(0);
      setHasRecord(false);
    }
    setMarkedDate({
      [day]: {selected: true},
    });
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={day => onClick(day.dateString)}
        current={today}
        style={styles.calendar}
        markedDates={markedDate}
        theme={{
          calendarBackground: '#F4F4F4',
          arrowColor: '#971B2F',
          selectedDayBackgroundColor: '#971B2F',
          todayTextColor: '#971B2F',
          monthTextColor: '#971B2F'
        }}
      />
      <Progress.Bar
        progress={selectedDate / 24}
        width={200}
        height={30}
        animationType='timing'
        marginTop={15}
        color={'#971B2F'}
        // backgroundColor={'#F3F0CA'}
        borderColor='#971B2F'
        useNativeDriver
        borderRadius={10}
        // style={styles.bar}
      />

      {hasRecord ? (
        <Text style={styles.text}>{selectedDate} hours </Text>
      ) : (
        <Text style={styles.text}>No Records </Text>
      )}
      {/* <View style={styles.line}></View> */}
      <View style={styles.buttonWrapper}>
      <Pressable
        onPress={() => navigation.navigate('ChartPage', {records: records, user: user})}
        style={styles.chartButton}>
        <Image
          style={styles.image}
          source={require('../images/bar-chart.png')}
        />
      </Pressable>

      <Pressable style={styles.calendarButton}>
        <Image
          style={styles.currentImage}
          source={require('../images/calendar.png')}
        />
      </Pressable>
      <Pressable 
      style={styles.userButton}
      onPress={() => navigation.navigate("ProfilePage", {records: records, user:user})}>
        <Image style={styles.image} source={require('../images/user.png')} />
      </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  bar: {
    shadowColor: '#E1AA74',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 3,
  //   transition: "1s ease 0.3s",
  //   opacity: 0
  },
  title: {
    fontSize: 30,
    color: '#293241',
    fontFamily: 'Sriracha-Regular',
    marginBottom: 40,
  },
  text: {
    fontSize: 17,
    fontWeight:800,
    color: '#252525',
    fontFamily: 'Playpen'
  },

  calendar: {
    shadowColor: '#252525',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 20,
    width: 300,
    height: 350,
    // borderBottomWidth: 2,
    borderBottomColor: '#252525',
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
export default CalendarPage;
