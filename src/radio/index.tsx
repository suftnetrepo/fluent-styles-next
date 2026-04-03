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

import React, { useState } from 'react';
import { Animated, Easing } from 'react-native';
import {
  Stack,
  StyledText,
  StyledPressable,
  StyledCard,
  StyledDivider,
  theme,
  palettes,
} from 'fluent-styles';

// ─── Types ────────────────────────────────────────────────────────────────────

export type RadioSize    = 'sm' | 'md' | 'lg';
export type RadioVariant = 'list' | 'card' | 'boxed';

export interface RadioOption<T extends string | number = string> {
  /** Unique value for this option */
  value: T;
  /** Primary label */
  label: string;
  color?: string; // for card variant: active colour override
  /** Secondary line below the label */
  subtitle?: string;
  /** Content shown on the right side (price, description, etc.) */
  rightContent?: React.ReactNode;
  /** Leading content (card logo, icon, etc.) */
  leadingContent?: React.ReactNode;
  /** Badge shown inline after the label (e.g. "SAVE 33%") */
  badge?: React.ReactNode;
  /** Disable this specific option */
  disabled?: boolean;
}

export interface StyledRadioColors {
  /** Active dot + border colour. Default: theme.colors.gray[900] */
  active?: string;
  /** Inactive ring colour. Default: theme.colors.gray[300] */
  inactive?: string;
  /** Selected card background. Default: transparent tint of `active` */
  selectedCardBg?: string;
  /** Selected card border. Default: `active` */
  selectedCardBorder?: string;
  /** Unselected card border. Default: theme.colors.gray[200] */
  unselectedCardBorder?: string;
  /** Label colour. Default: theme.colors.gray[900] */
  label?: string;
  /** Subtitle colour. Default: theme.colors.gray[400] */
  subtitle?: string;
}

export interface StyledRadioGroupProps<T extends string | number = string> {
  /** Array of options to render */
  options: RadioOption<T>[];
  /** Controlled selected value */
  value?: T;
  /** Initial value for uncontrolled mode */
  defaultValue?: T;
  /** Called when selection changes */
  onChange?: (value: T) => void;
  /** Visual layout variant. Default: 'list' */
  variant?: RadioVariant;
  /** Dot size preset. Default: 'md' */
  size?: RadioSize;
  /** Section title shown above the group (for 'boxed' variant) */
  title?: string;
  /** Colour overrides */
  colors?: StyledRadioColors;
  /** Number of columns for 'card' variant. Default: 3 */
  columns?: number;
  /** Gap between card items. Default: 10 */
  gap?: number;
}

// ─── Size tokens ──────────────────────────────────────────────────────────────

const RADIO_SIZE: Record<RadioSize, { outer: number; inner: number; border: number }> = {
  sm: { outer: 16, inner: 7,  border: 1.5 },
  md: { outer: 20, inner: 9,  border: 2   },
  lg: { outer: 24, inner: 11, border: 2.5 },
};

// ─── StyledRadio (the dot itself) ─────────────────────────────────────────────

/**
 * The raw animated radio dot — use this directly if you need
 * a custom layout, or use StyledRadioGroup for the full component.
 *
 * @example
 * <StyledRadio selected={isSelected} color="#2563eb" size="md" />
 */
export const StyledRadio: React.FC<{
  selected:  boolean;
  color?:    string;
  inactive?: string;
  size?:     RadioSize;
  onPress?:  () => void;
  disabled?: boolean;
}> = ({
  selected,
  color    = theme.colors.gray[900],
  inactive = theme.colors.gray[300],
  size     = 'md',
  onPress,
  disabled = false,
}) => {
  const S      = RADIO_SIZE[size];
  const scaleAnim = React.useRef(new Animated.Value(selected ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue:         selected ? 1 : 0,
      duration:        180,
      easing:          Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [selected]);

  const dot = (
    <Stack
      width={S.outer}
      height={S.outer}
      borderRadius={S.outer / 2}
      borderWidth={S.border}
      borderColor={selected ? color : inactive}
      alignItems="center"
      justifyContent="center"
      backgroundColor={palettes.white}
      opacity={disabled ? 0.4 : 1}
    >
      <Animated.View
        style={{
          width:           S.inner,
          height:          S.inner,
          borderRadius:    S.inner / 2,
          backgroundColor: color,
          transform:       [{ scale: scaleAnim }],
        }}
      />
    </Stack>
  );

  if (!onPress) return dot;

  return (
    <StyledPressable onPress={disabled ? undefined : onPress}>
      {dot}
    </StyledPressable>
  );
};

// ─── Internal: default colour resolver ───────────────────────────────────────

function resolveColors(overrides?: StyledRadioColors): Required<StyledRadioColors> {
  const active = overrides?.active ?? theme.colors.gray[900];
  return {
    active,
    inactive:             overrides?.inactive             ?? theme.colors.gray[300],
    selectedCardBg:       overrides?.selectedCardBg       ?? `${active}0d`,
    selectedCardBorder:   overrides?.selectedCardBorder   ?? active,
    unselectedCardBorder: overrides?.unselectedCardBorder ?? theme.colors.gray[200],
    label:                overrides?.label                ?? theme.colors.gray[900],
    subtitle:             overrides?.subtitle             ?? theme.colors.gray[400],
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
export function StyledRadioGroup<T extends string | number = string>({
  options,
  value:        controlledValue,
  defaultValue,
  onChange,
  variant  = 'list',
  size     = 'md',
  title,
  colors:  colorsProp,
  columns  = 3,
  gap      = 10,
}: StyledRadioGroupProps<T>) {
  const C = resolveColors(colorsProp);

  const isControlled  = controlledValue !== undefined;
  const [local, setLocal] = useState<T | undefined>(defaultValue);
  const selected = isControlled ? controlledValue! : local;

  const handleSelect = (val: T) => {
    if (!isControlled) setLocal(val);
    onChange?.(val);
  };

  // ── Card variant: horizontal grid ─────────────────────────────────────────
  if (variant === 'card') {
    return (
      <Stack>
        {/* Render rows of `columns` items */}
        {chunk(options, columns).map((row, ri) => (
          <Stack key={ri} horizontal gap={gap} marginBottom={ri < Math.ceil(options.length / columns) - 1 ? gap : 0}>
            {row.map((opt) => {
              const isSelected = opt.value === selected;
              return (
                <StyledPressable
                  key={String(opt.value)}
                  flex={1}
                  onPress={() => !opt.disabled && handleSelect(opt.value)}
                  borderRadius={12}
                  borderWidth={1.5}
                  borderColor={isSelected ? C.selectedCardBorder : C.unselectedCardBorder}
                  backgroundColor={isSelected ? C.selectedCardBg : palettes.white}
                  padding={14}
                  opacity={opt.disabled ? 0.4 : 1}
                >
                  <Stack justifyContent="space-between" flex={1} gap={8}>
                    {/* Top: label + radio */}
                    <Stack horizontal alignItems="flex-start" justifyContent="space-between">
                      <StyledText
                        fontSize={theme.fontSize.normal}
                        fontWeight={theme.fontWeight.semiBold}
                        color={isSelected ? C.active : C.label}
                        flex={1}
                        marginRight={6}
                      >
                        {opt.label}
                      </StyledText>
                      <StyledRadio
                        selected={isSelected}
                        color={C.active}
                        inactive={C.inactive}
                        size={size}
                      />
                    </Stack>

                    {/* Subtitle */}
                    {opt.subtitle && (
                      <StyledText
                        fontSize={theme.fontSize.small}
                        color={isSelected ? C.active : C.subtitle}
                      >
                        {opt.subtitle}
                      </StyledText>
                    )}

                    {/* Right content (price) */}
                    {opt.rightContent && (
                      <Stack>
                        {opt.rightContent}
                      </Stack>
                    )}
                  </Stack>
                </StyledPressable>
              );
            })}
            {/* Fill empty cells in last row */}
            {row.length < columns &&
              Array.from({ length: columns - row.length }).map((_, i) => (
                <Stack key={`empty-${i}`} flex={1} />
              ))}
          </Stack>
        ))}
      </Stack>
    );
  }

  // ── Boxed variant: card wrapper with title + list inside ──────────────────
  if (variant === 'boxed') {
    return (
      <StyledCard
        backgroundColor={palettes.white}
        borderRadius={16}
        padding={16}
        shadow="light"
      >
        {title && (
          <>
            <StyledText
              fontSize={theme.fontSize.medium}
              fontWeight={theme.fontWeight.bold}
              color={C.label}
              marginBottom={14}
            >
              {title}
            </StyledText>
          </>
        )}
        {options.map((opt, idx) => {
          const isSelected = opt.value === selected;
          const isLast     = idx === options.length - 1;
          return (
            <Stack key={String(opt.value)}>
              <StyledPressable
               flexDirection='row'
                alignItems="center"
                justifyContent="space-between"
                paddingVertical={13}
                onPress={() => !opt.disabled && handleSelect(opt.value)}
                opacity={opt.disabled ? 0.4 : 1}
              >
                {/* Left: radio + labels */}
                <Stack horizontal alignItems="center" gap={12} flex={1}>
                  {opt.leadingContent}
                  <StyledRadio
                    selected={isSelected}
                    color={C.active}
                    inactive={C.inactive}
                    size={size}
                  />
                  <Stack flex={1} gap={2}>
                    <StyledText
                      fontSize={theme.fontSize.normal}
                      fontWeight={isSelected ? theme.fontWeight.semiBold : theme.fontWeight.normal}
                      color={C.label}
                    >
                      {opt.label}
                    </StyledText>
                    {opt.subtitle && (
                      <StyledText fontSize={theme.fontSize.small} color={C.subtitle}>
                        {opt.subtitle}
                      </StyledText>
                    )}
                  </Stack>
                </Stack>

                {/* Right content */}
                {opt.rightContent && (
                  <Stack alignItems="flex-end">
                    {opt.rightContent}
                  </Stack>
                )}
              </StyledPressable>

              {!isLast && <StyledDivider borderBottomColor={theme.colors.gray[100]} />}
            </Stack>
          );
        })}
      </StyledCard>
    );
  }

  // ── List variant: standalone rows with full-row border ────────────────────
  return (
    <Stack gap={10}>
      {options.map((opt) => {
        const isSelected = opt.value === selected;
        return (
          <StyledPressable
            key={String(opt.value)}
            flexDirection='row'
            alignItems="center"
            justifyContent="space-between"
            borderRadius={14}
            borderWidth={1.5}
            borderColor={isSelected ? C.selectedCardBorder : C.unselectedCardBorder}
            backgroundColor={isSelected ? C.selectedCardBg : palettes.white}
            paddingHorizontal={16}
            paddingVertical={14}
            onPress={() => !opt.disabled && handleSelect(opt.value)}
            opacity={opt.disabled ? 0.4 : 1}
          >
            {/* Left: radio + label + badge */}
            <Stack horizontal alignItems="center" gap={12} flex={1}>
              {opt.leadingContent}
              <StyledRadio
                selected={isSelected}
                color={C.active}
                inactive={C.inactive}
                size={size}
              />
              <StyledText
                fontSize={theme.fontSize.normal}
                fontWeight={isSelected ? theme.fontWeight.semiBold : theme.fontWeight.normal}
                color={C.label}
              >
                {opt.label}
              </StyledText>
              {opt.badge}
            </Stack>

            {/* Right content */}
            {opt.rightContent && (
              <Stack alignItems="flex-end">
                {opt.rightContent}
              </Stack>
            )}
          </StyledPressable>
        );
      })}
    </Stack>
  );
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}

export default StyledRadioGroup;