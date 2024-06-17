import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Adminhomepage from '../screens/Adminhomepage';

const AdminStack = createNativeStackNavigator();

const Adminstack = () => {
  return (
  
      <AdminStack.Navigator screenOptions={{ headerShown: false }}>
        <AdminStack.Screen name="Adminhomepage" component={Adminhomepage} />
      </AdminStack.Navigator>

  )
}

export default Adminstack