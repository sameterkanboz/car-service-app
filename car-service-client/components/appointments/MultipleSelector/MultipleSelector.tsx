import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { runOnUI, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Appointment } from '~/app/context/AuthContext';
import { useAccordion } from './hooks';

type MultipleSelectorProps = {
  label: string;
  items: Appointment | null;
};

const MultipleSelector = ({ label, items }: MultipleSelectorProps) => {
  const { setHeight, animatedHeightStyle, animatedRef, isOpened } = useAccordion();

  const animatedArrowStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(`${isOpened.value ? 90 : 0}deg`, { duration: 200 }),
      },
    ],
  }));
  function formatAppointmentDate(dateString: string) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    return formattedDate;
  }
  return (
    <View style={{ width: '80%' }}>
      <View style={styles.contentWrapper}>
        {/* <Text style={styles.label}>{label}</Text> */}
        <Pressable onPress={() => runOnUI(setHeight)()}>
          <View style={styles.labelWrapper}>
            <Text>{label}</Text>
            <Animated.View style={[animatedArrowStyle]}>
              <AntDesign name="right" size={18} color="rgba(0,0,0,0.1)" />
            </Animated.View>
          </View>
        </Pressable>
        <Animated.View style={[animatedHeightStyle]}>
          <View style={styles.accordionWrapper}>
            <View style={styles.bodyWrapper} ref={animatedRef} collapsable={false}>
              <>
                {items && (
                  <>
                    <Text style={{ textAlign: 'center' }}>ID: {items.id}</Text>
                    <Text style={{ textAlign: 'center' }}>Mechanic ID: {items.mechanic_id}</Text>
                    <Text style={{ textAlign: 'center' }}>Car ID: {items.car_id}</Text>
                    <Text style={{ textAlign: 'center' }}>
                      Appointment Date: {formatAppointmentDate(items.appointment_date)}
                    </Text>
                    <Text style={{ textAlign: 'center' }}>
                      Appointment Type: {items.appointment_type}
                    </Text>
                  </>
                )}
              </>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,

    marginBottom: 5,
  },
  contentWrapper: {
    overflow: 'hidden',
  },

  accordionWrapper: {
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
    height: 48,
    backgroundColor: '#F2F2F2',
    borderRadius: 100,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  bodyWrapper: {
    gap: 2,
    marginTop: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
});

export default MultipleSelector;
