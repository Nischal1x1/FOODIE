import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message';
export const AuthContext = createContext();
import ipAddress from '../ipaddress/ipAddressInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  const login = (email, password) => {
    const userData = {
      email: email,
      password: password
    };

    axios.post(`${ipAddress}/login`, userData)
      .then((res) => {

        const usertoken = res.data.data.token

        setUserToken(usertoken)
        console.log(userToken)
        const userinfo = res.data
        setUserInfo(userinfo)

        AsyncStorage.setItem('userToken', userToken)
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        if (res.data.success) {
          Toast.show({
            type: 'customSuccess',
            text2: 'User Login Successful!',
            visibilityTime: 2000,
            autoHide: true,
            swipeable: true,
          })
          // setTimeout(() => {
          //   <View style={styles.activitycontainer}>
          //     <ActivityIndicator size="large" color="#df2020" />
          //   </View>
          // navigation.navigate('Home');
          // }, 2000);


        } else {
          Toast.show({
            type: 'customError',
            text2: 'Incorrect Email Or Password',
            visibilityTime: 2000,
            autoHide: true,
            swipeable: true,
          })
        }
      })
      .catch(e => {
        Toast.show({
          type: 'customError',
          text2: 'Login Failed to Process',
          visibilityTime: 2000,
          autoHide: true,
          swipeable: true,
        })

      });
  }
  const logout = () => {
    console.log("hello")
    setUserToken(null)
    AsyncStorage.removeItem('userToken')
    AsyncStorage.removeItem('userInfo')
    console.log(userToken)

  }
  const isLoggedIn = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken')
      const userInfo = await AsyncStorage.getItem('userInfo')
      userInfo = JSON.parse(userInfo)
      if (userInfo) {
        setUserInfo(userInfo)
        setUserToken(userToken)
        
      }
    } catch (e) {
      console.log("LogIn failed")
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])
  return (
    <AuthContext.Provider value={{ userToken, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
