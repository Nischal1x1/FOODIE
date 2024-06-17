import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import { AuthContext } from '../context/AuthContext'
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import toastConfig from '../components/toastcomponent';
import AdminStack from './AdminStack'
import Googlesignin from '../screens/Googlesignin'
import Testpage from '../screens/Testpage'

const AppNav = () => {
    const {userToken, userInfo} = useContext(AuthContext)
   
    const userRole = userInfo?.data?.registeredUser?.role
  return (
    <NavigationContainer>
        {userToken == null ? <Testpage/>:userRole == 'user'? <AppStack/>: <AdminStack/>}
        <Toast config={toastConfig} />
    </NavigationContainer>
  )
}

export default AppNav