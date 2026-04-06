"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "NOTIFICATION_DARK", {
  enumerable: true,
  get: function () {
    return _theme.NOTIFICATION_DARK;
  }
});
Object.defineProperty(exports, "NOTIFICATION_LIGHT", {
  enumerable: true,
  get: function () {
    return _theme.NOTIFICATION_LIGHT;
  }
});
exports.Notification = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../utiles/theme.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────────────────────

const Notification = ({
  title,
  body,
  avatar,
  initials,
  source,
  timestamp,
  actionLabel,
  onAction,
  onDismiss,
  duration = 5000,
  theme = 'dark',
  colors: colorOverrides
}) => {
  const deviceScheme = (0, _reactNative.useColorScheme)();
  const colors = (0, _react.useMemo)(() => {
    const base = (0, _theme.resolveTheme)(theme, deviceScheme) === 'light' ? _theme.NOTIFICATION_LIGHT : _theme.NOTIFICATION_DARK;
    return colorOverrides ? {
      ...base,
      ...colorOverrides
    } : base;
  }, [theme, deviceScheme, colorOverrides]);

  // ── Animation ────────────────────────────────────────────────────────────
  const translateX = (0, _react.useRef)(new _reactNative.Animated.Value(360)).current;
  const opacity = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const isDismissing = (0, _react.useRef)(false);
  const onDismissRef = (0, _react.useRef)(onDismiss);
  (0, _react.useEffect)(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);
  const dismiss = (0, _react.useCallback)(() => {
    if (isDismissing.current) return;
    isDismissing.current = true;
    _reactNative.Animated.parallel([_reactNative.Animated.timing(translateX, {
      toValue: 360,
      duration: 260,
      useNativeDriver: true
    }), _reactNative.Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    })]).start(() => onDismissRef.current?.());
  }, [translateX, opacity]);
  (0, _react.useEffect)(() => {
    _reactNative.Animated.parallel([_reactNative.Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      damping: 22,
      stiffness: 250
    }), _reactNative.Animated.timing(opacity, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true
    })]).start();
    if (duration > 0) {
      const t = setTimeout(dismiss, duration);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleAction = (0, _react.useCallback)(() => {
    onAction?.();
    dismiss();
  }, [onAction, dismiss]);

  // ── Render ───────────────────────────────────────────────────────────────
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Animated.View, {
    style: [styles.container, {
      backgroundColor: colors.background,
      borderColor: colors.border,
      opacity,
      transform: [{
        translateX
      }]
    }],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.avatarWrap,
      children: avatar ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
        source: avatar,
        style: styles.avatarImage
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.avatarFallback, {
          backgroundColor: colors.avatarBg,
          borderColor: colors.avatarBorder
        }],
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [styles.avatarInitials, {
            color: colors.avatarInitials
          }],
          children: initials ?? '?'
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.content,
      children: [source ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.source, {
          color: colors.source
        }],
        numberOfLines: 1,
        children: source
      }) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.titleRow,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [styles.title, {
            color: colors.title
          }],
          numberOfLines: 1,
          children: title
        }), timestamp ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [styles.timestamp, {
            color: colors.timestamp
          }],
          children: timestamp
        }) : null]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.body, {
          color: colors.body
        }],
        numberOfLines: 2,
        children: body
      }), actionLabel ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        onPress: handleAction,
        style: [styles.actionBtn, {
          backgroundColor: colors.actionBg,
          borderColor: colors.actionBorder
        }],
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [styles.actionLabel, {
            color: colors.actionLabel
          }],
          children: actionLabel
        })
      }) : null]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      onPress: dismiss,
      style: styles.closeBtn,
      hitSlop: {
        top: 8,
        bottom: 8,
        left: 8,
        right: 8
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.closeIcon, {
          color: colors.closeIcon
        }],
        children: "\u2715"
      })
    })]
  });
};

// ─── Styles (layout only) ─────────────────────────────────────────────────────
exports.Notification = Notification;
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 12,
    width: 340,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 10
  },
  avatarWrap: {
    paddingTop: 2
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  avatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarInitials: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5
  },
  content: {
    flex: 1,
    gap: 3
  },
  source: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase'
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    flex: 1
  },
  timestamp: {
    fontSize: 11,
    marginLeft: 8
  },
  body: {
    fontSize: 13,
    lineHeight: 18
  },
  actionBtn: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600'
  },
  closeBtn: {
    paddingTop: 2
  },
  closeIcon: {
    fontSize: 12,
    fontWeight: '600'
  }
});
//# sourceMappingURL=index.js.map