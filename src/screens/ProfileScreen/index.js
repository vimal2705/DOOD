import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../color/colors';
import { authService } from '../../services/authService';
import { sessionStore } from '../../storage/session';
import { styles } from './style';

const ProfileScreen = ({ onLogout }) => {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.getProfile();
      
      if (!response?.success) {
        throw new Error(response?.message || 'Failed to load profile');
      }

      setUser(response.user);
    } catch (err) {
      const message = err?.message || 'Failed to load profile';
      setError(message);
      Alert.alert('Error', message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchUserProfile();
    setIsRefreshing(false);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          authService.logout();
          if (typeof onLogout === 'function') {
            onLogout();
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !user) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.centerContent}>
          <Ionicons name="alert-circle" size={50} color={COLORS.error} />
          <Text style={styles.errorTitle}>Unable to Load Profile</Text>
          <Text style={styles.errorMessage}>
            {error || 'User data not found'}
          </Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={handleRefresh}
            activeOpacity={0.7}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={handleRefresh}
          disabled={isRefreshing}
          activeOpacity={0.7}
        >
          {isRefreshing ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <Ionicons name="refresh" size={24} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={60} color={COLORS.white} />
          </View>
        </View>

        {/* Name Section */}
        <View style={styles.card}>
          <View style={styles.cardSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="person-circle" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Full Name</Text>
              <Text style={styles.value}>{user?.name || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Email Section */}
        <View style={styles.card}>
          <View style={styles.cardSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="mail" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user?.email || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Username Section */}
        <View style={styles.card}>
          <View style={styles.cardSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="at-circle" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Username</Text>
              <Text style={styles.value}>{user?.username || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Phone Section */}
        <View style={styles.card}>
          <View style={styles.cardSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="call" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Phone Number</Text>
              <Text style={styles.value}>{user?.phoneNumber || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Date of Birth Section */}
        <View style={styles.card}>
          <View style={styles.cardSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="calendar" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Date of Birth</Text>
              <Text style={styles.value}>{formatDate(user?.dob)}</Text>
            </View>
          </View>
        </View>

        {/* Member Since Section */}
        <View style={styles.card}>
          <View style={styles.cardSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="time" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Member Since</Text>
              <Text style={styles.value}>{formatDate(user?.createdAt)}</Text>
            </View>
          </View>
        </View>

        {/* User ID Section */}
        <View style={styles.card}>
          <View style={styles.cardSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="key" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>User ID</Text>
              <Text style={[styles.value, styles.monospace]}>
                {user?._id?.substring(0, 12)}...
              </Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <Ionicons name="log-out" size={20} color={COLORS.white} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
