"use strict";

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
export class PortalInstance {
  nextId = 10_000;
  portals = new Map();
  listeners = new Set();

  // ─── Subscription ─────────────────────────────────────────────────────────

  /**
   * Registers a change listener. Returns an unsubscribe function.
   *
   * Consumers (e.g. `GlobalPortalProvider`) call this once on mount and
   * invoke the returned cleanup on unmount.
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  notify() {
    this.listeners.forEach(fn => fn());
  }

  // ─── Read ─────────────────────────────────────────────────────────────────

  /** Returns a stable snapshot of all currently registered portals. */
  getPortals() {
    return Array.from(this.portals.values());
  }

  // ─── Write ────────────────────────────────────────────────────────────────

  /**
   * Registers a new portal and triggers a re-render in all subscribers.
   *
   * @returns The numeric `id` assigned to this portal – hold onto it to
   *          call `update` or `hide` later.
   */
  show(children, options = {}) {
    const id = this.nextId++;
    this.portals.set(id, {
      id,
      children,
      options
    });
    this.notify();
    return id;
  }

  /**
   * Replaces the content / options of an existing portal in-place.
   * If `id` is not found, the call is a silent no-op (safe to call
   * unconditionally inside cleanup paths).
   */
  update(id, children, options) {
    const existing = this.portals.get(id);
    if (!existing) return;
    this.portals.set(id, {
      ...existing,
      children,
      options: options ?? existing.options
    });
    this.notify();
  }

  /**
   * Removes a portal and triggers a re-render.
   * Safe to call with an `id` that has already been hidden.
   */
  hide(id) {
    if (this.portals.delete(id)) {
      this.notify();
    }
  }

  /**
   * Removes **all** registered portals at once.
   * Useful for screen transitions or hard resets.
   */
  hideAll() {
    if (this.portals.size === 0) return;
    this.portals.clear();
    this.notify();
  }
}

/**
 * Application-wide portal singleton.
 * Import and use this wherever you need imperative portal control.
 */
export const portal = new PortalInstance();
//# sourceMappingURL=PortalInstance.js.map