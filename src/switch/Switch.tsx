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
  Easing,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import {
  SWITCH_COLORS_DEFAULT,
  SWITCH_SIZES,
  type SwitchColors,
  type SwitchProps,
  type SwitchSize,
} from './interface'

// ─── Spinner (pure RN, no external deps) ──────────────────────────────────────

const Spinner: React.FC<{ size: number; color: string }> = ({ size, color }) => {
  const rotate = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue:         1,
        duration:        700,
        easing:          Easing.linear,
        useNativeDriver: true,
      }),
    ).start()
    return () => rotate.stopAnimation()
  }, [rotate])

  const spin = rotate.interpolate({
    inputRange:  [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const r = size / 2

  return (
    <Animated.View
      style={{
        width:            size,
        height:           size,
        borderRadius:     r,
        borderWidth:      Math.max(1.5, size * 0.1),
        borderColor:      color,
        borderTopColor:   'transparent',
        transform:        [{ rotate: spin }],
      }}
    />
  )
}

// ─── Switch ───────────────────────────────────────────────────────────────────

function SwitchInner<ActiveValueT = boolean, InactiveValueT = boolean>(
  props: SwitchProps<ActiveValueT, InactiveValueT>,
) {
  const {
    value,
    defaultValue,
    activeValue   = true  as unknown as ActiveValueT,
    inactiveValue = false as unknown as InactiveValueT,

    onChange,
    onPress,
    beforeChange,

    size       = 'md',
    customSize,
    activeColor,
    inactiveColor,
    activeLabel,
    inactiveLabel,
    labelStyle,
    style,

    loading  = false,
    disabled = false,
    colors: colorOverrides,

    testID,
  } = props

  // ── Resolved colors ────────────────────────────────────────────────────────
  const colors: SwitchColors = useMemo(
    () => ({
      ...SWITCH_COLORS_DEFAULT,
      ...colorOverrides,
      ...(activeColor   ? { activeTrack:   activeColor   as string } : {}),
      ...(inactiveColor ? { inactiveTrack: inactiveColor as string } : {}),
    }),
    [colorOverrides, activeColor, inactiveColor],
  )

  // ── Resolved dimensions ────────────────────────────────────────────────────
  const dims = useMemo(() => {
    const preset = SWITCH_SIZES[size as SwitchSize]

    if (customSize) {
      const ratio = customSize / SWITCH_SIZES.md.trackHeight
      return {
        trackWidth:  Math.round(SWITCH_SIZES.md.trackWidth  * ratio),
        trackHeight: customSize,
        thumbSize:   Math.round(SWITCH_SIZES.md.thumbSize   * ratio),
        fontSize:    Math.round(SWITCH_SIZES.md.fontSize    * ratio),
        thumbInset:  Math.max(2, Math.round(SWITCH_SIZES.md.thumbInset * ratio)),
      }
    }

    return preset
  }, [size, customSize])

  // ── Controlled / uncontrolled state ───────────────────────────────────────
  const isControlled = value !== undefined
  const [localValue, setLocalValue] = useState<ActiveValueT | InactiveValueT>(
    defaultValue ?? inactiveValue,
  )

  const currentValue = isControlled ? value! : localValue
  const isOn = currentValue === activeValue

  // Stable ref so callbacks always read latest
  const isOnRef = useRef(isOn)
  isOnRef.current = isOn

  // ── Pending state (while beforeChange Promise resolves) ───────────────────
  const [pending, setPending] = useState(false)
  const isBlocked = loading || disabled || pending

  // ── Animations ────────────────────────────────────────────────────────────
  const THUMB_OFF = dims.thumbInset
  const THUMB_ON  = dims.trackWidth - dims.thumbSize - dims.thumbInset

  const thumbAnim  = useRef(new Animated.Value(isOn ? THUMB_ON  : THUMB_OFF)).current
  const trackAnim  = useRef(new Animated.Value(isOn ? 1         : 0        )).current
  const scaleAnim  = useRef(new Animated.Value(1)).current

  const runAnimation = useCallback(
    (toOn: boolean) => {
      Animated.parallel([
        Animated.spring(thumbAnim, {
          toValue:         toOn ? THUMB_ON : THUMB_OFF,
          useNativeDriver: true,
          damping:         18,
          stiffness:       260,
          mass:            0.8,
        }),
        Animated.timing(trackAnim, {
          toValue:         toOn ? 1 : 0,
          duration:        220,
          easing:          Easing.out(Easing.quad),
          useNativeDriver: false, // background colour can't use native driver
        }),
      ]).start()
    },
    [thumbAnim, trackAnim, THUMB_ON, THUMB_OFF],
  )

  // Sync animation when controlled value changes
  useEffect(() => {
    runAnimation(isOn)
  }, [isOn, runAnimation])

  // ── Press + micro-bounce on thumb ─────────────────────────────────────────
  const handlePress = useCallback(async () => {
    onPress?.()
    if (isBlocked) return

    const nextValue = isOnRef.current ? inactiveValue : activeValue

    // Thumb squeeze on press-in
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.88, duration: 80,  useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1,    useNativeDriver: true, damping: 14, stiffness: 300 }),
    ]).start()

    if (beforeChange) {
      setPending(true)
      try {
        const allowed = await beforeChange(nextValue)
        if (!allowed) return
      } finally {
        setPending(false)
      }
    }

    if (!isControlled) setLocalValue(nextValue)
    onChange?.(nextValue)
  }, [
    onPress, isBlocked, inactiveValue, activeValue,
    scaleAnim, beforeChange, isControlled, onChange,
  ])

  // ── Track background interpolation ────────────────────────────────────────
  const trackBg = trackAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: [colors.inactiveTrack, colors.activeTrack],
  })

  // ── Label ─────────────────────────────────────────────────────────────────
  const labelNode = isOn ? activeLabel : inactiveLabel
  const labelColor = isOn ? colors.activeLabelText : colors.inactiveLabelText

  // ── Spinner size = 55% of thumb ───────────────────────────────────────────
  const spinnerSize = Math.round(dims.thumbSize * 0.55)

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      disabled={isBlocked}
      accessibilityRole="switch"
      accessibilityState={{ checked: isOn, disabled: isBlocked, busy: loading }}
      testID={testID}
    >
      <View
        style={[
          styles.root,
          disabled && styles.disabled,
          style,
        ]}
      >
        {/* Track */}
        <Animated.View
          style={[
            styles.track,
            {
              width:        dims.trackWidth,
              height:       dims.trackHeight,
              borderRadius: dims.trackHeight / 2,
              backgroundColor: trackBg,
              borderWidth:  isOn ? 0 : StyleSheet.hairlineWidth,
              borderColor:  colors.inactiveBorder,
            },
          ]}
        >
          {/* Inner label (rendered behind the thumb) */}
          {labelNode ? (
            <View
              style={[
                styles.label_wrap,
                isOn
                  ? { left: dims.thumbInset + 2, right: dims.thumbSize + dims.thumbInset }
                  : { left: dims.thumbSize + dims.thumbInset, right: dims.thumbInset + 2 },
              ]}
            >
              {typeof labelNode === 'string' ? (
                <Text
                  style={[
                    styles.label_text,
                    { fontSize: dims.fontSize, color: labelColor },
                    labelStyle,
                  ]}
                  numberOfLines={1}
                >
                  {labelNode}
                </Text>
              ) : labelNode}
            </View>
          ) : null}
        </Animated.View>

        {/* Thumb */}
        <Animated.View
          style={[
            styles.thumb,
            {
              width:        dims.thumbSize,
              height:       dims.thumbSize,
              borderRadius: dims.thumbSize / 2,
              top:          dims.thumbInset,
              backgroundColor: colors.thumb,
              shadowColor:  colors.thumbShadow,
              transform: [
                { translateX: thumbAnim },
                { scale:      scaleAnim  },
              ],
            },
          ]}
        >
          {/* Loading spinner or pending spinner */}
          {(loading || pending) && (
            <Spinner size={spinnerSize} color={isOn ? colors.activeTrack : colors.loadingColor} />
          )}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  )
}

// memo + cast to preserve generics through memo wrapper
export const Switch = memo(SwitchInner) as typeof SwitchInner

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    position:       'relative',
    alignSelf:      'flex-start',
  },
  disabled: {
    opacity: 0.45,
  },
  track: {
    overflow: 'hidden',
    justifyContent: 'center',
  },
  label_wrap: {
    position:       'absolute',
    top:            0,
    bottom:         0,
    justifyContent: 'center',
    alignItems:     'center',
    overflow:       'hidden',
  },
  label_text: {
    fontWeight: '600',
    textAlign:  'center',
  },
  thumb: {
    position:    'absolute',
    alignItems:  'center',
    justifyContent: 'center',
    // Shadow (iOS)
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius:  4,
    // Elevation (Android)
    elevation:     3,
  },
})
