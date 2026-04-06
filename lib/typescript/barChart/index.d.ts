import React from 'react';
export interface StyledBarDatum {
    /** X-axis label shown below the bar */
    label: string;
    /**
     * Numeric value for this bar.
     * Pass `null` or `undefined` to render a short placeholder (grey, hatched).
     */
    value?: number | null;
    /** Mark this bar as the highlighted/active bar */
    active?: boolean;
}
export interface StyledBarColors {
    /** Fill of inactive bars. Default: palettes.gray[200] */
    inactiveBar?: string;
    /** Hatch line colour on inactive bars. Default: rgba(0,0,0,0.07) */
    hatchLine?: string;
    /** Gradient top colour for the active bar. Default: '#d4f53c' */
    activeTop?: string;
    /** Gradient bottom colour for the active bar. Default: '#a8c820' */
    activeBottom?: string;
    /** Tooltip background. Default: theme.colors.gray[900] */
    tooltipBg?: string;
    /** Tooltip text colour. Default: palettes.white */
    tooltipText?: string;
    /** Active label colour. Default: theme.colors.gray[900] */
    activeLabelColor?: string;
    /** Inactive label colour. Default: theme.colors.gray[400] */
    inactiveLabelColor?: string;
}
export interface StyledBarProps {
    /** Array of data points to render */
    data: StyledBarDatum[];
    /**
     * Maximum value used to scale bar heights.
     * Defaults to the max value found in `data`.
     */
    maxValue?: number;
    /**
     * Explicit pixel width for the chart SVG.
     *
     * ⚠️  IMPORTANT — account for your container's horizontal padding:
     *   - Inside a card with padding={20}: width = screenWidth - outerPad*2 - cardPad*2
     *   - Leave undefined to use the `containerPaddingHorizontal` auto-calculation.
     */
    width?: number;
    /**
     * Total horizontal padding of ALL ancestor containers combined (both sides).
     * Used only when `width` is not provided.
     *
     * Example: screen paddingHorizontal=20 + card padding=20 → containerPaddingHorizontal=80
     *
     * Default: 80 (assumes 20px screen padding + 20px card padding on each side)
     */
    containerPaddingHorizontal?: number;
    /** Height of the bar plot area (excluding labels). Default: 180 */
    height?: number;
    /** Fraction of the slot width occupied by each bar (0–1). Default: 0.62 */
    barWidthRatio?: number;
    /** Space reserved at the bottom for day labels. Default: 28 */
    labelHeight?: number;
    /** Whether to show diagonal hatch lines on inactive bars. Default: true */
    showHatch?: boolean;
    /** Spacing between hatch lines in px. Default: 8 */
    hatchSpacing?: number;
    /**
     * Override the tooltip text entirely.
     * Leave undefined to auto-generate from the active bar's value + unit.
     */
    tooltipLabel?: string;
    /**
     * Unit string appended after the value in the auto tooltip.
     * e.g. 'min', 'kg', '°C', 'mL'. Default: ''
     */
    unit?: string;
    /** Colour overrides — all optional, merged over the default lime theme */
    colors?: StyledBarColors;
    /**
     * Animate bars growing up from zero on mount. Default: true
     */
    animated?: boolean;
    /** Animation duration in ms. Default: 600 */
    animationDuration?: number;
}
/**
 * StyledBar — production-ready animated bar chart for fluent-styles apps.
 *
 * @example Basic (workout, lime theme)
 * ```tsx
 * <StyledBar
 *   data={[
 *     { label: 'Mon', value: 45 },
 *     { label: 'Tue', value: 70, active: true },
 *     { label: 'Wed', value: 55 },
 *   ]}
 *   unit="min"
 * />
 * ```
 *
 * @example Inside a StyledCard with padding={20}, screen padding=20
 * ```tsx
 * // containerPaddingHorizontal = (screenPad + cardPad) * 2 = (20+20)*2 = 80
 * <StyledCard padding={20}>
 *   <StyledBar data={data} unit="kg" containerPaddingHorizontal={80} />
 * </StyledCard>
 * ```
 *
 * @example Blue water theme
 * ```tsx
 * <StyledBar
 *   data={waterData}
 *   unit="mL"
 *   maxValue={3000}
 *   colors={{
 *     activeTop: palettes.blue[400],
 *     activeBottom: palettes.blue[600],
 *     tooltipBg: palettes.blue[900],
 *     inactiveBar: palettes.blue[100],
 *   }}
 * />
 * ```
 */
export declare const StyledBar: React.FC<StyledBarProps>;
export default StyledBar;
//# sourceMappingURL=index.d.ts.map