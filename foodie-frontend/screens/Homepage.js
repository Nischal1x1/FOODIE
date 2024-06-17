import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Button } from 'react-native-paper'
import { AuthContext } from '../context/AuthContext'



const Homepage = () => {
  const {logout, userToken} = useContext(AuthContext)

  return (
    <View style = {styles.container}>
      <Text>Homepage</Text> 
      <Button onPress={() => logout()}> Logout</Button>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
export default Homepage