"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LIGHT_COLORS = exports.DARK_COLORS = exports.ActionSheet = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const SCREEN_HEIGHT = _reactNative.Dimensions.get('window').height;

// ─── Theme tokens ─────────────────────────────────────────────────────────────

/**
 * Every colour used by the sheet, overridable via the `colors` prop.
 * Pass a partial object — only the keys you want to change.
 */

// ─── Built-in palettes ────────────────────────────────────────────────────────

const DARK_COLORS = exports.DARK_COLORS = {
  background: '#1c1c1e',
  gutter: '#09090b',
  border: '#2c2c2e',
  handle: '#3f3f46',
  title: '#f4f4f5',
  message: '#71717a',
  itemLabel: '#f4f4f5',
  itemDescription: '#71717a',
  destructiveLabel: '#ef4444',
  destructiveDescription: '#f87171',
  iconBackground: '#27272a',
  chevron: '#52525b',
  separator: '#2c2c2e',
  cancelLabel: '#f4f4f5'
};
const LIGHT_COLORS = exports.LIGHT_COLORS = {
  background: '#ffffff',
  gutter: '#f2f2f7',
  border: '#e5e5ea',
  handle: '#c7c7cc',
  title: '#1c1c1e',
  message: '#8e8e93',
  itemLabel: '#1c1c1e',
  itemDescription: '#8e8e93',
  destructiveLabel: '#ff3b30',
  destructiveDescription: '#ff6b63',
  iconBackground: '#f2f2f7',
  chevron: '#c7c7cc',
  separator: '#e5e5ea',
  cancelLabel: '#007aff'
};

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────────────────────

const ActionSheet = ({
  title,
  message,
  items,
  children,
  showCancel = true,
  cancelLabel = 'Cancel',
  onCancel,
  onDismiss,
  maxHeight = SCREEN_HEIGHT * 0.7,
  theme = 'dark',
  colors: colorOverrides
}) => {
  // ── Resolve active color tokens ──────────────────────────────────────────
  const deviceScheme = (0, _reactNative.useColorScheme)();
  const colors = (0, _react.useMemo)(() => {
    const resolvedTheme = theme === 'system' ? deviceScheme === 'light' ? 'light' : 'dark' : theme;
    const base = resolvedTheme === 'light' ? LIGHT_COLORS : DARK_COLORS;
    return colorOverrides ? {
      ...base,
      ...colorOverrides
    } : base;
  }, [theme, deviceScheme, colorOverrides]);

  // ── Animation refs ───────────────────────────────────────────────────────
  const translateY = (0, _react.useRef)(new _reactNative.Animated.Value(600)).current;
  const opacity = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const isDismissing = (0, _react.useRef)(false);
  const onDismissRef = (0, _react.useRef)(onDismiss);
  (0, _react.useEffect)(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  // ── dismiss ─────────────────────────────────────────────────────────────
  const dismiss = (0, _react.useCallback)(afterDismiss => {
    if (isDismissing.current) return;
    isDismissing.current = true;
    _reactNative.Animated.parallel([_reactNative.Animated.timing(translateY, {
      toValue: 600,
      duration: 300,
      easing: _reactNative.Easing.in(_reactNative.Easing.bezier(0.4, 0, 1, 1)),
      useNativeDriver: true
    }), _reactNative.Animated.timing(opacity, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true
    })]).start(() => {
      afterDismiss?.();
      onDismissRef.current?.();
    });
  }, [translateY, opacity]);

  // ── Enter animation ──────────────────────────────────────────────────────
  (0, _react.useEffect)(() => {
    _reactNative.Animated.parallel([_reactNative.Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      damping: 26,
      stiffness: 300,
      mass: 0.9
    }), _reactNative.Animated.timing(opacity, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true
    })]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleItem = (0, _react.useCallback)(item => {
    if (item.variant === 'disabled') return;
    dismiss(item.onPress);
  }, [dismiss]);
  const handleCancel = (0, _react.useCallback)(() => {
    dismiss(onCancel);
  }, [dismiss, onCancel]);
  const hasHeader = Boolean(title || message);
  const hasItems = Boolean(items?.length);
  const hasContent = Boolean(children);

  // ── Render ───────────────────────────────────────────────────────────────
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Animated.View, {
    style: [styles.wrapper, {
      backgroundColor: colors.background,
      borderColor: colors.border,
      opacity,
      transform: [{
        translateY
      }]
    }],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.handle, {
        backgroundColor: colors.handle
      }]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
      style: {
        maxHeight
      },
      contentContainerStyle: styles.scrollContent,
      showsVerticalScrollIndicator: false,
      bounces: false,
      children: [hasHeader && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: [styles.header, {
          borderBottomColor: colors.border
        }],
        children: [title ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [styles.title, {
            color: colors.title
          }],
          children: title
        }) : null, message ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [styles.message, {
            color: colors.message
          }],
          children: message
        }) : null]
      }), hasContent && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.childrenWrap, hasItems && styles.childrenWithItems],
        children: children
      }), hasContent && hasItems && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.divider, {
          backgroundColor: colors.border
        }]
      }), hasItems && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        children: items.map((item, i) => {
          const isDestructive = item.variant === 'destructive';
          const isDisabled = item.variant === 'disabled';
          const isLast = i === items.length - 1;
          const labelColor = isDestructive ? colors.destructiveLabel : isDisabled ? colors.chevron // muted
          : colors.itemLabel;
          const descColor = isDestructive ? colors.destructiveDescription : colors.itemDescription;
          return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
              style: [styles.item, isDisabled && styles.itemDisabled],
              onPress: () => handleItem(item),
              activeOpacity: isDisabled ? 1 : 0.6,
              disabled: isDisabled,
              children: [item.icon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
                style: [styles.itemIconWrap, {
                  backgroundColor: colors.iconBackground
                }],
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: styles.itemIcon,
                  children: item.icon
                })
              }) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
                style: styles.itemText,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: [styles.itemLabel, {
                    color: labelColor
                  }],
                  children: item.label
                }), item.description ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                  style: [styles.itemDescription, {
                    color: descColor
                  }],
                  children: item.description
                }) : null]
              }), !isDestructive && !isDisabled ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: [styles.chevron, {
                  color: colors.chevron
                }],
                children: "\u203A"
              }) : null]
            }), !isLast && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: [styles.separator, {
                backgroundColor: colors.separator
              }]
            })]
          }, i);
        })
      })]
    }), showCancel && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.cancelGutter, {
          backgroundColor: colors.gutter
        }]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        style: [styles.cancelBtn, {
          backgroundColor: colors.background
        }],
        onPress: handleCancel,
        activeOpacity: 0.6,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [styles.cancelLabel, {
            color: colors.cancelLabel
          }],
          children: cancelLabel
        })
      })]
    })]
  });
};

// ─── Static styles (layout only — colours come from tokens above) ─────────────
exports.ActionSheet = ActionSheet;
const styles = _reactNative.StyleSheet.create({
  wrapper: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
    width: '100%',
    paddingBottom: 34,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -8
    },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 24
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    marginTop: 10,
    marginBottom: 6
  },
  scrollContent: {
    paddingHorizontal: 0
  },
  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    gap: 4,
    borderBottomWidth: 1
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center'
  },
  message: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18
  },
  // Children slot
  childrenWrap: {
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  childrenWithItems: {
    paddingBottom: 0
  },
  divider: {
    height: 1,
    marginVertical: 4
  },
  // Items
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 14,
    minHeight: 54
  },
  itemDisabled: {
    opacity: 0.45
  },
  itemIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemIcon: {
    fontSize: 17
  },
  itemText: {
    flex: 1,
    gap: 2
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.1
  },
  itemDescription: {
    fontSize: 13,
    lineHeight: 17
  },
  chevron: {
    fontSize: 20,
    fontWeight: '300'
  },
  separator: {
    height: 1,
    marginHorizontal: 20
  },
  // Cancel
  cancelGutter: {
    height: 8
  },
  cancelBtn: {
    paddingVertical: 17,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  cancelLabel: {
    fontSize: 17,
    fontWeight: '600'
  }
});

// ─── Re-export palettes so callers can extend them ────────────────────────────
//# sourceMappingURL=actionSheet.js.map