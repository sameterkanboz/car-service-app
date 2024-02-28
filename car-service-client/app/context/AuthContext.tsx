import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (props: registerProps) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;

  onDeleteUser?: () => Promise<any>;
  user?: User;
}
interface registerProps {
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
}
const TOKEN_KEY = 'my-jwt';
export const API_URL = 'https://osprey-evident-needlessly.ngrok-free.app';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export type UserRole = 'admin' | 'customer' | 'mechanic';

type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: UserRole;
  car_id: {
    Int64: number;
    Valid: boolean;
  };
  appointments: Appointment[] | null;
} | null;
export type Appointment = {
  id: number;
  car_id: number;
  mechanic_id: number;
  appointment_date: string;
  appointment_type: string;
};
export const AuthProvider = ({ children }: { children: any }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log('stored token: ', token);

      if (token) {
        setAuthState({
          token,
          authenticated: true,
        });
      }
    };

    loadToken();
  }, []);

  const deleteUser = async () => {
    try {
      // Kullanıcıyı silme isteğini gönder
      const response = await axios.delete(`${API_URL}/deleteUser?email=${user?.email}`);

      // Kullanıcı başarıyla silindiğinde, kimlik bilgilerini ve oturumu temizle
      await SecureStore.deleteItemAsync(TOKEN_KEY); // Token'ı sil
      axios.defaults.headers.common['Authorization'] = ''; // Authorization başlığını sıfırla

      setAuthState({
        token: null,
        authenticated: false,
      });

      return response.data; // Başarılı yanıtı döndür
    } catch (error) {
      return { error: true, message: (error as any).response.data.message };
    }
  };

  const register = async (props: registerProps) => {
    const { email, password, username, first_name, last_name, role } = props;
    try {
      return await axios.post(`${API_URL}/createUser`, {
        email,
        password,
        username,
        first_name,
        last_name,
        role,
      });
    } catch (error) {
      return { error: true, message: (error as any).response.data.message };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/authenticate`, { email, password });
      console.log(response);
      setAuthState({
        token: response.data.token,
        authenticated: true,
      });

      const userResponse = await axios.get(`${API_URL}/user?email=${email}`);
      setUser(userResponse.data);

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);
      return response;
    } catch (error) {
      return { error: true, message: (error as any).response.data.message };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    onDeleteUser: deleteUser,
    authState,
    user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
