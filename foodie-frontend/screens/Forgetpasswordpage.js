import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import TextFieldComponent from '../components/textfieldcomponent';
import StyleComponent from '../components/styles';
import TouchableOpacity from '../components/touchablecomponent';
import axios from 'axios'
import Toast from 'react-native-toast-message';
import ipAddress from '../ipaddress/ipAddressInfo';


const Forgetpasswordpage = ({ navigation, route }) => {
    const email = route.params.email

    const [newpassword, setNewPassword] = useState('')
    const [verifyNewPassword, setVerifyNewPassword] = useState(false)
    const [isNewPasswordFieldFocused, setIsNewPasswordFieldFocused] = useState(false);
    const [hasNewPasswordFieldBeenFocused, setHasNewPasswordFieldBeenFocused] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [confirmpassword, setConfirmPassword] = useState('')
    const [verifyConfirmPassword, setVerifyConfirmPassword] = useState(false)
    const [isConfirmPasswordFieldFocused, setIsConfirmPasswordFieldFocused] = useState(false);
    const [hasConfirmPasswordFieldBeenFocused, setHasConfirmPasswordFieldBeenFocused] = useState(false)

    function handleNewPassword(e) {
        const newpasswordchar = e.nativeEvent.text;
        setNewPassword(newpasswordchar)
        setVerifyNewPassword(false)
        if (/^(?=.*[A-Z])(?=.*[!@#$%^&*_])(?=.*\d.*\d)[A-Za-z\d!@#$%^&*_]{8,}$/.test(newpasswordchar)) {
            setVerifyNewPassword(true)
        }

    }

    function handleConfirmPassword(e) {
        const confirmpasswordchar = e.nativeEvent.text;
        setConfirmPassword(confirmpasswordchar)
        setVerifyConfirmPassword(false)
        if (/^(?=.*[A-Z])(?=.*[!@#$%^&*_])(?=.*\d.*\d)[A-Za-z\d!@#$%^&*_]{8,}$/.test(confirmpasswordchar)) {
            setVerifyConfirmPassword(true)
        }

    }

    function handleSubmit() {
        const userData = {
            email: email,
            newPassword: confirmpassword
        }
        if (!verifyNewPassword || !verifyConfirmPassword) {
            return Toast.show({
                type: 'customError',
                text2: 'Please Fill The Missing Field',
                visibilityTime: 2000,
                autoHide: true,
                swipeable: true,
            })
        }
        if (newpassword != confirmpassword) {
            return Toast.show({
                type: 'customError',
                text2: 'Password Do Not Match',
                visibilityTime: 2000,
                autoHide: true,
                swipeable: true,
            })

        }

        axios.put(ipAddress + '/forgetpassword', userData)
            .then((res) => {
                console.log(res.data)
                if (res.data.success) {
                    Toast.show({
                        type: 'customSuccess',
                        text2: 'Password Changed',
                        visibilityTime: 2000,
                        autoHide: true,
                        swipeable: true,
                    })
                    setTimeout(() => {
                        <View style={styles.activitycontainer}>
                            <ActivityIndicator size="large" color="#df2020" />
                        </View>
                        navigation.navigate('Login')
                    }, 2000);


                }
                else {
                    Toast.show({
                        type: 'customWarning',
                        text2: 'Not Verified Password Change',
                        visibilityTime: 2000,
                        autoHide: true,
                        swipeable: true,
                    })
                }
            })
            .catch(e => {
                Toast.show({
                    type: 'customError',
                    text2: 'Password Change Process Failed',
                    visibilityTime: 2000,
                    autoHide: true,
                    swipeable: true,
                })
            });



    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextFieldComponent
                primarytext={'New Password'}
                textfieldstyle={StyleComponent.textField.field}
                onchange={e => handleNewPassword(e)}
                securetextentry={!showNewPassword}
                onpress={() => {
                    setShowNewPassword((prev) => (!prev))
                }}
                icon={showNewPassword ? 'eye' : 'eye-off'}
                activeoutlinecolor={!verifyNewPassword ? '#949494' : '#34B233'}
                onfocus={() => setIsNewPasswordFieldFocused(true)}
                onblur={() => {
                    setIsNewPasswordFieldFocused(false)
                    if (!verifyConfirmPassword) {
                        setHasNewPasswordFieldBeenFocused(true)
                    }
                }}
                outlinecolor={hasNewPasswordFieldBeenFocused && !isNewPasswordFieldFocused && !verifyNewPassword ? '#DF2020' : '#949494'}

            />
            {isNewPasswordFieldFocused && !verifyNewPassword ? (
                <Text numberOfLines={2} style={{ color: 'gray' }}>✓ Enter your password{'\n'}(atleast 1 uppercase, 1 special, 2 digits) </Text>
            ) : isNewPasswordFieldFocused && verifyNewPassword ? (
                <Text numberOfLines={2} style={{ color: 'green' }}>✓ Enter at least 8 characters{'\n'}(atleast 1 uppercase, 1 special, 2 digits)</Text>
            ) : hasNewPasswordFieldBeenFocused && !isNewPasswordFieldFocused && !verifyNewPassword && (
                <Text numberOfLines={2} style={{ color: 'red' }}>! Enter at least 8 characters{'\n'}(atleast 1 uppercase, 1 special, 2 digits)</Text>
            )}
            <TextFieldComponent
                primarytext={'Confirm Password'}
                textfieldstyle={StyleComponent.textField.field}
                onchange={e => handleConfirmPassword(e)}
                securetextentry={!showConfirmPassword}
                onpress={() => {
                    setShowConfirmPassword((prev) => (!prev))
                }}
                icon={showConfirmPassword ? 'eye' : 'eye-off'}
                activeoutlinecolor={!verifyConfirmPassword ? '#949494' : '#34B233'}
                onfocus={() => setIsConfirmPasswordFieldFocused(true)}
                onblur={() => {
                    setIsConfirmPasswordFieldFocused(false)
                    if (!verifyConfirmPassword) {
                        setHasConfirmPasswordFieldBeenFocused(true)
                    }
                }}
                outlinecolor={hasConfirmPasswordFieldBeenFocused && !isConfirmPasswordFieldFocused && !verifyConfirmPassword ? '#DF2020' : '#949494'}

            />
            {isConfirmPasswordFieldFocused && !verifyConfirmPassword ? (
                <Text numberOfLines={2} style={{ color: 'gray' }}>✓ Enter your password{'\n'}(atleast 1 uppercase, 1 special, 2 digits) </Text>
            ) : isConfirmPasswordFieldFocused && verifyConfirmPassword ? (
                <Text numberOfLines={2} style={{ color: 'green' }}>✓ Enter at least 8 characters{'\n'}(atleast 1 uppercase, 1 special, 2 digits)</Text>
            ) : hasConfirmPasswordFieldBeenFocused && !isConfirmPasswordFieldFocused && !verifyConfirmPassword && (
                <Text numberOfLines={2} style={{ color: 'red' }}>! Enter at least 8 characters{'\n'}(atleast 1 uppercase, 1 special, 2 digits)</Text>
            )}

            <TouchableOpacity
                button={[StyleComponent.button.genericbutton, StyleComponent.button.borderradius10]}
                text={'Continue'}
                texttype={[StyleComponent.text.generictype, StyleComponent.text.whitetext, StyleComponent.text.type18]}
                onpress={() => handleSubmit()}
            />


        </View>
    )
}
const styles = StyleSheet.create({
    activitycontainer: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default Forgetpasswordpage