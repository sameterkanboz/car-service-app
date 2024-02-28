import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import CustomButton from '~/components/auth/button';
import Carousel from '~/components/profile/carousel';
import { useAuth } from '../../context/AuthContext';
export default function ProfileScreen() {
  const { user, onLogout, onDeleteUser } = useAuth();
  const handleLogout = async () => {
    if (onLogout) {
      const result = await onLogout();
      router.replace('/(auth)/');
      if (result && result.error) {
        console.log(result.message);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (onDeleteUser) {
      const result = await onDeleteUser();
      router.replace('/(auth)/');
      if (result && result.error) {
        console.log(result.message);
      }
    }
  };
  return (
    <View style={{ alignItems: 'center', flex: 1, backgroundColor: '#f8f8f8' }}>
      <View style={{ width: '100%', marginTop: 64, alignItems: 'center' }}>
        <LinearGradient
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
            source={require('../../../assets/portrait/man.png')}
          />
          <View style={{ alignItems: 'center' }}>
            <Text>
              {user?.first_name} {user?.last_name}
            </Text>
            <Text>@{user?.username}</Text>
            {/* <Pressable onPress={handleLogout}>
              <Text>bas</Text>
            </Pressable> */}
            {user?.role === 'mechanic' && (
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <MaterialIcons name="car-repair" size={24} color="black" />
                <Text>Mechanic</Text>
              </View>
            )}
            {user?.role === 'customer' && (
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <MaterialIcons name="directions-car" size={24} color="black" />
                <Text>Customer</Text>
              </View>
            )}
            {user?.role === 'admin' && (
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <MaterialIcons name="admin-panel-settings" size={24} color="black" />
                <Text>Admin</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#f8f8f8',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}>
        <View
          style={{
            backgroundColor: '#f8f8f8',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {/* <Text>{user?.car_id.Int64}</Text> */}
        </View>
        <Carousel />
        <CustomButton
          type="primary"
          title="settings"
          onPress={() => router.navigate('/(profile)/settingsModal')}
        />
        <CustomButton
          type="error"
          title="delete account"
          //  onPress={handleDeleteAccount}
          onPress={() => router.navigate('/(profile)/deleteModal')}
        />
        <CustomButton
          type="secondary"
          title="logout"
          //  onPress={handleLogout}
          onPress={() => router.navigate('/(profile)/logOutModal')}
        />
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
