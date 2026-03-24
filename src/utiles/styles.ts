import { StyleSheet } from 'react-native'

/**
 * Styles shared across portal rendering components.
 * Kept in a single module so both `PortalManager` and `GlobalPortalProvider`
 * reference the same cached `StyleSheet` object.
 */
export const portalStyles = StyleSheet.create({
  /** Full-screen semi-transparent overlay rendered behind portal content. */
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  /**
   * Touch-capture layer that sits on top of the backdrop colour layer.
   * Using a separate view (rather than making the backdrop itself touchable)
   * lets us keep `pointerEvents="box-none"` on the backdrop so that touches
   * outside the inner layer still fall through when no `onBackdropPress` is
   * needed.
   */
  backdropTouchable: {
    ...StyleSheet.absoluteFillObject,
  },
})
