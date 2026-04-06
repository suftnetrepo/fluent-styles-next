"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StyledSlider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _fluentStyles = require("fluent-styles");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * StyledSlider.tsx
 * ─────────────────
 * Production-ready animated slider component for fluent-styles apps.
 *
 * Variants:
 *  • default    — single thumb, fill left of thumb
 *  • range      — two thumbs, fill between them
 *  • stepped    — snaps to discrete tick marks
 *  • gradient   — gradient-filled track
 *  • buffer     — primary thumb + secondary buffer fill (media player style)
 *
 * Tooltip fix (three-layer layout):
 *  • Track fill lives in its own overflow:hidden View
 *  • Thumbs + tooltips live in a sibling overflow:visible wrapper
 *  • SVG <Path> triangle pointer — never clips, always sharp
 *  • useNativeDriver: false for tooltipAnim so text colour renders correctly on iOS
 */

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Size tokens ──────────────────────────────────────────────────────────────

const TRACK_H = {
  sm: 4,
  md: 6,
  lg: 10
};
const THUMB_D = {
  sm: 18,
  md: 24,
  lg: 32
};

// ─── Colours ──────────────────────────────────────────────────────────────────

function buildColors(o) {
  const fill = o?.fill ?? "#3b82f6";
  return {
    fill,
    track: o?.track ?? _fluentStyles.theme.colors.gray[200],
    buffer: o?.buffer ?? _fluentStyles.theme.colors.gray[300],
    thumb: o?.thumb ?? "#ffffff",
    thumbBorder: o?.thumbBorder ?? fill,
    gradFrom: o?.gradFrom ?? "#60a5fa",
    gradTo: o?.gradTo ?? "#4f46e5",
    tooltipBg: o?.tooltipBg ?? "#111827",
    tooltipText: o?.tooltipText ?? "#ffffff",
    rangeLabel: o?.rangeLabel ?? _fluentStyles.theme.colors.gray[400],
    tick: o?.tick ?? _fluentStyles.theme.colors.gray[300],
    tickActive: o?.tickActive ?? fill
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
function snapToStep(value, min, max, step) {
  const steps = Math.round((value - min) / step);
  return clamp(min + steps * step, min, max);
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────
//
// Self-measuring: measures its own width after first layout, then applies
// translateX = -(width/2) to centre precisely over the thumb.
// Uses useNativeDriver: false for opacity so iOS renders text colour correctly.
// SVG Path triangle — never clips, always pixel-perfect.

const Tooltip = ({
  visible,
  label,
  bgColor,
  textColor
}) => {
  const [bubbleW, setBubbleW] = (0, _react.useState)(0);
  const safeBg = bgColor || "#111827";
  const safeText = textColor || "#ffffff";
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Animated.View, {
    pointerEvents: "none",
    style: {
      position: "absolute",
      bottom: "100%",
      left: "50%",
      opacity: visible,
      transform: [{
        translateX: bubbleW > 0 ? -(bubbleW / 2) : 0
      }, {
        translateY: -8
      }],
      zIndex: 9999,
      elevation: 20
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
      onLayout: e => setBubbleW(e.nativeEvent.layout.width),
      backgroundColor: safeBg,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
      minWidth: label.length * 18 // rough guess to prevent excessive shrinking for short labels
      ,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
        numberOfLines: 1,
        ellipsizeMode: "clip",
        color: safeText,
        fontSize: 12,
        fontWeight: "700",
        lineHeight: 14,
        textAlign: "center",
        flexShrink: 0,
        includeFontPadding: false,
        children: label
      })
    }), bubbleW > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: {
        position: "absolute",
        top: "100%",
        left: bubbleW / 2 - 6,
        marginTop: -1
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.default, {
        width: 12,
        height: 7,
        viewBox: "0 0 12 7",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
          d: "M0 0 L6 7 L12 0 Z",
          fill: safeBg
        })
      })
    })]
  });
};

// ─── Thumb ────────────────────────────────────────────────────────────────────

const Thumb = ({
  position,
  trackWidth,
  thumbD,
  trackH,
  color,
  borderColor,
  tooltipLabel,
  showTooltip,
  alwaysTooltip,
  tooltipBg,
  tooltipText,
  disabled,
  onStart,
  onMove,
  onEnd
}) => {
  // scaleAnim uses native driver (transform only — safe)
  const scaleAnim = (0, _react.useRef)(new _reactNative.Animated.Value(1)).current;
  // tooltipAnim uses JS driver (opacity — required for text colour on iOS)
  const tooltipAnim = (0, _react.useRef)(new _reactNative.Animated.Value(alwaysTooltip ? 1 : 0)).current;
  const dragging = (0, _react.useRef)(false);
  const animateIn = () => {
    _reactNative.Animated.parallel([_reactNative.Animated.spring(scaleAnim, {
      toValue: 1.2,
      useNativeDriver: true
    }), _reactNative.Animated.timing(tooltipAnim, {
      toValue: 1,
      duration: 150,
      easing: _reactNative.Easing.out(_reactNative.Easing.ease),
      useNativeDriver: false
    })]).start();
  };
  const animateOut = () => {
    _reactNative.Animated.parallel([_reactNative.Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true
    }), _reactNative.Animated.timing(tooltipAnim, {
      toValue: alwaysTooltip ? 1 : 0,
      duration: 150,
      useNativeDriver: false // JS driver — keeps text colour correct on iOS
    })]).start();
  };
  const panResponder = (0, _react.useRef)(_reactNative.PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,
    onPanResponderGrant: () => {
      dragging.current = true;
      onStart();
      if (showTooltip) animateIn();
    },
    onPanResponderMove: (_, gs) => {
      if (!dragging.current || trackWidth <= 0) return;
      const newFraction = clamp(position + gs.dx / trackWidth, 0, 1);
      onMove(newFraction);
    },
    onPanResponderRelease: () => {
      dragging.current = false;
      onEnd();
      animateOut();
    },
    onPanResponderTerminate: () => {
      dragging.current = false;
      animateOut();
    }
  })).current;
  const left = position * trackWidth - thumbD / 2;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Animated.View, {
    ...panResponder.panHandlers,
    style: {
      position: "absolute",
      left,
      top: 0,
      // wrapper height = thumbD, centred
      width: thumbD,
      height: thumbD,
      overflow: "visible",
      // tooltip floats up freely
      transform: [{
        scale: scaleAnim
      }]
    },
    children: [showTooltip && /*#__PURE__*/(0, _jsxRuntime.jsx)(Tooltip, {
      visible: tooltipAnim,
      label: tooltipLabel,
      bgColor: tooltipBg,
      textColor: tooltipText
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: {
        width: thumbD,
        height: thumbD,
        borderRadius: thumbD / 2,
        backgroundColor: color,
        borderWidth: 2,
        borderColor: borderColor,
        shadowColor: borderColor,
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: {
          width: 0,
          height: 2
        },
        elevation: 4
      }
    })]
  });
};

// ─── Gradient fill ────────────────────────────────────────────────────────────

const GradFill = ({
  width,
  height,
  fillFraction,
  gradFrom,
  gradTo,
  borderRadius
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.default, {
  width: width,
  height: height,
  style: {
    position: "absolute",
    left: 0,
    top: 0
  },
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Defs, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.LinearGradient, {
      id: "sg",
      x1: "0",
      y1: "0",
      x2: "1",
      y2: "0",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Stop, {
        offset: "0%",
        stopColor: gradFrom
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Stop, {
        offset: "100%",
        stopColor: gradTo
      })]
    })
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Rect, {
    x: 0,
    y: 0,
    width: width * fillFraction,
    height: height,
    rx: borderRadius,
    fill: "url(#sg)"
  })]
});

// ─── StyledSlider ─────────────────────────────────────────────────────────────

const StyledSlider = ({
  value,
  valueHigh,
  bufferValue,
  min = 0,
  max = 100,
  step = 1,
  variant = "default",
  size = "md",
  showTooltip = true,
  alwaysShowTooltip = false,
  showMinMax = false,
  steps = 5,
  formatLabel = v => String(Math.round(v)),
  width: widthProp,
  disabled = false,
  colors: colorsProp,
  onValueChange,
  onSlidingComplete,
  onRangeChange,
  onRangeComplete
}) => {
  const C = buildColors(colorsProp);
  const trackH = TRACK_H[size];
  const thumbD = THUMB_D[size];
  const trackBR = trackH / 2;
  const [trackW, setTrackW] = (0, _react.useState)(widthProp ?? 0);
  const barW = widthProp ?? trackW;
  const [localLow, setLocalLow] = (0, _react.useState)(value);
  const [localHigh, setLocalHigh] = (0, _react.useState)(valueHigh ?? max);
  const [bufLocal, setBufLocal] = (0, _react.useState)(bufferValue ?? value);
  (0, _react.useEffect)(() => {
    setLocalLow(value);
  }, [value]);
  (0, _react.useEffect)(() => {
    if (valueHigh !== undefined) setLocalHigh(valueHigh);
  }, [valueHigh]);
  (0, _react.useEffect)(() => {
    if (bufferValue !== undefined) setBufLocal(bufferValue);
  }, [bufferValue]);
  const range = max - min;
  const lowF = clamp((localLow - min) / range, 0, 1);
  const highF = clamp((localHigh - min) / range, 0, 1);
  const bufF = clamp((bufLocal - min) / range, 0, 1);
  const effectiveStep = variant === "stepped" ? (max - min) / (steps - 1) : step;
  const handleLowMove = (0, _react.useCallback)(frac => {
    const snapped = snapToStep(min + frac * range, min, variant === "range" ? localHigh : max, effectiveStep);
    setLocalLow(snapped);
    onValueChange?.(snapped);
    if (variant === "range") onRangeChange?.(snapped, localHigh);
  }, [min, range, effectiveStep, localHigh, variant, onValueChange, onRangeChange]);
  const handleLowEnd = (0, _react.useCallback)(() => {
    onSlidingComplete?.(localLow);
    if (variant === "range") onRangeComplete?.(localLow, localHigh);
  }, [localLow, localHigh, variant, onSlidingComplete, onRangeComplete]);
  const handleHighMove = (0, _react.useCallback)(frac => {
    const snapped = snapToStep(min + frac * range, localLow, max, effectiveStep);
    setLocalHigh(snapped);
    onRangeChange?.(localLow, snapped);
  }, [min, range, effectiveStep, localLow, max, onRangeChange]);
  const handleHighEnd = (0, _react.useCallback)(() => {
    onRangeComplete?.(localLow, localHigh);
  }, [localLow, localHigh, onRangeComplete]);
  if (!barW && !widthProp) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      onLayout: e => setTrackW(e.nativeEvent.layout.width),
      style: {
        height: thumbD + 40
      }
    });
  }
  const tickPositions = variant === "stepped" ? Array.from({
    length: steps
  }, (_, i) => i / (steps - 1)) : [];
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    onLayout: widthProp ? undefined : e => setTrackW(e.nativeEvent.layout.width),
    style: {
      opacity: disabled ? 0.45 : 1,
      paddingTop: showTooltip ? 48 : 8,
      paddingBottom: showMinMax ? 20 : 8
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: {
        width: barW,
        height: thumbD,
        overflow: "visible",
        // thumbs + tooltips escape freely
        justifyContent: "center"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: {
          position: "absolute",
          left: 0,
          right: 0,
          height: trackH,
          borderRadius: trackBR,
          backgroundColor: C.track,
          overflow: "hidden" // only fills are clipped
        },
        children: [variant === "buffer" && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${bufF * 100}%`,
            borderRadius: trackBR,
            backgroundColor: C.buffer
          }
        }), variant === "range" ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: {
            position: "absolute",
            left: `${lowF * 100}%`,
            width: `${(highF - lowF) * 100}%`,
            top: 0,
            bottom: 0,
            backgroundColor: C.fill
          }
        }) : variant === "gradient" ? /*#__PURE__*/(0, _jsxRuntime.jsx)(GradFill, {
          width: barW,
          height: trackH,
          fillFraction: lowF,
          gradFrom: C.gradFrom,
          gradTo: C.gradTo,
          borderRadius: trackBR
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${lowF * 100}%`,
            borderRadius: trackBR,
            backgroundColor: C.fill
          }
        })]
      }), variant === "stepped" && tickPositions.map((t, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: {
          position: "absolute",
          left: t * barW - 1,
          top: (thumbD - trackH) / 2 - 3,
          width: 2,
          height: trackH + 6,
          borderRadius: 1,
          backgroundColor: t <= lowF ? C.tickActive : C.tick
        }
      }, i)), /*#__PURE__*/(0, _jsxRuntime.jsx)(Thumb, {
        position: lowF,
        trackWidth: barW,
        thumbD: thumbD,
        trackH: trackH,
        color: C.thumb,
        borderColor: C.thumbBorder,
        tooltipLabel: formatLabel(localLow),
        showTooltip: showTooltip,
        alwaysTooltip: alwaysShowTooltip,
        tooltipBg: C.tooltipBg,
        tooltipText: C.tooltipText,
        disabled: disabled,
        onStart: () => {},
        onMove: handleLowMove,
        onEnd: handleLowEnd
      }), variant === "range" && /*#__PURE__*/(0, _jsxRuntime.jsx)(Thumb, {
        position: highF,
        trackWidth: barW,
        thumbD: thumbD,
        trackH: trackH,
        color: C.thumb,
        borderColor: C.thumbBorder,
        tooltipLabel: formatLabel(localHigh),
        showTooltip: showTooltip,
        alwaysTooltip: alwaysShowTooltip,
        tooltipBg: C.tooltipBg,
        tooltipText: C.tooltipText,
        disabled: disabled,
        onStart: () => {},
        onMove: handleHighMove,
        onEnd: handleHighEnd
      })]
    }), showMinMax && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
      horizontal: true,
      justifyContent: "space-between",
      marginTop: 6,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
        fontSize: 11,
        color: C.rangeLabel,
        children: formatLabel(min)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
        fontSize: 11,
        color: C.rangeLabel,
        children: formatLabel(max)
      })]
    })]
  });
};
exports.StyledSlider = StyledSlider;
var _default = exports.default = StyledSlider;
//# sourceMappingURL=index.js.map