import { useMemo, useState } from 'react';

export const useResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const canSubmit = useMemo(() => {
    return newPassword.trim().length > 0 && confirmPassword.trim().length > 0;
  }, [newPassword, confirmPassword]);

  const isMatch = useMemo(() => {
    return (
      newPassword.trim().length > 0 &&
      confirmPassword.trim().length > 0 &&
      newPassword === confirmPassword
    );
  }, [newPassword, confirmPassword]);

  return {
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
  };
};
