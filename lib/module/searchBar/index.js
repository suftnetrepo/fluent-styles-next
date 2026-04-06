"use strict";

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

import React, { useRef, useState, useCallback } from 'react';
import { Animated, TextInput, Keyboard } from 'react-native';
import { Stack, StyledText, StyledPressable, theme, palettes } from 'fluent-styles';

// ─── CompatNode ──────────────────────────────────────────────────────────────

// ─── Tokens ──────────────────────────────────────────────────────────────────
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_COLORS = {
  background: theme.colors.gray[100],
  border: theme.colors.gray[200],
  focusBorder: theme.colors.gray[900],
  placeholder: theme.colors.gray[400],
  text: theme.colors.gray[900],
  icon: theme.colors.gray[400],
  clearBg: theme.colors.gray[300],
  clearIcon: theme.colors.gray[600],
  cancelText: theme.colors.gray[900],
  suggestionBg: palettes.white,
  suggestionText: theme.colors.gray[800],
  suggestionBorder: theme.colors.gray[100],
  divider: theme.colors.gray[100]
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
export const StyledSearchBar = ({
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
  const [focused, setFocused] = useState(false);
  const [internalVal, setInternalVal] = useState('');
  const inputRef = useRef(null);
  const focusAnim = useRef(new Animated.Value(0)).current;
  const currentValue = value !== undefined ? value : internalVal;

  // focus animation
  const animateFocus = useCallback(toValue => {
    Animated.timing(focusAnim, {
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
    Keyboard.dismiss();
    onCancel?.();
  };
  const handleSubmit = () => {
    onSubmit?.(currentValue);
    Keyboard.dismiss();
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
          bg: palettes.white,
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
          bg: palettes.white,
          borderWidth: 0,
          borderColor: 'transparent',
          shadow: true
        };
      case 'filled':
      default:
        return {
          bg: focused ? palettes.white : c.background,
          borderWidth: 1.5,
          borderColor: focused ? c.focusBorder : 'transparent'
        };
    }
  };
  const vs = variantStyle();

  // ── Default search icon ───────────────────────────────────────────────────
  const defaultLeftIcon = /*#__PURE__*/_jsx(StyledText, {
    fontSize: s.iconSize,
    color: focused ? c.focusBorder : c.icon,
    children: "\uD83D\uDD0D"
  });
  const showSuggestions = focused && suggestions.length > 0;
  return /*#__PURE__*/_jsxs(Stack, {
    gap: 0,
    children: [/*#__PURE__*/_jsxs(Stack, {
      horizontal: true,
      alignItems: "center",
      gap: 10,
      children: [/*#__PURE__*/_jsx(Stack, {
        flex: 1,
        children: /*#__PURE__*/_jsxs(Animated.View, {
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
          children: [/*#__PURE__*/_jsx(Stack, {
            alignItems: "center",
            justifyContent: "center",
            children: leftIcon ?? defaultLeftIcon
          }), /*#__PURE__*/_jsx(TextInput, {
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
          }), loading && /*#__PURE__*/_jsx(Stack, {
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            children: /*#__PURE__*/_jsx(StyledText, {
              fontSize: 12,
              color: c.icon,
              children: "\xB7\xB7\xB7"
            })
          }), !loading && currentValue.length > 0 && /*#__PURE__*/_jsx(StyledPressable, {
            onPress: handleClear,
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: c.clearBg,
            alignItems: "center",
            justifyContent: "center",
            children: /*#__PURE__*/_jsx(StyledText, {
              fontSize: 10,
              color: c.clearIcon,
              fontWeight: "700",
              children: "\u2715"
            })
          }), !loading && currentValue.length === 0 && rightAction && /*#__PURE__*/_jsx(Stack, {
            alignItems: "center",
            justifyContent: "center",
            children: rightAction
          })]
        })
      }), showCancel && (focused || currentValue.length > 0) && /*#__PURE__*/_jsx(StyledPressable, {
        onPress: handleCancel,
        paddingVertical: 6,
        paddingHorizontal: 4,
        children: /*#__PURE__*/_jsx(StyledText, {
          fontSize: s.fontSize,
          color: c.cancelText,
          fontWeight: "600",
          children: cancelLabel
        })
      })]
    }), showSuggestions && /*#__PURE__*/_jsx(Stack, {
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
      children: suggestions.map((item, idx) => /*#__PURE__*/_jsxs(Stack, {
        children: [/*#__PURE__*/_jsxs(StyledPressable, {
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
          children: [item.icon && /*#__PURE__*/_jsx(Stack, {
            width: 24,
            alignItems: "center",
            children: item.icon
          }), /*#__PURE__*/_jsxs(Stack, {
            flex: 1,
            gap: 1,
            children: [/*#__PURE__*/_jsx(StyledText, {
              fontSize: s.fontSize - 1,
              fontWeight: "600",
              color: c.suggestionText,
              children: item.label
            }), item.subtitle && /*#__PURE__*/_jsx(StyledText, {
              fontSize: s.fontSize - 3,
              color: c.placeholder,
              children: item.subtitle
            })]
          }), /*#__PURE__*/_jsx(StyledText, {
            fontSize: 11,
            color: c.icon,
            children: "\u2197"
          })]
        }), idx < suggestions.length - 1 && /*#__PURE__*/_jsx(Stack, {
          height: 1,
          backgroundColor: c.divider,
          marginHorizontal: s.px
        })]
      }, item.id))
    })]
  });
};
export default StyledSearchBar;
//# sourceMappingURL=index.js.map