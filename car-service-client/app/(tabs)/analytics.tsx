import { Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function AnalyticsScreen() {
  const { user } = useAuth();
  return (
    <View className={styles.container}>
      <Text>{user?.car_id.Int64}</Text>
      {user?.appointments ? <Text>hey</Text> : <Text>No appointments</Text>}
    </View>
  );
}

const styles = {
  container: `items-center flex-1 justify-center gap-8`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
