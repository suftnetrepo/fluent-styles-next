"use strict";

import { useCallback } from 'react';
import React from 'react';
import { usePortal } from "../portal/PortalContext.js";
import { Dialogue } from "./dialogue.js";

// ─── Types ────────────────────────────────────────────────────────────────────
import { jsx as _jsx } from "react/jsx-runtime";
// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useDialogue() {
  const {
    mount,
    unmount
  } = usePortal();
  const show = useCallback(options => {
    const idBox = {
      current: -1
    };
    const handleDismiss = () => {
      unmount(idBox.current);
    };
    const handleBackdrop = () => {
      unmount(idBox.current);
    };
    idBox.current = mount(/*#__PURE__*/_jsx(Dialogue, {
      ...options,
      actions: options.actions ?? [{
        label: 'OK',
        onPress: () => {}
      }],
      onDismiss: handleDismiss
    }), {
      position: 'center',
      backdrop: false,
      onBackdropPress: handleBackdrop
    });
    return idBox.current;
  }, [mount, unmount]);
  const dismiss = useCallback(id => unmount(id), [unmount]);
  const confirm = useCallback(options => new Promise(resolve => {
    let settled = false;
    const idBox = {
      current: -1
    };
    const finish = value => {
      if (settled) return;
      settled = true;
      resolve(value);
      requestAnimationFrame(() => {
        unmount(idBox.current);
      });
    };
    idBox.current = mount(/*#__PURE__*/_jsx(Dialogue, {
      title: options.title,
      message: options.message,
      icon: options.icon,
      theme: options.theme ?? "light",
      onDismiss: () => finish(false),
      actions: [{
        label: options.cancelLabel ?? 'Cancel',
        variant: 'secondary',
        onPress: () => finish(false)
      }, {
        label: options.confirmLabel ?? 'Confirm',
        variant: options.destructive ? 'destructive' : 'primary',
        onPress: () => finish(true)
      }]
    }), {
      position: 'center',
      backdrop: false,
      onBackdropPress: () => finish(false)
    });
  }), [mount, unmount]);
  const alert = useCallback((title, message, icon, theme) => new Promise(resolve => {
    let settled = false;
    const idBox = {
      current: -1
    };
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
      requestAnimationFrame(() => {
        unmount(idBox.current);
      });
    };
    idBox.current = mount(/*#__PURE__*/_jsx(Dialogue, {
      title: title,
      message: message,
      icon: icon,
      theme: theme ?? "light",
      onDismiss: finish,
      actions: [{
        label: 'OK',
        variant: 'primary',
        onPress: finish
      }]
    }), {
      position: 'center',
      backdrop: false,
      onBackdropPress: finish
    });
  }), [show, unmount]);
  return {
    show,
    dismiss,
    confirm,
    alert
  };
}
//# sourceMappingURL=useDialogue.js.map