import React from 'react'


import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homepage from '../screens/Homepage';


const AppStack = createNativeStackNavigator();

const Appstack = () => {
  return (
  
      <AppStack.Navigator screenOptions={{ headerShown: false }}>

        <AppStack.Screen name="Home" component={Homepage} />

      </AppStack.Navigator>

  )
}

export default Appstack