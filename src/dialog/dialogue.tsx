import React, { useEffect, useRef } from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

// ─── Types ────────────────────────────────────────────────────────────────────

export type DialogueAction = {
  label: string
  onPress: () => void
  /** Visual weight. Default: 'secondary'. */
  variant?: 'primary' | 'secondary' | 'destructive'
}

export type DialogueProps = {
  title: string
  message?: string
  /** Icon character / emoji rendered large above the title. */
  icon?: string
  actions: DialogueAction[]
  onDismiss?: () => void
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Dialogue: React.FC<DialogueProps> = ({
  title,
  message,
  icon,
  actions,
  onDismiss,
}) => {
  const scale   = useRef(new Animated.Value(0.88)).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        damping: 20,
        stiffness: 280,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const dismiss = (cb?: () => void) => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.88,
        useNativeDriver: true,
        damping: 20,
        stiffness: 280,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start(() => {
      cb?.()
      onDismiss?.()
    })
  }

  const ACTION_STYLES: Record<
    NonNullable<DialogueAction['variant']>,
    { bg: string; border: string; text: string }
  > = {
    primary:     { bg: '#6366f1', border: '#818cf8', text: '#ffffff' },
    secondary:   { bg: '#27272a', border: '#3f3f46', text: '#e4e4e7' },
    destructive: { bg: '#450a0a', border: '#ef4444', text: '#fca5a5' },
  }

  return (
    <Animated.View
      style={[styles.container, { opacity, transform: [{ scale }] }]}
    >
      {/* Icon */}
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Message */}
      {message ? <Text style={styles.message}>{message}</Text> : null}

      {/* Divider */}
      <View style={styles.divider} />

      {/* Actions */}
      <View style={[styles.actions, actions.length > 2 && styles.actionsColumn]}>
        {actions.map((action, i) => {
          const v = action.variant ?? 'secondary'
          const s = ACTION_STYLES[v]
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.actionBtn,
                { backgroundColor: s.bg, borderColor: s.border },
                actions.length <= 2 && { flex: 1 },
              ]}
              onPress={() => dismiss(action.onPress)}
              activeOpacity={0.75}
            >
              <Text style={[styles.actionText, { color: s.text }]}>
                {action.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </Animated.View>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#3f3f46',
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    width: 320,
    gap: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.7,
    shadowRadius: 32,
    elevation: 16,
  },
  icon: {
    fontSize: 42,
    marginBottom: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#f4f4f5',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  message: {
    fontSize: 14,
    color: '#a1a1aa',
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#27272a',
    alignSelf: 'stretch',
    marginVertical: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'stretch',
  },
  actionsColumn: {
    flexDirection: 'column',
  },
  actionBtn: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
})
