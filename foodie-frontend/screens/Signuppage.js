import { View, Text, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import StyleComponent from '../components/styles';
import TextFieldComponent from '../components/textfieldcomponent';
import TouchableComponent from '../components/touchablecomponent'
import axios from 'axios'
import Toast from 'react-native-toast-message';
import ipAddress from '../ipaddress/ipAddressInfo';

const Signuppage = ({ navigation }) => {

  const [isNameFieldFocused, setIsNameFieldFocused] = useState(false);
  const [hasNameFieldBeenFocused, setHasNameFieldBeenFocused] = useState(false)
  const [isMobileNumberFieldFocused, setIsMobileNumberFieldFocused] = useState(false);
  const [hasMobileNumberFieldBeenFocused, setHasMobileNumberFieldBeenFocused] = useState(false)
  const [isEmailFieldFocused, setIsEmailFieldFocused] = useState(false);
  const [hasEmailFieldBeenFocused, setHasEmailFieldBeenFocused] = useState(false)
  const [isPasswordFieldFocused, setIsPasswordFieldFocused] = useState(false);
  const [hasPasswordFieldBeenFocused, setHasPasswordFieldBeenFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [verifyname, setVerifyName] = useState(false)
  const [mobilenumber, setMobilenumber] = useState('')
  const [verifyMobilenumber, setVerifyMobilenumber] = useState(false)
  const [email, setEmail] = useState('')
  const [verifyEmail, setVerifyEmail] = useState(false)
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState(false)
  



  function handlesubmit() {


    console.log('Hello')
    const userData = {
      name: name,
      mobilenumber: mobilenumber,
      email: email,
      password: password
    }
    if (!verifyEmail || !verifyMobilenumber || !verifyname || !verifyPassword) {
      return Toast.show({
        type: 'customError',
        text2: 'Please fill the missing credentials',
        visibilityTime: 2000,
        autoHide: true,
        swipeable: true
      })
    }
    console.log(ipAddress + '/signup')
    axios.post(ipAddress + '/signup', userData)
      .then((res) => {
        if (res.data.success) {

          console.log('Hello')
          Toast.show({
            type: 'customSuccess',
            text2: 'User Registration Successful',
            visibilityTime: 2000,
            autoHide: true,
            swipeable: true
          })
          setTimeout(() => {
            <View style={styles.activitycontainer}>
              <ActivityIndicator size="large" color="#df2020" />
            </View>
            navigation.navigate('OtpVerification', { email })
          }, 2000);

        }

        else {
          Toast.show({
            type: 'customWarning',
            text2: 'User already exists',
            visibilityTime: 2000,
            autoHide: true,
            swipeable: true
          })
        }
      })
      .catch(e => {
        setHasEmailFieldBeenFocused(true)
        setHasMobileNumberFieldBeenFocused(true)
        setHasPasswordFieldBeenFocused(true)
        setHasNameFieldBeenFocused(true)
        console.log(e)

      })




  }

  function handlename(e) {
    const namechar = e.nativeEvent.text;
    setName(namechar)
    setVerifyName(false)
    if (/^[a-zA-Z\s]{2,50}$/.test(namechar)) {
      setVerifyName(true)

    }

  }

  function handlemobilenumber(e) {
    const mobilenumberchar = e.nativeEvent.text;

    setMobilenumber(mobilenumberchar);
    setVerifyMobilenumber(false)
    if (/^9\d{9}$/.test(mobilenumberchar)) {
      setVerifyMobilenumber(true)
    }
  }
  { }

  function handleemail(e) {
    const emailchar = e.nativeEvent.text.toLowerCase();
    setEmail(emailchar);
    setVerifyEmail(false)
    if (/^(?!.*[._-]{2})[a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)+$/.test(emailchar)) {
      setVerifyEmail(true)
    }

  }

  function handlepassword(e) {
    const passwordchar = e.nativeEvent.text;
    setPassword(passwordchar);
    setVerifyPassword(false)
    if (/^(?=.*[A-Z])(?=.*[!@#$%^&*_])(?=.*\d.*\d)[A-Za-z\d!@#$%^&*_]{8,}$/.test(passwordchar)) {
      setVerifyPassword(true)
    }

  }



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardDismissMode={'interactive'}>

        <Text style={[StyleComponent.text.type30, StyleComponent.text.redtext, { fontFamily: 'Nunito-Bold' }, { marginTop: '10%' }]}>Welcome to Foodie</Text>
        <Text style={[StyleComponent.text.type12, StyleComponent.text.graytext, { fontFamily: 'Nunito-Bold' }]} numberOfLines={2}>You are one step away from your next meal. We just need few more details.</Text>
        <View style={{ marginTop: '5%' }}>
          <TextFieldComponent
            primarytext={'First and last name'}
            textfieldstyle={[StyleComponent.textField.field]}
            onchange={e => handlename(e)}

            activeoutlinecolor={!verifyname ? '#949494' : '#34B233'}
            onfocus={() => setIsNameFieldFocused(true)}
            onblur={() => {
              setIsNameFieldFocused(false)
              if (!verifyname) {
                setHasNameFieldBeenFocused(true)
              }
            }}
            outlinecolor={hasNameFieldBeenFocused && !isNameFieldFocused && !verifyname ? '#DF2020' : '#949494'}

          />
          {isNameFieldFocused && !verifyname ?
            (<Text style={{ color: 'gray' }}>✓ Enter at least 2 characters</Text>)
            : isNameFieldFocused && verifyname ? (
              <Text style={{ color: 'green' }}>✓ Enter at least 2 characters</Text>
            ) : hasNameFieldBeenFocused && (!isNameFieldFocused && !verifyname) && (
              <Text style={{ color: 'red' }}>! Enter at least 2 characters</Text>
            )}

          <TextFieldComponent
            primarytext={'Mobile number'}
            textfieldstyle={StyleComponent.textField.field}
            keyboardtype={'number-pad'}
            onchange={e => handlemobilenumber(e)}
            activeoutlinecolor={!verifyMobilenumber ? '#949494' : '#34B233'}
            onfocus={() => setIsMobileNumberFieldFocused(true)}
            onblur={() => {
              setIsMobileNumberFieldFocused(false)
              if (!verifyMobilenumber) {
                setHasMobileNumberFieldBeenFocused(true)
              }
            }}
            outlinecolor={hasMobileNumberFieldBeenFocused && !isMobileNumberFieldFocused && !verifyMobilenumber ? '#DF2020' : '#949494'}

          />
          {isMobileNumberFieldFocused && !verifyMobilenumber ? (
            <Text style={{ color: 'gray' }}>✓ Enter 10-digit numbers</Text>
          ) : isMobileNumberFieldFocused && verifyMobilenumber ? (
            <Text style={{ color: 'green' }}>✓ Enter 10-digit numbers</Text>
          ) : hasMobileNumberFieldBeenFocused && !isMobileNumberFieldFocused && !verifyMobilenumber && (
            <Text style={{ color: 'red' }}>! Enter 10-digit numbers</Text>
          )}

          <TextFieldComponent
            primarytext={'Email'}
            textfieldstyle={[StyleComponent.textField.field]}
            onchange={e => handleemail(e)}
            activeoutlinecolor={!verifyEmail ? '#949494' : '#34B233'}
            onfocus={() => setIsEmailFieldFocused(true)}
            onblur={() => {
              setIsEmailFieldFocused(false)
              if (!verifyEmail) {
                setHasEmailFieldBeenFocused(true)
              }
            }}
            outlinecolor={hasEmailFieldBeenFocused && !isEmailFieldFocused && !verifyEmail ? '#DF2020' : '#949494'}

          />
          {isEmailFieldFocused && !verifyEmail ? (
            <Text style={{ color: 'gray' }}>✓ Enter your email</Text>
          ) : isEmailFieldFocused && verifyEmail ? (
            <Text style={{ color: 'green' }}>✓ Enter your email</Text>
          ) : hasEmailFieldBeenFocused && !isEmailFieldFocused && !verifyEmail && (
            <Text style={{ color: 'red' }}>! Enter your email</Text>
          )}

          <TextFieldComponent
            primarytext={'Create a Password'}
            textfieldstyle={[StyleComponent.textField.field]}
            securetextentry={!showPassword}
            onpress={() => {
              setShowPassword((prev) => (!prev))
            }}
            icon={showPassword ? 'eye' : 'eye-off'}
            onchange={e => handlepassword(e)}
            activeoutlinecolor={!verifyPassword ? '#949494' : '#34B233'}
            onfocus={() => setIsPasswordFieldFocused(true)}
            onblur={() => {
              setIsPasswordFieldFocused(false)
              if (!verifyPassword) {
                setHasPasswordFieldBeenFocused(true)
              }
            }}
            outlinecolor={hasPasswordFieldBeenFocused && !isPasswordFieldFocused && !verifyMobilenumber ? '#DF2020' : '#949494'}

          />
          {isPasswordFieldFocused && !verifyPassword ? (
            <Text numberOfLines={2} style={{ color: 'gray' }}>✓ Enter your password{'\n'}(atleast 1 uppercase, 1 special, 2 digits) </Text>
          ) : isPasswordFieldFocused && verifyPassword ? (
            <Text numberOfLines={2} style={{ color: 'green' }}>✓ Enter at least 8 characters{'\n'}(atleast 1 uppercase, 1 special, 2 digits)</Text>
          ) : hasPasswordFieldBeenFocused && !isPasswordFieldFocused && !verifyPassword && (
            <Text numberOfLines={2} style={{ color: 'red' }}>! Enter at least 8 characters{'\n'}(atleast 1 uppercase, 1 special, 2 digits)</Text>
          )}



        </View>

        <View style={{ marginTop: '10%' }}>

          <TouchableComponent
            button={[StyleComponent.button.genericbutton, StyleComponent.button.borderradius10]}
            text={'Continue'}
            texttype={[StyleComponent.text.generictype, StyleComponent.text.whitetext, StyleComponent.text.type18]}
            onpress={() => handlesubmit()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '10%'
  },
  activitycontainer: {
    flex: 1,
    justifyContent: 'center'
  }
});
export default Signuppage;


