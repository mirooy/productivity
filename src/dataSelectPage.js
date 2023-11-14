import {da, de, ro} from 'date-fns/locale';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  Text,
  Alert,
  ScrollView,
  
} from 'react-native';
import Checkbox from 'expo-checkbox';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { forEach } from 'lodash';

const DataSelectPage = ({navigation, route}) => {
  const {records, user} = route.params;
  const dates = Object.keys(records);
  const focus = useIsFocused();
  const [selectedDates, setSelectedDates] = useState([]);
  const [checked, setChecked] = useState({})

  useEffect(() => {
    
    const fetchData = async() => {
      const selectedDates = JSON.parse(await AsyncStorage.getItem('selectedDates'));
      console.log("FETCH",selectedDates)
      if (selectedDates != null) {
        setSelectedDates(selectedDates)
        let temp = {}
        selectedDates.forEach((selectedDate) => temp[selectedDate] = true)
        setChecked(temp)
      }
    }

    if (focus) {
      console.log("FOCUS")
      fetchData()
    }
  }, [focus])

  function checkData (date) {


    if (selectedDates.length == 7) {
      Alert.alert(
        "Maximum of 7 records possible!"
      )
    }
    const index = selectedDates.indexOf(date);
    if (index != -1) {
      const temp = selectedDates.filter(x => {
        return x !== date;
      });

      setSelectedDates(temp);
      const temp2 = checked
      temp2[date] = false
      setChecked({...temp2})
    } else {
      selectedDates.push(date);
      setSelectedDates(selectedDates);
      const temp = checked
      temp[date] = true
      setChecked({...temp})
    }
    
  }

  const navigateToChartPage = async() => {
    const sorted = selectedDates.sort()
    await AsyncStorage.setItem('selectedDates', JSON.stringify(sorted))
    navigation.navigate('ChartPage', {records: records, user:user})
  }
  
  const getDayName = (date) => {
    const weekday = new Date(date).toLocaleString('en-us', {weekday:'long'})
    return weekday.toString().split(',')[0]
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollContainer}>
      <View style={styles.titleContainer}>
          <Text style={styles.title}>Select maximum of 7 recorded dates</Text>
        </View>
        {dates.map((key) => {
            return (
              <View style={styles.rowContainer}>
                <Checkbox 
                // disabled={false}
                onValueChange={() => checkData(key)}
                value={checked[key]}
                style={styles.checkboxStyle}
                color={checked[key] ? "#971B2F" : undefined}
                />
                <View>
                <Text style={styles.text}>{key}</Text>
                <Text style={styles.text4}>{getDayName(key)}</Text>
                </View>
                <View style={styles.subContainer}>
                <Text style={styles.text2}>{records[key]} hours</Text>
                <Text style={styles.text3}>{((records[key] / 24) * 100).toFixed(2)}%</Text>
                </View>
              </View>
            );
        })}
      </ScrollView>
      <Pressable
        style={styles.button}
        onPress={async() => navigateToChartPage()}>
        <Text style={styles.buttonText}>Confirm</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  scrollContainer: {
    backgroundColor: '#a2d2ff9',
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  button: {

    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: '#971B2F',
    borderColor: '#971B2F',
    color: 'white'
  },

  title: {
    marginTop: 20,
    fontSize: 18,
    // marginBottom: 20,
    textAlign: 'center',
   
  },
  titleContainer: {
    borderBottomWidth: 3,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: "#D3D3D3"
  },
  text: {
    fontSize: 18,
    color: 'black',
    // marginRight: 10
  },
  text2: {
    fontSize: 18,
    color: 'black',
    marginLeft: 'auto'
  },
  text3: {
    fontSize: 13,
    color: '#971B2F',
    marginTop: 4,
    fontWeight:800,
    // justifyContent: 
    // textAlign: "end",
    marginLeft: 'auto'
  },
  text4: {
    backgroundColor: '#D6D6D5',
    fontSize: 10,
    padding: 2,
    width: 60,
    textAlign: "center"
  },
  checkboxStyle: {
    width: 20,
    height: 20,
    marginRight: 20,
    borderColor: "#971B2F"
  
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    paddingBottom: 15,
    borderBottomColor: "#C0C0C0"
  },
  subContainer: {
    marginLeft: "auto"
  }
});

export default DataSelectPage;
