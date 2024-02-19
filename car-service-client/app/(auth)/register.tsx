import { Button, StyleSheet, Text, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import CustomButton from '~/components/auth/button';
import Checkbox from '~/components/auth/checkbox';
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
export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('');
  const [name, setName] = useState({
    first_name: '',
    last_name: '',
  });

  const [error, setError] = useState({
    message: '',
    error: false,
  });
  console.log(userType, 'userType');
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
        register
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '80%',
        }}>
        <Checkbox
          text={'customer'}
          onPress={() => {
            setUserType('customer');
          }}
          isChecked={userType === 'customer'}
          textStyle={{ color: 'black' }}
        />
        <Checkbox
          text={'mechanic'}
          onPress={() => {
            setUserType('mechanic');
          }}
          isChecked={userType === 'mechanic'}
          textStyle={{ color: 'black' }}
        />
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
        <TextField
          placeholder="first name"
          value={name.first_name}
          onChangeText={(value) => setName({ ...name, first_name: value })}
          style={{ width: '40%' }}
        />
        <TextField
          placeholder="last name"
          value={name.last_name}
          onChangeText={(value) => setName({ ...name, last_name: value })}
          style={{ width: '40%' }}
        />
      </View>

      <TextField
        placeholder="username"
        value={username}
        onChangeText={(value) => setUsername(value)}
      />
      <TextField placeholder="email" value={email} onChangeText={(value) => setEmail(value)} />
      <TextField
        placeholder="password"
        value={password}
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
      />
      <TextField
        placeholder="re-password"
        value={rePassword}
        secureTextEntry={true}
        onChangeText={(value) => setRePassword(value)}
      />
      <CustomButton type="primary" title="login" onPress={handleLogin} />
      {error.error && <Text style={{ color: 'red' }}>{error.message}</Text>}
      {authState?.authenticated && <Button title="logout" onPress={handleLogout} />}
      <Text style={{ position: 'absolute', bottom: 96 }}>
        already have an account?{' '}
        <Link style={{ color: '#E09551' }} href={'/(auth)/'}>
          login
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
