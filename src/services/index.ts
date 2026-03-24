/**
 * Imperative portal services.
 *
 * These wrap the global `portal` singleton and can be called from anywhere —
 * Redux thunks, async service layers, navigation callbacks, etc. —
 * without needing a React component or hook.
 *
 * Prerequisites: your app root must be wrapped with `<GlobalPortalProvider>`.
 */

import React from 'react'
import { portal } from '../portal/PortalInstance'
import { Toast, ToastVariant } from '../toast'
import { Notification, NotificationProps } from '../notification'
import { Loader, LoaderProps } from '../loading/loader'
import { Dialogue, DialogueAction } from '../dialog/dialogue'

// ─── Toast ────────────────────────────────────────────────────────────────────

type ToastOptions = {
  message: string
  description?: string
  variant?: ToastVariant
  /** Auto-dismiss ms. 0 = sticky. Default: 3500 */
  duration?: number
}

function _showToast(options: ToastOptions): number {
  let id: number

  id = portal.show(
    React.createElement(Toast, {
      ...options,
      onDismiss: () => portal.hide(id),
    }),
    { position: 'top', offset: { x: 0, y: 56 } },
  )

  return id
}

export const toastService = {
  show:    (options: ToastOptions) => _showToast(options),
  success: (message: string, description?: string) =>
    _showToast({ message, description, variant: 'success' }),
  error:   (message: string, description?: string) =>
    _showToast({ message, description, variant: 'error' }),
  warning: (message: string, description?: string) =>
    _showToast({ message, description, variant: 'warning' }),
  info:    (message: string, description?: string) =>
    _showToast({ message, description, variant: 'info' }),
  dismiss: (id: number) => portal.hide(id),
}

// ─── Notification ─────────────────────────────────────────────────────────────

type NotificationOptions = Omit<NotificationProps, 'onDismiss'>

export const notificationService = {
  show: (options: NotificationOptions): number => {
    let id: number

    id = portal.show(
      React.createElement(Notification, {
        ...options,
        onDismiss: () => portal.hide(id),
      }),
      { position: 'top-right', offset: { x: 16, y: 56 } },
    )

    return id
  },
  dismiss: (id: number) => portal.hide(id),
}

// ─── Loader ───────────────────────────────────────────────────────────────────

export const loaderService = {
  show: (options: LoaderProps = {}): number =>
    portal.show(
      React.createElement(Loader, { ...options, overlay: options.overlay ?? true }),
      { position: 'center' },
    ),

  hide: (id: number) => portal.hide(id),

  /**
   * Wraps an async function: shows the loader before, hides after.
   *
   * @example
   * ```ts
   * const user = await loaderService.wrap(
   *   () => api.getUser(userId),
   *   { label: 'Loading profile…', variant: 'dots' }
   * )
   * ```
   */
  wrap: async <T>(fn: () => Promise<T>, options: LoaderProps = {}): Promise<T> => {
    const id = loaderService.show(options)
    try {
      return await fn()
    } finally {
      loaderService.hide(id)
    }
  },
}

// ─── Dialogue ─────────────────────────────────────────────────────────────────

type DialogueOptions = {
  title: string
  message?: string
  icon?: string
  actions?: DialogueAction[]
}

type ConfirmOptions = {
  title: string
  message?: string
  icon?: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
}

function _showDialogue(options: DialogueOptions): number {
  let id: number

  id = portal.show(
    React.createElement(Dialogue, {
      ...options,
      actions: options.actions ?? [{ label: 'OK', onPress: () => {} }],
      onDismiss: () => portal.hide(id),
    }),
    {
      position: 'center',
      backdrop: true,
      onBackdropPress: () => portal.hide(id),
    },
  )

  return id
}

export const dialogueService = {
  show: (options: DialogueOptions) => _showDialogue(options),

  dismiss: (id: number) => portal.hide(id),

  /**
   * Promise-based confirm dialogue. Resolves `true` = confirmed, `false` = cancelled.
   *
   * @example
   * ```ts
   * const confirmed = await dialogueService.confirm({
   *   title: 'Delete this file?',
   *   icon: '🗑️',
   *   destructive: true,
   * })
   * if (confirmed) deleteFile()
   * ```
   */
  confirm: (options: ConfirmOptions): Promise<boolean> =>
    new Promise(resolve => {
      _showDialogue({
        title:   options.title,
        message: options.message,
        icon:    options.icon,
        actions: [
          {
            label:   options.cancelLabel  ?? 'Cancel',
            variant: 'secondary',
            onPress: () => resolve(false),
          },
          {
            label:   options.confirmLabel ?? 'Confirm',
            variant: options.destructive  ? 'destructive' : 'primary',
            onPress: () => resolve(true),
          },
        ],
      })
    }),

  /**
   * Fire-and-forget alert dialogue.
   *
   * @example
   * ```ts
   * await dialogueService.alert('Session expired', 'Please log in again.', '🔒')
   * redirectToLogin()
   * ```
   */
  alert: (title: string, message?: string, icon?: string): Promise<void> =>
    new Promise(resolve => {
      _showDialogue({
        title,
        message,
        icon,
        actions: [{ label: 'OK', variant: 'primary', onPress: resolve }],
      })
    }),
}
