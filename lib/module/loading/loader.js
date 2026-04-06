"use strict";

import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { resolveTheme } from "../utiles/theme.js";
import { Circular } from "./circular.js";

// ─── Loader colour tokens ─────────────────────────────────────────────────────
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const LOADER_LIGHT = {
  indicator: '#6366f1',
  overlayBg: 'rgba(0,0,0,0.35)',
  cardBg: '#ffffff',
  cardBorder: '#e4e4e7',
  label: '#3f3f46'
};
export const LOADER_DARK = {
  indicator: '#818cf8',
  overlayBg: 'rgba(0,0,0,0.6)',
  cardBg: 'rgba(0,0,0,0.6)',
  cardBorder: '#3f3f46',
  label: '#e4e4e7'
};

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Indicators ───────────────────────────────────────────────────────────────

const Spinner = ({
  color
}) => {
  const rotate = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(Animated.timing(rotate, {
      toValue: 1,
      duration: 800,
      easing: Easing.linear,
      useNativeDriver: true
    })).start();
  }, []);
  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  return /*#__PURE__*/_jsx(Animated.View, {
    style: [ind.ring, {
      borderTopColor: color,
      transform: [{
        rotate: spin
      }]
    }]
  });
};
const Pulse = ({
  color
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.8)).current;
  useEffect(() => {
    Animated.loop(Animated.parallel([Animated.sequence([Animated.timing(scale, {
      toValue: 1.6,
      duration: 700,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true
    }), Animated.timing(scale, {
      toValue: 1,
      duration: 700,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true
    })]), Animated.sequence([Animated.timing(opacity, {
      toValue: 0.1,
      duration: 700,
      useNativeDriver: true
    }), Animated.timing(opacity, {
      toValue: 0.8,
      duration: 700,
      useNativeDriver: true
    })])])).start();
  }, []);
  return /*#__PURE__*/_jsx(Animated.View, {
    style: [ind.pulse, {
      backgroundColor: color,
      opacity,
      transform: [{
        scale
      }]
    }]
  });
};
const Dots = ({
  color
}) => {
  const anims = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];
  useEffect(() => {
    const seq = (anim, delay) => Animated.loop(Animated.sequence([Animated.delay(delay), Animated.timing(anim, {
      toValue: -8,
      duration: 300,
      useNativeDriver: true
    }), Animated.timing(anim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }), Animated.delay(600 - delay)]));
    anims.forEach((a, i) => seq(a, i * 150).start());
  }, []);
  return /*#__PURE__*/_jsx(View, {
    style: ind.dotsRow,
    children: anims.map((anim, i) => /*#__PURE__*/_jsx(Animated.View, {
      style: [ind.dot, {
        backgroundColor: color,
        transform: [{
          translateY: anim
        }]
      }]
    }, i))
  });
};
const ind = StyleSheet.create({
  ring: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: 'transparent'
  },
  pulse: {
    width: 28,
    height: 28,
    borderRadius: 14
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5
  }
});

// ─── Main component ───────────────────────────────────────────────────────────

export const Loader = ({
  label,
  variant = 'spinner',
  color: colorProp,
  overlay = false,
  theme = 'dark',
  colors: colorOverrides
}) => {
  const deviceScheme = useColorScheme();
  const colors = useMemo(() => {
    const base = resolveTheme(theme, deviceScheme) === 'light' ? LOADER_LIGHT : LOADER_DARK;
    return colorOverrides ? {
      ...base,
      ...colorOverrides
    } : base;
  }, [theme, deviceScheme, colorOverrides]);

  // `color` prop overrides the theme's indicator tint
  const tint = colorProp ?? colors.indicator;
  const indicator = {
    spinner: /*#__PURE__*/_jsx(Spinner, {
      color: tint
    }),
    pulse: /*#__PURE__*/_jsx(Pulse, {
      color: tint
    }),
    dots: /*#__PURE__*/_jsx(Dots, {
      color: tint
    }),
    circular: /*#__PURE__*/_jsx(Circular, {
      color: tint
    })
  }[variant];
  if (overlay) {
    return /*#__PURE__*/_jsx(View, {
      style: [styles.overlay, {
        backgroundColor: colors.overlayBg
      }],
      children: /*#__PURE__*/_jsxs(View, {
        style: [styles.card, {
          backgroundColor: colors.cardBg,
          borderColor: colors.cardBorder
        }],
        children: [indicator, label ? /*#__PURE__*/_jsx(Text, {
          style: [styles.label, {
            color: colors.label
          }],
          children: label
        }) : null]
      })
    });
  }
  return /*#__PURE__*/_jsxs(View, {
    style: styles.inline,
    children: [indicator, label ? /*#__PURE__*/_jsx(Text, {
      style: [styles.label, {
        color: colors.label
      }],
      children: label
    }) : null]
  });
};

// ─── Styles (layout only) ─────────────────────────────────────────────────────

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    borderWidth: 0,
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 40,
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 16
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12
  },
  inline: {
    alignItems: 'center',
    gap: 12,
    borderWidth: 0
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2
  }
});
//# sourceMappingURL=loader.js.map