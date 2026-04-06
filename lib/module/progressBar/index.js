"use strict";

/**
 * StyledProgressBar.tsx
 * ──────────────────────
 * Production-ready animated progress bar component for fluent-styles apps.
 *
 * Variants:
 *  • default   — flat filled bar
 *  • striped   — diagonal animated stripes
 *  • gradient  — left-to-right colour gradient
 *  • segmented — divided into equal tick segments
 *  • buffer    — primary bar + secondary buffer track (video/audio style)
 *
 * Sizes:     xs | sm | md | lg | xl
 * Label pos: none | inside | above | below | right
 * Shape:     rounded | square | pill
 */

import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, ClipPath } from 'react-native-svg';
import { Stack, StyledText, theme, palettes } from 'fluent-styles';

// ─── Types ────────────────────────────────────────────────────────────────────
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ─── Size tokens ──────────────────────────────────────────────────────────────

const SIZE_H = {
  xs: 3,
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24
};
const LABEL_SIZE = {
  xs: 10,
  sm: 10,
  md: 11,
  lg: 12,
  xl: 13
};

// ─── Shape → border radius ────────────────────────────────────────────────────

function getBR(shape, h) {
  if (shape === 'square') return 0;
  if (shape === 'pill') return 999;
  return h / 2; // rounded
}

// ─── Default colours ──────────────────────────────────────────────────────────

function buildColors(o) {
  return {
    fill: o?.fill ?? theme.colors.blue?.[500] ?? '#3b82f6',
    track: o?.track ?? theme.colors.gray[100],
    buffer: o?.buffer ?? theme.colors.gray[300],
    stripe: o?.stripe ?? 'rgba(255,255,255,0.25)',
    gradFrom: o?.gradFrom ?? theme.colors.blue?.[400] ?? '#60a5fa',
    gradTo: o?.gradTo ?? theme.colors.indigo?.[600] ?? '#4f46e5',
    label: o?.label ?? theme.colors.gray[700],
    labelInside: o?.labelInside ?? palettes.white
  };
}

// ─── Striped fill (SVG hatch) ─────────────────────────────────────────────────

const StripedFill = ({
  width,
  height,
  fillColor,
  stripeColor,
  borderRadius,
  progress
}) => {
  const [w, setW] = useState(0);

  // Drive width via JS listener since SVG can't use Animated natively
  useEffect(() => {
    const id = progress.addListener(({
      value
    }) => setW(value * width));
    return () => progress.removeListener(id);
  }, [width]);
  const lines = [];
  const spacing = 12;
  for (let x = -height; x < w + height; x += spacing) {
    lines.push(/*#__PURE__*/_jsx(Rect, {
      x: x,
      y: 0,
      width: 6,
      height: height,
      fill: stripeColor,
      transform: `skewX(-20)`
    }, x));
  }
  return /*#__PURE__*/_jsxs(Svg, {
    width: width,
    height: height,
    style: {
      position: 'absolute',
      left: 0,
      top: 0
    },
    children: [/*#__PURE__*/_jsx(Defs, {
      children: /*#__PURE__*/_jsx(ClipPath, {
        id: "bar-clip",
        children: /*#__PURE__*/_jsx(Rect, {
          x: 0,
          y: 0,
          width: w,
          height: height,
          rx: borderRadius
        })
      })
    }), /*#__PURE__*/_jsx(Rect, {
      x: 0,
      y: 0,
      width: w,
      height: height,
      rx: borderRadius,
      fill: fillColor
    }), /*#__PURE__*/_jsx(Rect, {
      x: 0,
      y: 0,
      width: w,
      height: height,
      rx: borderRadius,
      fill: "transparent",
      clipPath: "url(#bar-clip)"
    }), lines.map(l => /*#__PURE__*/_jsx(Svg, {
      clipPath: "url(#bar-clip)",
      width: w,
      height: height,
      children: l
    }, l.key))]
  });
};

// ─── Gradient fill (SVG) ──────────────────────────────────────────────────────

const GradientFill = ({
  totalWidth,
  height,
  gradFrom,
  gradTo,
  borderRadius,
  progress
}) => {
  const [w, setW] = useState(0);
  useEffect(() => {
    const id = progress.addListener(({
      value
    }) => setW(value * totalWidth));
    return () => progress.removeListener(id);
  }, [totalWidth]);
  return /*#__PURE__*/_jsxs(Svg, {
    width: totalWidth,
    height: height,
    style: {
      position: 'absolute',
      left: 0,
      top: 0
    },
    children: [/*#__PURE__*/_jsxs(Defs, {
      children: [/*#__PURE__*/_jsxs(LinearGradient, {
        id: "pg",
        x1: "0",
        y1: "0",
        x2: "1",
        y2: "0",
        children: [/*#__PURE__*/_jsx(Stop, {
          offset: "0%",
          stopColor: gradFrom,
          stopOpacity: "1"
        }), /*#__PURE__*/_jsx(Stop, {
          offset: "100%",
          stopColor: gradTo,
          stopOpacity: "1"
        })]
      }), /*#__PURE__*/_jsx(ClipPath, {
        id: "grad-clip",
        children: /*#__PURE__*/_jsx(Rect, {
          x: 0,
          y: 0,
          width: w,
          height: height,
          rx: borderRadius
        })
      })]
    }), /*#__PURE__*/_jsx(Rect, {
      x: 0,
      y: 0,
      width: totalWidth,
      height: height,
      rx: borderRadius,
      fill: "url(#pg)",
      clipPath: "url(#grad-clip)"
    })]
  });
};

// ─── StyledProgressBar ────────────────────────────────────────────────────────

/**
 * StyledProgressBar — animated, multi-variant progress indicator.
 *
 * @example Basic (default, blue fill)
 * ```tsx
 * <StyledProgressBar value={65} />
 * ```
 *
 * @example With label above + percentage
 * ```tsx
 * <StyledProgressBar value={65} labelPosition="above" />
 * ```
 *
 * @example Gradient variant
 * ```tsx
 * <StyledProgressBar
 *   value={72}
 *   variant="gradient"
 *   size="lg"
 *   labelPosition="right"
 *   colors={{ gradFrom: '#6366f1', gradTo: '#22d3ee' }}
 * />
 * ```
 *
 * @example Segmented (workout sets)
 * ```tsx
 * <StyledProgressBar
 *   value={4}
 *   total={9}
 *   variant="segmented"
 *   segments={9}
 *   showSteps
 *   labelPosition="right"
 *   colors={{ fill: '#8bc34a' }}
 * />
 * ```
 *
 * @example Buffer (media player)
 * ```tsx
 * <StyledProgressBar
 *   value={30}
 *   bufferValue={60}
 *   variant="buffer"
 *   size="sm"
 *   colors={{ fill: '#2563eb', buffer: '#bfdbfe' }}
 * />
 * ```
 *
 * @example Striped (active task)
 * ```tsx
 * <StyledProgressBar value={45} variant="striped" size="lg" labelPosition="inside" />
 * ```
 */
export const StyledProgressBar = ({
  value,
  total = 100,
  bufferValue,
  variant = 'default',
  size = 'md',
  shape = 'rounded',
  labelPosition = 'none',
  label,
  showSteps = false,
  segments = 5,
  segmentGap = 3,
  width: widthProp,
  animated: anim = true,
  animationDuration = 600,
  colors: colorsProp,
  onAnimationComplete
}) => {
  const C = buildColors(colorsProp);
  const h = SIZE_H[size];
  const br = getBR(shape, h);
  const pct = Math.min(Math.max(value / total, 0), 1);
  const bufPct = Math.min(Math.max((bufferValue ?? value) / total, 0), 1);

  // Auto-measure container width
  const [containerW, setContainerW] = useState(widthProp ?? 0);
  const barW = widthProp ?? containerW;

  // Animation
  const animVal = useRef(new Animated.Value(anim ? 0 : pct)).current;
  const [animPct, setAnimPct] = useState(anim ? 0 : pct);
  useEffect(() => {
    if (!anim) {
      setAnimPct(pct);
      return;
    }
    const id = animVal.addListener(({
      value: v
    }) => setAnimPct(v));
    Animated.timing(animVal, {
      toValue: pct,
      duration: animationDuration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false
    }).start(({
      finished
    }) => {
      if (finished) onAnimationComplete?.();
    });
    return () => animVal.removeListener(id);
  }, [pct]);

  // Label text
  const labelText = label !== undefined && label !== false ? label : showSteps ? `${value} / ${total}` : `${Math.round(animPct * 100)}%`;
  const showLabel = label !== false && labelPosition !== 'none';

  // ── Above label ──────────────────────────────────────────────────────────
  const aboveLabel = showLabel && labelPosition === 'above' ? /*#__PURE__*/_jsx(Stack, {
    horizontal: true,
    justifyContent: "flex-end",
    marginBottom: 4,
    children: /*#__PURE__*/_jsx(StyledText, {
      fontSize: LABEL_SIZE[size],
      fontWeight: theme.fontWeight.semiBold,
      color: C.label,
      children: labelText
    })
  }) : null;

  // ── Below label ──────────────────────────────────────────────────────────
  const belowLabel = showLabel && labelPosition === 'below' ? /*#__PURE__*/_jsx(Stack, {
    horizontal: true,
    justifyContent: "flex-end",
    marginTop: 4,
    children: /*#__PURE__*/_jsx(StyledText, {
      fontSize: LABEL_SIZE[size],
      fontWeight: theme.fontWeight.semiBold,
      color: C.label,
      children: labelText
    })
  }) : null;

  // ── The bar itself ────────────────────────────────────────────────────────
  const renderBar = () => {
    if (!barW) return null;

    // ── Segmented ──────────────────────────────────────────────────────────
    if (variant === 'segmented') {
      const segW = (barW - segmentGap * (segments - 1)) / segments;
      const filledCount = Math.round(pct * segments);
      return /*#__PURE__*/_jsx(Stack, {
        horizontal: true,
        gap: segmentGap,
        children: Array.from({
          length: segments
        }, (_, i) => /*#__PURE__*/_jsx(Stack, {
          width: segW,
          height: h,
          borderRadius: br,
          backgroundColor: i < filledCount ? C.fill : C.track
        }, i))
      });
    }

    // ── Buffer ─────────────────────────────────────────────────────────────
    if (variant === 'buffer') {
      return /*#__PURE__*/_jsxs(Stack, {
        width: barW,
        height: h,
        borderRadius: br,
        backgroundColor: C.track,
        overflow: "hidden",
        children: [/*#__PURE__*/_jsx(Stack, {
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: `${bufPct * 100}%`,
          backgroundColor: C.buffer
        }), /*#__PURE__*/_jsx(Animated.View, {
          style: {
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: animVal.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%']
            }),
            backgroundColor: C.fill,
            borderRadius: br
          }
        })]
      });
    }

    // ── Gradient ───────────────────────────────────────────────────────────
    if (variant === 'gradient') {
      return /*#__PURE__*/_jsx(Stack, {
        width: barW,
        height: h,
        borderRadius: br,
        backgroundColor: C.track,
        overflow: "hidden",
        children: /*#__PURE__*/_jsx(GradientFill, {
          totalWidth: barW,
          height: h,
          gradFrom: C.gradFrom,
          gradTo: C.gradTo,
          borderRadius: br,
          progress: animVal
        })
      });
    }

    // ── Striped ────────────────────────────────────────────────────────────
    if (variant === 'striped') {
      const insideLabel = showLabel && labelPosition === 'inside' ? /*#__PURE__*/_jsx(Stack, {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        children: /*#__PURE__*/_jsx(StyledText, {
          fontSize: LABEL_SIZE[size],
          fontWeight: "700",
          color: C.labelInside,
          children: labelText
        })
      }) : null;
      return /*#__PURE__*/_jsxs(Stack, {
        width: barW,
        height: h,
        borderRadius: br,
        backgroundColor: C.track,
        overflow: "hidden",
        children: [/*#__PURE__*/_jsx(StripedFill, {
          width: barW,
          height: h,
          fillColor: C.fill,
          stripeColor: C.stripe,
          borderRadius: br,
          progress: animVal
        }), insideLabel]
      });
    }

    // ── Default ────────────────────────────────────────────────────────────
    const insideLabel = showLabel && labelPosition === 'inside' ? /*#__PURE__*/_jsx(Stack, {
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      children: /*#__PURE__*/_jsx(StyledText, {
        fontSize: LABEL_SIZE[size],
        fontWeight: "700",
        color: C.labelInside,
        children: labelText
      })
    }) : null;
    return /*#__PURE__*/_jsxs(Stack, {
      width: barW,
      height: h,
      borderRadius: br,
      backgroundColor: C.track,
      overflow: "hidden",
      children: [/*#__PURE__*/_jsx(Animated.View, {
        style: {
          width: animVal.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%']
          }),
          height: h,
          borderRadius: br,
          backgroundColor: C.fill
        }
      }), insideLabel]
    });
  };

  // ── Compose layout ─────────────────────────────────────────────────────────
  return /*#__PURE__*/_jsxs(Stack, {
    onLayout: widthProp ? undefined : e => setContainerW(e.nativeEvent.layout.width),
    children: [aboveLabel, /*#__PURE__*/_jsxs(Stack, {
      horizontal: true,
      alignItems: "center",
      gap: 10,
      children: [/*#__PURE__*/_jsx(Stack, {
        flex: labelPosition === 'right' ? 1 : undefined,
        width: labelPosition === 'right' ? undefined : barW || undefined,
        children: renderBar()
      }), showLabel && labelPosition === 'right' && /*#__PURE__*/_jsx(StyledText, {
        fontSize: LABEL_SIZE[size],
        fontWeight: theme.fontWeight.semiBold,
        color: C.label,
        minWidth: 38,
        children: labelText
      })]
    }), belowLabel]
  });
};
export default StyledProgressBar;
//# sourceMappingURL=index.js.map