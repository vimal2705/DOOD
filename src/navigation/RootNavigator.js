import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { COLORS } from '../color/colors';

import SplashScreen from '../screens/SplashScreen';
import Onboarding from '../screens/Onboarding';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';

import HomeScreen from '../screens/HomeScreen';
import DreamsScreen from '../screens/DreamsScreen';
import BrainScreen from '../screens/BrainScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ProfileScreen from '../screens/ProfileScreen';

const styles = {
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tabLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
};

const BottomTabNavigator = ({ activeTab, onTabPress }) => {
  const tabs = [
    { name: 'home', label: 'Home', icon: 'home' },
    { name: 'dreams', label: 'Dreams', icon: 'moon' },
    { name: 'brain', label: 'Brain', icon: 'bulb' },
    { name: 'calendar', label: 'Calendar', icon: 'calendar' },
    { name: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tabItem}
          onPress={() => onTabPress(tab.name)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={tab.icon}
            size={24}
            color={activeTab === tab.name ? COLORS.primary : COLORS.textMuted}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === tab.name && styles.tabLabelActive,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const RootNavigator = ({ navigationState, onNavigate }) => {
  const { stage, activeTab, resetEmail, resetToken, isInitializing } = navigationState;

  // If still initializing, show splash screen
  if (isInitializing) {
    return <SplashScreen onFinish={() => {}} />;
  }

  const renderScreen = () => {
    switch (stage) {
      case 'splash':
        return <SplashScreen onFinish={() => onNavigate('onboarding')} />;

      case 'onboarding':
        return <Onboarding onFinish={() => onNavigate('login')} />;

      case 'login':
        return (
          <LoginScreen
            onCreateAccount={() => onNavigate('signup')}
            onForgotPassword={() => onNavigate('forgot')}
            onLogin={() => onNavigate('tabs')}
          />
        );

      case 'signup':
        return (
          <SignupScreen
            onLoginPress={() => onNavigate('login')}
            onSignUpPress={() => onNavigate('tabs')}
          />
        );

      case 'forgot':
        return (
          <ForgotPassword
            onBack={() => onNavigate('login')}
            onVerified={({ email, resetToken: token }) => {
              onNavigate('reset', { email, resetToken: token });
            }}
          />
        );

      case 'reset':
        return (
          <ResetPassword
            email={resetEmail}
            resetToken={resetToken}
            onBack={() => onNavigate('login')}
            onSubmit={() => onNavigate('login')}
          />
        );

      case 'tabs':
        return (
          <View style={{ flex: 1 }}>
            {activeTab === 'home' && <HomeScreen />}
            {activeTab === 'dreams' && <DreamsScreen />}
            {activeTab === 'brain' && <BrainScreen />}
            {activeTab === 'calendar' && <CalendarScreen />}
            {activeTab === 'profile' && (
              <ProfileScreen onLogout={() => onNavigate('login')} />
            )}
            <BottomTabNavigator
              activeTab={activeTab}
              onTabPress={tab => onNavigate('tab', tab)}
            />
          </View>
        );

      default:
        return <SplashScreen onFinish={() => onNavigate('onboarding')} />;
    }
  };

  return renderScreen();
};
