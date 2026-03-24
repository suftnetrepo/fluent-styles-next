import React, { useCallback, useEffect, useRef } from 'react'
import {
  Animated,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotificationProps = {
  title: string
  body: string
  /** Optional avatar image shown on the left. */
  avatar?: ImageSourcePropType
  /** Initials fallback when no avatar image is supplied. */
  initials?: string
  /** Label shown above the title (e.g. app name or channel). */
  source?: string
  /** Timestamp string rendered on the top-right. */
  timestamp?: string
  /** Primary action label. */
  actionLabel?: string
  onAction?: () => void
  /** Called after the exit animation completes — use this to unmount the portal. */
  onDismiss?: () => void
  /** Auto-dismiss delay in ms. Pass `0` to disable. Default: 5000. */
  duration?: number
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
  duration = 5000,
}) => {
  const translateX   = useRef(new Animated.Value(360)).current
  const opacity      = useRef(new Animated.Value(0)).current
  const isDismissing = useRef(false)

  // Keep onDismiss in a ref so the animated callback always calls the latest
  // value without needing to be in the useEffect dependency array.
  const onDismissRef = useRef(onDismiss)
  useEffect(() => { onDismissRef.current = onDismiss }, [onDismiss])

  // ── dismiss ─────────────────────────────────────────────────────────────
  // Defined with useCallback + stable animated refs so it can be referenced
  // inside useEffect without triggering a re-run of the effect.
  const dismiss = useCallback(() => {
    // Guard: ignore duplicate calls (timer fires while user taps close, etc.)
    if (isDismissing.current) return
    isDismissing.current = true

    Animated.parallel([
      Animated.timing(translateX, {
        toValue:         360,
        duration:        260,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue:         0,
        duration:        200,
        useNativeDriver: true,
      }),
    ]).start(() => onDismissRef.current?.())
  }, [translateX, opacity])

  // ── Enter animation + auto-dismiss timer ────────────────────────────────
  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue:         0,
        useNativeDriver: true,
        damping:         22,
        stiffness:       250,
      }),
      Animated.timing(opacity, {
        toValue:         1,
        duration:        180,
        useNativeDriver: true,
      }),
    ]).start()

    if (duration > 0) {
      const timer = setTimeout(dismiss, duration)
      return () => clearTimeout(timer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentionally empty — runs once on mount only

  // ── Action ───────────────────────────────────────────────────────────────
  const handleAction = useCallback(() => {
    onAction?.()
    dismiss()
  }, [onAction, dismiss])

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <Animated.View style={[styles.container, { opacity, transform: [{ translateX }] }]}>

      {/* Avatar */}
      <View style={styles.avatarWrap}>
        {avatar ? (
          <Image source={avatar} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarInitials}>{initials ?? '?'}</Text>
          </View>
        )}
      </View>

      {/* Body */}
      <View style={styles.content}>
        {source ? (
          <Text style={styles.source} numberOfLines={1}>{source}</Text>
        ) : null}

        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {timestamp ? (
            <Text style={styles.timestamp}>{timestamp}</Text>
          ) : null}
        </View>

        <Text style={styles.body} numberOfLines={2}>{body}</Text>

        {actionLabel ? (
          <TouchableOpacity onPress={handleAction} style={styles.actionBtn}>
            <Text style={styles.actionLabel}>{actionLabel}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Close */}
      <TouchableOpacity
        onPress={dismiss}
        style={styles.closeBtn}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={styles.closeIcon}>✕</Text>
      </TouchableOpacity>

    </Animated.View>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection:   'row',
    backgroundColor: '#18181b',
    borderWidth:     1,
    borderColor:     '#3f3f46',
    borderRadius:    14,
    padding:         14,
    gap:             12,
    width:           340,
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 12 },
    shadowOpacity:   0.5,
    shadowRadius:    20,
    elevation:       10,
  },
  avatarWrap: {
    paddingTop: 2,
  },
  avatarImage: {
    width:        40,
    height:       40,
    borderRadius: 20,
  },
  avatarFallback: {
    width:           40,
    height:          40,
    borderRadius:    20,
    backgroundColor: '#27272a',
    borderWidth:     1,
    borderColor:     '#3f3f46',
    alignItems:      'center',
    justifyContent:  'center',
  },
  avatarInitials: {
    fontSize:      15,
    fontWeight:    '700',
    color:         '#a1a1aa',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    gap:  3,
  },
  source: {
    fontSize:      11,
    fontWeight:    '600',
    color:         '#71717a',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  titleRow: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize:   14,
    fontWeight: '700',
    color:      '#f4f4f5',
    flex:       1,
  },
  timestamp: {
    fontSize:   11,
    color:      '#52525b',
    marginLeft: 8,
  },
  body: {
    fontSize:   13,
    color:      '#a1a1aa',
    lineHeight: 18,
  },
  actionBtn: {
    alignSelf:         'flex-start',
    marginTop:         6,
    paddingHorizontal: 12,
    paddingVertical:   5,
    backgroundColor:   '#27272a',
    borderRadius:      6,
    borderWidth:       1,
    borderColor:       '#3f3f46',
  },
  actionLabel: {
    fontSize:   12,
    fontWeight: '600',
    color:      '#e4e4e7',
  },
  closeBtn: {
    paddingTop: 2,
  },
  closeIcon: {
    fontSize:   12,
    color:      '#52525b',
    fontWeight: '600',
  },
})