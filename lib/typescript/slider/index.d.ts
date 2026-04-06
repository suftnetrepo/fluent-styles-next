/**
 * StyledSlider.tsx
 * ─────────────────
 * Production-ready animated slider component for fluent-styles apps.
 *
 * Variants:
 *  • default    — single thumb, fill left of thumb
 *  • range      — two thumbs, fill between them
 *  • stepped    — snaps to discrete tick marks
 *  • gradient   — gradient-filled track
 *  • buffer     — primary thumb + secondary buffer fill (media player style)
 *
 * Tooltip fix (three-layer layout):
 *  • Track fill lives in its own overflow:hidden View
 *  • Thumbs + tooltips live in a sibling overflow:visible wrapper
 *  • SVG <Path> triangle pointer — never clips, always sharp
 *  • useNativeDriver: false for tooltipAnim so text colour renders correctly on iOS
 */
import React from "react";
export type SliderVariant = "default" | "range" | "stepped" | "gradient" | "buffer";
export type SliderSize = "sm" | "md" | "lg";
export interface StyledSliderColors {
    fill?: string;
    track?: string;
    buffer?: string;
    thumb?: string;
    thumbBorder?: string;
    gradFrom?: string;
    gradTo?: string;
    tooltipBg?: string;
    tooltipText?: string;
    rangeLabel?: string;
    tick?: string;
    tickActive?: string;
}
export interface StyledSliderProps {
    value: number;
    valueHigh?: number;
    bufferValue?: number;
    min?: number;
    max?: number;
    step?: number;
    variant?: SliderVariant;
    size?: SliderSize;
    showTooltip?: boolean;
    alwaysShowTooltip?: boolean;
    showMinMax?: boolean;
    steps?: number;
    formatLabel?: (value: number) => string;
    width?: number;
    disabled?: boolean;
    colors?: StyledSliderColors;
    onValueChange?: (value: number) => void;
    onSlidingComplete?: (value: number) => void;
    onRangeChange?: (low: number, high: number) => void;
    onRangeComplete?: (low: number, high: number) => void;
}
export declare const StyledSlider: React.FC<StyledSliderProps>;
export default StyledSlider;
//# sourceMappingURL=index.d.ts.map