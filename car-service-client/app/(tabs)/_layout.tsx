import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={22} style={styles.tabBarIcon} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E09551',
        tabBarInactiveTintColor: '#484C52',

        tabBarStyle: {
          borderTopWidth: 2,
          // height: 60,
          paddingTop: 5,
          paddingBottom: 25,
          backgroundColor: '#F7F7F7',
          height: '10%',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel(props) {
            return props.focused ? (
              <Text style={{ color: '#E09551', fontSize: 12 }}>Home</Text>
            ) : null;
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
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
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel(props) {
            return props.focused ? (
              <Text style={{ color: '#E09551', fontSize: 12 }}>Search</Text>
            ) : null;
          },

          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          tabBarLabel(props) {
            return props.focused ? (
              <Text style={{ color: '#E09551', fontSize: 12 }}>Analytics</Text>
            ) : null;
          },
          title: 'Analytics',
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          tabBarLabel(props) {
            return props.focused ? (
              <Text style={{ color: '#E09551', fontSize: 12 }}>Appointments</Text>
            ) : null;
          },
          title: 'Appointments',
          tabBarIcon: ({ color }) => <TabBarIcon name="clock-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel(props) {
            return props.focused ? (
              <Text style={{ color: '#E09551', fontSize: 12 }}>Profile</Text>
            ) : null;
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="user-circle-o" color={color} />,
        }}
      />
    </Tabs>
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
