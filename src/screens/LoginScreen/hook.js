import { useMemo, useState } from 'react';

export const useLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(prev => !prev);

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.length > 0;
  }, [email, password]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    isPasswordVisible,
    togglePasswordVisibility,
    canSubmit,
  };
};
