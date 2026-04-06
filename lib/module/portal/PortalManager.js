"use strict";

import React, { useCallback, useState } from 'react';
import { PortalContext } from "./PortalContext.js";
import { PortalRenderer } from "./PortalRenderer.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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

let _nextId = 0;
export const PortalManager = ({
  children
}) => {
  const [portals, setPortals] = useState([]);
  const mount = useCallback((node, options = {}) => {
    const id = _nextId++;
    setPortals(prev => [...prev, {
      id,
      children: node,
      options
    }]);
    return id;
  }, []);
  const update = useCallback((id, node, options) => {
    setPortals(prev => prev.map(portal => portal.id === id ? {
      ...portal,
      children: node,
      options: options ?? portal.options
    } : portal));
  }, []);
  const unmount = useCallback(id => {
    setPortals(prev => prev.filter(portal => portal.id !== id));
  }, []);
  return /*#__PURE__*/_jsxs(PortalContext.Provider, {
    value: {
      mount,
      update,
      unmount
    },
    children: [children, /*#__PURE__*/_jsx(PortalRenderer, {
      portals: portals
    })]
  });
};
//# sourceMappingURL=PortalManager.js.map