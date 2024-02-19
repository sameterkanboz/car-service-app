import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Pressable, StyleProp, TextInput, TextStyle, View } from 'react-native';

type TextFieldProps = {
  style?: StyleProp<TextStyle>;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  value?: string;
  secureTextEntry?: boolean;
};

export const TextField = (props: TextFieldProps) => {
  const { style, onChangeText, placeholder, value, secureTextEntry } = props;
  const [isSecure, setIsSecure] = React.useState(secureTextEntry);
  return (
    <View
      style={[
        {
          backgroundColor: '#FBF4F1',

          width: '80%',
          height: 48,
          borderRadius: 100,
          padding: 12,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        style,
      ]}>
      <TextInput
        keyboardType={placeholder == 'email' ? 'email-address' : 'default'}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        cursorColor={'#E09551'}
        secureTextEntry={isSecure}
        style={{ width: '90%' }}
      />
      {secureTextEntry && (
        <Pressable
          onPress={() => {
            setIsSecure(!isSecure);
          }}>
          {({ pressed }) => (
            <FontAwesome
              name={isSecure ? 'eye' : 'eye-slash'}
              size={25}
              color="gray"
              style={{ opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      )}
    </View>
  );
};
