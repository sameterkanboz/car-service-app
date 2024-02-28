import 'core-js/stable/atob';
import { Text, View } from 'react-native';
import MultipleSelector from '~/components/appointments/MultipleSelector/MultipleSelector';
import { useAuth } from '../context/AuthContext';
export default function AppointmentsScreen() {
  const { user } = useAuth();

  return (
    <View className={styles.container}>
      <Text className={styles.title}>Appointments</Text>

      {user &&
        user.appointments &&
        user.appointments.map((appointment, index) => {
          return (
            <MultipleSelector
              key={index}
              label={appointment.appointment_type}
              items={user.appointments && user.appointments[index]}
            />
          );
        })}
      {/* <MultipleSelector label="Appointments" items={user?.appointments || []} /> */}
      <View className={styles.separator} />
    </View>
  );
}

const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
