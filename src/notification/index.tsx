import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Animated,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'
import {
  ComponentTheme,
  resolveTheme,
  NotificationColors,
  NOTIFICATION_DARK,
  NOTIFICATION_LIGHT,
} from '../utiles/theme'

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotificationProps = {
  title:         string
  body:          string
  avatar?:       ImageSourcePropType
  initials?:     string
  source?:       string
  timestamp?:    string
  actionLabel?:  string
  onAction?:     () => void
  onDismiss?:    () => void
  duration?:     number
  theme?:        ComponentTheme
  colors?:       Partial<NotificationColors>
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Notification: React.FC<NotificationProps> = ({
  title,
  body,
  avatar,
  initials,
  source,
  timestamp,
  actionLabel,
  onAction,
  onDismiss,
  duration   = 5000,
  theme      = 'dark',
  colors: colorOverrides,
}) => {
  const deviceScheme = useColorScheme()

  const colors = useMemo<NotificationColors>(() => {
    const base = resolveTheme(theme, deviceScheme) === 'light'
      ? NOTIFICATION_LIGHT
      : NOTIFICATION_DARK
    return colorOverrides ? { ...base, ...colorOverrides } : base
  }, [theme, deviceScheme, colorOverrides])

  // ── Animation ────────────────────────────────────────────────────────────
  const translateX   = useRef(new Animated.Value(360)).current
  const opacity      = useRef(new Animated.Value(0)).current
  const isDismissing = useRef(false)

  const onDismissRef = useRef(onDismiss)
  useEffect(() => { onDismissRef.current = onDismiss }, [onDismiss])

  const dismiss = useCallback(() => {
    if (isDismissing.current) return
    isDismissing.current = true
    Animated.parallel([
      Animated.timing(translateX, { toValue: 360, duration: 260, useNativeDriver: true }),
      Animated.timing(opacity,    { toValue: 0,   duration: 200, useNativeDriver: true }),
    ]).start(() => onDismissRef.current?.())
  }, [translateX, opacity])

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, { toValue: 0, useNativeDriver: true, damping: 22, stiffness: 250 }),
      Animated.timing(opacity,    { toValue: 1, duration: 180, useNativeDriver: true }),
    ]).start()
    if (duration > 0) {
      const t = setTimeout(dismiss, duration)
      return () => clearTimeout(t)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAction = useCallback(() => {
    onAction?.()
    dismiss()
  }, [onAction, dismiss])

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: colors.background, borderColor: colors.border, opacity, transform: [{ translateX }] },
      ]}
    >
      {/* Avatar */}
      <View style={styles.avatarWrap}>
        {avatar ? (
          <Image source={avatar} style={styles.avatarImage} />
        ) : (
          <View style={[styles.avatarFallback, { backgroundColor: colors.avatarBg, borderColor: colors.avatarBorder }]}>
            <Text style={[styles.avatarInitials, { color: colors.avatarInitials }]}>{initials ?? '?'}</Text>
          </View>
        )}
      </View>

      {/* Body */}
      <View style={styles.content}>
        {source ? (
          <Text style={[styles.source, { color: colors.source }]} numberOfLines={1}>{source}</Text>
        ) : null}
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: colors.title }]} numberOfLines={1}>{title}</Text>
          {timestamp ? (
            <Text style={[styles.timestamp, { color: colors.timestamp }]}>{timestamp}</Text>
          ) : null}
        </View>
        <Text style={[styles.body, { color: colors.body }]} numberOfLines={2}>{body}</Text>
        {actionLabel ? (
          <TouchableOpacity
            onPress={handleAction}
            style={[styles.actionBtn, { backgroundColor: colors.actionBg, borderColor: colors.actionBorder }]}
          >
            <Text style={[styles.actionLabel, { color: colors.actionLabel }]}>{actionLabel}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Close */}
      <TouchableOpacity
        onPress={dismiss}
        style={styles.closeBtn}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={[styles.closeIcon, { color: colors.closeIcon }]}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

// ─── Styles (layout only) ─────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth:   1,
    borderRadius:  14,
    padding:       14,
    gap:           12,
    width:         340,
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius:  20,
    elevation:     10,
  },
  avatarWrap:     { paddingTop: 2 },
  avatarImage:    { width: 40, height: 40, borderRadius: 20 },
  avatarFallback: {
    width: 40, height: 40, borderRadius: 20,
    borderWidth: 1, alignItems: 'center', justifyContent: 'center',
  },
  avatarInitials: { fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  content:        { flex: 1, gap: 3 },
  source:         { fontSize: 11, fontWeight: '600', letterSpacing: 0.8, textTransform: 'uppercase' },
  titleRow:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title:          { fontSize: 14, fontWeight: '700', flex: 1 },
  timestamp:      { fontSize: 11, marginLeft: 8 },
  body:           { fontSize: 13, lineHeight: 18 },
  actionBtn: {
    alignSelf: 'flex-start', marginTop: 6,
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 6, borderWidth: 1,
  },
  actionLabel:    { fontSize: 12, fontWeight: '600' },
  closeBtn:       { paddingTop: 2 },
  closeIcon:      { fontSize: 12, fontWeight: '600' },
})

export { NOTIFICATION_DARK, NOTIFICATION_LIGHT }
export type { NotificationColors }
