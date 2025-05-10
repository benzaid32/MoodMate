import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useCredits } from '@/context/CreditContext';
import { CreditCard, Bell, Moon, LogOut, CircleHelp as HelpCircle, ChevronRight, Settings, Coins } from 'lucide-react-native';

export default function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { credits } = useCredits();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/auth/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.background}
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
          <TouchableOpacity 
            style={[styles.settingsButton, { backgroundColor: colors.cardDark }]}
            onPress={() => router.push('/modal/settings')}
          >
            <Settings color={colors.primary} size={20} />
          </TouchableOpacity>
        </View>
        
        <View style={[styles.profileCard, { backgroundColor: colors.cardDark }]}>
          <View style={styles.profileInfo}>
            <Image 
              source={{ uri: user?.photoURL || 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} 
              style={styles.avatar} 
            />
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: colors.text }]}>
                {user?.displayName || 'User Name'}
              </Text>
              <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
                {user?.email || 'user@example.com'}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.editButton, { borderColor: colors.border }]}
            onPress={() => router.push('/modal/edit-profile')}
          >
            <Text style={[styles.editButtonText, { color: colors.primary }]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.creditsCard, { backgroundColor: colors.cardDark }]}>
          <View style={styles.creditsInfo}>
            <View style={styles.creditsIconContainer}>
              <Coins color={colors.accent} size={24} />
            </View>
            <View>
              <Text style={[styles.creditsLabel, { color: colors.textSecondary }]}>
                Available Credits
              </Text>
              <Text style={[styles.creditsValue, { color: colors.text }]}>
                {credits}
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.buyCreditsButton, { backgroundColor: colors.accent }]}
            onPress={() => router.push('/modal/get-credits')}
          >
            <Text style={styles.buyCreditsText}>Get More</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Preferences
          </Text>
          
          <View style={[styles.settingsCard, { backgroundColor: colors.cardDark }]}>
            <View style={styles.settingsRow}>
              <View style={styles.settingIconContainer}>
                <Bell color={colors.primary} size={20} />
              </View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Notifications
              </Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primaryLight }}
                thumbColor={notificationsEnabled ? colors.primary : colors.textSecondary}
              />
            </View>
            
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            
            <View style={styles.settingsRow}>
              <View style={styles.settingIconContainer}>
                <Moon color={colors.primary} size={20} />
              </View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Dark Mode
              </Text>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: colors.primaryLight }}
                thumbColor={isDark ? colors.primary : colors.textSecondary}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.helpSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Support
          </Text>
          
          <View style={[styles.settingsCard, { backgroundColor: colors.cardDark }]}>
            <TouchableOpacity 
              style={styles.settingsRow}
              onPress={() => router.push('/modal/help')}
            >
              <View style={styles.settingIconContainer}>
                <HelpCircle color={colors.primary} size={20} />
              </View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Help Center
              </Text>
              <ChevronRight color={colors.textSecondary} size={20} />
            </TouchableOpacity>
            
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            
            <TouchableOpacity 
              style={styles.settingsRow}
              onPress={() => router.push('/modal/subscription')}
            >
              <View style={styles.settingIconContainer}>
                <CreditCard color={colors.primary} size={20} />
              </View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Subscription
              </Text>
              <ChevronRight color={colors.textSecondary} size={20} />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.signOutButton, { borderColor: colors.error }]}
          onPress={handleSignOut}
        >
          <LogOut color={colors.error} size={20} />
          <Text style={[styles.signOutText, { color: colors.error }]}>
            Sign Out
          </Text>
        </TouchableOpacity>
        
        <Text style={[styles.versionText, { color: colors.textSecondary }]}>
          MoodMate v1.0.0
        </Text>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  editButton: {
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  creditsCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creditsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creditsIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  creditsLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  creditsValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
  },
  buyCreditsButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  buyCreditsText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: 'white',
  },
  settingsSection: {
    marginBottom: 24,
  },
  helpSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  settingsCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(111, 76, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingLabel: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  divider: {
    height: 1,
    marginHorizontal: 20,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    marginBottom: 16,
  },
  signOutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginLeft: 8,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
});