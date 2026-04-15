import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboarding } from './hook';
import { styles } from './style';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Discipline Builds\nSuccess',
    description:
      'Plan your day, track your habits, and stay accountable. Your time and discipline shape your future.',
    image: require('../../assets/images/onboarding-1.png'),
    buttonText: 'Continue',
  },
  {
    id: 2,
    title: 'Small Wins\nEvery Day',
    description:
      'Track tasks, build powerful habits, and watch your progress grow day by day.',
    image: require('../../assets/images/onboarding-2.png'),
    buttonText: 'Continue',
  },
  {
    id: 3,
    title: 'Every Big Dream\nStarts With One Day',
    description:
      'Stay consistent with your habits, tasks, and goals. Small daily progress leads to extraordinary results.',
    image: require('../../assets/images/onboarding-3.png'),
    buttonText: 'Start Your Journey',
  },
];

const Onboarding = ({ onFinish }) => {
  useOnboarding();

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex === onboardingData.length - 1) {
      if (typeof onFinish === 'function') {
        onFinish();
      }
      return;
    }

    scrollViewRef.current?.scrollTo({
      x: (currentIndex + 1) * width,
      animated: true,
    });
  };

  const handleSkip = () => {
    if (typeof onFinish === 'function') {
      onFinish();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      <TouchableOpacity
        style={styles.skipButton}
        onPress={handleSkip}
        activeOpacity={0.7}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {onboardingData.map(item => (
          <View key={item.id} style={[styles.slide, { width }]}>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />
            </View>

            <View style={styles.contentContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={String(index)}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.8}>
        <Text style={styles.buttonText}>
          {currentIndex === onboardingData.length - 1
            ? 'Start Your Journey'
            : 'Continue'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Onboarding;
