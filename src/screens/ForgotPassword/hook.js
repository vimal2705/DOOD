import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

export const useForgotPassword = () => {
  const [step, setStep] = useState('email'); // 'email' | 'otp'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    setSecondsLeft(RESEND_SECONDS);
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const canSendOtp = useMemo(() => email.trim().length > 0, [email]);
  const canVerify = useMemo(() => otp.length === OTP_LENGTH, [otp]);
  const canResend = useMemo(() => secondsLeft === 0, [secondsLeft]);

  const sendOtp = useCallback(() => {
    if (!canSendOtp) return false;
    setStep('otp');
    setOtp('');
    startTimer();
    return true;
  }, [canSendOtp, startTimer]);

  const resendOtp = useCallback(() => {
    if (!canResend) return false;
    startTimer();
    return true;
  }, [canResend, startTimer]);

  const verifyOtp = useCallback(() => {
    if (!canVerify) return false;
    return true;
  }, [canVerify]);

  const formattedTimer = useMemo(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return `${mm}:${ss}`;
  }, [secondsLeft]);

  return {
    step,
    setStep,
    email,
    setEmail,
    otp,
    setOtp,
    secondsLeft,
    formattedTimer,
    canSendOtp,
    canVerify,
    canResend,
    sendOtp,
    resendOtp,
    verifyOtp,
  };
};
