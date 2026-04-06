"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StyledChip = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Feather = _interopRequireDefault(require("react-native-vector-icons/Feather"));
var _fluentStyles = require("fluent-styles");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * StyledChip.tsx
 * ──────────────
 * Reusable chip/tag component for fluent-styles apps.
 *
 * Variants:
 *  • outlined   — border only, no fill
 *  • filled     — solid background
 *  • smooth     — soft pastel fill, no border
 *  • ingredient — neutral grey pill, toggleable selected state
 *  • likeable   — heart icon left, pink border, toggleable liked state
 *  • icon       — leading icon + label, optional filled active state
 */

// ─── Types ────────────────────────────────────────────────────────────────────

// leading ReactNode icon + label

// ─── Size tokens ──────────────────────────────────────────────────────────────

const SIZE = {
  sm: {
    paddingH: 10,
    paddingV: 5,
    fontSize: 11,
    iconSize: 12,
    radius: 20,
    checkSize: 11
  },
  md: {
    paddingH: 14,
    paddingV: 8,
    fontSize: 13,
    iconSize: 14,
    radius: 24,
    checkSize: 13
  },
  lg: {
    paddingH: 18,
    paddingV: 11,
    fontSize: 15,
    iconSize: 16,
    radius: 28,
    checkSize: 15
  }
};

// ─── StyledChip ───────────────────────────────────────────────────────────────

/**
 * StyledChip — multi-variant chip for fluent-styles apps.
 *
 * @example Outlined (uncontrolled, toggleable)
 * ```tsx
 * <StyledChip label="Hacktoberfest" variant="outlined" color="#4caf50" />
 * ```
 *
 * @example Ingredient chip (selected)
 * ```tsx
 * <StyledChip label="Cinnamon" variant="ingredient" defaultSelected />
 * ```
 *
 * @example Likeable chip (controlled)
 * ```tsx
 * <StyledChip
 *   label="Big Data"
 *   variant="likeable"
 *   selected={liked}
 *   onPress={(v) => setLiked(v)}
 * />
 * ```
 *
 * @example Icon chip (filled active)
 * ```tsx
 * <StyledChip
 *   label="Social Media"
 *   variant="icon"
 *   icon={<Icon name="refresh-cw" size={14} color="green" />}
 *   color="green"
 *   bgColor="#e8f5e9"
 * />
 * ```
 *
 * @example Filled chip
 * ```tsx
 * <StyledChip label="Taken" variant="filled" bgColor="#e91e8c" color="#fff" />
 * ```
 */
const StyledChip = ({
  label,
  variant = 'outlined',
  size = 'md',
  selected: controlledSelected,
  defaultSelected = false,
  onPress,
  color,
  bgColor,
  icon,
  showCheck = true,
  disabled = false,
  borderRadius: borderRadiusOverride
}) => {
  const [internalSelected, setInternalSelected] = (0, _react.useState)(defaultSelected);
  const isControlled = controlledSelected !== undefined;
  const isSelected = isControlled ? controlledSelected : internalSelected;
  const S = SIZE[size];
  const rx = borderRadiusOverride ?? S.radius;
  const handlePress = () => {
    if (disabled) return;
    const next = !isSelected;
    if (!isControlled) setInternalSelected(next);
    onPress?.(next);
  };

  // ── Resolve styles per variant ───────────────────────────────────────────

  let chipBg = 'transparent';
  let chipBorder = 'transparent';
  let borderWidth = 0;
  let labelColor = _fluentStyles.theme.colors.gray[800];
  let opacity = disabled ? 0.4 : 1;
  switch (variant) {
    // ── Outlined ────────────────────────────────────────────────────────────
    case 'outlined':
      {
        const accentColor = color ?? _fluentStyles.theme.colors.gray[700];
        chipBorder = isSelected ? accentColor : accentColor;
        borderWidth = 1.5;
        chipBg = isSelected ? `${accentColor}14` : 'transparent';
        labelColor = accentColor;
        break;
      }

    // ── Filled ──────────────────────────────────────────────────────────────
    case 'filled':
      {
        chipBg = bgColor ?? (isSelected ? _fluentStyles.theme.colors.gray[800] : _fluentStyles.theme.colors.gray[200]);
        labelColor = color ?? (isSelected ? _fluentStyles.palettes.white : _fluentStyles.theme.colors.gray[800]);
        borderWidth = 0;
        break;
      }

    // ── Smooth ──────────────────────────────────────────────────────────────
    case 'smooth':
      {
        chipBg = bgColor ?? _fluentStyles.theme.colors.gray[100];
        labelColor = color ?? _fluentStyles.theme.colors.gray[700];
        borderWidth = 0;
        break;
      }

    // ── Ingredient ──────────────────────────────────────────────────────────
    case 'ingredient':
      {
        chipBg = isSelected ? _fluentStyles.theme.colors.gray[700] : _fluentStyles.theme.colors.gray[100];
        labelColor = isSelected ? _fluentStyles.palettes.white : _fluentStyles.theme.colors.gray[800];
        borderWidth = 0;
        break;
      }

    // ── Likeable ────────────────────────────────────────────────────────────
    case 'likeable':
      {
        const pink = '#e91e8c';
        chipBg = isSelected ? pink : 'transparent';
        chipBorder = pink;
        borderWidth = 1.5;
        labelColor = isSelected ? _fluentStyles.palettes.white : pink;
        break;
      }

    // ── Icon ────────────────────────────────────────────────────────────────
    case 'icon':
      {
        const accentColor = color ?? _fluentStyles.theme.colors.gray[700];
        chipBg = isSelected ? bgColor ?? accentColor : bgColor ?? 'transparent';
        chipBorder = isSelected ? 'transparent' : bgColor ?? _fluentStyles.theme.colors.gray[200];
        borderWidth = isSelected ? 0 : 1.2;
        labelColor = isSelected ? _fluentStyles.palettes.white : accentColor;
        break;
      }
  }

  // ── Heart icon for likeable variant ──────────────────────────────────────
  const heartIcon = variant === 'likeable' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
    style: {
      fontSize: S.iconSize + 2,
      marginRight: 5
    },
    children: isSelected ? '❤️' : '🤍'
  }) : null;

  // ── Checkmark for outlined / ingredient / smooth ─────────────────────────
  const checkIcon = showCheck && isSelected && (variant === 'outlined' || variant === 'ingredient' || variant === 'smooth' || variant === 'filled') ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Feather.default, {
    name: "check",
    size: S.checkSize,
    color: labelColor,
    style: {
      marginRight: 4
    }
  }) : null;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledPressable, {
    onPress: handlePress,
    paddingHorizontal: S.paddingH,
    paddingVertical: S.paddingV,
    borderRadius: rx,
    backgroundColor: chipBg,
    borderWidth: borderWidth,
    borderColor: chipBorder,
    opacity: opacity,
    alignSelf: "flex-start",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_fluentStyles.Stack, {
      horizontal: true,
      alignItems: "center",
      gap: 4,
      children: [checkIcon, heartIcon, !checkIcon && !heartIcon && icon ? icon : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_fluentStyles.StyledText, {
        fontSize: S.fontSize,
        fontWeight: isSelected ? _fluentStyles.theme.fontWeight.semiBold : _fluentStyles.theme.fontWeight.normal,
        color: labelColor,
        children: label
      })]
    })
  });
};
exports.StyledChip = StyledChip;
var _default = exports.default = StyledChip;
//# sourceMappingURL=index.js.map