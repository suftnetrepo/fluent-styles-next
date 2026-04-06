"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StyledEmptyState = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _fluentStyles = require("fluent-styles");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * StyledEmptyState
 *
 * A data-empty / zero-state display with:
 * - 5 variants: default | card | minimal | illustrated | action-focused
 * - Illustration slot (emoji, icon, or custom ReactNode)
 * - Primary + secondary action buttons
 * - Animated entrance (fade + slide-up)
 * - Compact mode for inline use
 * - Full colour token overrides
 *
 * Rules:
 * - Stack / StyledText / StyledPressable / StyledCard — no bare View/Text
 * - No StyleSheet.create
 * - Colours from theme.colors / palettes
 * - Children typed as CompatNode
 */

// ─── CompatNode ───────────────────────────────────────────────────────────────

// ─── Tokens ───────────────────────────────────────────────────────────────────

const DEFAULT_COLORS = {
  background: 'transparent',
  illustrationBg: _fluentStyles.theme.colors.gray[100],
  title: _fluentStyles.theme.colors.gray[900],
  description: _fluentStyles.theme.colors.gray[400],
  primaryBg: _fluentStyles.theme.colors.gray[900],
  primaryText: _fluentStyles.palettes.white,
  primaryBorder: _fluentStyles.theme.colors.gray[900],
  secondaryBg: 'transparent',
  secondaryText: _fluentStyles.theme.colors.gray[700],
  secondaryBorder: _fluentStyles.theme.colors.gray[200],
  border: _fluentStyles.theme.colors.gray[100]
};

// ─── Action ───────────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────────────────────
const StyledEmptyState = ({
  variant = 'default',
  illustration,
  title,
  description,
  actions = [],
  compact = false,
  animated = true,
  colors: overrides,
  padding = 32,
  children
}) => {
  const c = {
    ...DEFAULT_COLORS,
    ...overrides
  };
  const fadeAnim = (0, _react.useRef)(new _reactNative.Animated.Value(animated ? 0 : 1)).current;
  const slideAnim = (0, _react.useRef)(new _reactNative.Animated.Value(animated ? 16 : 0)).current;
  (0, _react.useEffect)(() => {
    if (!animated) return;
    _reactNative.Animated.parallel([_reactNative.Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 380,
      delay: 80,
      useNativeDriver: true
    }), _reactNative.Animated.timing(slideAnim, {
      toValue: 0,
      duration: 340,
      delay: 80,
      useNativeDriver: true
    })]).start();
  }, []);

  // ── Illustration area ────────────────────────────────────────────────────
  const renderIllustration = () => {
    if (!illustration && variant !== 'illustrated') return null;
    const isEmoji = typeof illustration === 'string';
    if (variant === 'minimal') {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
        fontSize: compact ? 28 : 40,
        textAlign: "center",
        children: isEmoji ? illustration : '◌'
      });
    }
    if (variant === 'illustrated') {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
        width: compact ? 56 : 96,
        height: compact ? 56 : 96,
        borderRadius: compact ? 28 : 48,
        backgroundColor: c.illustrationBg,
        alignItems: "center",
        justifyContent: "center",
        children: isEmoji ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
          fontSize: compact ? 24 : 40,
          children: illustration
        }) : illustration ?? /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
          fontSize: 32,
          children: "\uD83D\uDCED"
        })
      });
    }

    // default / card / action
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
      width: compact ? 48 : 80,
      height: compact ? 48 : 80,
      borderRadius: compact ? 24 : 40,
      backgroundColor: c.illustrationBg,
      alignItems: "center",
      justifyContent: "center",
      children: isEmoji ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
        fontSize: compact ? 20 : 36,
        children: illustration
      }) : illustration
    });
  };

  // ── Action buttons ───────────────────────────────────────────────────────
  const renderActions = () => {
    if (actions.length === 0) return null;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
      horizontal: compact || actions.length > 1,
      gap: 10,
      marginTop: compact ? 0 : 4,
      flexWrap: "wrap",
      justifyContent: compact ? 'flex-start' : 'center',
      children: actions.map((action, idx) => {
        const isPrimary = action.variant === 'primary' || idx === 0;
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.StyledPressable, {
          onPress: action.onPress,
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          paddingHorizontal: 18,
          paddingVertical: 10,
          borderRadius: 10,
          backgroundColor: isPrimary ? c.primaryBg : c.secondaryBg,
          borderWidth: 1,
          borderColor: isPrimary ? c.primaryBorder : c.secondaryBorder,
          children: [action.icon && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
            children: action.icon
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
            fontSize: 14,
            fontWeight: "600",
            color: isPrimary ? c.primaryText : c.secondaryText,
            children: action.label
          })]
        }, action.label);
      })
    });
  };

  // ── Text block ───────────────────────────────────────────────────────────
  const renderText = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
    gap: 6,
    flex: compact ? 1 : undefined,
    alignItems: compact ? 'flex-start' : 'center',
    children: [title && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
      fontSize: compact ? 15 : 18,
      fontWeight: "700",
      color: c.title,
      textAlign: compact ? 'left' : 'center',
      children: title
    }), description && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
      fontSize: compact ? 13 : 14,
      color: c.description,
      textAlign: compact ? 'left' : 'center',
      lineHeight: 20,
      children: description
    })]
  });

  // ── Inner content ────────────────────────────────────────────────────────
  const inner = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
    style: {
      opacity: fadeAnim,
      transform: [{
        translateY: slideAnim
      }],
      width: '100%'
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
      horizontal: compact,
      alignItems: "center",
      gap: compact ? 14 : 16,
      padding: padding,
      backgroundColor: variant === 'card' ? undefined : c.background,
      children: [renderIllustration(), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
        gap: compact ? 8 : 12,
        alignItems: compact ? 'flex-start' : 'center',
        flex: compact ? 1 : undefined,
        children: [renderText(), !compact && renderActions(), children]
      }), compact && renderActions()]
    })
  });
  if (variant === 'card') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledCard, {
      shadow: "light",
      borderRadius: 16,
      backgroundColor: c.background === 'transparent' ? _fluentStyles.palettes.white : c.background,
      overflow: "hidden",
      children: inner
    });
  }
  if (variant === 'illustrated') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
      borderRadius: 16,
      borderWidth: 1,
      borderColor: c.border,
      overflow: "hidden",
      backgroundColor: c.background,
      children: inner
    });
  }
  return inner;
};
exports.StyledEmptyState = StyledEmptyState;
var _default = exports.default = StyledEmptyState;
//# sourceMappingURL=index.js.map