"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledCircularProgress = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _index = require("../stack/index.js");
var _index2 = require("../text/index.js");
var _theme = require("../utiles/theme.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Types ────────────────────────────────────────────────────────────────────

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
  arc: _theme.theme.colors.indigo?.[500] ?? '#6366f1',
  track: _theme.theme.colors.gray[200],
  label: _theme.theme.colors.gray[800],
  sublabel: _theme.theme.colors.gray[400],
  gradientFrom: _theme.theme.colors.violet?.[500] ?? '#8b5cf6',
  gradientTo: _theme.theme.colors.cyan?.[400] ?? '#22d3ee'
};
const AnimatedCircle = _reactNative.Animated.createAnimatedComponent(_reactNativeSvg.Circle);
const StyledCircularProgress = ({
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
  const colors = (0, _react.useMemo)(() => colorOverrides ? {
    ...DEFAULT_COLORS,
    ...colorOverrides
  } : DEFAULT_COLORS, [colorOverrides]);
  const clamped = Math.min(Math.max(value, 0), total);
  const fraction = total > 0 ? clamped / total : 0;
  const progress = (0, _react.useRef)(new _reactNative.Animated.Value(animated ? 0 : fraction)).current;
  (0, _react.useEffect)(() => {
    if (!animated) {
      progress.setValue(fraction);
      return;
    }
    _reactNative.Animated.timing(progress, {
      toValue: fraction,
      duration,
      easing: _reactNative.Easing.out(_reactNative.Easing.cubic),
      useNativeDriver: false
    }).start();
  }, [fraction, animated, duration, progress]);
  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [arcLength, 0]
  });
  const center = diameter / 2;
  const gradientId = `cpGrad-${Math.round(diameter)}-${variant}`;
  const centreText = (0, _react.useMemo)(() => {
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
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
        position: "absolute",
        left: strokeWidth + 6,
        right: strokeWidth + 6,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        pointerEvents: "none",
        children: [centreText !== null && centreText !== '' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
          fontSize: preset.primaryFont,
          fontWeight: _theme.theme.fontWeight.bold,
          color: colors.label,
          lineHeight: preset.primaryFont + 3,
          textAlign: "center",
          children: centreText
        }), !!label && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
          fontSize: preset.secondaryFont,
          color: colors.sublabel,
          lineHeight: preset.secondaryFont + 2,
          textAlign: "center",
          children: label
        }), !!sublabel && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
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
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
      marginTop: dashboardTextOffset,
      paddingHorizontal: strokeWidth + 4,
      children: [centreText !== null && centreText !== '' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
        fontSize: preset.primaryFont,
        fontWeight: _theme.theme.fontWeight.bold,
        color: colors.label,
        lineHeight: preset.primaryFont + 3,
        textAlign: "center",
        children: centreText
      }), showSecondLine && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
        fontSize: preset.secondaryFont,
        color: colors.sublabel,
        lineHeight: preset.secondaryFont + 2,
        textAlign: "center",
        children: label
      }), showSubLabel && !showSecondLine && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
        fontSize: preset.secondaryFont,
        color: colors.sublabel,
        lineHeight: preset.secondaryFont + 2,
        textAlign: "center",
        children: sublabel
      }), showSubLabel && showSecondLine && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
        fontSize: Math.max(preset.secondaryFont - 1, 8),
        color: colors.sublabel,
        lineHeight: preset.secondaryFont + 1,
        textAlign: "center",
        children: sublabel
      })]
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
    width: diameter,
    height: isDashboard ? diameter / 2 + strokeWidth : diameter,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
      style: S.svg_wrap,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.default, {
        width: diameter,
        height: diameter,
        style: isDashboard ? {
          marginTop: -(diameter / 2)
        } : undefined,
        children: [variant === 'gradient' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Defs, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.LinearGradient, {
            id: gradientId,
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "0%",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Stop, {
              offset: "0%",
              stopColor: colors.gradientFrom
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Stop, {
              offset: "100%",
              stopColor: colors.gradientTo
            })]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Circle, {
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
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(AnimatedCircle, {
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
    }), children ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
      alignItems: "center",
      justifyContent: "center",
      children: children
    }) : renderTextBlock()]
  });
};
exports.StyledCircularProgress = StyledCircularProgress;
const S = _reactNative.StyleSheet.create({
  svg_wrap: {
    position: 'absolute'
  }
});
//# sourceMappingURL=index.js.map