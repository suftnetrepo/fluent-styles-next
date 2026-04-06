"use strict";

import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
const PETAL_COUNT = 8;
const PETALS = new Array(PETAL_COUNT).fill(0);
const A_OPACITY = 1 / PETAL_COUNT;
const A_ROTATE = 360 / PETAL_COUNT;
const useLoop = (animatedValue, config) => {
  useEffect(() => {
    const animation = Animated.timing(animatedValue, {
      toValue: config.toValue,
      duration: config.duration,
      easing: config.easing,
      useNativeDriver: true
    });
    const loop = Animated.loop(animation);
    loop.start();
    return () => loop.stop();
  }, [animatedValue, config.duration, config.toValue, config.easing]);
};
const Spinner = ({
  size = 32,
  color = '#888888',
  duration = 800,
  style,
  ...restProps
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  useLoop(animatedValue, {
    toValue: 1,
    duration,
    easing: Easing.linear
  });
  const rotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  return /*#__PURE__*/_jsx(Animated.View, {
    ...restProps,
    style: [styles.icon, {
      width: size,
      height: size,
      transform: [{
        rotateZ: rotate
      }]
    }, style],
    children: PETALS.map((_, i) => /*#__PURE__*/_jsx(View, {
      style: [styles.petal, {
        opacity: A_OPACITY * (i + 1),
        transform: [{
          rotate: `${A_ROTATE * i}deg`
        }]
      }],
      children: /*#__PURE__*/_jsx(View, {
        style: [styles.inner, {
          backgroundColor: color
        }]
      })
    }, i))
  });
};
const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  petal: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center'
  },
  inner: {
    width: 2,
    height: '30%',
    borderRadius: 1
  }
});
export { Spinner };
//# sourceMappingURL=spinner.js.map