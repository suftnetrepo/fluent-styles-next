import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { LayoutChangeEvent, LayoutRectangle } from 'react-native'
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native'
import { Stack, StyledText, StyledPressable } from 'fluent-styles'

import {
  TAB_BAR_COLORS_DARK,
  TAB_BAR_COLORS_LIGHT,
  type IndicatorStyle,
  type TabBarColors,
  type TabBarProps,
  type TabBarVariant,
  type TabValue,
} from './interface'

// ─── Badge ────────────────────────────────────────────────────────────────────

const Badge: React.FC<{ value: number | string; color: string }> = ({ value, color }) => {
  const isDot = value === ''
  return (
    <Stack
      position="absolute"
      top={-4}
      right={isDot ? -4 : -8}
      minWidth={isDot ? 8 : 16}
      height={isDot ? 8 : 16}
      borderRadius={isDot ? 4 : 8}
      alignItems="center"
      justifyContent="center"
      paddingHorizontal={isDot ? 0 : 3}
      backgroundColor={isDot ? undefined : '#ef4444'}
    >
      {isDot ? (
        <Stack width={6} height={6} borderRadius={3} backgroundColor={color} />
      ) : (
        <StyledText fontSize={9} fontWeight="700" color={color}>
          {typeof value === 'number' && value > 99 ? '99+' : value}
        </StyledText>
      )}
    </Stack>
  )
}

// ─── Indicator ────────────────────────────────────────────────────────────────
// NOTE: Animated.View is kept here intentionally — fluent-styles Stack does not
// accept Animated values for left/width, which are required for the sliding
// animation. This is the only place native Animated.View remains.

interface IndicatorProps {
  type:    IndicatorStyle
  left:    Animated.Value
  width:   Animated.Value
  height:  number
  color:   string
  radius?: number
  visible: boolean
}

const Indicator: React.FC<IndicatorProps> = ({
  type, left, width, height, color, radius, visible,
}) => {
  if (!visible) return null

  if (type === 'pill') {
    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            left,
            width,
            backgroundColor: color,
            borderRadius:    radius ?? 999,
            // FIX: removed opacity: 0.15 — pill is now fully opaque
          },
        ]}
      />
    )
  }

  if (type === 'dot') {
    return (
      <Animated.View
        style={{
          position:        'absolute',
          bottom:          4,
          left,
          width,
          height,
          borderRadius:    height / 2,
          backgroundColor: color,
        }}
      />
    )
  }

  // line
  return (
    <Animated.View
      style={{
        position:        'absolute',
        bottom:          0,
        left,
        width,
        height,
        borderRadius:    radius ?? height / 2,
        backgroundColor: color,
      }}
    />
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveIndicatorHeight(type: IndicatorStyle | false, explicit?: number): number {
  if (explicit !== undefined) return explicit
  if (type === 'line') return 3
  if (type === 'dot')  return 6
  return 3
}

function resolveBarHeight(hasIcons: boolean, hasIndicator: boolean, explicit?: number): number {
  if (explicit !== undefined) return explicit
  if (hasIcons)     return 52
  if (hasIndicator) return 44
  return 48
}

function getVariantChipProps(variant: TabBarVariant, isActive: boolean, colors: TabBarColors) {
  if (variant === 'card' || variant === 'solid') {
    return isActive
      ? { backgroundColor: colors.activeChipBg, borderRadius: 8 }
      : { backgroundColor: 'transparent' }
  }
  return {}
}

// ─── TabBar ───────────────────────────────────────────────────────────────────

function TabBarInner<T extends TabValue>(props: TabBarProps<T>) {
  const {
    options,
    value: controlledValue,
    defaultValue,
    onChange,
    indicator            = false,
    indicatorWidth,
    indicatorHeight,
    indicatorColor,
    indicatorRadius,
    tabAlign             = 'center',
    height,
    variant              = 'default',
    labelBulge           = 1,
    showBorder           = false,
    tabPaddingHorizontal = 12,
    iconLabelGap         = 4,
    fontSize             = 14,
    iconFontSize         = 11,
    textColor,
    activeTextColor,
    colors: colorOverrides,
    style,
    contentStyle,
    tabStyle,
    testID,
  } = props

  // ── Colours ──────────────────────────────────────────────────────────────
  const scheme = useColorScheme()
  const baseColors: TabBarColors = scheme === 'dark' ? TAB_BAR_COLORS_DARK : TAB_BAR_COLORS_LIGHT
  const colors: TabBarColors = useMemo(
    () => colorOverrides ? { ...baseColors, ...colorOverrides } : baseColors,
    [baseColors, colorOverrides],
  )
  const resolvedTextColor       = (textColor      as string) ?? colors.text
  const resolvedActiveTextColor = (activeTextColor as string) ?? colors.activeText
  const resolvedIndicatorColor  = (indicatorColor  as string) ?? colors.indicator

  // ── State ────────────────────────────────────────────────────────────────
  const isControlled = controlledValue !== undefined
  const [localValue, setLocalValue] = useState<T>(defaultValue ?? options[0]?.value)
  const active    = isControlled ? controlledValue! : localValue
  const activeRef = useRef(active)
  activeRef.current = active

  const handlePress = useCallback((val: T) => {
    if (val === activeRef.current) return
    if (!isControlled) setLocalValue(val)
    onChange?.(val)
  }, [isControlled, onChange])

  // ── Layout measurement ────────────────────────────────────────────────────
  const tabCount = options.length
  const layouts  = useRef<{ tab?: LayoutRectangle; text?: LayoutRectangle }[]>(
    Array.from({ length: tabCount }, () => ({})),
  )
  const [layoutReady, setLayoutReady] = useState(false)

  const prevOptionsLen = useRef(tabCount)
  if (prevOptionsLen.current !== tabCount) {
    prevOptionsLen.current = tabCount
    layouts.current = Array.from({ length: tabCount }, () => ({}))
    setLayoutReady(false)
  }

  const checkReady = useCallback(() => {
    if (layouts.current.every(l => l.tab && l.text)) setLayoutReady(true)
  }, [])

  const onLayoutTab  = useCallback((i: number) => (e: LayoutChangeEvent) => {
    layouts.current[i] = { ...layouts.current[i], tab: e.nativeEvent.layout }
    checkReady()
  }, [checkReady])

  const onLayoutText = useCallback((i: number) => (e: LayoutChangeEvent) => {
    layouts.current[i] = { ...layouts.current[i], text: e.nativeEvent.layout }
    checkReady()
  }, [checkReady])

  // ── Indicator animation ──────────────────────────────────────────────────
  const indLeft  = useRef(new Animated.Value(0)).current
  const indWidth = useRef(new Animated.Value(0)).current
  const indH     = resolveIndicatorHeight(indicator, indicatorHeight)
  const scrollRef   = useRef<ScrollView>(null)
  const barWidthRef = useRef(0)

  const navigateTo = useCallback((idx: number) => {
    const layout = layouts.current[idx]
    if (!layout.tab || !layout.text) return
    const iw = indicatorWidth === undefined
      ? (indicator === 'pill' ? layout.tab.width : layout.text.width)
      : indicatorWidth === 0
      ? layout.tab.width
      : indicatorWidth!
    const il = layout.tab.x + (layout.tab.width - iw) / 2
    Animated.parallel([
      Animated.timing(indLeft,  { toValue: il, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
      Animated.timing(indWidth, { toValue: iw, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
    ]).start()
    if (tabAlign === 'scroll') {
      scrollRef.current?.scrollTo({ x: layout.tab.x + layout.tab.width / 2 - barWidthRef.current / 2, animated: true })
    }
  }, [indLeft, indWidth, indicatorWidth, indicator, tabAlign])

  useEffect(() => {
    if (!indicator || !layoutReady) return
    const idx = options.findIndex(o => o.value === active)
    if (idx >= 0) navigateTo(idx)
  }, [active, layoutReady, indicator, options, navigateTo])

  // ── Dimensions ───────────────────────────────────────────────────────────
  const hasIcons  = options.some(o => !!o.iconRender)
  const barHeight = resolveBarHeight(hasIcons, !!indicator, height)
  const bulgeFactor = typeof labelBulge === 'boolean' ? (labelBulge ? 1.2 : 1) : labelBulge

  // ── Render each tab ──────────────────────────────────────────────────────
  const renderTab = (item: (typeof options)[number], index: number) => {
    const isActive   = item.value === active
    const isDisabled = item.disabled ?? false

    // FIX: pill/line/dot use resolvedActiveTextColor (label sits on indicator bg)
    // solid/card use activeChipText (label sits on per-tab chip bg)
    const labelColor = isActive
      ? (variant === 'solid' || variant === 'card') ? colors.activeChipText : resolvedActiveTextColor
      : isDisabled ? colors.disabled
      : resolvedTextColor

    const chipProps = getVariantChipProps(variant, isActive, colors)

    return (
      <StyledPressable
        key={String(item.value)}
        disabled={isDisabled}
        onPress={() => handlePress(item.value)}
        onLayout={onLayoutTab(index)}
        alignItems="center"
        justifyContent="center"
        height="100%"
        flexDirection="column"
        paddingHorizontal={tabPaddingHorizontal}
        paddingVertical={hasIcons ? 6 : undefined}
        {...(tabAlign === 'center' ? { flex: 1 } : {})}
        {...chipProps}
        {...(tabStyle as object)}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive, disabled: isDisabled }}
      >
        {item.iconRender?.(
          isActive ? resolvedActiveTextColor : resolvedTextColor,
          isActive,
        )}

        <Stack
          position="relative"
          alignItems="center"
          onLayout={onLayoutText(index)}
        >
          <StyledText
            fontSize={hasIcons ? iconFontSize : fontSize}
            color={labelColor}
            fontWeight={isActive ? '600' : '400'}
            textAlign="center"
            marginTop={item.iconRender ? iconLabelGap : 0}
            style={isActive && bulgeFactor !== 1
              ? { transform: [{ scaleX: bulgeFactor }, { scaleY: bulgeFactor }] }
              : undefined}
          >
            {item.label}
          </StyledText>

          {item.badge !== undefined && (
            <Badge value={item.badge} color={colors.badge} />
          )}
        </Stack>
      </StyledPressable>
    )
  }

  // ── Content ──────────────────────────────────────────────────────────────
  const indicatorEl = indicator ? (
    <Indicator
      type={indicator} left={indLeft} width={indWidth}
      height={indH} color={resolvedIndicatorColor}
      radius={indicatorRadius} visible={layoutReady}
    />
  ) : null

  const borderProps = (showBorder || variant === 'underline')
    ? { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border }
    : {}

  return (
    <Stack
      testID={testID}
      flexDirection="row"
      overflow="hidden"
      height={barHeight}
      backgroundColor={colors.background}
      {...borderProps}
      {...(style as object)}
    >
      {tabAlign === 'center' ? (
        <Stack
          flex={1}
          flexDirection="row"
          alignItems="center"
          position="relative"
          {...(contentStyle as object)}
        >
          {indicatorEl}
          {options.map(renderTab)}
        </Stack>
      ) : (
        <ScrollView
          ref={scrollRef}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={[
            { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4, position: 'relative', flexGrow: 1 },
            contentStyle,
          ]}
          onLayout={e => { barWidthRef.current = e.nativeEvent.layout.width }}
        >
          {indicatorEl}
          {options.map(renderTab)}
        </ScrollView>
      )}
    </Stack>
  )
}

export const TabBar = memo(TabBarInner) as <T extends TabValue>(
  p: TabBarProps<T>,
) => React.JSX.Element