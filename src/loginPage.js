import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import * as Font from "expo-font"

const LoginPage = ({navigation}) => {

  const focus = useIsFocused();
  const [users, setUsers] = useState([])
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [ user, setUser] = useState({
    id: "",
    password: ""
  })

  useEffect(() => {
      Font.loadAsync({
        'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf'),
      })
  }, [])

  useEffect(() => {
    const fetchData = async() => {
      console.log("-------LOGIN--------")
      const users = JSON.parse(await AsyncStorage.getItem('users'));
      setUsers(users)
    }

    if (focus) {
      fetchData()
    }
  
  }, [focus]);
    console.log("----",users)
  const setPasswordIcon = () => {
    setPasswordVisibility(!passwordVisibility);
  };


  const naviagetToCalendarPage = async() => {
    
    if (users.length == 0) {
      
      Alert.alert(
        "Invalid ID or Password!",
        "Please Sign Up!"
      )
      return
    }

    if (user.id == ""  && user.password == "") {
      Alert.alert(
        "Invalid ID or Password!",
        "Please Sign Up!"
      )
      return
    }
    let hasAccount = false
   
    for (x of users) {
      if (x.id == user.id && x.password == user.password) {
        hasAccount = true
        navigation.navigate('CalendarPage', {user: user})
      }   
    }
    if (!hasAccount) {
    Alert.alert(
          "Invalid ID or Password",
          "Please Sign Up!"
      )
    }
   
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Productivity</Text>
      <TextInput
        style={styles.input}
        value={user.id}
        onChangeText={(text) => setUser({...user, id: text})}
        placeholder="Email/Phone Number"></TextInput>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input2}
          placeholder="Password"
          value={user.password}
          onChangeText={(text) => setUser({...user, password: text})}
          secureTextEntry={passwordVisibility}></TextInput>
        <Pressable onPress={setPasswordIcon}>
          {passwordVisibility ? (
            <Image style={styles.image} source={require('../images/eye.png')} />
          ) : (
            <Image
              style={styles.image}
              source={require('../images/eye-slash.png')}
            />
          )}
        </Pressable>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => naviagetToCalendarPage()}>
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
      <Pressable
        style={styles.button2}
        onPress={() => navigation.navigate('SignupPage')}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
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
  title: {
    fontSize: 30,
    fontWeight:800,
    color: '#971B2F',
    fontFamily: 'Pacifico-Regular',
    marginBottom: 90,
  },
  input: {
    marginTop: 30,
    borderRadius: 9,
    borderColor: '#971B2F',
    padding: 8,
    borderWidth: 1,
    width: '80%',
    textAlign: 'center',
  },

  input2: {
    borderRadius: 9,
    borderColor: '#971B2F',
    padding: 8,
    borderWidth: 1,
    width: '100%',
    textAlign: 'center',
  },

  button: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    width: '80%',
    backgroundColor: '#971B2F',
    borderColor: '#971B2F',
  },
  button2: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    width: '80%',
    backgroundColor: '#252525',
    borderColor: '#971B2F',
  },

  buttonText: {
    color: 'white',
  },

  image: {
    position: 'absolute',
    width: 20,
    height: 20,
    marginTop: 6,
    left: -30,
  },
  wrapper: {
    width: '80%',
    display: 'flex',
    marginTop: 30,
    flexDirection: 'row',
  },
});

export default LoginPage;
