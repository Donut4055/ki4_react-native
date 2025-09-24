import { StyleSheet, View } from 'react-native';
import ProfileCard from '../../components/ProfileCard';

export default function BT1Screen() {
  return (
    <View style={styles.container}>
      <ProfileCard 
        name="Nguyễn Văn A"
        role="Sinh viên"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
});
