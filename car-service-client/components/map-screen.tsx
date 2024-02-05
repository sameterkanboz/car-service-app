import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const INITAL_REGION = {
  latitude: 41.0247,
  longitude: 28.9252,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

const MOCK_MARKERS = [
  {
    name: 'Jet Oto Ahmet Usta',
    latitude: 41.012311,
    longitude: 28.699072,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  },
  {
    name: 'Ankara',
    latitude: 41.012825,
    longitude: 28.69808,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  },
];

const MapScreen = () => {
  return (
    <MapView
      style={StyleSheet.absoluteFill}
      provider={PROVIDER_GOOGLE}
      initialRegion={INITAL_REGION}
      showsUserLocation
      showsMyLocationButton>
      {MOCK_MARKERS.map((marker, i) => {
        return (
          <Marker
            pinColor="#E09551"
            key={i}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            // title={marker.name}
          >
            <Callout>
              <View
                style={{
                  // height: 100,
                  // width: 100,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>{marker.name}</Text>
              </View>
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
};

export default MapScreen;
