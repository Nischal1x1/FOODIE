import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import ipAddress from '../ipaddress/ipAddressInfo'

WebBrowser.maybeCompleteAuthSession();




const Googlesignin = () => {
    const [userInfo, setUserInfo] = useState(null)
    const [req, res, promptAsync] = Google.useAuthRequest({
        androidClientId: "15510434448-3spnpoa4lflj67cgg08sia7dubvse3bp.apps.googleusercontent.com",
        iosClientId: "15510434448-fn6a4r77fd8pit9vqc6ksbjttfi62nvg.apps.googleusercontent.com",
        webClientId: "15510434448-1vh18jp74efujimrufttimq6toodqtnc.apps.googleusercontent.com"
    })
    useEffect(() => {
        handleSignInWithGogle()
    }, [res])
    async function handleSignInWithGogle() {
        const user = await AsyncStorage.getItem("@user")
        if (!user) {
            if (res?.type === "success") {
                await getUserInfo(res.authentication.accessToken)
            }

        } else {
            setUserInfo(JSON.parse(user))
        }
    }

    const getUserInfo = async (token) => {
        { console.log(token) }
        if (!token) return;
        try {
            const res = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            const user = await res.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user))
            setUserInfo(user)
                console.log(userInfo)
            const userData = {
            

                name: user.name,
                email: user.email

            }
            console.log(user.name, user.email)

            axios.post(ipAddress + '/signup', userData)
            .then((res) => {
                console.log(res.data)
            
            .catch(e => {
             
              console.log(e)
            })
      
            })

        } catch (err) {
            console.log("Found Error")
        }
    }



    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text onPress={()=>promptAsync()}>Googlesignin</Text>
        </View>
    )
}

export default Googlesignin