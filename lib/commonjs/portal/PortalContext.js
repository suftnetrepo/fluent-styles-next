"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PortalContext = void 0;
exports.usePortal = usePortal;
var _react = require("react");
/**
 * React context that carries the declarative mount / update / unmount API.
 * Consumed by the `usePortal` hook below and provided by `PortalManager`.
 */
const PortalContext = exports.PortalContext = /*#__PURE__*/(0, _react.createContext)(null);

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
function usePortal() {
  const context = (0, _react.useContext)(PortalContext);
  if (!context) {
    throw new Error('[Portal] `usePortal` must be called inside a `PortalManager` (or `GlobalPortalProvider`) tree. ' + 'Ensure your app root is wrapped with one of those providers.');
  }
  return context;
}
//# sourceMappingURL=PortalContext.js.map