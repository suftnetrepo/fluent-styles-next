/**
 * @module portal
 *
 * A production-grade, dual-mode portal system for React Native.
 *
 * ─── Quick-start ─────────────────────────────────────────────────────────────
 *
 * **Declarative** (React context / hook):
 * ```tsx
 * // 1. Wrap your app
 * <PortalManager>
 *   <App />
 * </PortalManager>
 *
 * // 2. Mount portals from any descendant
 * const { mount, unmount } = usePortal()
 * const id = mount(<MyModal />, { backdrop: true, position: 'center' })
 * unmount(id)
 * ```
 *
 * **Imperative** (singleton, usable outside React):
 * ```tsx
 * // 1. Wrap your app
 * <GlobalPortalProvider>
 *   <App />
 * </GlobalPortalProvider>
 *
 * // 2. Show / hide from anywhere
 * import { portal } from '@/portal'
 * const id = portal.show(<Toast />, { position: 'bottom' })
 * portal.hide(id)
 * ```
 *
 * ─── Exports ─────────────────────────────────────────────────────────────────
 */
export { PortalManager } from './PortalManager';
export { GlobalPortalProvider } from './GlobalPortalProvider';
export { usePortal } from './PortalContext';
export { portal, PortalInstance } from './PortalInstance';
export { PortalRenderer } from './PortalRenderer';
export type { Position, Offset, PortalOptions, PortalNode, PortalContextType, } from './types';
export { getPositionStyles } from '../utiles/position';
//# sourceMappingURL=index.d.ts.map