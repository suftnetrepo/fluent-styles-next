"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledRadio = void 0;
exports.StyledRadioGroup = StyledRadioGroup;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _fluentStyles = require("fluent-styles");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * StyledRadio.tsx
 * ───────────────
 * Production-ready radio button components for fluent-styles.
 *
 * Exports:
 *  • StyledRadio        — single radio dot (controlled or uncontrolled)
 *  • StyledRadioOption  — row layout: radio + label + optional right content
 *  • StyledRadioCard    — full card with border highlight when selected
 *  • StyledRadioGroup   — manages a list of StyledRadioOptions or StyledRadioCards
 *
 * Variants:
 *  • 'list'   — vertical rows (billing period, payment method rows)
 *  • 'card'   — horizontal grid cards (delivery method)
 *  • 'boxed'  — full-width card with inner row options (billing period card)
 *
 * Sizes:  sm | md | lg
 */

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Size tokens ──────────────────────────────────────────────────────────────

const RADIO_SIZE = {
  sm: {
    outer: 16,
    inner: 7,
    border: 1.5
  },
  md: {
    outer: 20,
    inner: 9,
    border: 2
  },
  lg: {
    outer: 24,
    inner: 11,
    border: 2.5
  }
};

// ─── StyledRadio (the dot itself) ─────────────────────────────────────────────

/**
 * The raw animated radio dot — use this directly if you need
 * a custom layout, or use StyledRadioGroup for the full component.
 *
 * @example
 * <StyledRadio selected={isSelected} color="#2563eb" size="md" />
 */
const StyledRadio = ({
  selected,
  color = _fluentStyles.theme.colors.gray[900],
  inactive = _fluentStyles.theme.colors.gray[300],
  size = 'md',
  onPress,
  disabled = false
}) => {
  const S = RADIO_SIZE[size];
  const scaleAnim = _react.default.useRef(new _reactNative.Animated.Value(selected ? 1 : 0)).current;
  _react.default.useEffect(() => {
    _reactNative.Animated.timing(scaleAnim, {
      toValue: selected ? 1 : 0,
      duration: 180,
      easing: _reactNative.Easing.out(_reactNative.Easing.cubic),
      useNativeDriver: true
    }).start();
  }, [selected]);
  const dot = /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
    width: S.outer,
    height: S.outer,
    borderRadius: S.outer / 2,
    borderWidth: S.border,
    borderColor: selected ? color : inactive,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: _fluentStyles.palettes.white,
    opacity: disabled ? 0.4 : 1,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
      style: {
        width: S.inner,
        height: S.inner,
        borderRadius: S.inner / 2,
        backgroundColor: color,
        transform: [{
          scale: scaleAnim
        }]
      }
    })
  });
  if (!onPress) return dot;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledPressable, {
    onPress: disabled ? undefined : onPress,
    children: dot
  });
};

// ─── Internal: default colour resolver ───────────────────────────────────────
exports.StyledRadio = StyledRadio;
function resolveColors(overrides) {
  const active = overrides?.active ?? _fluentStyles.theme.colors.gray[900];
  return {
    active,
    inactive: overrides?.inactive ?? _fluentStyles.theme.colors.gray[300],
    selectedCardBg: overrides?.selectedCardBg ?? `${active}0d`,
    selectedCardBorder: overrides?.selectedCardBorder ?? active,
    unselectedCardBorder: overrides?.unselectedCardBorder ?? _fluentStyles.theme.colors.gray[200],
    label: overrides?.label ?? _fluentStyles.theme.colors.gray[900],
    subtitle: overrides?.subtitle ?? _fluentStyles.theme.colors.gray[400]
  };
}

// ─── StyledRadioGroup ─────────────────────────────────────────────────────────

/**
 * StyledRadioGroup — fully managed radio selection group.
 *
 * @example Vertical list (billing period rows)
 * ```tsx
 * <StyledRadioGroup
 *   options={[
 *     { value: 'monthly', label: 'Monthly', rightContent: <StyledText>$9.99/month</StyledText> },
 *     { value: 'yearly',  label: 'Yearly',  rightContent: <StyledText>$12.99/month</StyledText> },
 *   ]}
 *   defaultValue="monthly"
 *   variant="list"
 * />
 * ```
 *
 * @example Boxed card with title
 * ```tsx
 * <StyledRadioGroup
 *   title="Billing Period"
 *   options={billingOptions}
 *   defaultValue="monthly"
 *   variant="boxed"
 * />
 * ```
 *
 * @example Horizontal cards (delivery method)
 * ```tsx
 * <StyledRadioGroup
 *   options={deliveryOptions}
 *   defaultValue="express"
 *   variant="card"
 *   columns={3}
 *   colors={{ active: '#2563eb', selectedCardBg: '#eff6ff' }}
 * />
 * ```
 *
 * @example Custom colours (blue theme)
 * ```tsx
 * <StyledRadioGroup
 *   options={paymentOptions}
 *   defaultValue="visa"
 *   variant="list"
 *   colors={{
 *     active:             '#2563eb',
 *     selectedCardBg:     '#eff6ff',
 *     selectedCardBorder: '#2563eb',
 *   }}
 * />
 * ```
 */
function StyledRadioGroup({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  variant = 'list',
  size = 'md',
  title,
  colors: colorsProp,
  columns = 3,
  gap = 10
}) {
  const C = resolveColors(colorsProp);
  const isControlled = controlledValue !== undefined;
  const [local, setLocal] = (0, _react.useState)(defaultValue);
  const selected = isControlled ? controlledValue : local;
  const handleSelect = val => {
    if (!isControlled) setLocal(val);
    onChange?.(val);
  };

  // ── Card variant: horizontal grid ─────────────────────────────────────────
  if (variant === 'card') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
      children: chunk(options, columns).map((row, ri) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
        horizontal: true,
        gap: gap,
        marginBottom: ri < Math.ceil(options.length / columns) - 1 ? gap : 0,
        children: [row.map(opt => {
          const isSelected = opt.value === selected;
          return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledPressable, {
            flex: 1,
            onPress: () => !opt.disabled && handleSelect(opt.value),
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: isSelected ? C.selectedCardBorder : C.unselectedCardBorder,
            backgroundColor: isSelected ? C.selectedCardBg : _fluentStyles.palettes.white,
            padding: 14,
            opacity: opt.disabled ? 0.4 : 1,
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
              justifyContent: "space-between",
              flex: 1,
              gap: 8,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
                horizontal: true,
                alignItems: "flex-start",
                justifyContent: "space-between",
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
                  fontSize: _fluentStyles.theme.fontSize.normal,
                  fontWeight: _fluentStyles.theme.fontWeight.semiBold,
                  color: isSelected ? C.active : C.label,
                  flex: 1,
                  marginRight: 6,
                  children: opt.label
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)(StyledRadio, {
                  selected: isSelected,
                  color: C.active,
                  inactive: C.inactive,
                  size: size
                })]
              }), opt.subtitle && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
                fontSize: _fluentStyles.theme.fontSize.small,
                color: isSelected ? C.active : C.subtitle,
                children: opt.subtitle
              }), opt.rightContent && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
                children: opt.rightContent
              })]
            })
          }, String(opt.value));
        }), row.length < columns && Array.from({
          length: columns - row.length
        }).map((_, i) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
          flex: 1
        }, `empty-${i}`))]
      }, ri))
    });
  }

  // ── Boxed variant: card wrapper with title + list inside ──────────────────
  if (variant === 'boxed') {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.StyledCard, {
      backgroundColor: _fluentStyles.palettes.white,
      borderRadius: 16,
      padding: 16,
      shadow: "light",
      children: [title && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
          fontSize: _fluentStyles.theme.fontSize.medium,
          fontWeight: _fluentStyles.theme.fontWeight.bold,
          color: C.label,
          marginBottom: 14,
          children: title
        })
      }), options.map((opt, idx) => {
        const isSelected = opt.value === selected;
        const isLast = idx === options.length - 1;
        return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.StyledPressable, {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 13,
            onPress: () => !opt.disabled && handleSelect(opt.value),
            opacity: opt.disabled ? 0.4 : 1,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
              horizontal: true,
              alignItems: "center",
              gap: 12,
              flex: 1,
              children: [opt.leadingContent, /*#__PURE__*/(0, _jsxRuntime.jsx)(StyledRadio, {
                selected: isSelected,
                color: C.active,
                inactive: C.inactive,
                size: size
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
                flex: 1,
                gap: 2,
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
                  fontSize: _fluentStyles.theme.fontSize.normal,
                  fontWeight: isSelected ? _fluentStyles.theme.fontWeight.semiBold : _fluentStyles.theme.fontWeight.normal,
                  color: C.label,
                  children: opt.label
                }), opt.subtitle && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
                  fontSize: _fluentStyles.theme.fontSize.small,
                  color: C.subtitle,
                  children: opt.subtitle
                })]
              })]
            }), opt.rightContent && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
              alignItems: "flex-end",
              children: opt.rightContent
            })]
          }), !isLast && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledDivider, {
            borderBottomColor: _fluentStyles.theme.colors.gray[100]
          })]
        }, String(opt.value));
      })]
    });
  }

  // ── List variant: standalone rows with full-row border ────────────────────
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
    gap: 10,
    children: options.map(opt => {
      const isSelected = opt.value === selected;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.StyledPressable, {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: isSelected ? C.selectedCardBorder : C.unselectedCardBorder,
        backgroundColor: isSelected ? C.selectedCardBg : _fluentStyles.palettes.white,
        paddingHorizontal: 16,
        paddingVertical: 14,
        onPress: () => !opt.disabled && handleSelect(opt.value),
        opacity: opt.disabled ? 0.4 : 1,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
          horizontal: true,
          alignItems: "center",
          gap: 12,
          flex: 1,
          children: [opt.leadingContent, /*#__PURE__*/(0, _jsxRuntime.jsx)(StyledRadio, {
            selected: isSelected,
            color: C.active,
            inactive: C.inactive,
            size: size
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
            fontSize: _fluentStyles.theme.fontSize.normal,
            fontWeight: isSelected ? _fluentStyles.theme.fontWeight.semiBold : _fluentStyles.theme.fontWeight.normal,
            color: C.label,
            children: opt.label
          }), opt.badge]
        }), opt.rightContent && /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.Stack, {
          alignItems: "flex-end",
          children: opt.rightContent
        })]
      }, String(opt.value));
    })
  });
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}
var _default = exports.default = StyledRadioGroup;
//# sourceMappingURL=index.js.map