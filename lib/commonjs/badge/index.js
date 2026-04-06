"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledBadge = exports.BadgeWithIcon = exports.BadgeIcon = void 0;
var _reactNative = require("react-native");
var _styled = require("../utiles/styled.js");
var _theme = require("../utiles/theme.js");
var _react = require("react");
var _index = require("../stack/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const StyledBadge = exports.StyledBadge = (0, _styled.styled)(_reactNative.Text, {
  base: {
    fontSize: _theme.theme.fontSize.normal,
    color: _theme.theme.colors.gray[800],
    fontWeight: _theme.theme.fontWeight.normal
  },
  variants: {
    fontSize: selected => {
      const size = selected || _theme.theme.fontSize.normal;
      return {
        fontSize: Number(size)
      };
    },
    fontWeight: selected => {
      const weight = selected || _theme.theme.fontWeight.normal;
      return {
        fontWeight: weight
      };
    },
    color: selected => {
      const colorValue = selected || _theme.theme.colors.gray[800];
      return {
        color: colorValue
      };
    },
    textAlign: selected => {
      const align = selected || "center";
      const validAlignments = ["auto", "left", "right", "center", "justify"];
      if (!validAlignments.includes(align)) {
        return {};
      }
      return {
        textAlign: align
      };
    },
    fontFamily: selected => {
      if (!selected) return {};
      return {
        fontFamily: selected
      };
    },
    link: {
      true: {
        color: _theme.theme.colors.blue[800],
        textDecorationLine: "underline"
      }
    }
  }
});
const BadgeWithIcon = exports.BadgeWithIcon = /*#__PURE__*/(0, _react.forwardRef)(({
  title,
  iconLeft,
  iconRight,
  ...rest
}, ref) => {
  const {
    color,
    fontSize,
    fontFamily,
    fontWeight,
    gap,
    backgroundColor,
    paddingHorizontal,
    paddingVertical,
    borderRadius,
    justifyContent,
    alignItems
  } = rest;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
    horizontal: true,
    alignSelf: "flex-start",
    backgroundColor,
    gap,
    borderRadius,
    paddingHorizontal,
    paddingVertical,
    justifyContent,
    alignItems,
    children: [iconLeft && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: iconLeft
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(StyledBadge, {
      marginLeft: 2,
      marginRight: 2,
      ref: ref,
      color,
      fontSize,
      fontFamily,
      fontWeight,
      children: title
    }), iconRight && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: iconRight
    })]
  });
});
const BadgeIcon = exports.BadgeIcon = /*#__PURE__*/(0, _react.forwardRef)(({
  icon,
  char,
  top = -6,
  right = -6,
  fontSize,
  backgroundColor,
  color,
  bottom,
  left,
  size = 16
}, ref) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
    flex: 1,
    horizontal: true,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    children: [icon && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: icon
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
      backgroundColor: backgroundColor || _theme.theme.colors.rose[500],
      borderWidth: 0,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 999,
      height: size,
      width: size,
      top,
      right,
      bottom,
      left,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(StyledBadge, {
        fontSize: fontSize || 10,
        color: color || _theme.theme.colors.gray[100],
        ref: ref,
        children: char
      })
    })]
  });
});
//# sourceMappingURL=index.js.map