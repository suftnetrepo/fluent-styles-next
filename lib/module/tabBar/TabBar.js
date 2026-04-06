"use strict";

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { TAB_BAR_COLORS_DARK, TAB_BAR_COLORS_LIGHT } from "./interface.js";

// ─── Badge ────────────────────────────────────────────────────────────────────
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Badge = ({
  value,
  color
}) => {
  const isDot = value === '';
  return /*#__PURE__*/_jsx(View, {
    style: [badge.wrap, isDot && badge.dot_wrap],
    children: isDot ? /*#__PURE__*/_jsx(View, {
      style: [badge.dot, {
        backgroundColor: color
      }]
    }) : /*#__PURE__*/_jsx(Text, {
      style: [badge.text, {
        color
      }],
      children: typeof value === 'number' && value > 99 ? '99+' : value
    })
  });
};
const badge = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: -4,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    backgroundColor: '#ef4444'
  },
  dot_wrap: {
    top: 0,
    right: -4,
    minWidth: 8,
    height: 8,
    borderRadius: 4,
    padding: 0
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  text: {
    fontSize: 9,
    fontWeight: '700',
    color: '#fff'
  }
});

// ─── Indicator ────────────────────────────────────────────────────────────────

const Indicator = ({
  type,
  left,
  width,
  height,
  color,
  radius,
  visible
}) => {
  if (!visible) return null;
  if (type === 'pill') {
    return /*#__PURE__*/_jsx(Animated.View, {
      style: [StyleSheet.absoluteFill, {
        left,
        width,
        backgroundColor: color,
        borderRadius: radius ?? 999,
        opacity: 0.15
      }]
    });
  }
  if (type === 'dot') {
    return /*#__PURE__*/_jsx(Animated.View, {
      style: {
        position: 'absolute',
        bottom: 4,
        left,
        width,
        height,
        borderRadius: height / 2,
        backgroundColor: color
      }
    });
  }

  // line (default)
  return /*#__PURE__*/_jsx(Animated.View, {
    style: {
      position: 'absolute',
      bottom: 0,
      left,
      width,
      height,
      borderRadius: radius ?? height / 2,
      backgroundColor: color
    }
  });
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveIndicatorHeight(type, explicit) {
  if (explicit !== undefined) return explicit;
  if (type === 'line') return 3;
  if (type === 'dot') return 6;
  return 3;
}
function resolveBarHeight(hasIcons, hasIndicator, explicit) {
  if (explicit !== undefined) return explicit;
  if (hasIcons) return 52;
  if (hasIndicator) return 44;
  return 48;
}
function getVariantTabStyle(variant, isActive, colors) {
  if (variant === 'card' || variant === 'solid') {
    return isActive ? {
      backgroundColor: colors.activeChipBg,
      borderRadius: 8
    } : {
      backgroundColor: 'transparent'
    };
  }
  return {};
}

// ─── TabBar ───────────────────────────────────────────────────────────────────

function TabBarInner(props) {
  const {
    options,
    value: controlledValue,
    defaultValue,
    onChange,
    indicator = false,
    indicatorWidth,
    indicatorHeight,
    indicatorColor,
    indicatorRadius,
    tabAlign = 'center',
    height,
    variant = 'default',
    labelBulge = 1,
    showBorder = false,
    tabPaddingHorizontal = 12,
    iconLabelGap = 4,
    fontSize = 14,
    iconFontSize = 11,
    textColor,
    activeTextColor,
    colors: colorOverrides,
    style,
    contentStyle,
    tabStyle,
    testID
  } = props;

  // ── Colours ──────────────────────────────────────────────────────────────
  const scheme = useColorScheme();
  const baseColors = scheme === 'dark' ? TAB_BAR_COLORS_DARK : TAB_BAR_COLORS_LIGHT;
  const colors = useMemo(() => colorOverrides ? {
    ...baseColors,
    ...colorOverrides
  } : baseColors, [baseColors, colorOverrides]);
  const resolvedTextColor = textColor ?? colors.text;
  const resolvedActiveTextColor = activeTextColor ?? colors.activeText;
  const resolvedIndicatorColor = indicatorColor ?? colors.indicator;

  // ── State ────────────────────────────────────────────────────────────────
  const isControlled = controlledValue !== undefined;
  const [localValue, setLocalValue] = useState(defaultValue ?? options[0]?.value);
  const active = isControlled ? controlledValue : localValue;
  const activeRef = useRef(active);
  activeRef.current = active;
  const handlePress = useCallback(val => {
    if (val === activeRef.current) return;
    if (!isControlled) setLocalValue(val);
    onChange?.(val);
  }, [isControlled, onChange]);

  // ── Layout measurement ────────────────────────────────────────────────────
  const tabCount = options.length;
  const layouts = useRef(Array.from({
    length: tabCount
  }, () => ({})));
  const [layoutReady, setLayoutReady] = useState(false);

  // Reset when options change
  const prevOptionsLen = useRef(tabCount);
  if (prevOptionsLen.current !== tabCount) {
    prevOptionsLen.current = tabCount;
    layouts.current = Array.from({
      length: tabCount
    }, () => ({}));
    setLayoutReady(false);
  }
  const checkReady = useCallback(() => {
    const allDone = layouts.current.every(l => l.tab && l.text);
    if (allDone) setLayoutReady(true);
  }, []);
  const onLayoutTab = useCallback(i => e => {
    layouts.current[i] = {
      ...layouts.current[i],
      tab: e.nativeEvent.layout
    };
    checkReady();
  }, [checkReady]);
  const onLayoutText = useCallback(i => e => {
    layouts.current[i] = {
      ...layouts.current[i],
      text: e.nativeEvent.layout
    };
    checkReady();
  }, [checkReady]);

  // ── Indicator animation ──────────────────────────────────────────────────
  const indLeft = useRef(new Animated.Value(0)).current;
  const indWidth = useRef(new Animated.Value(0)).current;
  const indH = resolveIndicatorHeight(indicator, indicatorHeight);
  const scrollRef = useRef(null);
  const barWidthRef = useRef(0);
  const navigateTo = useCallback(idx => {
    const layout = layouts.current[idx];
    if (!layout.tab || !layout.text) return;

    // Resolve indicator width
    const useTextWidth = indicatorWidth === undefined;
    const useTabWidth = indicatorWidth === 0;
    const iw = useTextWidth ? indicator === 'pill' ? layout.tab.width : layout.text.width : useTabWidth ? layout.tab.width : indicatorWidth;

    // Center the indicator within the tab
    const il = layout.tab.x + (layout.tab.width - iw) / 2;
    Animated.parallel([Animated.timing(indLeft, {
      toValue: il,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false
    }), Animated.timing(indWidth, {
      toValue: iw,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false
    })]).start();

    // Auto-scroll horizontal bar
    if (tabAlign === 'scroll') {
      const tabCenter = layout.tab.x + layout.tab.width / 2;
      scrollRef.current?.scrollTo({
        x: tabCenter - barWidthRef.current / 2,
        animated: true
      });
    }
  }, [indLeft, indWidth, indicatorWidth, indicator, tabAlign]);

  // Navigate when active tab or layout readiness changes
  useEffect(() => {
    if (!indicator || !layoutReady) return;
    const idx = options.findIndex(o => o.value === active);
    if (idx >= 0) navigateTo(idx);
  }, [active, layoutReady, indicator, options, navigateTo]);

  // ── Dimensions ───────────────────────────────────────────────────────────
  const hasIcons = options.some(o => !!o.iconRender);
  const barHeight = resolveBarHeight(hasIcons, !!indicator, height);
  const bulgeFactor = typeof labelBulge === 'boolean' ? labelBulge ? 1.2 : 1 : labelBulge;

  // ── Render each tab ──────────────────────────────────────────────────────
  const renderTab = (item, index) => {
    const isActive = item.value === active;
    const isDisabled = item.disabled ?? false;
    const labelColor = isActive ? variant === 'solid' || variant === 'card' ? colors.activeChipText : resolvedActiveTextColor : isDisabled ? colors.disabled : resolvedTextColor;
    const chipStyle = getVariantTabStyle(variant, isActive, colors);
    return /*#__PURE__*/_jsxs(TouchableOpacity, {
      activeOpacity: isDisabled ? 1 : 0.7,
      disabled: isDisabled,
      onPress: () => handlePress(item.value),
      onLayout: onLayoutTab(index),
      style: [S.tab, tabAlign === 'center' && S.tab_equal, {
        paddingHorizontal: tabPaddingHorizontal
      }, hasIcons && {
        paddingVertical: 6
      }, chipStyle, tabStyle],
      accessibilityRole: "tab",
      accessibilityState: {
        selected: isActive,
        disabled: isDisabled
      },
      children: [item.iconRender?.(isActive ? resolvedActiveTextColor : resolvedTextColor, isActive), /*#__PURE__*/_jsxs(View, {
        style: S.label_wrap,
        onLayout: onLayoutText(index),
        children: [/*#__PURE__*/_jsx(Text, {
          style: [S.label, {
            fontSize: hasIcons ? iconFontSize : fontSize,
            color: labelColor,
            fontWeight: isActive ? '600' : '400',
            marginTop: item.iconRender ? iconLabelGap : 0
          }, isActive && bulgeFactor !== 1 && {
            transform: [{
              scaleX: bulgeFactor
            }, {
              scaleY: bulgeFactor
            }]
          }],
          children: item.label
        }), item.badge !== undefined && /*#__PURE__*/_jsx(Badge, {
          value: item.badge,
          color: colors.badge
        })]
      })]
    }, String(item.value));
  };

  // ── Content ──────────────────────────────────────────────────────────────
  const tabs = options.map(renderTab);
  const indicatorEl = indicator ? /*#__PURE__*/_jsx(Indicator, {
    type: indicator,
    left: indLeft,
    width: indWidth,
    height: indH,
    color: resolvedIndicatorColor,
    radius: indicatorRadius,
    visible: layoutReady
  }) : null;

  // ── Bar wrapper ──────────────────────────────────────────────────────────
  return /*#__PURE__*/_jsx(View, {
    testID: testID,
    style: [S.bar, {
      height: barHeight,
      backgroundColor: colors.background,
      borderTopWidth: showBorder || variant === 'underline' ? StyleSheet.hairlineWidth : 0,
      borderTopColor: colors.border
    }, style],
    children: tabAlign === 'center' ? /*#__PURE__*/_jsxs(View, {
      style: [S.center_content, contentStyle],
      children: [indicatorEl, tabs]
    }) : /*#__PURE__*/_jsxs(ScrollView, {
      ref: scrollRef,
      horizontal: true,
      bounces: false,
      showsHorizontalScrollIndicator: false,
      style: S.scroll,
      contentContainerStyle: [S.scroll_content, contentStyle],
      onLayout: e => {
        barWidthRef.current = e.nativeEvent.layout.width;
      },
      children: [indicatorEl, tabs]
    })
  });
}

// ── Static styles ─────────────────────────────────────────────────────────────

const S = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    overflow: 'hidden'
  },
  center_content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative'
  },
  scroll: {
    flex: 1
  },
  scroll_content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    position: 'relative',
    flexGrow: 1
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column'
  },
  tab_equal: {
    flex: 1
  },
  label_wrap: {
    position: 'relative',
    alignItems: 'center'
  },
  label: {
    textAlign: 'center',
    includeFontPadding: false
  }
});
export const TabBar = /*#__PURE__*/memo(TabBarInner);
//# sourceMappingURL=TabBar.js.map