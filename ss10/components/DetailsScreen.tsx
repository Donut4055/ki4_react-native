import { View, Text, StyleSheet, Button } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function DetailsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Chi tiết',
          headerBackTitle: 'Quay lại'
        }} 
      />
      <Text style={styles.title}>Màn hình chi tiết</Text>
      <Button
        title="Quay lại"
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
