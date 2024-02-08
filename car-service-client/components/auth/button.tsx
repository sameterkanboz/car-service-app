import React from 'react';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';

type CustomButtonProps = {
  onPress?: () => void;
  title?: string;
  style?: StyleProp<ViewStyle>;
};

const CustomButton = (props: CustomButtonProps) => {
  const { onPress, title, style } = props;
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
};

export default CustomButton;
