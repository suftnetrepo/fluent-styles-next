import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Animated,
  BackHandler,
  Easing,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  POPUP_COLORS_DARK,
  POPUP_COLORS_LIGHT,
  type PopupAnimation,
  type PopupColors,
  type PopupProps,
} from './interface'
import {
  animatedStyle,
  getBorderRadius,
  getPositionStyle,
  hiddenValue,
  resolveAnimation,
  visibleValue,
} from './helpers'

// ─── Close button (pure RN, no icon library) ──────────────────────────────────

const CloseButton: React.FC<{
  onPress: () => void
  color:   string
  bg:      string
}> = ({ onPress, color, bg }) => (
  <TouchableOpacity
    onPress={onPress}
    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    style={[close.btn, { backgroundColor: bg }]}
    accessibilityLabel="Close"
    accessibilityRole="button"
  >
    <Text style={[close.icon, { color }]}>✕</Text>
  </TouchableOpacity>
)

const close = StyleSheet.create({
  btn:  {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  icon: { fontSize: 13, fontWeight: '700', lineHeight: 14 },
})

// ─── Popup ────────────────────────────────────────────────────────────────────

const PopupInner: React.FC<PopupProps> = ({
  children,
  visible,

  overlay              = true,
  overlayColor,
  closeOnPressOverlay  = true,
  onPressOverlay,

  position             = 'bottom',
  animation: animProp,
  duration             = 280,
  spring,

  round                = true,
  roundRadius          = 20,

  safeAreaBottom       = false,
  safeAreaTop          = false,

  lazyRender           = true,
  destroyOnClose       = false,

  title,
  subtitle,
  showHandle: showHandleProp,
  showClose            = false,
  onClose,

  style,
  overlayStyle,
  headerStyle,
  titleStyle,
  subtitleStyle,

  colors: colorOverrides,

  onOpen,
  onOpened,
  onClosed,
  onRequestClose,

  testID,
}) => {

  // ── Colours ────────────────────────────────────────────────────────────────
  const scheme = useColorScheme()
  const baseColors = scheme === 'dark' ? POPUP_COLORS_DARK : POPUP_COLORS_LIGHT
  const colors: PopupColors = useMemo(
    () => colorOverrides ? { ...baseColors, ...colorOverrides } : baseColors,
    [baseColors, colorOverrides],
  )

  // ── Safe area ──────────────────────────────────────────────────────────────
  const insets = useSafeAreaInsets()

  // ── Animation resolution ───────────────────────────────────────────────────
  const animation: PopupAnimation = resolveAnimation(animProp, position)
  const HIDDEN  = hiddenValue(animation, position)
  const VISIBLE = visibleValue(animation)

  // ── Render gate ────────────────────────────────────────────────────────────
  const hasEverOpened = useRef(false)
  const [mounted, setMounted] = useState(!lazyRender || visible)
  const [modalVisible, setModalVisible] = useState(visible)

  // ── Animated values ────────────────────────────────────────────────────────
  const anim         = useRef(new Animated.Value(visible ? VISIBLE : HIDDEN)).current
  const overlayAnim  = useRef(new Animated.Value(visible ? 1 : 0)).current
  const isAnimating  = useRef(false)

  // ── Lifecycle refs ────────────────────────────────────────────────────────
  const onOpenedRef  = useRef(onOpened)
  const onClosedRef  = useRef(onClosed)
  useEffect(() => { onOpenedRef.current  = onOpened  }, [onOpened])
  useEffect(() => { onClosedRef.current  = onClosed  }, [onClosed])

  // ── Run animation ──────────────────────────────────────────────────────────
  const runAnimation = useCallback(
    (toVisible: boolean, onDone?: () => void) => {
      isAnimating.current = true
      const toValue = toVisible ? VISIBLE : HIDDEN

      const makeAnim = (val: Animated.Value, target: number) => {
        if (animation === 'none') {
          return Animated.timing(val, {
            toValue: target, duration: 0, useNativeDriver: val !== overlayAnim,
          })
        }

        if (toVisible && spring) {
          return Animated.spring(val, {
            toValue:         target,
            damping:         spring.damping,
            stiffness:       spring.stiffness,
            mass:            spring.mass ?? 1,
            useNativeDriver: val !== overlayAnim,
          })
        }

        return Animated.timing(val, {
          toValue:         target,
          duration,
          easing:          toVisible ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
          useNativeDriver: val !== overlayAnim,
        })
      }

      Animated.parallel([
        makeAnim(anim, toValue),
        makeAnim(overlayAnim, toVisible ? 1 : 0),
      ]).start(({ finished }) => {
        isAnimating.current = false
        if (finished) onDone?.()
      })
    },
    [anim, overlayAnim, animation, duration, spring, HIDDEN, VISIBLE],
  )

  // ── Sync visible prop ──────────────────────────────────────────────────────
  useEffect(() => {
    if (visible) {
      if (!mounted) setMounted(true)
      hasEverOpened.current = true
      setModalVisible(true)
      onOpen?.()
      // Give the Modal a frame to mount before animating
      requestAnimationFrame(() => {
        runAnimation(true, () => onOpenedRef.current?.())
      })
    } else {
      runAnimation(false, () => {
        setModalVisible(false)
        if (destroyOnClose) {
          setMounted(false)
          hasEverOpened.current = false
        }
        onClosedRef.current?.()
      })
    }
  }, [visible]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Android back button ────────────────────────────────────────────────────
  useEffect(() => {
    if (!visible || Platform.OS !== 'android') return
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      return onRequestClose?.() ?? false
    })
    return () => handler.remove()
  }, [visible, onRequestClose])

  // ── Overlay press ──────────────────────────────────────────────────────────
  const handleOverlayPress = useCallback(() => {
    onPressOverlay?.()
    if (closeOnPressOverlay) onClose?.()
  }, [onPressOverlay, closeOnPressOverlay, onClose])

  // ── Handle visibility ──────────────────────────────────────────────────────
  const showHandle = _showHandle(position, showHandleProp)

  // ── Animated style for the popup surface ──────────────────────────────────
  const popupAnimatedStyle = useMemo(
    () => animatedStyle(animation, position, anim),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [animation, position],  // anim ref is stable
  )

  // ── Border radius ──────────────────────────────────────────────────────────
  const radiusStyle = getBorderRadius(position, round, roundRadius)

  // ── Safe area padding ──────────────────────────────────────────────────────
  const safeStyle = {
    paddingBottom: safeAreaBottom ? insets.bottom : 0,
    paddingTop:    safeAreaTop    ? insets.top    : 0,
  }

  // ── Center wrapper (for center position, centers the content) ─────────────
  const positionStyle = getPositionStyle(position)

  if (!mounted && !modalVisible) return null

  return (
    <Modal
      visible={modalVisible}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={() => onRequestClose?.()}
      testID={testID}
    >
      {/* ── Overlay ─────────────────────────────────────────────────── */}
      {overlay && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: (overlayColor as string) ?? colors.overlay, opacity: overlayAnim },
            overlayStyle,
          ]}
          pointerEvents="box-none"
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={handleOverlayPress} />
        </Animated.View>
      )}

      {/* ── Popup surface ───────────────────────────────────────────── */}
      <Animated.View
        style={[
          positionStyle,
          popupAnimatedStyle,
        ]}
        pointerEvents="box-none"
      >
        <View
          style={[
            S.surface,
            radiusStyle,
            safeStyle,
            { backgroundColor: colors.background },
            style,
          ]}
        >
          {/* Handle */}
          {showHandle && (
            <View style={[S.handle_wrap]}>
              <View style={[S.handle, { backgroundColor: colors.handle }]} />
            </View>
          )}

          {/* Header */}
          {(title || subtitle || showClose) ? (
            <View
              style={[
                S.header,
                { borderBottomColor: colors.headerBorder },
                showHandle && S.header_no_top_pad,
                headerStyle,
              ]}
            >
              <View style={S.header_text}>
                {title ? (
                  typeof title === 'string' ? (
                    <Text
                      style={[S.header_title, { color: colors.headerTitle }, titleStyle]}
                      numberOfLines={1}
                    >
                      {title}
                    </Text>
                  ) : title
                ) : null}

                {subtitle ? (
                  typeof subtitle === 'string' ? (
                    <Text
                      style={[S.header_subtitle, { color: colors.headerSubtitle }, subtitleStyle]}
                      numberOfLines={1}
                    >
                      {subtitle}
                    </Text>
                  ) : subtitle
                ) : null}
              </View>

              {showClose && onClose ? (
                <CloseButton
                  onPress={onClose}
                  color={colors.closeIcon}
                  bg={colors.closeIconBg}
                />
              ) : null}
            </View>
          ) : null}

          {/* Body */}
          {mounted ? children : null}
        </View>
      </Animated.View>
    </Modal>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function _showHandle(position: string, explicit?: boolean): boolean {
  if (explicit !== undefined) return explicit
  return position === 'bottom'
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = StyleSheet.create({
  surface: {
    overflow: 'hidden',
  },
  handle_wrap: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 4,
  },
  handle: {
    width:        36,
    height:       4,
    borderRadius: 2,
  },
  header: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: 20,
    paddingTop:        16,
    paddingBottom:     14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap:               12,
  },
  header_no_top_pad: {
    paddingTop: 6,
  },
  header_text: {
    flex: 1,
    gap:  3,
  },
  header_title: {
    fontSize:   17,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  header_subtitle: {
    fontSize:   13,
    fontWeight: '400',
  },
})

export const Popup = memo(PopupInner)
