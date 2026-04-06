"use strict";

/**
 * StyledTimeline.tsx
 * ──────────────────
 * A fully reusable, data-driven vertical timeline component for fluent-styles.
 *
 * Features:
 *  • Accepts JSON data OR React children (or both)
 *  • Animated dot entrance on mount
 *  • Customisable dot size, colour, line style, connector colour
 *  • Time label column on the left (start + end)
 *  • Right content slot: any ReactNode per item
 *  • Variants: default · compact · spacious
 *  • Full TypeScript props
 */

import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Stack, StyledText, StyledPressable, theme, palettes } from 'fluent-styles';

// ─── Types ────────────────────────────────────────────────────────────────────
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ─── Size tokens ──────────────────────────────────────────────────────────────

const VARIANT_GAP = {
  compact: 12,
  default: 20,
  spacious: 32
};

// ─── Animated dot ─────────────────────────────────────────────────────────────

const TimelineDot = ({
  size,
  color,
  borderColor,
  shape,
  animated: anim,
  delay
}) => {
  const scale = useRef(new Animated.Value(anim ? 0 : 1)).current;
  useEffect(() => {
    if (!anim) return;
    Animated.timing(scale, {
      toValue: 1,
      duration: 300,
      delay,
      easing: Easing.out(Easing.back(1.8)),
      useNativeDriver: true
    }).start();
  }, []);
  const inner = shape === 'circle' ? /*#__PURE__*/_jsx(Stack, {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: color
  }) : shape === 'ring' ? /*#__PURE__*/_jsx(Stack, {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: borderColor,
    borderWidth: 2.5,
    borderColor: color
  }) :
  /*#__PURE__*/
  // filled (default)
  _jsx(Stack, {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color
  });
  return /*#__PURE__*/_jsx(Animated.View, {
    style: {
      transform: [{
        scale
      }]
    },
    children: inner
  });
};

// ─── Default item renderer ────────────────────────────────────────────────────

const DefaultItemContent = ({
  item
}) => /*#__PURE__*/_jsxs(Stack, {
  flex: 1,
  gap: 4,
  children: [item.title && /*#__PURE__*/_jsx(StyledText, {
    fontSize: theme.fontSize.normal,
    fontWeight: theme.fontWeight.semiBold,
    color: theme.colors.gray[900],
    children: item.title
  }), item.subtitle && /*#__PURE__*/_jsx(StyledText, {
    fontSize: theme.fontSize.small,
    color: theme.colors.gray[500],
    children: item.subtitle
  }), item.description && /*#__PURE__*/_jsx(StyledText, {
    fontSize: theme.fontSize.small,
    color: theme.colors.gray[400],
    children: item.description
  })]
});

// ─── StyledTimeline ───────────────────────────────────────────────────────────

/**
 * StyledTimeline — vertical data-driven timeline for fluent-styles apps.
 *
 * @example JSON-driven (minimal)
 * ```tsx
 * <StyledTimeline
 *   items={[
 *     { id: '1', time: '09:00', title: 'Morning Run',    subtitle: 'Cardio · 5km'  },
 *     { id: '2', time: '11:30', title: 'Strength Class', subtitle: 'Upper body'    },
 *     { id: '3', time: '14:00', title: 'Yoga',           subtitle: 'Recovery'      },
 *   ]}
 * />
 * ```
 *
 * @example Custom renderItem
 * ```tsx
 * <StyledTimeline
 *   items={workoutItems}
 *   renderItem={(item) => <WorkoutCard item={item} />}
 * />
 * ```
 *
 * @example Mixed: data + inline children
 * ```tsx
 * <StyledTimeline items={scheduleItems}>
 *   <NoteCard note="Don't forget to hydrate!" />
 * </StyledTimeline>
 * ```
 *
 * @example Custom colours
 * ```tsx
 * <StyledTimeline
 *   items={items}
 *   colors={{ dot: '#2196f3', line: '#bbdefb' }}
 *   dotShape="ring"
 *   variant="spacious"
 * />
 * ```
 */
export const StyledTimeline = ({
  items = [],
  renderItem,
  children,
  variant = 'default',
  dotShape = 'filled',
  dotSize = 10,
  timeColumnWidth = 56,
  timeGap = 16,
  animated = true,
  colors: colorsProp,
  onItemPress
}) => {
  const C = {
    line: colorsProp?.line ?? theme.colors.gray[200],
    dot: colorsProp?.dot ?? '#8bc34a',
    dotBorder: colorsProp?.dotBorder ?? palettes.white,
    timeText: colorsProp?.timeText ?? theme.colors.gray[900],
    endTimeText: colorsProp?.endTimeText ?? theme.colors.gray[400]
  };
  const gap = VARIANT_GAP[variant];
  const childArray = React.Children.toArray(children);

  // Convert children into pseudo-items so they render in the same loop
  const childItems = childArray.map((child, i) => ({
    id: `__child_${i}`,
    time: '',
    content: child
  }));
  const allItems = [...items, ...childItems];

  // ── Row height measurement for line drawing ──────────────────────────────
  // We use a simple layout: each row renders into a measured Stack.
  // The connector line is drawn as a fixed-width left column overlay.

  return /*#__PURE__*/_jsx(Stack, {
    children: allItems.map((item, index) => {
      const isLast = index === allItems.length - 1;
      const hasTime = !!item.time;

      // Resolve content
      const resolvedContent = item.content ? item.content : renderItem ? renderItem(item, index) : /*#__PURE__*/_jsx(DefaultItemContent, {
        item: item
      });
      return /*#__PURE__*/_jsxs(Stack, {
        horizontal: true,
        alignItems: "stretch",
        children: [/*#__PURE__*/_jsx(Stack, {
          width: timeColumnWidth,
          alignItems: "flex-end",
          paddingRight: 12,
          children: /*#__PURE__*/_jsxs(Stack, {
            alignItems: "flex-end",
            gap: 2,
            paddingTop: 2,
            children: [hasTime && /*#__PURE__*/_jsx(StyledText, {
              fontSize: theme.fontSize.normal,
              fontWeight: theme.fontWeight.semiBold,
              color: C.timeText,
              numberOfLines: 1,
              children: item.time
            }), item.endTime && /*#__PURE__*/_jsx(StyledText, {
              fontSize: theme.fontSize.small,
              color: C.endTimeText,
              numberOfLines: 1,
              children: item.endTime
            })]
          })
        }), /*#__PURE__*/_jsxs(Stack, {
          alignItems: "center",
          width: dotSize + 12,
          children: [/*#__PURE__*/_jsx(Stack, {
            paddingTop: 4,
            children: /*#__PURE__*/_jsx(TimelineDot, {
              size: dotSize,
              color: C.dot,
              borderColor: C.dotBorder,
              shape: dotShape,
              animated: animated,
              delay: index * 60
            })
          }), !isLast && /*#__PURE__*/_jsx(Stack, {
            flex: 1,
            width: 1.5,
            backgroundColor: C.line,
            marginTop: 4,
            marginBottom: 0,
            style: {
              minHeight: gap
            }
          })]
        }), /*#__PURE__*/_jsx(Stack, {
          flex: 1,
          paddingLeft: timeGap,
          paddingBottom: isLast ? 0 : gap,
          children: /*#__PURE__*/_jsx(StyledPressable, {
            onPress: () => onItemPress?.(item),
            style: {
              flex: 1
            },
            children: resolvedContent
          })
        })]
      }, item.id);
    })
  });
};
export default StyledTimeline;
//# sourceMappingURL=index.js.map