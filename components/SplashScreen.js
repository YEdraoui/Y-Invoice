import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function SplashScreenComponent({ navigation }) {
  const fadeAnim = new Animated.Value(0); // Initial opacity

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // Navigate to Home after animation
      setTimeout(() => {
        navigation.replace('Home');
        SplashScreen.hideAsync();
      }, 1500);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.logoContainer, opacity: fadeAnim }}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <Text style={styles.slogan}>Simplifying Your Invoicing, One Click at a Time!</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCFF99',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  slogan: {
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: 10,
    color: '#FFFFFF',
  },
});
