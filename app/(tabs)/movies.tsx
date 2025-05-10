import { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';
import { FileSliders as Sliders, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react-native';
import RecommendationCard from '@/components/recommendation/RecommendationCard';
import MovieFilterModal from '@/components/movies/MovieFilterModal';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import FilterPill from '@/components/ui/FilterPill';
import { generateMovieRecommendations } from '@/utils/recommendations';
import { useMood } from '@/context/MoodContext';
import { useWeather } from '@/context/WeatherContext';
import { useCredits } from '@/context/CreditContext';
import { saveToFavorites } from '@/utils/favorites';
import { useAuth } from '@/context/AuthContext';

const { width } = Dimensions.get('window');

export default function MoviesScreen() {
  const { colors } = useTheme();
  const { currentMood } = useMood();
  const { currentWeather } = useWeather();
  const { user } = useAuth();
  const { credits, useCredit } = useCredits();
  
  const [recommendations, setRecommendations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    genres: [],
    yearRange: [1980, 2023],
    runtime: [60, 180],
    streamingServices: []
  });
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  
  const swipeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const nextCardScale = useRef(new Animated.Value(0.9)).current;
  
  const rotate = rotateAnim.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
    extrapolate: 'clamp',
  });

  const generateRecommendations = async () => {
    if (credits <= 0) {
      // Handle insufficient credits
      return;
    }
    
    try {
      setLoading(true);
      const newRecommendations = await generateMovieRecommendations(
        currentMood,
        currentWeather,
        filters
      );
      
      // Use a credit
      useCredit();
      
      setRecommendations(newRecommendations);
      setCurrentIndex(0);
      resetCardPosition();
    } catch (error) {
      console.error("Error generating recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetCardPosition = () => {
    Animated.spring(swipeAnim, {
      toValue: 0,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
    
    Animated.spring(rotateAnim, {
      toValue: 0,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleSwipeLeft = () => {
    Animated.timing(swipeAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      nextCard();
    });
  };

  const handleSwipeRight = () => {
    Animated.timing(swipeAnim, {
      toValue: width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Save to favorites before moving to next card
      if (recommendations[currentIndex] && user) {
        saveToFavorites(user.uid, recommendations[currentIndex], 'movie');
      }
      nextCard();
    });
  };

  const nextCard = () => {
    // If we still have cards remaining
    if (currentIndex < recommendations.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      resetCardPosition();
      
      // Animate the next card scaling up
      Animated.spring(nextCardScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }).start(() => {
        // Reset the next card scale for future animations
        nextCardScale.setValue(0.9);
      });
    } else {
      // Reset if we've gone through all cards
      setRecommendations([]);
    }
  };

  const handlePanResponderMove = (_, gestureState) => {
    const { dx } = gestureState;
    swipeAnim.setValue(dx);
    rotateAnim.setValue(dx);
  };

  const handlePanResponderRelease = (_, gestureState) => {
    const { dx } = gestureState;
    
    if (dx > 120) {
      handleSwipeRight();
    } else if (dx < -120) {
      handleSwipeLeft();
    } else {
      resetCardPosition();
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.background}
      />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Movie Recommendations</Text>
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: colors.cardDark }]}
          onPress={() => setFilterModalVisible(true)}
        >
          <Sliders color={colors.primary} size={20} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterPills}>
          {filters.genres.map((genre, index) => (
            <FilterPill key={index} label={genre} />
          ))}
          {filters.streamingServices.map((service, index) => (
            <FilterPill key={`service-${index}`} label={service} />
          ))}
          {(filters.yearRange[0] !== 1980 || filters.yearRange[1] !== 2023) && (
            <FilterPill label={`${filters.yearRange[0]}-${filters.yearRange[1]}`} />
          )}
        </ScrollView>
      </View>
      
      <View style={styles.cardsContainer}>
        {recommendations.length > 0 ? (
          <>
            {/* Current card (with animation) */}
            <Animated.View
              style={[
                styles.cardWrapper,
                {
                  transform: [
                    { translateX: swipeAnim },
                    { rotate },
                    { scale: 1 },
                  ],
                  zIndex: 1,
                },
              ]}
              {...panResponder.panHandlers}
            >
              <RecommendationCard item={recommendations[currentIndex]} />
            </Animated.View>
            
            {/* Next card (peeking from behind) */}
            {currentIndex < recommendations.length - 1 && (
              <Animated.View
                style={[
                  styles.cardWrapper,
                  {
                    transform: [{ scale: nextCardScale }],
                    zIndex: 0,
                  },
                ]}
              >
                <RecommendationCard item={recommendations[currentIndex + 1]} />
              </Animated.View>
            )}
            
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.error }]}
                onPress={handleSwipeLeft}
              >
                <ThumbsDown color="white" size={24} />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.success }]}
                onPress={handleSwipeRight}
              >
                <ThumbsUp color="white" size={24} />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={[styles.emptyStateText, { color: colors.text }]}>
              No recommendations yet
            </Text>
            <Text style={[styles.emptyStateSubText, { color: colors.textSecondary }]}>
              Generate recommendations based on your mood and preferences
            </Text>
            <TouchableOpacity
              style={[styles.generateButton, { backgroundColor: colors.primary }]}
              onPress={generateRecommendations}
              disabled={credits <= 0}
            >
              <RefreshCw color="white" size={18} />
              <Text style={styles.generateButtonText}>
                Generate Recommendations ({credits} credits)
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <MovieFilterModal 
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filters={filters}
        setFilters={setFilters}
      />
      
      {loading && <LoadingOverlay />}
    </View>
  );
}

// Import ScrollView since it was used in JSX
import { ScrollView } from 'react-native';

// Create pan responder for swipe gestures
import { PanResponder } from 'react-native';

const panResponder = PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onPanResponderMove: handlePanResponderMove,
  onPanResponderRelease: handlePanResponderRelease,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    marginBottom: 20,
    marginLeft: 20,
  },
  filterPills: {
    paddingRight: 20,
    gap: 8,
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  cardWrapper: {
    position: 'absolute',
    width: width - 40,
    height: 500,
    maxHeight: '80%',
  },
  actionsContainer: {
    position: 'absolute',
    bottom: -70,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    gap: 60,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 16,
  },
  generateButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginLeft: 8,
  },
});