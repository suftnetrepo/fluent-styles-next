import { useCallback } from 'react'
import React from 'react'
import { usePortal } from '../portal/PortalContext'
import { Notification, NotificationProps } from './'

// ─── Types ────────────────────────────────────────────────────────────────────

type ShowOptions = Omit<NotificationProps, 'onDismiss'>

type NotificationAPI = {
  show:    (options: ShowOptions) => number
  dismiss: (id: number) => void
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Declarative notification hook — requires a `PortalManager` ancestor.
 *
 * Notifications slide in from the right edge at the top of the screen and
 * auto-dismiss after `duration` ms (default 5000).
 *
 * @example
 * ```tsx
 * const notification = useNotification()
 *
 * notification.show({
 *   title: 'New message from Alex',
 *   body:  'Hey, are you free this afternoon?',
 *   source: 'Messages',
 *   initials: 'AK',
 *   timestamp: 'now',
 *   actionLabel: 'Reply',
 *   onAction: () => navigation.navigate('Chat'),
 * })
 * ```
 */
export function useNotification(): NotificationAPI {
  const { mount, unmount } = usePortal()

  const show = useCallback(
    (options: ShowOptions): number => {
      let id: number

      id = mount(
        <Notification
          {...options}
          onDismiss={() => unmount(id)}
        />,
        { position: 'top-right', offset: { x: 16, y: 56 } },
      )

      return id
    },
    [mount, unmount],
  )

  const dismiss = useCallback(
    (id: number) => unmount(id),
    [unmount],
  )

  return { show, dismiss }
}
