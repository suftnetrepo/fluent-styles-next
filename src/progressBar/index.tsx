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

import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Rect,
  ClipPath,
} from 'react-native-svg';
import {
  Stack,
  StyledText,
  theme,
  palettes,
} from 'fluent-styles';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProgressVariant = 'default' | 'striped' | 'gradient' | 'segmented' | 'buffer';
export type ProgressSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ProgressShape   = 'rounded' | 'square' | 'pill';
export type LabelPosition   = 'none' | 'inside' | 'above' | 'below' | 'right';

export interface StyledProgressColors {
  /** Filled track colour (default / striped / segmented). Default: theme.colors.blue[500] */
  fill?:       string;
  /** Background track colour. Default: theme.colors.gray[100] */
  track?:      string;
  /** Buffer track colour (buffer variant). Default: theme.colors.gray[300] */
  buffer?:     string;
  /** Stripe overlay colour (striped variant). Default: rgba(255,255,255,0.25) */
  stripe?:     string;
  /** Gradient start colour (gradient variant). Default: theme.colors.blue[400] */
  gradFrom?:   string;
  /** Gradient end colour (gradient variant). Default: theme.colors.indigo[600] */
  gradTo?:     string;
  /** Label text colour. Default: theme.colors.gray[700] */
  label?:      string;
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

// ─── Size tokens ──────────────────────────────────────────────────────────────

const SIZE_H: Record<ProgressSize, number> = {
  xs: 3,
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
};

const LABEL_SIZE: Record<ProgressSize, number> = {
  xs: 10,
  sm: 10,
  md: 11,
  lg: 12,
  xl: 13,
};

// ─── Shape → border radius ────────────────────────────────────────────────────

function getBR(shape: ProgressShape, h: number): number {
  if (shape === 'square') return 0;
  if (shape === 'pill')   return 999;
  return h / 2; // rounded
}

// ─── Default colours ──────────────────────────────────────────────────────────

function buildColors(o?: StyledProgressColors): Required<StyledProgressColors> {
  return {
    fill:        o?.fill        ?? (theme.colors.blue?.[500]   ?? '#3b82f6'),
    track:       o?.track       ?? theme.colors.gray[100],
    buffer:      o?.buffer      ?? theme.colors.gray[300],
    stripe:      o?.stripe      ?? 'rgba(255,255,255,0.25)',
    gradFrom:    o?.gradFrom    ?? (theme.colors.blue?.[400]   ?? '#60a5fa'),
    gradTo:      o?.gradTo      ?? (theme.colors.indigo?.[600] ?? '#4f46e5'),
    label:       o?.label       ?? theme.colors.gray[700],
    labelInside: o?.labelInside ?? palettes.white,
  };
}

// ─── Striped fill (SVG hatch) ─────────────────────────────────────────────────

const StripedFill: React.FC<{
  width:       number;
  height:      number;
  fillColor:   string;
  stripeColor: string;
  borderRadius: number;
  progress:    Animated.Value; // 0–1
}> = ({ width, height, fillColor, stripeColor, borderRadius, progress }) => {
  const [w, setW] = useState(0);

  // Drive width via JS listener since SVG can't use Animated natively
  useEffect(() => {
    const id = progress.addListener(({ value }) => setW(value * width));
    return () => progress.removeListener(id);
  }, [width]);

  const lines: React.ReactNode[] = [];
  const spacing = 12;
  for (let x = -height; x < w + height; x += spacing) {
    lines.push(
      <Rect
        key={x}
        x={x}
        y={0}
        width={6}
        height={height}
        fill={stripeColor}
        transform={`skewX(-20)`}
      />,
    );
  }

  return (
    <Svg width={width} height={height} style={{ position: 'absolute', left: 0, top: 0 }}>
      <Defs>
        <ClipPath id="bar-clip">
          <Rect x={0} y={0} width={w} height={height} rx={borderRadius} />
        </ClipPath>
      </Defs>
      <Rect x={0} y={0} width={w} height={height} rx={borderRadius} fill={fillColor} />
      <Rect
        x={0} y={0}
        width={w} height={height}
        rx={borderRadius}
        fill="transparent"
        clipPath="url(#bar-clip)"
      />
      {lines.map((l) => (
        <Svg key={(l as any).key} clipPath="url(#bar-clip)" width={w} height={height}>
          {l}
        </Svg>
      ))}
    </Svg>
  );
};

// ─── Gradient fill (SVG) ──────────────────────────────────────────────────────

const GradientFill: React.FC<{
  totalWidth:   number;
  height:       number;
  gradFrom:     string;
  gradTo:       string;
  borderRadius: number;
  progress:     Animated.Value;
}> = ({ totalWidth, height, gradFrom, gradTo, borderRadius, progress }) => {
  const [w, setW] = useState(0);

  useEffect(() => {
    const id = progress.addListener(({ value }) => setW(value * totalWidth));
    return () => progress.removeListener(id);
  }, [totalWidth]);

  return (
    <Svg
      width={totalWidth}
      height={height}
      style={{ position: 'absolute', left: 0, top: 0 }}
    >
      <Defs>
        <LinearGradient id="pg" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%"   stopColor={gradFrom} stopOpacity="1" />
          <Stop offset="100%" stopColor={gradTo}   stopOpacity="1" />
        </LinearGradient>
        <ClipPath id="grad-clip">
          <Rect x={0} y={0} width={w} height={height} rx={borderRadius} />
        </ClipPath>
      </Defs>
      <Rect
        x={0} y={0}
        width={totalWidth} height={height}
        rx={borderRadius}
        fill="url(#pg)"
        clipPath="url(#grad-clip)"
      />
    </Svg>
  );
};

// ─── StyledProgressBar ────────────────────────────────────────────────────────

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
export const StyledProgressBar: React.FC<StyledProgressBarProps> = ({
  value,
  total             = 100,
  bufferValue,
  variant           = 'default',
  size              = 'md',
  shape             = 'rounded',
  labelPosition     = 'none',
  label,
  showSteps         = false,
  segments          = 5,
  segmentGap        = 3,
  width:            widthProp,
  animated:         anim = true,
  animationDuration = 600,
  colors:           colorsProp,
  onAnimationComplete,
}) => {
  const C      = buildColors(colorsProp);
  const h      = SIZE_H[size];
  const br     = getBR(shape, h);
  const pct    = Math.min(Math.max(value / total, 0), 1);
  const bufPct = Math.min(Math.max((bufferValue ?? value) / total, 0), 1);

  // Auto-measure container width
  const [containerW, setContainerW] = useState(widthProp ?? 0);
  const barW = widthProp ?? containerW;

  // Animation
  const animVal = useRef(new Animated.Value(anim ? 0 : pct)).current;
  const [animPct, setAnimPct] = useState(anim ? 0 : pct);

  useEffect(() => {
    if (!anim) { setAnimPct(pct); return; }
    const id = animVal.addListener(({ value: v }) => setAnimPct(v));
    Animated.timing(animVal, {
      toValue:         pct,
      duration:        animationDuration,
      easing:          Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) onAnimationComplete?.();
    });
    return () => animVal.removeListener(id);
  }, [pct]);

  // Label text
  const labelText = label !== undefined && label !== false
    ? label
    : showSteps
    ? `${value} / ${total}`
    : `${Math.round(animPct * 100)}%`;

  const showLabel = label !== false && labelPosition !== 'none';

  // ── Above label ──────────────────────────────────────────────────────────
  const aboveLabel = showLabel && labelPosition === 'above' ? (
    <Stack horizontal justifyContent="flex-end" marginBottom={4}>
      <StyledText fontSize={LABEL_SIZE[size]} fontWeight={theme.fontWeight.semiBold}
        color={C.label}>
        {labelText}
      </StyledText>
    </Stack>
  ) : null;

  // ── Below label ──────────────────────────────────────────────────────────
  const belowLabel = showLabel && labelPosition === 'below' ? (
    <Stack horizontal justifyContent="flex-end" marginTop={4}>
      <StyledText fontSize={LABEL_SIZE[size]} fontWeight={theme.fontWeight.semiBold}
        color={C.label}>
        {labelText}
      </StyledText>
    </Stack>
  ) : null;

  // ── The bar itself ────────────────────────────────────────────────────────
  const renderBar = () => {
    if (!barW) return null;

    // ── Segmented ──────────────────────────────────────────────────────────
    if (variant === 'segmented') {
      const segW = (barW - segmentGap * (segments - 1)) / segments;
      const filledCount = Math.round(pct * segments);
      return (
        <Stack horizontal gap={segmentGap}>
          {Array.from({ length: segments }, (_, i) => (
            <Stack
              key={i}
              width={segW}
              height={h}
              borderRadius={br}
              backgroundColor={i < filledCount ? C.fill : C.track}
            />
          ))}
        </Stack>
      );
    }

    // ── Buffer ─────────────────────────────────────────────────────────────
    if (variant === 'buffer') {
      return (
        <Stack width={barW} height={h} borderRadius={br} backgroundColor={C.track}
          overflow="hidden">
          {/* Buffer layer */}
          <Stack
            position="absolute"
            left={0} top={0} bottom={0}
            width={`${bufPct * 100}%` as any}
            backgroundColor={C.buffer}
          />
          {/* Fill layer */}
          <Animated.View
            style={{
              position:        'absolute',
              left:            0, top: 0, bottom: 0,
              width:           animVal.interpolate({ inputRange: [0,1], outputRange: ['0%','100%'] }),
              backgroundColor: C.fill,
              borderRadius:    br,
            }}
          />
        </Stack>
      );
    }

    // ── Gradient ───────────────────────────────────────────────────────────
    if (variant === 'gradient') {
      return (
        <Stack width={barW} height={h} borderRadius={br} backgroundColor={C.track}
          overflow="hidden">
          <GradientFill
            totalWidth={barW}
            height={h}
            gradFrom={C.gradFrom}
            gradTo={C.gradTo}
            borderRadius={br}
            progress={animVal}
          />
        </Stack>
      );
    }

    // ── Striped ────────────────────────────────────────────────────────────
    if (variant === 'striped') {
      const insideLabel = showLabel && labelPosition === 'inside' ? (
        <Stack
          position="absolute"
          left={0} top={0} right={0} bottom={0}
          alignItems="center"
          justifyContent="center"
        >
          <StyledText fontSize={LABEL_SIZE[size]} fontWeight="700" color={C.labelInside}>
            {labelText}
          </StyledText>
        </Stack>
      ) : null;
      return (
        <Stack width={barW} height={h} borderRadius={br} backgroundColor={C.track}
          overflow="hidden">
          <StripedFill
            width={barW}
            height={h}
            fillColor={C.fill}
            stripeColor={C.stripe}
            borderRadius={br}
            progress={animVal}
          />
          {insideLabel}
        </Stack>
      );
    }

    // ── Default ────────────────────────────────────────────────────────────
    const insideLabel = showLabel && labelPosition === 'inside' ? (
      <Stack
        position="absolute"
        left={0} top={0} right={0} bottom={0}
        alignItems="center"
        justifyContent="center"
      >
        <StyledText fontSize={LABEL_SIZE[size]} fontWeight="700" color={C.labelInside}>
          {labelText}
        </StyledText>
      </Stack>
    ) : null;

    return (
      <Stack width={barW} height={h} borderRadius={br} backgroundColor={C.track}
        overflow="hidden">
        <Animated.View
          style={{
            width:           animVal.interpolate({ inputRange: [0,1], outputRange: ['0%','100%'] }),
            height:          h,
            borderRadius:    br,
            backgroundColor: C.fill,
          }}
        />
        {insideLabel}
      </Stack>
    );
  };

  // ── Compose layout ─────────────────────────────────────────────────────────
  return (
    <Stack
      onLayout={widthProp ? undefined : (e) => setContainerW(e.nativeEvent.layout.width)}
    >
      {aboveLabel}

      <Stack horizontal alignItems="center" gap={10}>
        <Stack flex={labelPosition === 'right' ? 1 : undefined}
          width={labelPosition === 'right' ? undefined : barW || undefined}>
          {renderBar()}
        </Stack>

        {showLabel && labelPosition === 'right' && (
          <StyledText
            fontSize={LABEL_SIZE[size]}
            fontWeight={theme.fontWeight.semiBold}
            color={C.label}
            minWidth={38}
          >
            {labelText}
          </StyledText>
        )}
      </Stack>

      {belowLabel}
    </Stack>
  );
};

export default StyledProgressBar;