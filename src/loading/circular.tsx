import React, { useRef, useMemo, memo, useEffect } from 'react';
import type { ColorValue, ViewStyle, ViewProps } from 'react-native';
import { Animated, Easing } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import type { CircleProps } from 'react-native-svg/lib/typescript/elements/Circle';

export interface CircularProps extends ViewProps {
  /**
   * Size of the spinner in pixels
   * @default 32
   */
  size?: number;

  /**
   * Color of the spinner circles
   * @default '#888888'
   */
  color?: ColorValue;

  /**
   * Base duration of the rotation animation in milliseconds
   * @default 800
   */
  duration?: number;
}

const STROKE_WIDTH = 2;

const AnimatedCircle =
  Animated.createAnimatedComponent<React.ComponentType<CircleProps>>(Circle);

const useLoop = (
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
      useNativeDriver: true,
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

  useLoop(animatedRotation, 0, {
    toValue: 1,
    duration,
  });

  useLoop(animatedCircle1, half1Circle, {
    toValue: -half1Circle * 2,
    duration: duration * 1.5,
  });

  useLoop(animatedCircle2, half2Circle, {
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