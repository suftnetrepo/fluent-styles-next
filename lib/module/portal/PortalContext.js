"use strict";

import { createContext, useContext } from 'react';
/**
 * React context that carries the declarative mount / update / unmount API.
 * Consumed by the `usePortal` hook below and provided by `PortalManager`.
 */
export const PortalContext = /*#__PURE__*/createContext(null);

/**
 * Returns the portal control API from the nearest `PortalManager` ancestor.
 *
 * @example
 * ```tsx
 * const { mount, unmount } = usePortal()
 *
 * const handleOpen = () => {
 *   const id = mount(<MyModal />, { backdrop: true, position: 'center' })
 *   // Later:
 *   unmount(id)
 * }
 * ```
 *
 * @throws If called outside a `PortalManager` tree.
 */
export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('[Portal] `usePortal` must be called inside a `PortalManager` (or `GlobalPortalProvider`) tree. ' + 'Ensure your app root is wrapped with one of those providers.');
  }
  return context;
}
//# sourceMappingURL=PortalContext.js.map