import type React from 'react';
import type { PortalNode, PortalOptions } from './types';
type Listener = () => void;
/**
 * Imperative, framework-agnostic portal registry.
 *
 * `PortalInstance` holds the source-of-truth for all portals that are managed
 * outside the React tree (e.g. from plain TypeScript helpers, navigation
 * handlers, or third-party libraries).  React components subscribe to changes
 * via `subscribe()` and re-render when the list changes.
 *
 * The exported `portal` singleton is the recommended way to interact with this
 * class.  Only create additional instances if you need isolated portal scopes
 * (e.g. in tests or multi-window environments).
 *
 * @example
 * ```ts
 * // Show
 * const id = portal.show(<Toast message="Saved!" />, { position: 'bottom' })
 *
 * // Later update the same portal without closing it
 * portal.update(id, <Toast message="Updated!" />)
 *
 * // Dismiss
 * portal.hide(id)
 * ```
 */
export declare class PortalInstance {
    private nextId;
    private portals;
    private listeners;
    /**
     * Registers a change listener. Returns an unsubscribe function.
     *
     * Consumers (e.g. `GlobalPortalProvider`) call this once on mount and
     * invoke the returned cleanup on unmount.
     */
    subscribe(listener: Listener): () => void;
    private notify;
    /** Returns a stable snapshot of all currently registered portals. */
    getPortals(): PortalNode[];
    /**
     * Registers a new portal and triggers a re-render in all subscribers.
     *
     * @returns The numeric `id` assigned to this portal – hold onto it to
     *          call `update` or `hide` later.
     */
    show(children: React.ReactNode, options?: PortalOptions): number;
    /**
     * Replaces the content / options of an existing portal in-place.
     * If `id` is not found, the call is a silent no-op (safe to call
     * unconditionally inside cleanup paths).
     */
    update(id: number, children: React.ReactNode, options?: PortalOptions): void;
    /**
     * Removes a portal and triggers a re-render.
     * Safe to call with an `id` that has already been hidden.
     */
    hide(id: number): void;
    /**
     * Removes **all** registered portals at once.
     * Useful for screen transitions or hard resets.
     */
    hideAll(): void;
}
/**
 * Application-wide portal singleton.
 * Import and use this wherever you need imperative portal control.
 */
export declare const portal: PortalInstance;
export {};
//# sourceMappingURL=PortalInstance.d.ts.map