"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drawer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _interface = require("./interface.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Constants ────────────────────────────────────────────────────────────────
const SCREEN_W = _reactNative.Dimensions.get('window').width;

// ─── Back chevron (pure RN) ───────────────────────────────────────────────────

const Chevron = ({
  side,
  color,
  size = 10
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
  style: {
    width: size,
    height: size,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: color,
    transform: [{
      rotate: side === 'left' ? '45deg' : '-135deg'
    }],
    marginLeft: side === 'left' ? 4 : 0,
    marginRight: side === 'right' ? 4 : 0
  }
});

// ─── Badge ────────────────────────────────────────────────────────────────────

const NavBadge = ({
  value,
  color
}) => {
  const isDot = value === '';
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: [nb.wrap, isDot && nb.dot_wrap, {
      backgroundColor: color
    }],
    children: isDot ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: nb.text,
      children: typeof value === 'number' && value > 99 ? '99+' : String(value)
    })
  });
};
const nb = _reactNative.StyleSheet.create({
  wrap: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4
  },
  dot_wrap: {
    width: 8,
    height: 8,
    borderRadius: 4,
    minWidth: 0,
    padding: 0
  },
  text: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff'
  }
});

// ─── Nav list ─────────────────────────────────────────────────────────────────

const NavList = ({
  items,
  colors,
  close
}) => {
  // Group by section
  const sections = (0, _react.useMemo)(() => {
    const map = new Map();
    for (const item of items) {
      const key = item.section ?? '';
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(item);
    }
    return Array.from(map.entries());
  }, [items]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    children: sections.map(([section, sItems], si) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      children: [section ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [nl.section_label, {
          color: colors.navSectionLabel
        }],
        children: section.toUpperCase()
      }) : null, sItems.map((item, ii) => {
        const isLast = ii === sItems.length - 1;
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_react.default.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
            onPress: () => {
              item.onPress?.();
              close();
            },
            activeOpacity: item.disabled ? 1 : 0.65,
            disabled: item.disabled,
            accessibilityRole: "menuitem",
            accessibilityState: {
              selected: item.active,
              disabled: item.disabled
            },
            style: [nl.item, item.active && {
              backgroundColor: colors.navActiveItemBg
            }, item.disabled && nl.item_disabled],
            children: [item.icon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
              style: nl.icon_slot,
              children: item.icon
            }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: [nl.label, {
                color: item.active ? colors.navActiveText : item.disabled ? colors.navSectionLabel : colors.navText,
                fontWeight: item.active ? '600' : '500'
              }],
              numberOfLines: 1,
              children: item.label
            }), item.badge !== undefined ? /*#__PURE__*/(0, _jsxRuntime.jsx)(NavBadge, {
              value: item.badge,
              color: "#ef4444"
            }) : null]
          }), !isLast && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: [nl.separator, {
              backgroundColor: colors.separator
            }]
          })]
        }, item.key);
      }), si < sections.length - 1 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [nl.section_sep, {
          backgroundColor: colors.separator
        }]
      })]
    }, section || `s${si}`))
  });
};
const nl = _reactNative.StyleSheet.create({
  section_label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 6
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginHorizontal: 8,
    borderRadius: 10,
    gap: 12
  },
  item_disabled: {
    opacity: 0.4
  },
  icon_slot: {
    width: 24,
    alignItems: 'center'
  },
  label: {
    flex: 1,
    fontSize: 15
  },
  separator: {
    height: _reactNative.StyleSheet.hairlineWidth,
    marginHorizontal: 20
  },
  section_sep: {
    height: 8
  }
});

// ─── Drawer ───────────────────────────────────────────────────────────────────

const DrawerInner = ({
  children,
  visible,
  side = 'left',
  width: widthProp = '78%',
  overlay = true,
  overlayColor,
  closeOnPressOverlay = true,
  onPressOverlay,
  duration = 300,
  spring,
  swipeToClose = true,
  swipeEdgeWidth = 40,
  swipeThreshold = 0.4,
  title,
  subtitle,
  showBack,
  headerRight,
  onClose,
  navItems,
  footer,
  safeAreaTop = true,
  safeAreaBottom = true,
  lazyRender = true,
  destroyOnClose = false,
  style,
  headerStyle,
  titleStyle,
  subtitleStyle,
  footerStyle,
  bodyStyle,
  overlayStyle,
  colors: colorOverrides,
  onOpen,
  onOpened,
  onClose: _lifecycleClose,
  onClosed,
  onRequestClose,
  testID
}) => {
  // ── Colours ──────────────────────────────────────────────────────────────
  const scheme = (0, _reactNative.useColorScheme)();
  const baseColors = scheme === 'dark' ? _interface.DRAWER_COLORS_DARK : _interface.DRAWER_COLORS_LIGHT;
  const colors = (0, _react.useMemo)(() => colorOverrides ? {
    ...baseColors,
    ...colorOverrides
  } : baseColors, [baseColors, colorOverrides]);

  // ── Safe area ────────────────────────────────────────────────────────────
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();

  // ── Drawer pixel width ────────────────────────────────────────────────────
  const drawerW = (0, _react.useMemo)(() => {
    if (typeof widthProp === 'number') return widthProp;
    const pct = parseFloat(widthProp) / 100;
    return Math.round(SCREEN_W * pct);
  }, [widthProp]);

  // ── Animation values ─────────────────────────────────────────────────────
  // translateX: 0 = fully visible, ±drawerW = fully hidden
  const OFF_SCREEN = side === 'left' ? -drawerW : drawerW;
  const translateX = (0, _react.useRef)(new _reactNative.Animated.Value(visible ? 0 : OFF_SCREEN)).current;
  const overlayOpacity = (0, _react.useRef)(new _reactNative.Animated.Value(visible ? 1 : 0)).current;

  // ── Render gate ───────────────────────────────────────────────────────────
  const hasEverOpened = (0, _react.useRef)(false);
  const [mounted, setMounted] = (0, _react.useState)(!lazyRender || visible);
  const [modalVisible, setModalVisible] = (0, _react.useState)(visible);

  // ── Lifecycle refs ────────────────────────────────────────────────────────
  const onOpenedRef = (0, _react.useRef)(onOpened);
  const onClosedRef = (0, _react.useRef)(onClosed);
  (0, _react.useEffect)(() => {
    onOpenedRef.current = onOpened;
  }, [onOpened]);
  (0, _react.useEffect)(() => {
    onClosedRef.current = onClosed;
  }, [onClosed]);

  // ── Animate open / close ─────────────────────────────────────────────────
  const runAnimation = (0, _react.useCallback)((toVisible, onDone) => {
    const makeAnim = (val, toValue) => {
      if (toVisible && spring) {
        return _reactNative.Animated.spring(val, {
          toValue,
          damping: spring.damping,
          stiffness: spring.stiffness,
          mass: spring.mass ?? 1,
          useNativeDriver: val === translateX
        });
      }
      return _reactNative.Animated.timing(val, {
        toValue,
        duration,
        easing: toVisible ? _reactNative.Easing.out(_reactNative.Easing.cubic) : _reactNative.Easing.in(_reactNative.Easing.cubic),
        useNativeDriver: val === translateX
      });
    };
    _reactNative.Animated.parallel([makeAnim(translateX, toVisible ? 0 : OFF_SCREEN), makeAnim(overlayOpacity, toVisible ? 1 : 0)]).start(({
      finished
    }) => {
      if (finished) onDone?.();
    });
  }, [translateX, overlayOpacity, OFF_SCREEN, duration, spring]);

  // ── Sync visible ─────────────────────────────────────────────────────────
  (0, _react.useEffect)(() => {
    if (visible) {
      if (!mounted) setMounted(true);
      hasEverOpened.current = true;
      setModalVisible(true);
      onOpen?.();
      requestAnimationFrame(() => runAnimation(true, () => onOpenedRef.current?.()));
    } else {
      _lifecycleClose?.();
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

  // ── Android back button ───────────────────────────────────────────────────
  (0, _react.useEffect)(() => {
    if (!visible || _reactNative.Platform.OS !== 'android') return;
    const sub = _reactNative.BackHandler.addEventListener('hardwareBackPress', () => {
      if (onRequestClose) return onRequestClose();
      onClose?.();
      return true;
    });
    return () => sub.remove();
  }, [visible, onClose, onRequestClose]);

  // ── Overlay press ─────────────────────────────────────────────────────────
  const handleOverlayPress = (0, _react.useCallback)(() => {
    onPressOverlay?.();
    if (closeOnPressOverlay) onClose?.();
  }, [onPressOverlay, closeOnPressOverlay, onClose]);

  // ── Pan responder (swipe-to-close) ────────────────────────────────────────
  const panStartX = (0, _react.useRef)(0);
  const isDragging = (0, _react.useRef)(false);
  const startTranslate = (0, _react.useRef)(0);
  const panResponder = (0, _react.useMemo)(() => {
    if (!swipeToClose) return null;
    return _reactNative.PanResponder.create({
      // Only capture gesture if it starts near the correct edge
      onMoveShouldSetPanResponderCapture: (_, gs) => {
        const isHorizontal = Math.abs(gs.dx) > Math.abs(gs.dy) * 1.5;
        if (!isHorizontal) return false;
        // Left drawer: swipe leftward (dx < 0)
        // Right drawer: swipe rightward (dx > 0)
        const correctDirection = side === 'left' ? gs.dx < -4 : gs.dx > 4;
        return correctDirection;
      },
      onPanResponderGrant: (_, gs) => {
        panStartX.current = gs.x0;
        startTranslate.current = 0; // drawer starts fully on screen
        isDragging.current = true;
        // Stop any in-progress animation so we can take over
        translateX.stopAnimation();
        overlayOpacity.stopAnimation();
      },
      onPanResponderMove: (_, gs) => {
        // Constrain so the user can only drag toward the hidden position
        const raw = gs.dx;
        const clamped = side === 'left' ? Math.min(0, raw) // left drawer: only drag left (negative)
        : Math.max(0, raw); // right drawer: only drag right (positive)

        const fraction = Math.abs(clamped) / drawerW;
        translateX.setValue(clamped);
        overlayOpacity.setValue(1 - fraction);
      },
      onPanResponderRelease: (_, gs) => {
        isDragging.current = false;
        const traveled = Math.abs(gs.dx);
        const velocity = Math.abs(gs.vx);
        const shouldClose = traveled / drawerW > swipeThreshold || velocity > 0.5;
        if (shouldClose) {
          onClose?.();
        } else {
          // Snap back to open
          runAnimation(true);
        }
      },
      onPanResponderTerminate: () => {
        isDragging.current = false;
        runAnimation(true);
      }
    });
  }, [swipeToClose, side, drawerW, swipeThreshold, translateX, overlayOpacity, onClose, runAnimation]);

  // ── Show back button ──────────────────────────────────────────────────────
  const hasHeader = !!(title || subtitle || showBack !== false);
  const resolvedBack = showBack ?? !!onClose;
  if (!mounted && !modalVisible) return null;

  // ── Drawer position ───────────────────────────────────────────────────────
  const drawerPositionStyle = side === 'left' ? {
    left: 0,
    top: 0,
    bottom: 0,
    width: drawerW
  } : {
    right: 0,
    top: 0,
    bottom: 0,
    width: drawerW
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Modal, {
    visible: modalVisible,
    transparent: true,
    statusBarTranslucent: true,
    animationType: "none",
    onRequestClose: () => onRequestClose?.() ?? false,
    testID: testID,
    children: [overlay && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
      style: [_reactNative.StyleSheet.absoluteFill, {
        backgroundColor: overlayColor ?? colors.overlay,
        opacity: overlayOpacity
      }, overlayStyle],
      pointerEvents: "box-none",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
        style: _reactNative.StyleSheet.absoluteFill,
        onPress: handleOverlayPress
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Animated.View, {
      style: [S.drawer, drawerPositionStyle, {
        backgroundColor: colors.background,
        transform: [{
          translateX
        }]
      }, style],
      ...(panResponder?.panHandlers ?? {}),
      children: [hasHeader && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: [S.header, {
          backgroundColor: colors.headerBg,
          borderBottomColor: colors.headerBorder,
          paddingTop: safeAreaTop ? insets.top + 12 : 16
        }, headerStyle],
        children: [resolvedBack && onClose ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          onPress: onClose,
          style: S.back_btn,
          hitSlop: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
          },
          accessibilityLabel: "Close drawer",
          accessibilityRole: "button",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Chevron, {
            side: side,
            color: colors.backIcon,
            size: 10
          })
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: S.back_spacer
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
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
        }), headerRight ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: S.header_right,
          children: headerRight
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: S.back_spacer
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
        style: S.body,
        contentContainerStyle: [S.body_content, {
          paddingBottom: safeAreaBottom ? Math.max(insets.bottom, 16) : 16
        }, bodyStyle],
        showsVerticalScrollIndicator: false,
        keyboardShouldPersistTaps: "handled",
        children: [navItems?.length ? /*#__PURE__*/(0, _jsxRuntime.jsx)(NavList, {
          items: navItems,
          colors: colors,
          close: () => onClose?.()
        }) : null, navItems?.length && children ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [S.separator, {
            backgroundColor: colors.separator
          }]
        }) : null, mounted ? children : null]
      }), footer ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [S.footer, {
          backgroundColor: colors.footerBg,
          borderTopColor: colors.footerBorder,
          paddingBottom: safeAreaBottom ? insets.bottom : 0
        }, footerStyle],
        children: footer
      }) : null, swipeToClose && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [S.edge_handle, side === 'left' ? S.edge_handle_right : S.edge_handle_left, {
          backgroundColor: colors.edgeHandle
        }]
      })]
    })]
  });
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = _reactNative.StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 0
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: _reactNative.StyleSheet.hairlineWidth,
    gap: 8
  },
  back_btn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  back_spacer: {
    width: 36
  },
  header_text: {
    flex: 1,
    alignItems: 'center',
    gap: 2
  },
  header_title: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
    textAlign: 'center'
  },
  header_subtitle: {
    fontSize: 12,
    textAlign: 'center'
  },
  header_right: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    flex: 1
  },
  body_content: {
    flexGrow: 1
  },
  separator: {
    height: 8,
    marginVertical: 8
  },
  footer: {
    borderTopWidth: _reactNative.StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingTop: 12
  },
  edge_handle: {
    position: 'absolute',
    top: '40%',
    width: 4,
    height: 40,
    borderRadius: 2
  },
  edge_handle_right: {
    right: -2
  },
  edge_handle_left: {
    left: -2
  }
});
const Drawer = exports.Drawer = /*#__PURE__*/(0, _react.memo)(DrawerInner);
//# sourceMappingURL=Drawer.js.map