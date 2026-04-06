"use strict";

import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styled } from "../utiles/styled.js";
import { theme } from "../utiles/theme.js";
import { viewStyleVariants } from "../utiles/viewStyleVariants.js";
import { StyledText } from "../text/index.js";

// ─── Types ────────────────────────────────────────────────────────────────────
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TextInputBase = styled(TextInput, {
  base: {
    borderColor: theme.colors.gray[200],
    backgroundColor: theme.colors.gray[1],
    flex: 1,
    color: theme.colors.gray[800],
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: theme.fontSize.normal,
    minHeight: 48
  },
  variants: {
    ...viewStyleVariants,
    fontSize: selected => {
      const size = selected || theme.fontSize.normal;
      if (isNaN(Number(size))) {
        // throw new Error('Invalid fontSize value');
      }
      return {
        fontSize: Number(size)
      };
    },
    fontWeight: selected => {
      const weight = selected || theme.fontWeight.normal;
      if (isNaN(Number(weight))) {
        // throw new Error('Invalid fontWeight value');
      }
      return {
        fontWeight: weight
      };
    }
  }
});
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
  const topAnim = useRef(new Animated.Value(floated ? 0 : 1)).current;
  const prevFloated = useRef(floated);
  if (prevFloated.current !== floated) {
    prevFloated.current = floated;
    Animated.timing(topAnim, {
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
  const color = floated ? focusColor : theme.colors.gray[400];
  return /*#__PURE__*/_jsx(Animated.Text, {
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
const fl = StyleSheet.create({
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
  const bg = addon.bg ?? theme.colors.gray[100];
  const color = addon.color ?? theme.colors.gray[600];
  const isLeft = side === 'left';
  const isUnder = variant === 'underline' || variant === 'ghost';
  const content = addon.node ?? /*#__PURE__*/_jsx(Text, {
    style: {
      fontSize: sz.fontSize,
      color,
      fontWeight: '500'
    },
    children: addon.text
  });
  const Wrapper = addon.onPress ? TouchableOpacity : View;
  return /*#__PURE__*/_jsx(Wrapper, {
    onPress: addon.onPress,
    activeOpacity: addon.onPress ? 0.7 : 1,
    style: [ad.strip, {
      paddingHorizontal: sz.addonPad,
      backgroundColor: isUnder ? 'transparent' : bg,
      borderLeftWidth: isLeft ? 0 : isUnder ? 0 : StyleSheet.hairlineWidth,
      borderRightWidth: isLeft ? isUnder ? 0 : StyleSheet.hairlineWidth : 0,
      borderColor: theme.colors.gray[200],
      borderTopLeftRadius: isLeft ? 8 : 0,
      borderBottomLeftRadius: isLeft ? 8 : 0,
      borderTopRightRadius: isLeft ? 0 : 8,
      borderBottomRightRadius: isLeft ? 0 : 8
    }],
    children: content
  });
};
const ad = StyleSheet.create({
  strip: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  }
});

// ─── StyledTextInput ──────────────────────────────────────────────────────────

export const StyledTextInput = /*#__PURE__*/forwardRef(({
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
  focusColor = theme.colors.indigo?.[500] ?? '#6366f1',
  floatLabel = false,
  // Styles
  containerStyle,
  inputWrapStyle,
  inputStyle,
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
  ...rest
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [localValue, setLocalValue] = useState(defaultValue ?? '');
  const inputRef = useRef(null);
  const currentValue = value ?? localValue;
  const hasValue = currentValue.length > 0;

  // ── Imperative handle ─────────────────────────────────────────────────
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => {
      handleChange('');
    },
    isFocused: () => inputRef.current?.isFocused() ?? false
  }));
  const handleChange = useCallback(text => {
    if (value === undefined) setLocalValue(text);
    onChangeText?.(text);
  }, [value, onChangeText]);
  const handleFocus = useCallback(e => {
    setFocused(true);
    onFocusProp?.(e);
  }, [onFocusProp]);
  const handleBlur = useCallback(e => {
    setFocused(false);
    onBlurProp?.(e);
  }, [onBlurProp]);

  // ── Resolved colours ──────────────────────────────────────────────────
  const hasError = error || !!errorMessage;
  const sz = SIZE[size];
  const resolvedBorderColor = borderColorProp ?? (hasError ? theme.colors.red[500] : theme.colors.gray[200]);
  const resolvedFocusColor = hasError ? theme.colors.red[500] : focusColor;
  const wrapStyle = variantWrapStyle(variant, resolvedBorderColor, theme.colors.gray[50] ?? '#fafafa', focused, resolvedFocusColor);
  const baseRadius = variant === 'underline' || variant === 'ghost' ? 0 : 8;
  const hasLeftAddon = !!leftAddon;
  const hasRightAddon = !!rightAddon;

  // ── Right-side icons (priority: loading > clear > rightIcon) ─────────
  const resolvedRightNode = loading ? /*#__PURE__*/_jsx(ActivityIndicator, {
    size: "small",
    color: theme.colors.gray[400]
  }) : clearable && hasValue ? /*#__PURE__*/_jsx(TouchableOpacity, {
    onPress: () => handleChange(''),
    hitSlop: {
      top: 8,
      bottom: 8,
      left: 8,
      right: 8
    },
    accessibilityLabel: "Clear input",
    children: /*#__PURE__*/_jsx(View, {
      style: [ic.clearBtn, {
        width: sz.iconSize + 4,
        height: sz.iconSize + 4,
        borderRadius: (sz.iconSize + 4) / 2
      }],
      children: /*#__PURE__*/_jsx(Text, {
        style: {
          fontSize: sz.iconSize * 0.65,
          color: theme.colors.gray[400],
          fontWeight: '700'
        },
        children: "\u2715"
      })
    })
  }) : rightIcon ?? null;

  // ── Render ────────────────────────────────────────────────────────────
  return /*#__PURE__*/_jsxs(View, {
    style: [S.container, containerStyle],
    children: [label && !floatLabel ? /*#__PURE__*/_jsx(View, {
      style: S.label_row,
      children: /*#__PURE__*/_jsxs(StyledText, {
        fontSize: theme.fontSize.small,
        fontWeight: theme.fontWeight.semiBold,
        color: theme.colors.gray[700],
        marginBottom: 6,
        ...labelProps,
        children: [label, required ? /*#__PURE__*/_jsx(StyledText, {
          color: theme.colors.red[500],
          children: ' *'
        }) : null]
      })
    }) : null, /*#__PURE__*/_jsxs(View, {
      style: [S.outer_row, {
        borderRadius: baseRadius
      }],
      children: [hasLeftAddon && /*#__PURE__*/_jsx(AddonStrip, {
        addon: leftAddon,
        size: size,
        side: "left",
        variant: variant
      }), /*#__PURE__*/_jsxs(View, {
        style: [S.input_wrap, wrapStyle, {
          borderRadius: hasLeftAddon && hasRightAddon ? 0 : hasLeftAddon ? `0,0,${baseRadius},${baseRadius}` // handled below
          : hasRightAddon ? `${baseRadius},${baseRadius},0,0` : baseRadius,
          flex: 1
        },
        // Explicit radius for addons
        hasLeftAddon && !hasRightAddon && {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0
        }, !hasLeftAddon && hasRightAddon && {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        }, hasLeftAddon && hasRightAddon && {
          borderRadius: 0
        }, inputWrapStyle],
        children: [floatLabel && label ? /*#__PURE__*/_jsx(FloatLabel, {
          label: label + (required ? ' *' : ''),
          focused: focused,
          hasValue: hasValue,
          focusColor: resolvedFocusColor,
          size: size
        }) : null, leftIcon ? /*#__PURE__*/_jsx(View, {
          style: [ic.icon_slot, {
            marginLeft: 4
          }],
          children: leftIcon
        }) : null, /*#__PURE__*/_jsx(TextInputBase, {
          ref: inputRef,
          value: value,
          defaultValue: defaultValue,
          onChangeText: handleChange,
          onFocus: handleFocus,
          onBlur: handleBlur,
          placeholder: floatLabel ? undefined : placeholder,
          placeholderTextColor: theme.colors.gray[300],
          editable: editable && !loading,
          multiline: multiline,
          numberOfLines: numberOfLines,
          flex: 1,
          maxLength: maxLength,
          style: [S.input, {
            fontSize: fontSizeProp ?? sz.fontSize,
            fontWeight: fontWeightProp ?? '400',
            paddingHorizontal: leftIcon || rightIcon || clearable ? sz.paddingH - 4 : sz.paddingH,
            paddingVertical: sz.paddingV,
            minHeight: multiline ? sz.minHeight * 2 : sz.minHeight,
            opacity: editable && !loading ? 1 : 0.55,
            color: theme.colors.gray[800],
            textAlignVertical: multiline ? 'top' : 'center'
          }, inputStyle],
          ...rest
        }), resolvedRightNode ? /*#__PURE__*/_jsx(View, {
          style: [ic.icon_slot, {
            marginRight: 4
          }],
          children: resolvedRightNode
        }) : null]
      }), hasRightAddon && /*#__PURE__*/_jsx(AddonStrip, {
        addon: rightAddon,
        size: size,
        side: "right",
        variant: variant
      })]
    }), helperText || errorMessage || hasError || showCounter ? /*#__PURE__*/_jsxs(View, {
      style: S.footer_row,
      children: [hasError && errorMessage ? /*#__PURE__*/_jsx(StyledText, {
        fontSize: theme.fontSize.micro,
        color: theme.colors.red[500],
        marginTop: 4,
        flex: 1,
        ...errorProps,
        children: errorMessage
      }) : helperText ? /*#__PURE__*/_jsx(StyledText, {
        fontSize: theme.fontSize.micro,
        color: theme.colors.gray[400],
        marginTop: 4,
        flex: 1,
        ...helperProps,
        children: helperText
      }) : /*#__PURE__*/_jsx(View, {
        style: {
          flex: 1
        }
      }), showCounter && /*#__PURE__*/_jsxs(StyledText, {
        fontSize: theme.fontSize.micro,
        color: theme.colors.gray[400],
        marginTop: 4,
        children: [currentValue.length, maxLength ? ` / ${maxLength}` : '']
      })]
    }) : null]
  });
});
StyledTextInput.displayName = 'StyledTextInput';
export { StyledTextInput as StyledInput };

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = StyleSheet.create({
  container: {
    flex: 1
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
const ic = StyleSheet.create({
  icon_slot: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4
  },
  clearBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gray[100]
  }
});
//# sourceMappingURL=index.js.map