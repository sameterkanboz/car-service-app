import 'core-js/stable/atob';
import { Text, View } from 'react-native';
import MultipleSelector from '~/components/appointments/MultipleSelector/MultipleSelector';
import { useAuth } from '../context/AuthContext';
export default function AppointmentsScreen() {
  const { user } = useAuth();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        marginTop: 96,
      }}>
      <Text style={{ fontWeight: 'bold', fontSize: 28 }}>Appointments</Text>

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
    </View>
  );
}
