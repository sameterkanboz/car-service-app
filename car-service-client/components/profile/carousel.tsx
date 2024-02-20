import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const Carousel = () => {
  const [imgActive, setImageActive] = useState(0);
  const WindowWidth = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const image = [
    { name: 'mercedes', image: require('../../assets/cars/mercedes.png') },
    { name: 'egea', image: require('../../assets/cars/egea.png') },
    { name: 'corolla', image: require('../../assets/cars/corolla.png') },
  ];
  const onchange = (nativeEvent: {
    contentOffset: { x: number };
    layoutMeasurement: { width: number };
  }) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide != imgActive) {
        setImageActive(slide);
      }
    }
  };
  return (
    <View style={styles.Container}>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={({ nativeEvent }) => onchange(nativeEvent)}>
        {image.map((val, ind) => (
          <View key={ind}>
            <Image
              source={val.image}
              style={{ width: WindowWidth, height: '95%', resizeMode: 'contain' }}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.wrapDot}>
        {image.map((val, ind) => (
          <Text key={ind} style={imgActive == ind ? styles.dotActive : styles.dot}>
            ●
          </Text>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    height: '50%',
    // flex: 1,
  },
  wrapDot: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    position: 'absolute',
    zIndex: 1,
    bottom: 20,
  },
  dotActive: {
    margin: 3,
    color: '#973D00',
    marginTop: 20,
    fontSize: 20,
  },
  dot: {
    margin: 3,
    color: 'gray',
    marginTop: 20,
    fontSize: 20,
  },
});

export default Carousel;
