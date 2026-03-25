import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'
import {
  ComponentTheme,
  resolveTheme,
  DialogueColors,
  DIALOGUE_DARK,
  DIALOGUE_LIGHT,
} from '../utiles/theme'

// ─── Types ────────────────────────────────────────────────────────────────────

export type DialogueAction = {
  label:    string
  onPress:  () => void
  variant?: 'primary' | 'secondary' | 'destructive'
}

export type DialogueProps = {
  title:     string
  message?:  string
  icon?:     string
  actions:   DialogueAction[]
  onDismiss?: () => void
  theme?:    ComponentTheme
  colors?:   Partial<DialogueColors>
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Dialogue: React.FC<DialogueProps> = ({
  title,
  message,
  icon,
  actions,
  onDismiss,
  theme      = 'dark',
  colors: colorOverrides,
}) => {
  const deviceScheme = useColorScheme()

  const colors = useMemo<DialogueColors>(() => {
    const base = resolveTheme(theme, deviceScheme) === 'light' ? DIALOGUE_LIGHT : DIALOGUE_DARK
    return colorOverrides ? { ...base, ...colorOverrides } : base
  }, [theme, deviceScheme, colorOverrides])

  // ── Animation ────────────────────────────────────────────────────────────
  const scale        = useRef(new Animated.Value(0.88)).current
  const opacity      = useRef(new Animated.Value(0)).current
  const isDismissing = useRef(false)

  const onDismissRef = useRef(onDismiss)
  useEffect(() => { onDismissRef.current = onDismiss }, [onDismiss])

  const dismiss = useCallback((afterDismiss?: () => void) => {
    if (isDismissing.current) return
    isDismissing.current = true
    Animated.parallel([
      Animated.spring(scale,  { toValue: 0.88, useNativeDriver: true, damping: 20, stiffness: 280 }),
      Animated.timing(opacity, { toValue: 0, duration: 160, easing: Easing.in(Easing.ease), useNativeDriver: true }),
    ]).start(() => {
      afterDismiss?.()
      onDismissRef.current?.()
    })
  }, [scale, opacity])

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale,  { toValue: 1, useNativeDriver: true, damping: 20, stiffness: 280 }),
      Animated.timing(opacity, { toValue: 1, duration: 200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: colors.background, borderColor: colors.border, opacity, transform: [{ scale }] },
      ]}
    >
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}

      <Text style={[styles.title, { color: colors.title }]}>{title}</Text>

      {message ? <Text style={[styles.message, { color: colors.message }]}>{message}</Text> : null}

      <View style={[styles.divider, { backgroundColor: colors.divider }]} />

      <View style={[styles.actions, actions.length > 2 && styles.actionsColumn]}>
        {actions.map((action, i) => {
          const v = action.variant ?? 'secondary'
          const bg     = colors[`${v}Bg`     as keyof DialogueColors] as string
          const border = colors[`${v}Border` as keyof DialogueColors] as string
          const label  = colors[`${v}Label`  as keyof DialogueColors] as string

          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.actionBtn,
                { backgroundColor: bg, borderColor: border },
                actions.length <= 2 && { flex: 1 },
              ]}
              onPress={() => dismiss(action.onPress)}
              activeOpacity={0.75}
            >
              <Text style={[styles.actionText, { color: label }]}>{action.label}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </Animated.View>
  )
}

// ─── Styles (layout only) ─────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    borderWidth:       1,
    borderRadius:      18,
    paddingHorizontal: 24,
    paddingTop:        28,
    paddingBottom:     20,
    width:             320,
    gap:               10,
    alignItems:        'center',
    shadowColor:       '#000',
    shadowOffset:      { width: 0, height: 24 },
    shadowOpacity:     0.2,
    shadowRadius:      32,
    elevation:         16,
  },
  icon:          { fontSize: 42, marginBottom: 4 },
  title:         { fontSize: 17, fontWeight: '700', textAlign: 'center', letterSpacing: 0.1 },
  message:       { fontSize: 14, textAlign: 'center', lineHeight: 21, paddingHorizontal: 4 },
  divider:       { height: 1, alignSelf: 'stretch', marginVertical: 4 },
  actions:       { flexDirection: 'row', gap: 10, alignSelf: 'stretch' },
  actionsColumn: { flexDirection: 'column' },
  actionBtn:     { paddingVertical: 11, paddingHorizontal: 16, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  actionText:    { fontSize: 14, fontWeight: '600', letterSpacing: 0.1 },
})

export { DIALOGUE_DARK, DIALOGUE_LIGHT }
export type { DialogueColors }
