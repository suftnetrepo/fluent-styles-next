/**
 * StyledProgressBar.tsx
 * ──────────────────────
 * Production-ready animated progress bar component for fluent-styles apps.
 *
 * Variants:
 *  • default   — flat filled bar
 *  • striped   — diagonal animated stripes
 *  • gradient  — left-to-right colour gradient
 *  • segmented — divided into equal tick segments
 *  • buffer    — primary bar + secondary buffer track (video/audio style)
 *
 * Sizes:     xs | sm | md | lg | xl
 * Label pos: none | inside | above | below | right
 * Shape:     rounded | square | pill
 */
import React from 'react';
export type ProgressVariant = 'default' | 'striped' | 'gradient' | 'segmented' | 'buffer';
export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ProgressShape = 'rounded' | 'square' | 'pill';
export type LabelPosition = 'none' | 'inside' | 'above' | 'below' | 'right';
export interface StyledProgressColors {
    /** Filled track colour (default / striped / segmented). Default: theme.colors.blue[500] */
    fill?: string;
    /** Background track colour. Default: theme.colors.gray[100] */
    track?: string;
    /** Buffer track colour (buffer variant). Default: theme.colors.gray[300] */
    buffer?: string;
    /** Stripe overlay colour (striped variant). Default: rgba(255,255,255,0.25) */
    stripe?: string;
    /** Gradient start colour (gradient variant). Default: theme.colors.blue[400] */
    gradFrom?: string;
    /** Gradient end colour (gradient variant). Default: theme.colors.indigo[600] */
    gradTo?: string;
    /** Label text colour. Default: theme.colors.gray[700] */
    label?: string;
    /** Inside label colour (when bar is filled). Default: palettes.white */
    labelInside?: string;
}
export interface StyledProgressBarProps {
    /**
     * Current progress value (0–`total`). Required.
     */
    value: number;
    /**
     * Maximum value. Default: 100
     */
    total?: number;
    /**
     * Buffer value for the `buffer` variant (e.g. how much is loaded).
     * Must be ≥ `value`. Default: same as `value`.
     */
    bufferValue?: number;
    /** Visual style. Default: 'default' */
    variant?: ProgressVariant;
    /** Height preset. Default: 'md' */
    size?: ProgressSize;
    /** Bar end shape. Default: 'rounded' */
    shape?: ProgressShape;
    /**
     * Where to show the percentage / custom label.
     * Default: 'none'
     */
    labelPosition?: LabelPosition;
    /**
     * Custom label string. If omitted, shows auto percentage.
     * Pass `false` to hide label entirely even when labelPosition is set.
     */
    label?: string | false;
    /**
     * Show step count (e.g. "3 / 9") instead of percentage.
     * Only used when `label` is not provided.
     */
    showSteps?: boolean;
    /**
     * Number of segments for `segmented` variant. Default: 5
     */
    segments?: number;
    /**
     * Gap between segments in px. Default: 3
     */
    segmentGap?: number;
    /**
     * Explicit pixel width. Defaults to full container width.
     */
    width?: number;
    /**
     * Animate the fill on mount / value change. Default: true
     */
    animated?: boolean;
    /**
     * Animation duration in ms. Default: 600
     */
    animationDuration?: number;
    /** Colour overrides */
    colors?: StyledProgressColors;
    /** Called when animation completes */
    onAnimationComplete?: () => void;
}
/**
 * StyledProgressBar — animated, multi-variant progress indicator.
 *
 * @example Basic (default, blue fill)
 * ```tsx
 * <StyledProgressBar value={65} />
 * ```
 *
 * @example With label above + percentage
 * ```tsx
 * <StyledProgressBar value={65} labelPosition="above" />
 * ```
 *
 * @example Gradient variant
 * ```tsx
 * <StyledProgressBar
 *   value={72}
 *   variant="gradient"
 *   size="lg"
 *   labelPosition="right"
 *   colors={{ gradFrom: '#6366f1', gradTo: '#22d3ee' }}
 * />
 * ```
 *
 * @example Segmented (workout sets)
 * ```tsx
 * <StyledProgressBar
 *   value={4}
 *   total={9}
 *   variant="segmented"
 *   segments={9}
 *   showSteps
 *   labelPosition="right"
 *   colors={{ fill: '#8bc34a' }}
 * />
 * ```
 *
 * @example Buffer (media player)
 * ```tsx
 * <StyledProgressBar
 *   value={30}
 *   bufferValue={60}
 *   variant="buffer"
 *   size="sm"
 *   colors={{ fill: '#2563eb', buffer: '#bfdbfe' }}
 * />
 * ```
 *
 * @example Striped (active task)
 * ```tsx
 * <StyledProgressBar value={45} variant="striped" size="lg" labelPosition="inside" />
 * ```
 */
export declare const StyledProgressBar: React.FC<StyledProgressBarProps>;
export default StyledProgressBar;
//# sourceMappingURL=index.d.ts.map