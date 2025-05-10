import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Coins } from 'lucide-react-native';
import { useCredits } from '@/context/CreditContext';

export default function CreditDisplay() {
  const { colors } = useTheme();
  const { credits } = useCredits();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.cardLight }]}>
      <View style={[styles.iconContainer, { backgroundColor: `${colors.accent}30` }]}>
        <Coins color={colors.accent} size={20} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.creditAmount, { color: colors.text }]}>
          {credits}
        </Text>
        <Text style={[styles.creditLabel, { color: colors.textSecondary }]}>
          Available Credits
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  creditAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  creditLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
});