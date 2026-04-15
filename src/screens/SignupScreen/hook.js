import { useCallback, useMemo, useState } from 'react';

export const useSignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [dobError, setDobError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidDate = useCallback(dateString => {
    if (dateString.length !== 10) return false;

    const [yearStr, monthStr, dayStr] = dateString.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    if (!year || !month || !day) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      daysInMonth[1] = 29;
    }
    if (day > daysInMonth[month - 1]) return false;

    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 13;
  }, []);

  const handleDateInput = useCallback(text => {
    const digits = String(text).replace(/\D/g, '');
    const limited = digits.slice(0, 8);

    let formatted = '';
    if (limited.length > 0) {
      formatted = limited.slice(0, 4);

      if (limited.length > 4) {
        let month = limited.slice(4, 6);
        if (month.length === 2) {
          const monthNum = parseInt(month, 10);
          if (monthNum < 1) month = '01';
          else if (monthNum > 12) month = '12';
        }
        formatted += `-${month}`;
      }

      if (limited.length > 6) {
        let day = limited.slice(6, 8);
        if (day.length === 2) {
          const dayNum = parseInt(day, 10);
          if (dayNum < 1) day = '01';
          else if (dayNum > 31) day = '31';
        }
        formatted += `-${day}`;
      }
    }

    setDob(formatted);
  }, []);

  const handleDateChange = useCallback(
    text => {
      handleDateInput(text);
      setDobError('');
    },
    [handleDateInput],
  );

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      username.trim().length > 0 &&
      password.trim().length > 0 &&
      phoneNumber.trim().length > 0 &&
      dob.length === 10
    );
  }, [name, email, username, password, phoneNumber, dob]);

  return {
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
  };
};
