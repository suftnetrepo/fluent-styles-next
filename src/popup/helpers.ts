import { Dimensions } from 'react-native'
import type { ViewStyle } from 'react-native'

import type { PopupAnimation, PopupColors, PopupPosition } from './interface'

// ─── Resolve default animation per position ───────────────────────────────────

export function resolveAnimation(
  animation: PopupAnimation | undefined,
  position:  PopupPosition,
): PopupAnimation {
  if (animation) return animation
  return position === 'center' ? 'scale' : 'slide'
}

// ─── Animated value: "hidden" end-state ───────────────────────────────────────
// For slide: off-screen offset (px).  For fade/scale: target opacity/scale.

export function hiddenValue(
  animation: PopupAnimation,
  position:  PopupPosition,
): number {
  if (animation === 'fade')  return 0     // opacity 0
  if (animation === 'scale') return 0.88  // scale 0.88
  if (animation === 'none')  return 0

  // slide — return the off-screen offset in the axis of motion
  const { width, height } = Dimensions.get('window')
  switch (position) {
    case 'top':    return -height
    case 'bottom': return height
    case 'left':   return -width
    case 'right':  return width
    default:       return 0
  }
}

export function visibleValue(animation: PopupAnimation): number {
  if (animation === 'fade')  return 1
  if (animation === 'scale') return 1
  return 0   // slide: 0 offset = on-screen
}

// ─── Build animated style from current value ──────────────────────────────────

export function animatedStyle(
  animation: PopupAnimation,
  position:  PopupPosition,
  value:     any,          // Animated.Value
): ViewStyle {
  switch (animation) {
    case 'fade':
      return { opacity: value }

    case 'scale':
      return {
        opacity:   value,   // cross-fade opacity in parallel
        transform: [{ scale: value }],
      }

    case 'slide': {
      const isY = position === 'top' || position === 'bottom'
      return {
        transform: [
          isY ? { translateY: value } : { translateX: value },
        ],
      }
    }

    case 'none':
    default:
      return {}
  }
}

// ─── Border radius: round the corners facing the screen interior ──────────────

export function getBorderRadius(
  position: PopupPosition,
  round:    boolean,
  radius:   number,
): ViewStyle {
  if (!round || position === 'center') return {}

  const r = radius
  switch (position) {
    case 'bottom':
      return { borderTopLeftRadius: r, borderTopRightRadius: r }
    case 'top':
      return { borderBottomLeftRadius: r, borderBottomRightRadius: r }
    case 'left':
      return { borderTopRightRadius: r, borderBottomRightRadius: r }
    case 'right':
      return { borderTopLeftRadius: r, borderBottomLeftRadius: r }
    default:
      return { borderRadius: r }
  }
}

// ─── Absolute position style for the popup surface ────────────────────────────

export function getPositionStyle(position: PopupPosition): ViewStyle {
  const fill: ViewStyle = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }

  switch (position) {
    case 'bottom':
      return { position: 'absolute', left: 0, right: 0, bottom: 0 }
    case 'top':
      return { position: 'absolute', left: 0, right: 0, top: 0 }
    case 'left':
      return { position: 'absolute', top: 0, left: 0, bottom: 0 }
    case 'right':
      return { position: 'absolute', top: 0, right: 0, bottom: 0 }
    case 'center':
      return {
        ...fill,
        alignItems:     'center',
        justifyContent: 'center',
      }
    default:
      return fill
  }
}
