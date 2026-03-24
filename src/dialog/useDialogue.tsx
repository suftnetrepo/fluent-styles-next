import { useCallback } from 'react'
import React from 'react'
import { usePortal } from '../portal/PortalContext'
import { Dialogue, DialogueAction, DialogueProps } from './dialogue'

// ─── Types ────────────────────────────────────────────────────────────────────

/** All props except `onDismiss` — the hook wires that up internally. */
export type ShowDialogueOptions = Omit<DialogueProps, 'onDismiss'> & {
  /** Actions are optional here; defaults to a single "OK" button. */
  actions?: DialogueAction[]
}

export type ConfirmOptions = {
  title: string
  message?: string
  icon?: string
  confirmLabel?: string
  cancelLabel?: string
  /** Renders the confirm button in the destructive (red) style. */
  destructive?: boolean
}

export type DialogueAPI = {
  /** Shows a fully custom dialogue. Returns the portal id. */
  show: (options: ShowDialogueOptions) => number
  /** Immediately removes a dialogue by id (skips exit animation). */
  dismiss: (id: number) => void
  /**
   * Shows a confirm / cancel dialogue.
   * Returns a Promise that resolves `true` (confirm) or `false` (cancel).
   *
   * @example
   * ```ts
   * const confirmed = await dialogue.confirm({
   *   title:       'Delete account?',
   *   message:     'This action cannot be undone.',
   *   icon:        '⚠️',
   *   destructive: true,
   * })
   * if (confirmed) deleteAccount()
   * ```
   */
  confirm: (options: ConfirmOptions) => Promise<boolean>
  /**
   * Shows a one-button alert dialogue.
   * Returns a Promise that resolves when the user taps OK.
   *
   * @example
   * ```ts
   * await dialogue.alert('Session expired', 'Please log in again.', '🔒')
   * redirectToLogin()
   * ```
   */
  alert: (title: string, message?: string, icon?: string) => Promise<void>
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Declarative dialogue hook.
 * Requires a `PortalManager` ancestor.
 *
 * @example
 * ```tsx
 * const dialogue = useDialogue()
 *
 * dialogue.show({
 *   title:   'Unsaved changes',
 *   icon:    '📝',
 *   actions: [
 *     { label: 'Discard',      variant: 'destructive', onPress: discard },
 *     { label: 'Keep editing', variant: 'primary',     onPress: () => {} },
 *   ],
 * })
 *
 * const confirmed = await dialogue.confirm({ title: 'Are you sure?' })
 * ```
 */
export function useDialogue(): DialogueAPI {
  const { mount, unmount } = usePortal()

  const show = useCallback(
    (options: ShowDialogueOptions): number => {
      // Allocate idBox before JSX so both onDismiss and onBackdropPress
      // closures always read the resolved portal id.
      const idBox = { current: -1 }

      const handleDismiss  = () => unmount(idBox.current)
      const handleBackdrop = () => unmount(idBox.current)

      idBox.current = mount(
        <Dialogue
          {...options}
          actions={options.actions ?? [{ label: 'OK', onPress: () => {} }]}
          onDismiss={handleDismiss}
        />,
        {
          position:        'center',
          backdrop:        true,
          onBackdropPress: handleBackdrop,
        },
      )

      return idBox.current
    },
    [mount, unmount],
  )

  const dismiss = useCallback(
    (id: number) => unmount(id),
    [unmount],
  )

  const confirm = useCallback(
    (options: ConfirmOptions): Promise<boolean> =>
      new Promise(resolve => {
        show({
          title:   options.title,
          message: options.message,
          icon:    options.icon,
          actions: [
            {
              label:   options.cancelLabel ?? 'Cancel',
              variant: 'secondary',
              onPress: () => resolve(false),
            },
            {
              label:   options.confirmLabel ?? 'Confirm',
              variant: options.destructive ? 'destructive' : 'primary',
              onPress: () => resolve(true),
            },
          ],
        })
      }),
    [show],
  )

  const alert = useCallback(
    (title: string, message?: string, icon?: string): Promise<void> =>
      new Promise(resolve => {
        show({
          title,
          message,
          icon,
          actions: [{ label: 'OK', variant: 'primary', onPress: resolve }],
        })
      }),
    [show],
  )

  return { show, dismiss, confirm, alert }
}