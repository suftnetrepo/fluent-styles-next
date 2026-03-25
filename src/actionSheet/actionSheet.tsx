import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native'

const SCREEN_HEIGHT = Dimensions.get('window').height

// ─── Theme tokens ─────────────────────────────────────────────────────────────

export type ActionSheetTheme = 'dark' | 'light' | 'system'

/**
 * Every colour used by the sheet, overridable via the `colors` prop.
 * Pass a partial object — only the keys you want to change.
 */
export type ActionSheetColors = {
  /** Main sheet background. */
  background:       string
  /** Thin gap/gutter between the sheet body and the cancel row. */
  gutter:           string
  /** Top border + row separators. */
  border:           string
  /** Drag handle pill. */
  handle:           string
  /** Header title text. */
  title:            string
  /** Header subtitle / message text. */
  message:          string
  /** Default item label. */
  itemLabel:        string
  /** Default item description. */
  itemDescription:  string
  /** Destructive item label. */
  destructiveLabel: string
  /** Destructive item description. */
  destructiveDescription: string
  /** Icon badge background (default items). */
  iconBackground:   string
  /** Chevron arrow on default items. */
  chevron:          string
  /** Separator lines between rows. */
  separator:        string
  /** Cancel row label. */
  cancelLabel:      string
}

// ─── Built-in palettes ────────────────────────────────────────────────────────

const DARK_COLORS: ActionSheetColors = {
  background:              '#1c1c1e',
  gutter:                  '#09090b',
  border:                  '#2c2c2e',
  handle:                  '#3f3f46',
  title:                   '#f4f4f5',
  message:                 '#71717a',
  itemLabel:               '#f4f4f5',
  itemDescription:         '#71717a',
  destructiveLabel:        '#ef4444',
  destructiveDescription:  '#f87171',
  iconBackground:          '#27272a',
  chevron:                 '#52525b',
  separator:               '#2c2c2e',
  cancelLabel:             '#f4f4f5',
}

const LIGHT_COLORS: ActionSheetColors = {
  background:              '#ffffff',
  gutter:                  '#f2f2f7',
  border:                  '#e5e5ea',
  handle:                  '#c7c7cc',
  title:                   '#1c1c1e',
  message:                 '#8e8e93',
  itemLabel:               '#1c1c1e',
  itemDescription:         '#8e8e93',
  destructiveLabel:        '#ff3b30',
  destructiveDescription:  '#ff6b63',
  iconBackground:          '#f2f2f7',
  chevron:                 '#c7c7cc',
  separator:               '#e5e5ea',
  cancelLabel:             '#007aff',
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type ActionSheetItemVariant = 'default' | 'destructive' | 'disabled'

export type ActionSheetItem = {
  label:        string
  description?: string
  icon?:        string
  variant?:     ActionSheetItemVariant
  onPress?:     () => void
}

export type ActionSheetProps = {
  title?:       string
  message?:     string
  items?:       ActionSheetItem[]
  children?:    React.ReactNode
  showCancel?:  boolean
  cancelLabel?: string
  onCancel?:    () => void
  onDismiss?:   () => void
  maxHeight?:   number
  /**
   * Color scheme for the sheet.
   * - `'dark'`   — always dark (default)
   * - `'light'`  — always light
   * - `'system'` — follows the device's appearance setting
   */
  theme?:  ActionSheetTheme
  /**
   * Fine-grained token overrides applied on top of whichever `theme` is active.
   * Pass only the keys you want to change — everything else comes from the theme.
   *
   * @example
   * ```tsx
   * actionSheet.show({
   *   title: 'Options',
   *   theme: 'light',
   *   colors: { background: '#fafafa', cancelLabel: '#6366f1' },
   *   items: [...],
   * })
   * ```
   */
  colors?: Partial<ActionSheetColors>
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ActionSheet: React.FC<ActionSheetProps> = ({
  title,
  message,
  items,
  children,
  showCancel  = true,
  cancelLabel = 'Cancel',
  onCancel,
  onDismiss,
  maxHeight   = SCREEN_HEIGHT * 0.7,
  theme       = 'dark',
  colors: colorOverrides,
}) => {
  // ── Resolve active color tokens ──────────────────────────────────────────
  const deviceScheme = useColorScheme()

  const colors = useMemo<ActionSheetColors>(() => {
    const resolvedTheme =
      theme === 'system'
        ? (deviceScheme === 'light' ? 'light' : 'dark')
        : theme

    const base = resolvedTheme === 'light' ? LIGHT_COLORS : DARK_COLORS
    return colorOverrides ? { ...base, ...colorOverrides } : base
  }, [theme, deviceScheme, colorOverrides])

  // ── Animation refs ───────────────────────────────────────────────────────
  const translateY   = useRef(new Animated.Value(600)).current
  const opacity      = useRef(new Animated.Value(0)).current
  const isDismissing = useRef(false)

  const onDismissRef = useRef(onDismiss)
  useEffect(() => { onDismissRef.current = onDismiss }, [onDismiss])

  // ── dismiss ─────────────────────────────────────────────────────────────
  const dismiss = useCallback((afterDismiss?: () => void) => {
    if (isDismissing.current) return
    isDismissing.current = true

    Animated.parallel([
      Animated.timing(translateY, {
        toValue:         600,
        duration:        300,
        easing:          Easing.in(Easing.bezier(0.4, 0, 1, 1)),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue:         0,
        duration:        220,
        useNativeDriver: true,
      }),
    ]).start(() => {
      afterDismiss?.()
      onDismissRef.current?.()
    })
  }, [translateY, opacity])

  // ── Enter animation ──────────────────────────────────────────────────────
  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue:         0,
        useNativeDriver: true,
        damping:         26,
        stiffness:       300,
        mass:            0.9,
      }),
      Animated.timing(opacity, {
        toValue:         1,
        duration:        180,
        useNativeDriver: true,
      }),
    ]).start()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleItem = useCallback((item: ActionSheetItem) => {
    if (item.variant === 'disabled') return
    dismiss(item.onPress)
  }, [dismiss])

  const handleCancel = useCallback(() => {
    dismiss(onCancel)
  }, [dismiss, onCancel])

  const hasHeader  = Boolean(title || message)
  const hasItems   = Boolean(items?.length)
  const hasContent = Boolean(children)

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          backgroundColor: colors.background,
          borderColor:     colors.border,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      {/* Drag handle */}
      <View style={[styles.handle, { backgroundColor: colors.handle }]} />

      <ScrollView
        style={{ maxHeight }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* ── Header ──────────────────────────────────────────────── */}
        {hasHeader && (
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            {title   ? <Text style={[styles.title,   { color: colors.title   }]}>{title}</Text>   : null}
            {message ? <Text style={[styles.message, { color: colors.message }]}>{message}</Text> : null}
          </View>
        )}

        {/* ── Custom children ─────────────────────────────────────── */}
        {hasContent && (
          <View style={[styles.childrenWrap, hasItems && styles.childrenWithItems]}>
            {children}
          </View>
        )}

        {/* ── Divider between children and items ──────────────────── */}
        {hasContent && hasItems && (
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
        )}

        {/* ── Action items ────────────────────────────────────────── */}
        {hasItems && (
          <View>
            {items!.map((item, i) => {
              const isDestructive = item.variant === 'destructive'
              const isDisabled    = item.variant === 'disabled'
              const isLast        = i === items!.length - 1

              const labelColor = isDestructive
                ? colors.destructiveLabel
                : isDisabled
                ? colors.chevron          // muted
                : colors.itemLabel

              const descColor = isDestructive
                ? colors.destructiveDescription
                : colors.itemDescription

              return (
                <React.Fragment key={i}>
                  <TouchableOpacity
                    style={[styles.item, isDisabled && styles.itemDisabled]}
                    onPress={() => handleItem(item)}
                    activeOpacity={isDisabled ? 1 : 0.6}
                    disabled={isDisabled}
                  >
                    {/* Icon badge */}
                    {item.icon ? (
                      <View style={[styles.itemIconWrap, { backgroundColor: colors.iconBackground }]}>
                        <Text style={styles.itemIcon}>{item.icon}</Text>
                      </View>
                    ) : null}

                    {/* Text block */}
                    <View style={styles.itemText}>
                      <Text style={[styles.itemLabel, { color: labelColor }]}>
                        {item.label}
                      </Text>
                      {item.description ? (
                        <Text style={[styles.itemDescription, { color: descColor }]}>
                          {item.description}
                        </Text>
                      ) : null}
                    </View>

                    {/* Chevron — default items only */}
                    {!isDestructive && !isDisabled ? (
                      <Text style={[styles.chevron, { color: colors.chevron }]}>›</Text>
                    ) : null}
                  </TouchableOpacity>

                  {!isLast && (
                    <View style={[styles.separator, { backgroundColor: colors.separator }]} />
                  )}
                </React.Fragment>
              )
            })}
          </View>
        )}
      </ScrollView>

      {/* ── Cancel row ──────────────────────────────────────────────── */}
      {showCancel && (
        <>
          <View style={[styles.cancelGutter, { backgroundColor: colors.gutter }]} />
          <TouchableOpacity
            style={[styles.cancelBtn, { backgroundColor: colors.background }]}
            onPress={handleCancel}
            activeOpacity={0.6}
          >
            <Text style={[styles.cancelLabel, { color: colors.cancelLabel }]}>
              {cancelLabel}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </Animated.View>
  )
}

// ─── Static styles (layout only — colours come from tokens above) ─────────────

const styles = StyleSheet.create({
  wrapper: {
    borderTopLeftRadius:  20,
    borderTopRightRadius: 20,
    borderWidth:          1,
    borderBottomWidth:    0,
    width:                '100%',
    paddingBottom:        34,
    shadowColor:          '#000',
    shadowOffset:         { width: 0, height: -8 },
    shadowOpacity:        0.18,
    shadowRadius:         24,
    elevation:            24,
  },
  handle: {
    alignSelf:    'center',
    width:        36,
    height:       4,
    borderRadius: 2,
    marginTop:    10,
    marginBottom: 6,
  },
  scrollContent: {
    paddingHorizontal: 0,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop:        12,
    paddingBottom:     14,
    gap:               4,
    borderBottomWidth: 1,
  },
  title: {
    fontSize:   15,
    fontWeight: '600',
    textAlign:  'center',
  },
  message: {
    fontSize:   13,
    textAlign:  'center',
    lineHeight: 18,
  },

  // Children slot
  childrenWrap: {
    paddingHorizontal: 16,
    paddingVertical:   16,
  },
  childrenWithItems: {
    paddingBottom: 0,
  },
  divider: {
    height:        1,
    marginVertical: 4,
  },

  // Items
  item: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: 20,
    paddingVertical:   14,
    gap:               14,
    minHeight:         54,
  },
  itemDisabled: {
    opacity: 0.45,
  },
  itemIconWrap: {
    width:          34,
    height:         34,
    borderRadius:   10,
    alignItems:     'center',
    justifyContent: 'center',
  },
  itemIcon: {
    fontSize: 17,
  },
  itemText: {
    flex: 1,
    gap:  2,
  },
  itemLabel: {
    fontSize:      16,
    fontWeight:    '500',
    letterSpacing: 0.1,
  },
  itemDescription: {
    fontSize:   13,
    lineHeight: 17,
  },
  chevron: {
    fontSize:   20,
    fontWeight: '300',
  },
  separator: {
    height:           1,
    marginHorizontal: 20,
  },

  // Cancel
  cancelGutter: {
    height: 8,
  },
  cancelBtn: {
    paddingVertical:   17,
    paddingHorizontal: 20,
    alignItems:        'center',
  },
  cancelLabel: {
    fontSize:   17,
    fontWeight: '600',
  },
})

// ─── Re-export palettes so callers can extend them ────────────────────────────
export { DARK_COLORS, LIGHT_COLORS }