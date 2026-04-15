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
import { useResetPassword } from './hook';
import { styles } from './style';

const ResetPassword = ({ email, resetToken, onBack, onSubmit }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    canSubmit,
    isMatch,
  } = useResetPassword();

  const handleSubmit = async () => {
    if (!canSubmit) {
      Alert.alert('Error', 'Please fill both fields');
      return;
    }

    if (!isMatch) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!email || !resetToken) {
      Alert.alert('Error', 'Missing reset session. Please request OTP again.');
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      const res = await authService.resetPassword({
        email,
        resetToken,
        newPassword,
      });

      if (!res?.success) {
        throw new Error(res?.message || 'Password reset failed');
      }

      Alert.alert('Success', res?.message || 'Password reset successful');
      if (typeof onSubmit === 'function') {
        onSubmit({ email, resetToken, newPassword, token: res?.token, user: res?.user });
      }
    } catch (error) {
      const message = error?.message || 'Password reset failed. Please try again.';
      Alert.alert('Error', message);
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
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <View style={styles.backRow}>
            <Ionicons name="arrow-back" size={18} color={COLORS.primary} />
            <Text style={styles.backText}>Back</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Reset Password</Text>
          <Text style={styles.headerSubtitle}>
            Create a new password for your account.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.input}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={COLORS.gray400}
              style={styles.inputIcon}
            />
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="New password"
              placeholderTextColor={COLORS.gray400}
              secureTextEntry={!showNewPassword}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
            />
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowNewPassword(prev => !prev)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={COLORS.gray400}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.input}>
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color={COLORS.gray400}
              style={styles.inputIcon}
            />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              placeholderTextColor={COLORS.gray400}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
            />
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowConfirmPassword(prev => !prev)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={COLORS.gray400}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.hint}>
            Passwords must match to submit.
          </Text>

          <TouchableOpacity
            style={[styles.button, (!canSubmit || !isMatch) && styles.buttonDisabled]}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} size="small" />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassword;
