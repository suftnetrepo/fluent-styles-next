/**
 * StyledSkeleton
 *
 * An animated loading placeholder with:
 * - 2 animation types: shimmer | pulse
 * - Primitive shapes: rect | circle | text | rounded
 * - Pre-built layout templates: card | list-item | profile | article | grid
 * - Composable: nest <Skeleton.Row> / <Skeleton.Group> for custom layouts
 * - Speed + colour token overrides
 *
 * Rules:
 * - Stack / StyledText — no bare View/Text
 * - No StyleSheet.create
 * - Colours from theme.colors / palettes
 * - Children typed as CompatNode
 */

import React, {
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import {
  Animated,
  Easing,
  Dimensions,
  type ViewStyle,
} from 'react-native'
import { Stack, theme, palettes } from 'fluent-styles'

// ─── CompatNode ───────────────────────────────────────────────────────────────
type CompatNode = ReactNode

const { width: SCREEN_WIDTH } = Dimensions.get('window')

// ─── Tokens ───────────────────────────────────────────────────────────────────
export interface SkeletonColors {
  base:      string
  highlight: string
  shimmer:   string
}

const LIGHT_COLORS: SkeletonColors = {
  base:      theme.colors.gray[100],
  highlight: theme.colors.gray[50],
  shimmer:   'rgba(255,255,255,0.65)',
}

const DARK_COLORS: SkeletonColors = {
  base:      theme.colors.gray[700],
  highlight: theme.colors.gray[600],
  shimmer:   'rgba(255,255,255,0.06)',
}

// ─── Types ────────────────────────────────────────────────────────────────────
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'none'
export type SkeletonShape     = 'rect' | 'circle' | 'text' | 'rounded'
export type SkeletonTemplate  = 'card' | 'list-item' | 'profile' | 'article' | 'grid'
export type SkeletonTheme     = 'light' | 'dark'

export interface StyledSkeletonProps {
  /** Primitive: render a single bone */
  width?:      number | `${number}%`
  height?:     number
  shape?:      SkeletonShape
  borderRadius?: number

  /** Template: render a composed layout */
  template?:   SkeletonTemplate
  /** Repeat template N times */
  repeat?:     number

  animation?:  SkeletonAnimation
  speed?:      number       // ms — lower = faster
  skeletonTheme?: SkeletonTheme
  colors?:     Partial<SkeletonColors>

  style?:      ViewStyle
  children?:   CompatNode
}

// ─── Animation context ────────────────────────────────────────────────────────
const useShimmerAnim = (speed: number) => {
  const anim = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.loop(
      Animated.timing(anim, {
        toValue:         1,
        duration:        speed,
        easing:          Easing.linear,
        useNativeDriver: true,
      })
    ).start()
    return () => anim.stopAnimation()
  }, [speed])
  return anim
}

const usePulseAnim = (speed: number) => {
  const anim = useRef(new Animated.Value(1)).current
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 0.45, duration: speed / 2, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 1,    duration: speed / 2, useNativeDriver: true }),
      ])
    ).start()
    return () => anim.stopAnimation()
  }, [speed])
  return anim
}

// ─── Single bone ─────────────────────────────────────────────────────────────
interface BoneProps {
  width?:        number | string
  height?:       number
  shape?:        SkeletonShape
  borderRadius?: number
  colors:        SkeletonColors
  animation:     SkeletonAnimation
  speed:         number
  style?:        ViewStyle
}

const Bone: React.FC<BoneProps> = ({
  width = '100%',
  height = 16,
  shape = 'rect',
  borderRadius: radiusOverride,
  colors,
  animation,
  speed,
  style,
}) => {
  const shimmerAnim = useShimmerAnim(speed)
  const pulseAnim   = usePulseAnim(speed)

  const br = radiusOverride
    ?? (shape === 'circle'  ? (typeof width === 'number' ? width / 2 : 9999)
      : shape === 'text'    ? 4
      : shape === 'rounded' ? 10
      : 6)

  const resolvedWidth  = typeof width === 'string' ? width : width
  const resolvedHeight = shape === 'circle' && typeof width === 'number' ? width : height

  if (animation === 'shimmer') {
    const shimmerTranslate = shimmerAnim.interpolate({
      inputRange:  [0, 1],
      outputRange: [-(SCREEN_WIDTH), SCREEN_WIDTH],
    })

    return (
      <Stack
        width={resolvedWidth as any}
        height={resolvedHeight}
        borderRadius={br}
        backgroundColor={colors.base}
        overflow="hidden"
        style={style}
      >
        <Animated.View
          style={{
            position:        'absolute',
            top: 0, bottom: 0,
            width:           '100%',
            transform:       [{ translateX: shimmerTranslate }],
            backgroundColor: colors.shimmer,
            // gradient simulation with opacity
            opacity:         0.9,
          }}
        />
      </Stack>
    )
  }

  if (animation === 'pulse') {
    return (
      <Animated.View
        style={{
          width:           resolvedWidth as any,
          height:          resolvedHeight,
          borderRadius:    br,
          backgroundColor: colors.base,
          opacity:         pulseAnim,
          ...(style ?? {}),
        }}
      />
    )
  }

  // none
  return (
    <Stack
      width={resolvedWidth as any}
      height={resolvedHeight}
      borderRadius={br}
      backgroundColor={colors.base}
      style={style}
    />
  )
}

// ─── Templates ────────────────────────────────────────────────────────────────
const CardTemplate: React.FC<{ colors: SkeletonColors; animation: SkeletonAnimation; speed: number }> = (p) => (
  <Stack gap={12} padding={16} borderRadius={14} backgroundColor={palettes.white}
    borderWidth={1} borderColor={theme.colors.gray[100]}>
    <Bone {...p} width="100%" height={140} shape="rounded" borderRadius={10} />
    <Bone {...p} width="70%"  height={16}  shape="text" />
    <Bone {...p} width="50%"  height={13}  shape="text" />
    <Stack horizontal gap={8} marginTop={4}>
      <Bone {...p} width={32} height={32} shape="circle" />
      <Stack flex={1} gap={6}>
        <Bone {...p} width="60%" height={12} shape="text" />
        <Bone {...p} width="40%" height={11} shape="text" />
      </Stack>
    </Stack>
  </Stack>
)

const ListItemTemplate: React.FC<{ colors: SkeletonColors; animation: SkeletonAnimation; speed: number }> = (p) => (
  <Stack horizontal gap={14} alignItems="center" paddingVertical={12} paddingHorizontal={4}>
    <Bone {...p} width={48} height={48} shape="circle" />
    <Stack flex={1} gap={8}>
      <Bone {...p} width="65%" height={14} shape="text" />
      <Bone {...p} width="45%" height={12} shape="text" />
    </Stack>
    <Bone {...p} width={48} height={12} shape="text" />
  </Stack>
)

const ProfileTemplate: React.FC<{ colors: SkeletonColors; animation: SkeletonAnimation; speed: number }> = (p) => (
  <Stack alignItems="center" gap={14} paddingVertical={24}>
    <Bone {...p} width={80} height={80} shape="circle" />
    <Stack alignItems="center" gap={8} width="100%">
      <Bone {...p} width={140} height={18} shape="text" />
      <Bone {...p} width={100} height={13} shape="text" />
    </Stack>
    <Stack horizontal gap={24} justifyContent="center">
      {[0,1,2].map(i => (
        <Stack key={i} alignItems="center" gap={6}>
          <Bone {...p} width={40} height={18} shape="text" />
          <Bone {...p} width={52} height={12} shape="text" />
        </Stack>
      ))}
    </Stack>
  </Stack>
)

const ArticleTemplate: React.FC<{ colors: SkeletonColors; animation: SkeletonAnimation; speed: number }> = (p) => (
  <Stack gap={12} paddingVertical={8}>
    <Bone {...p} width="100%" height={200} shape="rounded" borderRadius={12} />
    <Bone {...p} width="30%"  height={11}  shape="text" />
    <Bone {...p} width="90%"  height={20}  shape="text" />
    <Bone {...p} width="80%"  height={20}  shape="text" />
    <Stack gap={8} marginTop={4}>
      {[100, 90, 95, 60].map((w, i) => (
        <Bone key={i} {...p} width={`${w}%` as any} height={13} shape="text" />
      ))}
    </Stack>
  </Stack>
)

const GridTemplate: React.FC<{ colors: SkeletonColors; animation: SkeletonAnimation; speed: number }> = (p) => (
  <Stack gap={12}>
    <Stack horizontal gap={12}>
      {[0,1].map(i => (
        <Stack key={i} flex={1} gap={8}>
          <Bone {...p} width="100%" height={120} shape="rounded" borderRadius={10} />
          <Bone {...p} width="70%"  height={13}  shape="text" />
          <Bone {...p} width="50%"  height={12}  shape="text" />
        </Stack>
      ))}
    </Stack>
    <Stack horizontal gap={12}>
      {[0,1].map(i => (
        <Stack key={i} flex={1} gap={8}>
          <Bone {...p} width="100%" height={120} shape="rounded" borderRadius={10} />
          <Bone {...p} width="80%"  height={13}  shape="text" />
          <Bone {...p} width="55%"  height={12}  shape="text" />
        </Stack>
      ))}
    </Stack>
  </Stack>
)

// ─── Main export ─────────────────────────────────────────────────────────────
export const StyledSkeleton: React.FC<StyledSkeletonProps> = ({
  width,
  height = 16,
  shape = 'rect',
  borderRadius,
  template,
  repeat = 1,
  animation = 'shimmer',
  speed = 1400,
  skeletonTheme = 'light',
  colors: overrides,
  style,
  children,
}) => {
  const c = {
    ...(skeletonTheme === 'dark' ? DARK_COLORS : LIGHT_COLORS),
    ...overrides,
  }

  const boneProps = { colors: c, animation, speed }

  // Template mode
  if (template) {
    const TemplateMap: Record<SkeletonTemplate, React.FC<typeof boneProps>> = {
      'card':      CardTemplate,
      'list-item': ListItemTemplate,
      'profile':   ProfileTemplate,
      'article':   ArticleTemplate,
      'grid':      GridTemplate,
    }
    const Template = TemplateMap[template]
    return (
      <Stack gap={14}>
        {Array.from({ length: repeat }).map((_, i) => (
          <Template key={i} {...boneProps} />
        ))}
      </Stack>
    )
  }

  // Primitive mode
  if (children) {
    return <Stack>{children}</Stack>
  }

  return (
    <Bone
      {...boneProps}
      width={width ?? '100%'}
      height={height}
      shape={shape}
      borderRadius={borderRadius}
      style={style}
    />
  )
}

// ─── Convenience sub-components ──────────────────────────────────────────────
StyledSkeleton.displayName = 'StyledSkeleton'

export { Bone as SkeletonBone }
export { LIGHT_COLORS as SKELETON_LIGHT, DARK_COLORS as SKELETON_DARK }
export default StyledSkeleton