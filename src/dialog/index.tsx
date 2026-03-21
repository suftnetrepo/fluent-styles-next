import React, { useEffect, useState } from "react";
import { Modal, ModalProps, ViewProps, ViewStyle } from "react-native";
import { Stack } from "../stack";
import { StyledButton } from "../button";
import { StyledText } from "../text";
import { StyledSpacer } from "../spacer";
import { styled } from "../utiles/styled";
import { theme } from "../utiles/theme";
import { Delete, Save, Success, Error, Warning, Info } from "../icons";

/**
 * Dialog component - Modal dialog system with three variants
 *
 * Provides type-safe modal dialog components:
 * - StyledDialog: Basic modal wrapper
 * - StyledConfirmDialog: Confirm/Cancel dialog with optional neutral button
 * - StyledOkDialog: Simple OK acknowledgement dialog
 */

type DialogAnimationType = "slide" | "fade" | "none";
type DialogVariant =
  | "delete"
  | "save"
  | "error"
  | "success"
  | "default"
  | "warning"
  | "info";

/**
 * Base Dialog component - Styled Modal wrapper
 */
const DialogBase = styled<ModalProps>(Modal, {
  base: {
    backgroundColor: theme.colors.gray[100],
  } as any,
});

// ============================================================================
// StyledDialog - Basic Modal Wrapper
// ============================================================================

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
const StyledDialog = ({
  children,
  animationType = "fade",
  transparent = true,
  visible = false,
  ...rest
}: StyledDialogProps) => {
  return (
    <DialogBase
      visible={visible}
      transparent={transparent}
      animationType={animationType as DialogAnimationType}
      {...rest}
    >
      {children}
    </DialogBase>
  );
};

// ============================================================================
// StyledConfirmDialog - Confirm/Cancel with Optional Neutral
// ============================================================================

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
const ConfirmDialogContent = ({
  title,
  variant,
  description,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  neutralLabel = "Neutral",
  showNeutral = false,
  onCancel,
  onConfirm,
  onNeutral,
  dialogProps,
}: ConfirmDialogContentProps) => {
  const getIcon = () => {
    switch (variant) {
      case "delete":
        return <Delete size={48} color={theme.colors.gray[500]} />;
      case "save":
        return <Save size={48} color={theme.colors.orange[500]} />;
      case "error":
        return <Error size={48} color={theme.colors.red[500]} />;
      case "success":
        return <Success size={48} color={theme.colors.green[500]} />;
      default:
        return null;
    }
  };

  return (
    <Stack
      vertical
      flex={1}
      justifyContent="center"
      alignItems="center"
      {...dialogProps}
    >
      <Stack
        width="90%"
        vertical
        borderRadius={8}
        paddingVertical={16}
        paddingHorizontal={16}
        borderWidth={0.5}
        justifyContent="center"
        alignItems="center"
        borderColor={theme.colors.gray[200]}
        backgroundColor={theme.colors.gray[1]}
      >
        <Stack
          horizontal
          alignItems="center"
          justifyContent="flex-start"
          gap={8}
          paddingHorizontal={8}
        >
          <StyledSpacer marginVertical={32} />
          {getIcon()}
        </Stack>

        {/* Description */}
        <StyledText
          color={theme.colors.gray[700]}
          fontSize={theme.fontSize.medium}
          fontWeight="normal"
        >
          {description}
        </StyledText>
        <StyledSpacer marginVertical={8} />
        {/* Action Buttons */}
        <Stack horizontal justifyContent="flex-end" alignItems="center" gap={8}>
          {/* Cancel Button */}
          <StyledButton
            backgroundColor={theme.colors.rose[400]}
            borderColor={theme.colors.rose[400]}
            borderRadius={24}
            paddingHorizontal={16}
            paddingVertical={8}
            onPress={onCancel}
          >
            <StyledText
              color={theme.colors.gray[50]}
              fontSize={14}
              fontWeight="normal"
            >
              {cancelLabel}
            </StyledText>
          </StyledButton>

          {/* Neutral Button (Optional) */}
          {showNeutral && onNeutral && (
            <StyledButton
              backgroundColor={theme.colors.orange[400]}
              borderColor={theme.colors.orange[400]}
              borderRadius={24}
              paddingHorizontal={16}
              paddingVertical={8}
              onPress={onNeutral}
            >
              <StyledText
                color={theme.colors.gray[50]}
                fontSize={14}
                fontWeight="normal"
              >
                {neutralLabel}
              </StyledText>
            </StyledButton>
          )}

          {/* Confirm Button */}
          <StyledButton
            backgroundColor={theme.colors.green[500]}
            borderColor={theme.colors.green[500]}
            borderRadius={24}
            paddingHorizontal={16}
            paddingVertical={8}
            onPress={onConfirm}
          >
            <StyledText
              color={theme.colors.gray[50]}
              fontSize={14}
              fontWeight="normal"
            >
              {confirmLabel}
            </StyledText>
          </StyledButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

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
const StyledConfirmDialog = ({
  visible = false,
  title,
  variant = "save",
  description,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  neutralLabel = "Neutral",
  showNeutral = false,
  row,
  animationType = "fade",
  onCancel,
  onConfirm,
  onNeutral,
  dialogProps,
  ...rest
}: StyledConfirmDialogProps) => {
  const [show, setShow] = useState(visible);

  const handleConfirm = () => {
    setShow(false);
    if (onConfirm) {
      if (row) {
        onConfirm(row);
      } else {
        onConfirm();
      }
    }
  };

  const handleCancel = () => {
    setShow(false);
    onCancel?.();
  };

  const handleNeutral = () => {
    setShow(false);
    onNeutral?.();
  };

  return (
    <DialogBase
      visible={show}
      transparent={true}
      animationType={animationType as DialogAnimationType}
      {...rest}
    >
      <ConfirmDialogContent
        title={title}
        description={description}
        cancelLabel={cancelLabel}
        confirmLabel={confirmLabel}
        neutralLabel={neutralLabel}
        showNeutral={showNeutral}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        onNeutral={handleNeutral}
        dialogProps={dialogProps}
        variant={variant}
      />
    </DialogBase>
  );
};

// ============================================================================
// StyledOkDialog - Simple OK Acknowledgement
// ============================================================================

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
const OkDialogContent = ({
  variant = "warning",
  description,
  okLabel = "Ok",
  onOk,
  dialogProps,
}: OkDialogContentProps) => {
  const variantConfig = {
    delete: {
      icon: Delete,
      iconColor: theme.colors.gray[500],
      buttonColor: theme.colors.rose[500],
    },
    save: {
      icon: Save,
      iconColor: theme.colors.orange[500],
      buttonColor: theme.colors.orange[500],
    },
    error: {
      icon: Error,
      iconColor: theme.colors.red[500],
      buttonColor: theme.colors.red[500],
    },
    success: {
      icon: Success,
      iconColor: theme.colors.green[500],
      buttonColor: theme.colors.green[500],
    },
    info: {
      icon: Info,
      iconColor: theme.colors.blue[500],
      buttonColor: theme.colors.blue[500],
    },
    warning: {
      icon: Warning,
      iconColor: theme.colors.yellow[500],
      buttonColor: theme.colors.yellow[500],
    },
  } as const;

  const config = variantConfig[variant];
  return (
    <Stack
      vertical
      flex={1}
      justifyContent="center"
      alignItems="center"
      {...dialogProps}
    >
      <Stack
        vertical
        width="90%"
        borderRadius={8}
        paddingVertical={16}
        paddingHorizontal={16}
        justifyContent="center"
        alignItems="center"
        borderWidth={1}
        borderColor={theme.colors.gray[100]}
        backgroundColor={theme.colors.gray[1]}
      >
        <StyledSpacer marginVertical={16} />
        {config?.icon && <config.icon size={48} color={config.iconColor} />}
        <StyledSpacer marginVertical={16} />
        <StyledText
          color={theme.colors.gray[700]}
          fontSize={theme.fontSize.medium}
          fontWeight={theme.fontWeight.normal}
          textAlign="center"
        >
          {description}
        </StyledText>

        <StyledSpacer marginVertical={8} />
        <Stack
          horizontal
          justifyContent="flex-end"
          alignItems="center"
          gap={8}
          alignSelf="flex-start"
        >
          <StyledButton
            alignSelf="flex-start"
            backgroundColor={config?.buttonColor || theme.colors.gray[200]}
            borderColor={config?.buttonColor || theme.colors.gray[500]}
            borderWidth={1}
            borderRadius={24}
            paddingHorizontal={16}
            paddingVertical={8}
            onPress={onOk}
          >
            <StyledText
              color={theme.colors.gray[100]}
              fontSize={theme.fontSize.medium}
              fontWeight={theme.fontWeight.normal}
              textAlign="center"
            >
              {okLabel}
            </StyledText>
          </StyledButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

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
const StyledOkDialog = ({
  visible = false,
  variant = "error",
  title = "We're sorry, something went wrong.",
  description = "We're sorry, something went wrong. \n Please try again later",
  okLabel = "Ok",
  onOk,
  animationType = "fade",
  dialogProps,
  ...rest
}: StyledOkDialogProps) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  const handleOk = () => {
    setShow(false);
    onOk?.();
  };

  return (
    <DialogBase
      visible={show}
      transparent={true}
      animationType={animationType as DialogAnimationType}
      {...rest}
    >
      <OkDialogContent
        variant={variant}
        title={title}
        description={description}
        okLabel={okLabel}
        onOk={handleOk}
        dialogProps={dialogProps}
      />
    </DialogBase>
  );
};

export {
  StyledDialog,
  StyledConfirmDialog,
  StyledOkDialog,
  ConfirmDialogContent,
  OkDialogContent,
  DialogBase,
};

export type {
  StyledDialogProps,
  StyledConfirmDialogProps,
  StyledOkDialogProps,
  ConfirmDialogContentProps,
  OkDialogContentProps,
};
