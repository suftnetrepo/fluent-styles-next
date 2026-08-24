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
 * FIX (v1.1):
 *  The previous version had a useEffect(() => setLocalLow(value), [value])
 *  that created a feedback loop when used as a controlled component:
 *    onValueChange → setState → re-render → value prop changes
 *    → useEffect fires → setLocalLow resets → thumb snaps back
 *
 *  Fix strategy:
 *    1. useEffect only fires on MOUNT (empty dep array) — sets initial position once
 *    2. External value changes are ignored while dragging (dragging ref guard)
 *    3. External value changes ARE applied when not dragging (programmatic updates work)
 *    4. onValueChange fires continuously during drag (for live display updates)
 *    5. onSlidingComplete fires once on finger lift (for committing to state)
 *
 *  Correct usage in parent (controlled, live display):
 *    const displayRef = useRef(initialValue)          // never causes re-render
 *    const [display, setDisplay] = useState(initialValue)
 *    <StyledSlider
 *      value={initialValue}                           // ← frozen, never updated
 *      onValueChange={v => { displayRef.current = v; setDisplay(v) }}
 *      onSlidingComplete={v => commitToState(v)}
 *    />
 *
 *  Simplest usage (fire-and-forget):
 *    <StyledSlider
 *      value={28}
 *      onSlidingComplete={v => saveValue(v)}
 *    />
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