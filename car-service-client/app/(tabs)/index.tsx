import { Pressable, ScrollView, Text, View, StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/edit-screen-info';
import Header from '~/components/home/header';
import Landing from '~/components/home/landing';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View>
      <Header />
      {/* <Link href="/modal" asChild>
        <Pressable>
          {({ pressed }) => (
            <FontAwesome
              name="info-circle"
              size={25}
              color="gray"
              style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
            />
          )}
        </Pressable>
      </Link> */}
      <Landing />
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
