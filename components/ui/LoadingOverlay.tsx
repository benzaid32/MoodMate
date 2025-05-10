import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';

type LoadingOverlayProps = {
  message?: string;
};

export default function LoadingOverlay({ message = 'Generating recommendations...' }: LoadingOverlayProps) {
  const { colors } = useTheme();
  
  return (
    <Animated.View 
      style={[styles.container, { backgroundColor: `${colors.background}CC` }]}
      entering={FadeIn.duration(300)}
    >
      <View style={[styles.content, { backgroundColor: colors.cardDark }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.message, { color: colors.text }]}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  message: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
});