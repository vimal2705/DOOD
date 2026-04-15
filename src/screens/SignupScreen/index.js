import React from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
import { useSignupScreen } from './hook';
import { styles } from './style';

const SignupScreen = ({ onSignUpPress, onLoginPress }) => {
  const {
    name,
    setName,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    dob,
    showPassword,
    setShowPassword,
    dobError,
    setDobError,
    isLoading,
    setIsLoading,
    canSubmit,
    isValidDate,
    handleDateChange,
  } = useSignupScreen();

  const handleSignUp = async () => {
    if (!name.trim()) return Alert.alert('Error', 'Please enter your full name');
    if (!email.trim()) return Alert.alert('Error', 'Please enter your email');
    if (!username.trim()) return Alert.alert('Error', 'Please enter a username');
    if (!password.trim()) return Alert.alert('Error', 'Please enter a password');
    if (!phoneNumber.trim()) return Alert.alert('Error', 'Please enter your phone number');

    if (!isValidDate(dob)) {
      setDobError(
        'Please enter a valid date (YYYY-MM-DD). You must be at least 13 years old.',
      );
      return;
    }

    setIsLoading(true);
    try {
      const signupData = {
        name,
        email,
        username,
        password,
        phoneNumber,
        dob,
      };

      const res = await authService.signup(signupData);

      if (!res?.success) {
        throw new Error(res?.message || 'Failed to create account');
      }

      Alert.alert('Success', res?.message || 'User registered successfully');
      if (typeof onSignUpPress === 'function') onSignUpPress(signupData);
    } catch (error) {
      const message =
        error?.message || 'Signup failed. Please try again.';
      Alert.alert('Signup Error', message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onLoginPress} style={styles.backButton} activeOpacity={0.7}>
              <View style={styles.backRow}>
                <Ionicons name="arrow-back" size={18} color={COLORS.primary} />
                <Text style={styles.backText}>Back</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your journey to success today.</Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color={COLORS.gray400}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Full name"
                placeholderTextColor={COLORS.textMuted}
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={COLORS.gray400}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="at-outline"
                size={20}
                color={COLORS.gray400}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={COLORS.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="call-outline"
                size={20}
                color={COLORS.gray400}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone number"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>

            <View
              style={[
                styles.inputContainer,
                dobError ? styles.inputError : null,
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color={COLORS.gray400}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="DOB (YYYY-MM-DD)"
                placeholderTextColor={COLORS.textMuted}
                value={dob}
                onChangeText={handleDateChange}
                maxLength={10}
              />
            </View>
            {dobError ? <Text style={styles.errorText}>{dobError}</Text> : null}

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.gray400}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Create password"
                placeholderTextColor={COLORS.textMuted}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(prev => !prev)}
                style={styles.iconButton}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={COLORS.gray400}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.signupButton,
                (isLoading || !canSubmit) && styles.signupButtonDisabled,
              ]}
              onPress={handleSignUp}
              activeOpacity={0.85}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.signupButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={onLoginPress} activeOpacity={0.7}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
