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
import React from 'react';
export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioVariant = 'list' | 'card' | 'boxed';
export interface RadioOption<T extends string | number = string> {
    /** Unique value for this option */
    value: T;
    /** Primary label */
    label: string;
    color?: string;
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
/**
 * The raw animated radio dot — use this directly if you need
 * a custom layout, or use StyledRadioGroup for the full component.
 *
 * @example
 * <StyledRadio selected={isSelected} color="#2563eb" size="md" />
 */
export declare const StyledRadio: React.FC<{
    selected: boolean;
    color?: string;
    inactive?: string;
    size?: RadioSize;
    onPress?: () => void;
    disabled?: boolean;
}>;
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
export declare function StyledRadioGroup<T extends string | number = string>({ options, value: controlledValue, defaultValue, onChange, variant, size, title, colors: colorsProp, columns, gap, }: StyledRadioGroupProps<T>): React.JSX.Element;
export default StyledRadioGroup;
//# sourceMappingURL=index.d.ts.map