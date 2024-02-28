import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { GestureResponderEvent, Pressable, StyleProp, Text, TextStyle, View } from 'react-native';
import { useAuth } from '~/app/context/AuthContext';
type ModalTypes = 'delete' | 'settings' | 'logout';

interface ButtonProps {
  children?: React.ReactNode;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  style?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  type?: 'contained' | 'outline' | 'error';
}

const Button = (props: ButtonProps) => {
  const { children, onPress, style, textStyle, type } = props;
  return (
    <Pressable
      style={[
        {
          width: 100,
          height: 48,
          borderRadius: 16,
          backgroundColor:
            type === 'contained'
              ? '#424242'
              : type === 'outline'
                ? 'transparent'
                : type === 'error'
                  ? '#D0655F'
                  : undefined,
          borderColor:
            type === 'contained'
              ? '#424242'
              : type === 'outline'
                ? '#424242'
                : type === 'error'
                  ? '#D0655F'
                  : undefined,
          borderWidth: type === 'outline' ? 1 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={onPress}>
      <Text
        style={[
          {
            color:
              type === 'contained'
                ? '#F8F8F8'
                : type === 'outline'
                  ? '#424242'
                  : type === 'error'
                    ? '#F8F8F8'
                    : undefined,
            textTransform: 'uppercase',
            fontWeight: 'bold',
          },
          textStyle,
        ]}>
        {children}
      </Text>
    </Pressable>
  );
};

const Container = ({
  title,
  infoText,
  onPress,
}: {
  title: string;
  infoText: string;
  onPress?: () => void;
}) => {
  return (
    <View
      style={{
        width: 300,
        height: 300,
        borderRadius: 12,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
      }}>
      <MaterialIcons
        name={
          title == 'Settings'
            ? 'settings'
            : title == 'Logout'
              ? 'logout'
              : title == 'Delete'
                ? 'delete'
                : undefined
        }
        size={42}
        color="black"
      />
      <Text
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '85%',
          color: '#424242',
          textAlign: 'center',
          letterSpacing: 0,
          fontSize: 24,
        }}>
        {title}
      </Text>
      <Text
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '85%',
          color: '#D0655F',
          textAlign: 'center',
          letterSpacing: 0.15,
          fontSize: 14,
        }}>
        {infoText}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '85%',
        }}>
        <Button type="outline" onPress={() => router.back()}>
          close
        </Button>

        <Button type="contained" onPress={onPress}>
          {title}
        </Button>
      </View>
    </View>
  );
};

const Dialog = ({ type }: { type: ModalTypes }) => {
  const { onLogout, onDeleteUser } = useAuth();
  const handleLogout = async () => {
    if (onLogout) {
      const result = await onLogout();
      router.replace('/(auth)/');
      if (result && result.error) {
        console.log(result.message);
      }
    }
  };
  const handleDeleteAccount = async () => {
    if (onDeleteUser) {
      const result = await onDeleteUser();
      router.replace('/(auth)/');
      if (result && result.error) {
        console.log(result.message);
      }
    }
  };
  switch (type) {
    case 'delete':
      return (
        <Container
          infoText="Are you sure you want to delete your account? This action is permanent and all data associated with your account will be lost."
          title="Delete"
          onPress={handleDeleteAccount}
        />
      );
    case 'settings':
      return (
        <Container
          infoText="You are accessing the settings menu. Make changes to your preferences here"
          title="Settings"
        />
      );
    case 'logout':
      return (
        <Container
          infoText="You are going to log out right now. Are you sure you want to proceed?"
          title="Logout"
          onPress={handleLogout}
        />
      );
    default:
      return null;
  }
};

export default Dialog;
