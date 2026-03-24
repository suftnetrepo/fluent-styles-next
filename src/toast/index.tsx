import React, { useEffect, useRef } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export type ToastProps = {
  message: string
  description?: string
  variant?: ToastVariant
  /** Auto-dismiss after ms. Pass `0` to disable. Default: 3500 */
  duration?: number
  onDismiss?: () => void
}

// ─── Theme map ────────────────────────────────────────────────────────────────

const VARIANT_STYLES: Record<
  ToastVariant,
  { bg: string; border: string; icon: string; label: string }
> = {
  success: { bg: '#0d1f0f', border: '#22c55e', icon: '✓', label: '#22c55e' },
  error:   { bg: '#1f0d0d', border: '#ef4444', icon: '✕', label: '#ef4444' },
  warning: { bg: '#1f1a0d', border: '#f59e0b', icon: '!', label: '#f59e0b' },
  info:    { bg: '#0d1220', border: '#3b82f6', icon: 'i', label: '#3b82f6' },
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Toast: React.FC<ToastProps> = ({
  message,
  description,
  variant = 'info',
  duration = 3500,
  onDismiss,
}) => {
  const theme = VARIANT_STYLES[variant]
  const translateY = useRef(new Animated.Value(-20)).current
  const opacity    = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Slide in
    Animated.parallel([
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, damping: 18, stiffness: 200 }),
      Animated.timing(opacity,    { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start()

    if (duration > 0) {
      const timer = setTimeout(dismiss, duration)
      return () => clearTimeout(timer)
    }
  }, [])

  const dismiss = () => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: -20, duration: 220, useNativeDriver: true }),
      Animated.timing(opacity,    { toValue: 0,   duration: 220, useNativeDriver: true }),
    ]).start(() => onDismiss?.())
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: theme.bg, borderColor: theme.border, opacity, transform: [{ translateY }] },
      ]}
    >
      {/* Icon badge */}
      <View style={[styles.iconBadge, { borderColor: theme.border }]}>
        <Text style={[styles.iconText, { color: theme.label }]}>{theme.icon}</Text>
      </View>

      {/* Text */}
      <View style={styles.textBlock}>
        <Text style={[styles.message, { color: theme.label }]}>{message}</Text>
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
      </View>

      {/* Dismiss */}
      <TouchableOpacity onPress={dismiss} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Text style={styles.close}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
    minWidth: 280,
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 13,
    fontWeight: '700',
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  message: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  description: {
    fontSize: 12,
    color: '#9ca3af',
    lineHeight: 16,
  },
  close: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
})