import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

type FilterPillProps = {
  label: string;
  onRemove?: () => void;
};

export default function FilterPill({ label, onRemove }: FilterPillProps) {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.primaryLight }]}>
      <Text style={[styles.label, { color: colors.primary }]}>
        {label}
      </Text>
      
      {onRemove && (
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={onRemove}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <X color={colors.primary} size={14} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  removeButton: {
    marginLeft: 6,
  },
});