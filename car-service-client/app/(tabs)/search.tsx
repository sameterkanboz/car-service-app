import { View } from 'react-native';

import MapScreen from '~/components/map-screen';

export default function SearchScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MapScreen />
    </View>
  );
}

const styles = {
  // container: `items-center flex-1 justify-center`,
  // separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  // title: `text-xl font-bold`,
};
