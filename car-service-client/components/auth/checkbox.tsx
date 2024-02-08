import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useRef } from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type CheckboxProps = {
  text: string;
  onPress: () => void;
  isChecked: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  checkboxStyle?: StyleProp<ViewStyle>;
};

const Checkbox = ({
  text,
  onPress,
  isChecked,
  containerStyle,
  textStyle,
  checkboxStyle,
}: CheckboxProps) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    const toValue = isChecked ? 0 : 30;
    Animated.timing(animatedWidth, {
      toValue: toValue,

      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={() => {
          startAnimation();
          onPress();
        }}
        style={[styles.checkbox, isChecked && styles.checkboxSelected, checkboxStyle]}>
        <Animated.View
          style={{
            width: animatedWidth,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome name="check" size={26} color="#FBF4F1" />
        </Animated.View>
      </TouchableOpacity>
      <Text style={[styles.checkboxText, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderColor: '#FBF4F1',
    borderWidth: 1,

    borderRadius: 5,
    height: 30,
    width: 30,
  },
  checkboxSelected: {
    backgroundColor: '',
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Checkbox;
