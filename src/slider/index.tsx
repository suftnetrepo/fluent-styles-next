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

import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  PanResponder,
  Animated,
  Easing,
  Dimensions,
  PanResponderGestureState,
} from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect, Path } from "react-native-svg";
import { Stack, StyledText, theme, palettes } from "fluent-styles";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SliderVariant =
  | "default"
  | "range"
  | "stepped"
  | "gradient"
  | "buffer";
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

// ─── Size tokens ──────────────────────────────────────────────────────────────

const TRACK_H: Record<SliderSize, number> = { sm: 4, md: 6, lg: 10 };
const THUMB_D: Record<SliderSize, number> = { sm: 18, md: 24, lg: 32 };

// ─── Colours ──────────────────────────────────────────────────────────────────

function buildColors(o?: StyledSliderColors): Required<StyledSliderColors> {
  const fill = o?.fill ?? "#3b82f6";
  return {
    fill,
    track: o?.track ?? theme.colors.gray[200],
    buffer: o?.buffer ?? theme.colors.gray[300],
    thumb: o?.thumb ?? "#ffffff",
    thumbBorder: o?.thumbBorder ?? fill,
    gradFrom: o?.gradFrom ?? "#60a5fa",
    gradTo: o?.gradTo ?? "#4f46e5",
    tooltipBg: o?.tooltipBg ?? "#111827",
    tooltipText: o?.tooltipText ?? "#ffffff",
    rangeLabel: o?.rangeLabel ?? theme.colors.gray[400],
    tick: o?.tick ?? theme.colors.gray[300],
    tickActive: o?.tickActive ?? fill,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

function snapToStep(
  value: number,
  min: number,
  max: number,
  step: number,
): number {
  const steps = Math.round((value - min) / step);
  return clamp(min + steps * step, min, max);
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────
//
// Self-measuring: measures its own width after first layout, then applies
// translateX = -(width/2) to centre precisely over the thumb.
// Uses useNativeDriver: false for opacity so iOS renders text colour correctly.
// SVG Path triangle — never clips, always pixel-perfect.

const Tooltip: React.FC<{
  visible: Animated.Value;
  label: string;
  bgColor: string;
  textColor: string;
}> = ({ visible, label, bgColor, textColor }) => {
  const [bubbleW, setBubbleW] = useState(0);

  const safeBg = bgColor || "#111827";
  const safeText = textColor || "#ffffff";

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        bottom: "100%",
        left: "50%",
        opacity: visible,
        transform: [
          { translateX: bubbleW > 0 ? -(bubbleW / 2) : 0 },
          { translateY: -8 },
        ],
        zIndex: 9999,
        elevation: 20,
      }}
    >
      <Stack
        onLayout={(e) => setBubbleW(e.nativeEvent.layout.width)}
        backgroundColor={safeBg}
        paddingHorizontal={8}
        paddingVertical={4}
        borderRadius={4}
        alignItems="center"
        justifyContent="center"
        minWidth={label.length * 18} // rough guess to prevent excessive shrinking for short labels
      >
        <StyledText
          numberOfLines={1}
          ellipsizeMode="clip"
          color={safeText}
          fontSize={12}
          fontWeight={"700"}
          lineHeight={14}
          textAlign="center"
          flexShrink={0}
          includeFontPadding={false}
        >
          {label}
        </StyledText>
      </Stack>

      {bubbleW > 0 && (
        <View
          style={{
            position: "absolute",
            top: "100%",
            left: bubbleW / 2 - 6,
            marginTop: -1,
          }}
        >
          <Svg width={12} height={7} viewBox="0 0 12 7">
            <Path d="M0 0 L6 7 L12 0 Z" fill={safeBg} />
          </Svg>
        </View>
      )}
    </Animated.View>
  );
};

// ─── Thumb ────────────────────────────────────────────────────────────────────

interface ThumbProps {
  position: number;
  trackWidth: number;
  thumbD: number;
  trackH: number;
  color: string;
  borderColor: string;
  tooltipLabel: string;
  showTooltip: boolean;
  alwaysTooltip: boolean;
  tooltipBg: string;
  tooltipText: string;
  disabled: boolean;
  onStart: () => void;
  onMove: (fraction: number) => void;
  onEnd: () => void;
}

const Thumb: React.FC<ThumbProps> = ({
  position,
  trackWidth,
  thumbD,
  trackH,
  color,
  borderColor,
  tooltipLabel,
  showTooltip,
  alwaysTooltip,
  tooltipBg,
  tooltipText,
  disabled,
  onStart,
  onMove,
  onEnd,
}) => {
  // scaleAnim uses native driver (transform only — safe)
  const scaleAnim = useRef(new Animated.Value(1)).current;
  // tooltipAnim uses JS driver (opacity — required for text colour on iOS)
  const tooltipAnim = useRef(new Animated.Value(alwaysTooltip ? 1 : 0)).current;
  const dragging = useRef(false);

  const animateIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1.2, useNativeDriver: true }),
      Animated.timing(tooltipAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();
  };

  const animateOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
      Animated.timing(tooltipAnim, {
        toValue: alwaysTooltip ? 1 : 0,
        duration: 150,
        useNativeDriver: false, // JS driver — keeps text colour correct on iOS
      }),
    ]).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: () => {
        dragging.current = true;
        onStart();
        if (showTooltip) animateIn();
      },
      onPanResponderMove: (_, gs: PanResponderGestureState) => {
        if (!dragging.current || trackWidth <= 0) return;
        const newFraction = clamp(position + gs.dx / trackWidth, 0, 1);
        onMove(newFraction);
      },
      onPanResponderRelease: () => {
        dragging.current = false;
        onEnd();
        animateOut();
      },
      onPanResponderTerminate: () => {
        dragging.current = false;
        animateOut();
      },
    }),
  ).current;

  const left = position * trackWidth - thumbD / 2;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        position: "absolute",
        left,
        top: 0, // wrapper height = thumbD, centred
        width: thumbD,
        height: thumbD,
        overflow: "visible", // tooltip floats up freely
        transform: [{ scale: scaleAnim }],
      }}
    >
      {showTooltip && (
        <Tooltip
          visible={tooltipAnim}
          label={tooltipLabel}
          bgColor={tooltipBg}
          textColor={tooltipText}
        />
      )}

      {/* Thumb circle */}
      <View
        style={{
          width: thumbD,
          height: thumbD,
          borderRadius: thumbD / 2,
          backgroundColor: color,
          borderWidth: 2,
          borderColor: borderColor,
          shadowColor: borderColor,
          shadowOpacity: 0.25,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 4,
        }}
      />
    </Animated.View>
  );
};

// ─── Gradient fill ────────────────────────────────────────────────────────────

const GradFill: React.FC<{
  width: number;
  height: number;
  fillFraction: number;
  gradFrom: string;
  gradTo: string;
  borderRadius: number;
}> = ({ width, height, fillFraction, gradFrom, gradTo, borderRadius }) => (
  <Svg
    width={width}
    height={height}
    style={{ position: "absolute", left: 0, top: 0 }}
  >
    <Defs>
      <LinearGradient id="sg" x1="0" y1="0" x2="1" y2="0">
        <Stop offset="0%" stopColor={gradFrom} />
        <Stop offset="100%" stopColor={gradTo} />
      </LinearGradient>
    </Defs>
    <Rect
      x={0}
      y={0}
      width={width * fillFraction}
      height={height}
      rx={borderRadius}
      fill="url(#sg)"
    />
  </Svg>
);

// ─── StyledSlider ─────────────────────────────────────────────────────────────

export const StyledSlider: React.FC<StyledSliderProps> = ({
  value,
  valueHigh,
  bufferValue,
  min = 0,
  max = 100,
  step = 1,
  variant = "default",
  size = "md",
  showTooltip = true,
  alwaysShowTooltip = false,
  showMinMax = false,
  steps = 5,
  formatLabel = (v) => String(Math.round(v)),
  width: widthProp,
  disabled = false,
  colors: colorsProp,
  onValueChange,
  onSlidingComplete,
  onRangeChange,
  onRangeComplete,
}) => {
  const C = buildColors(colorsProp);
  const trackH = TRACK_H[size];
  const thumbD = THUMB_D[size];
  const trackBR = trackH / 2;

  const [trackW, setTrackW] = useState(widthProp ?? 0);
  const barW = widthProp ?? trackW;

  const [localLow, setLocalLow] = useState(value);
  const [localHigh, setLocalHigh] = useState(valueHigh ?? max);
  const [bufLocal, setBufLocal] = useState(bufferValue ?? value);

  useEffect(() => {
    setLocalLow(value);
  }, [value]);
  useEffect(() => {
    if (valueHigh !== undefined) setLocalHigh(valueHigh);
  }, [valueHigh]);
  useEffect(() => {
    if (bufferValue !== undefined) setBufLocal(bufferValue);
  }, [bufferValue]);

  const range = max - min;
  const lowF = clamp((localLow - min) / range, 0, 1);
  const highF = clamp((localHigh - min) / range, 0, 1);
  const bufF = clamp((bufLocal - min) / range, 0, 1);

  const effectiveStep =
    variant === "stepped" ? (max - min) / (steps - 1) : step;

  const handleLowMove = useCallback(
    (frac: number) => {
      const snapped = snapToStep(
        min + frac * range,
        min,
        variant === "range" ? localHigh : max,
        effectiveStep,
      );
      setLocalLow(snapped);
      onValueChange?.(snapped);
      if (variant === "range") onRangeChange?.(snapped, localHigh);
    },
    [
      min,
      range,
      effectiveStep,
      localHigh,
      variant,
      onValueChange,
      onRangeChange,
    ],
  );

  const handleLowEnd = useCallback(() => {
    onSlidingComplete?.(localLow);
    if (variant === "range") onRangeComplete?.(localLow, localHigh);
  }, [localLow, localHigh, variant, onSlidingComplete, onRangeComplete]);

  const handleHighMove = useCallback(
    (frac: number) => {
      const snapped = snapToStep(
        min + frac * range,
        localLow,
        max,
        effectiveStep,
      );
      setLocalHigh(snapped);
      onRangeChange?.(localLow, snapped);
    },
    [min, range, effectiveStep, localLow, max, onRangeChange],
  );

  const handleHighEnd = useCallback(() => {
    onRangeComplete?.(localLow, localHigh);
  }, [localLow, localHigh, onRangeComplete]);

  if (!barW && !widthProp) {
    return (
      <View
        onLayout={(e) => setTrackW(e.nativeEvent.layout.width)}
        style={{ height: thumbD + 40 }}
      />
    );
  }

  const tickPositions: number[] =
    variant === "stepped"
      ? Array.from({ length: steps }, (_, i) => i / (steps - 1))
      : [];

  return (
    <View
      onLayout={
        widthProp ? undefined : (e) => setTrackW(e.nativeEvent.layout.width)
      }
      style={{
        opacity: disabled ? 0.45 : 1,
        paddingTop: showTooltip ? 48 : 8,
        paddingBottom: showMinMax ? 20 : 8,
      }}
    >
      {/* ── Three-layer layout ──
          Layer 1: track fills  (overflow hidden — clips fill bars only)
          Layer 2: tick marks   (overflow visible — poke above/below)
          Layer 3: thumbs       (overflow visible — tooltips float freely)
      ── */}
      <View
        style={{
          width: barW,
          height: thumbD,
          overflow: "visible", // thumbs + tooltips escape freely
          justifyContent: "center",
        }}
      >
        {/* ── Layer 1: Track + fills ── */}
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: trackH,
            borderRadius: trackBR,
            backgroundColor: C.track,
            overflow: "hidden", // only fills are clipped
          }}
        >
          {/* Buffer fill */}
          {variant === "buffer" && (
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${bufF * 100}%`,
                borderRadius: trackBR,
                backgroundColor: C.buffer,
              }}
            />
          )}

          {/* Range fill */}
          {variant === "range" ? (
            <View
              style={{
                position: "absolute",
                left: `${lowF * 100}%`,
                width: `${(highF - lowF) * 100}%`,
                top: 0,
                bottom: 0,
                backgroundColor: C.fill,
              }}
            />
          ) : variant === "gradient" ? (
            <GradFill
              width={barW}
              height={trackH}
              fillFraction={lowF}
              gradFrom={C.gradFrom}
              gradTo={C.gradTo}
              borderRadius={trackBR}
            />
          ) : (
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${lowF * 100}%`,
                borderRadius: trackBR,
                backgroundColor: C.fill,
              }}
            />
          )}
        </View>

        {/* ── Layer 2: Tick marks ── */}
        {variant === "stepped" &&
          tickPositions.map((t, i) => (
            <View
              key={i}
              style={{
                position: "absolute",
                left: t * barW - 1,
                top: (thumbD - trackH) / 2 - 3,
                width: 2,
                height: trackH + 6,
                borderRadius: 1,
                backgroundColor: t <= lowF ? C.tickActive : C.tick,
              }}
            />
          ))}

        {/* ── Layer 3: Thumbs (tooltips float up from here) ── */}
        <Thumb
          position={lowF}
          trackWidth={barW}
          thumbD={thumbD}
          trackH={trackH}
          color={C.thumb}
          borderColor={C.thumbBorder}
          tooltipLabel={formatLabel(localLow)}
          showTooltip={showTooltip}
          alwaysTooltip={alwaysShowTooltip}
          tooltipBg={C.tooltipBg}
          tooltipText={C.tooltipText}
          disabled={disabled}
          onStart={() => {}}
          onMove={handleLowMove}
          onEnd={handleLowEnd}
        />

        {variant === "range" && (
          <Thumb
            position={highF}
            trackWidth={barW}
            thumbD={thumbD}
            trackH={trackH}
            color={C.thumb}
            borderColor={C.thumbBorder}
            tooltipLabel={formatLabel(localHigh)}
            showTooltip={showTooltip}
            alwaysTooltip={alwaysShowTooltip}
            tooltipBg={C.tooltipBg}
            tooltipText={C.tooltipText}
            disabled={disabled}
            onStart={() => {}}
            onMove={handleHighMove}
            onEnd={handleHighEnd}
          />
        )}
      </View>

      {/* Min / max labels */}
      {showMinMax && (
        <Stack horizontal justifyContent="space-between" marginTop={6}>
          <StyledText fontSize={11} color={C.rangeLabel}>
            {formatLabel(min)}
          </StyledText>
          <StyledText fontSize={11} color={C.rangeLabel}>
            {formatLabel(max)}
          </StyledText>
        </Stack>
      )}
    </View>
  );
};

export default StyledSlider;
