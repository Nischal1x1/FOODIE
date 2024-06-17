import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Alert, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import StyleComponent from '../components/styles';
import TouchableComponent from '../components/touchablecomponent';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import ipAddress from '../ipaddress/ipAddressInfo';

const Otpverification = ({ route, page, email, type, state }) => {
    const navigation = useNavigation();
    const [otp, setOtp] = useState(['', '', '', '']);

    const inputRefs = useRef([]);


    const handleOtpChange = (text, index) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = text;
        setOtp(updatedOtp);


        if (text.length === 0 && index > 0) {
            inputRefs.current[index - 1].focus();
        }

        if (text.length === 1 && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    const handlesubmit = () => {
        const userData = {
            email: email,
            otp: Number(otp.join('')),
            type: type
        }

        axios.post(ipAddress + '/otpverify', userData)
            .then((res) => {
                console.log(res.data)
                if (res.data.success) {
                    Toast.show({
                        type: 'customSuccess',
                        text2: 'OTP verification successful',
                        visibilityTime: 2000,
                        autoHide: true,
                        swipeable: true,
                    })
                    {
                        <View style={styles.activitycontainer}>
                        <ActivityIndicator size="large" color="#df2020" />
                    </View>
                    }
                    setTimeout(() => {

                        navigation.navigate(page, { email: state });
                    }, 2000);
                }
                else {
                    Toast.show({
                        type: 'customError',
                        text2: 'OTP verification failed',
                        visibilityTime: 2000,
                        autoHide: true,
                        swipeable: true
                    })
                }
            })
            .catch(e => {
                Toast.show({
                    type: 'customError',
                    text2: 'OTP processing failed',
                    visibilityTime: 2000,
                    autoHide: true,
                    swipeable: true
                })
            });

    }

    return (
        <>

            <View style={{ marginTop: '10%', padding: '10%' }}>
                <Text style={[StyleComponent.text.type30, StyleComponent.text.redtext, { fontFamily: 'Nunito-Bold' }, { marginTop: '10%', textAlign: 'center' }]}>Verification Code</Text>
                <Text style={[StyleComponent.text.type12, { fontFamily: 'Nunito-Bold' }]} numberOfLines={2}>Please enter the verification code sent to +977-********72</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: '25%' }}>
                    {[0, 1, 2, 3].map((index) => (
                        <TextInput
                            key={index}
                            ref={ref => inputRefs.current[index] = ref}
                            style={styles.input}
                            value={otp[index]}
                            onChangeText={(text) => handleOtpChange(text, index)}
                            maxLength={1}
                            keyboardType="numeric"
                            cursorColor='#DF2020'
                        />
                    ))}
                </View>
                <TouchableComponent
                    button={[StyleComponent.button.genericbutton, StyleComponent.button.borderradius10]}
                    text={'Verify'}
                    texttype={[StyleComponent.text.generictype, StyleComponent.text.whitetext, StyleComponent.text.type18]}
                    onpress={() => handlesubmit()}
                />

            </View>

        </>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        height: '25%',
        width: '50%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        width: 60,
        height: 60,
        backgroundColor: '#D9D9D9',
        borderRadius: 5,
        textAlign: 'center'
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    verifiedText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
    },
    activitycontainer: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default Otpverification;
