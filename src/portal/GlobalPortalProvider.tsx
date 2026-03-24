import React, { useEffect, useState } from 'react'
import { portal } from './PortalInstance'
import { PortalRenderer } from './PortalRenderer'
import type { PortalNode } from './types'

/**
 * Subscribes to the global `portal` singleton and renders whatever portals
 * it currently holds.
 *
 * ### Usage
 * Wrap your app root (or the root of the navigable area) with this provider.
 * You can then call `portal.show(...)` / `portal.hide(...)` from anywhere —
 * including non-React code such as navigation helpers or async service
 * callbacks.
 *
 * This component deliberately has **no** React context value; it exists purely
 * to drive re-renders when the singleton changes.  If you also need the
 * declarative `usePortal()` hook, use `PortalManager` instead (or nest both).
 *
 * @example
 * ```tsx
 * // App root
 * export default function App() {
 *   return (
 *     <GlobalPortalProvider>
 *       <Navigation />
 *     </GlobalPortalProvider>
 *   )
 * }
 *
 * // Anywhere – including outside React
 * import { portal } from '@/portal'
 *
 * function showNetworkError() {
 *   const id = portal.show(
 *     <ErrorBanner message="No internet connection" />,
 *     { position: 'top', backdrop: false },
 *   )
 *   setTimeout(() => portal.hide(id), 4000)
 * }
 * ```
 */

type Props = { children: React.ReactNode }

export const GlobalPortalProvider: React.FC<Props> = ({ children }) => {
  const [portals, setPortals] = useState<PortalNode[]>(() => portal.getPortals())

  useEffect(() => {
    // Sync state whenever the singleton changes.
    const unsubscribe = portal.subscribe(() => {
      setPortals(portal.getPortals())
    })
    return unsubscribe
  }, [])

  return (
    <>
      {children}
      <PortalRenderer portals={portals} />
    </>
  )
}
