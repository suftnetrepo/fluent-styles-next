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
   * Controls how built-in text is arranged.
   * - 'stacked': display text first, then label / sublabel underneath
   * - 'center': display text, label, and sublabel are centered inside the ring
   * @default 'stacked'
   */
  contentPosition?: 'center' | 'stacked'

  children?: React.ReactNode
}

const SIZE_MAP: Record<
  CircularProgressSize,
  { diameter: number; stroke: number; primaryFont: number; secondaryFont: number }
> = {
  xs: { diameter: 48, stroke: 4, primaryFont: 11, secondaryFont: 8 },
  sm: { diameter: 64, stroke: 5, primaryFont: 13, secondaryFont: 9 },
  md: { diameter: 80, stroke: 6, primaryFont: 15, secondaryFont: 10 },
  lg: { diameter: 100, stroke: 7, primaryFont: 18, secondaryFont: 11 },
  xl: { diameter: 128, stroke: 8, primaryFont: 22, secondaryFont: 12 },
}

const DEFAULT_COLORS: CircularProgressColors = {
  arc: theme.colors.indigo?.[500] ?? '#6366f1',
  track: theme.colors.gray[200],
  label: theme.colors.gray[800],
  sublabel: theme.colors.gray[400],
  gradientFrom: theme.colors.violet?.[500] ?? '#8b5cf6',
  gradientTo: theme.colors.cyan?.[400] ?? '#22d3ee',
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

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
  contentPosition = 'stacked',
  children,
}) => {
  const preset = SIZE_MAP[size]
  const diameter = diameterProp ?? preset.diameter
  const strokeWidth = strokeWidthProp ?? preset.stroke

  const isDashboard = variant === 'dashboard'

  const radius = (diameter - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const arcLength = isDashboard ? circumference / 2 : circumference

  const colors: CircularProgressColors = useMemo(
    () => (colorOverrides ? { ...DEFAULT_COLORS, ...colorOverrides } : DEFAULT_COLORS),
    [colorOverrides]
  )

  const clamped = Math.min(Math.max(value, 0), total)
  const fraction = total > 0 ? clamped / total : 0

  const progress = useRef(new Animated.Value(animated ? 0 : fraction)).current

  useEffect(() => {
    if (!animated) {
      progress.setValue(fraction)
      return
    }

    Animated.timing(progress, {
      toValue: fraction,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start()
  }, [fraction, animated, duration, progress])

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [arcLength, 0],
  })

  const center = diameter / 2
  const gradientId = `cpGrad-${Math.round(diameter)}-${variant}`

  const centreText = useMemo(() => {
    switch (display) {
      case 'percent':
        return `${Math.round(fraction * 100)}%`
      case 'fraction':
        return `${clamped}/${total}`
      case 'value':
        return String(clamped)
      case 'label':
        return label ?? ''
      case 'none':
        return null
      default:
        return null
    }
  }, [display, fraction, clamped, total, label])

  const arcStroke = variant === 'gradient' ? `url(#${gradientId})` : colors.arc
  const trackOpacity = variant === 'ghost' ? 0 : 1
  const trackDash = isDashboard ? [arcLength, circumference - arcLength] : undefined

  const dashboardTextOffset = isDashboard ? -(diameter / 4) : 0

 const renderTextBlock = () => {
  if (contentPosition === 'center') {
    return (
      <Stack
        position="absolute"
        left={strokeWidth + 6}
        right={strokeWidth + 6}
        top={0}
        bottom={0}
        alignItems="center"
        justifyContent="center"
        gap={1}
        pointerEvents="none"
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

        {!!label && (
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
    )
  }

  const showSecondLine = display !== 'label' && display !== 'none' && !!label
  const showSubLabel = !!sublabel

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={1}
      marginTop={dashboardTextOffset}
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
          fontSize={Math.max(preset.secondaryFont - 1, 8)}
          color={colors.sublabel}
          lineHeight={preset.secondaryFont + 1}
          textAlign="center"
        >
          {sublabel}
        </StyledText>
      )}
    </Stack>
  )
}

  return (
    <Stack
      width={diameter}
      height={isDashboard ? diameter / 2 + strokeWidth : diameter}
      alignItems="center"
      justifyContent="center"
        position="relative"
    >
      <Stack style={S.svg_wrap}>
        <Svg
          width={diameter}
          height={diameter}
          style={isDashboard ? { marginTop: -(diameter / 2) } : undefined}
        >
          {variant === 'gradient' && (
            <Defs>
              <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor={colors.gradientFrom} />
                <Stop offset="100%" stopColor={colors.gradientTo} />
              </LinearGradient>
            </Defs>
          )}

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

      {children ? (
        <Stack alignItems="center" justifyContent="center">
          {children}
        </Stack>
      ) : (
        renderTextBlock()
      )}
    </Stack>
  )
}

const S = StyleSheet.create({
  svg_wrap: {
    position: 'absolute',
  },
})