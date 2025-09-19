import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.610aa6a8aec845279502ee316b927c3c',
  appName: 'My Favorite Getaway',
  webDir: 'dist',
  server: {
    url: 'https://610aa6a8-aec8-4527-9502-ee316b927c3c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0ea5e9',
      showSpinner: false
    }
  }
};

export default config;