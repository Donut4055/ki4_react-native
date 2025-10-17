import { ActivityIndicator } from 'react-native';
import { ThemedView } from './themed-view';


export function LoadingScreen() {
  return (
    <ThemedView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ActivityIndicator size="large" />
    </ThemedView>
  );
}
