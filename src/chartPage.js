import {da} from 'date-fns/locale';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  Text,
  Switch,
  ScrollView
} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';
import {useIsFocused} from '@react-navigation/native';
import _, { set } from "lodash"
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChartPage = ({navigation, route}) => {
  const {records, user} = route.params;
  const [graph, setGraph] = useState({labels: [], datasets:[{data: []}]})
  const [average, setAverage] = useState(0)
  const [isEnabled, setIsEnabled] = useState(true);
  const focus = useIsFocused();
  const [dates, setDates] = useState([])


  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
   
  }

  useEffect(() => {
    const fetchData = async() => {
      const selectedDates = JSON.parse(await AsyncStorage.getItem('selectedDates'));
      if (selectedDates != null) {
        setDates(selectedDates)
        console.log(selectedDates)
      }
    }

    if (focus) {

        fetchData()
       
    }

    
  }, [focus])

  useEffect(() => {
    if (isEnabled) {


    setGraph({
    labels: Object.keys(records).map(record =>  {return moment(record).format("YY.MM.DD")}),
    datasets: [
        {
        data: Object.values(records),
        color:(opacity = 1) => `rgba(37,37,37, ${opacity})`,
        strokeWidth:3 
        }
    ]
    })
    // setAverage(
    //   (Math.round(graph.datasets[0].data.reduce((x, a) => x + a, 0)/(24 * graph.datasets[0].data.length) * 100)).toFixed(2)
    //   )
  
} else {

let temp = [] 
if (dates != undefined) {

    for (date of dates) {
    temp.push(records[date])
    }

    setGraph({
        labels: dates,
        datasets: [
        {
            data: temp,
            color:(opacity = 1) => `rgba(37,37,37, ${opacity})`,
            strokeWidth:3 
        }
        ]
    })
    // setAverage((Math.round(graph.datasets[0].data.reduce((x, a) => x + a, 0)/(24 * graph.datasets[0].data.length) * 100)).toFixed(2))
}

}

  }, [isEnabled])
  console.log(dates)
  
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.subContainer}>
        <View style={styles.shadow}>
        <Pressable
          style={styles.selectDays}
          onPress={() =>
            navigation.navigate('DataSelectPage', {records: records, user: user })
          }>
          <Text style={styles.text}>Select Days</Text>
        </Pressable>
        </View>
        <View style={styles.toggle}>
          <Text style={styles.text2}>Selection</Text>
          <Switch 
          trackColor={{false: '#D6D6D5', true: '#971B2F'}}
          onValueChange={toggleSwitch}
          value={isEnabled}
          />
          <Text style={styles.text2}>All</Text>
        </View>
      </View>

        <Text style={styles.subTitle}>Screen Time</Text>
        
     {graph.labels == undefined || graph.labels.length == 0 ?
     <></> : graph.labels.length == Object.keys(records).length ?
     
     <View>
      <ScrollView horizontal={true}> 
      <LineChart
     style={styles.bar}
     data={graph}
     width={graph.labels.length * 30 < Dimensions.get('window').width ? 
     Dimensions.get('window').width : graph.labels.length * 30}
     height={220}
     fromZero={true}
     fromNumber={24}
     verticalLabelRotation={-30}
     withShadow={false}
     withHorizontalLines={true}
     withVerticalLines={false}
     hidePointsAtIndex={_.range(1,graph.labels.length-2,2)}
     // hidePointsAtIndex={Array.from({length: graph.labels.length-2}, (_, i) => i + )}
     chartConfig={{
        backgroundGradientFrom: '#F4F4F4',
        backgroundGradientTo: '#F4F4F4',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(151,27,47, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(151,27,47, ${opacity})`,
        propsForVerticalLabels: {
           dx: [-30]
        }
     }}
 /> 
    </ScrollView></View>:  <LineChart
                style={styles.bar}
                data={graph}
                width={Dimensions.get('window').width}
                height={220}
                bezier
                fromZero={true}
                fromNumber={24}
                verticalLabelRotation={-30}
                withShadow={false}
                withInnerLines={false}
                chartConfig={{
                  backgroundGradientFrom: '#F4F4F4',
                  backgroundGradientTo: '#F4F4F4',
                  decimalPlaces: 0,
                  
                  color: (opacity = 1) => `rgba(151,27,47, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(151,27,47, ${opacity})`,
                  
                  propsForVerticalLabels: {
                    dx: [-30]
                 }
                }}
            
              /> 
    }
    <View >
      <Text style={styles.subTitle}>Longest Session</Text>
      <View style={styles.wrapper}>
        <Text style={styles.label}>{Math.max(...graph.datasets[0].data)} hours</Text>
        <Progress.Bar
          style={styles.progressBar}
          progress={Math.max(...graph.datasets[0].data)/24}
          color={Math.max(...graph.datasets[0].data) > 12 ? '#971B2F' : '#1CAC78'}
          backgroundColor={'#D6D6D5'}
          borderColor='#D6D6D5'
          height={16}
          width={200}/>
      </View>
      <View style={styles.wrapper2}>
        <Text style={styles.subLabel}>DAY</Text>
        <Text style={styles.barLabel}>Good</Text>
        <Text style={styles.barLabel}>Bad</Text>
      </View>
      
     </View> 
    <View >
      <Text style={styles.subTitle}>Shortest Session</Text>
      <View style={styles.wrapper}>
        
        <Text style={styles.label}>{Math.min(...graph.datasets[0].data)} hours</Text>
        
        <Progress.Bar
          style={styles.progressBar}
          progress={Math.min(...graph.datasets[0].data)/24}
          color={Math.min(...graph.datasets[0].data) > 12 ? '#971B2F' : '#1CAC78'}
          backgroundColor={'#D6D6D5'}
          borderColor='#D6D6D5'
          height={16}
          width={200}
          />
      </View>
      <View style={styles.wrapper2}>
        <Text style={styles.subLabel}>OVERALL</Text>
        <Text style={styles.barLabel}>Good</Text>
        <Text style={styles.barLabel}>Bad</Text>
      </View>
    </View>
    {/* <View >
      <Text style={styles.subTitle}>Average Usage</Text>
      <View style={styles.wrapper}>
        <Text style={styles.label}> 
          {average} %
        </Text>
        <Progress.Bar
          style={styles.progressBar}
          progress={ average /100}
          color={ average < 70? '#1CAC78' : '#971B2F'}
          backgroundColor={'#D6D6D5'}
          borderColor='#D6D6D5'
          height={16}
          width={200}
          />
      </View>
      <View style={styles.wrapper2}>
        <Text style={styles.subLabel}>OVERALL</Text>
        <Text style={styles.barLabel}>Good</Text>
        <Text style={styles.barLabel}>Bad</Text>
      </View>
    </View> */}



     </ScrollView>
      <View style={styles.line}></View>
    <View style={styles.buttonWrapper}>
     
    <Pressable style={styles.chartButton}>
        <Image
          style={styles.currentImage}
          source={require('../images/bar-chart.png')}
        />
      </Pressable>
     
      <Pressable
        style={styles.calendarButton}
        onPress={() => navigation.navigate('CalendarPage', {records: records, user: user})}>
        <Image
          style={styles.image}
          source={require('../images/calendar.png')}
        />
      </Pressable>
      <Pressable style={styles.userButton}  onPress={() => navigation.navigate("ProfilePage", {records: records, user:user})}>
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
    backgroundColor: '#F4F4F4',
    
  },
  buttonWrapper: {
    width: '100%',
    position: "absolute",
    bottom: 0,
    borderTopColor: '#D6D6D5',
    paddingTop: 10,
    borderWidth: 2,
    height: 70,
    backgroundColor: 'white'
  },
  subContainer : {
    marginBottom:20,
    flexDirection: "row",
  },
  barLabel:{
    color: '#D6D6D5',
    marginLeft: 'auto',
    marginRight: 10
  },
  subLabel: {
    backgroundColor: '#D6D6D5',
    fontSize: 10,
    padding: 2
  },
wrapper: {
  // flex:1,
  // height: 100,
    // display:"flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10
    // borderBottomWidth: 2,
    // paddingBottom: 15,
    // borderBottomColor: "#C0C0C0"
},
wrapper2:{
  flexDirection: "row",
  marginLeft: 10,
  borderBottomWidth: 1,
  paddingBottom: 15,
  borderBottomColor: "#D6D6D5"
  
},
progressBar: {
  height: 13,
  marginLeft: "auto",
  marginRight: 20
  // marginLeft: 30
},
  selectDays: {
    width: 120,
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    
    padding: 8,
    marginLeft: 14,
    textAlign:"center",
  },
  shadow:{
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  toggle: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: 20,
  },
  subTitle: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: 800,
    marginLeft: 10,
    marginBottom: 10
  
  },
  
  label: {
    fontSize: 15,
    color: '#696969',
    fontWeight: 800,
    

  },

  text: {
    color: '#971B2F',
    textAlign:"center",
  },
  text2: {
    marginLeft: 3,
    color: '#971B2F',
    marginRight: 3
  },
  bar: {
    // shadowColor: '#171717',
    // shadowOffset: {width: -2, height: 4},
    // shadowOpacity: 0.6,
    // shadowRadius: 3,
    paddingRight: 40,
    paddingBottom: -10,
    // marginBottom: 20,
    borderBottomWidth: 2,
    // width: 400,
    paddingBottom: 8,
    borderBottomColor: "#D6D6D5"
  },
  calendarButton: {
    width: 100,
    height: 50,
    // borderRadius: 10,
    borderColor: 'black',
    position: 'absolute',
    bottom: 0,
    right: 100,
    
    // left: 0,
    // borderWidth: 1,
  },
  currentImage:{
    tintColor: '#252525',
    width: 50,
    height: 46,
  },
  chartButton: {
    width: 100,
    height: 50,
    
    // borderRadius: 10,
    borderColor: 'black',
    position: 'absolute',
    bottom: 0,
    right: 200,
    // borderWidth: 1,
  },
  userButton: {
    width: 100,
    height: 50,
    // borderRadius: 10,
    borderColor: 'black',
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
  line: {
    width: '100%',
    height: 2,
    backgroundColor: 'gray',
    position: 'absolute',
    bottom: 60,
  },
});
export default ChartPage;

