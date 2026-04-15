import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../color/colors';
import { styles } from './style';

const DreamsScreen = () => {
  const [dreams, setDreams] = React.useState([
    {
      id: 1,
      title: 'Flying Over Mountains',
      description: 'I was flying over beautiful snowy mountains with crystal clear skies.',
      date: '2026-04-15',
      mood: 'happy',
      tags: ['adventure', 'flying'],
    },
    {
      id: 2,
      title: 'Lost in a City',
      description: 'Wandering through an unknown city, trying to find my way back home.',
      date: '2026-04-14',
      mood: 'anxious',
      tags: ['lost', 'city'],
    },
    {
      id: 3,
      title: 'Ocean Waves',
      description: 'Swimming in calm, warm ocean water under a full moon.',
      date: '2026-04-13',
      mood: 'peaceful',
      tags: ['water', 'nature', 'relaxing'],
    },
  ]);

  const [searchQuery, setSearchQuery] = React.useState('');

  const moodColors = {
    happy: '#EC4899',
    peaceful: '#3B82F6',
    anxious: '#F59E0B',
    sad: '#6B7280',
    confused: '#A855F7',
  };

  const filteredDreams = dreams.filter(dream =>
    dream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dream.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDreamCard = ({ item }) => (
    <TouchableOpacity
      style={styles.dreamCard}
      activeOpacity={0.7}
    >
      <View style={styles.dreamHeader}>
        <View style={styles.dreamTitleSection}>
          <Text style={styles.dreamTitle}>{item.title}</Text>
          <View
            style={[
              styles.moodBadge,
              { backgroundColor: moodColors[item.mood] },
            ]}
          >
            <Text style={styles.moodText}>{item.mood}</Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="ellipsis-vertical" size={20} color={COLORS.textMuted} />
        </TouchableOpacity>
      </View>

      <Text style={styles.dreamDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.dreamFooter}>
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.dreamDate}>
          {new Date(item.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dreams</Text>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={COLORS.gray400}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search dreams..."
          placeholderTextColor={COLORS.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Dreams List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={filteredDreams}
          renderItem={renderDreamCard}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="moon" size={50} color={COLORS.gray400} />
              <Text style={styles.emptyText}>No dreams found</Text>
            </View>
          }
        />
        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DreamsScreen;
