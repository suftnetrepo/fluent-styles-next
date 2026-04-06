"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popup = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _interface = require("./interface.js");
var _helpers = require("./helpers.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Close button (pure RN, no icon library) ──────────────────────────────────
const CloseButton = ({
  onPress,
  color,
  bg
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
  onPress: onPress,
  hitSlop: {
    top: 8,
    bottom: 8,
    left: 8,
    right: 8
  },
  style: [close.btn, {
    backgroundColor: bg
  }],
  accessibilityLabel: "Close",
  accessibilityRole: "button",
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
    style: [close.icon, {
      color
    }],
    children: "\u2715"
  })
});
const close = _reactNative.StyleSheet.create({
  btn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 14
  }
});

// ─── Popup ────────────────────────────────────────────────────────────────────

const PopupInner = ({
  children,
  visible,
  overlay = true,
  overlayColor,
  closeOnPressOverlay = true,
  onPressOverlay,
  position = 'bottom',
  animation: animProp,
  duration = 280,
  spring,
  round = true,
  roundRadius = 20,
  safeAreaBottom = false,
  safeAreaTop = false,
  lazyRender = true,
  destroyOnClose = false,
  title,
  subtitle,
  showHandle: showHandleProp,
  showClose = false,
  onClose,
  style,
  overlayStyle,
  headerStyle,
  titleStyle,
  subtitleStyle,
  colors: colorOverrides,
  onOpen,
  onOpened,
  onClosed,
  onRequestClose,
  testID
}) => {
  // ── Colours ────────────────────────────────────────────────────────────────
  const scheme = (0, _reactNative.useColorScheme)();
  const baseColors = scheme === 'dark' ? _interface.POPUP_COLORS_DARK : _interface.POPUP_COLORS_LIGHT;
  const colors = (0, _react.useMemo)(() => colorOverrides ? {
    ...baseColors,
    ...colorOverrides
  } : baseColors, [baseColors, colorOverrides]);

  // ── Safe area ──────────────────────────────────────────────────────────────
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();

  // ── Animation resolution ───────────────────────────────────────────────────
  const animation = (0, _helpers.resolveAnimation)(animProp, position);
  const HIDDEN = (0, _helpers.hiddenValue)(animation, position);
  const VISIBLE = (0, _helpers.visibleValue)(animation);

  // ── Render gate ────────────────────────────────────────────────────────────
  const hasEverOpened = (0, _react.useRef)(false);
  const [mounted, setMounted] = (0, _react.useState)(!lazyRender || visible);
  const [modalVisible, setModalVisible] = (0, _react.useState)(visible);

  // ── Animated values ────────────────────────────────────────────────────────
  const anim = (0, _react.useRef)(new _reactNative.Animated.Value(visible ? VISIBLE : HIDDEN)).current;
  const overlayAnim = (0, _react.useRef)(new _reactNative.Animated.Value(visible ? 1 : 0)).current;
  const isAnimating = (0, _react.useRef)(false);

  // ── Lifecycle refs ────────────────────────────────────────────────────────
  const onOpenedRef = (0, _react.useRef)(onOpened);
  const onClosedRef = (0, _react.useRef)(onClosed);
  (0, _react.useEffect)(() => {
    onOpenedRef.current = onOpened;
  }, [onOpened]);
  (0, _react.useEffect)(() => {
    onClosedRef.current = onClosed;
  }, [onClosed]);

  // ── Run animation ──────────────────────────────────────────────────────────
  const runAnimation = (0, _react.useCallback)((toVisible, onDone) => {
    isAnimating.current = true;
    const toValue = toVisible ? VISIBLE : HIDDEN;
    const makeAnim = (val, target) => {
      if (animation === 'none') {
        return _reactNative.Animated.timing(val, {
          toValue: target,
          duration: 0,
          useNativeDriver: val !== overlayAnim
        });
      }
      if (toVisible && spring) {
        return _reactNative.Animated.spring(val, {
          toValue: target,
          damping: spring.damping,
          stiffness: spring.stiffness,
          mass: spring.mass ?? 1,
          useNativeDriver: val !== overlayAnim
        });
      }
      return _reactNative.Animated.timing(val, {
        toValue: target,
        duration,
        easing: toVisible ? _reactNative.Easing.out(_reactNative.Easing.cubic) : _reactNative.Easing.in(_reactNative.Easing.cubic),
        useNativeDriver: val !== overlayAnim
      });
    };
    _reactNative.Animated.parallel([makeAnim(anim, toValue), makeAnim(overlayAnim, toVisible ? 1 : 0)]).start(({
      finished
    }) => {
      isAnimating.current = false;
      if (finished) onDone?.();
    });
  }, [anim, overlayAnim, animation, duration, spring, HIDDEN, VISIBLE]);

  // ── Sync visible prop ──────────────────────────────────────────────────────
  (0, _react.useEffect)(() => {
    if (visible) {
      if (!mounted) setMounted(true);
      hasEverOpened.current = true;
      setModalVisible(true);
      onOpen?.();
      // Give the Modal a frame to mount before animating
      requestAnimationFrame(() => {
        runAnimation(true, () => onOpenedRef.current?.());
      });
    } else {
      runAnimation(false, () => {
        setModalVisible(false);
        if (destroyOnClose) {
          setMounted(false);
          hasEverOpened.current = false;
        }
        onClosedRef.current?.();
      });
    }
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Android back button ────────────────────────────────────────────────────
  (0, _react.useEffect)(() => {
    if (!visible || _reactNative.Platform.OS !== 'android') return;
    const handler = _reactNative.BackHandler.addEventListener('hardwareBackPress', () => {
      return onRequestClose?.() ?? false;
    });
    return () => handler.remove();
  }, [visible, onRequestClose]);

  // ── Overlay press ──────────────────────────────────────────────────────────
  const handleOverlayPress = (0, _react.useCallback)(() => {
    onPressOverlay?.();
    if (closeOnPressOverlay) onClose?.();
  }, [onPressOverlay, closeOnPressOverlay, onClose]);

  // ── Handle visibility ──────────────────────────────────────────────────────
  const showHandle = _showHandle(position, showHandleProp);

  // ── Animated style for the popup surface ──────────────────────────────────
  const popupAnimatedStyle = (0, _react.useMemo)(() => (0, _helpers.animatedStyle)(animation, position, anim),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [animation, position] // anim ref is stable
  );

  // ── Border radius ──────────────────────────────────────────────────────────
  const radiusStyle = (0, _helpers.getBorderRadius)(position, round, roundRadius);

  // ── Safe area padding ──────────────────────────────────────────────────────
  const safeStyle = {
    paddingBottom: safeAreaBottom ? insets.bottom : 0,
    paddingTop: safeAreaTop ? insets.top : 0
  };

  // ── Center wrapper (for center position, centers the content) ─────────────
  const positionStyle = (0, _helpers.getPositionStyle)(position);
  if (!mounted && !modalVisible) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Modal, {
    visible: modalVisible,
    transparent: true,
    statusBarTranslucent: true,
    animationType: "none",
    onRequestClose: () => onRequestClose?.(),
    testID: testID,
    children: [overlay && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
      style: [_reactNative.StyleSheet.absoluteFill, {
        backgroundColor: overlayColor ?? colors.overlay,
        opacity: overlayAnim
      }, overlayStyle],
      pointerEvents: "box-none",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
        style: _reactNative.StyleSheet.absoluteFill,
        onPress: handleOverlayPress
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
      style: [positionStyle, popupAnimatedStyle],
      pointerEvents: "box-none",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: [S.surface, radiusStyle, safeStyle, {
          backgroundColor: colors.background
        }, style],
        children: [showHandle && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [S.handle_wrap],
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: [S.handle, {
              backgroundColor: colors.handle
            }]
          })
        }), title || subtitle || showClose ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: [S.header, {
            borderBottomColor: colors.headerBorder
          }, showHandle && S.header_no_top_pad, headerStyle],
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: S.header_text,
            children: [title ? typeof title === 'string' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: [S.header_title, {
                color: colors.headerTitle
              }, titleStyle],
              numberOfLines: 1,
              children: title
            }) : title : null, subtitle ? typeof subtitle === 'string' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: [S.header_subtitle, {
                color: colors.headerSubtitle
              }, subtitleStyle],
              numberOfLines: 1,
              children: subtitle
            }) : subtitle : null]
          }), showClose && onClose ? /*#__PURE__*/(0, _jsxRuntime.jsx)(CloseButton, {
            onPress: onClose,
            color: colors.closeIcon,
            bg: colors.closeIconBg
          }) : null]
        }) : null, mounted ? children : null]
      })
    })]
  });
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function _showHandle(position, explicit) {
  if (explicit !== undefined) return explicit;
  return position === 'bottom';
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = _reactNative.StyleSheet.create({
  surface: {
    overflow: 'hidden'
  },
  handle_wrap: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 4
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: _reactNative.StyleSheet.hairlineWidth,
    gap: 12
  },
  header_no_top_pad: {
    paddingTop: 6
  },
  header_text: {
    flex: 1,
    gap: 3
  },
  header_title: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2
  },
  header_subtitle: {
    fontSize: 13,
    fontWeight: '400'
  }
});
const Popup = exports.Popup = /*#__PURE__*/(0, _react.memo)(PopupInner);
//# sourceMappingURL=Popup.js.map