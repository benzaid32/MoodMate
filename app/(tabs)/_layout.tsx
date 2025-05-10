import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Chrome as Home, Film as FilmReel, Music, BookHeart as BookmarkHeart, User } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/context/ThemeContext';
import TabBarIcon from '@/components/ui/TabBarIcon';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
          height: 60,
        },
        tabBarBackground: () => (
          <BlurView 
            tint="dark" 
            intensity={80} 
            style={StyleSheet.absoluteFill} 
          />
        ),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: 'Inter-Regular',
          fontSize: 12,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon focused={focused}>
              <Home color={color} size={size} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="movies"
        options={{
          title: 'Movies',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon focused={focused}>
              <FilmReel color={color} size={size} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="music"
        options={{
          title: 'Music',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon focused={focused}>
              <Music color={color} size={size} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon focused={focused}>
              <BookmarkHeart color={color} size={size} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon focused={focused}>
              <User color={color} size={size} />
            </TabBarIcon>
          ),
        }}
      />
    </Tabs>
  );
}