import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function Index() {
  useEffect(() => {
    // Hide splash screen after a delay
    setTimeout(() => {
      SplashScreen.hideAsync().catch(() => {
        /* reloading the app might trigger some race conditions, ignore them */
      });
    }, 1000);
  }, []);

  // Redirect to the tabs layout
  return <Redirect href="/(tabs)" />;
}