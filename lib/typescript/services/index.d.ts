/**
 * Imperative portal services — usable from outside the React tree.
 * Prerequisite: wrap your app root with `<GlobalPortalProvider>`.
 */
import React from 'react';
import { ToastProps } from '../toast';
import { NotificationProps } from '../notification';
import { LoaderProps } from '../loading/loader';
import { DialogueAction, DialogueProps } from '../dialog/dialogue';
import { ActionSheetProps } from '../actionSheet';
export type ToastOptions = Omit<ToastProps, 'onDismiss'>;
export declare const toastService: {
    show: (options: ToastOptions) => number;
    success: (message: string, description?: string) => number;
    error: (message: string, description?: string) => number;
    warning: (message: string, description?: string) => number;
    info: (message: string, description?: string) => number;
    dismiss: (id: number) => void;
};
export type NotificationOptions = Omit<NotificationProps, 'onDismiss'>;
export declare const notificationService: {
    show: (options: NotificationOptions) => number;
    dismiss: (id: number) => void;
};
export type LoaderOptions = LoaderProps;
export declare const loaderService: {
    show: (options?: LoaderOptions) => number;
    hide: (id: number) => void;
    wrap: <T>(fn: () => Promise<T>, options?: LoaderOptions) => Promise<T>;
};
export type DialogueOptions = Omit<DialogueProps, 'onDismiss'> & {
    actions?: DialogueAction[];
};
export type ConfirmOptions = {
    title: string;
    message?: string;
    icon?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    destructive?: boolean;
    theme?: DialogueProps['theme'];
    colors?: DialogueProps['colors'];
};
export declare const dialogueService: {
    show: (options: DialogueOptions) => number;
    dismiss: (id: number) => void;
    confirm: (options: ConfirmOptions) => Promise<boolean>;
    alert: (title: string, message?: string, icon?: string) => Promise<void>;
};
export type ActionSheetOptions = Omit<ActionSheetProps, 'onDismiss'>;
export declare const actionSheetService: {
    show: (options: ActionSheetOptions) => number;
    present: (children: React.ReactNode, options?: Omit<ActionSheetOptions, 'children'>) => number;
    dismiss: (id: number) => void;
};
//# sourceMappingURL=index.d.ts.map