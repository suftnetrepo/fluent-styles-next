"use strict";

/**
 * Imperative portal services — usable from outside the React tree.
 * Prerequisite: wrap your app root with `<GlobalPortalProvider>`.
 */

import React from 'react';
import { portal } from "../portal/PortalInstance.js";
import { Toast } from "../toast/index.js";
import { Notification } from "../notification/index.js";
import { Loader } from "../loading/loader.js";
import { Dialogue } from "../dialog/dialogue.js";
import { ActionSheet } from "../actionSheet/index.js";

// ─── Shared helper ────────────────────────────────────────────────────────────

function mountWithAutoDismiss(createElement, options) {
  const idBox = {
    current: -1
  };
  idBox.current = portal.show(createElement(() => portal.hide(idBox.current)), options);
  return idBox.current;
}

// ─── Toast ────────────────────────────────────────────────────────────────────

export const toastService = {
  show: options => mountWithAutoDismiss(onDismiss => /*#__PURE__*/React.createElement(Toast, {
    ...options,
    onDismiss
  }), {
    position: 'top',
    offset: {
      x: 0,
      y: 56
    }
  }),
  success: (message, description) => toastService.show({
    message,
    description,
    variant: 'success'
  }),
  error: (message, description) => toastService.show({
    message,
    description,
    variant: 'error'
  }),
  warning: (message, description) => toastService.show({
    message,
    description,
    variant: 'warning'
  }),
  info: (message, description) => toastService.show({
    message,
    description,
    variant: 'info'
  }),
  dismiss: id => portal.hide(id)
};

// ─── Notification ─────────────────────────────────────────────────────────────

export const notificationService = {
  show: options => mountWithAutoDismiss(onDismiss => /*#__PURE__*/React.createElement(Notification, {
    ...options,
    onDismiss
  }), {
    position: 'top-right',
    offset: {
      x: 16,
      y: 56
    }
  }),
  dismiss: id => portal.hide(id)
};

// ─── Loader ───────────────────────────────────────────────────────────────────

export const loaderService = {
  show: (options = {}) => portal.show(/*#__PURE__*/React.createElement(Loader, {
    ...options,
    overlay: options.overlay ?? true
  }), {
    position: 'center'
  }),
  hide: id => portal.hide(id),
  wrap: async (fn, options = {}) => {
    const id = loaderService.show(options);
    try {
      return await fn();
    } finally {
      loaderService.hide(id);
    }
  }
};

// ─── Dialogue ─────────────────────────────────────────────────────────────────

function showDialogue(options) {
  const idBox = {
    current: -1
  };
  const handleDismiss = () => portal.hide(idBox.current);
  const handleBackdrop = () => portal.hide(idBox.current);
  idBox.current = portal.show(/*#__PURE__*/React.createElement(Dialogue, {
    ...options,
    actions: options.actions ?? [{
      label: 'OK',
      onPress: () => {}
    }],
    onDismiss: handleDismiss
  }), {
    position: 'center',
    backdrop: true,
    onBackdropPress: handleBackdrop
  });
  return idBox.current;
}
export const dialogueService = {
  show: options => showDialogue(options),
  dismiss: id => portal.hide(id),
  confirm: options => new Promise(resolve => {
    showDialogue({
      title: options.title,
      message: options.message,
      icon: options.icon,
      theme: options.theme,
      colors: options.colors,
      actions: [{
        label: options.cancelLabel ?? 'Cancel',
        variant: 'secondary',
        onPress: () => resolve(false)
      }, {
        label: options.confirmLabel ?? 'Confirm',
        variant: options.destructive ? 'destructive' : 'primary',
        onPress: () => resolve(true)
      }]
    });
  }),
  alert: (title, message, icon) => new Promise(resolve => {
    showDialogue({
      title,
      message,
      icon,
      actions: [{
        label: 'OK',
        variant: 'primary',
        onPress: resolve
      }]
    });
  })
};

// ─── Action Sheet ─────────────────────────────────────────────────────────────

function showActionSheet(options) {
  const idBox = {
    current: -1
  };
  const handleDismiss = () => portal.hide(idBox.current);
  const handleBackdrop = () => portal.hide(idBox.current);
  idBox.current = portal.show(/*#__PURE__*/React.createElement(ActionSheet, {
    ...options,
    onDismiss: handleDismiss
  }), {
    position: 'bottom',
    backdrop: true,
    onBackdropPress: handleBackdrop
  });
  return idBox.current;
}
export const actionSheetService = {
  show: options => showActionSheet(options),
  present: (children, options = {}) => showActionSheet({
    ...options,
    children
  }),
  dismiss: id => portal.hide(id)
};
//# sourceMappingURL=index.js.map