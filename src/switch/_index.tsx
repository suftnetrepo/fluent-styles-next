import React, { useState, useRef } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from 'react-native';

interface ToggleSwitchProps {
  initialValue?: boolean;
  onToggle?: (value: boolean) => void;
  width?: number;
  height?: number;
}
 function StyledSwitch({
  initialValue = false,
  onToggle,
  width = 120,
  height = 60,
}: ToggleSwitchProps) {
  const [isOn, setIsOn] = useState(initialValue);
  const animValue = useRef(new Animated.Value(initialValue ? 1 : 0)).current;

  const thumbSize = height - 12;
  const travelDistance = width - thumbSize - 12;

  const handlePress = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onToggle?.(newValue);

    Animated.spring(animValue, {
      toValue: newValue ? 1 : 0,
      useNativeDriver: false,
      tension: 60,
      friction: 8,
    }).start();
  };

  // Interpolated values
  const thumbTranslate = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [6, travelDistance + 6],
  });

  const trackColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E8E8F0', '#E8E8F0'], // track stays the same as in the design
  });

  const thumbColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#CCCCDD', '#4F46E5'],
  });

  const thumbScale = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.9, 1],
  });

  const shadowOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 0.35],
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress} accessibilityRole="switch">
      <Animated.View
        style={[
          styles.track,
          {
            width,
            height,
            borderRadius: height / 2,
            backgroundColor: trackColor,
          },
        ]}
      >
        {/* Subtle dot pattern overlay */}
        <View style={[StyleSheet.absoluteFillObject, styles.dotPattern, { borderRadius: height / 2 }]} />

        {/* Thumb */}
        <Animated.View
          style={[
            styles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: thumbColor,
              transform: [
                { translateX: thumbTranslate },
                { scale: thumbScale },
              ],
              shadowOpacity,
            },
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  track: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(200, 200, 220, 0.6)',
    // Subtle inner shadow via elevation
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  dotPattern: {
    // Simulated stipple texture via opacity overlay
    backgroundColor: 'rgba(180, 180, 210, 0.08)',
  },
  thumb: {
    position: 'absolute',
    top: undefined,
    // Shadow for the thumb (iOS)
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    // Android elevation
    elevation: 4,
  },
});

export { StyledSwitch };
export type { ToggleSwitchProps as StyledSwitchProps } 


