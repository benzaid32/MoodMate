import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { X, Check } from 'lucide-react-native';
import Slider from '@react-native-community/slider';

type MovieFiltersProps = {
  visible: boolean;
  onClose: () => void;
  filters: {
    genres: string[];
    yearRange: number[];
    runtime: number[];
    streamingServices: string[];
  };
  setFilters: (filters: any) => void;
};

const genreOptions = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 
  'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'
];

const streamingOptions = [
  'Netflix', 'Amazon Prime', 'Disney+', 'Hulu', 'HBO Max', 'Apple TV+'
];

export default function MovieFilterModal({ 
  visible, 
  onClose, 
  filters, 
  setFilters 
}: MovieFiltersProps) {
  const { colors } = useTheme();
  
  const [localFilters, setLocalFilters] = useState({...filters});
  
  const toggleGenre = (genre: string) => {
    setLocalFilters(prev => {
      const updatedGenres = prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre];
      
      return { ...prev, genres: updatedGenres };
    });
  };
  
  const toggleStreamingService = (service: string) => {
    setLocalFilters(prev => {
      const updatedServices = prev.streamingServices.includes(service)
        ? prev.streamingServices.filter(s => s !== service)
        : [...prev.streamingServices, service];
      
      return { ...prev, streamingServices: updatedServices };
    });
  };
  
  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };
  
  const handleReset = () => {
    const resetFilters = {
      genres: [],
      yearRange: [1980, 2023],
      runtime: [60, 180],
      streamingServices: []
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
    onClose();
  };
  
  if (!visible) return null;
  
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Movie Filters
            </Text>
            <TouchableOpacity 
              style={[styles.closeButton, { backgroundColor: colors.cardDark }]}
              onPress={onClose}
            >
              <X color={colors.text} size={20} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Genres
              </Text>
              <View style={styles.genreGrid}>
                {genreOptions.map((genre) => (
                  <TouchableOpacity
                    key={genre}
                    style={[
                      styles.genreChip,
                      { 
                        backgroundColor: localFilters.genres.includes(genre) 
                          ? colors.primary 
                          : colors.cardDark 
                      }
                    ]}
                    onPress={() => toggleGenre(genre)}
                  >
                    <Text 
                      style={[
                        styles.genreChipText, 
                        { 
                          color: localFilters.genres.includes(genre) 
                            ? 'white' 
                            : colors.text 
                        }
                      ]}
                    >
                      {genre}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Release Year
              </Text>
              <View style={styles.sliderContainer}>
                <View style={styles.sliderLabels}>
                  <Text style={[styles.sliderValue, { color: colors.text }]}>
                    {localFilters.yearRange[0]}
                  </Text>
                  <Text style={[styles.sliderValue, { color: colors.text }]}>
                    {localFilters.yearRange[1]}
                  </Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={1950}
                  maximumValue={2023}
                  step={1}
                  value={localFilters.yearRange[0]}
                  onValueChange={(value) => setLocalFilters(prev => ({
                    ...prev,
                    yearRange: [value, prev.yearRange[1]]
                  }))}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.primary}
                />
                <Slider
                  style={styles.slider}
                  minimumValue={1950}
                  maximumValue={2023}
                  step={1}
                  value={localFilters.yearRange[1]}
                  onValueChange={(value) => setLocalFilters(prev => ({
                    ...prev,
                    yearRange: [prev.yearRange[0], value]
                  }))}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.primary}
                />
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Runtime (minutes)
              </Text>
              <View style={styles.sliderContainer}>
                <View style={styles.sliderLabels}>
                  <Text style={[styles.sliderValue, { color: colors.text }]}>
                    {localFilters.runtime[0]} min
                  </Text>
                  <Text style={[styles.sliderValue, { color: colors.text }]}>
                    {localFilters.runtime[1]} min
                  </Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={30}
                  maximumValue={240}
                  step={5}
                  value={localFilters.runtime[0]}
                  onValueChange={(value) => setLocalFilters(prev => ({
                    ...prev,
                    runtime: [value, prev.runtime[1]]
                  }))}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.primary}
                />
                <Slider
                  style={styles.slider}
                  minimumValue={30}
                  maximumValue={240}
                  step={5}
                  value={localFilters.runtime[1]}
                  onValueChange={(value) => setLocalFilters(prev => ({
                    ...prev,
                    runtime: [prev.runtime[0], value]
                  }))}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.border}
                  thumbTintColor={colors.primary}
                />
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Streaming Services
              </Text>
              <View style={styles.servicesList}>
                {streamingOptions.map((service) => (
                  <TouchableOpacity
                    key={service}
                    style={[
                      styles.serviceItem,
                      { backgroundColor: colors.cardDark }
                    ]}
                    onPress={() => toggleStreamingService(service)}
                  >
                    <Text style={[styles.serviceText, { color: colors.text }]}>
                      {service}
                    </Text>
                    {localFilters.streamingServices.includes(service) && (
                      <View style={[styles.checkContainer, { backgroundColor: colors.primary }]}>
                        <Check color="white" size={12} />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.resetButton, { borderColor: colors.border }]}
              onPress={handleReset}
            >
              <Text style={[styles.resetButtonText, { color: colors.text }]}>
                Reset
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.applyButton, { backgroundColor: colors.primary }]}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    height: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  genreChipText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sliderValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  servicesList: {
    marginBottom: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  serviceText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
  },
  checkContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    minWidth: 100,
    alignItems: 'center',
  },
  resetButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  applyButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    minWidth: 140,
    alignItems: 'center',
  },
  applyButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
});