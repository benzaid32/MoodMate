import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';
import { Film as FilmReel, Music, X, Share2 } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { getFavorites, removeFromFavorites } from '@/utils/favorites';
import FavoriteCard from '@/components/favorites/FavoriteCard';
import SegmentedControl from '@/components/ui/SegmentedControl';

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    async function loadFavorites() {
      if (user) {
        try {
          setLoading(true);
          const userFavorites = await getFavorites(user.uid);
          setFavorites(userFavorites);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    
    loadFavorites();
  }, [user]);
  
  const handleRemove = async (itemId) => {
    if (user) {
      try {
        await removeFromFavorites(user.uid, itemId);
        // Update the local state
        setFavorites(favorites.filter(item => item.id !== itemId));
      } catch (error) {
        console.error("Error removing from favorites:", error);
      }
    }
  };
  
  const handleShare = (item) => {
    // Implement sharing functionality
    console.log("Share item:", item);
  };
  
  const filteredFavorites = activeTab === 'all' 
    ? favorites 
    : favorites.filter(item => item.type === activeTab);
  
  const renderItem = ({ item }) => (
    <FavoriteCard 
      item={item} 
      onRemove={() => handleRemove(item.id)}
      onShare={() => handleShare(item)}
    />
  );
  
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      {activeTab === 'all' ? (
        <Text style={[styles.emptyText, { color: colors.text }]}>
          You haven't saved any favorites yet
        </Text>
      ) : activeTab === 'movie' ? (
        <>
          <FilmReel color={colors.textSecondary} size={48} />
          <Text style={[styles.emptyText, { color: colors.text }]}>
            No favorite movies yet
          </Text>
        </>
      ) : (
        <>
          <Music color={colors.textSecondary} size={48} />
          <Text style={[styles.emptyText, { color: colors.text }]}>
            No favorite music yet
          </Text>
        </>
      )}
      <Text style={[styles.emptySubText, { color: colors.textSecondary }]}>
        Swipe right on recommendations to save them here
      </Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.background}
      />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Favorites</Text>
      </View>
      
      <View style={styles.segmentedControlContainer}>
        <SegmentedControl
          values={['All', 'Movies', 'Music']}
          selectedIndex={activeTab === 'all' ? 0 : activeTab === 'movie' ? 1 : 2}
          onChange={(index) => {
            setActiveTab(index === 0 ? 'all' : index === 1 ? 'movie' : 'music');
          }}
        />
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Loading favorites...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredFavorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
        />
      )}
    </View>
  );
}

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
  segmentedControlContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
});