"use strict";

import React, { useEffect, useState } from 'react';
import { portal } from "./PortalInstance.js";
import { PortalRenderer } from "./PortalRenderer.js";

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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export const GlobalPortalProvider = ({
  children
}) => {
  const [portals, setPortals] = useState(() => portal.getPortals());
  useEffect(() => {
    // Sync state whenever the singleton changes.
    const unsubscribe = portal.subscribe(() => {
      setPortals(portal.getPortals());
    });
    return unsubscribe;
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [children, /*#__PURE__*/_jsx(PortalRenderer, {
      portals: portals
    })]
  });
};
//# sourceMappingURL=GlobalPortalProvider.js.map