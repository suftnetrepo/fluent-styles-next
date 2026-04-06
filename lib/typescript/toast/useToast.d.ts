import { ToastProps } from './';
type ShowOptions = Omit<ToastProps, 'onDismiss'>;
type ToastAPI = {
    show: (options: ShowOptions) => number;
    success: (message: string, description?: string) => number;
    error: (message: string, description?: string) => number;
    warning: (message: string, description?: string) => number;
    info: (message: string, description?: string) => number;
    dismiss: (id: number) => void;
    dismissAll: () => void;
};
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
export declare function useToast(): ToastAPI;
export {};
//# sourceMappingURL=useToast.d.ts.map