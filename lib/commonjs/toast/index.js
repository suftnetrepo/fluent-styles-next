"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TOAST_DARK", {
  enumerable: true,
  get: function () {
    return _theme.TOAST_DARK;
  }
});
Object.defineProperty(exports, "TOAST_LIGHT", {
  enumerable: true,
  get: function () {
    return _theme.TOAST_LIGHT;
  }
});
exports.Toast = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../utiles/theme.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Icon map ─────────────────────────────────────────────────────────────────

const VARIANT_ICON = {
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'i'
};

// ─── Component ────────────────────────────────────────────────────────────────

const Toast = ({
  message,
  description,
  variant = 'info',
  duration = 3500,
  onDismiss,
  theme = 'dark',
  colors: colorOverrides
}) => {
  const deviceScheme = (0, _reactNative.useColorScheme)();
  const colors = (0, _react.useMemo)(() => {
    const base = (0, _theme.resolveTheme)(theme, deviceScheme) === 'light' ? _theme.TOAST_LIGHT : _theme.TOAST_DARK;
    return colorOverrides ? {
      ...base,
      ...colorOverrides
    } : base;
  }, [theme, deviceScheme, colorOverrides]);

  // Resolved per-variant tokens
  const bg = colors[`${variant}Bg`];
  const border = colors[`${variant}Border`];
  const label = colors[`${variant}Label`];
  const icon = VARIANT_ICON[variant];

  // ── Animation ────────────────────────────────────────────────────────────
  const translateY = (0, _react.useRef)(new _reactNative.Animated.Value(-20)).current;
  const opacity = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const isDismissing = (0, _react.useRef)(false);
  const onDismissRef = (0, _react.useRef)(onDismiss);
  (0, _react.useEffect)(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);
  const dismiss = (0, _react.useCallback)(() => {
    if (isDismissing.current) return;
    isDismissing.current = true;
    _reactNative.Animated.parallel([_reactNative.Animated.timing(translateY, {
      toValue: -20,
      duration: 220,
      useNativeDriver: true
    }), _reactNative.Animated.timing(opacity, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true
    })]).start(() => onDismissRef.current?.());
  }, [translateY, opacity]);
  (0, _react.useEffect)(() => {
    _reactNative.Animated.parallel([_reactNative.Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      damping: 18,
      stiffness: 200
    }), _reactNative.Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    })]).start();
    if (duration > 0) {
      const t = setTimeout(dismiss, duration);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Render ───────────────────────────────────────────────────────────────
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Animated.View, {
    style: [styles.container, {
      backgroundColor: bg,
      borderColor: border,
      opacity,
      transform: [{
        translateY
      }]
    }],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.iconBadge, {
        borderColor: border
      }],
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.iconText, {
          color: label
        }],
        children: icon
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.textBlock,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.message, {
          color: label
        }],
        children: message
      }), description ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.description, {
          color: colors.description
        }],
        children: description
      }) : null]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      onPress: dismiss,
      hitSlop: {
        top: 8,
        bottom: 8,
        left: 8,
        right: 8
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.close, {
          color: colors.closeIcon
        }],
        children: "\u2715"
      })
    })]
  });
};

// ─── Styles (layout only) ─────────────────────────────────────────────────────
exports.Toast = Toast;
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
    minWidth: 280,
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconText: {
    fontSize: 13,
    fontWeight: '700'
  },
  textBlock: {
    flex: 1,
    gap: 2
  },
  message: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.1
  },
  description: {
    fontSize: 12,
    lineHeight: 16
  },
  close: {
    fontSize: 12,
    fontWeight: '600'
  }
});
//# sourceMappingURL=index.js.map