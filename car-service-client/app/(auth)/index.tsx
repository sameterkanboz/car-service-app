import { Button, StyleSheet, Text, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import CustomButton from '~/components/auth/button';
import { TextField } from '~/components/auth/textfield';
import { logo } from '~/components/home/header';
import { useAuth } from '../context/AuthContext';
type Appointments = {
  appointment_type: number;
  appointment_date: string;
  appointment_status: string;
  car_id: number;
  created_at: string;
  updated_at: string;
  id: number;
  customer_id: number;
  mechanic_id: number;
};
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    message: '',
    error: false,
  });

  const { onLogin, authState, onLogout } = useAuth();

  const handleLogin = async () => {
    if (onLogin) {
      const result = await onLogin(email, password);
      setError({ message: '', error: false });

      if (result && result.error) {
        console.log(result.message);
        setError({ message: result.message, error: true });
      } else {
        router.replace('/(tabs)/');
      }
    }
  };

  const handleLogout = async () => {
    if (onLogout) {
      const result = await onLogout();
      router.replace('/(auth)/');
      if (result && result.error) {
        console.log(result.message);
      }
    }
  };
  return (
    <View className={styles.container}>
      <LinearGradient
        colors={['rgba(224, 149, 81, 1)', 'rgba(238, 210, 185, 0.6)']}
        style={stylesNew.background}
      />
      <View style={{ position: 'absolute', top: 48 }}>
        <SvgXml xml={logo} />
      </View>

      <Text style={{ letterSpacing: 10, fontWeight: '400' }} className={styles.title}>
        login
      </Text>
      <TextField placeholder="email" value={email} onChangeText={(value) => setEmail(value)} />
      <TextField
        placeholder="password"
        value={password}
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
      />
      <CustomButton type="primary" title="login" onPress={handleLogin} />
      {error.error && <Text style={{ color: 'red' }}>{error.message}</Text>}
      {authState?.authenticated && <Button title="logout" onPress={handleLogout} />}
      <Text style={{ position: 'absolute', bottom: 96 }}>
        don't have an account?{' '}
        <Link style={{ color: '#E09551' }} href={'/(auth)/register'}>
          sign up
        </Link>
      </Text>
    </View>
  );
}

const styles = {
  container: `items-center flex-1 justify-center gap-8`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};

const stylesNew = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
});
