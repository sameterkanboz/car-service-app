import 'core-js/stable/atob';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import EditScreenInfo from '../../components/edit-screen-info';
import { API_URL, useAuth } from '../context/AuthContext';
export default function AppointmentsScreen() {
  type PayloadType = {
    aud: string;
    exp: number;
    iat: number;
    iss: string;
    name: string;
    role: string;
    sub: string;
    typ: string;
  };
  const [users, setUsers] = useState<{ id: string; email: string }[]>([]);
  const { authState } = useAuth();
  // const token = authState?.token;
  // const decoded = jwtDecode<PayloadType>(token || '');
  // const role = decoded.role;
  // console.log(decoded.role);
  useEffect(() => {
    if (authState?.token == null) {
      console.log('no token');
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${authState?.token ?? ''}`);

    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    fetch(API_URL + '/admin/allUsers', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [authState?.token]);

  return (
    <View className={styles.container}>
      <Text className={styles.title}>Appointments</Text>
      {authState?.token == null ? (
        <Text>Not logged in</Text>
      ) : (
        users.map((user) => {
          return <Text key={user.id}>{user.email}</Text>;
        })
      )}

      <View className={styles.separator} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
