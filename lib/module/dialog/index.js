"use strict";

import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import { Stack } from "../stack/index.js";
import { StyledButton } from "../button/index.js";
import { StyledText } from "../text/index.js";
import { StyledSpacer } from "../spacer/index.js";
import { styled } from "../utiles/styled.js";
import { theme } from "../utiles/theme.js";
import { Delete, Save, Success, Error, Warning, Info } from "../icons/index.js";

/**
 * Dialog component - Modal dialog system with three variants
 *
 * Provides type-safe modal dialog components:
 * - StyledDialog: Basic modal wrapper
 * - StyledConfirmDialog: Confirm/Cancel dialog with optional neutral button
 * - StyledOkDialog: Simple OK acknowledgement dialog
 */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Base Dialog component - Styled Modal wrapper
 */
const DialogBase = styled(Modal, {
  base: {
    backgroundColor: theme.colors.gray[100]
  }
});

// ============================================================================
// StyledDialog - Basic Modal Wrapper
// ============================================================================

/**
 * Basic dialog component - Wrapper around Modal with consistent styling
 */
const StyledDialog = ({
  children,
  animationType = "fade",
  transparent = true,
  visible = false,
  ...rest
}) => {
  return /*#__PURE__*/_jsx(DialogBase, {
    visible: visible,
    transparent: transparent,
    animationType: animationType,
    ...rest,
    children: children
  });
};

// ============================================================================
// StyledConfirmDialog - Confirm/Cancel with Optional Neutral
// ============================================================================

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
  dialogProps
}) => {
  const getIcon = () => {
    switch (variant) {
      case "delete":
        return /*#__PURE__*/_jsx(Delete, {
          size: 48,
          color: theme.colors.gray[500]
        });
      case "save":
        return /*#__PURE__*/_jsx(Save, {
          size: 48,
          color: theme.colors.orange[500]
        });
      case "error":
        return /*#__PURE__*/_jsx(Error, {
          size: 48,
          color: theme.colors.red[500]
        });
      case "success":
        return /*#__PURE__*/_jsx(Success, {
          size: 48,
          color: theme.colors.green[500]
        });
      default:
        return null;
    }
  };
  return /*#__PURE__*/_jsx(Stack, {
    vertical: true,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...dialogProps,
    children: /*#__PURE__*/_jsxs(Stack, {
      width: "90%",
      vertical: true,
      borderRadius: 8,
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderWidth: 0.5,
      justifyContent: "center",
      alignItems: "center",
      borderColor: theme.colors.gray[200],
      backgroundColor: theme.colors.gray[1],
      children: [/*#__PURE__*/_jsxs(Stack, {
        horizontal: true,
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
        paddingHorizontal: 8,
        children: [/*#__PURE__*/_jsx(StyledSpacer, {
          marginVertical: 32
        }), getIcon()]
      }), /*#__PURE__*/_jsx(StyledText, {
        color: theme.colors.gray[700],
        fontSize: theme.fontSize.medium,
        fontWeight: "normal",
        children: description
      }), /*#__PURE__*/_jsx(StyledSpacer, {
        marginVertical: 8
      }), /*#__PURE__*/_jsxs(Stack, {
        horizontal: true,
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 8,
        children: [/*#__PURE__*/_jsx(StyledButton, {
          backgroundColor: theme.colors.rose[400],
          borderColor: theme.colors.rose[400],
          borderRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 8,
          onPress: onCancel,
          children: /*#__PURE__*/_jsx(StyledText, {
            color: theme.colors.gray[50],
            fontSize: 14,
            fontWeight: "normal",
            children: cancelLabel
          })
        }), showNeutral && onNeutral && /*#__PURE__*/_jsx(StyledButton, {
          backgroundColor: theme.colors.orange[400],
          borderColor: theme.colors.orange[400],
          borderRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 8,
          onPress: onNeutral,
          children: /*#__PURE__*/_jsx(StyledText, {
            color: theme.colors.gray[50],
            fontSize: 14,
            fontWeight: "normal",
            children: neutralLabel
          })
        }), /*#__PURE__*/_jsx(StyledButton, {
          backgroundColor: theme.colors.green[500],
          borderColor: theme.colors.green[500],
          borderRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 8,
          onPress: onConfirm,
          children: /*#__PURE__*/_jsx(StyledText, {
            color: theme.colors.gray[50],
            fontSize: 14,
            fontWeight: "normal",
            children: confirmLabel
          })
        })]
      })]
    })
  });
};
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
}) => {
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
  return /*#__PURE__*/_jsx(DialogBase, {
    visible: show,
    transparent: true,
    animationType: animationType,
    ...rest,
    children: /*#__PURE__*/_jsx(ConfirmDialogContent, {
      title: title,
      description: description,
      cancelLabel: cancelLabel,
      confirmLabel: confirmLabel,
      neutralLabel: neutralLabel,
      showNeutral: showNeutral,
      onCancel: handleCancel,
      onConfirm: handleConfirm,
      onNeutral: handleNeutral,
      dialogProps: dialogProps,
      variant: variant
    })
  });
};

// ============================================================================
// StyledOkDialog - Simple OK Acknowledgement
// ============================================================================

/**
 * OK dialog content component - Extracted for reusability
 */
const OkDialogContent = ({
  variant = "warning",
  description,
  okLabel = "Ok",
  onOk,
  dialogProps
}) => {
  const variantConfig = {
    delete: {
      icon: Delete,
      iconColor: theme.colors.gray[500],
      buttonColor: theme.colors.rose[500]
    },
    save: {
      icon: Save,
      iconColor: theme.colors.orange[500],
      buttonColor: theme.colors.orange[500]
    },
    error: {
      icon: Error,
      iconColor: theme.colors.red[500],
      buttonColor: theme.colors.red[500]
    },
    success: {
      icon: Success,
      iconColor: theme.colors.green[500],
      buttonColor: theme.colors.green[500]
    },
    info: {
      icon: Info,
      iconColor: theme.colors.blue[500],
      buttonColor: theme.colors.blue[500]
    },
    warning: {
      icon: Warning,
      iconColor: theme.colors.yellow[500],
      buttonColor: theme.colors.yellow[500]
    }
  };
  const config = variantConfig[variant];
  return /*#__PURE__*/_jsx(Stack, {
    vertical: true,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...dialogProps,
    children: /*#__PURE__*/_jsxs(Stack, {
      vertical: true,
      width: "90%",
      borderRadius: 8,
      paddingVertical: 16,
      paddingHorizontal: 16,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.gray[100],
      backgroundColor: theme.colors.gray[1],
      children: [/*#__PURE__*/_jsx(StyledSpacer, {
        marginVertical: 16
      }), config?.icon && /*#__PURE__*/_jsx(config.icon, {
        size: 48,
        color: config.iconColor
      }), /*#__PURE__*/_jsx(StyledSpacer, {
        marginVertical: 16
      }), /*#__PURE__*/_jsx(StyledText, {
        color: theme.colors.gray[700],
        fontSize: theme.fontSize.medium,
        fontWeight: theme.fontWeight.normal,
        textAlign: "center",
        children: description
      }), /*#__PURE__*/_jsx(StyledSpacer, {
        marginVertical: 8
      }), /*#__PURE__*/_jsx(Stack, {
        horizontal: true,
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 8,
        alignSelf: "flex-start",
        children: /*#__PURE__*/_jsx(StyledButton, {
          alignSelf: "flex-start",
          backgroundColor: config?.buttonColor || theme.colors.gray[200],
          borderColor: config?.buttonColor || theme.colors.gray[500],
          borderWidth: 1,
          borderRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 8,
          onPress: onOk,
          children: /*#__PURE__*/_jsx(StyledText, {
            color: theme.colors.gray[100],
            fontSize: theme.fontSize.medium,
            fontWeight: theme.fontWeight.normal,
            textAlign: "center",
            children: okLabel
          })
        })
      })]
    })
  });
};
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
}) => {
  const [show, setShow] = useState(visible);
  useEffect(() => {
    setShow(visible);
  }, [visible]);
  const handleOk = () => {
    setShow(false);
    onOk?.();
  };
  return /*#__PURE__*/_jsx(DialogBase, {
    visible: show,
    transparent: true,
    animationType: animationType,
    ...rest,
    children: /*#__PURE__*/_jsx(OkDialogContent, {
      variant: variant,
      title: title,
      description: description,
      okLabel: okLabel,
      onOk: handleOk,
      dialogProps: dialogProps
    })
  });
};
export { StyledDialog, StyledConfirmDialog, StyledOkDialog, ConfirmDialogContent, OkDialogContent, DialogBase };
//# sourceMappingURL=index.js.map