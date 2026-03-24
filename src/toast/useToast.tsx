import { useCallback, useRef } from 'react'
import React from 'react'
import { usePortal } from '../portal/PortalContext'
import { Toast, ToastProps, ToastVariant } from './'

// ─── Types ────────────────────────────────────────────────────────────────────

type ShowOptions = Omit<ToastProps, 'onDismiss'>

type ToastAPI = {
  show:    (options: ShowOptions) => number
  success: (message: string, description?: string) => number
  error:   (message: string, description?: string) => number
  warning: (message: string, description?: string) => number
  info:    (message: string, description?: string) => number
  dismiss: (id: number) => void
  dismissAll: () => void
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Declarative toast hook — requires a `PortalManager` ancestor.
 *
 * @example
 * ```tsx
 * const toast = useToast()
 *
 * // Convenience shortcuts
 * toast.success('Profile saved')
 * toast.error('Upload failed', 'Max file size is 5 MB')
 *
 * // Full control
 * const id = toast.show({ message: 'Processing…', duration: 0, variant: 'info' })
 * // Later:
 * toast.dismiss(id)
 * ```
 */
export function useToast(): ToastAPI {
  const { mount, unmount } = usePortal()
  // Track all active ids so dismissAll() works
  const activeIds = useRef<Set<number>>(new Set())

  const show = useCallback(
    (options: ShowOptions): number => {
      let id: number

      const handleDismiss = () => {
        unmount(id)
        activeIds.current.delete(id)
      }

      id = mount(
        <Toast {...options} onDismiss={handleDismiss} />,
        { position: 'top', offset: { x: 0, y: 56 } },
      )

      activeIds.current.add(id)
      return id
    },
    [mount, unmount],
  )

  const shortcut = useCallback(
    (variant: ToastVariant) =>
      (message: string, description?: string): number =>
        show({ message, description, variant }),
    [show],
  )

  const dismiss = useCallback(
    (id: number) => {
      unmount(id)
      activeIds.current.delete(id)
    },
    [unmount],
  )

  const dismissAll = useCallback(() => {
    activeIds.current.forEach(id => unmount(id))
    activeIds.current.clear()
  }, [unmount])

  return {
    show,
    success: shortcut('success'),
    error:   shortcut('error'),
    warning: shortcut('warning'),
    info:    shortcut('info'),
    dismiss,
    dismissAll,
  }
}
