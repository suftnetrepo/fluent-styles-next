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
import {
  Stack,
  StyledText,
  StyledPressable,
  theme,
  palettes,
} from 'fluent-styles';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ChipVariant =
  | 'outlined'    // border ring, transparent bg
  | 'filled'      // solid coloured bg
  | 'smooth'      // pastel tinted bg, no border
  | 'ingredient'  // neutral grey pill, dark when selected
  | 'likeable'    // pink heart icon, pink border when active
  | 'icon';       // leading ReactNode icon + label

export type ChipSize = 'sm' | 'md' | 'lg';

export interface StyledChipProps {
  /** Text label displayed inside the chip */
  label: string;

  /** Visual style. Default: 'outlined' */
  variant?: ChipVariant;

  /** Size preset. Default: 'md' */
  size?: ChipSize;

  /**
   * Controlled selected/active state.
   * When provided the component is controlled; omit for uncontrolled.
   */
  selected?: boolean;

  /** Initial selected state for uncontrolled mode. Default: false */
  defaultSelected?: boolean;

  /** Called when the chip is pressed. Receives the new selected state. */
  onPress?: (selected: boolean) => void;

  /**
   * Accent colour used for borders, text, and icon tints.
   * Defaults per variant:
   *  outlined   → theme.colors.gray[700]
   *  filled     → palettes.white (text on filled bg)
   *  smooth     → matches `bgColor` darkened automatically
   *  ingredient → theme.colors.gray[700]
   *  likeable   → '#e91e8c'
   *  icon       → theme.colors.gray[700]
   */
  color?: string;

  /**
   * Background colour.
   *  filled  → required for the chip colour
   *  smooth  → sets the pastel tint
   *  others  → typically unused
   */
  bgColor?: string;

  /**
   * Leading icon element (any ReactNode — Feather icon, SVG, emoji text, etc.)
   * Shown for 'icon' variant and optionally on others.
   */
  icon?: React.ReactNode;

  /** Show a checkmark when selected (outlined / smooth / ingredient). Default: true */
  showCheck?: boolean;

  /** Disabled state — mutes colours and disables press. Default: false */
  disabled?: boolean;

  /** Additional border radius override. Default per size. */
  borderRadius?: number;
}

// ─── Size tokens ──────────────────────────────────────────────────────────────

const SIZE: Record<ChipSize, {
  paddingH: number;
  paddingV: number;
  fontSize: number;
  iconSize: number;
  radius:   number;
  checkSize: number;
}> = {
  sm: { paddingH: 10, paddingV: 5,  fontSize: 11, iconSize: 12, radius: 20, checkSize: 11 },
  md: { paddingH: 14, paddingV: 8,  fontSize: 13, iconSize: 14, radius: 24, checkSize: 13 },
  lg: { paddingH: 18, paddingV: 11, fontSize: 15, iconSize: 16, radius: 28, checkSize: 15 },
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
export const StyledChip: React.FC<StyledChipProps> = ({
  label,
  variant      = 'outlined',
  size         = 'md',
  selected: controlledSelected,
  defaultSelected = false,
  onPress,
  color,
  bgColor,
  icon,
  showCheck    = true,
  disabled     = false,
  borderRadius: borderRadiusOverride,
}) => {
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const isControlled = controlledSelected !== undefined;
  const isSelected   = isControlled ? controlledSelected : internalSelected;

  const S = SIZE[size];
  const rx = borderRadiusOverride ?? S.radius;

  const handlePress = () => {
    if (disabled) return;
    const next = !isSelected;
    if (!isControlled) setInternalSelected(next);
    onPress?.(next);
  };

  // ── Resolve styles per variant ───────────────────────────────────────────

  let chipBg: string     = 'transparent';
  let chipBorder: string = 'transparent';
  let borderWidth        = 0;
  let labelColor: string = theme.colors.gray[800];
  let opacity            = disabled ? 0.4 : 1;

  switch (variant) {

    // ── Outlined ────────────────────────────────────────────────────────────
    case 'outlined': {
      const accentColor = color ?? theme.colors.gray[700];
      chipBorder  = isSelected ? accentColor : accentColor;
      borderWidth = 1.5;
      chipBg      = isSelected ? `${accentColor}14` : 'transparent';
      labelColor  = accentColor;
      break;
    }

    // ── Filled ──────────────────────────────────────────────────────────────
    case 'filled': {
      chipBg      = bgColor ?? (isSelected ? theme.colors.gray[800] : theme.colors.gray[200]);
      labelColor  = color   ?? (isSelected ? palettes.white : theme.colors.gray[800]);
      borderWidth = 0;
      break;
    }

    // ── Smooth ──────────────────────────────────────────────────────────────
    case 'smooth': {
      chipBg      = bgColor ?? theme.colors.gray[100];
      labelColor  = color   ?? theme.colors.gray[700];
      borderWidth = 0;
      break;
    }

    // ── Ingredient ──────────────────────────────────────────────────────────
    case 'ingredient': {
      chipBg      = isSelected ? theme.colors.gray[700] : theme.colors.gray[100];
      labelColor  = isSelected ? palettes.white : theme.colors.gray[800];
      borderWidth = 0;
      break;
    }

    // ── Likeable ────────────────────────────────────────────────────────────
    case 'likeable': {
      const pink  = '#e91e8c';
      chipBg      = isSelected ? pink : 'transparent';
      chipBorder  = pink;
      borderWidth = 1.5;
      labelColor  = isSelected ? palettes.white : pink;
      break;
    }

    // ── Icon ────────────────────────────────────────────────────────────────
    case 'icon': {
      const accentColor = color ?? theme.colors.gray[700];
      chipBg      = isSelected ? (bgColor ?? accentColor) : (bgColor ?? 'transparent');
      chipBorder  = isSelected ? 'transparent' : (bgColor ?? theme.colors.gray[200]);
      borderWidth = isSelected ? 0 : 1.2;
      labelColor  = isSelected ? palettes.white : accentColor;
      break;
    }
  }

  // ── Heart icon for likeable variant ──────────────────────────────────────
  const heartIcon = variant === 'likeable' ? (
    <StyledText style={{ fontSize: S.iconSize + 2, marginRight: 5 }}>
      {isSelected ? '❤️' : '🤍'}
    </StyledText>
  ) : null;

  // ── Checkmark for outlined / ingredient / smooth ─────────────────────────
  const checkIcon = showCheck && isSelected &&
    (variant === 'outlined' || variant === 'ingredient' || variant === 'smooth' || variant === 'filled')
    ? (
      <Icon
        name="check"
        size={S.checkSize}
        color={labelColor}
        style={{ marginRight: 4 }}
      />
    ) : null;

  return (
    <StyledPressable
      onPress={handlePress}
      paddingHorizontal={S.paddingH}
      paddingVertical={S.paddingV}
      borderRadius={rx}
      backgroundColor={chipBg}
      borderWidth={borderWidth}
      borderColor={chipBorder}
      opacity={opacity}
      alignSelf="flex-start"
    >
      <Stack horizontal alignItems="center" gap={4}>
        {/* Leading: check or heart or custom icon */}
        {checkIcon}
        {heartIcon}
        {!checkIcon && !heartIcon && icon ? icon : null}

        <StyledText
          fontSize={S.fontSize}
          fontWeight={isSelected ? theme.fontWeight.semiBold : theme.fontWeight.normal}
          color={labelColor}
        >
          {label}
        </StyledText>
      </Stack>
    </StyledPressable>
  );
};

export default StyledChip;