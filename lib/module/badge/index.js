"use strict";

import { Text } from "react-native";
import { styled } from "../utiles/styled.js";
import { theme } from "../utiles/theme.js";
import React from "react";
import { Stack } from "../stack/index.js";
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const StyledBadge = styled(Text, {
  base: {
    fontSize: theme.fontSize.normal,
    color: theme.colors.gray[800],
    fontWeight: theme.fontWeight.normal
  },
  variants: {
    fontSize: selected => {
      const size = selected || theme.fontSize.normal;
      return {
        fontSize: Number(size)
      };
    },
    fontWeight: selected => {
      const weight = selected || theme.fontWeight.normal;
      return {
        fontWeight: weight
      };
    },
    color: selected => {
      const colorValue = selected || theme.colors.gray[800];
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
        color: theme.colors.blue[800],
        textDecorationLine: "underline"
      }
    }
  }
});
const BadgeWithIcon = ({
  title,
  iconLeft,
  iconRight,
  ref,
  ...rest
}) => {
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
  return /*#__PURE__*/_jsxs(Stack, {
    horizontal: true,
    alignSelf: "flex-start",
    backgroundColor,
    gap,
    borderRadius,
    paddingHorizontal,
    paddingVertical,
    justifyContent,
    alignItems,
    children: [iconLeft && /*#__PURE__*/_jsx(_Fragment, {
      children: iconLeft
    }), /*#__PURE__*/_jsx(StyledBadge, {
      marginLeft: 2,
      marginRight: 2,
      ref: ref,
      color,
      fontSize,
      fontFamily,
      fontWeight,
      children: title
    }), iconRight && /*#__PURE__*/_jsx(_Fragment, {
      children: iconRight
    })]
  });
};
const BadgeIcon = ({
  icon,
  char,
  top = -6,
  right = -6,
  fontSize,
  backgroundColor,
  color,
  bottom,
  left,
  size = 16,
  ref
}) => {
  return /*#__PURE__*/_jsxs(Stack, {
    flex: 1,
    horizontal: true,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    children: [icon && /*#__PURE__*/_jsx(_Fragment, {
      children: icon
    }), /*#__PURE__*/_jsx(Stack, {
      backgroundColor: backgroundColor || theme.colors.rose[500],
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
      children: /*#__PURE__*/_jsx(StyledBadge, {
        fontSize: fontSize || 10,
        color: color || theme.colors.gray[100],
        ref: ref,
        children: char
      })
    })]
  });
};
export { BadgeIcon };
export { BadgeWithIcon };
export { StyledBadge };
//# sourceMappingURL=index.js.map