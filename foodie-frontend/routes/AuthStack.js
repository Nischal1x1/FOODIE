import React from 'react'
import LoginPage from '../screens/Loginpage';
import SignupPage from '../screens/Signuppage';
import Otpverificationpage from '../screens/Otpverificationpage';
import Otpverificationforgetpasswordpage from '../screens/Otpverificationforgetpasswordpage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Forgetpasswordpage from '../screens/Forgetpasswordpage';
import Homepage from '../screens/Homepage';
import Enteryouremail from '../screens/Enterforgetemail';

const AuthStack = createNativeStackNavigator();

const Authstack = () => {
  return (
   
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen
          name="Login"
          component={LoginPage}

        />
        <AuthStack.Screen name="Signup" component={SignupPage} />
        <AuthStack.Screen name="OtpVerification" component={Otpverificationpage} />
        <AuthStack.Screen name="Forgetpassword" component={Forgetpasswordpage} />
        <AuthStack.Screen name="Enteryouremail" component={Enteryouremail} />
        <AuthStack.Screen name="OtpVerificationPassword" component={Otpverificationforgetpasswordpage} />

      </AuthStack.Navigator>
    
  )
}

export default Authstack