import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export type useFadeSacleAnimationProps= {
  duration?: number;
  delay?: number;
};

export type useFadeSacleAnimationResult = {
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
  animatedStyle: {
    opacity: Animated.Value;
    transform: [{ scale: Animated.Value }];
  };
};

export const useFadeScaleAnimation = (options?: useFadeSacleAnimationProps) => {
  const { duration = 1000, delay = 0 } = options || {};

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [duration, delay, fadeAnim, scaleAnim]);

  return {
    fadeAnim,
    scaleAnim,
    animatedStyle: {
      // opacity: fadeAnim,
      transform: [{ scale: scaleAnim }],
    },
  };
};
