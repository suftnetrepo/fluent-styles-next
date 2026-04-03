import React, { useRef, useEffect, useState } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';
import Svg, {
  Rect,
  Path,
  G,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Line,
  Text as SvgText,
} from 'react-native-svg';
import { theme, palettes } from 'fluent-styles';

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Default colours (uses theme + palettes tokens) ───────────────────────────

const buildDefaults = (): Required<StyledBarColors> => ({
  inactiveBar:          theme.colors.gray[200],
  hatchLine:            'rgba(0,0,0,0.07)',
  activeTop:            '#d4f53c',
  activeBottom:         '#a8c820',
  tooltipBg:            theme.colors.gray[900],
  tooltipText:          palettes.white,
  activeLabelColor:     theme.colors.gray[900],
  inactiveLabelColor:   theme.colors.gray[400],
});

// ─── Internal: hatched bar ────────────────────────────────────────────────────

interface HatchedBarProps {
  id: string;
  x: number; y: number; w: number; h: number; rx: number;
  fill: string;
  hatchColor: string;
  hatchSpacing: number;
  showHatch: boolean;
}

const HatchedBar: React.FC<HatchedBarProps> = ({
  id, x, y, w, h, rx, fill, hatchColor, hatchSpacing, showHatch,
}) => {
  const lines: React.ReactNode[] = [];
  if (showHatch) {
    for (let off = -h; off < w + h; off += hatchSpacing) {
      lines.push(
        <Line
          key={off}
          x1={x + off}     y1={y}
          x2={x + off + h} y2={y + h}
          stroke={hatchColor}
          strokeWidth="5"
        />,
      );
    }
  }
  return (
    <G>
      <Defs>
        <ClipPath id={id}>
          <Rect x={x} y={y} width={w} height={h} rx={rx} />
        </ClipPath>
      </Defs>
      <Rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} />
      {showHatch && <G clipPath={`url(#${id})`}>{lines}</G>}
    </G>
  );
};

// ─── Internal: tooltip ────────────────────────────────────────────────────────

interface TooltipProps {
  cx: number;
  barTop: number;
  label: string;
  bgColor: string;
  textColor: string;
}

const Tooltip: React.FC<TooltipProps> = ({ cx, barTop, label, bgColor, textColor }) => {
  const HEIGHT = 32;
  const boxW   = Math.max(label.length * 8 + 28, 60);
  const boxX   = cx - boxW / 2;
  const boxY   = barTop - HEIGHT - 14;

  return (
    <G>
      <Rect x={boxX} y={boxY} width={boxW} height={HEIGHT} rx={HEIGHT / 2} fill={bgColor} />
      <Path
        d={`M ${cx - 7} ${boxY + HEIGHT} L ${cx + 7} ${boxY + HEIGHT} L ${cx} ${boxY + HEIGHT + 9}`}
        fill={bgColor}
      />
      <SvgText
        x={cx}
        y={boxY + HEIGHT / 2 + 5}
        textAnchor="middle"
        fontSize={theme.fontSize.small}
        fontWeight={theme.fontWeight.bold}
        fill={textColor}
        fontFamily="System"
      >
        {label}
      </SvgText>
    </G>
  );
};

// ─── StyledBar ────────────────────────────────────────────────────────────────

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
export const StyledBar: React.FC<StyledBarProps> = ({
  data,
  maxValue: maxValueProp,
  width: widthProp,
  containerPaddingHorizontal = 80,
  height       = 180,
  barWidthRatio = 0.62,
  labelHeight  = 28,
  showHatch    = true,
  hatchSpacing = 8,
  tooltipLabel,
  unit         = '',
  colors: colorsProp,
  animated     = true,
  animationDuration = 600,
}) => {
  const C = { ...buildDefaults(), ...colorsProp };

  // ── Width: respect container padding ──────────────────────────────────────
  const screenW  = Dimensions.get('window').width;
  const chartW   = widthProp ?? screenW - containerPaddingHorizontal;

  const count    = data.length;
  const slotW    = chartW / count;
  const barW     = slotW * barWidthRatio;
  const barPad   = (slotW - barW) / 2;
  const rx       = barW / 2;

  // ── Scale ─────────────────────────────────────────────────────────────────
  const maxValue = maxValueProp
    ?? Math.max(...data.map(d => d.value ?? 0), 1);

  // Extra space at top for tooltip bubble
  const tooltipReserve = 52;
  const plotH          = height;
  const svgH           = tooltipReserve + plotH + labelHeight;

  // ── Active bar ────────────────────────────────────────────────────────────
  const activeIdx   = data.findIndex(d => d.active);
  const activeDatum = activeIdx >= 0 ? data[activeIdx] : null;

  const resolvedTooltip = tooltipLabel
    ?? (activeDatum?.value != null
      ? `${activeDatum.value}${unit ? ' ' + unit : ''}`
      : '');

  // ── Animation ─────────────────────────────────────────────────────────────
  const animValue = useRef(new Animated.Value(animated ? 0 : 1)).current;
  const [progress, setProgress] = useState(animated ? 0 : 1);

  useEffect(() => {
    if (!animated) return;
    const id = animValue.addListener(({ value }) => setProgress(value));
    Animated.timing(animValue, {
      toValue:         1,
      duration:        animationDuration,
      easing:          Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    return () => animValue.removeListener(id);
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <Svg width={chartW} height={svgH}>
      {data.map((d, i) => {
        const rawH     = d.value != null
          ? (d.value / maxValue) * plotH
          : plotH * 0.38;
        const bh       = rawH * progress;
        const bx       = i * slotW + barPad;
        const baseline = tooltipReserve + plotH;
        const by       = baseline - bh;
        const cx       = bx + barW / 2;
        const isActive = !!d.active;
        const hasValue = d.value != null;

        return (
          <G key={`bar-${i}`}>
            {isActive ? (
              <G>
                <Defs>
                  <LinearGradient id={`ag${i}`} x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0%"   stopColor={C.activeTop}    stopOpacity="1"    />
                    <Stop offset="100%" stopColor={C.activeBottom} stopOpacity="0.8"  />
                  </LinearGradient>
                </Defs>
                <Rect x={bx} y={by} width={barW} height={bh} rx={rx} fill={`url(#ag${i})`} />
              </G>
            ) : (
              <HatchedBar
                id={`hb-${i}`}
                x={bx} y={by} w={barW} h={bh} rx={rx}
                fill={C.inactiveBar}
                hatchColor={C.hatchLine}
                hatchSpacing={hatchSpacing}
                showHatch={showHatch && hasValue}
              />
            )}

            {/* X-axis label */}
            <SvgText
              x={cx}
              y={tooltipReserve + plotH + labelHeight - 4}
              textAnchor="middle"
              fontSize={theme.fontSize.small}
              fill={isActive ? C.activeLabelColor : C.inactiveLabelColor}
              fontWeight={isActive ? theme.fontWeight.bold : theme.fontWeight.normal}
              fontFamily="System"
            >
              {d.label}
            </SvgText>
          </G>
        );
      })}

      {/* Tooltip — rendered last so it paints above bars */}
      {activeIdx >= 0 && resolvedTooltip && progress > 0.4 && (() => {
        const bx    = activeIdx * slotW + barPad;
        const cx    = bx + barW / 2;
        const rawH  = (activeDatum!.value ?? plotH * 0.38) / maxValue * plotH;
        const bh    = rawH * progress;
        const barTop = tooltipReserve + plotH - bh;
        return (
          <Tooltip
            cx={cx}
            barTop={barTop}
            label={resolvedTooltip}
            bgColor={C.tooltipBg}
            textColor={C.tooltipText}
          />
        );
      })()}
    </Svg>
  );
};

export default StyledBar;