"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.variantConfig = exports.sizeConfig = exports.default = exports.StyledSpinner = exports.SpinnerContainer = exports.InlineSpinner = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../utiles/theme.js");
var _styled = require("../utiles/styled.js");
var _index = require("../stack/index.js");
var _index2 = require("../text/index.js");
var _index3 = require("../button/index.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * Props for Spinner component
 */

/**
 * Size configuration for Spinner
 */
const sizeConfig = exports.sizeConfig = {
  small: 30,
  medium: 50,
  large: 80
};

/**
 * Variant configuration for Spinner
 */
const variantConfig = exports.variantConfig = {
  default: {
    color: _theme.theme.colors.gray[400],
    label: 'default'
  },
  primary: {
    color: _theme.theme.colors.blue[500],
    label: 'primary'
  },
  success: {
    color: _theme.theme.colors.green[500],
    label: 'success'
  },
  warning: {
    color: _theme.theme.colors.amber[500],
    label: 'warning'
  },
  danger: {
    color: _theme.theme.colors.red[500],
    label: 'danger'
  }
};

/**
 * Base styled ActivityIndicator
 */
const StyledActivityIndicator = (0, _styled.styled)(_reactNative.ActivityIndicator, {
  base: {
    color: _theme.theme.colors.gray[400]
  }
});

/**
 * Spinner: Professional loading indicator component
 *
 * Features:
 * - Multiple size options (small, medium, large, custom)
 * - 5 color variants (default, primary, success, warning, danger)
 * - Custom color support
 * - Overlay mode for full-screen loading
 * - Optional label text
 * - Theme integration
 * - Accessibility support
 */
const StyledSpinner = exports.StyledSpinner = /*#__PURE__*/(0, _react.forwardRef)(({
  size = 'medium',
  variant = 'primary',
  color,
  overlay = false,
  overlayColor = 'rgba(0, 0, 0, 0.3)',
  label,
  labelColor,
  labelSize = 14,
  accessibilityLabel = 'Loading',
  ...rest
}, ref) => {
  // Determine size
  const finalSize = typeof size === 'number' ? size : sizeConfig[size];

  // Determine color
  const variantConfig_value = variantConfig[variant];
  const finalColor = color || variantConfig_value.color;
  const spinnerElement = /*#__PURE__*/(0, _jsxRuntime.jsx)(StyledActivityIndicator, {
    ref: ref,
    size: finalSize,
    color: finalColor,
    accessibilityLabel: accessibilityLabel,
    accessible: true,
    ...rest
  });

  // If no overlay, return basic spinner
  if (!overlay) {
    if (!label) {
      return spinnerElement;
    }

    // Spinner with label
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.YStack, {
      alignItems: "center",
      gap: 12,
      children: [spinnerElement, label && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
        fontSize: labelSize,
        color: labelColor || _theme.theme.colors.gray[600],
        numberOfLines: 1,
        children: label
      })]
    });
  }

  // Overlay mode
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.YStack, {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.YStack, {
      alignItems: "center",
      gap: 12,
      children: [spinnerElement, label && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
        fontSize: labelSize,
        color: labelColor || _theme.theme.colors.white[500],
        numberOfLines: 1,
        children: label
      })]
    })
  });
});
StyledSpinner.displayName = 'StyledSpinner';

/**
 * Props for SpinnerContainer - Full-screen loading overlay with backdrop
 */

/**
 * SpinnerContainer: Full-screen loading container with backdrop
 *
 * Use for: Page loading, data fetching, async operations
 */
const SpinnerContainer = exports.SpinnerContainer = /*#__PURE__*/(0, _react.forwardRef)(({
  isVisible = true,
  size = 'large',
  variant = 'primary',
  color,
  backdropColor = 'rgba(0, 0, 0, 0.5)',
  message,
  labelColor,
  labelSize = 14,
  onBackdropPress,
  ...rest
}, ref) => {
  if (!isVisible) return null;

  // Determine size
  const finalSize = typeof size === 'number' ? size : sizeConfig[size];

  // Determine color
  const variantConfig_value = variantConfig[variant];
  const finalColor = color || variantConfig_value.color;
  const spinnerContent = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.YStack, {
    alignItems: "center",
    gap: 20,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(StyledActivityIndicator, {
      ref: ref,
      size: finalSize,
      color: finalColor,
      accessible: true,
      accessibilityLabel: "Loading",
      ...rest
    }), message && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
      fontSize: labelSize,
      color: labelColor || _theme.theme.colors.white[500],
      numberOfLines: 2,
      textAlign: "center",
      children: message
    })]
  });
  if (!onBackdropPress) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.YStack, {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: backdropColor,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      children: spinnerContent
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.StyledButton, {
    link: true,
    onPress: onBackdropPress,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: backdropColor,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    borderRadius: 0,
    borderWidth: 0,
    children: spinnerContent
  });
});
SpinnerContainer.displayName = 'SpinnerContainer';

/**
 * Props for InlineSpinner - Spinner with text in a row
 */

/**
 * InlineSpinner: Spinner with text in flexible direction
 *
 * Use for: Button loading states, inline operations, compact loading indicators
 */
const InlineSpinner = exports.InlineSpinner = /*#__PURE__*/(0, _react.forwardRef)(({
  size = 'small',
  variant = 'primary',
  color,
  text,
  labelColor,
  labelSize = 12,
  direction = 'row',
  gap = 8,
  accessibilityLabel = 'Loading',
  ...rest
}, ref) => {
  // Determine size
  const finalSize = typeof size === 'number' ? size : sizeConfig[size];

  // Determine color
  const variantConfig_value = variantConfig[variant];
  const finalColor = color || variantConfig_value.color;
  const StackComponent = direction === 'row' ? _index.XStack : _index.YStack;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(StackComponent, {
    gap: gap,
    alignItems: "center",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(StyledActivityIndicator, {
      ref: ref,
      size: finalSize,
      color: finalColor,
      accessible: true,
      accessibilityLabel: accessibilityLabel,
      ...rest
    }), text && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledText, {
      fontSize: labelSize,
      color: labelColor || _theme.theme.colors.gray[600],
      numberOfLines: 1,
      children: text
    })]
  });
});
InlineSpinner.displayName = 'InlineSpinner';

/**
 * Exports
 */
var _default = exports.default = StyledSpinner;
//# sourceMappingURL=index.js.map