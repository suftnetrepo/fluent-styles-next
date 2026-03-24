import type { ViewStyle } from 'react-native'
import type { Offset, Position } from '../portal/types'

const DEFAULT_OFFSET: Offset = { x: 0, y: 0 }

/**
 * Returns absolute-position styles that anchor a portal element at the
 * requested screen position, with an optional pixel offset applied on top.
 *
 * ⚠️  The `'center'` variant uses a negative-50 translate trick that works
 *     well for modals/toasts but assumes the content has a known or bounded
 *     size.  For content of variable width/height, prefer wrapping in a
 *     container that measures itself and passes explicit offsets instead.
 */
export function getPositionStyles(
  position: Position = 'center',
  offset: Offset = DEFAULT_OFFSET,
): ViewStyle {
  const base: ViewStyle = {
    position: 'absolute',
  }
 
  switch (position) {
 
    case 'center': {
      const style: ViewStyle = {
        ...base,
        top:            0,
        left:           0,
        right:          0,
        bottom:         0,
        alignItems:     'center',
        justifyContent: 'center',
      }
      // Only add a transform when the caller explicitly wants an offset —
      // avoids an unnecessary layout pass in the common no-offset case.
      if (offset.x !== 0 || offset.y !== 0) {
        style.transform = [
          { translateX: offset.x },
          { translateY: offset.y },
        ]
      }
      return style
    }
 
    case 'top':
      return {
        ...base,
        top:        offset.y,
        left:       0,
        right:      0,
        alignItems: 'center',
      }
 
    case 'bottom':
      return {
        ...base,
        bottom:     offset.y,
        left:       0,
        right:      0,
        alignItems: 'center',
      }
 
    case 'top-left':
      return {
        ...base,
        top:  offset.y,
        left: offset.x,
      }
 
    case 'top-right':
      return {
        ...base,
        top:   offset.y,
        right: offset.x,
      }
 
    case 'bottom-left':
      return {
        ...base,
        bottom: offset.y,
        left:   offset.x,
      }
 
    case 'bottom-right':
      return {
        ...base,
        bottom: offset.y,
        right:  offset.x,
      }

    default: {
      // Exhaustive check — TypeScript will error if a new Position variant is
      // added to the union without a corresponding case above.
      const _exhaustive: never = position
      console.warn(`[Portal] Unknown position "${_exhaustive as string}" – falling back to absolute origin.`)
      return base
    }
  }
}
