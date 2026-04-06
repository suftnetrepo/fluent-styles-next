"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styled = require("../utiles/styled.js");
var _viewStyleVariants = require("../utiles/viewStyleVariants.js");
var _index = require("../text/index.js");
var _theme = require("../utiles/theme.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// ─── Variant shape ────────────────────────────────────────────────────────────

// ─── Base styled component ────────────────────────────────────────────────────

const ButtonBase = (0, _styled.styled)(_reactNative.TouchableOpacity, {
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
    ..._viewStyleVariants.viewStyleVariants,
    ..._viewStyleVariants.viewStyleStringVariants,
    // ── Appearance ───────────────────────────────────────────────────────────

    primary: {
      true: {
        backgroundColor: _theme.theme.colors.cyan[500],
        borderWidth: 0
      }
    },
    secondary: {
      true: {
        backgroundColor: _theme.theme.colors.indigo[500],
        borderWidth: 0
      }
    },
    outline: {
      true: {
        backgroundColor: _theme.theme.colors.transparent,
        borderWidth: 1.5,
        borderColor: _theme.theme.colors.gray[300]
      }
    },
    ghost: {
      true: {
        backgroundColor: _theme.theme.colors.transparent,
        borderWidth: 0
      }
    },
    link: {
      true: {
        backgroundColor: _theme.theme.colors.transparent,
        borderWidth: 0
      }
    },
    danger: {
      true: {
        backgroundColor: _theme.theme.colors.red[500],
        borderWidth: 0
      }
    },
    success: {
      true: {
        backgroundColor: _theme.theme.colors.green[500],
        borderWidth: 0
      }
    },
    warning: {
      true: {
        backgroundColor: _theme.theme.colors.amber[400],
        borderWidth: 0
      }
    },
    dropdown: {
      true: {
        backgroundColor: _theme.theme.colors.white,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 0,
        borderColor: _theme.theme.colors.gray[200],
        borderRadius: 0
      }
    },
    disabled: {
      true: {
        backgroundColor: _theme.theme.colors.gray[100],
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
  if (props.outline || props.ghost) return _theme.theme.colors.gray[600];
  return _theme.theme.colors.white;
}

// ─── Button ──────────────────────────────────────────────────────────────────

const Button = /*#__PURE__*/_react.default.forwardRef(({
  children,
  loading,
  leftIcon,
  rightIcon,
  disabled,
  ...rest
}, ref) => {
  const isDisabled = disabled || loading;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(ButtonBase, {
    ref: ref,
    disabled: isDisabled || undefined // passes disabled variant styling
    ,
    activeOpacity: isDisabled ? 1 : 0.72,
    ...rest,
    children: [!loading && leftIcon ? leftIcon : null, loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
      size: "small",
      color: spinnerColor(rest),
      style: {
        marginRight: children ? 4 : 0
      }
    }) : null, typeof children === 'string' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.StyledText, {
      children: children
    }) : children, !loading && rightIcon ? rightIcon : null]
  });
});
Button.displayName = 'StyledButton';
const StyledButton = exports.StyledButton = Button;
StyledButton.Text = _index.StyledText;
//# sourceMappingURL=index.js.map