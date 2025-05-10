import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { useMood } from '@/context/MoodContext';

// Icons from emoji visuals
const moodIcons = {
  happy: '😄',
  sad: '😔',
  energetic: '⚡',
  relaxed: '😌',
  angry: '😠',
  anxious: '😰',
};

export default function MoodSelector() {
  const { colors } = useTheme();
  const { currentMood, updateMood } = useMood();
  
  // Using shared values for animated sliders
  const happinessValue = useSharedValue(currentMood?.happiness || 5);
  const energyValue = useSharedValue(currentMood?.energy || 5);
  
  const updateHappiness = (value: number) => {
    happinessValue.value = withSpring(value);
    updateMood({ ...currentMood, happiness: value });
  };
  
  const updateEnergy = (value: number) => {
    energyValue.value = withSpring(value);
    updateMood({ ...currentMood, energy: value });
  };
  
  const happinessThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: (happinessValue.value - 1) * 30 }],
    };
  });
  
  const energyThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: (energyValue.value - 1) * 30 }],
    };
  });
  
  const getMoodEmoji = () => {
    const happiness = currentMood?.happiness || 5;
    const energy = currentMood?.energy || 5;
    
    if (happiness > 7 && energy > 7) return moodIcons.happy;
    if (happiness < 3 && energy < 3) return moodIcons.sad;
    if (happiness < 3 && energy > 7) return moodIcons.angry;
    if (happiness > 7 && energy < 3) return moodIcons.relaxed;
    if (energy > 7) return moodIcons.energetic;
    if (happiness < 4) return moodIcons.anxious;
    
    return moodIcons.happy;
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.cardDark }]}>
      <View style={styles.emojiContainer}>
        <Text style={styles.emojiDisplay}>{getMoodEmoji()}</Text>
      </View>
      
      <View style={styles.slidersContainer}>
        <View style={styles.sliderRow}>
          <Text style={[styles.sliderLabel, { color: colors.text }]}>Happiness</Text>
          <View style={[styles.sliderTrack, { backgroundColor: colors.cardLight }]}>
            <Animated.View 
              style={[
                styles.sliderThumb, 
                { backgroundColor: colors.primary },
                happinessThumbStyle,
              ]} 
            />
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <TouchableOpacity
                key={value}
                style={styles.sliderTick}
                onPress={() => updateHappiness(value)}
              />
            ))}
          </View>
          <View style={styles.sliderLabels}>
            <Text style={[styles.sliderLabelEnd, { color: colors.textSecondary }]}>Sad</Text>
            <Text style={[styles.sliderLabelEnd, { color: colors.textSecondary }]}>Happy</Text>
          </View>
        </View>
        
        <View style={styles.sliderRow}>
          <Text style={[styles.sliderLabel, { color: colors.text }]}>Energy</Text>
          <View style={[styles.sliderTrack, { backgroundColor: colors.cardLight }]}>
            <Animated.View 
              style={[
                styles.sliderThumb, 
                { backgroundColor: colors.primary },
                energyThumbStyle,
              ]} 
            />
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <TouchableOpacity
                key={value}
                style={styles.sliderTick}
                onPress={() => updateEnergy(value)}
              />
            ))}
          </View>
          <View style={styles.sliderLabels}>
            <Text style={[styles.sliderLabelEnd, { color: colors.textSecondary }]}>Low</Text>
            <Text style={[styles.sliderLabelEnd, { color: colors.textSecondary }]}>High</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
  },
  emojiContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  emojiDisplay: {
    fontSize: 40,
  },
  slidersContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sliderRow: {
    marginBottom: 16,
  },
  sliderLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginBottom: 8,
  },
  sliderTrack: {
    height: 20,
    borderRadius: 10,
    position: 'relative',
  },
  sliderThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    top: -2,
    left: -2,
    zIndex: 2,
  },
  sliderTick: {
    position: 'absolute',
    width: 30,
    height: 20,
    top: 0,
    zIndex: 1,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sliderLabelEnd: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
});