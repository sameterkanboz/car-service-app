import { Text, View, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
export default function ProfileScreen() {
  return (
    <View style={{ alignItems: 'center', flex: 1, backgroundColor: '#f8f8f8' }}>
      <View style={{ width: '100%', marginTop: 64, alignItems: 'center' }}>
        <LinearGradient
          // Background Linear Gradient
          colors={['rgba(224, 149, 81, 1)', 'rgba(238, 210, 185, 0.6)']}
          style={styles.background}
        />
        <Text>Profile</Text>
        <View
          style={{
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 6,
            elevation: 5,

            backgroundColor: '#f8f8f8',
            width: '90%',
            height: 200,
            borderRadius: 12,
            marginVertical: 32,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
            }}
            resizeMode="cover"
            source={require('../../assets/portrait/man.webp')}
          />
          <View style={{ alignItems: 'center' }}>
            <Text>Samet Erkan Boz</Text>
            <Text>@username</Text>
          </View>
        </View>
      </View>
      <View style={{ height: '100%', backgroundColor: '#f8f8f8', width: '100%' }}>
        <Text style={{ color: 'red' }}>Profile</Text>
        <View>
          <Text style={{ color: 'red' }}>CArs</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -64,
    height: '80%',
  },
});
