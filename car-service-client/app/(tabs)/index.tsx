import { ScrollView, Text, View } from 'react-native';

import EditScreenInfo from '../../components/edit-screen-info';
import Header from '~/components/home/header';
import Landing from '~/components/home/landing';

export default function HomeScreen() {
  return (
    <View>
      <Header />

      <Landing />
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  );
}
