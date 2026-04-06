"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StyledSearchBar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _fluentStyles = require("fluent-styles");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * StyledSearchBar
 *
 * A polished animated search input with:
 * - 4 variants: outline | filled | ghost | floating
 * - 3 sizes: sm | md | lg
 * - Animated focus ring & clear button
 * - Optional left icon / right action slot
 * - Suggestion list with keyboard-aware dismiss
 * - Cancel button (mobile pattern)
 * - Voice / filter button slots
 * - Full colour token overrides
 *
 * Rules:
 * - Uses Stack, StyledText, StyledPressable — no bare View/Text
 * - No StyleSheet.create — flat style props only
 * - All colours from theme.colors / palettes
 * - Children typed as CompatNode
 */

// ─── CompatNode ──────────────────────────────────────────────────────────────

// ─── Tokens ──────────────────────────────────────────────────────────────────

const DEFAULT_COLORS = {
  background: _fluentStyles.theme.colors.gray[100],
  border: _fluentStyles.theme.colors.gray[200],
  focusBorder: _fluentStyles.theme.colors.gray[900],
  placeholder: _fluentStyles.theme.colors.gray[400],
  text: _fluentStyles.theme.colors.gray[900],
  icon: _fluentStyles.theme.colors.gray[400],
  clearBg: _fluentStyles.theme.colors.gray[300],
  clearIcon: _fluentStyles.theme.colors.gray[600],
  cancelText: _fluentStyles.theme.colors.gray[900],
  suggestionBg: _fluentStyles.palettes.white,
  suggestionText: _fluentStyles.theme.colors.gray[800],
  suggestionBorder: _fluentStyles.theme.colors.gray[100],
  divider: _fluentStyles.theme.colors.gray[100]
};

// ─── Size presets ─────────────────────────────────────────────────────────────
const SIZE = {
  sm: {
    height: 36,
    fontSize: 13,
    iconSize: 14,
    borderRadius: 10,
    px: 10
  },
  md: {
    height: 44,
    fontSize: 15,
    iconSize: 16,
    borderRadius: 12,
    px: 14
  },
  lg: {
    height: 52,
    fontSize: 17,
    iconSize: 18,
    borderRadius: 14,
    px: 16
  }
};

// ─── Suggestion item ──────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────────────────────
const StyledSearchBar = ({
  variant = 'filled',
  size = 'md',
  placeholder = 'Search…',
  value,
  onChangeText,
  onSubmit,
  onCancel,
  onClear,
  showCancel = false,
  cancelLabel = 'Cancel',
  leftIcon,
  rightAction,
  suggestions = [],
  onSuggestionPress,
  loading = false,
  disabled = false,
  autoFocus = false,
  colors: colorOverrides,
  borderRadius: radiusOverride,
  ...rest
}) => {
  const c = {
    ...DEFAULT_COLORS,
    ...colorOverrides
  };
  const s = SIZE[size];
  const br = radiusOverride ?? s.borderRadius;
  const [focused, setFocused] = (0, _react.useState)(false);
  const [internalVal, setInternalVal] = (0, _react.useState)('');
  const inputRef = (0, _react.useRef)(null);
  const focusAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const currentValue = value !== undefined ? value : internalVal;

  // focus animation
  const animateFocus = (0, _react.useCallback)(toValue => {
    _reactNative.Animated.timing(focusAnim, {
      toValue,
      duration: 180,
      useNativeDriver: false
    }).start();
  }, [focusAnim]);
  const handleFocus = () => {
    setFocused(true);
    animateFocus(1);
  };
  const handleBlur = () => {
    setFocused(false);
    animateFocus(0);
  };
  const handleChange = text => {
    if (value === undefined) setInternalVal(text);
    onChangeText?.(text);
  };
  const handleClear = () => {
    if (value === undefined) setInternalVal('');
    onChangeText?.('');
    onClear?.();
    inputRef.current?.focus();
  };
  const handleCancel = () => {
    if (value === undefined) setInternalVal('');
    onChangeText?.('');
    _reactNative.Keyboard.dismiss();
    onCancel?.();
  };
  const handleSubmit = () => {
    onSubmit?.(currentValue);
    _reactNative.Keyboard.dismiss();
  };

  // ── Border colour interpolation ───────────────────────────────────────────
  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [c.border, c.focusBorder]
  });

  // ── Variant styles ────────────────────────────────────────────────────────
  const variantStyle = () => {
    switch (variant) {
      case 'outline':
        return {
          bg: _fluentStyles.palettes.white,
          borderWidth: 1.5,
          borderColor
        };
      case 'ghost':
        return {
          bg: 'transparent',
          borderWidth: 0,
          borderColor: 'transparent'
        };
      case 'floating':
        return {
          bg: _fluentStyles.palettes.white,
          borderWidth: 0,
          borderColor: 'transparent',
          shadow: true
        };
      case 'filled':
      default:
        return {
          bg: focused ? _fluentStyles.palettes.white : c.background,
          borderWidth: 1.5,
          borderColor: focused ? c.focusBorder : 'transparent'
        };
    }
  };
  const vs = variantStyle();

  // ── Default search icon ───────────────────────────────────────────────────
  const defaultLeftIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
    fontSize: s.iconSize,
    color: focused ? c.focusBorder : c.icon,
    children: "\uD83D\uDD0D"
  });
  const showSuggestions = focused && suggestions.length > 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
    gap: 0,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
      horizontal: true,
      alignItems: "center",
      gap: 10,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
        flex: 1,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Animated.View, {
          style: {
            flexDirection: 'row',
            alignItems: 'center',
            height: s.height,
            borderRadius: br,
            backgroundColor: vs.bg,
            borderWidth: vs.borderWidth,
            borderColor: vs.borderColor,
            paddingHorizontal: s.px,
            gap: 8,
            opacity: disabled ? 0.5 : 1,
            ...(vs.shadow ? {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 3
            } : {})
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
            alignItems: "center",
            justifyContent: "center",
            children: leftIcon ?? defaultLeftIcon
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
            ref: inputRef,
            value: currentValue,
            onChangeText: handleChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onSubmitEditing: handleSubmit,
            placeholder: placeholder,
            placeholderTextColor: c.placeholder,
            returnKeyType: "search",
            autoFocus: autoFocus,
            editable: !disabled,
            style: {
              flex: 1,
              fontSize: s.fontSize,
              color: c.text,
              padding: 0,
              margin: 0
            },
            ...rest
          }), loading && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
              fontSize: 12,
              color: c.icon,
              children: "\xB7\xB7\xB7"
            })
          }), !loading && currentValue.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledPressable, {
            onPress: handleClear,
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: c.clearBg,
            alignItems: "center",
            justifyContent: "center",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
              fontSize: 10,
              color: c.clearIcon,
              fontWeight: "700",
              children: "\u2715"
            })
          }), !loading && currentValue.length === 0 && rightAction && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
            alignItems: "center",
            justifyContent: "center",
            children: rightAction
          })]
        })
      }), showCancel && (focused || currentValue.length > 0) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledPressable, {
        onPress: handleCancel,
        paddingVertical: 6,
        paddingHorizontal: 4,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
          fontSize: s.fontSize,
          color: c.cancelText,
          fontWeight: "600",
          children: cancelLabel
        })
      })]
    }), showSuggestions && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
      marginTop: 6,
      borderRadius: br,
      backgroundColor: c.suggestionBg,
      borderWidth: 1,
      borderColor: c.suggestionBorder,
      overflow: "hidden",
      style: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.10,
        shadowRadius: 12,
        elevation: 5
      },
      children: suggestions.map((item, idx) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.StyledPressable, {
          onPress: () => {
            onSuggestionPress?.(item);
            if (value === undefined) setInternalVal(item.label);
            onChangeText?.(item.label);
          },
          paddingHorizontal: s.px,
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          children: [item.icon && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
            width: 24,
            alignItems: "center",
            children: item.icon
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
            flex: 1,
            gap: 1,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
              fontSize: s.fontSize - 1,
              fontWeight: "600",
              color: c.suggestionText,
              children: item.label
            }), item.subtitle && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
              fontSize: s.fontSize - 3,
              color: c.placeholder,
              children: item.subtitle
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
            fontSize: 11,
            color: c.icon,
            children: "\u2197"
          })]
        }), idx < suggestions.length - 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
          height: 1,
          backgroundColor: c.divider,
          marginHorizontal: s.px
        })]
      }, item.id))
    })]
  });
};
exports.StyledSearchBar = StyledSearchBar;
var _default = exports.default = StyledSearchBar;
//# sourceMappingURL=index.js.map