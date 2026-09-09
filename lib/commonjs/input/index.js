"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledTextInput = exports.StyledInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../utiles/theme.js");
var _viewStyleVariants = require("../utiles/viewStyleVariants.js");
var _index = require("../text/index.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Flat style-prop resolution ────────────────────────────────────────────────
// Replaces the generic `styled()` wrapper that used to sit around TextInput.
// Preserves its behaviour exactly: any flat ViewStyle/TextStyle prop (e.g.
// `opacity`, `padding`, `borderColor`) passed straight to StyledTextInput is
// resolved into a real style on the inner TextInput and stripped out of the
// props spread onto it — same variant maps `styled()` used, resolved locally
// instead of through the shared HOC.
const BASE_INPUT_STYLE = {
  borderColor: _theme.theme.colors.gray[200],
  backgroundColor: _theme.theme.colors.gray[1],
  flex: 1,
  color: _theme.theme.colors.gray[800],
  paddingHorizontal: 16,
  paddingVertical: 12,
  fontSize: _theme.theme.fontSize.normal,
  minHeight: 48
};
const FLAT_STYLE_VARIANTS = {
  ..._viewStyleVariants.viewStyleVariants,
  ..._viewStyleVariants.viewStyleStringVariants
};
const resolveFlatStyle = props => {
  const style = {
    ...BASE_INPUT_STYLE
  };
  const clean = {
    ...props
  };
  Object.keys(FLAT_STYLE_VARIANTS).forEach(key => {
    if (!(key in clean)) return;
    const selected = clean[key];
    delete clean[key];
    const variant = FLAT_STYLE_VARIANTS[key];
    if (typeof variant === 'function') {
      const resolved = variant(selected, props);
      if (resolved) Object.assign(style, resolved);
    } else if (variant?.[selected]) {
      const value = variant[selected];
      Object.assign(style, typeof value === 'function' ? value(selected, props) : value);
    }
  });
  return {
    style,
    clean
  };
};
// ─── Size tokens ──────────────────────────────────────────────────────────────

const SIZE = {
  sm: {
    paddingH: 10,
    paddingV: 7,
    minHeight: 36,
    fontSize: 13,
    iconSize: 14,
    addonPad: 10
  },
  md: {
    paddingH: 16,
    paddingV: 11,
    minHeight: 48,
    fontSize: 15,
    iconSize: 16,
    addonPad: 14
  },
  lg: {
    paddingH: 18,
    paddingV: 14,
    minHeight: 56,
    fontSize: 17,
    iconSize: 18,
    addonPad: 16
  }
};

// ─── Variant style builders ───────────────────────────────────────────────────

function variantWrapStyle(variant, borderColor, bg, focused, focusColor) {
  const bc = focused ? focusColor : borderColor;
  switch (variant) {
    case 'filled':
      return {
        backgroundColor: focused ? '#fff' : bg,
        borderWidth: focused ? 1.5 : 0,
        borderColor: bc
      };
    case 'underline':
      return {
        backgroundColor: 'transparent',
        borderBottomWidth: focused ? 2 : 1.5,
        borderBottomColor: bc,
        borderRadius: 0
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        borderWidth: 0
      };
    default:
      // outline
      return {
        backgroundColor: '#fff',
        borderWidth: focused ? 1.5 : 1,
        borderColor: bc
      };
  }
}

// ─── Animated floating label ──────────────────────────────────────────────────

const FloatLabel = ({
  label,
  focused,
  hasValue,
  focusColor,
  size
}) => {
  const sz = SIZE[size];
  const floated = focused || hasValue;
  const topAnim = (0, _react.useRef)(new _reactNative.Animated.Value(floated ? 0 : 1)).current;
  const prevFloated = (0, _react.useRef)(floated);
  if (prevFloated.current !== floated) {
    prevFloated.current = floated;
    _reactNative.Animated.timing(topAnim, {
      toValue: floated ? 0 : 1,
      duration: 180,
      useNativeDriver: false
    }).start();
  }
  const top = topAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-(sz.fontSize * 0.9), sz.paddingV + 1]
  });
  const fontSize = topAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [sz.fontSize * 0.78, sz.fontSize]
  });
  const color = floated ? focusColor : _theme.theme.colors.gray[400];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.Text, {
    style: [fl.label, {
      top,
      fontSize,
      color,
      backgroundColor: '#fff',
      zIndex: 1
    }],
    pointerEvents: "none",
    children: label
  });
};
const fl = _reactNative.StyleSheet.create({
  label: {
    position: 'absolute',
    left: 14,
    paddingHorizontal: 3,
    fontWeight: '500'
  }
});

// ─── Addon strip ──────────────────────────────────────────────────────────────

const AddonStrip = ({
  addon,
  size,
  side,
  variant
}) => {
  const sz = SIZE[size];
  const bg = addon.bg ?? _theme.theme.colors.gray[100];
  const color = addon.color ?? _theme.theme.colors.gray[600];
  const isLeft = side === 'left';
  const isUnder = variant === 'underline' || variant === 'ghost';
  const content = addon.node ?? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
    style: {
      fontSize: sz.fontSize,
      color,
      fontWeight: '500'
    },
    children: addon.text
  });
  const Wrapper = addon.onPress ? _reactNative.TouchableOpacity : _reactNative.View;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Wrapper, {
    onPress: addon.onPress,
    activeOpacity: addon.onPress ? 0.7 : 1,
    style: [ad.strip, {
      paddingHorizontal: sz.addonPad,
      backgroundColor: isUnder ? 'transparent' : bg,
      borderLeftWidth: isLeft ? 0 : isUnder ? 0 : _reactNative.StyleSheet.hairlineWidth,
      borderRightWidth: isLeft ? isUnder ? 0 : _reactNative.StyleSheet.hairlineWidth : 0,
      borderColor: _theme.theme.colors.gray[200],
      borderTopLeftRadius: isLeft ? 8 : 0,
      borderBottomLeftRadius: isLeft ? 8 : 0,
      borderTopRightRadius: isLeft ? 0 : 8,
      borderBottomRightRadius: isLeft ? 0 : 8
    }],
    children: content
  });
};
const ad = _reactNative.StyleSheet.create({
  strip: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  }
});

// ─── StyledTextInput ──────────────────────────────────────────────────────────

const StyledTextInput = ({
  // Label / meta
  label,
  labelProps,
  required = false,
  helperText,
  helperProps,
  errorMessage,
  errorProps,
  error = false,
  // Counter
  showCounter = false,
  // Icons
  leftIcon,
  rightIcon,
  leftAddon,
  rightAddon,
  // Clear + loading
  clearable = false,
  loading = false,
  // Appearance
  variant = 'outline',
  size = 'md',
  borderColor: borderColorProp,
  focusColor = _theme.theme.colors.indigo?.[500] ?? '#6366f1',
  floatLabel = false,
  // Styles
  containerStyle,
  inputWrapStyle,
  inputStyle,
  // Outer-container layout — opt-in only. Not defaulted, so the field
  // sizes to its content unless the consumer explicitly asks it to grow
  // (e.g. `flex={1}` inside a StyledForm.Row).
  flex,
  // Pass-through style props
  fontSize: fontSizeProp,
  fontWeight: fontWeightProp,
  // TextInput props
  value,
  defaultValue,
  onChangeText,
  placeholder,
  editable = true,
  multiline = false,
  numberOfLines,
  maxLength,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  ref,
  ...rest
}) => {
  const [focused, setFocused] = (0, _react.useState)(false);
  const [localValue, setLocalValue] = (0, _react.useState)(defaultValue ?? '');
  const inputRef = (0, _react.useRef)(null);
  const currentValue = value ?? localValue;
  const hasValue = currentValue.length > 0;

  // ── Imperative handle ─────────────────────────────────────────────────
  (0, _react.useImperativeHandle)(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => {
      handleChange('');
    },
    isFocused: () => inputRef.current?.isFocused() ?? false
  }));
  const handleChange = (0, _react.useCallback)(text => {
    if (value === undefined) setLocalValue(text);
    onChangeText?.(text);
  }, [value, onChangeText]);
  const handleFocus = (0, _react.useCallback)(e => {
    setFocused(true);
    onFocusProp?.(e);
  }, [onFocusProp]);
  const handleBlur = (0, _react.useCallback)(e => {
    setFocused(false);
    onBlurProp?.(e);
  }, [onBlurProp]);

  // ── Resolved colours ──────────────────────────────────────────────────
  const hasError = error || !!errorMessage;
  const sz = SIZE[size];
  const resolvedBorderColor = borderColorProp ?? (hasError ? _theme.theme.colors.red[500] : _theme.theme.colors.gray[200]);
  const resolvedFocusColor = hasError ? _theme.theme.colors.red[500] : focusColor;
  const wrapStyle = variantWrapStyle(variant, resolvedBorderColor, _theme.theme.colors.gray[50] ?? '#fafafa', focused, resolvedFocusColor);
  const baseRadius = variant === 'underline' || variant === 'ghost' ? 0 : 8;
  const hasLeftAddon = !!leftAddon;
  const hasRightAddon = !!rightAddon;

  // Resolves any flat ViewStyle/TextStyle prop passed straight to
  // StyledTextInput (e.g. `opacity`, `padding`) into a real style, and
  // strips those keys out of what gets spread onto the native TextInput.
  const {
    style: flatStyle,
    clean: cleanRest
  } = resolveFlatStyle(rest);

  // ── Right-side icons (priority: loading > clear > rightIcon) ─────────
  const resolvedRightNode = loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
    size: "small",
    color: _theme.theme.colors.gray[400]
  }) : clearable && hasValue ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
    onPress: () => handleChange(''),
    hitSlop: {
      top: 8,
      bottom: 8,
      left: 8,
      right: 8
    },
    accessibilityLabel: "Clear input",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [ic.clearBtn, {
        width: sz.iconSize + 4,
        height: sz.iconSize + 4,
        borderRadius: (sz.iconSize + 4) / 2
      }],
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: {
          fontSize: sz.iconSize * 0.65,
          color: _theme.theme.colors.gray[400],
          fontWeight: '700'
        },
        children: "\u2715"
      })
    })
  }) : rightIcon ?? null;

  // ── Render ────────────────────────────────────────────────────────────
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [S.container, flex !== undefined && {
      flex
    }, containerStyle],
    children: [label && !floatLabel ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: S.label_row,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.StyledText, {
        fontSize: _theme.theme.fontSize.small,
        fontWeight: _theme.theme.fontWeight.semiBold,
        color: _theme.theme.colors.gray[700],
        marginBottom: 6,
        ...labelProps,
        children: [label, required ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.StyledText, {
          color: _theme.theme.colors.red[500],
          children: ' *'
        }) : null]
      })
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [S.outer_row, {
        borderRadius: baseRadius
      }],
      children: [hasLeftAddon && /*#__PURE__*/(0, _jsxRuntime.jsx)(AddonStrip, {
        addon: leftAddon,
        size: size,
        side: "left",
        variant: variant
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: [S.input_wrap, wrapStyle, {
          flex: 1,
          // Corners flush against an addon are squared off (0); the
          // free corners keep the variant's baseRadius. Explicit
          // per-corner numbers only — no shorthand string, which
          // React Native's borderRadius does not accept.
          borderTopLeftRadius: hasLeftAddon ? 0 : baseRadius,
          borderBottomLeftRadius: hasLeftAddon ? 0 : baseRadius,
          borderTopRightRadius: hasRightAddon ? 0 : baseRadius,
          borderBottomRightRadius: hasRightAddon ? 0 : baseRadius
        }, inputWrapStyle],
        children: [floatLabel && label ? /*#__PURE__*/(0, _jsxRuntime.jsx)(FloatLabel, {
          label: label + (required ? ' *' : ''),
          focused: focused,
          hasValue: hasValue,
          focusColor: resolvedFocusColor,
          size: size
        }) : null, leftIcon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [ic.icon_slot, {
            marginLeft: 4
          }],
          children: leftIcon
        }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
          ref: inputRef,
          value: value,
          defaultValue: defaultValue,
          onChangeText: handleChange,
          onFocus: handleFocus,
          onBlur: handleBlur,
          placeholder: floatLabel ? undefined : placeholder,
          placeholderTextColor: _theme.theme.colors.gray[300],
          editable: editable && !loading,
          multiline: multiline,
          numberOfLines: numberOfLines,
          maxLength: maxLength,
          style: [flatStyle, S.input, {
            fontSize: fontSizeProp ?? sz.fontSize,
            fontWeight: fontWeightProp ?? '400',
            paddingHorizontal: leftIcon || rightIcon || clearable ? sz.paddingH - 4 : sz.paddingH,
            paddingVertical: sz.paddingV,
            minHeight: multiline ? sz.minHeight * 2 : sz.minHeight,
            opacity: editable && !loading ? 1 : 0.55,
            color: _theme.theme.colors.gray[800],
            textAlignVertical: multiline ? 'top' : 'center'
          }, inputStyle],
          ...cleanRest
        }), resolvedRightNode ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [ic.icon_slot, {
            marginRight: 4
          }],
          children: resolvedRightNode
        }) : null]
      }), hasRightAddon && /*#__PURE__*/(0, _jsxRuntime.jsx)(AddonStrip, {
        addon: rightAddon,
        size: size,
        side: "right",
        variant: variant
      })]
    }), helperText || errorMessage || hasError || showCounter ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: S.footer_row,
      children: [hasError && errorMessage ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.StyledText, {
        fontSize: _theme.theme.fontSize.micro,
        color: _theme.theme.colors.red[500],
        marginTop: 4,
        flex: 1,
        ...errorProps,
        children: errorMessage
      }) : helperText ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.StyledText, {
        fontSize: _theme.theme.fontSize.micro,
        color: _theme.theme.colors.gray[400],
        marginTop: 4,
        flex: 1,
        ...helperProps,
        children: helperText
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: {
          flex: 1
        }
      }), showCounter && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.StyledText, {
        fontSize: _theme.theme.fontSize.micro,
        color: _theme.theme.colors.gray[400],
        marginTop: 4,
        children: [currentValue.length, maxLength ? ` / ${maxLength}` : '']
      })]
    }) : null]
  });
};
exports.StyledInput = exports.StyledTextInput = StyledTextInput;
StyledTextInput.displayName = 'StyledTextInput';
// ─── Styles ───────────────────────────────────────────────────────────────────

const S = _reactNative.StyleSheet.create({
  container: {
    // No default flex — the field sizes to its content. Pass `flex={1}`
    // (e.g. inside a StyledForm.Row) to opt into filling available space;
    // forcing it unconditionally previously caused the field to collapse
    // to zero height under non-flexed parents.
  },
  label_row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  outer_row: {
    flexDirection: 'row',
    overflow: 'hidden'
  },
  input_wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
  },
  input: {
    flex: 1,
    includeFontPadding: false
  },
  footer_row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8
  }
});
const ic = _reactNative.StyleSheet.create({
  icon_slot: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4
  },
  clearBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: _theme.theme.colors.gray[100]
  }
});
//# sourceMappingURL=index.js.map