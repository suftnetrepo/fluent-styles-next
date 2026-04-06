"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledOkDialog = exports.StyledDialog = exports.StyledConfirmDialog = exports.OkDialogContent = exports.DialogBase = exports.ConfirmDialogContent = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _index = require("../stack/index.js");
var _index2 = require("../button/index.js");
var _index3 = require("../text/index.js");
var _index4 = require("../spacer/index.js");
var _styled = require("../utiles/styled.js");
var _theme = require("../utiles/theme.js");
var _index5 = require("../icons/index.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * Dialog component - Modal dialog system with three variants
 *
 * Provides type-safe modal dialog components:
 * - StyledDialog: Basic modal wrapper
 * - StyledConfirmDialog: Confirm/Cancel dialog with optional neutral button
 * - StyledOkDialog: Simple OK acknowledgement dialog
 */

/**
 * Base Dialog component - Styled Modal wrapper
 */
const DialogBase = exports.DialogBase = (0, _styled.styled)(_reactNative.Modal, {
  base: {
    backgroundColor: _theme.theme.colors.gray[100]
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DialogBase, {
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
exports.StyledDialog = StyledDialog;
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
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.Delete, {
          size: 48,
          color: _theme.theme.colors.gray[500]
        });
      case "save":
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.Save, {
          size: 48,
          color: _theme.theme.colors.orange[500]
        });
      case "error":
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.Error, {
          size: 48,
          color: _theme.theme.colors.red[500]
        });
      case "success":
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.Success, {
          size: 48,
          color: _theme.theme.colors.green[500]
        });
      default:
        return null;
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
    vertical: true,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...dialogProps,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
      width: "90%",
      vertical: true,
      borderRadius: 8,
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderWidth: 0.5,
      justifyContent: "center",
      alignItems: "center",
      borderColor: _theme.theme.colors.gray[200],
      backgroundColor: _theme.theme.colors.gray[1],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
        horizontal: true,
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
        paddingHorizontal: 8,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.StyledSpacer, {
          marginVertical: 32
        }), getIcon()]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.StyledText, {
        color: _theme.theme.colors.gray[700],
        fontSize: _theme.theme.fontSize.medium,
        fontWeight: "normal",
        children: description
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.StyledSpacer, {
        marginVertical: 8
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
        horizontal: true,
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 8,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledButton, {
          backgroundColor: _theme.theme.colors.rose[400],
          borderColor: _theme.theme.colors.rose[400],
          borderRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 8,
          onPress: onCancel,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.StyledText, {
            color: _theme.theme.colors.gray[50],
            fontSize: 14,
            fontWeight: "normal",
            children: cancelLabel
          })
        }), showNeutral && onNeutral && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledButton, {
          backgroundColor: _theme.theme.colors.orange[400],
          borderColor: _theme.theme.colors.orange[400],
          borderRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 8,
          onPress: onNeutral,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.StyledText, {
            color: _theme.theme.colors.gray[50],
            fontSize: 14,
            fontWeight: "normal",
            children: neutralLabel
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledButton, {
          backgroundColor: _theme.theme.colors.green[500],
          borderColor: _theme.theme.colors.green[500],
          borderRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 8,
          onPress: onConfirm,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.StyledText, {
            color: _theme.theme.colors.gray[50],
            fontSize: 14,
            fontWeight: "normal",
            children: confirmLabel
          })
        })]
      })]
    })
  });
};
exports.ConfirmDialogContent = ConfirmDialogContent;
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
  const [show, setShow] = (0, _react.useState)(visible);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DialogBase, {
    visible: show,
    transparent: true,
    animationType: animationType,
    ...rest,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ConfirmDialogContent, {
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
exports.StyledConfirmDialog = StyledConfirmDialog;
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
      icon: _index5.Delete,
      iconColor: _theme.theme.colors.gray[500],
      buttonColor: _theme.theme.colors.rose[500]
    },
    save: {
      icon: _index5.Save,
      iconColor: _theme.theme.colors.orange[500],
      buttonColor: _theme.theme.colors.orange[500]
    },
    error: {
      icon: _index5.Error,
      iconColor: _theme.theme.colors.red[500],
      buttonColor: _theme.theme.colors.red[500]
    },
    success: {
      icon: _index5.Success,
      iconColor: _theme.theme.colors.green[500],
      buttonColor: _theme.theme.colors.green[500]
    },
    info: {
      icon: _index5.Info,
      iconColor: _theme.theme.colors.blue[500],
      buttonColor: _theme.theme.colors.blue[500]
    },
    warning: {
      icon: _index5.Warning,
      iconColor: _theme.theme.colors.yellow[500],
      buttonColor: _theme.theme.colors.yellow[500]
    }
  };
  const config = variantConfig[variant];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
    vertical: true,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...dialogProps,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
      vertical: true,
      width: "90%",
      borderRadius: 8,
      paddingVertical: 16,
      paddingHorizontal: 16,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: _theme.theme.colors.gray[100],
      backgroundColor: _theme.theme.colors.gray[1],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.StyledSpacer, {
        marginVertical: 16
      }), config?.icon && /*#__PURE__*/(0, _jsxRuntime.jsx)(config.icon, {
        size: 48,
        color: config.iconColor
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.StyledSpacer, {
        marginVertical: 16
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.StyledText, {
        color: _theme.theme.colors.gray[700],
        fontSize: _theme.theme.fontSize.medium,
        fontWeight: _theme.theme.fontWeight.normal,
        textAlign: "center",
        children: description
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.StyledSpacer, {
        marginVertical: 8
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
        horizontal: true,
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 8,
        alignSelf: "flex-start",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledButton, {
          alignSelf: "flex-start",
          backgroundColor: config?.buttonColor || _theme.theme.colors.gray[200],
          borderColor: config?.buttonColor || _theme.theme.colors.gray[500],
          borderWidth: 1,
          borderRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 8,
          onPress: onOk,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.StyledText, {
            color: _theme.theme.colors.gray[100],
            fontSize: _theme.theme.fontSize.medium,
            fontWeight: _theme.theme.fontWeight.normal,
            textAlign: "center",
            children: okLabel
          })
        })
      })]
    })
  });
};
exports.OkDialogContent = OkDialogContent;
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
  const [show, setShow] = (0, _react.useState)(visible);
  (0, _react.useEffect)(() => {
    setShow(visible);
  }, [visible]);
  const handleOk = () => {
    setShow(false);
    onOk?.();
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DialogBase, {
    visible: show,
    transparent: true,
    animationType: animationType,
    ...rest,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(OkDialogContent, {
      variant: variant,
      title: title,
      description: description,
      okLabel: okLabel,
      onOk: handleOk,
      dialogProps: dialogProps
    })
  });
};
exports.StyledOkDialog = StyledOkDialog;
//# sourceMappingURL=index.js.map