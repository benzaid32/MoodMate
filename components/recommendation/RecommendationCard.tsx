import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';
import { Star, Clock, Tag, Music, Film as FilmReel, ExternalLink } from 'lucide-react-native';

type RecommendationCardProps = {
  item: any;
  type?: 'movie' | 'music';
  mini?: boolean;
  onPress?: () => void;
};

const { width } = Dimensions.get('window');

export default function RecommendationCard({ 
  item,
  type = 'movie',
  mini = false,
  onPress
}: RecommendationCardProps) {
  const { colors } = useTheme();
  
  if (!item) {
    return (
      <View style={[
        styles.container,
        mini && styles.miniContainer,
        { backgroundColor: colors.cardDark }
      ]}>
        <Text style={[styles.errorText, { color: colors.textSecondary }]}>
          No data available
        </Text>
      </View>
    );
  }
  
  const isMovie = type === 'movie';
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        mini && styles.miniContainer,
        { backgroundColor: colors.cardDark }
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: item.imageUrl || 'https://images.pexels.com/photos/3648850/pexels-photo-3648850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <View style={[styles.typeTag, { backgroundColor: isMovie ? colors.primary : colors.accent }]}>
            {isMovie ? (
              <FilmReel color="white" size={12} />
            ) : (
              <Music color="white" size={12} />
            )}
            <Text style={styles.typeText}>
              {isMovie ? 'Movie' : 'Music'}
            </Text>
          </View>
          
          {!mini && (
            <View style={[styles.ratingContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
              <Star color="#FFB800" size={14} />
              <Text style={styles.ratingText}>
                {item.rating || '4.5'}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title || (isMovie ? 'Movie Title' : 'Song Title')}
          </Text>
          
          {!mini && isMovie && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {item.director || 'Director Name'}
            </Text>
          )}
          
          {!mini && !isMovie && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {item.artist || 'Artist Name'}
            </Text>
          )}
          
          <View style={styles.metaContainer}>
            {isMovie && (
              <View style={styles.metaItem}>
                <Clock color="white" size={12} />
                <Text style={styles.metaText}>
                  {item.duration || '120 min'}
                </Text>
              </View>
            )}
            
            {!isMovie && (
              <View style={styles.metaItem}>
                <Clock color="white" size={12} />
                <Text style={styles.metaText}>
                  {item.duration || '3:45'}
                </Text>
              </View>
            )}
            
            <View style={styles.metaItem}>
              <Tag color="white" size={12} />
              <Text style={styles.metaText}>
                {isMovie 
                  ? (item.genre || 'Action, Drama') 
                  : (item.genre || 'Pop, Dance')}
              </Text>
            </View>
          </View>
          
          {!mini && (
            <Text style={styles.description} numberOfLines={3}>
              {item.description || 
                (isMovie 
                  ? 'A thrilling movie with unexpected twists and turns that will keep you on the edge of your seat.'
                  : 'An energetic song with catchy beats and memorable lyrics that will get stuck in your head.')}
            </Text>
          )}
          
          {!mini && (
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]}>
              <ExternalLink color="white" size={14} />
              <Text style={styles.actionButtonText}>
                {isMovie ? 'Watch Now' : 'Listen Now'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 480,
    width: width - 40,
  },
  miniContainer: {
    height: 180,
    width: 160,
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    marginLeft: 4,
  },
  details: {
    marginTop: 'auto',
  },
  title: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    color: 'white',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    color: 'white',
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  description: {
    color: 'white',
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginLeft: 6,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
});