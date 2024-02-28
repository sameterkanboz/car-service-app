import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { API_URL, UserRole } from '~/app/context/AuthContext';

const INITAL_REGION = {
  latitude: 41.0247,
  longitude: 28.9252,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

type Mechanic = {
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
  appointments: [{}] | null;
  location: Location | null;
};
type Location = {
  name: string;
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
const MapScreen = () => {
  const [mechanics, setMechanics] = useState<Mechanic[] | null>(null);
  const [locations, setLocations] = useState<Location[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/search`);
        setMechanics(response.data);
        setLocations(response.data.map((val: { location: Location[] }) => val.location));
        // console.log(locations, 'locations');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(
    mechanics?.map((val) => val.location?.name),
    'mechanics'
  );

  const calloutPressed = () => {
    router.navigate('/appointments');
  };

  return (
    <MapView
      style={StyleSheet.absoluteFill}
      provider={PROVIDER_GOOGLE}
      initialRegion={INITAL_REGION}
      showsUserLocation
      showsMyLocationButton>
      {locations &&
        locations.map((marker, i) => {
          return (
            <Marker
              pinColor="#E09551"
              key={i}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}>
              <Callout onPress={calloutPressed}>
                <View
                  style={{
                    height: 150,
                    width: 150,
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <Text>{marker.name}</Text>

                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    {[0, 1, 2, 3, 4].map((val) => {
                      return <MaterialIcons name="star" size={24} color="black" key={val} />;
                    })}
                  </View>
                  <Pressable
                    style={{
                      height: 48,
                      width: '80%',
                      borderRadius: 16,
                      backgroundColor: '#E09551',
                      shadowColor: 'black',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.5,
                      shadowRadius: 6,
                      elevation: 5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{ color: '#f8f8f8' }}>appointment</Text>
                  </Pressable>
                </View>
              </Callout>
            </Marker>
          );
        })}
    </MapView>
  );
};

export default MapScreen;
