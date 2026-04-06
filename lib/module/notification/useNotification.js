"use strict";

import { useCallback } from 'react';
import React from 'react';
import { usePortal } from "../portal/PortalContext.js";
import { Notification } from "./index.js";

// ─── Types ────────────────────────────────────────────────────────────────────
import { jsx as _jsx } from "react/jsx-runtime";
// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Declarative notification hook — requires a `PortalManager` ancestor.
 *
 * Notifications slide in from the right edge at the top of the screen and
 * auto-dismiss after `duration` ms (default 5000).
 *
 * @example
 * ```tsx
 * const notification = useNotification()
 *
 * notification.show({
 *   title: 'New message from Alex',
 *   body:  'Hey, are you free this afternoon?',
 *   source: 'Messages',
 *   initials: 'AK',
 *   timestamp: 'now',
 *   actionLabel: 'Reply',
 *   onAction: () => navigation.navigate('Chat'),
 * })
 * ```
 */
export function useNotification() {
  const {
    mount,
    unmount
  } = usePortal();
  const show = useCallback(options => {
    let id;
    id = mount(/*#__PURE__*/_jsx(Notification, {
      ...options,
      onDismiss: () => unmount(id)
    }), {
      position: 'top-right',
      offset: {
        x: 16,
        y: 56
      }
    });
    return id;
  }, [mount, unmount]);
  const dismiss = useCallback(id => unmount(id), [unmount]);
  return {
    show,
    dismiss
  };
}
//# sourceMappingURL=useNotification.js.map