"use strict";

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

import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Stack, StyledText, StyledPressable, theme, palettes } from 'fluent-styles';

// ─── Types ────────────────────────────────────────────────────────────────────

// leading ReactNode icon + label
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export const StyledChip = ({
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
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
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
  let labelColor = theme.colors.gray[800];
  let opacity = disabled ? 0.4 : 1;
  switch (variant) {
    // ── Outlined ────────────────────────────────────────────────────────────
    case 'outlined':
      {
        const accentColor = color ?? theme.colors.gray[700];
        chipBorder = isSelected ? accentColor : accentColor;
        borderWidth = 1.5;
        chipBg = isSelected ? `${accentColor}14` : 'transparent';
        labelColor = accentColor;
        break;
      }

    // ── Filled ──────────────────────────────────────────────────────────────
    case 'filled':
      {
        chipBg = bgColor ?? (isSelected ? theme.colors.gray[800] : theme.colors.gray[200]);
        labelColor = color ?? (isSelected ? palettes.white : theme.colors.gray[800]);
        borderWidth = 0;
        break;
      }

    // ── Smooth ──────────────────────────────────────────────────────────────
    case 'smooth':
      {
        chipBg = bgColor ?? theme.colors.gray[100];
        labelColor = color ?? theme.colors.gray[700];
        borderWidth = 0;
        break;
      }

    // ── Ingredient ──────────────────────────────────────────────────────────
    case 'ingredient':
      {
        chipBg = isSelected ? theme.colors.gray[700] : theme.colors.gray[100];
        labelColor = isSelected ? palettes.white : theme.colors.gray[800];
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
        labelColor = isSelected ? palettes.white : pink;
        break;
      }

    // ── Icon ────────────────────────────────────────────────────────────────
    case 'icon':
      {
        const accentColor = color ?? theme.colors.gray[700];
        chipBg = isSelected ? bgColor ?? accentColor : bgColor ?? 'transparent';
        chipBorder = isSelected ? 'transparent' : bgColor ?? theme.colors.gray[200];
        borderWidth = isSelected ? 0 : 1.2;
        labelColor = isSelected ? palettes.white : accentColor;
        break;
      }
  }

  // ── Heart icon for likeable variant ──────────────────────────────────────
  const heartIcon = variant === 'likeable' ? /*#__PURE__*/_jsx(StyledText, {
    style: {
      fontSize: S.iconSize + 2,
      marginRight: 5
    },
    children: isSelected ? '❤️' : '🤍'
  }) : null;

  // ── Checkmark for outlined / ingredient / smooth ─────────────────────────
  const checkIcon = showCheck && isSelected && (variant === 'outlined' || variant === 'ingredient' || variant === 'smooth' || variant === 'filled') ? /*#__PURE__*/_jsx(Icon, {
    name: "check",
    size: S.checkSize,
    color: labelColor,
    style: {
      marginRight: 4
    }
  }) : null;
  return /*#__PURE__*/_jsx(StyledPressable, {
    onPress: handlePress,
    paddingHorizontal: S.paddingH,
    paddingVertical: S.paddingV,
    borderRadius: rx,
    backgroundColor: chipBg,
    borderWidth: borderWidth,
    borderColor: chipBorder,
    opacity: opacity,
    alignSelf: "flex-start",
    children: /*#__PURE__*/_jsxs(Stack, {
      horizontal: true,
      alignItems: "center",
      gap: 4,
      children: [checkIcon, heartIcon, !checkIcon && !heartIcon && icon ? icon : null, /*#__PURE__*/_jsx(StyledText, {
        fontSize: S.fontSize,
        fontWeight: isSelected ? theme.fontWeight.semiBold : theme.fontWeight.normal,
        color: labelColor,
        children: label
      })]
    })
  });
};
export default StyledChip;
//# sourceMappingURL=index.js.map