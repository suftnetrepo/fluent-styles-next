import React from 'react';
import { ComponentTheme, ToastColors, TOAST_DARK, TOAST_LIGHT } from '../utiles/theme';
export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastProps = {
    message: string;
    description?: string;
    variant?: ToastVariant;
    /** Auto-dismiss after ms. Pass `0` to disable. Default: 3500. */
    duration?: number;
    /** Called after the exit animation completes — used by the hook to unmount. */
    onDismiss?: () => void;
    /**
     * Color scheme. `'dark'` (default) | `'light'` | `'system'`.
     */
    theme?: ComponentTheme;
    /**
     * Fine-grained token overrides on top of the active theme.
     * @example
     * ```tsx
     * toast.show({ variant: 'success', theme: 'light', colors: { successBorder: '#059669' } })
     * ```
     */
    colors?: Partial<ToastColors>;
};
export declare const Toast: React.FC<ToastProps>;
export { TOAST_DARK, TOAST_LIGHT };
export type { ToastColors };
//# sourceMappingURL=index.d.ts.map