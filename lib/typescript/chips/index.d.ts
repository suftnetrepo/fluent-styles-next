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
import React from 'react';
export type ChipVariant = 'outlined' | 'filled' | 'smooth' | 'ingredient' | 'likeable' | 'icon';
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
export declare const StyledChip: React.FC<StyledChipProps>;
export default StyledChip;
//# sourceMappingURL=index.d.ts.map