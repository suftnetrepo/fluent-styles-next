"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toastService = exports.notificationService = exports.loaderService = exports.dialogueService = exports.actionSheetService = void 0;
var _react = _interopRequireDefault(require("react"));
var _PortalInstance = require("../portal/PortalInstance.js");
var _index = require("../toast/index.js");
var _index2 = require("../notification/index.js");
var _loader = require("../loading/loader.js");
var _dialogue = require("../dialog/dialogue.js");
var _index3 = require("../actionSheet/index.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Imperative portal services — usable from outside the React tree.
 * Prerequisite: wrap your app root with `<GlobalPortalProvider>`.
 */

// ─── Shared helper ────────────────────────────────────────────────────────────

function mountWithAutoDismiss(createElement, options) {
  const idBox = {
    current: -1
  };
  idBox.current = _PortalInstance.portal.show(createElement(() => _PortalInstance.portal.hide(idBox.current)), options);
  return idBox.current;
}

// ─── Toast ────────────────────────────────────────────────────────────────────

const toastService = exports.toastService = {
  show: options => mountWithAutoDismiss(onDismiss => /*#__PURE__*/_react.default.createElement(_index.Toast, {
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
  dismiss: id => _PortalInstance.portal.hide(id)
};

// ─── Notification ─────────────────────────────────────────────────────────────

const notificationService = exports.notificationService = {
  show: options => mountWithAutoDismiss(onDismiss => /*#__PURE__*/_react.default.createElement(_index2.Notification, {
    ...options,
    onDismiss
  }), {
    position: 'top-right',
    offset: {
      x: 16,
      y: 56
    }
  }),
  dismiss: id => _PortalInstance.portal.hide(id)
};

// ─── Loader ───────────────────────────────────────────────────────────────────

const loaderService = exports.loaderService = {
  show: (options = {}) => _PortalInstance.portal.show(/*#__PURE__*/_react.default.createElement(_loader.Loader, {
    ...options,
    overlay: options.overlay ?? true
  }), {
    position: 'center'
  }),
  hide: id => _PortalInstance.portal.hide(id),
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
  const handleDismiss = () => _PortalInstance.portal.hide(idBox.current);
  const handleBackdrop = () => _PortalInstance.portal.hide(idBox.current);
  idBox.current = _PortalInstance.portal.show(/*#__PURE__*/_react.default.createElement(_dialogue.Dialogue, {
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
const dialogueService = exports.dialogueService = {
  show: options => showDialogue(options),
  dismiss: id => _PortalInstance.portal.hide(id),
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
  const handleDismiss = () => _PortalInstance.portal.hide(idBox.current);
  const handleBackdrop = () => _PortalInstance.portal.hide(idBox.current);
  idBox.current = _PortalInstance.portal.show(/*#__PURE__*/_react.default.createElement(_index3.ActionSheet, {
    ...options,
    onDismiss: handleDismiss
  }), {
    position: 'bottom',
    backdrop: true,
    onBackdropPress: handleBackdrop
  });
  return idBox.current;
}
const actionSheetService = exports.actionSheetService = {
  show: options => showActionSheet(options),
  present: (children, options = {}) => showActionSheet({
    ...options,
    children
  }),
  dismiss: id => _PortalInstance.portal.hide(id)
};
//# sourceMappingURL=index.js.map