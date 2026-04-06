"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = exports.LOADER_LIGHT = exports.LOADER_DARK = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../utiles/theme.js");
var _circular = require("./circular.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Loader colour tokens ─────────────────────────────────────────────────────

const LOADER_LIGHT = exports.LOADER_LIGHT = {
  indicator: '#6366f1',
  overlayBg: 'rgba(0,0,0,0.35)',
  cardBg: '#ffffff',
  cardBorder: '#e4e4e7',
  label: '#3f3f46'
};
const LOADER_DARK = exports.LOADER_DARK = {
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
  const rotate = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  (0, _react.useEffect)(() => {
    _reactNative.Animated.loop(_reactNative.Animated.timing(rotate, {
      toValue: 1,
      duration: 800,
      easing: _reactNative.Easing.linear,
      useNativeDriver: true
    })).start();
  }, []);
  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
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
  const scale = (0, _react.useRef)(new _reactNative.Animated.Value(1)).current;
  const opacity = (0, _react.useRef)(new _reactNative.Animated.Value(0.8)).current;
  (0, _react.useEffect)(() => {
    _reactNative.Animated.loop(_reactNative.Animated.parallel([_reactNative.Animated.sequence([_reactNative.Animated.timing(scale, {
      toValue: 1.6,
      duration: 700,
      easing: _reactNative.Easing.out(_reactNative.Easing.ease),
      useNativeDriver: true
    }), _reactNative.Animated.timing(scale, {
      toValue: 1,
      duration: 700,
      easing: _reactNative.Easing.in(_reactNative.Easing.ease),
      useNativeDriver: true
    })]), _reactNative.Animated.sequence([_reactNative.Animated.timing(opacity, {
      toValue: 0.1,
      duration: 700,
      useNativeDriver: true
    }), _reactNative.Animated.timing(opacity, {
      toValue: 0.8,
      duration: 700,
      useNativeDriver: true
    })])])).start();
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
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
  const anims = [(0, _react.useRef)(new _reactNative.Animated.Value(0)).current, (0, _react.useRef)(new _reactNative.Animated.Value(0)).current, (0, _react.useRef)(new _reactNative.Animated.Value(0)).current];
  (0, _react.useEffect)(() => {
    const seq = (anim, delay) => _reactNative.Animated.loop(_reactNative.Animated.sequence([_reactNative.Animated.delay(delay), _reactNative.Animated.timing(anim, {
      toValue: -8,
      duration: 300,
      useNativeDriver: true
    }), _reactNative.Animated.timing(anim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }), _reactNative.Animated.delay(600 - delay)]));
    anims.forEach((a, i) => seq(a, i * 150).start());
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: ind.dotsRow,
    children: anims.map((anim, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
      style: [ind.dot, {
        backgroundColor: color,
        transform: [{
          translateY: anim
        }]
      }]
    }, i))
  });
};
const ind = _reactNative.StyleSheet.create({
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

const Loader = ({
  label,
  variant = 'spinner',
  color: colorProp,
  overlay = false,
  theme = 'dark',
  colors: colorOverrides
}) => {
  const deviceScheme = (0, _reactNative.useColorScheme)();
  const colors = (0, _react.useMemo)(() => {
    const base = (0, _theme.resolveTheme)(theme, deviceScheme) === 'light' ? LOADER_LIGHT : LOADER_DARK;
    return colorOverrides ? {
      ...base,
      ...colorOverrides
    } : base;
  }, [theme, deviceScheme, colorOverrides]);

  // `color` prop overrides the theme's indicator tint
  const tint = colorProp ?? colors.indicator;
  const indicator = {
    spinner: /*#__PURE__*/(0, _jsxRuntime.jsx)(Spinner, {
      color: tint
    }),
    pulse: /*#__PURE__*/(0, _jsxRuntime.jsx)(Pulse, {
      color: tint
    }),
    dots: /*#__PURE__*/(0, _jsxRuntime.jsx)(Dots, {
      color: tint
    }),
    circular: /*#__PURE__*/(0, _jsxRuntime.jsx)(_circular.Circular, {
      color: tint
    })
  }[variant];
  if (overlay) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.overlay, {
        backgroundColor: colors.overlayBg
      }],
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: [styles.card, {
          backgroundColor: colors.cardBg,
          borderColor: colors.cardBorder
        }],
        children: [indicator, label ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [styles.label, {
            color: colors.label
          }],
          children: label
        }) : null]
      })
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.inline,
    children: [indicator, label ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: [styles.label, {
        color: colors.label
      }],
      children: label
    }) : null]
  });
};

// ─── Styles (layout only) ─────────────────────────────────────────────────────
exports.Loader = Loader;
const styles = _reactNative.StyleSheet.create({
  overlay: {
    ..._reactNative.StyleSheet.absoluteFillObject,
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