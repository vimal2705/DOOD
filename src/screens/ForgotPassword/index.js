import React, { useRef } from 'react';
import {
  Alert,
  ActivityIndicator,
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
import { useForgotPassword } from './hook';
import { styles } from './style';

const OTP_LENGTH = 6;

const ForgotPassword = ({ onBack, onVerified }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    step,
    email,
    setEmail,
    otp,
    setOtp,
    formattedTimer,
    canSendOtp,
    canVerify,
    canResend,
    sendOtp,
    resendOtp,
    verifyOtp,
  } = useForgotPassword();

  const otpInputRef = useRef(null);

  const handleSendOtp = async () => {
    if (!canSendOtp || isLoading) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authService.sendOtp({ email });
      if (!res?.success) {
        throw new Error(res?.message || 'Failed to send OTP');
      }

      sendOtp();
      Alert.alert('OTP Sent', res?.message || 'OTP sent successfully');

      requestAnimationFrame(() => {
        otpInputRef.current?.focus?.();
      });
    } catch (error) {
      const message = error?.message || 'Failed to send OTP. Please try again.';
      Alert.alert('Error', message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = () => {
    // Keep local validation for UX
    const ok = verifyOtp();
    if (!ok || isLoading) {
      Alert.alert('Error', 'Please enter the 6-digit code');
      return;
    }

    setIsLoading(true);
    authService
      .verifyOtp({ email, otp })
      .then(res => {
        if (!res?.success) {
          throw new Error(res?.message || 'OTP verification failed');
        }

        Alert.alert('Success', res?.message || 'OTP verified successfully');
        if (typeof onVerified === 'function') {
          onVerified({
            email: res?.email || email,
            otp,
            resetToken: res?.resetToken,
          });
        }
      })
      .catch(error => {
        const message =
          error?.message || 'OTP verification failed. Please try again.';
        Alert.alert('Error', message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleResend = async () => {
    if (!canResend || isLoading) return;

    setIsLoading(true);
    try {
      const res = await authService.sendOtp({ email });
      if (!res?.success) {
        throw new Error(res?.message || 'Failed to resend OTP');
      }

      resendOtp();
      Alert.alert('OTP Sent', res?.message || 'A new code has been sent');
      otpInputRef.current?.focus?.();
    } catch (error) {
      const message = error?.message || 'Failed to resend OTP. Please try again.';
      Alert.alert('Error', message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = text => {
    const digits = String(text).replace(/\D/g, '').slice(0, OTP_LENGTH);
    setOtp(digits);
  };

  const activeIndex = Math.min(otp.length, OTP_LENGTH - 1);

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
          <Text style={styles.headerTitle}>Forgot Password</Text>
          <Text style={styles.headerSubtitle}>
            {step === 'email'
              ? 'Enter your email to receive an OTP.'
              : 'Enter the 6-digit OTP sent to your email.'}
          </Text>
        </View>

        <View style={styles.card}>
          {step === 'email' ? (
            <>
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

              <TouchableOpacity
                style={[
                  styles.button,
                  (!canSendOtp || isLoading) && styles.buttonDisabled,
                ]}
                onPress={handleSendOtp}
                activeOpacity={0.85}
              >
                {isLoading ? (
                  <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                  <Text style={styles.buttonText}>Send OTP</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.otpLabel}>Enter 6-digit code</Text>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => otpInputRef.current?.focus?.()}
              >
                <View style={styles.otpRow}>
                  {Array.from({ length: OTP_LENGTH }).map((_, idx) => {
                    const digit = otp[idx] || '';
                    const isActive = idx === activeIndex;

                    return (
                      <View
                        key={String(idx)}
                        style={[styles.otpBox, isActive && styles.otpBoxActive]}
                      >
                        <Text style={styles.otpDigit}>{digit}</Text>
                      </View>
                    );
                  })}
                </View>

                <TextInput
                  ref={otpInputRef}
                  value={otp}
                  onChangeText={handleOtpChange}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  autoFocus
                  maxLength={OTP_LENGTH}
                  style={styles.hiddenOtpInput}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  (!canVerify || isLoading) && styles.buttonDisabled,
                ]}
                onPress={handleVerify}
                activeOpacity={0.85}
              >
                {isLoading ? (
                  <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                  <Text style={styles.buttonText}>Verify</Text>
                )}
              </TouchableOpacity>

              <View style={styles.resendRow}>
                <Text style={styles.resendText}>Didn’t receive OTP? </Text>
                <TouchableOpacity
                  onPress={handleResend}
                  activeOpacity={0.7}
                  disabled={!canResend || isLoading}
                >
                  <Text
                    style={[
                      styles.resendLink,
                      (!canResend || isLoading) ? { opacity: 0.6 } : null,
                    ]}
                  >
                    Resend OTP
                  </Text>
                </TouchableOpacity>
                {!canResend ? (
                  <Text style={styles.timerText}>{formattedTimer}</Text>
                ) : null}
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
