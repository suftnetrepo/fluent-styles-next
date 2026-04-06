import React from 'react';
export type ActionSheetTheme = 'dark' | 'light' | 'system';
/**
 * Every colour used by the sheet, overridable via the `colors` prop.
 * Pass a partial object — only the keys you want to change.
 */
export type ActionSheetColors = {
    /** Main sheet background. */
    background: string;
    /** Thin gap/gutter between the sheet body and the cancel row. */
    gutter: string;
    /** Top border + row separators. */
    border: string;
    /** Drag handle pill. */
    handle: string;
    /** Header title text. */
    title: string;
    /** Header subtitle / message text. */
    message: string;
    /** Default item label. */
    itemLabel: string;
    /** Default item description. */
    itemDescription: string;
    /** Destructive item label. */
    destructiveLabel: string;
    /** Destructive item description. */
    destructiveDescription: string;
    /** Icon badge background (default items). */
    iconBackground: string;
    /** Chevron arrow on default items. */
    chevron: string;
    /** Separator lines between rows. */
    separator: string;
    /** Cancel row label. */
    cancelLabel: string;
};
declare const DARK_COLORS: ActionSheetColors;
declare const LIGHT_COLORS: ActionSheetColors;
export type ActionSheetItemVariant = 'default' | 'destructive' | 'disabled';
export type ActionSheetItem = {
    label: string;
    description?: string;
    icon?: string;
    variant?: ActionSheetItemVariant;
    onPress?: () => void;
};
export type ActionSheetProps = {
    title?: string;
    message?: string;
    items?: ActionSheetItem[];
    children?: React.ReactNode;
    showCancel?: boolean;
    cancelLabel?: string;
    onCancel?: () => void;
    onDismiss?: () => void;
    maxHeight?: number;
    /**
     * Color scheme for the sheet.
     * - `'dark'`   — always dark (default)
     * - `'light'`  — always light
     * - `'system'` — follows the device's appearance setting
     */
    theme?: ActionSheetTheme;
    /**
     * Fine-grained token overrides applied on top of whichever `theme` is active.
     * Pass only the keys you want to change — everything else comes from the theme.
     *
     * @example
     * ```tsx
     * actionSheet.show({
     *   title: 'Options',
     *   theme: 'light',
     *   colors: { background: '#fafafa', cancelLabel: '#6366f1' },
     *   items: [...],
     * })
     * ```
     */
    colors?: Partial<ActionSheetColors>;
};
export declare const ActionSheet: React.FC<ActionSheetProps>;
export { DARK_COLORS, LIGHT_COLORS };
//# sourceMappingURL=actionSheet.d.ts.map