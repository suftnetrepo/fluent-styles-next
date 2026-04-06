"use strict";

import { useCallback, useRef } from 'react';
import React from 'react';
import { usePortal } from "../portal/PortalContext.js";
import { Toast } from "./index.js";

// ─── Types ────────────────────────────────────────────────────────────────────
import { jsx as _jsx } from "react/jsx-runtime";
// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Declarative toast hook — requires a `PortalManager` ancestor.
 *
 * @example
 * ```tsx
 * const toast = useToast()
 *
 * // Convenience shortcuts
 * toast.success('Profile saved')
 * toast.error('Upload failed', 'Max file size is 5 MB')
 *
 * // Full control
 * const id = toast.show({ message: 'Processing…', duration: 0, variant: 'info' })
 * // Later:
 * toast.dismiss(id)
 * ```
 */
export function useToast() {
  const {
    mount,
    unmount
  } = usePortal();
  // Track all active ids so dismissAll() works
  const activeIds = useRef(new Set());
  const show = useCallback(options => {
    let id;
    const handleDismiss = () => {
      unmount(id);
      activeIds.current.delete(id);
    };
    id = mount(/*#__PURE__*/_jsx(Toast, {
      ...options,
      onDismiss: handleDismiss
    }), {
      position: 'top',
      offset: {
        x: 0,
        y: 56
      }
    });
    activeIds.current.add(id);
    return id;
  }, [mount, unmount]);
  const shortcut = useCallback(variant => (message, description) => show({
    message,
    description,
    variant
  }), [show]);
  const dismiss = useCallback(id => {
    unmount(id);
    activeIds.current.delete(id);
  }, [unmount]);
  const dismissAll = useCallback(() => {
    activeIds.current.forEach(id => unmount(id));
    activeIds.current.clear();
  }, [unmount]);
  return {
    show,
    success: shortcut('success'),
    error: shortcut('error'),
    warning: shortcut('warning'),
    info: shortcut('info'),
    dismiss,
    dismissAll
  };
}
//# sourceMappingURL=useToast.js.map