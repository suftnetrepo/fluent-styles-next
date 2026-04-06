import { NotificationProps } from './';
type ShowOptions = Omit<NotificationProps, 'onDismiss'>;
type NotificationAPI = {
    show: (options: ShowOptions) => number;
    dismiss: (id: number) => void;
};
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
export declare function useNotification(): NotificationAPI;
export {};
//# sourceMappingURL=useNotification.d.ts.map