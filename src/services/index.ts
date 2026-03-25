/**
 * Imperative portal services — usable from outside the React tree.
 * Prerequisite: wrap your app root with `<GlobalPortalProvider>`.
 */

import React from 'react'
import { portal }                           from '../portal/PortalInstance'
import { Toast, ToastVariant, ToastProps }  from '../toast'
import { Notification, NotificationProps }  from '../notification'
import { Loader, LoaderProps }              from '../loading/loader'
import { Dialogue, DialogueAction, DialogueProps } from '../dialog/dialogue'
import { ActionSheet, ActionSheetProps }    from '../actionSheet'

// ─── Shared helper ────────────────────────────────────────────────────────────

function mountWithAutoDismiss(
  createElement: (onDismiss: () => void) => React.ReactNode,
  options: Parameters<typeof portal.show>[1],
): number {
  const idBox = { current: -1 }
  idBox.current = portal.show(
    createElement(() => portal.hide(idBox.current)),
    options,
  )
  return idBox.current
}

// ─── Toast ────────────────────────────────────────────────────────────────────

export type ToastOptions = Omit<ToastProps, 'onDismiss'>

export const toastService = {
  show: (options: ToastOptions): number =>
    mountWithAutoDismiss(
      onDismiss => React.createElement(Toast, { ...options, onDismiss }),
      { position: 'top', offset: { x: 0, y: 56 } },
    ),
  success: (message: string, description?: string): number =>
    toastService.show({ message, description, variant: 'success' }),
  error: (message: string, description?: string): number =>
    toastService.show({ message, description, variant: 'error' }),
  warning: (message: string, description?: string): number =>
    toastService.show({ message, description, variant: 'warning' }),
  info: (message: string, description?: string): number =>
    toastService.show({ message, description, variant: 'info' }),
  dismiss: (id: number): void => portal.hide(id),
}

// ─── Notification ─────────────────────────────────────────────────────────────

export type NotificationOptions = Omit<NotificationProps, 'onDismiss'>

export const notificationService = {
  show: (options: NotificationOptions): number =>
    mountWithAutoDismiss(
      onDismiss => React.createElement(Notification, { ...options, onDismiss }),
      { position: 'top-right', offset: { x: 16, y: 56 } },
    ),
  dismiss: (id: number): void => portal.hide(id),
}

// ─── Loader ───────────────────────────────────────────────────────────────────

export type LoaderOptions = LoaderProps

export const loaderService = {
  show: (options: LoaderOptions = {}): number =>
    portal.show(
      React.createElement(Loader, { ...options, overlay: options.overlay ?? true }),
      { position: 'center' },
    ),
  hide: (id: number): void => portal.hide(id),
  wrap: async <T>(fn: () => Promise<T>, options: LoaderOptions = {}): Promise<T> => {
    const id = loaderService.show(options)
    try { return await fn() } finally { loaderService.hide(id) }
  },
}

// ─── Dialogue ─────────────────────────────────────────────────────────────────

export type DialogueOptions = Omit<DialogueProps, 'onDismiss'> & { actions?: DialogueAction[] }

export type ConfirmOptions = {
  title:         string
  message?:      string
  icon?:         string
  confirmLabel?: string
  cancelLabel?:  string
  destructive?:  boolean
  theme?:        DialogueProps['theme']
  colors?:       DialogueProps['colors']
}

function showDialogue(options: DialogueOptions): number {
  const idBox         = { current: -1 }
  const handleDismiss  = () => portal.hide(idBox.current)
  const handleBackdrop = () => portal.hide(idBox.current)
  idBox.current = portal.show(
    React.createElement(Dialogue, {
      ...options,
      actions:   options.actions ?? [{ label: 'OK', onPress: () => {} }],
      onDismiss: handleDismiss,
    }),
    { position: 'center', backdrop: true, onBackdropPress: handleBackdrop },
  )
  return idBox.current
}

export const dialogueService = {
  show:    (options: DialogueOptions): number => showDialogue(options),
  dismiss: (id: number): void => portal.hide(id),
  confirm: (options: ConfirmOptions): Promise<boolean> =>
    new Promise(resolve => {
      showDialogue({
        title: options.title, message: options.message, icon: options.icon,
        theme: options.theme, colors: options.colors,
        actions: [
          { label: options.cancelLabel  ?? 'Cancel',  variant: 'secondary',                                    onPress: () => resolve(false) },
          { label: options.confirmLabel ?? 'Confirm', variant: options.destructive ? 'destructive' : 'primary', onPress: () => resolve(true) },
        ],
      })
    }),
  alert: (title: string, message?: string, icon?: string): Promise<void> =>
    new Promise(resolve => {
      showDialogue({ title, message, icon, actions: [{ label: 'OK', variant: 'primary', onPress: resolve }] })
    }),
}

// ─── Action Sheet ─────────────────────────────────────────────────────────────

export type ActionSheetOptions = Omit<ActionSheetProps, 'onDismiss'>

function showActionSheet(options: ActionSheetOptions): number {
  const idBox         = { current: -1 }
  const handleDismiss  = () => portal.hide(idBox.current)
  const handleBackdrop = () => portal.hide(idBox.current)
  idBox.current = portal.show(
    React.createElement(ActionSheet, { ...options, onDismiss: handleDismiss }),
    { position: 'bottom', backdrop: true, onBackdropPress: handleBackdrop },
  )
  return idBox.current
}

export const actionSheetService = {
  show:    (options: ActionSheetOptions): number => showActionSheet(options),
  present: (children: React.ReactNode, options: Omit<ActionSheetOptions, 'children'> = {}): number =>
    showActionSheet({ ...options, children }),
  dismiss: (id: number): void => portal.hide(id),
}
