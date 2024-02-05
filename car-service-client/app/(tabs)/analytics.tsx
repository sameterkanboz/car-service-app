import { Button, Text, TextInput, View } from 'react-native';

import EditScreenInfo from '../../components/edit-screen-info';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
export default function AnalyticsScreen() {
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
      }
    }
  };

  const handleLogout = async () => {
    if (onLogout) {
      const result = await onLogout();
      if (result && result.error) {
        console.log(result.message);
      }
    }
  };
  return (
    <View className={styles.container}>
      <Text style={{ color: error.error ? 'red' : 'green' }}>
        {email}+{password}
      </Text>
      <TextInput
        onChangeText={(value) => setEmail(value)}
        style={{ borderColor: 'red', borderWidth: 1, width: 250, height: 80 }}
      />
      <TextInput
        onChangeText={(value) => setPassword(value)}
        style={{ borderColor: 'red', borderWidth: 1, width: 250, height: 80 }}
      />
      <Button title="Press me" onPress={handleLogin} />
      {authState?.authenticated && <Button title="logout" onPress={handleLogout} />}
    </View>
  );
}

const styles = {
  container: `items-center flex-1 justify-center gap-8`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
