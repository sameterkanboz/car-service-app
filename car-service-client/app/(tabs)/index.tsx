import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '~/components/home/card';

import Header from '~/components/home/header';
import Landing from '~/components/home/landing';

export default function HomeScreen() {
  return (
    <View>
      <Header />
      <ScrollView>
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

        <View
          style={{
            paddingBottom: '40%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Card type="mechanic" style={{ width: '80%', marginTop: 48, padding: 12 }}>
            <Text
              style={{
                color: 'white',
                fontSize: 28,
                marginLeft: 12,
                marginTop: 12,
                fontWeight: 'bold',
              }}>
              For{' '}
              <Text style={{ textDecorationLine: 'underline', color: '#22A75D' }}>Mechanics</Text>
            </Text>
            <Text
              style={{
                padding: 12,
                color: 'rgba(255, 255, 255, 0.5)',
                letterSpacing: 2,
                textAlign: 'left',
                fontSize: 16,
              }}>
              Empower your automotive career! Join our platform to connect with car owners, manage
              your schedule, and expand your client base. Let's shape the future of car service
              together.
            </Text>
          </Card>
          <Card type="customer" style={{ width: '80%', marginTop: 48, padding: 12 }}>
            <Text
              style={{
                color: 'white',
                fontSize: 28,
                marginLeft: 12,
                marginTop: 12,
                fontWeight: 'bold',
              }}>
              For{' '}
              <Text style={{ textDecorationLine: 'underline', color: '#2278D4' }}>Customers</Text>
            </Text>
            <Text
              style={{
                padding: 12,
                color: 'rgba(255, 255, 255, 0.5)',
                letterSpacing: 2,
                textAlign: 'left',
                fontSize: 16,
              }}>
              Welcome to a new era of car care excellence! Our platform empowers you to access
              top-tier automotive services with ease. Connect seamlessly with skilled mechanics for
              all your maintenance and repair needs, ensuring your vehicle stays in peak condition.
              Join our thriving community of car enthusiasts, where convenience and peace of mind go
              hand in hand.
            </Text>
          </Card>
        </View>
        {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      </ScrollView>
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
