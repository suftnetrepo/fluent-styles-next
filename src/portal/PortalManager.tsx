import React, { useCallback, useState } from 'react'
import { PortalContext } from './PortalContext'
import { PortalRenderer } from './PortalRenderer'
import type { PortalNode, PortalOptions } from './types'

/**
 * Provides the **declarative** portal API to its React subtree via context.
 *
 * Place `PortalManager` at (or near) the root of your component tree so that
 * any descendant can call `usePortal()` to imperatively mount floating UI.
 *
 * ### When to use `PortalManager` vs `GlobalPortalProvider`
 * | Scenario | Recommended provider |
 * |---|---|
 * | React-component consumers using `usePortal()` | `PortalManager` |
 * | Non-React code / navigation handlers | `GlobalPortalProvider` |
 * | Both | Wrap with `GlobalPortalProvider`; it re-exports the hook too |
 *
 * @example
 * ```tsx
 * // App root
 * export default function App() {
 *   return (
 *     <PortalManager>
 *       <Navigation />
 *     </PortalManager>
 *   )
 * }
 *
 * // Somewhere deep in the tree
 * function MyScreen() {
 *   const { mount, unmount } = usePortal()
 *   const idRef = useRef<number>()
 *
 *   const open = () => {
 *     idRef.current = mount(<Modal />, { backdrop: true })
 *   }
 *   const close = () => idRef.current && unmount(idRef.current)
 *
 *   return <Button onPress={open} title="Open" />
 * }
 * ```
 */

let _nextId = 0

type Props = { children: React.ReactNode }

export const PortalManager: React.FC<Props> = ({ children }) => {
  const [portals, setPortals] = useState<PortalNode[]>([])

  const mount = useCallback(
    (node: React.ReactNode, options: PortalOptions = {}): number => {
      const id = _nextId++
      setPortals(prev => [...prev, { id, children: node, options }])
      return id
    },
    [],
  )

  const update = useCallback(
    (id: number, node: React.ReactNode, options?: PortalOptions): void => {
      setPortals(prev =>
        prev.map(portal =>
          portal.id === id
            ? { ...portal, children: node, options: options ?? portal.options }
            : portal,
        ),
      )
    },
    [],
  )

  const unmount = useCallback((id: number): void => {
    setPortals(prev => prev.filter(portal => portal.id !== id))
  }, [])

  return (
    <PortalContext.Provider value={{ mount, update, unmount }}>
      {children}
      <PortalRenderer portals={portals} />
    </PortalContext.Provider>
  )
}
