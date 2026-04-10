import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react'
import {
  Animated,
  Easing,
} from 'react-native'
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg'

import { Stack } from '../stack'
import { StyledText } from '../text'
import { theme } from '../utiles/theme'

// ─── Types ────────────────────────────────────────────────────────────────────

export type CircularProgressVariant =
  | 'default'
  | 'ghost'
  | 'gradient'
  | 'dashboard'

export type CircularProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type CircularProgressColors = {
  arc: string
  track: string
  label: string
  sublabel: string
  gradientFrom: string
  gradientTo: string
}

export interface StyledCircularProgressProps {
  value: number
  total?: number

  display?: 'percent' | 'fraction' | 'value' | 'label' | 'none'

  label?: string
  sublabel?: string

  variant?: CircularProgressVariant
  size?: CircularProgressSize
  diameter?: number
  strokeWidth?: number
  lineCap?: 'round' | 'butt' | 'square'

  animated?: boolean
  duration?: number

  colors?: Partial<CircularProgressColors>

  /**
   * 'inside'  — percentage / label rendered centred inside the ring (default)
   * 'stacked' — text sits below the ring
   * 'center'  — alias for 'inside' (backwards-compat)
   */
  contentPosition?: 'inside' | 'center' | 'stacked'

  children?: React.ReactNode
}

// ─── Size presets ─────────────────────────────────────────────────────────────

const SIZE_MAP: Record<
  CircularProgressSize,
  { diameter: number; stroke: number; primaryFont: number; secondaryFont: number }
> = {
  xs: { diameter: 48,  stroke: 4, primaryFont: 11, secondaryFont: 8  },
  sm: { diameter: 64,  stroke: 5, primaryFont: 13, secondaryFont: 9  },
  md: { diameter: 80,  stroke: 6, primaryFont: 15, secondaryFont: 10 },
  lg: { diameter: 100, stroke: 7, primaryFont: 18, secondaryFont: 11 },
  xl: { diameter: 128, stroke: 8, primaryFont: 22, secondaryFont: 12 },
}

const DEFAULT_COLORS: CircularProgressColors = {
  arc:          theme.colors.indigo?.[500]  ?? '#6366f1',
  track:        theme.colors.gray[200],
  label:        theme.colors.gray[800],
  sublabel:     theme.colors.gray[400],
  gradientFrom: theme.colors.violet?.[500] ?? '#8b5cf6',
  gradientTo:   theme.colors.cyan?.[400]   ?? '#22d3ee',
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

// ─── Component ────────────────────────────────────────────────────────────────

export const StyledCircularProgress: React.FC<StyledCircularProgressProps> = ({
  value,
  total = 100,
  display = 'percent',
  label,
  sublabel,
  variant = 'default',
  size = 'md',
  diameter: diameterProp,
  strokeWidth: strokeWidthProp,
  lineCap = 'round',
  animated = true,
  duration = 900,
  colors: colorOverrides,
  contentPosition = 'inside',
  children,
}) => {
  const preset      = SIZE_MAP[size]
  const diameter    = diameterProp    ?? preset.diameter
  const strokeWidth = strokeWidthProp ?? preset.stroke

  const isDashboard = variant === 'dashboard'

  const radius       = (diameter - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const arcLength    = isDashboard ? circumference / 2 : circumference

  const colors: CircularProgressColors = useMemo(
    () => (colorOverrides ? { ...DEFAULT_COLORS, ...colorOverrides } : DEFAULT_COLORS),
    [colorOverrides],
  )

  const clamped  = Math.min(Math.max(value, 0), total)
  const fraction = total > 0 ? clamped / total : 0

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
      useNativeDriver: false,
    }).start()
  }, [fraction, animated, duration, progress])

  const strokeDashoffset = progress.interpolate({
    inputRange:  [0, 1],
    outputRange: [arcLength, 0],
  })

  const center     = diameter / 2
  const gradientId = `cpGrad-${Math.round(diameter)}-${variant}`

  const centreText = useMemo(() => {
    switch (display) {
      case 'percent':  return `${Math.round(fraction * 100)}%`
      case 'fraction': return `${clamped}/${total}`
      case 'value':    return String(clamped)
      case 'label':    return label ?? ''
      case 'none':     return null
      default:         return null
    }
  }, [display, fraction, clamped, total, label])

  const arcStroke    = variant === 'gradient' ? `url(#${gradientId})` : colors.arc
  const trackOpacity = variant === 'ghost' ? 0 : 1
  const trackDash    = isDashboard ? [arcLength, circumference - arcLength] : undefined

  // 'inside' and 'center' both mean text lives inside the ring
  const isInside = contentPosition === 'inside' || contentPosition === 'center'

  // ── SVG height for dashboard variant ──────────────────────────────────────
  const svgHeight    = isDashboard ? diameter / 2 + strokeWidth : diameter
  const containerH   = isDashboard ? diameter / 2 + strokeWidth : diameter

  // ── Text overlay rendered inside the ring ─────────────────────────────────
  const renderInsideText = () => {
    if (children) return null   // custom children take over

    return (
      <Stack
        position="absolute"
        top={0}
        left={0}
        width={diameter}
        height={containerH}
        alignItems="center"
        justifyContent="center"
        pointerEvents="none"
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          gap={2}
          paddingBottom={isDashboard ? strokeWidth + 4 : 0}
        >
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

          {display !== 'label' && display !== 'none' && !!label && (
            <StyledText
              fontSize={preset.secondaryFont}
              color={colors.sublabel}
              lineHeight={preset.secondaryFont + 2}
              textAlign="center"
            >
              {label}
            </StyledText>
          )}

          {!!sublabel && (
            <StyledText
              fontSize={Math.max(preset.secondaryFont - 1, 8)}
              color={colors.sublabel}
              lineHeight={preset.secondaryFont + 1}
              textAlign="center"
            >
              {sublabel}
            </StyledText>
          )}
        </Stack>
      </Stack>
    )
  }

  // ── Text block rendered below the ring ────────────────────────────────────
  const renderStackedText = () => {
    if (children) return null

    const showLabel    = display !== 'label' && display !== 'none' && !!label
    const showSublabel = !!sublabel

    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        gap={1}
        marginTop={isDashboard ? -(diameter / 4) : 0}
        paddingHorizontal={strokeWidth + 4}
      >
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

        {showLabel && (
          <StyledText
            fontSize={preset.secondaryFont}
            color={colors.sublabel}
            lineHeight={preset.secondaryFont + 2}
            textAlign="center"
          >
            {label}
          </StyledText>
        )}

        {showSublabel && (
          <StyledText
            fontSize={showLabel
              ? Math.max(preset.secondaryFont - 1, 8)
              : preset.secondaryFont}
            color={colors.sublabel}
            lineHeight={preset.secondaryFont + 2}
            textAlign="center"
          >
            {sublabel}
          </StyledText>
        )}
      </Stack>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <Stack
      width={diameter}
      height={isInside ? containerH : undefined}
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      {/* SVG ring */}
      <Svg
        width={diameter}
        height={svgHeight}
        style={isDashboard ? { marginTop: -(diameter / 2) } : undefined}
      >
        {variant === 'gradient' && (
          <Defs>
            <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%"   stopColor={colors.gradientFrom} />
              <Stop offset="100%" stopColor={colors.gradientTo}   />
            </LinearGradient>
          </Defs>
        )}

        {/* Track */}
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

      {/* Text / children */}
      {children ? (
        <Stack
          position="absolute"
          top={0}
          left={0}
          width={diameter}
          height={containerH}
          alignItems="center"
          justifyContent="center"
          pointerEvents="none"
          gap={2}
        >
          {children}
        </Stack>
      ) : isInside ? (
        renderInsideText()
      ) : (
        renderStackedText()
      )}
    </Stack>
  )
}