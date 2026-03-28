import { useCallback } from 'react'
import React from 'react'
import { usePortal } from '../portal/PortalContext'
import { Dialogue, DialogueAction, DialogueProps } from './dialogue'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ShowDialogueOptions = Omit<DialogueProps, 'onDismiss'> & {
  actions?: DialogueAction[]
}

export type ConfirmOptions = {
  title: string
  message?: string
  icon?: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  theme?: "light" | "dark"
}

export type DialogueAPI = {
  show: (options: ShowDialogueOptions) => number
  dismiss: (id: number) => void
  confirm: (options: ConfirmOptions) => Promise<boolean>
  alert: (title: string, message?: string, icon?: string, theme?: "light" | "dark") => Promise<void>
}



// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useDialogue(): DialogueAPI {
  const { mount, unmount } = usePortal()

  const show = useCallback(
    (options: ShowDialogueOptions): number => {
      const idBox = { current: -1 }

      const handleDismiss = () => {
        unmount(idBox.current)
      }

      const handleBackdrop = () => {
        unmount(idBox.current)
      }

      idBox.current = mount(
        <Dialogue
          {...options}
          actions={options.actions ?? [{ label: 'OK', onPress: () => { } }]}
          onDismiss={handleDismiss}
        />,
        {
          position: 'center',
          backdrop: false,
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
        let settled = false
        const idBox = { current: -1 }

        const finish = (value: boolean) => {
          if (settled) return
          settled = true
          resolve(value)

          requestAnimationFrame(() => {
            unmount(idBox.current)
          })
        }

        idBox.current = mount(
          <Dialogue
            title={options.title}
            message={options.message}
            icon={options.icon}
            theme={options.theme ?? "light"}
            onDismiss={() => finish(false)}
            actions={[
              {
                label: options.cancelLabel ?? 'Cancel',
                variant: 'secondary',
                onPress: () => finish(false),
              },
              {
                label: options.confirmLabel ?? 'Confirm',
                variant: options.destructive ? 'destructive' : 'primary',
                onPress: () => finish(true),
              },
            ]}
          />,
          {
            position: 'center',
            backdrop: false,
            onBackdropPress: () => finish(false),
          },
        )
      }),
    [mount, unmount],
  )

  const alert = useCallback(
    (title: string, message?: string, icon?: string, theme?: "light" | "dark"): Promise<void> =>
      new Promise(resolve => {
        let settled = false
        const idBox = { current: -1 }

        const finish = () => {
          if (settled) return
          settled = true
          resolve()

          requestAnimationFrame(() => {
            unmount(idBox.current)
          })
        }
        idBox.current = mount(
          <Dialogue
            title={title}
            message={message}
            icon={icon}
            theme={theme ?? "light"}
            onDismiss={finish}
            actions={[
              {
                label: 'OK',
                variant: 'primary',
                onPress: finish,
              },
            ]}
          />,
          {
            position: 'center',
            backdrop: false,
            onBackdropPress: finish,
          },
        )
      }),
    [show, unmount],
  )

  return { show, dismiss, confirm, alert }
}