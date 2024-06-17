import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import TextFieldComponent from '../components/textfieldcomponent';
import styles from '../components/styles';
import TouchableOpacity from '../components/touchablecomponent';
import axios from 'axios'
import Toast from 'react-native-toast-message';
import ipAddress from '../ipaddress/ipAddressInfo';


const { textField, text, button } = styles;

const Enterforgetemail = ({ navigation }) => {
  const [email, setEmail] = useState('')

  function handleEmail(e) {
    const emailchar = e.nativeEvent.text;
    setEmail(emailchar)
  }

  function handleSubmit() {
    const userData = {
      email: email,

    }

    axios.post(ipAddress + '/forgetpassword', userData)
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          navigation.navigate('OtpVerificationPassword', { email })

        }
        else {
          Toast.show({
            type: 'customError',
            text2: 'Not A Registered User',
            visibilityTime: 2000,
            autoHide: true,
            swipeable: true,
          })
        }
      })
      .catch(e => {
        Toast.show({
          type: 'customError',
          text2: 'Failed to Process',
          visibilityTime: 2000,
          autoHide: true,
          swipeable: true,
        })
      });
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: '10%' }} >
      <TextFieldComponent
        primarytext={'Enter your email'}
        textfieldstyle={textField.field}
        onchange={e => handleEmail(e)}
      />
      <TouchableOpacity
        onpress={() => handleSubmit()}
        button={[button.genericbutton, button.borderradius10]}
        text={'Continue'}
        texttype={[text.generictype, text.whitetext, text.type18]}
      />


    </View>
  )
}

export default Enterforgetemail