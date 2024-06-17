import { View, Text } from 'react-native'
import React from 'react'
import Otpverification from '../components/optverficationcomponent'

const Otpverificationforgetpasswordpage = ({ route, }) => {
  const email = route.params.email
  console.log(email)
  return (
    <View>
      <Otpverification
        page={'Forgetpassword'}
        email={route.params.email}
        type={'forgetpassword'}
        state={email}


      />
    </View>
  )
}

export default Otpverificationforgetpasswordpage