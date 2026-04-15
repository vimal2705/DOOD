import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../color/colors';
import { sessionStore } from '../../storage/session';
import { styles } from './style';

const HomeScreen = () => {
  const session = sessionStore.get();
  const userName = session?.user?.name || 'User';

  const quickActions = [
    { id: 1, title: 'Log Dream', icon: 'moon', color: COLORS.primary },
    { id: 2, title: 'Brain Dump', icon: 'bulb', color: '#9333EA' },
    { id: 3, title: 'View Calendar', icon: 'calendar', color: '#3B82F6' },
    { id: 4, title: 'Statistics', icon: 'stats-chart', color: '#EC4899' },
  ];

  const recentActivity = [
    { id: 1, title: 'Dream Logged', description: 'You logged a new dream', time: '2 hours ago' },
    { id: 2, title: 'Brain Note', description: 'Added to brain dump', time: '5 hours ago' },
    { id: 3, title: 'Milestone', description: 'Completed 7-day streak', time: 'Yesterday' },
  ];

  const renderQuickAction = ({ item }) => (
    <TouchableOpacity
      style={[styles.actionCard, { borderLeftColor: item.color }]}
      activeOpacity={0.7}
    >
      <View style={[styles.actionIcon, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={24} color={COLORS.white} />
      </View>
      <Text style={styles.actionTitle}>{item.title}</Text>
      <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
    </TouchableOpacity>
  );

  const renderActivity = ({ item }) => (
    <View style={styles.activityCard}>
      <View style={styles.activityLeft}>
        <View style={styles.activityDot} />
        <View style={styles.activityContent}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <Text style={styles.activityDescription}>{item.description}</Text>
        </View>
      </View>
      <Text style={styles.activityTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="sparkles" size={28} color={COLORS.primary} />
          </View>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Dreams</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Notes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Days</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <FlatList
            data={quickActions}
            renderItem={renderQuickAction}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
          />
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentActivity}
            renderItem={renderActivity}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
