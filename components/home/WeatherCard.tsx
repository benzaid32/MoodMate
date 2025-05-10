import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Cloud, SunDim, CloudRain, Umbrella, MapPin, RefreshCw } from 'lucide-react-native';
import { useWeather } from '@/context/WeatherContext';
import * as Location from 'expo-location';

export default function WeatherCard() {
  const { colors } = useTheme();
  const { currentWeather, updateWeather } = useWeather();
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState(false);
  
  const fetchWeather = async () => {
    setLoading(true);
    setLocationError(false);
    
    try {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setLocationError(true);
        return;
      }
      
      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      
      // In a real app, we would call the OpenWeatherMap API here
      // For demo purposes, we'll simulate a weather response
      const mockWeatherData = {
        temperature: Math.floor(Math.random() * 30) + 5, // Random temp between 5-35°C
        condition: ['clear', 'cloudy', 'rainy', 'stormy'][Math.floor(Math.random() * 4)],
        location: 'Current Location',
        humidity: Math.floor(Math.random() * 40) + 30, // Random humidity between 30-70%
      };
      
      updateWeather(mockWeatherData);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setLocationError(true);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (!currentWeather) {
      fetchWeather();
    }
  }, []);
  
  const getWeatherIcon = () => {
    if (!currentWeather) return <Cloud color={colors.text} size={32} />;
    
    switch (currentWeather.condition) {
      case 'clear':
        return <SunDim color="#FFB800" size={32} />;
      case 'cloudy':
        return <Cloud color="#8E9AAF" size={32} />;
      case 'rainy':
        return <CloudRain color="#4A6FA5" size={32} />;
      case 'stormy':
        return <Umbrella color="#4A6FA5" size={32} />;
      default:
        return <Cloud color={colors.text} size={32} />;
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.cardDark }]}>
      <View style={styles.contentContainer}>
        <View style={styles.weatherIcon}>
          {getWeatherIcon()}
        </View>
        
        <View style={styles.weatherInfo}>
          {loading ? (
            <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
              Getting weather...
            </Text>
          ) : locationError ? (
            <Text style={[styles.errorText, { color: colors.error }]}>
              Location access denied
            </Text>
          ) : currentWeather ? (
            <>
              <Text style={[styles.temperature, { color: colors.text }]}>
                {currentWeather.temperature}°C
              </Text>
              <Text style={[styles.condition, { color: colors.textSecondary }]}>
                {currentWeather.condition.charAt(0).toUpperCase() + currentWeather.condition.slice(1)}
              </Text>
            </>
          ) : (
            <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
              No weather data
            </Text>
          )}
        </View>
      </View>
      
      <View style={styles.locationContainer}>
        {currentWeather && (
          <View style={styles.locationWrapper}>
            <MapPin color={colors.textSecondary} size={14} />
            <Text style={[styles.locationText, { color: colors.textSecondary }]}>
              {currentWeather.location}
            </Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={[styles.refreshButton, { backgroundColor: colors.cardLight }]}
          onPress={fetchWeather}
          disabled={loading}
        >
          <RefreshCw color={colors.primary} size={14} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  weatherInfo: {
    flex: 1,
  },
  temperature: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
  },
  condition: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  errorText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 4,
  },
  refreshButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});