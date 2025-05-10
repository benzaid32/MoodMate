import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';

type SegmentedControlProps = {
  values: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
};

export default function SegmentedControl({ 
  values, 
  selectedIndex, 
  onChange 
}: SegmentedControlProps) {
  const { colors } = useTheme();
  const [segmentWidths, setSegmentWidths] = useState<number[]>([]);
  
  const translateX = useSharedValue(0);
  const segmentWidth = useSharedValue(0);
  
  useEffect(() => {
    if (segmentWidths.length) {
      let position = 0;
      for (let i = 0; i < selectedIndex; i++) {
        position += segmentWidths[i];
      }
      translateX.value = withTiming(position, { duration: 200 });
      segmentWidth.value = withTiming(segmentWidths[selectedIndex], { duration: 200 });
    }
  }, [selectedIndex, segmentWidths]);
  
  const handleLayout = (index: number, event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setSegmentWidths(prev => {
      const newWidths = [...prev];
      newWidths[index] = width;
      return newWidths;
    });
  };
  
  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      width: segmentWidth.value,
    };
  });
  
  return (
    <View style={[styles.container, { backgroundColor: colors.cardDark }]}>
      <Animated.View 
        style={[
          styles.indicator, 
          { backgroundColor: colors.primary },
          animatedIndicatorStyle,
        ]} 
      />
      
      {values.map((value, index) => (
        <TouchableOpacity
          key={index}
          style={styles.segment}
          onPress={() => onChange(index)}
          onLayout={(event) => handleLayout(index, event)}
        >
          <Text 
            style={[
              styles.segmentText, 
              { 
                color: selectedIndex === index ? colors.text : colors.textSecondary,
                fontFamily: selectedIndex === index ? 'Inter-SemiBold' : 'Inter-Regular',
              }
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
    height: 44,
  },
  indicator: {
    position: 'absolute',
    height: '100%',
    borderRadius: 30,
    top: 0,
  },
  segment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    zIndex: 1,
  },
  segmentText: {
    fontSize: 14,
  },
});