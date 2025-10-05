import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

// Import the CSS for the drawer
import 'react-native-gesture-handler';

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer>
        <Drawer.Screen
          name="(drawer)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Trang chủ',
          }}
        />
        <StatusBar style="auto" />
      </Drawer>
    </ThemeProvider>
  );
}
