import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { X, Check, Plus } from 'lucide-react-native';

type MusicFiltersProps = {
  visible: boolean;
  onClose: () => void;
  filters: {
    genres: string[];
    mood: string;
    activity: string;
    artists: string[];
  };
  setFilters: (filters: any) => void;
};

const genreOptions = [
  'Pop', 'Rock', 'Hip Hop', 'R&B', 'Country', 'Electronic', 'Jazz', 
  'Classical', 'Indie', 'Folk', 'Metal', 'Reggae', 'Latin'
];

const moodOptions = [
  'Happy', 'Sad', 'Relaxed', 'Energetic', 'Focused', 'Romantic', 'Angry', 'Nostalgic'
];

const activityOptions = [
  'Workout', 'Study', 'Relaxation', 'Party', 'Commute', 'Sleep', 'Work', 'Meditation'
];

export default function MusicFilterModal({ 
  visible, 
  onClose, 
  filters, 
  setFilters 
}: MusicFiltersProps) {
  const { colors } = useTheme();
  
  const [localFilters, setLocalFilters] = useState({...filters});
  const [newArtist, setNewArtist] = useState('');
  
  const toggleGenre = (genre: string) => {
    setLocalFilters(prev => {
      const updatedGenres = prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre];
      
      return { ...prev, genres: updatedGenres };
    });
  };
  
  const selectMood = (mood: string) => {
    setLocalFilters(prev => ({
      ...prev,
      mood: prev.mood === mood ? '' : mood
    }));
  };
  
  const selectActivity = (activity: string) => {
    setLocalFilters(prev => ({
      ...prev,
      activity: prev.activity === activity ? '' : activity
    }));
  };
  
  const addArtist = () => {
    if (newArtist.trim() && !localFilters.artists.includes(newArtist.trim())) {
      setLocalFilters(prev => ({
        ...prev,
        artists: [...prev.artists, newArtist.trim()]
      }));
      setNewArtist('');
    }
  };
  
  const removeArtist = (artist: string) => {
    setLocalFilters(prev => ({
      ...prev,
      artists: prev.artists.filter(a => a !== artist)
    }));
  };
  
  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };
  
  const handleReset = () => {
    const resetFilters = {
      genres: [],
      mood: '',
      activity: '',
      artists: []
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
              Music Filters
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
                Mood
              </Text>
              <View style={styles.optionsGrid}>
                {moodOptions.map((mood) => (
                  <TouchableOpacity
                    key={mood}
                    style={[
                      styles.optionChip,
                      { 
                        backgroundColor: localFilters.mood === mood 
                          ? colors.accent 
                          : colors.cardDark 
                      }
                    ]}
                    onPress={() => selectMood(mood)}
                  >
                    <Text 
                      style={[
                        styles.optionChipText, 
                        { 
                          color: localFilters.mood === mood 
                            ? 'white' 
                            : colors.text 
                        }
                      ]}
                    >
                      {mood}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Activity
              </Text>
              <View style={styles.optionsGrid}>
                {activityOptions.map((activity) => (
                  <TouchableOpacity
                    key={activity}
                    style={[
                      styles.optionChip,
                      { 
                        backgroundColor: localFilters.activity === activity 
                          ? colors.accent 
                          : colors.cardDark 
                      }
                    ]}
                    onPress={() => selectActivity(activity)}
                  >
                    <Text 
                      style={[
                        styles.optionChipText, 
                        { 
                          color: localFilters.activity === activity 
                            ? 'white' 
                            : colors.text 
                        }
                      ]}
                    >
                      {activity}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Favorite Artists
              </Text>
              <View style={styles.artistInputContainer}>
                <TextInput
                  style={[styles.artistInput, { 
                    color: colors.text, 
                    backgroundColor: colors.cardDark,
                    borderColor: colors.border
                  }]}
                  value={newArtist}
                  onChangeText={setNewArtist}
                  placeholder="Add an artist"
                  placeholderTextColor={colors.textSecondary}
                  onSubmitEditing={addArtist}
                />
                <TouchableOpacity 
                  style={[styles.addButton, { backgroundColor: colors.primary }]}
                  onPress={addArtist}
                >
                  <Plus color="white" size={20} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.artistList}>
                {localFilters.artists.map((artist, index) => (
                  <View 
                    key={index}
                    style={[styles.artistTag, { backgroundColor: colors.cardDark }]}
                  >
                    <Text style={[styles.artistTagText, { color: colors.text }]}>
                      {artist}
                    </Text>
                    <TouchableOpacity 
                      style={styles.removeTagButton}
                      onPress={() => removeArtist(artist)}
                    >
                      <X color={colors.text} size={14} />
                    </TouchableOpacity>
                  </View>
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
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  optionChipText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  artistInputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  artistInput: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 16,
    marginRight: 12,
    borderWidth: 1,
    fontFamily: 'Inter-Regular',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artistList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  artistTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  artistTagText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginRight: 6,
  },
  removeTagButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
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