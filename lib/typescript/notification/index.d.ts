import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { ComponentTheme, NotificationColors, NOTIFICATION_DARK, NOTIFICATION_LIGHT } from '../utiles/theme';
export type NotificationProps = {
    title: string;
    body: string;
    avatar?: ImageSourcePropType;
    initials?: string;
    source?: string;
    timestamp?: string;
    actionLabel?: string;
    onAction?: () => void;
    onDismiss?: () => void;
    duration?: number;
    theme?: ComponentTheme;
    colors?: Partial<NotificationColors>;
};
export declare const Notification: React.FC<NotificationProps>;
export { NOTIFICATION_DARK, NOTIFICATION_LIGHT };
export type { NotificationColors };
//# sourceMappingURL=index.d.ts.map