import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

type CardProps = {
  children?: React.ReactNode;
  style?: object;
  type?: 'customer' | 'mechanic';
};

const Card = (props: CardProps) => {
  const { children, style, type } = props;
  return (
    <View
      style={[
        { backgroundColor: '#171B29', width: '100%', borderRadius: 25, display: 'flex', gap: 8 },
        style,
      ]}>
      <View
        style={{
          backgroundColor: type === 'mechanic' ? '#22A75D' : '#2278D4',
          borderRadius: 100,
          width: 80,
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#fff',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          marginLeft: 12,
          marginTop: 12,
        }}>
        {type === 'mechanic' && <MaterialIcons name="car-repair" size={36} color="black" />}
        {type === 'customer' && <MaterialIcons name="car-rental" size={36} color="black" />}
      </View>
      {children}
      <Pressable
        style={{
          alignSelf: 'center',
          height: 40,
          borderRadius: 12,
          width: '80%',
          backgroundColor: type === 'mechanic' ? '#22A75D' : '#2278D4',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          type === 'mechanic'
            ? router.replace('/(auth)/register')
            : router.replace('/(tabs)/search');
        }}>
        <Text style={{ fontWeight: 'bold', color: '#fff' }}>
          {type === 'mechanic' ? 'Join as Mechanic' : 'Make Appointment'}
        </Text>
      </Pressable>
    </View>
  );
};

export default Card;
