"use strict";

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, BackHandler, Dimensions, Easing, Modal, PanResponder, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DRAWER_COLORS_DARK, DRAWER_COLORS_LIGHT } from "./interface.js";

// ─── Constants ────────────────────────────────────────────────────────────────
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SCREEN_W = Dimensions.get('window').width;

// ─── Back chevron (pure RN) ───────────────────────────────────────────────────

const Chevron = ({
  side,
  color,
  size = 10
}) => /*#__PURE__*/_jsx(View, {
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
  return /*#__PURE__*/_jsx(View, {
    style: [nb.wrap, isDot && nb.dot_wrap, {
      backgroundColor: color
    }],
    children: isDot ? null : /*#__PURE__*/_jsx(Text, {
      style: nb.text,
      children: typeof value === 'number' && value > 99 ? '99+' : String(value)
    })
  });
};
const nb = StyleSheet.create({
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
  const sections = useMemo(() => {
    const map = new Map();
    for (const item of items) {
      const key = item.section ?? '';
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(item);
    }
    return Array.from(map.entries());
  }, [items]);
  return /*#__PURE__*/_jsx(View, {
    children: sections.map(([section, sItems], si) => /*#__PURE__*/_jsxs(View, {
      children: [section ? /*#__PURE__*/_jsx(Text, {
        style: [nl.section_label, {
          color: colors.navSectionLabel
        }],
        children: section.toUpperCase()
      }) : null, sItems.map((item, ii) => {
        const isLast = ii === sItems.length - 1;
        return /*#__PURE__*/_jsxs(React.Fragment, {
          children: [/*#__PURE__*/_jsxs(TouchableOpacity, {
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
            children: [item.icon ? /*#__PURE__*/_jsx(View, {
              style: nl.icon_slot,
              children: item.icon
            }) : null, /*#__PURE__*/_jsx(Text, {
              style: [nl.label, {
                color: item.active ? colors.navActiveText : item.disabled ? colors.navSectionLabel : colors.navText,
                fontWeight: item.active ? '600' : '500'
              }],
              numberOfLines: 1,
              children: item.label
            }), item.badge !== undefined ? /*#__PURE__*/_jsx(NavBadge, {
              value: item.badge,
              color: "#ef4444"
            }) : null]
          }), !isLast && /*#__PURE__*/_jsx(View, {
            style: [nl.separator, {
              backgroundColor: colors.separator
            }]
          })]
        }, item.key);
      }), si < sections.length - 1 && /*#__PURE__*/_jsx(View, {
        style: [nl.section_sep, {
          backgroundColor: colors.separator
        }]
      })]
    }, section || `s${si}`))
  });
};
const nl = StyleSheet.create({
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
    height: StyleSheet.hairlineWidth,
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
  const scheme = useColorScheme();
  const baseColors = scheme === 'dark' ? DRAWER_COLORS_DARK : DRAWER_COLORS_LIGHT;
  const colors = useMemo(() => colorOverrides ? {
    ...baseColors,
    ...colorOverrides
  } : baseColors, [baseColors, colorOverrides]);

  // ── Safe area ────────────────────────────────────────────────────────────
  const insets = useSafeAreaInsets();

  // ── Drawer pixel width ────────────────────────────────────────────────────
  const drawerW = useMemo(() => {
    if (typeof widthProp === 'number') return widthProp;
    const pct = parseFloat(widthProp) / 100;
    return Math.round(SCREEN_W * pct);
  }, [widthProp]);

  // ── Animation values ─────────────────────────────────────────────────────
  // translateX: 0 = fully visible, ±drawerW = fully hidden
  const OFF_SCREEN = side === 'left' ? -drawerW : drawerW;
  const translateX = useRef(new Animated.Value(visible ? 0 : OFF_SCREEN)).current;
  const overlayOpacity = useRef(new Animated.Value(visible ? 1 : 0)).current;

  // ── Render gate ───────────────────────────────────────────────────────────
  const hasEverOpened = useRef(false);
  const [mounted, setMounted] = useState(!lazyRender || visible);
  const [modalVisible, setModalVisible] = useState(visible);

  // ── Lifecycle refs ────────────────────────────────────────────────────────
  const onOpenedRef = useRef(onOpened);
  const onClosedRef = useRef(onClosed);
  useEffect(() => {
    onOpenedRef.current = onOpened;
  }, [onOpened]);
  useEffect(() => {
    onClosedRef.current = onClosed;
  }, [onClosed]);

  // ── Animate open / close ─────────────────────────────────────────────────
  const runAnimation = useCallback((toVisible, onDone) => {
    const makeAnim = (val, toValue) => {
      if (toVisible && spring) {
        return Animated.spring(val, {
          toValue,
          damping: spring.damping,
          stiffness: spring.stiffness,
          mass: spring.mass ?? 1,
          useNativeDriver: val === translateX
        });
      }
      return Animated.timing(val, {
        toValue,
        duration,
        easing: toVisible ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
        useNativeDriver: val === translateX
      });
    };
    Animated.parallel([makeAnim(translateX, toVisible ? 0 : OFF_SCREEN), makeAnim(overlayOpacity, toVisible ? 1 : 0)]).start(({
      finished
    }) => {
      if (finished) onDone?.();
    });
  }, [translateX, overlayOpacity, OFF_SCREEN, duration, spring]);

  // ── Sync visible ─────────────────────────────────────────────────────────
  useEffect(() => {
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
  useEffect(() => {
    if (!visible || Platform.OS !== 'android') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (onRequestClose) return onRequestClose();
      onClose?.();
      return true;
    });
    return () => sub.remove();
  }, [visible, onClose, onRequestClose]);

  // ── Overlay press ─────────────────────────────────────────────────────────
  const handleOverlayPress = useCallback(() => {
    onPressOverlay?.();
    if (closeOnPressOverlay) onClose?.();
  }, [onPressOverlay, closeOnPressOverlay, onClose]);

  // ── Pan responder (swipe-to-close) ────────────────────────────────────────
  const panStartX = useRef(0);
  const isDragging = useRef(false);
  const startTranslate = useRef(0);
  const panResponder = useMemo(() => {
    if (!swipeToClose) return null;
    return PanResponder.create({
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
  return /*#__PURE__*/_jsxs(Modal, {
    visible: modalVisible,
    transparent: true,
    statusBarTranslucent: true,
    animationType: "none",
    onRequestClose: () => onRequestClose?.() ?? false,
    testID: testID,
    children: [overlay && /*#__PURE__*/_jsx(Animated.View, {
      style: [StyleSheet.absoluteFill, {
        backgroundColor: overlayColor ?? colors.overlay,
        opacity: overlayOpacity
      }, overlayStyle],
      pointerEvents: "box-none",
      children: /*#__PURE__*/_jsx(Pressable, {
        style: StyleSheet.absoluteFill,
        onPress: handleOverlayPress
      })
    }), /*#__PURE__*/_jsxs(Animated.View, {
      style: [S.drawer, drawerPositionStyle, {
        backgroundColor: colors.background,
        transform: [{
          translateX
        }]
      }, style],
      ...(panResponder?.panHandlers ?? {}),
      children: [hasHeader && /*#__PURE__*/_jsxs(View, {
        style: [S.header, {
          backgroundColor: colors.headerBg,
          borderBottomColor: colors.headerBorder,
          paddingTop: safeAreaTop ? insets.top + 12 : 16
        }, headerStyle],
        children: [resolvedBack && onClose ? /*#__PURE__*/_jsx(TouchableOpacity, {
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
          children: /*#__PURE__*/_jsx(Chevron, {
            side: side,
            color: colors.backIcon,
            size: 10
          })
        }) : /*#__PURE__*/_jsx(View, {
          style: S.back_spacer
        }), /*#__PURE__*/_jsxs(View, {
          style: S.header_text,
          children: [title ? typeof title === 'string' ? /*#__PURE__*/_jsx(Text, {
            style: [S.header_title, {
              color: colors.headerTitle
            }, titleStyle],
            numberOfLines: 1,
            children: title
          }) : title : null, subtitle ? typeof subtitle === 'string' ? /*#__PURE__*/_jsx(Text, {
            style: [S.header_subtitle, {
              color: colors.headerSubtitle
            }, subtitleStyle],
            numberOfLines: 1,
            children: subtitle
          }) : subtitle : null]
        }), headerRight ? /*#__PURE__*/_jsx(View, {
          style: S.header_right,
          children: headerRight
        }) : /*#__PURE__*/_jsx(View, {
          style: S.back_spacer
        })]
      }), /*#__PURE__*/_jsxs(ScrollView, {
        style: S.body,
        contentContainerStyle: [S.body_content, {
          paddingBottom: safeAreaBottom ? Math.max(insets.bottom, 16) : 16
        }, bodyStyle],
        showsVerticalScrollIndicator: false,
        keyboardShouldPersistTaps: "handled",
        children: [navItems?.length ? /*#__PURE__*/_jsx(NavList, {
          items: navItems,
          colors: colors,
          close: () => onClose?.()
        }) : null, navItems?.length && children ? /*#__PURE__*/_jsx(View, {
          style: [S.separator, {
            backgroundColor: colors.separator
          }]
        }) : null, mounted ? children : null]
      }), footer ? /*#__PURE__*/_jsx(View, {
        style: [S.footer, {
          backgroundColor: colors.footerBg,
          borderTopColor: colors.footerBorder,
          paddingBottom: safeAreaBottom ? insets.bottom : 0
        }, footerStyle],
        children: footer
      }) : null, swipeToClose && /*#__PURE__*/_jsx(View, {
        style: [S.edge_handle, side === 'left' ? S.edge_handle_right : S.edge_handle_left, {
          backgroundColor: colors.edgeHandle
        }]
      })]
    })]
  });
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = StyleSheet.create({
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
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    borderTopWidth: StyleSheet.hairlineWidth,
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
export const Drawer = /*#__PURE__*/memo(DrawerInner);
//# sourceMappingURL=Drawer.js.map