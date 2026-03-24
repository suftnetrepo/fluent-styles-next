import React from 'react'
import { View } from 'react-native'
import { getPositionStyles } from '../utiles/position'
import { portalStyles } from '../utiles/styles'
import type { PortalNode } from './types'

type Props = {
  portals: PortalNode[]
}

/**
 * Renders a list of `PortalNode` objects into the component tree.
 *
 * Shared between `PortalManager` (declarative) and `GlobalPortalProvider`
 * (imperative) so neither duplicates this logic.
 *
 * ### Pointer event model
 *
 * | Layer              | pointerEvents      | Effect                          |
 * |--------------------|--------------------|---------------------------------|
 * | Position wrapper   | box-none           | Wrapper transparent to touches; |
 * |                    |                    | children still receive them.    |
 * | Backdrop (colour)  | box-none           | Colour layer is transparent.    |
 * | Backdrop (touch)   | auto               | Captures backdrop taps.         |
 * | Portal content     | (default: auto)    | Children handle their own input.|
 *
 * The `center` position wrapper fills the entire screen (needed for flexbox
 * centering) but uses `box-none` so it never blocks the app behind it.
 */
export const PortalRenderer: React.FC<Props> = ({ portals }) => (
  <>
    {portals.map(({ id, children, options }) => (
      <React.Fragment key={id}>
 
        {/* ── Backdrop ──────────────────────────────────────────────────── */}
        {options.backdrop && (
          <View style={portalStyles.backdrop} pointerEvents="box-none">
            <View
              style={portalStyles.backdropTouchable}
              pointerEvents="auto"
              onTouchStart={options.onBackdropPress}
            />
          </View>
        )}
 
        {/* ── Positioned wrapper ────────────────────────────────────────── */}
        {/*
          * pointerEvents="box-none" means the wrapper View itself is invisible
          * to touches, but its children (the actual portal content) are not.
          * This is essential for the `center` case where the wrapper fills the
          * whole screen — without box-none it would block every touch on the
          * app behind the dialogue.
          *
          * collapsable={false} prevents Android from collapsing this View away
          * during layout optimisation, which would break absolute positioning.
        */}
        <View
          style={[
            getPositionStyles(options.position, options.offset),
            options.style,
          ]}
          pointerEvents="box-none"
          collapsable={false}
        >
          {children}
        </View>
 
      </React.Fragment>
    ))}
  </>
)
 