import { useCallback } from 'react'
import React from 'react'
import { usePortal } from '../portal/PortalContext'
import { ActionSheet, ActionSheetProps, ActionSheetItem } from './actionSheet'

// ─── Types ────────────────────────────────────────────────────────────────────

/** All props except `onDismiss` — the hook wires that up internally. */
export type ShowActionSheetOptions = Omit<ActionSheetProps, 'onDismiss'>

export type ActionSheetAPI = {
  /**
   * Shows a fully custom action sheet. Returns the portal id.
   *
   * Pass `items`, `children`, or both.
   * - `items` renders a standard list of tappable rows.
   * - `children` renders arbitrary JSX above the items (pickers, previews, forms).
   *
   * @example
   * ```tsx
   * actionSheet.show({
   *   title: 'Share photo',
   *   items: [
   *     { icon: '📋', label: 'Copy link',     onPress: copyLink },
   *     { icon: '✉️', label: 'Send via email', onPress: shareEmail },
   *     { icon: '🗑️', label: 'Delete photo',  variant: 'destructive', onPress: deletePhoto },
   *   ],
   * })
   * ```
   */
  show: (options: ShowActionSheetOptions) => number

  /**
   * Shows an action sheet whose entire body is the `children` you pass in.
   * Useful for custom pickers, colour swatches, rating selectors, etc.
   *
   * @example
   * ```tsx
   * actionSheet.present(
   *   <MyDatePicker onChange={setDate} />,
   *   { title: 'Pick a date' },
   * )
   * ```
   */
  present: (
    children: React.ReactNode,
    options?: Omit<ShowActionSheetOptions, 'children'>,
  ) => number

  /**
   * Immediately removes the action sheet (skips exit animation).
   * In most cases you don't need this — the sheet dismisses itself after
   * any item is tapped or Cancel is pressed.
   */
  dismiss: (id: number) => void
}

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
export function useActionSheet(): ActionSheetAPI {
  const { mount, unmount } = usePortal()

  const show = useCallback(
    (options: ShowActionSheetOptions): number => {
      // idBox allocated before JSX — onDismiss/onCancel closures read
      // idBox.current at call-time, safe under concurrent mode.
      const idBox = { current: -1 }

      const handleDismiss  = () => unmount(idBox.current)
      const handleBackdrop = () => unmount(idBox.current)

      idBox.current = mount(
        <ActionSheet
          {...options}
          onDismiss={handleDismiss}
        />,
        {
          // 'bottom' spans full width and anchors at the bottom edge —
          // perfect for sheets that slide up from the bottom.
          position:        'bottom',
          backdrop:        true,
          onBackdropPress: handleBackdrop,
        },
      )

      return idBox.current
    },
    [mount, unmount],
  )

  const present = useCallback(
    (
      children: React.ReactNode,
      options: Omit<ShowActionSheetOptions, 'children'> = {},
    ): number => show({ ...options, children }),
    [show],
  )

  const dismiss = useCallback(
    (id: number) => unmount(id),
    [unmount],
  )

  return { show, present, dismiss }
}