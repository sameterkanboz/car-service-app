import 'core-js/stable/atob';
import { Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
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

  const { authState, user } = useAuth();

  return (
    <View className={styles.container}>
      <Text className={styles.title}>Appointments</Text>
      <Text>Appointments Screen</Text>
      <Text>{JSON.stringify(user?.appointments)}</Text>
      <View className={styles.separator} />
    </View>
  );
}

const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
