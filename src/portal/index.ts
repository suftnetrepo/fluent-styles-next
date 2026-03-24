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

// Providers
export { PortalManager } from './PortalManager'
export { GlobalPortalProvider } from './GlobalPortalProvider'

// Hook (declarative API)
export { usePortal } from './PortalContext'

// Singleton (imperative API)
export { portal, PortalInstance } from './PortalInstance'

// Shared renderer (useful if you're building a custom provider)
export { PortalRenderer } from './PortalRenderer'

// Types
export type {
  Position,
  Offset,
  PortalOptions,
  PortalNode,
  PortalContextType,
} from './types'

// Utilities (exported for consumers who build custom positioning logic)
export { getPositionStyles } from '../utiles/position'
