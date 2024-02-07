import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'https://2d39-2a02-e0-5e7e-4600-1896-de2-5c88-53a4.ngrok-free.app';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: any }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

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

  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/authenticate`, { email, password });
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
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
