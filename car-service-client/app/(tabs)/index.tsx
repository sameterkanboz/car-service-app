import { StyleSheet, View } from 'react-native';

import Header from '~/components/home/header';
import Landing from '~/components/home/landing';

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
