import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { X, Share2, Film as FilmReel, Music, ExternalLink } from 'lucide-react-native';

type FavoriteCardProps = {
  item: any;
  onRemove: () => void;
  onShare: () => void;
};

export default function FavoriteCard({ item, onRemove, onShare }: FavoriteCardProps) {
  const { colors } = useTheme();
  
  if (!item) return null;
  
  const isMovie = item.type === 'movie';
  
  return (
    <View style={[styles.container, { backgroundColor: colors.cardDark }]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl || 'https://images.pexels.com/photos/3648850/pexels-photo-3648850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
          style={styles.image}
          resizeMode="cover"
        />
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
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {item.title || (isMovie ? 'Movie Title' : 'Song Title')}
          </Text>
          <TouchableOpacity 
            style={[styles.removeButton, { backgroundColor: `${colors.error}20` }]}
            onPress={onRemove}
          >
            <X color={colors.error} size={14} />
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.subtitle, { color: colors.textSecondary }]} numberOfLines={1}>
          {isMovie 
            ? (item.director || 'Director Name') 
            : (item.artist || 'Artist Name')}
        </Text>
        
        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
          {item.description || 
            (isMovie 
              ? 'A thrilling movie with unexpected twists and turns that will keep you on the edge of your seat.'
              : 'An energetic song with catchy beats and memorable lyrics that will get stuck in your head.')}
        </Text>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.cardLight }]}
            onPress={onShare}
          >
            <Share2 color={colors.text} size={16} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.streamButton, { backgroundColor: colors.primary }]}
          >
            <ExternalLink color="white" size={14} />
            <Text style={styles.streamButtonText}>
              {isMovie ? 'Watch' : 'Listen'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 120,
    height: 160,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  typeTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    marginLeft: 4,
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    flex: 1,
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streamButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  streamButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    marginLeft: 6,
  },
});