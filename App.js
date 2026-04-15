/**
 * @format
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { sessionStore } from './src/storage/session';

const App = () => {
  const [navigationState, setNavigationState] = React.useState({
    stage: 'splash',
    activeTab: 'home',
    resetEmail: '',
    resetToken: '',
    isInitializing: true,
  });

  // Check if user is already logged in on app start
  React.useEffect(() => {
    const session = sessionStore.get();
    const hasValidToken = session?.accessToken && session?.user;

    setTimeout(() => {
      if (hasValidToken) {
        // User is logged in, skip to tabs
        setNavigationState(prev => ({
          ...prev,
          stage: 'tabs',
          activeTab: 'home',
          isInitializing: false,
        }));
      } else {
        // User is not logged in, go to onboarding
        setNavigationState(prev => ({
          ...prev,
          stage: 'onboarding',
          isInitializing: false,
        }));
      }
    }, 2000); // Splash screen duration
  }, []);

  const handleNavigate = (action, payload) => {
    switch (action) {
      case 'splash':
        setNavigationState(prev => ({ ...prev, stage: 'splash' }));
        break;

      case 'onboarding':
        setNavigationState(prev => ({ ...prev, stage: 'onboarding' }));
        break;

      case 'login':
        setNavigationState(prev => ({
          ...prev,
          stage: 'login',
          activeTab: 'home',
        }));
        break;

      case 'signup':
        setNavigationState(prev => ({ ...prev, stage: 'signup' }));
        break;

      case 'forgot':
        setNavigationState(prev => ({ ...prev, stage: 'forgot' }));
        break;

      case 'reset':
        setNavigationState(prev => ({
          ...prev,
          stage: 'reset',
          resetEmail: payload?.email || '',
          resetToken: payload?.resetToken || '',
        }));
        break;

      case 'tabs':
        setNavigationState(prev => ({
          ...prev,
          stage: 'tabs',
          activeTab: 'home',
        }));
        break;

      case 'tab':
        setNavigationState(prev => ({
          ...prev,
          activeTab: payload,
        }));
        break;

      default:
        break;
    }
  };

  return (
    <SafeAreaProvider>
      <RootNavigator
        navigationState={navigationState}
        onNavigate={handleNavigate}
      />
    </SafeAreaProvider>
  );
};

export default App;
