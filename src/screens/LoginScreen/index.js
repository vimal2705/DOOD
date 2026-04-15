import React from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../color/colors';
import { authService } from '../../services/authService';
import { useLoginScreen } from './hook';
import { styles } from './style';

const LoginScreen = ({
  onLogin,
  onForgotPassword,
  onCreateAccount,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    email,
    setEmail,
    password,
    setPassword,
    isPasswordVisible,
    togglePasswordVisibility,
    canSubmit,
  } = useLoginScreen();

  const handleLogin = async () => {
    if (!canSubmit || isLoading) return;

    setIsLoading(true);
    try {
      const res = await authService.login({ email, password });

      if (!res?.success) {
        throw new Error(res?.message || 'Login failed');
      }

      Alert.alert('Success', res?.message || 'Login successful');
      if (typeof onLogin === 'function') {
        onLogin();
      }
    } catch (error) {
      const message = error?.message || 'Login failed. Please try again.';
      Alert.alert('Login Error', message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome Back</Text>
          <Text style={styles.headerSubtitle}>
            Stay consistent. Your goals are waiting.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.input}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={COLORS.gray400}
              style={styles.inputIcon}
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.gray400}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>

          <View style={styles.input}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={COLORS.gray400}
              style={styles.inputIcon}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.gray400}
              secureTextEntry={!isPasswordVisible}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
            />

            <TouchableOpacity
              style={styles.iconButton}
              onPress={togglePasswordVisibility}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={COLORS.gray400}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              (!canSubmit || isLoading) && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} size="small" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.forgot}
            onPress={onForgotPassword}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don&apos;t have an account?{' '}
            <Text style={styles.footerLink} onPress={onCreateAccount}>
              Create Account
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
