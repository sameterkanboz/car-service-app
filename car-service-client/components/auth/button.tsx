import React from 'react';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';

type CustomButtonProps = {
  onPress?: () => void;
  title?: string;
  style?: StyleProp<ViewStyle>;
  type: ButtonTypes;
};

type ButtonTypes = 'primary' | 'secondary' | 'error';
const CustomButton = (props: CustomButtonProps) => {
  const { onPress, title, style } = props;
  switch (props.type) {
    case 'primary':
      return (
        <Pressable
          style={[
            {
              backgroundColor: '#E09551',
              width: '80%',
              height: 32,
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: 100,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
            style,
          ]}
          onPress={onPress}>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#f8f8f8' }}>{title}</Text>
          </View>
        </Pressable>
      );

    case 'secondary':
      return (
        <Pressable
          style={[
            {
              backgroundColor: 'green',
              width: '80%',
              height: 32,
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: 100,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
            style,
          ]}
          onPress={onPress}>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#f8f8f8' }}>{title}</Text>
          </View>
        </Pressable>
      );

    case 'error':
      return (
        <Pressable
          style={[
            {
              backgroundColor: 'red',
              width: '80%',
              height: 32,
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: 100,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
            style,
          ]}
          onPress={onPress}>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#f8f8f8' }}>{title}</Text>
          </View>
        </Pressable>
      );

    default:
      return null;
  }
};

export default CustomButton;
