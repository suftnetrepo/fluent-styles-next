import React, { useEffect, useMemo, useRef } from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'
import {
  ComponentTheme,
  resolveTheme,
  LoaderColors,
  LOADER_DARK,
  LOADER_LIGHT,
} from '../utiles/theme'
import { Circular } from './circular'

// ─── Types ────────────────────────────────────────────────────────────────────

export type LoaderVariant = 'spinner' | 'pulse' | 'dots' |'circular'

export type LoaderProps = {
  label?:    string
  variant?:  LoaderVariant
  /** Overrides the indicator tint from the theme. */
  color?:    string
  overlay?:  boolean
  theme?:    ComponentTheme
  colors?:   Partial<LoaderColors>
}

// ─── Indicators ───────────────────────────────────────────────────────────────

const Spinner: React.FC<{ color: string }> = ({ color }) => {
  const rotate = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, { toValue: 1, duration: 800, easing: Easing.linear, useNativeDriver: true }),
    ).start()
  }, [])
  const spin = rotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] })
  return <Animated.View style={[ind.ring, { borderTopColor: color, transform: [{ rotate: spin }] }]} />
}

const Pulse: React.FC<{ color: string }> = ({ color }) => {
  const scale   = useRef(new Animated.Value(1)).current
  const opacity = useRef(new Animated.Value(0.8)).current
  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale,   { toValue: 1.6, duration: 700, easing: Easing.out(Easing.ease), useNativeDriver: true }),
          Animated.timing(scale,   { toValue: 1,   duration: 700, easing: Easing.in(Easing.ease),  useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0.1, duration: 700, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.8, duration: 700, useNativeDriver: true }),
        ]),
      ]),
    ).start()
  }, [])
  return <Animated.View style={[ind.pulse, { backgroundColor: color, opacity, transform: [{ scale }] }]} />
}

const Dots: React.FC<{ color: string }> = ({ color }) => {
  const anims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ]
  useEffect(() => {
    const seq = (anim: Animated.Value, delay: number) =>
      Animated.loop(Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: -8, duration: 300, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0,  duration: 300, useNativeDriver: true }),
        Animated.delay(600 - delay),
      ]))
    anims.forEach((a, i) => seq(a, i * 150).start())
  }, [])
  return (
    <View style={ind.dotsRow}>
      {anims.map((anim, i) => (
        <Animated.View key={i} style={[ind.dot, { backgroundColor: color, transform: [{ translateY: anim }] }]} />
      ))}
    </View>
  )
}

const ind = StyleSheet.create({
  ring:    { width: 36, height: 36, borderRadius: 18, borderWidth: 3, borderColor: 'transparent' },
  pulse:   { width: 28, height: 28, borderRadius: 14 },
  dotsRow: { flexDirection: 'row', gap: 8 },
  dot:     { width: 10, height: 10, borderRadius: 5 },
})

// ─── Main component ───────────────────────────────────────────────────────────

export const Loader: React.FC<LoaderProps> = ({
  label,
  variant         = 'spinner',
  color: colorProp,
  overlay         = false,
  theme           = 'dark',
  colors: colorOverrides,
}) => {
  const deviceScheme = useColorScheme()

  const colors = useMemo<LoaderColors>(() => {
    const base = resolveTheme(theme, deviceScheme) === 'light' ? LOADER_LIGHT : LOADER_DARK
    return colorOverrides ? { ...base, ...colorOverrides } : base
  }, [theme, deviceScheme, colorOverrides])

  // `color` prop overrides the theme's indicator tint
  const tint = colorProp ?? colors.indicator

  const indicator = {
    spinner: <Spinner color={tint} />,
    pulse:   <Pulse   color={tint} />,
    dots:    <Dots    color={tint} />,
    circular: <Circular color={tint} />,
  }[variant]

  if (overlay) {
    return (
      <View style={[styles.overlay, { backgroundColor: colors.overlayBg }]}>
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          {indicator}
          {label ? <Text style={[styles.label, { color: colors.label }]}>{label}</Text> : null}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.inline}>
      {indicator}
      {label ? <Text style={[styles.label, { color: colors.label }]}>{label}</Text> : null}
    </View>
  )
}

// ─── Styles (layout only) ─────────────────────────────────────────────────────

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderWidth:       1,
    borderRadius:      16,
    paddingVertical:   32,
    paddingHorizontal: 40,
    alignItems:        'center',
    gap:               16,
    shadowColor:       '#000',
    shadowOffset:      { width: 0, height: 16 },
    shadowOpacity:     0.25,
    shadowRadius:      24,
    elevation:         12,
  },
  inline: { alignItems: 'center', gap: 12 },
  label:  { fontSize: 14, fontWeight: '500', letterSpacing: 0.2 },
})

export { LOADER_DARK, LOADER_LIGHT }
export type { LoaderColors }