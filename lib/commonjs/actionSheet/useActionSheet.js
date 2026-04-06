"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useActionSheet = useActionSheet;
var _react = _interopRequireWildcard(require("react"));
var _PortalContext = require("../portal/PortalContext.js");
var _actionSheet = require("./actionSheet.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// ─── Types ────────────────────────────────────────────────────────────────────

/** All props except `onDismiss` — the hook wires that up internally. */

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Declarative action sheet hook.
 * Requires a `PortalManager` ancestor.
 *
 * @example
 * ```tsx
 * const actionSheet = useActionSheet()
 *
 * // ── Items-only sheet ──────────────────────────────────────────────────
 * actionSheet.show({
 *   title: 'Post options',
 *   items: [
 *     { icon: '✏️',  label: 'Edit',             onPress: onEdit },
 *     { icon: '🔗',  label: 'Copy link',         onPress: onCopy },
 *     { icon: '🚩',  label: 'Report',            variant: 'destructive', onPress: onReport },
 *     { icon: '🔒',  label: 'Premium only',      variant: 'disabled' },
 *   ],
 * })
 *
 * // ── Children-only sheet ───────────────────────────────────────────────
 * actionSheet.present(
 *   <EmojiPicker onSelect={emoji => { setEmoji(emoji) }} />,
 *   { title: 'Choose reaction' },
 * )
 *
 * // ── Mixed sheet ───────────────────────────────────────────────────────
 * actionSheet.show({
 *   title: 'Choose a colour',
 *   children: <ColourSwatchRow onSelect={setColour} />,
 *   items: [
 *     { label: 'Reset to default', onPress: resetColour },
 *   ],
 * })
 * ```
 */
function useActionSheet() {
  const {
    mount,
    unmount
  } = (0, _PortalContext.usePortal)();
  const show = (0, _react.useCallback)(options => {
    // idBox allocated before JSX — onDismiss/onCancel closures read
    // idBox.current at call-time, safe under concurrent mode.
    const idBox = {
      current: -1
    };
    const handleDismiss = () => unmount(idBox.current);
    const handleBackdrop = () => unmount(idBox.current);
    idBox.current = mount(/*#__PURE__*/(0, _jsxRuntime.jsx)(_actionSheet.ActionSheet, {
      ...options,
      onDismiss: handleDismiss
    }), {
      // 'bottom' spans full width and anchors at the bottom edge —
      // perfect for sheets that slide up from the bottom.
      position: 'bottom',
      backdrop: true,
      onBackdropPress: handleBackdrop
    });
    return idBox.current;
  }, [mount, unmount]);
  const present = (0, _react.useCallback)((children, options = {}) => show({
    ...options,
    children
  }), [show]);
  const dismiss = (0, _react.useCallback)(id => unmount(id), [unmount]);
  return {
    show,
    present,
    dismiss
  };
}
//# sourceMappingURL=useActionSheet.js.map