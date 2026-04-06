"use strict";

import { useCallback } from 'react';
import React from 'react';
import { usePortal } from "../portal/PortalContext.js";
import { ActionSheet } from "./actionSheet.js";

// ─── Types ────────────────────────────────────────────────────────────────────

/** All props except `onDismiss` — the hook wires that up internally. */
import { jsx as _jsx } from "react/jsx-runtime";
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
export function useActionSheet() {
  const {
    mount,
    unmount
  } = usePortal();
  const show = useCallback(options => {
    // idBox allocated before JSX — onDismiss/onCancel closures read
    // idBox.current at call-time, safe under concurrent mode.
    const idBox = {
      current: -1
    };
    const handleDismiss = () => unmount(idBox.current);
    const handleBackdrop = () => unmount(idBox.current);
    idBox.current = mount(/*#__PURE__*/_jsx(ActionSheet, {
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
  const present = useCallback((children, options = {}) => show({
    ...options,
    children
  }), [show]);
  const dismiss = useCallback(id => unmount(id), [unmount]);
  return {
    show,
    present,
    dismiss
  };
}
//# sourceMappingURL=useActionSheet.js.map