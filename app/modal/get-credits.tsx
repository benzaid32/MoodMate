import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { X, Check, CreditCard } from 'lucide-react-native';
import { useCredits } from '@/context/CreditContext';

export default function GetCreditsScreen() {
  const { colors } = useTheme();
  const { addCredits } = useCredits();
  
  const creditPackages = [
    { id: 1, amount: 20, price: '$1.99', mostPopular: false },
    { id: 2, amount: 50, price: '$3.99', mostPopular: true },
    { id: 3, amount: 100, price: '$6.99', mostPopular: false },
    { id: 4, amount: 200, price: '$11.99', mostPopular: false },
  ];
  
  const subscriptionPlans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '$4.99/month',
      features: [
        'Unlimited recommendations',
        'No ads',
        'Premium filters',
        'Save unlimited favorites',
      ],
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: '$39.99/year',
      savings: 'Save 33%',
      features: [
        'Unlimited recommendations',
        'No ads',
        'Premium filters',
        'Save unlimited favorites',
        'Early access to new features',
      ],
    },
  ];
  
  const handlePurchaseCredits = (packageId) => {
    // In a real app, this would integrate with a payment processor
    console.log(`Purchasing credit package ${packageId}`);
    const selectedPackage = creditPackages.find(pkg => pkg.id === packageId);
    if (selectedPackage) {
      // For demo purposes, directly add credits
      addCredits(selectedPackage.amount);
      router.back();
    }
  };
  
  const handleSubscribe = (planId) => {
    // In a real app, this would integrate with a payment processor
    console.log(`Subscribing to ${planId} plan`);
    // For demo purposes, add some credits
    addCredits(50);
    router.back();
  };
  
  const handleWatchAd = () => {
    // In a real app, this would show an ad
    console.log('Watching ad for credits');
    // For demo purposes, add credits after "watching" ad
    addCredits(5);
  };
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.background}
      />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Get Credits</Text>
        <TouchableOpacity 
          style={[styles.closeButton, { backgroundColor: colors.cardDark }]}
          onPress={() => router.back()}
        >
          <X color={colors.text} size={20} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Buy Credit Packs
          </Text>
          
          <View style={styles.packageList}>
            {creditPackages.map((pkg) => (
              <TouchableOpacity 
                key={pkg.id}
                style={[
                  styles.packageCard, 
                  { 
                    backgroundColor: colors.cardDark,
                    borderColor: pkg.mostPopular ? colors.primary : 'transparent',
                    borderWidth: pkg.mostPopular ? 2 : 0,
                  }
                ]}
                onPress={() => handlePurchaseCredits(pkg.id)}
              >
                {pkg.mostPopular && (
                  <View style={[styles.popularBadge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.popularText}>Most Popular</Text>
                  </View>
                )}
                <Text style={[styles.creditsAmount, { color: colors.text }]}>
                  {pkg.amount}
                </Text>
                <Text style={[styles.creditsLabel, { color: colors.textSecondary }]}>
                  Credits
                </Text>
                <Text style={[styles.packagePrice, { color: colors.primary }]}>
                  {pkg.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={[styles.adSection, { backgroundColor: colors.cardDark }]}>
          <View style={styles.adSectionContent}>
            <Text style={[styles.adTitle, { color: colors.text }]}>
              Watch an Ad
            </Text>
            <Text style={[styles.adDescription, { color: colors.textSecondary }]}>
              Watch a short ad to get 5 free credits
            </Text>
          </View>
          <TouchableOpacity 
            style={[styles.watchButton, { backgroundColor: colors.accent }]}
            onPress={handleWatchAd}
          >
            <Text style={styles.watchButtonText}>Watch</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Subscribe for Unlimited Access
          </Text>
          
          <View style={styles.subscriptionList}>
            {subscriptionPlans.map((plan) => (
              <View 
                key={plan.id}
                style={[styles.subscriptionCard, { backgroundColor: colors.cardDark }]}
              >
                <View style={styles.subscriptionHeader}>
                  <Text style={[styles.planName, { color: colors.text }]}>
                    {plan.name}
                  </Text>
                  {plan.savings && (
                    <View style={[styles.savingsBadge, { backgroundColor: colors.success }]}>
                      <Text style={styles.savingsText}>{plan.savings}</Text>
                    </View>
                  )}
                </View>
                
                <Text style={[styles.planPrice, { color: colors.primary }]}>
                  {plan.price}
                </Text>
                
                <View style={styles.featuresList}>
                  {plan.features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <View style={[styles.checkIconContainer, { backgroundColor: `${colors.success}30` }]}>
                        <Check color={colors.success} size={16} />
                      </View>
                      <Text style={[styles.featureText, { color: colors.text }]}>
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>
                
                <TouchableOpacity 
                  style={[
                    styles.subscribeButton, 
                    { 
                      backgroundColor: plan.id === 'yearly' ? colors.primary : 'transparent',
                      borderColor: colors.primary,
                      borderWidth: 1,
                    }
                  ]}
                  onPress={() => handleSubscribe(plan.id)}
                >
                  <CreditCard 
                    color={plan.id === 'yearly' ? 'white' : colors.primary} 
                    size={18} 
                  />
                  <Text 
                    style={[
                      styles.subscribeButtonText, 
                      { color: plan.id === 'yearly' ? 'white' : colors.primary }
                    ]}
                  >
                    Subscribe
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
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
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  packageList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  packageCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
  },
  popularText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  creditsAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    marginTop: 12,
  },
  creditsLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  packagePrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginTop: 12,
  },
  adSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
  },
  adSectionContent: {
    flex: 1,
  },
  adTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  adDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  watchButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  watchButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  subscriptionList: {
    paddingHorizontal: 20,
  },
  subscriptionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  savingsBadge: {
    marginLeft: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  savingsText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  planPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginBottom: 16,
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  subscribeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 8,
  },
  subscribeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginLeft: 8,
  },
});