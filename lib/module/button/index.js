"use strict";

import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { styled } from "../utiles/styled.js";
import { viewStyleStringVariants, viewStyleVariants } from "../utiles/viewStyleVariants.js";
import { StyledText } from "../text/index.js";
import { theme } from "../utiles/theme.js";

// ─── Variant shape ────────────────────────────────────────────────────────────
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ─── Base styled component ────────────────────────────────────────────────────

const ButtonBase = styled(TouchableOpacity, {
  base: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    borderRadius: 32,
    // pill by default
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 0
  },
  variants: {
    // ── Forward all generic style props ─────────────────────────────────────
    ...viewStyleVariants,
    ...viewStyleStringVariants,
    // ── Appearance ───────────────────────────────────────────────────────────

    primary: {
      true: {
        backgroundColor: theme.colors.cyan[500],
        borderWidth: 0
      }
    },
    secondary: {
      true: {
        backgroundColor: theme.colors.indigo[500],
        borderWidth: 0
      }
    },
    outline: {
      true: {
        backgroundColor: theme.colors.transparent,
        borderWidth: 1.5,
        borderColor: theme.colors.gray[300]
      }
    },
    ghost: {
      true: {
        backgroundColor: theme.colors.transparent,
        borderWidth: 0
      }
    },
    link: {
      true: {
        backgroundColor: theme.colors.transparent,
        borderWidth: 0
      }
    },
    danger: {
      true: {
        backgroundColor: theme.colors.red[500],
        borderWidth: 0
      }
    },
    success: {
      true: {
        backgroundColor: theme.colors.green[500],
        borderWidth: 0
      }
    },
    warning: {
      true: {
        backgroundColor: theme.colors.amber[400],
        borderWidth: 0
      }
    },
    dropdown: {
      true: {
        backgroundColor: theme.colors.white,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 0,
        borderColor: theme.colors.gray[200],
        borderRadius: 0
      }
    },
    disabled: {
      true: {
        backgroundColor: theme.colors.gray[100],
        borderWidth: 0,
        opacity: 0.6
      }
    },
    // ── Shape ────────────────────────────────────────────────────────────────

    pill: {
      true: {
        borderRadius: 999,
        borderWidth: 0
      }
    },
    rounded: {
      true: {
        borderRadius: 12,
        borderWidth: 0
      }
    },
    square: {
      true: {
        borderRadius: 0,
        borderWidth: 0
      }
    },
    // ── Size ─────────────────────────────────────────────────────────────────

    xs: {
      true: {
        paddingHorizontal: 10,
        paddingVertical: 4
      }
    },
    sm: {
      true: {
        paddingHorizontal: 14,
        paddingVertical: 6
      }
    },
    md: {
      true: {
        paddingHorizontal: 20,
        paddingVertical: 10
      }
    },
    lg: {
      true: {
        paddingHorizontal: 28,
        paddingVertical: 14
      }
    },
    xl: {
      true: {
        paddingHorizontal: 36,
        paddingVertical: 18
      }
    },
    // ── Layout ────────────────────────────────────────────────────────────────

    compact: {
      true: {
        flex: 0,
        alignSelf: 'flex-start'
      }
    },
    block: {
      true: {
        flex: 1,
        alignSelf: 'stretch'
      }
    },
    icon: {
      true: {
        width: 44,
        height: 44,
        borderRadius: 22,
        padding: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        flex: 0
      }
    }
  }
});

// ─── Spinner colour helper ────────────────────────────────────────────────────

function spinnerColor(props) {
  if (props.outline || props.ghost) return theme.colors.gray[600];
  return theme.colors.white;
}

// ─── Button ──────────────────────────────────────────────────────────────────

const Button = /*#__PURE__*/React.forwardRef(({
  children,
  loading,
  leftIcon,
  rightIcon,
  disabled,
  ...rest
}, ref) => {
  const isDisabled = disabled || loading;
  return /*#__PURE__*/_jsxs(ButtonBase, {
    ref: ref,
    disabled: isDisabled || undefined // passes disabled variant styling
    ,
    activeOpacity: isDisabled ? 1 : 0.72,
    ...rest,
    children: [!loading && leftIcon ? leftIcon : null, loading ? /*#__PURE__*/_jsx(ActivityIndicator, {
      size: "small",
      color: spinnerColor(rest),
      style: {
        marginRight: children ? 4 : 0
      }
    }) : null, typeof children === 'string' ? /*#__PURE__*/_jsx(StyledText, {
      children: children
    }) : children, !loading && rightIcon ? rightIcon : null]
  });
});
Button.displayName = 'StyledButton';
const StyledButton = Button;
StyledButton.Text = StyledText;
export { StyledButton };
//# sourceMappingURL=index.js.map