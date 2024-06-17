import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import TouchableOpacityComponent from '../components/touchablecomponent';
import TextFieldComponent from '../components/textfieldcomponent';
import StyleComponent from '../components/styles';
import Toast from 'react-native-toast-message';

import axios from 'axios';
import ipAddress from '../ipaddress/ipAddressInfo';
import { AuthContext } from '../context/AuthContext';





const { text, button, line, textField, image } = StyleComponent;



const LoginPage = ({ navigation }) => {
  

  const {login} = useContext(AuthContext)

  

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmail(e) {
    const emailChar = e.nativeEvent.text;
    setEmail(emailChar);
  }

  function handlePassword(e) {
    const passwordChar = e.nativeEvent.text;
    setPassword(passwordChar);
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardDismissMode='interactive' endFillColor={'transparent'}>
        <View>
          <Image source={require('../images/foodielogo.png')} style={{ marginVertical: '15%' }} />
          <Text style={[text.generictype, text.type30]}>Sign In</Text>
          <Text style={[text.generictype, text.type20, text.graytext]}>New to Foodie?
            <Text onPress={() => { navigation.navigate("Signup") }} style={[text.generictype, text.type20, text.redtext]}> Sign Up</Text>
          </Text>

          <TouchableOpacityComponent
            button={[button.facebookbutton, button.borderradius20, { marginTop: '5%' }]}
            image={require('../images/facebooklogo.png')}
            texttype={[text.generictype, text.type18, text.whitetext, { marginLeft: '4%', marginTop: '1%' }]}
            imagestyle={image.loginimage}
            text={'Continue with Facebook'}
         
          />

          <TouchableOpacityComponent
            button={[button.googlebutton, button.borderradius20, { marginTop: '2%' }]}
            image={require('../images/googlelogo.png')}
            imagestyle={image.loginimage}
            texttype={[text.generictype, text.type18, text.whitetext, { marginLeft: '4%', marginTop: '1%' }]}
            text={'Continue with Google'}
        
          />
         
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={line.line} />
          <Text style={[text.generictype, text.type12, text.graytext, { marginTop: '1%', marginRight: '2%', marginLeft: '2%', }]}> or continue with email</Text>
          <View style={line.line} />
        </View>

        <View style={{ flexDirection: 'column', marginTop: '2%' }}>
          <TextFieldComponent
            primarytext={'Email'}
            secondarytext={''}
            textfieldstyle={textField.field}
            onchange={e => handleEmail(e)}
          />

          <TextFieldComponent
            primarytext={'Password'}
            secondarytext={'Forget your password?'}
            textfieldstyle={textField.field}
            securetextentry={!showPassword}
            onchange={e => handlePassword(e)}
            onpress={() => { setShowPassword((prev) => (!prev)) }}
            icon={showPassword ? 'eye' : 'eye-off'}
            onsecondarytextpress={() => navigation.navigate('Enteryouremail')}
          />
        </View>

        <View style={{ marginTop: '10%' }}>
          <TouchableOpacityComponent
            onpress={() => login(email, password)}
            button={[button.genericbutton, button.borderradius10]}
            text={'Sign In'}
            texttype={[text.generictype, text.whitetext, text.type18]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '10%',
    backgroundColor: '#ffff'
  },
  activitycontainer: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default LoginPage;
