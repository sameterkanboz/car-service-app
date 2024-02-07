import { Text, View } from 'react-native';

import Header from '~/components/home/header';

export default function RegisterScreen() {
  return (
    <View>
      <Header />
      <Text>register</Text>
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

      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  );
}
