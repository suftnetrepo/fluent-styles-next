"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledCheckBox = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theme = require("../utiles/theme.js");
var _styled = require("../utiles/styled.js");
var _viewStyleVariants = require("../utiles/viewStyleVariants.js");
var _index = require("../icons/index.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const CheckBoxBase = (0, _styled.styled)(_reactNative.TouchableOpacity, {
  base: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  variants: {
    ..._viewStyleVariants.viewStyleVariants,
    disabled: {
      true: {
        opacity: 0.6,
        backgroundColor: _theme.theme.colors.gray[400],
        borderColor: _theme.theme.colors.gray[400]
      },
      false: {}
    },
    checkedColor: color => {
      if (!color) return {
        backgroundColor: _theme.theme.colors.gray[500],
        borderColor: _theme.theme.colors.gray[500],
        width: 24,
        height: 24,
        borderWidth: 2,
        borderRadius: 4
      };
      return {
        backgroundColor: color,
        borderColor: color
      };
    },
    size: (size = 24) => ({
      width: size,
      height: size
    })
  }
});
const StyledCheckBox = exports.StyledCheckBox = /*#__PURE__*/(0, _react.forwardRef)(({
  checked = false,
  onCheck,
  checkedColor,
  uncheckedColor,
  checkMarkColor = _theme.theme.colors.gray[400],
  size = 24,
  disabled = false,
  iconProps,
  iconSize = size * 0.6,
  ...rest
}, ref) => {
  const [internalChecked, setInternalChecked] = (0, _react.useState)(checked);
  (0, _react.useEffect)(() => {
    setInternalChecked(checked);
  }, [checked]);
  const handlePress = () => {
    if (disabled) return;
    const newChecked = !internalChecked;
    setInternalChecked(newChecked);
    onCheck && onCheck(newChecked);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(CheckBoxBase, {
    ref: ref,
    checked: internalChecked,
    checkedColor: checkedColor,
    uncheckedColor: uncheckedColor,
    size: size,
    disabled: disabled,
    onPress: handlePress,
    ...rest,
    children: internalChecked && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Checkmark, {
      size: iconSize,
      color: checkMarkColor,
      ...iconProps
    })
  });
});
StyledCheckBox.displayName = "StyledCheckBox";
//# sourceMappingURL=index.js.map