"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DIALOGUE_DARK", {
  enumerable: true,
  get: function () {
    return _theme.DIALOGUE_DARK;
  }
});
Object.defineProperty(exports, "DIALOGUE_LIGHT", {
  enumerable: true,
  get: function () {
    return _theme.DIALOGUE_LIGHT;
  }
});
exports.Dialogue = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../utiles/theme.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────────────────────

const Dialogue = ({
  title,
  message,
  icon,
  actions,
  onDismiss,
  theme = 'dark',
  colors: colorOverrides
}) => {
  const deviceScheme = (0, _reactNative.useColorScheme)();
  const colors = (0, _react.useMemo)(() => {
    const base = (0, _theme.resolveTheme)(theme, deviceScheme) === 'light' ? _theme.DIALOGUE_LIGHT : _theme.DIALOGUE_DARK;
    return colorOverrides ? {
      ...base,
      ...colorOverrides
    } : base;
  }, [theme, deviceScheme, colorOverrides]);

  // ── Animation ────────────────────────────────────────────────────────────
  const scale = (0, _react.useRef)(new _reactNative.Animated.Value(0.88)).current;
  const opacity = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const isDismissing = (0, _react.useRef)(false);
  const onDismissRef = (0, _react.useRef)(onDismiss);
  (0, _react.useEffect)(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);
  const dismiss = (0, _react.useCallback)(afterDismiss => {
    if (isDismissing.current) return;
    isDismissing.current = true;
    _reactNative.Animated.parallel([_reactNative.Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      damping: 20,
      stiffness: 280
    }), _reactNative.Animated.timing(opacity, {
      toValue: 0,
      duration: 160,
      easing: _reactNative.Easing.in(_reactNative.Easing.ease),
      useNativeDriver: true
    })]).start(() => {
      afterDismiss?.();
      onDismissRef.current?.();
    });
  }, [scale, opacity]);
  (0, _react.useEffect)(() => {
    _reactNative.Animated.parallel([_reactNative.Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 20,
      stiffness: 280
    }), _reactNative.Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      easing: _reactNative.Easing.out(_reactNative.Easing.ease),
      useNativeDriver: true
    })]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Render ───────────────────────────────────────────────────────────────
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Animated.View, {
    style: [styles.container, {
      backgroundColor: colors.background,
      borderColor: colors.border,
      opacity,
      transform: [{
        scale
      }]
    }],
    children: [icon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.icon,
      children: icon
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: [styles.title, {
        color: colors.title
      }],
      children: title
    }), message ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: [styles.message, {
        color: colors.message
      }],
      children: message
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.divider, {
        backgroundColor: colors.divider
      }]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.actions, actions.length > 2 && styles.actionsColumn],
      children: actions.map((action, i) => {
        const v = action.variant ?? 'secondary';
        const bg = colors[`${v}Bg`];
        const border = colors[`${v}Border`];
        const label = colors[`${v}Label`];
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          style: [styles.actionBtn, {
            backgroundColor: bg,
            borderColor: border
          }, actions.length <= 2 && {
            flex: 1
          }],
          onPress: () => dismiss(action.onPress),
          activeOpacity: 0.75,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: [styles.actionText, {
              color: label
            }],
            children: action.label
          })
        }, i);
      })
    })]
  });
};

// ─── Styles (layout only) ─────────────────────────────────────────────────────
exports.Dialogue = Dialogue;
const styles = _reactNative.StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    width: 320,
    gap: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 24
    },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 16
  },
  icon: {
    fontSize: 42,
    marginBottom: 4
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.1
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 4
  },
  divider: {
    height: 1,
    alignSelf: 'stretch',
    marginVertical: 4
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'stretch'
  },
  actionsColumn: {
    flexDirection: 'column'
  },
  actionBtn: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center'
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.1
  }
});
//# sourceMappingURL=dialogue.js.map