import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Toast from 'react-native-toast-message';
import toastConfig from './components/toastcomponent';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, AuthProvider } from './context/AuthContext'
import AppNav from './routes/AppNav';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
          setLoading(false);
        }
      } catch (e) {
        console.warn(e);
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  if (loading) {
    return null;
  }

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
