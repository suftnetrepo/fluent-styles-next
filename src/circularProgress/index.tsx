import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
} from 'react-native'
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg'

import { Stack }      from '../stack'
import { StyledText } from '../text'
import { theme }      from '../utiles/theme'

// ─── Types ────────────────────────────────────────────────────────────────────

export type CircularProgressVariant =
  | 'default'   // coloured arc on light track
  | 'ghost'     // arc only, no track
  | 'gradient'  // two-stop gradient arc
  | 'dashboard' // half-circle (gauge)

export type CircularProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type CircularProgressColors = {
  /** Progress arc colour (ignored when gradient is used). */
  arc:         string
  /** Background track ring. */
  track:       string
  /** Primary label (value / percentage). */
  label:       string
  /** Secondary label below primary. */
  sublabel:    string
  /** Gradient start colour (gradient variant). */
  gradientFrom: string
  /** Gradient end colour (gradient variant). */
  gradientTo:  string
}

export interface StyledCircularProgressProps {
  /** Current progress value. */
  value:    number
  /** Maximum value. @default 100 */
  total?:   number

  // ── Display ────────────────────────────────────────────────────────────

  /**
   * What to show in the centre.
   * - `'percent'`  — e.g. `72%`
   * - `'fraction'` — e.g. `18 / 25`
   * - `'value'`    — raw value only, e.g. `18`
   * - `'label'`    — `label` prop only, no number
   * - `'none'`     — no centre text
   * @default 'percent'
   */
  display?: 'percent' | 'fraction' | 'value' | 'label' | 'none'

  /** Primary label rendered inside (or below when no centre text). */
  label?:   string
  /** Secondary line below the primary label. */
  sublabel?: string

  // ── Appearance ─────────────────────────────────────────────────────────

  variant?:     CircularProgressVariant
  size?:        CircularProgressSize
  /** Override the component's pixel diameter. Overrides `size`. */
  diameter?:    number
  /** Arc stroke thickness in px. Auto-scaled from diameter when omitted. */
  strokeWidth?: number
  /** Arc end cap style. @default 'round' */
  lineCap?:     'round' | 'butt' | 'square'

  // ── Animation ──────────────────────────────────────────────────────────

  /** Animate from 0 to `value` on mount (and on value change). @default true */
  animated?:    boolean
  /** Animation duration in ms. @default 900 */
  duration?:    number

  // ── Theming ────────────────────────────────────────────────────────────

  colors?:      Partial<CircularProgressColors>

  // ── Children (custom centre content) ──────────────────────────────────

  /**
   * Renders arbitrary JSX in the centre instead of the built-in label.
   * Overrides `display`, `label`, and `sublabel`.
   */
  children?:    React.ReactNode
}

// ─── Size presets ─────────────────────────────────────────────────────────────

const SIZE_MAP: Record<CircularProgressSize, { diameter: number; stroke: number; primaryFont: number; secondaryFont: number }> = {
  xs: { diameter: 48,  stroke: 4, primaryFont: 11, secondaryFont: 8  },
  sm: { diameter: 64,  stroke: 5, primaryFont: 13, secondaryFont: 9  },
  md: { diameter: 80,  stroke: 6, primaryFont: 15, secondaryFont: 10 },
  lg: { diameter: 100, stroke: 7, primaryFont: 18, secondaryFont: 11 },
  xl: { diameter: 128, stroke: 8, primaryFont: 22, secondaryFont: 12 },
}

// ─── Default colours ──────────────────────────────────────────────────────────

const DEFAULT_COLORS: CircularProgressColors = {
  arc:          theme.colors.indigo?.[500] ?? '#6366f1',
  track:        theme.colors.gray[200],
  label:        theme.colors.gray[800],
  sublabel:     theme.colors.gray[400],
  gradientFrom: theme.colors.violet?.[500] ?? '#8b5cf6',
  gradientTo:   theme.colors.cyan?.[400]   ?? '#22d3ee',
}

// ─── Animated SVG Circle wrapper ──────────────────────────────────────────────
// react-native-svg's Circle doesn't accept Animated.Value directly on
// strokeDashoffset, so we use a JS-driven animation and update via
// a ref + setNativeProps workaround, OR we use a simpler approach:
// interpolate inside the render path with a listener.

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

// ─── Component ────────────────────────────────────────────────────────────────

export const StyledCircularProgress: React.FC<StyledCircularProgressProps> = ({
  value,
  total       = 100,
  display     = 'percent',
  label,
  sublabel,
  variant     = 'default',
  size        = 'md',
  diameter:   diameterProp,
  strokeWidth: strokeWidthProp,
  lineCap     = 'round',
  animated    = true,
  duration    = 900,
  colors: colorOverrides,
  children,
}) => {

  // ── Resolved dimensions ────────────────────────────────────────────────────
  const preset      = SIZE_MAP[size]
  const diameter    = diameterProp  ?? preset.diameter
  const strokeWidth = strokeWidthProp ?? preset.stroke

  const isDashboard = variant === 'dashboard'

  // For dashboard (half-circle gauge), the arc spans 180° (half circumference).
  // We rotate the SVG so the flat side is at the bottom.
  const radius      = (diameter - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const arcLength   = isDashboard ? circumference / 2 : circumference

  // ── Colours ────────────────────────────────────────────────────────────────
  const colors: CircularProgressColors = useMemo(
    () => colorOverrides ? { ...DEFAULT_COLORS, ...colorOverrides } : DEFAULT_COLORS,
    [colorOverrides],
  )

  // ── Clamp value ────────────────────────────────────────────────────────────
  const clamped  = Math.min(Math.max(value, 0), total)
  const fraction = total > 0 ? clamped / total : 0

  // ── Animation ──────────────────────────────────────────────────────────────
  const progress = useRef(new Animated.Value(animated ? 0 : fraction)).current

  useEffect(() => {
    if (!animated) {
      progress.setValue(fraction)
      return
    }
    Animated.timing(progress, {
      toValue:         fraction,
      duration,
      easing:          Easing.out(Easing.cubic),
      useNativeDriver: false,   // SVG props cannot use native driver
    }).start()
  }, [fraction, animated, duration])

  // strokeDashoffset drives the arc: 0 = full, arcLength = empty
  const strokeDashoffset = progress.interpolate({
    inputRange:  [0, 1],
    outputRange: [arcLength, 0],
  })

  const center     = diameter / 2
  const gradientId = 'cpGrad'

  // ── Centre label ───────────────────────────────────────────────────────────
  const centreText = useMemo(() => {
    switch (display) {
      case 'percent':  return `${Math.round(fraction * 100)}%`
      case 'fraction': return `${clamped}/${total}`
      case 'value':    return String(clamped)
      case 'label':    return label ?? ''
      case 'none':     return null
    }
  }, [display, fraction, clamped, total, label])

  const showSecondLine = display !== 'label' && display !== 'none' && !!label
  const showSubLabel   = !!sublabel

  // ── SVG arc stroke ─────────────────────────────────────────────────────────
  const arcStroke = variant === 'gradient' ? `url(#${gradientId})` : colors.arc
  const trackOpacity = variant === 'ghost' ? 0 : 1

  // Dashboard: rotate so the half-circle arc is on top (flat at bottom).
  // The SVG canvas is still square; we clip using dasharray so only 180° fills.
  const svgRotation = isDashboard ? 180 : 0
  // For dashboard the track shows only the bottom half; progress fills top half.
  const trackDash   = isDashboard ? [arcLength, circumference - arcLength] : undefined

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <Stack
      width={diameter}
      height={isDashboard ? diameter / 2 + strokeWidth : diameter}
      alignItems="center"
      justifyContent="center"
    >
      {/* SVG ring — absolutely positioned behind centre content */}
      <Stack style={[S.svg_wrap, { top: isDashboard ? 0 : 0, left: 0 }]}>
        <Svg
          width={diameter}
          height={diameter}
          style={isDashboard ? { marginTop: -(diameter / 2) } : undefined}
        >
          {/* Gradient definition */}
          {variant === 'gradient' && (
            <Defs>
              <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%"   stopColor={colors.gradientFrom} />
                <Stop offset="100%" stopColor={colors.gradientTo}   />
              </LinearGradient>
            </Defs>
          )}

          {/* Track ring */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={colors.track}
            strokeWidth={strokeWidth}
            strokeDasharray={trackDash}
            strokeLinecap="butt"
            fill="none"
            opacity={trackOpacity}
            rotation={isDashboard ? 90 : 0}
            origin={`${center}, ${center}`}
          />

          {/* Progress arc */}
          <AnimatedCircle
            cx={center}
            cy={center}
            r={radius}
            stroke={arcStroke as any}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset as any}
            strokeLinecap={lineCap}
            rotation={isDashboard ? 90 : -90}
            origin={`${center}, ${center}`}
          />
        </Svg>
      </Stack>

      {/* Centre content */}
      {children ? (
        <Stack alignItems="center" justifyContent="center">
          {children}
        </Stack>
      ) : (
        <Stack alignItems="center" gap={1} marginTop={isDashboard ? -(diameter / 4) : 0}>
          {centreText !== null && centreText !== '' && (
            <StyledText
              fontSize={preset.primaryFont}
              fontWeight={theme.fontWeight.bold}
              color={colors.label}
              lineHeight={preset.primaryFont + 3}
              textAlign="center"
            >
              {centreText}
            </StyledText>
          )}

          {showSecondLine && (
            <StyledText
              fontSize={preset.secondaryFont}
              color={colors.sublabel}
              lineHeight={preset.secondaryFont + 2}
              textAlign="center"
            >
              {label}
            </StyledText>
          )}

          {showSubLabel && !showSecondLine && (
            <StyledText
              fontSize={preset.secondaryFont}
              color={colors.sublabel}
              lineHeight={preset.secondaryFont + 2}
              textAlign="center"
            >
              {sublabel}
            </StyledText>
          )}

          {showSubLabel && showSecondLine && (
            <StyledText
              fontSize={preset.secondaryFont - 1}
              color={colors.sublabel}
              lineHeight={preset.secondaryFont + 1}
              textAlign="center"
            >
              {sublabel}
            </StyledText>
          )}
        </Stack>
      )}
    </Stack>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = StyleSheet.create({
  svg_wrap: {
    position: 'absolute',
  },
})