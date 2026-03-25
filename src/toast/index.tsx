import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'
import {
  ComponentTheme,
  resolveTheme,
  ToastColors,
  TOAST_DARK,
  TOAST_LIGHT,
} from '../utiles/theme'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export type ToastProps = {
  message:      string
  description?: string
  variant?:     ToastVariant
  /** Auto-dismiss after ms. Pass `0` to disable. Default: 3500. */
  duration?:    number
  /** Called after the exit animation completes — used by the hook to unmount. */
  onDismiss?:   () => void
  /**
   * Color scheme. `'dark'` (default) | `'light'` | `'system'`.
   */
  theme?:       ComponentTheme
  /**
   * Fine-grained token overrides on top of the active theme.
   * @example
   * ```tsx
   * toast.show({ variant: 'success', theme: 'light', colors: { successBorder: '#059669' } })
   * ```
   */
  colors?:      Partial<ToastColors>
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const VARIANT_ICON: Record<ToastVariant, string> = {
  success: '✓',
  error:   '✕',
  warning: '!',
  info:    'i',
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Toast: React.FC<ToastProps> = ({
  message,
  description,
  variant      = 'info',
  duration     = 3500,
  onDismiss,
  theme        = 'dark',
  colors: colorOverrides,
}) => {
  const deviceScheme = useColorScheme()

  const colors = useMemo<ToastColors>(() => {
    const base = resolveTheme(theme, deviceScheme) === 'light' ? TOAST_LIGHT : TOAST_DARK
    return colorOverrides ? { ...base, ...colorOverrides } : base
  }, [theme, deviceScheme, colorOverrides])

  // Resolved per-variant tokens
  const bg     = colors[`${variant}Bg`     as keyof ToastColors] as string
  const border = colors[`${variant}Border` as keyof ToastColors] as string
  const label  = colors[`${variant}Label`  as keyof ToastColors] as string
  const icon   = VARIANT_ICON[variant]

  // ── Animation ────────────────────────────────────────────────────────────
  const translateY   = useRef(new Animated.Value(-20)).current
  const opacity      = useRef(new Animated.Value(0)).current
  const isDismissing = useRef(false)

  const onDismissRef = useRef(onDismiss)
  useEffect(() => { onDismissRef.current = onDismiss }, [onDismiss])

  const dismiss = useCallback(() => {
    if (isDismissing.current) return
    isDismissing.current = true
    Animated.parallel([
      Animated.timing(translateY, { toValue: -20, duration: 220, useNativeDriver: true }),
      Animated.timing(opacity,    { toValue: 0,   duration: 220, useNativeDriver: true }),
    ]).start(() => onDismissRef.current?.())
  }, [translateY, opacity])

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, damping: 18, stiffness: 200 }),
      Animated.timing(opacity,    { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start()
    if (duration > 0) {
      const t = setTimeout(dismiss, duration)
      return () => clearTimeout(t)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: bg, borderColor: border, opacity, transform: [{ translateY }] },
      ]}
    >
      {/* Icon badge */}
      <View style={[styles.iconBadge, { borderColor: border }]}>
        <Text style={[styles.iconText, { color: label }]}>{icon}</Text>
      </View>

      {/* Text */}
      <View style={styles.textBlock}>
        <Text style={[styles.message, { color: label }]}>{message}</Text>
        {description ? (
          <Text style={[styles.description, { color: colors.description }]}>
            {description}
          </Text>
        ) : null}
      </View>

      {/* Close */}
      <TouchableOpacity onPress={dismiss} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Text style={[styles.close, { color: colors.closeIcon }]}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

// ─── Styles (layout only) ─────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection:     'row',
    alignItems:        'center',
    borderWidth:       1,
    borderRadius:      10,
    paddingHorizontal: 14,
    paddingVertical:   12,
    gap:               12,
    minWidth:          280,
    maxWidth:          360,
    shadowColor:       '#000',
    shadowOffset:      { width: 0, height: 8 },
    shadowOpacity:     0.2,
    shadowRadius:      16,
    elevation:         8,
  },
  iconBadge: {
    width:          28,
    height:         28,
    borderRadius:   14,
    borderWidth:    1.5,
    alignItems:     'center',
    justifyContent: 'center',
  },
  iconText:    { fontSize: 13, fontWeight: '700' },
  textBlock:   { flex: 1, gap: 2 },
  message:     { fontSize: 14, fontWeight: '600', letterSpacing: 0.1 },
  description: { fontSize: 12, lineHeight: 16 },
  close:       { fontSize: 12, fontWeight: '600' },
})

export { TOAST_DARK, TOAST_LIGHT }
export type { ToastColors }
