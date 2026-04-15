import React from 'react';
import { Image, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { useSplashScreen } from './hook';

const SplashScreen = ({ onFinish }) => {
  useSplashScreen({ onFinish });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.body}>
        <View style={styles.centerContent}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>DO-OD</Text>
          <Text style={styles.subtitle}>Day One to One Day</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.poweredBy}>Powered By</Text>
          <Text style={styles.brand}>JARVIS</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
