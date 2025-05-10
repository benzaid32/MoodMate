import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';

type TabBarIconProps = {
  focused: boolean;
  children: React.ReactNode;
};

export default function TabBarIcon({ focused, children }: TabBarIconProps) {
  const { colors } = useTheme();
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(focused ? 1.1 : 1, { duration: 200 }),
        },
      ],
      opacity: withTiming(focused ? 1 : 0.7, { duration: 200 }),
    };
  });
  
  return (
    <Animated.View style={animatedStyle}>
      <View
        style={[
          styles.iconContainer,
          focused && { backgroundColor: `${colors.primary}20` },
        ]}
      >
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 4,
    borderRadius: 8,
  },
});