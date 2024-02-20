import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import Dialog from '~/components/profile/dialog';

export default function ModalScreen() {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <Pressable
        style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.3)' }]}
        onPress={() => router.back()}
      />
      <Dialog type="delete" />
    </View>
  );
}
