import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from 'react'
import type { LayoutChangeEvent } from 'react-native'
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'

import { resolveTheme }       from '../utiles/theme'
import {
  COLLAPSE_DARK,
  COLLAPSE_LIGHT,
  type CollapseColors,
  type CollapseProps,
  type CollapseVariant,
  type CollapseSize,
} from './interface'
import {
  S,
  headerPadStyle,
  bodyPadStyle,
  titleTextStyle,
  subtitleTextStyle,
} from './style'

// ─── Chevron ──────────────────────────────────────────────────────────────────

interface ChevronProps {
  rotate: Animated.Value
  color:  string
  size:   number
  style?: any
}

/**
 * Single Animated.View that rotates 0 → 180 deg.
 * Driven by the same Animated.Value as the body height so they stay in sync.
 */
const AnimatedChevron: React.FC<ChevronProps> = ({ rotate, color, size, style }) => {
  const spin = rotate.interpolate({
    inputRange:  [0, 1],
    outputRange: ['0deg', '180deg'],
  })
  return (
    <Animated.View style={[S.icon_wrap, style, { transform: [{ rotate: spin }] }]}>
      {/* Simple SVG-free chevron drawn with borders */}
      <View
        style={{
          width:        size * 0.55,
          height:       size * 0.55,
          borderRightWidth: 2,
          borderBottomWidth: 2,
          borderColor:  color,
          transform:    [{ rotate: '45deg' }, { translateY: -size * 0.12 }],
        }}
      />
    </Animated.View>
  )
}

// ─── Root style helper ────────────────────────────────────────────────────────

function getRootStyle(
  variant: CollapseVariant,
  square: boolean,
  colors: CollapseColors,
) {
  switch (variant) {
    case 'card':
      return [
        S.root_card,
        square && S.root_card_square,
        {
          backgroundColor: colors.background,
          borderColor:     colors.border,
          shadowColor:     colors.shadow,
          shadowOpacity:   0.08,
        },
      ]
    case 'bordered':
      return [
        S.root_bordered,
        {
          backgroundColor: colors.background,
          borderColor:     colors.border,
        },
      ]
    case 'ghost':
      return [S.root_ghost]
    default: // 'cell'
      return [S.root_cell, { backgroundColor: colors.background }]
  }
}

// ─── Collapse ─────────────────────────────────────────────────────────────────

const Collapse: React.FC<CollapseProps> = ({
  children,

  // Header
  title,
  subtitle,
  leading,
  trailing,
  headerStyle,
  titleStyle,
  subtitleStyle,
  iconStyle,
  iconColor,
  iconSize   = 16,
  hideIcon   = false,
  bodyStyle,

  // Renderers
  renderHeader,
  renderHeaderRight,
  renderBody,

  // State
  collapse,
  defaultCollapse,
  onCollapse,
  onAnimationEnd,

  // Appearance
  variant      = 'cell',
  size         = 'md',
  bodyPadding  = true,
  headerDivider,
  bodyDivider,
  square       = false,
  activeHeader = false,
  disabled     = false,

  // Behaviour
  lazyRender     = true,
  destroyOnClose = false,

  // Theming
  duration = 260,
  colors: colorOverrides,

  style,
  testID,
}) => {

  // ── Colour resolution ─────────────────────────────────────────────────────
  const deviceScheme = useColorScheme()
  // Default theme inferred from device; callers can override via `colors`
  const baseColors = resolveTheme('system', deviceScheme) === 'light'
    ? COLLAPSE_LIGHT
    : COLLAPSE_DARK

  const colors: CollapseColors = useMemo(
    () => colorOverrides ? { ...baseColors, ...colorOverrides } : baseColors,
    [baseColors, colorOverrides],
  )

  // ── Default dividers per variant ──────────────────────────────────────────
  const showHeaderDivider = headerDivider ?? (variant === 'cell' || variant === 'bordered')
  const showBodyDivider   = bodyDivider   ?? false

  // ── Internal open state ───────────────────────────────────────────────────
  // Supports both controlled (`collapse` prop) and uncontrolled (`defaultCollapse`).
  const isControlled   = collapse !== undefined
  const [localOpen, setLocalOpen] = useState(defaultCollapse ?? false)
  const open = isControlled ? collapse! : localOpen

  // Keep a ref so animation callbacks always read the latest value
  const openRef = useRef(open)
  openRef.current = open

  const toggle = useCallback(() => {
    if (disabled) return
    const next = !openRef.current
    if (!isControlled) setLocalOpen(next)
    onCollapse?.(next)
  }, [disabled, isControlled, onCollapse])

  // ── Lazy / destroy render gate ────────────────────────────────────────────
  const hasEverOpened = useRef(open)
  if (open) hasEverOpened.current = true

  const bodyChildren = useMemo(() => {
    if (destroyOnClose && !open) return null
    if (lazyRender && !hasEverOpened.current) return null
    return renderBody ? renderBody() : children
  }, [destroyOnClose, lazyRender, open, renderBody, children])

  // ── Animation ─────────────────────────────────────────────────────────────
  const bodyHeight  = useRef(0)
  const heightAnim  = useRef(new Animated.Value(open ? 9999 : 0)).current  // 9999 overridden on first layout
  const chevronAnim = useRef(new Animated.Value(open ? 1   : 0)).current

  const animRef = useRef<Animated.CompositeAnimation | null>(null)

  const runAnimation = useCallback(
    (toOpen: boolean, immediate?: boolean) => {
      animRef.current?.stop()

      const targetH = toOpen ? bodyHeight.current : 0
      const dur     = immediate ? 0 : duration

      animRef.current = Animated.parallel([
        Animated.timing(heightAnim, {
          toValue:         targetH,
          duration:        dur,
          easing:          toOpen ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(chevronAnim, {
          toValue:         toOpen ? 1 : 0,
          duration:        dur,
          easing:          toOpen ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ])

      animRef.current.start(({ finished }) => {
        if (finished) onAnimationEnd?.(toOpen)
      })
    },
    [heightAnim, chevronAnim, duration, onAnimationEnd],
  )

  // ── Sync `open` → animation ───────────────────────────────────────────────
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      // On mount: jump to final state without animating
      if (open && bodyHeight.current > 0) runAnimation(open, true)
      isFirstRender.current = false
      return
    }
    runAnimation(open)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Body layout — real height fed back into animation ─────────────────────
  const handleBodyLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const h = e.nativeEvent.layout.height
      if (h === bodyHeight.current) return
      bodyHeight.current = h
      // If currently open, jump to the new measured height immediately
      if (openRef.current) runAnimation(true, true)
    },
    [runAnimation],
  )

  // ── Chevron ───────────────────────────────────────────────────────────────
  const resolvedIconColor = (iconColor as string) ?? colors.iconColor

  const chevronNode = hideIcon ? null : (
    <AnimatedChevron
      rotate={chevronAnim}
      color={resolvedIconColor}
      size={iconSize}
      style={iconStyle}
    />
  )

  const headerRightNode = renderHeaderRight
    ? renderHeaderRight(open, chevronNode)
    : (
      <>
        {trailing ? <View style={S.trailing}>{trailing}</View> : null}
        {chevronNode}
      </>
    )

  // ── Header ────────────────────────────────────────────────────────────────
  const hPad = headerPadStyle(size)

  const headerContent = renderHeader ? renderHeader(open) : (
    <View
      style={[
        S.header,
        hPad,
        open && activeHeader && { backgroundColor: colors.activeHeaderBg },
        disabled && { opacity: 0.4 },
        headerStyle,
      ]}
    >
      {leading ? <View style={S.leading}>{leading}</View> : null}

      <View style={S.title_block}>
        {typeof title === 'string' ? (
          <Text
            style={[S.title_base, titleTextStyle(size, colors.titleColor), titleStyle]}
            numberOfLines={1}
          >
            {title}
          </Text>
        ) : (title ?? null)}

        {subtitle ? (
          typeof subtitle === 'string' ? (
            <Text
              style={[S.subtitle_base, subtitleTextStyle(size, colors.subtitleColor), subtitleStyle]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          ) : subtitle
        ) : null}
      </View>

      {headerRightNode}
    </View>
  )

  // ── Body ──────────────────────────────────────────────────────────────────
  const bPad = bodyPadStyle(size)

  const bodyNode = (
    <Animated.View style={[S.body_animated, { height: heightAnim }]}>
      <View collapsable={false} style={S.body_inner} onLayout={handleBodyLayout}>
        <View style={[bodyPadding ? bPad : undefined, bodyStyle]}>
          {bodyChildren}
        </View>
        {showBodyDivider && (
          <View
            style={[
              S.body_divider,
              { backgroundColor: colors.divider, marginHorizontal: hPad.paddingHorizontal },
            ]}
          />
        )}
      </View>
    </Animated.View>
  )

  // ── Root ──────────────────────────────────────────────────────────────────
  return (
    <View
      style={[getRootStyle(variant, square, colors), style]}
      testID={testID}
    >
      <TouchableOpacity
        onPress={toggle}
        activeOpacity={disabled ? 1 : 0.7}
        accessibilityRole="button"
        accessibilityState={{ expanded: open, disabled }}
        accessibilityLabel={typeof title === 'string' ? title : undefined}
      >
        {headerContent}
      </TouchableOpacity>

      {showHeaderDivider && (
        <View style={[S.divider, { backgroundColor: colors.divider }]} />
      )}

      {bodyNode}
    </View>
  )
}

export { Collapse }
