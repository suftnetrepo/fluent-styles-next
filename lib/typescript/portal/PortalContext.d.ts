/// <reference types="react" />
import type { PortalContextType } from './types';
/**
 * React context that carries the declarative mount / update / unmount API.
 * Consumed by the `usePortal` hook below and provided by `PortalManager`.
 */
export declare const PortalContext: import("react").Context<PortalContextType | null>;
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
export declare function usePortal(): PortalContextType;
//# sourceMappingURL=PortalContext.d.ts.map