import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleProp, Text, TextStyle, View } from 'react-native';
type ModalTypes = 'delete' | 'settings' | 'logout';

interface ButtonProps {
  children?: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button = (props: ButtonProps) => {
  const { children, onPress, style, textStyle } = props;
  return (
    <Pressable
      style={[
        {
          width: 100,
          height: 48,
          borderRadius: 12,
          backgroundColor: 'red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={onPress}>
      <Text style={[{ color: 'white' }, textStyle]}>{children}</Text>
    </Pressable>
  );
};

const Container = ({ title, infoText }: { title: string; infoText: string }) => {
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
        justifyContent: 'flex-start',
      }}>
      <MaterialIcons name="settings" size={48} color="black" />
      <Text>{title}</Text>
      <Text>{infoText}</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button onPress={() => console.log('close')}>close</Button>
        <Button onPress={() => console.log('first')}>{title}</Button>
      </View>
    </View>
  );
};

const Dialog = ({ type }: { type: ModalTypes }) => {
  switch (type) {
    case 'delete':
      return (
        <Container
          infoText="Are you sure you want to delete your account? This action is permanent and all data associated with your account will be lost."
          title="delete account"
        />
      );
    case 'settings':
      return (
        <Container
          infoText="You are accessing the settings menu. Make changes to your preferences here"
          title="settings"
        />
      );
    case 'logout':
      return (
        <Container
          infoText="You are going to log out right now. Are you sure you want to proceed?"
          title="logout"
        />
      );
    default:
      return null;
  }
};

export default Dialog;
