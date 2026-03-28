import React, { useRef, useMemo, useEffect } from 'react';
import type { ColorValue, ViewStyle, ViewProps } from 'react-native';
import { Animated, Easing } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import type { CircleProps } from 'react-native-svg/lib/typescript/elements/Circle';

export interface CircularProps extends ViewProps {
  size?: number;
  color?: ColorValue;
  duration?: number;
}

const STROKE_WIDTH = 2;

const AnimatedCircle =
  Animated.createAnimatedComponent<React.ComponentType<CircleProps>>(Circle);

const useSvgLoop = (
  animatedValue: Animated.Value,
  initValue: number,
  config: Pick<Animated.TimingAnimationConfig, 'toValue' | 'duration'>,
) => {
  useEffect(() => {
    animatedValue.setValue(initValue);

    const animation = Animated.timing(animatedValue, {
      toValue: config.toValue as number,
      duration: config.duration,
      easing: Easing.linear,
      useNativeDriver: false,
    });

    const loop = Animated.loop(animation);
    loop.start();

    return () => loop.stop();
  }, [animatedValue, initValue, config.duration, config.toValue]);
};

const Circular: React.FC<CircularProps> = ({
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
    return { cy: center, cx: center, r: radius };
  }, [size]);

  const circle2Props = useMemo(() => {
    const center = Math.floor(size / 2);
    const radius = Math.floor(center - STROKE_WIDTH / 2 - center / 2);
    return { cy: center, cx: center, r: radius };
  }, [size]);

  const half1Circle = useMemo(
    () => circle1Props.r * Math.PI,
    [circle1Props.r],
  );

  const half2Circle = useMemo(
    () => circle2Props.r * Math.PI,
    [circle2Props.r],
  );

  useEffect(() => {
    animatedRotation.setValue(0);

    const rotation = Animated.loop(
      Animated.timing(animatedRotation, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    rotation.start();

    return () => rotation.stop();
  }, [animatedRotation, duration]);

  useSvgLoop(animatedCircle1, half1Circle, {
    toValue: -half1Circle * 2,
    duration: duration * 1.5,
  });

  useSvgLoop(animatedCircle2, half2Circle, {
    toValue: -half2Circle * 2,
    duration: duration * 2.5,
  });

  const iconStyle: ViewStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    width: size,
    height: size,
    transform: [
      {
        rotateZ: animatedRotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['-90deg', '270deg'],
        }) as any,
      },
    ],
  };

  return (
    <Animated.View {...restProps} style={[iconStyle, style]}>
      <Svg width="100%" height="100%">
        <AnimatedCircle
          {...circle1Props}
          stroke={color as string}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={`${half1Circle},${half1Circle * 2}`}
          strokeLinecap="round"
          strokeDashoffset={animatedCircle1}
          fill="none"
        />
        <AnimatedCircle
          {...circle2Props}
          stroke={color as string}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={`${half2Circle},${half2Circle * 2}`}
          strokeLinecap="round"
          strokeDashoffset={animatedCircle2}
          fill="none"
        />
      </Svg>
    </Animated.View>
  );
};

export { Circular };