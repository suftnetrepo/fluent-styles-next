"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDialogue = useDialogue;
var _react = _interopRequireWildcard(require("react"));
var _PortalContext = require("../portal/PortalContext.js");
var _dialogue = require("./dialogue.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useDialogue() {
  const {
    mount,
    unmount
  } = (0, _PortalContext.usePortal)();
  const show = (0, _react.useCallback)(options => {
    const idBox = {
      current: -1
    };
    const handleDismiss = () => {
      unmount(idBox.current);
    };
    const handleBackdrop = () => {
      unmount(idBox.current);
    };
    idBox.current = mount(/*#__PURE__*/(0, _jsxRuntime.jsx)(_dialogue.Dialogue, {
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
  const dismiss = (0, _react.useCallback)(id => unmount(id), [unmount]);
  const confirm = (0, _react.useCallback)(options => new Promise(resolve => {
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
    idBox.current = mount(/*#__PURE__*/(0, _jsxRuntime.jsx)(_dialogue.Dialogue, {
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
  const alert = (0, _react.useCallback)((title, message, icon, theme) => new Promise(resolve => {
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
    idBox.current = mount(/*#__PURE__*/(0, _jsxRuntime.jsx)(_dialogue.Dialogue, {
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