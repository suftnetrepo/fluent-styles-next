"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StyledTimeline = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _fluentStyles = require("fluent-styles");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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

// ─── Types ────────────────────────────────────────────────────────────────────

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
  const scale = (0, _react.useRef)(new _reactNative.Animated.Value(anim ? 0 : 1)).current;
  (0, _react.useEffect)(() => {
    if (!anim) return;
    _reactNative.Animated.timing(scale, {
      toValue: 1,
      duration: 300,
      delay,
      easing: _reactNative.Easing.out(_reactNative.Easing.back(1.8)),
      useNativeDriver: true
    }).start();
  }, []);
  const inner = shape === 'circle' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: color
  }) : shape === 'ring' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: borderColor,
    borderWidth: 2.5,
    borderColor: color
  }) :
  /*#__PURE__*/
  // filled (default)
  (0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
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
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
  flex: 1,
  gap: 4,
  children: [item.title && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
    fontSize: _fluentStyles.theme.fontSize.normal,
    fontWeight: _fluentStyles.theme.fontWeight.semiBold,
    color: _fluentStyles.theme.colors.gray[900],
    children: item.title
  }), item.subtitle && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
    fontSize: _fluentStyles.theme.fontSize.small,
    color: _fluentStyles.theme.colors.gray[500],
    children: item.subtitle
  }), item.description && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
    fontSize: _fluentStyles.theme.fontSize.small,
    color: _fluentStyles.theme.colors.gray[400],
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
const StyledTimeline = ({
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
    line: colorsProp?.line ?? _fluentStyles.theme.colors.gray[200],
    dot: colorsProp?.dot ?? '#8bc34a',
    dotBorder: colorsProp?.dotBorder ?? _fluentStyles.palettes.white,
    timeText: colorsProp?.timeText ?? _fluentStyles.theme.colors.gray[900],
    endTimeText: colorsProp?.endTimeText ?? _fluentStyles.theme.colors.gray[400]
  };
  const gap = VARIANT_GAP[variant];
  const childArray = _react.default.Children.toArray(children);

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

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
    children: allItems.map((item, index) => {
      const isLast = index === allItems.length - 1;
      const hasTime = !!item.time;

      // Resolve content
      const resolvedContent = item.content ? item.content : renderItem ? renderItem(item, index) : /*#__PURE__*/(0, _jsxRuntime.jsx)(DefaultItemContent, {
        item: item
      });
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
        horizontal: true,
        alignItems: "stretch",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
          width: timeColumnWidth,
          alignItems: "flex-end",
          paddingRight: 12,
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
            alignItems: "flex-end",
            gap: 2,
            paddingTop: 2,
            children: [hasTime && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
              fontSize: _fluentStyles.theme.fontSize.normal,
              fontWeight: _fluentStyles.theme.fontWeight.semiBold,
              color: C.timeText,
              numberOfLines: 1,
              children: item.time
            }), item.endTime && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
              fontSize: _fluentStyles.theme.fontSize.small,
              color: C.endTimeText,
              numberOfLines: 1,
              children: item.endTime
            })]
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
          alignItems: "center",
          width: dotSize + 12,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
            paddingTop: 4,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(TimelineDot, {
              size: dotSize,
              color: C.dot,
              borderColor: C.dotBorder,
              shape: dotShape,
              animated: animated,
              delay: index * 60
            })
          }), !isLast && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
            flex: 1,
            width: 1.5,
            backgroundColor: C.line,
            marginTop: 4,
            marginBottom: 0,
            style: {
              minHeight: gap
            }
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
          flex: 1,
          paddingLeft: timeGap,
          paddingBottom: isLast ? 0 : gap,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledPressable, {
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
exports.StyledTimeline = StyledTimeline;
var _default = exports.default = StyledTimeline;
//# sourceMappingURL=index.js.map