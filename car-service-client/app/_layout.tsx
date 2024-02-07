import '../global.css';

import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from './context/AuthContext';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

function StackGroup() {
  const { authState } = useAuth();

  switch (authState?.authenticated) {
    case true:
      return (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      );
    case false:
      return (
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      );
    default:
      return null;
  }
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackGroup />
    </AuthProvider>
  );
}
