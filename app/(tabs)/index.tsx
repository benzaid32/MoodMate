import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Cloud, SunDim, CloudRain, Umbrella, Zap, CreditCard, Coins } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import MoodSelector from '@/components/home/MoodSelector';
import WeatherCard from '@/components/home/WeatherCard';
import CreditDisplay from '@/components/home/CreditDisplay';
import RecommendationCard from '@/components/recommendation/RecommendationCard';
import { useAuth } from '@/context/AuthContext';
import { fetchRecentRecommendations } from '@/utils/recommendations';
import { useMood } from '@/context/MoodContext';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { currentMood } = useMood();
  const [recentRecommendations, setRecentRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecentRecs() {
      try {
        if (user) {
          const recs = await fetchRecentRecommendations(user.uid);
          setRecentRecommendations(recs);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadRecentRecs();
  }, [user]);

  const getMoodMessage = () => {
    if (!currentMood) return "How are you feeling today?";
    
    if (currentMood.happiness > 7) return "You seem quite happy today!";
    if (currentMood.happiness < 3) return "Having a tough day?";
    if (currentMood.energy > 7) return "You're full of energy today!";
    if (currentMood.energy < 3) return "Feeling a bit low energy today?";
    
    return "How are you feeling today?";
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.background}
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.text }]}>
            Hello, {user?.displayName || 'Friend'}
          </Text>
          <Text style={[styles.subGreeting, { color: colors.textSecondary }]}>
            {getMoodMessage()}
          </Text>
        </View>
        
        <WeatherCard />
        
        <View style={styles.moodSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Your Mood
          </Text>
          <MoodSelector />
        </View>
        
        <View style={styles.creditSection}>
          <CreditDisplay />
          <TouchableOpacity 
            style={[styles.getCreditsButton, { backgroundColor: colors.accent }]}
            onPress={() => router.push('/modal/get-credits')}
          >
            <Coins color={colors.white} size={18} />
            <Text style={styles.getCreditsText}>Get Credits</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.recommendationSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recent Recommendations
            </Text>
            {recentRecommendations.length > 0 && (
              <TouchableOpacity onPress={() => router.push('/(tabs)/favorites')}>
                <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {loading ? (
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Loading recommendations...
            </Text>
          ) : recentRecommendations.length > 0 ? (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recommendationsScroll}
            >
              {recentRecommendations.map((item, index) => (
                <RecommendationCard key={index} item={item} mini />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                No recommendations yet. Try generating some!
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.getStartedSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Get Started
          </Text>
          <View style={styles.optionCards}>
            <TouchableOpacity 
              style={[styles.optionCard, { backgroundColor: colors.cardDark }]}
              onPress={() => router.push('/(tabs)/movies')}
            >
              <FilmReel color={colors.primary} size={32} />
              <Text style={[styles.optionTitle, { color: colors.text }]}>
                Movie Recommendations
              </Text>
              <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                Discover movies based on your mood
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.optionCard, { backgroundColor: colors.cardDark }]}
              onPress={() => router.push('/(tabs)/music')}
            >
              <Music color={colors.accent} size={32} />
              <Text style={[styles.optionTitle, { color: colors.text }]}>
                Music Recommendations
              </Text>
              <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                Find music that matches your feelings
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Import icons since they were used in JSX
import { Film as FilmReel, Music } from 'lucide-react-native';

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 90,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    marginBottom: 4,
  },
  subGreeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  moodSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginBottom: 16,
  },
  creditSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  getCreditsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  getCreditsText: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginLeft: 6,
  },
  recommendationSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAll: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  recommendationsScroll: {
    paddingBottom: 10,
  },
  emptyState: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    fontSize: 15,
  },
  getStartedSection: {
    marginBottom: 20,
  },
  optionCards: {
    flexDirection: 'column',
    gap: 16,
  },
  optionCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  optionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginTop: 12,
    marginBottom: 4,
  },
  optionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});