import React from "react";
import { ModalProps, ViewProps, ViewStyle } from "react-native";
/**
 * Dialog component - Modal dialog system with three variants
 *
 * Provides type-safe modal dialog components:
 * - StyledDialog: Basic modal wrapper
 * - StyledConfirmDialog: Confirm/Cancel dialog with optional neutral button
 * - StyledOkDialog: Simple OK acknowledgement dialog
 */
type DialogAnimationType = "slide" | "fade" | "none";
type DialogVariant = "delete" | "save" | "error" | "success" | "default" | "warning" | "info";
/**
 * Base Dialog component - Styled Modal wrapper
 */
declare const DialogBase: React.ForwardRefExoticComponent<import("react-native").ModalBaseProps & import("react-native").ModalPropsIOS & import("react-native").ModalPropsAndroid & ViewProps & React.RefAttributes<any>>;
interface StyledDialogProps extends ModalProps {
    /**
     * Whether dialog is visible
     */
    visible?: boolean;
    /**
     * Animation type for dialog appearance
     * @default 'fade'
     */
    animationType?: DialogAnimationType;
    /**
     * Whether modal shows over transparent background
     * @default true
     */
    transparent?: boolean;
    /**
     * Dialog content
     */
    children?: React.ReactNode;
}
/**
 * Basic dialog component - Wrapper around Modal with consistent styling
 */
declare const StyledDialog: ({ children, animationType, transparent, visible, ...rest }: StyledDialogProps) => React.JSX.Element;
interface ConfirmDialogContentProps {
    title: string;
    variant: DialogVariant;
    description: string;
    cancelLabel?: string;
    confirmLabel?: string;
    neutralLabel?: string;
    showNeutral?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    onNeutral?: () => void;
    dialogProps?: ViewProps & ViewStyle;
}
/**
 * Confirm dialog content component - Extracted for reusability
 */
declare const ConfirmDialogContent: ({ title, variant, description, cancelLabel, confirmLabel, neutralLabel, showNeutral, onCancel, onConfirm, onNeutral, dialogProps, }: ConfirmDialogContentProps) => React.JSX.Element;
interface StyledConfirmDialogProps extends Omit<ModalProps, "visible"> {
    /**
     * Whether dialog is visible
     */
    visible?: boolean;
    variant?: DialogVariant;
    /**
     * Dialog title
     */
    title: string;
    /**
     * Dialog description/body text
     */
    description: string;
    /**
     * Cancel button label
     * @default 'Cancel'
     */
    cancelLabel?: string;
    /**
     * Confirm button label
     * @default 'Confirm'
     */
    confirmLabel?: string;
    /**
     * Neutral button label
     * @default 'Neutral'
     */
    neutralLabel?: string;
    /**
     * Whether to show neutral button
     * @default false
     */
    showNeutral?: boolean;
    /**
     * Data to pass to confirm callback
     */
    row?: any;
    /**
     * Callback when user clicks cancel
     */
    onCancel?: () => void;
    /**
     * Callback when user clicks confirm
     */
    onConfirm?: (data?: any) => void;
    /**
     * Callback when user clicks neutral button
     */
    onNeutral?: () => void;
    /**
     * Animation type
     * @default 'fade'
     */
    animationType?: DialogAnimationType;
    /**
     * Additional dialog props
     */
    dialogProps?: ViewProps & ViewStyle;
}
/**
 * Confirm dialog component with optional neutral button
 */
declare const StyledConfirmDialog: ({ visible, title, variant, description, cancelLabel, confirmLabel, neutralLabel, showNeutral, row, animationType, onCancel, onConfirm, onNeutral, dialogProps, ...rest }: StyledConfirmDialogProps) => React.JSX.Element;
interface OkDialogContentProps {
    title: string;
    variant: DialogVariant;
    description: string;
    okLabel?: string;
    onOk: () => void;
    dialogProps?: ViewProps & ViewStyle;
}
/**
 * OK dialog content component - Extracted for reusability
 */
declare const OkDialogContent: ({ variant, description, okLabel, onOk, dialogProps, }: OkDialogContentProps) => React.JSX.Element;
interface StyledOkDialogProps extends Omit<ModalProps, "visible"> {
    /**
     * Whether dialog is visible
     */
    visible?: boolean;
    variant?: DialogVariant;
    /**
     * Dialog title
     * @default "We're sorry, something went wrong."
     */
    title?: string;
    /**
     * Dialog description/body text
     * @default 'Please try again later'
     */
    description?: string;
    /**
     * OK button label
     * @default 'Ok'
     */
    okLabel?: string;
    /**
     * Callback when user clicks OK
     */
    onOk?: () => void;
    /**
     * Animation type
     * @default 'fade'
     */
    animationType?: DialogAnimationType;
    /**
     * Additional dialog props
     */
    dialogProps?: ViewProps & ViewStyle;
}
/**
 * OK dialog component - Simple acknowledgement dialog with single button
 */
declare const StyledOkDialog: ({ visible, variant, title, description, okLabel, onOk, animationType, dialogProps, ...rest }: StyledOkDialogProps) => React.JSX.Element;
export { StyledDialog, StyledConfirmDialog, StyledOkDialog, ConfirmDialogContent, OkDialogContent, DialogBase, };
export type { StyledDialogProps, StyledConfirmDialogProps, StyledOkDialogProps, ConfirmDialogContentProps, OkDialogContentProps, };
//# sourceMappingURL=index.d.ts.map