import React from 'react';
import type { PortalNode } from './types';
type Props = {
    portals: PortalNode[];
};
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
export declare const PortalRenderer: React.FC<Props>;
export {};
//# sourceMappingURL=PortalRenderer.d.ts.map