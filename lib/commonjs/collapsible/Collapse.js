"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collapse = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../utiles/theme.js");
var _interface = require("./interface.js");
var _style = require("./style.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Chevron ──────────────────────────────────────────────────────────────────

/**
 * Single Animated.View that rotates 0 → 180 deg.
 * Driven by the same Animated.Value as the body height so they stay in sync.
 */
const AnimatedChevron = ({
  rotate,
  color,
  size,
  style
}) => {
  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
    style: [_style.S.icon_wrap, style, {
      transform: [{
        rotate: spin
      }]
    }],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: {
        width: size * 0.55,
        height: size * 0.55,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: color,
        transform: [{
          rotate: '45deg'
        }, {
          translateY: -size * 0.12
        }]
      }
    })
  });
};

// ─── Root style helper ────────────────────────────────────────────────────────

function getRootStyle(variant, square, colors) {
  switch (variant) {
    case 'card':
      return [_style.S.root_card, square && _style.S.root_card_square, {
        backgroundColor: colors.background,
        borderColor: colors.border,
        shadowColor: colors.shadow,
        shadowOpacity: 0.08
      }];
    case 'bordered':
      return [_style.S.root_bordered, {
        backgroundColor: colors.background,
        borderColor: colors.border
      }];
    case 'ghost':
      return [_style.S.root_ghost];
    default:
      // 'cell'
      return [_style.S.root_cell, {
        backgroundColor: colors.background
      }];
  }
}

// ─── Collapse ─────────────────────────────────────────────────────────────────

const Collapse = ({
  children,
  // Header
  title,
  subtitle,
  leading,
  trailing,
  headerStyle,
  titleStyle,
  subtitleStyle,
  iconStyle,
  iconColor,
  iconSize = 16,
  hideIcon = false,
  bodyStyle,
  // Renderers
  renderHeader,
  renderHeaderRight,
  renderBody,
  // State
  collapse,
  defaultCollapse,
  onCollapse,
  onAnimationEnd,
  // Appearance
  variant = 'cell',
  size = 'md',
  bodyPadding = true,
  headerDivider,
  bodyDivider,
  square = false,
  activeHeader = false,
  disabled = false,
  // Behaviour
  lazyRender = true,
  destroyOnClose = false,
  // Theming
  duration = 260,
  colors: colorOverrides,
  style,
  testID
}) => {
  // ── Colour resolution ─────────────────────────────────────────────────────
  const deviceScheme = (0, _reactNative.useColorScheme)();
  // Default theme inferred from device; callers can override via `colors`
  const baseColors = (0, _theme.resolveTheme)('system', deviceScheme) === 'light' ? _interface.COLLAPSE_LIGHT : _interface.COLLAPSE_DARK;
  const colors = (0, _react.useMemo)(() => colorOverrides ? {
    ...baseColors,
    ...colorOverrides
  } : baseColors, [baseColors, colorOverrides]);

  // ── Default dividers per variant ──────────────────────────────────────────
  const showHeaderDivider = headerDivider ?? (variant === 'cell' || variant === 'bordered');
  const showBodyDivider = bodyDivider ?? false;

  // ── Internal open state ───────────────────────────────────────────────────
  // Supports both controlled (`collapse` prop) and uncontrolled (`defaultCollapse`).
  const isControlled = collapse !== undefined;
  const [localOpen, setLocalOpen] = (0, _react.useState)(defaultCollapse ?? false);
  const open = isControlled ? collapse : localOpen;

  // Keep a ref so animation callbacks always read the latest value
  const openRef = (0, _react.useRef)(open);
  openRef.current = open;
  const toggle = (0, _react.useCallback)(() => {
    if (disabled) return;
    const next = !openRef.current;
    if (!isControlled) setLocalOpen(next);
    onCollapse?.(next);
  }, [disabled, isControlled, onCollapse]);

  // ── Lazy / destroy render gate ────────────────────────────────────────────
  const hasEverOpened = (0, _react.useRef)(open);
  if (open) hasEverOpened.current = true;
  const bodyChildren = (0, _react.useMemo)(() => {
    if (destroyOnClose && !open) return null;
    if (lazyRender && !hasEverOpened.current) return null;
    return renderBody ? renderBody() : children;
  }, [destroyOnClose, lazyRender, open, renderBody, children]);

  // ── Animation ─────────────────────────────────────────────────────────────
  const bodyHeight = (0, _react.useRef)(0);
  const heightAnim = (0, _react.useRef)(new _reactNative.Animated.Value(open ? 9999 : 0)).current; // 9999 overridden on first layout
  const chevronAnim = (0, _react.useRef)(new _reactNative.Animated.Value(open ? 1 : 0)).current;
  const animRef = (0, _react.useRef)(null);
  const runAnimation = (0, _react.useCallback)((toOpen, immediate) => {
    animRef.current?.stop();
    const targetH = toOpen ? bodyHeight.current : 0;
    const dur = immediate ? 0 : duration;
    animRef.current = _reactNative.Animated.parallel([_reactNative.Animated.timing(heightAnim, {
      toValue: targetH,
      duration: dur,
      easing: toOpen ? _reactNative.Easing.out(_reactNative.Easing.cubic) : _reactNative.Easing.in(_reactNative.Easing.cubic),
      useNativeDriver: false
    }), _reactNative.Animated.timing(chevronAnim, {
      toValue: toOpen ? 1 : 0,
      duration: dur,
      easing: toOpen ? _reactNative.Easing.out(_reactNative.Easing.cubic) : _reactNative.Easing.in(_reactNative.Easing.cubic),
      useNativeDriver: true
    })]);
    animRef.current.start(({
      finished
    }) => {
      if (finished) onAnimationEnd?.(toOpen);
    });
  }, [heightAnim, chevronAnim, duration, onAnimationEnd]);

  // ── Sync `open` → animation ───────────────────────────────────────────────
  const isFirstRender = (0, _react.useRef)(true);
  (0, _react.useEffect)(() => {
    if (isFirstRender.current) {
      // On mount: jump to final state without animating
      if (open && bodyHeight.current > 0) runAnimation(open, true);
      isFirstRender.current = false;
      return;
    }
    runAnimation(open);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Body layout — real height fed back into animation ─────────────────────
  const handleBodyLayout = (0, _react.useCallback)(e => {
    const h = e.nativeEvent.layout.height;
    if (h === bodyHeight.current) return;
    bodyHeight.current = h;
    // If currently open, jump to the new measured height immediately
    if (openRef.current) runAnimation(true, true);
  }, [runAnimation]);

  // ── Chevron ───────────────────────────────────────────────────────────────
  const resolvedIconColor = iconColor ?? colors.iconColor;
  const chevronNode = hideIcon ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(AnimatedChevron, {
    rotate: chevronAnim,
    color: resolvedIconColor,
    size: iconSize,
    style: iconStyle
  });
  const headerRightNode = renderHeaderRight ? renderHeaderRight(open, chevronNode) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [trailing ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: _style.S.trailing,
      children: trailing
    }) : null, chevronNode]
  });

  // ── Header ────────────────────────────────────────────────────────────────
  const hPad = (0, _style.headerPadStyle)(size);
  const headerContent = renderHeader ? renderHeader(open) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [_style.S.header, hPad, open && activeHeader && {
      backgroundColor: colors.activeHeaderBg
    }, disabled && {
      opacity: 0.4
    }, headerStyle],
    children: [leading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: _style.S.leading,
      children: leading
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: _style.S.title_block,
      children: [typeof title === 'string' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [_style.S.title_base, (0, _style.titleTextStyle)(size, colors.titleColor), titleStyle],
        numberOfLines: 1,
        children: title
      }) : title ?? null, subtitle ? typeof subtitle === 'string' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [_style.S.subtitle_base, (0, _style.subtitleTextStyle)(size, colors.subtitleColor), subtitleStyle],
        numberOfLines: 1,
        children: subtitle
      }) : subtitle : null]
    }), headerRightNode]
  });

  // ── Body ──────────────────────────────────────────────────────────────────
  const bPad = (0, _style.bodyPadStyle)(size);
  const bodyNode = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
    style: [_style.S.body_animated, {
      height: heightAnim
    }],
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      collapsable: false,
      style: _style.S.body_inner,
      onLayout: handleBodyLayout,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [bodyPadding ? bPad : undefined, bodyStyle],
        children: bodyChildren
      }), showBodyDivider && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [_style.S.body_divider, {
          backgroundColor: colors.divider,
          marginHorizontal: hPad.paddingHorizontal
        }]
      })]
    })
  });

  // ── Root ──────────────────────────────────────────────────────────────────
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [getRootStyle(variant, square, colors), style],
    testID: testID,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      onPress: toggle,
      activeOpacity: disabled ? 1 : 0.7,
      accessibilityRole: "button",
      accessibilityState: {
        expanded: open,
        disabled
      },
      accessibilityLabel: typeof title === 'string' ? title : undefined,
      children: headerContent
    }), showHeaderDivider && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [_style.S.divider, {
        backgroundColor: colors.divider
      }]
    }), bodyNode]
  });
};
exports.Collapse = Collapse;
//# sourceMappingURL=Collapse.js.map