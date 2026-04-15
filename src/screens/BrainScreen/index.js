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

const BrainScreen = () => {
  const [notes, setNotes] = React.useState([
    {
      id: 1,
      title: 'Project Ideas',
      content: 'Mobile app for meditation and mindfulness tracking',
      category: 'ideas',
      createdAt: '2026-04-15',
      isPinned: true,
    },
    {
      id: 2,
      title: 'Shopping List',
      content: 'Milk, eggs, bread, cheese, vegetables',
      category: 'todo',
      createdAt: '2026-04-15',
      isPinned: false,
    },
    {
      id: 3,
      title: 'Meeting Notes',
      content: 'Discussed Q2 goals and timeline',
      category: 'notes',
      createdAt: '2026-04-14',
      isPinned: false,
    },
    {
      id: 4,
      title: 'Book Recommendation',
      content: 'Atomic Habits - Great for productivity and building systems',
      category: 'ideas',
      createdAt: '2026-04-13',
      isPinned: false,
    },
  ]);

  const categoryIcons = {
    ideas: 'bulb',
    todo: 'checkmark-circle',
    notes: 'document-text',
    reflection: 'heart',
  };

  const categoryColors = {
    ideas: '#F59E0B',
    todo: '#10B981',
    notes: '#3B82F6',
    reflection: '#EC4899',
  };

  const pinnedNotes = notes.filter(note => note.isPinned);
  const otherNotes = notes.filter(note => !note.isPinned);

  const renderNoteCard = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.noteCard,
        { borderLeftColor: categoryColors[item.category] },
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.noteHeader}>
        <View style={styles.noteTitleSection}>
          <View
            style={[
              styles.categoryIcon,
              { backgroundColor: categoryColors[item.category] },
            ]}
          >
            <Ionicons
              name={categoryIcons[item.category]}
              size={16}
              color={COLORS.white}
            />
          </View>
          <View style={styles.noteTitleContent}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteDate}>
              {new Date(item.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: '2-digit',
              })}
            </Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons
            name={item.isPinned ? 'pin' : 'pin-outline'}
            size={20}
            color={item.isPinned ? COLORS.primary : COLORS.textMuted}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.noteContent} numberOfLines={2}>
        {item.content}
      </Text>

      <View style={styles.noteFooter}>
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: categoryColors[item.category] },
          ]}
        >
          <Text style={styles.categoryBadgeText}>{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Brain Dump</Text>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Pinned Notes */}
        {pinnedNotes.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="pin" size={18} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Pinned</Text>
            </View>
            <FlatList
              data={pinnedNotes}
              renderItem={renderNoteCard}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* All Notes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="list" size={18} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>All Notes</Text>
          </View>
          <FlatList
            data={otherNotes}
            renderItem={renderNoteCard}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="document" size={40} color={COLORS.gray400} />
                <Text style={styles.emptyText}>No notes yet</Text>
              </View>
            }
          />
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BrainScreen;
