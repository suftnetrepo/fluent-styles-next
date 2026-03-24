import React, { useEffect, useRef } from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native'

// ─── Types ────────────────────────────────────────────────────────────────────

export type LoaderVariant = 'spinner' | 'pulse' | 'dots'

export type LoaderProps = {
  label?: string
  variant?: LoaderVariant
  /** Tint colour for the indicator. Default: #6366f1 */
  color?: string
  /** Whether to render a full-screen opaque overlay (blocking UX). */
  overlay?: boolean
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

const Spinner: React.FC<{ color: string }> = ({ color }) => {
  const rotate = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()
  }, [])

  const spin = rotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] })

  return (
    <Animated.View style={[spinnerStyles.ring, { borderTopColor: color, transform: [{ rotate: spin }] }]} />
  )
}

const spinnerStyles = StyleSheet.create({
  ring: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: 'transparent',
  },
})

// ─── Pulse ────────────────────────────────────────────────────────────────────

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

  return (
    <Animated.View
      style={[pulseStyles.dot, { backgroundColor: color, opacity, transform: [{ scale }] }]}
    />
  )
}

const pulseStyles = StyleSheet.create({
  dot: { width: 28, height: 28, borderRadius: 14 },
})

// ─── Dots ─────────────────────────────────────────────────────────────────────

const Dots: React.FC<{ color: string }> = ({ color }) => {
  const anims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ]

  useEffect(() => {
    const makeSeq = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: -8, duration: 300, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0,  duration: 300, useNativeDriver: true }),
          Animated.delay(600 - delay),
        ]),
      )

    anims.forEach((a, i) => makeSeq(a, i * 150).start())
  }, [])

  return (
    <View style={dotsStyles.row}>
      {anims.map((anim, i) => (
        <Animated.View
          key={i}
          style={[dotsStyles.dot, { backgroundColor: color, transform: [{ translateY: anim }] }]}
        />
      ))}
    </View>
  )
}

const dotsStyles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5 },
})

// ─── Main Loader ──────────────────────────────────────────────────────────────

export const Loader: React.FC<LoaderProps> = ({
  label,
  variant = 'spinner',
  color = '#6366f1',
  overlay = true,
}) => {
  const indicator = {
    spinner: <Spinner color={color} />,
    pulse:   <Pulse color={color} />,
    dots:    <Dots color={color} />,
  }[variant]

  if (overlay) {
    return (
      <View style={styles.overlay}>
        <View style={styles.card}>
          {indicator}
          {label ? <Text style={styles.label}>{label}</Text> : null}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.inline}>
      {indicator}
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.72)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#94949a',
    borderWidth: 0.5,
    borderColor: '#94949a',
    borderRadius: 8,
    padding: 32,
  
    // paddingVertical: 32,
    // paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 16 },
    // shadowOpacity: 0.6,
    // shadowRadius: 24,
    // elevation: 12,
  },
  inline: {
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#a1a1aa',
    letterSpacing: 0.2,
  },
})
