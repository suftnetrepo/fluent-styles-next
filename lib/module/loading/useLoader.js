"use strict";

import { useCallback, useRef } from 'react';
import React from 'react';
import { usePortal } from "../portal/PortalContext.js";
import { Loader } from "./index.js";

// ─── Types ────────────────────────────────────────────────────────────────────
import { jsx as _jsx } from "react/jsx-runtime";
// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Declarative loader hook.
 * Requires a `PortalManager` ancestor.
 *
 * @example
 * ```tsx
 * const loader = useLoader()
 *
 * // Manual control
 * const id = loader.show({ label: 'Saving…', variant: 'spinner' })
 * await saveData()
 * loader.hide(id)
 *
 * // Automatic via wrap()
 * const result = await loader.wrap(() => fetchData(), { label: 'Loading…' })
 * ```
 */
export function useLoader() {
  const {
    mount,
    unmount
  } = usePortal();

  // Tracks the last shown loader id so callers who didn't store the id can
  // still call hide() without arguments in simple single-loader flows.
  const lastIdRef = useRef(null);
  const show = useCallback((options = {}) => {
    // Loader has no onDismiss callback, so no idBox dance needed here.
    const id = mount(/*#__PURE__*/_jsx(Loader, {
      ...options,
      overlay: options.overlay ?? true
    }), {
      position: 'center'
    });
    lastIdRef.current = id;
    return id;
  }, [mount]);
  const hide = useCallback(id => {
    unmount(id);
    if (lastIdRef.current === id) lastIdRef.current = null;
  }, [unmount]);
  return {
    show,
    hide
  };
}
//# sourceMappingURL=useLoader.js.map