"use strict";

import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Stack } from "../stack/index.js";
import { StyledText } from "../text/index.js";
import { theme } from "../utiles/theme.js";

// ─── Types ────────────────────────────────────────────────────────────────────
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SIZE_MAP = {
  xs: {
    diameter: 48,
    stroke: 4,
    primaryFont: 11,
    secondaryFont: 8
  },
  sm: {
    diameter: 64,
    stroke: 5,
    primaryFont: 13,
    secondaryFont: 9
  },
  md: {
    diameter: 80,
    stroke: 6,
    primaryFont: 15,
    secondaryFont: 10
  },
  lg: {
    diameter: 100,
    stroke: 7,
    primaryFont: 18,
    secondaryFont: 11
  },
  xl: {
    diameter: 128,
    stroke: 8,
    primaryFont: 22,
    secondaryFont: 12
  }
};
const DEFAULT_COLORS = {
  arc: theme.colors.indigo?.[500] ?? '#6366f1',
  track: theme.colors.gray[200],
  label: theme.colors.gray[800],
  sublabel: theme.colors.gray[400],
  gradientFrom: theme.colors.violet?.[500] ?? '#8b5cf6',
  gradientTo: theme.colors.cyan?.[400] ?? '#22d3ee'
};
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
export const StyledCircularProgress = ({
  value,
  total = 100,
  display = 'percent',
  label,
  sublabel,
  variant = 'default',
  size = 'md',
  diameter: diameterProp,
  strokeWidth: strokeWidthProp,
  lineCap = 'round',
  animated = true,
  duration = 900,
  colors: colorOverrides,
  contentPosition = 'stacked',
  children
}) => {
  const preset = SIZE_MAP[size];
  const diameter = diameterProp ?? preset.diameter;
  const strokeWidth = strokeWidthProp ?? preset.stroke;
  const isDashboard = variant === 'dashboard';
  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = isDashboard ? circumference / 2 : circumference;
  const colors = useMemo(() => colorOverrides ? {
    ...DEFAULT_COLORS,
    ...colorOverrides
  } : DEFAULT_COLORS, [colorOverrides]);
  const clamped = Math.min(Math.max(value, 0), total);
  const fraction = total > 0 ? clamped / total : 0;
  const progress = useRef(new Animated.Value(animated ? 0 : fraction)).current;
  useEffect(() => {
    if (!animated) {
      progress.setValue(fraction);
      return;
    }
    Animated.timing(progress, {
      toValue: fraction,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false
    }).start();
  }, [fraction, animated, duration, progress]);
  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [arcLength, 0]
  });
  const center = diameter / 2;
  const gradientId = `cpGrad-${Math.round(diameter)}-${variant}`;
  const centreText = useMemo(() => {
    switch (display) {
      case 'percent':
        return `${Math.round(fraction * 100)}%`;
      case 'fraction':
        return `${clamped}/${total}`;
      case 'value':
        return String(clamped);
      case 'label':
        return label ?? '';
      case 'none':
        return null;
      default:
        return null;
    }
  }, [display, fraction, clamped, total, label]);
  const arcStroke = variant === 'gradient' ? `url(#${gradientId})` : colors.arc;
  const trackOpacity = variant === 'ghost' ? 0 : 1;
  const trackDash = isDashboard ? [arcLength, circumference - arcLength] : undefined;
  const dashboardTextOffset = isDashboard ? -(diameter / 4) : 0;
  const renderTextBlock = () => {
    if (contentPosition === 'center') {
      return /*#__PURE__*/_jsxs(Stack, {
        position: "absolute",
        left: strokeWidth + 6,
        right: strokeWidth + 6,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        pointerEvents: "none",
        children: [centreText !== null && centreText !== '' && /*#__PURE__*/_jsx(StyledText, {
          fontSize: preset.primaryFont,
          fontWeight: theme.fontWeight.bold,
          color: colors.label,
          lineHeight: preset.primaryFont + 3,
          textAlign: "center",
          children: centreText
        }), !!label && /*#__PURE__*/_jsx(StyledText, {
          fontSize: preset.secondaryFont,
          color: colors.sublabel,
          lineHeight: preset.secondaryFont + 2,
          textAlign: "center",
          children: label
        }), !!sublabel && /*#__PURE__*/_jsx(StyledText, {
          fontSize: Math.max(preset.secondaryFont - 1, 8),
          color: colors.sublabel,
          lineHeight: preset.secondaryFont + 1,
          textAlign: "center",
          children: sublabel
        })]
      });
    }
    const showSecondLine = display !== 'label' && display !== 'none' && !!label;
    const showSubLabel = !!sublabel;
    return /*#__PURE__*/_jsxs(Stack, {
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
      marginTop: dashboardTextOffset,
      paddingHorizontal: strokeWidth + 4,
      children: [centreText !== null && centreText !== '' && /*#__PURE__*/_jsx(StyledText, {
        fontSize: preset.primaryFont,
        fontWeight: theme.fontWeight.bold,
        color: colors.label,
        lineHeight: preset.primaryFont + 3,
        textAlign: "center",
        children: centreText
      }), showSecondLine && /*#__PURE__*/_jsx(StyledText, {
        fontSize: preset.secondaryFont,
        color: colors.sublabel,
        lineHeight: preset.secondaryFont + 2,
        textAlign: "center",
        children: label
      }), showSubLabel && !showSecondLine && /*#__PURE__*/_jsx(StyledText, {
        fontSize: preset.secondaryFont,
        color: colors.sublabel,
        lineHeight: preset.secondaryFont + 2,
        textAlign: "center",
        children: sublabel
      }), showSubLabel && showSecondLine && /*#__PURE__*/_jsx(StyledText, {
        fontSize: Math.max(preset.secondaryFont - 1, 8),
        color: colors.sublabel,
        lineHeight: preset.secondaryFont + 1,
        textAlign: "center",
        children: sublabel
      })]
    });
  };
  return /*#__PURE__*/_jsxs(Stack, {
    width: diameter,
    height: isDashboard ? diameter / 2 + strokeWidth : diameter,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    children: [/*#__PURE__*/_jsx(Stack, {
      style: S.svg_wrap,
      children: /*#__PURE__*/_jsxs(Svg, {
        width: diameter,
        height: diameter,
        style: isDashboard ? {
          marginTop: -(diameter / 2)
        } : undefined,
        children: [variant === 'gradient' && /*#__PURE__*/_jsx(Defs, {
          children: /*#__PURE__*/_jsxs(LinearGradient, {
            id: gradientId,
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "0%",
            children: [/*#__PURE__*/_jsx(Stop, {
              offset: "0%",
              stopColor: colors.gradientFrom
            }), /*#__PURE__*/_jsx(Stop, {
              offset: "100%",
              stopColor: colors.gradientTo
            })]
          })
        }), /*#__PURE__*/_jsx(Circle, {
          cx: center,
          cy: center,
          r: radius,
          stroke: colors.track,
          strokeWidth: strokeWidth,
          strokeDasharray: trackDash,
          strokeLinecap: "butt",
          fill: "none",
          opacity: trackOpacity,
          rotation: isDashboard ? 90 : 0,
          origin: `${center}, ${center}`
        }), /*#__PURE__*/_jsx(AnimatedCircle, {
          cx: center,
          cy: center,
          r: radius,
          stroke: arcStroke,
          strokeWidth: strokeWidth,
          fill: "none",
          strokeDasharray: arcLength,
          strokeDashoffset: strokeDashoffset,
          strokeLinecap: lineCap,
          rotation: isDashboard ? 90 : -90,
          origin: `${center}, ${center}`
        })]
      })
    }), children ? /*#__PURE__*/_jsx(Stack, {
      alignItems: "center",
      justifyContent: "center",
      children: children
    }) : renderTextBlock()]
  });
};
const S = StyleSheet.create({
  svg_wrap: {
    position: 'absolute'
  }
});
//# sourceMappingURL=index.js.map