import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from "expo-font"
import moment from "moment"

const SignupPage = ({navigation}) => {
  const [user, setUser] = useState({
    id: '',
    password: '',
  
  });

  const [fontsLoaded, setFontsLoaded] = useState(false);


  useEffect(() => {
      Font.loadAsync({
        'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf'),
      })
  }, [])

  const inputUser = (name, text) => {
    setUser({...user, [name]: text});
  };

  const createAccount = async () => {
  
    const users = JSON.parse(await AsyncStorage.getItem('users'));
    
    if (users == null) {
      const temp = user
      temp["signedAt"] = moment(new Date()).format("YYYY-MM-DD")
      await AsyncStorage.setItem('users', JSON.stringify([temp]));
    } else {
      
      const temp = user
      temp["signedAt"] = moment(new Date()).format("YYYY-MM-DD")
      users.push(temp)
      await AsyncStorage.setItem('users', JSON.stringify(users));
    }

    navigation.navigate('LoginPage');
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Productivity</Text>
      <TextInput
        style={styles.input}
        value={user.id}
        placeholder="Email/Phone Number"
        onChangeText={text => inputUser('id', text)}></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry="true"
        onChangeText={text => inputUser('password', text)}></TextInput>
      <Pressable style={styles.button} onPress={createAccount}>
        <Text style={styles.buttonText}>Create account</Text> 
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

  buttonText: {
    color: 'white',
  },
});

export default SignupPage;
