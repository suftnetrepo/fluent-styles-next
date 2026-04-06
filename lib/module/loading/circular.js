"use strict";

import React, { useRef, useMemo, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const STROKE_WIDTH = 2;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const useSvgLoop = (animatedValue, initValue, config) => {
  useEffect(() => {
    animatedValue.setValue(initValue);
    const animation = Animated.timing(animatedValue, {
      toValue: config.toValue,
      duration: config.duration,
      easing: Easing.linear,
      useNativeDriver: false
    });
    const loop = Animated.loop(animation);
    loop.start();
    return () => loop.stop();
  }, [animatedValue, initValue, config.duration, config.toValue]);
};
const Circular = ({
  size = 32,
  color = '#888888',
  duration = 800,
  style,
  ...restProps
}) => {
  const animatedRotation = useRef(new Animated.Value(0)).current;
  const animatedCircle1 = useRef(new Animated.Value(0)).current;
  const animatedCircle2 = useRef(new Animated.Value(0)).current;
  const circle1Props = useMemo(() => {
    const center = Math.floor(size / 2);
    const radius = Math.floor(center - STROKE_WIDTH / 2);
    return {
      cy: center,
      cx: center,
      r: radius
    };
  }, [size]);
  const circle2Props = useMemo(() => {
    const center = Math.floor(size / 2);
    const radius = Math.floor(center - STROKE_WIDTH / 2 - center / 2);
    return {
      cy: center,
      cx: center,
      r: radius
    };
  }, [size]);
  const half1Circle = useMemo(() => circle1Props.r * Math.PI, [circle1Props.r]);
  const half2Circle = useMemo(() => circle2Props.r * Math.PI, [circle2Props.r]);
  useEffect(() => {
    animatedRotation.setValue(0);
    const rotation = Animated.loop(Animated.timing(animatedRotation, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: true
    }));
    rotation.start();
    return () => rotation.stop();
  }, [animatedRotation, duration]);
  useSvgLoop(animatedCircle1, half1Circle, {
    toValue: -half1Circle * 2,
    duration: duration * 1.5
  });
  useSvgLoop(animatedCircle2, half2Circle, {
    toValue: -half2Circle * 2,
    duration: duration * 2.5
  });
  const iconStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    width: size,
    height: size,
    transform: [{
      rotateZ: animatedRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['-90deg', '270deg']
      })
    }]
  };
  return /*#__PURE__*/_jsx(Animated.View, {
    ...restProps,
    style: [iconStyle, style],
    children: /*#__PURE__*/_jsxs(Svg, {
      width: "100%",
      height: "100%",
      children: [/*#__PURE__*/_jsx(AnimatedCircle, {
        ...circle1Props,
        stroke: color,
        strokeWidth: STROKE_WIDTH,
        strokeDasharray: `${half1Circle},${half1Circle * 2}`,
        strokeLinecap: "round",
        strokeDashoffset: animatedCircle1,
        fill: "none"
      }), /*#__PURE__*/_jsx(AnimatedCircle, {
        ...circle2Props,
        stroke: color,
        strokeWidth: STROKE_WIDTH,
        strokeDasharray: `${half2Circle},${half2Circle * 2}`,
        strokeLinecap: "round",
        strokeDashoffset: animatedCircle2,
        fill: "none"
      })]
    })
  });
};
export { Circular };
//# sourceMappingURL=circular.js.map