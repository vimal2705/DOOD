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
import { styles } from './style';

const CalendarScreen = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date(2026, 3, 15)); // April 15, 2026

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Sample events
  const events = {
    5: { type: 'dream', count: 1 },
    10: { type: 'note', count: 2 },
    12: { type: 'dream', count: 1 },
    15: { type: 'milestone', count: 1 },
    18: { type: 'note', count: 1 },
    20: { type: 'dream', count: 3 },
  };

  const eventColors = {
    dream: '#9333EA',
    note: '#3B82F6',
    milestone: '#EC4899',
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const monthName = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const renderCalendarDay = ({ item, index }) => {
    const isEvent = item && events[item];

    return (
      <View style={styles.dayCell}>
        {item ? (
          <TouchableOpacity
            style={[
              styles.dayContent,
              index === currentDate.getDate() - 1 + getFirstDayOfMonth(currentDate)
                ? styles.todayCell
                : null,
            ]}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.dayNumber,
                index === currentDate.getDate() - 1 + getFirstDayOfMonth(currentDate)
                  ? styles.todayText
                  : null,
              ]}
            >
              {item}
            </Text>
            {isEvent && (
              <View style={styles.eventIndicators}>
                {Array(isEvent.count)
                  .fill(null)
                  .map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.eventDot,
                        { backgroundColor: eventColors[isEvent.type] },
                      ]}
                    />
                  ))}
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyDayContent} />
        )}
      </View>
    );
  };

  const upcomingEvents = [
    { date: '2026-04-20', title: 'Dream Logged', description: 'Flying in clouds' },
    { date: '2026-04-22', title: 'Brain Dump', description: 'Weekend ideas' },
    { date: '2026-04-25', title: 'Milestone', description: '30-day streak' },
  ];

  const renderEventItem = ({ item }) => (
    <TouchableOpacity style={styles.eventCard} activeOpacity={0.7}>
      <View style={styles.eventCardLeft}>
        <View style={styles.eventDateBadge}>
          <Text style={styles.eventDateText}>
            {new Date(item.date).getDate()}
          </Text>
        </View>
        <View style={styles.eventCardContent}>
          <Text style={styles.eventCardTitle}>{item.title}</Text>
          <Text style={styles.eventCardDescription}>{item.description}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
    </TouchableOpacity>
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
          <TouchableOpacity onPress={previousMonth} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>{monthName}</Text>
          <TouchableOpacity onPress={nextMonth} activeOpacity={0.7}>
            <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Weekday Headers */}
        <View style={styles.weekdayContainer}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <View key={day} style={styles.weekdayCell}>
              <Text style={styles.weekdayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          <FlatList
            data={calendarDays}
            renderItem={renderCalendarDay}
            keyExtractor={(_, index) => index.toString()}
            numColumns={7}
            scrollEnabled={false}
          />
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <FlatList
            data={upcomingEvents}
            renderItem={renderEventItem}
            keyExtractor={item => item.date}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
