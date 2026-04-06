"use strict";

import React from "react";
import { View, Platform } from "react-native";
import { styled } from "../utiles/styled.js";
import { getStatusBarHeight } from "../utiles/statusBar.js";
import { Stack } from "../stack/index.js";
import StatusBar from "./statusBar/index.js";
import { StyleShape } from "../shape/index.js";
import { StyledText } from "../text/index.js";
import { ChevronLeft } from "../icons/index.js";
import { theme } from "../utiles/theme.js";
import { StyledPressable } from "../pressable/index.js";
import { viewStyleStringVariants, viewStyleVariants } from "../utiles/viewStyleVariants.js";

// ─── Types ────────────────────────────────────────────────────────────────────
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ─── Container ────────────────────────────────────────────────────────────────

const StyledHeaderContainer = styled(View, {
  base: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: Platform.select({
      ios: 44,
      android: 56,
      default: 56
    }),
    paddingHorizontal: 4
  },
  variants: {
    // ── Forward all generic style props ─────────────────────────────────────
    ...viewStyleVariants,
    ...viewStyleStringVariants
  }
});

// ─── Full — pure children pass-through ───────────────────────────────────────
// No layout of its own. StyledHeader (the outer wrapper) owns all spacing,
// status bar, and container sizing. Full just renders whatever is inside it.

const Full = ({
  children
}) => /*#__PURE__*/_jsx(_Fragment, {
  children: children
});
Full.displayName = "StyledHeader.Full";

// ─── StyledHeader ─────────────────────────────────────────────────────────────

const HeaderComponent = /*#__PURE__*/React.forwardRef(({
  // built-in title/icon layout props
  showBackArrow,
  backArrowProps,
  showStatusBar = true,
  onBackPress,
  title,
  titleAlignment = "left",
  titleProps,
  leftIcon,
  rightIcon,
  shapeProps,
  statusBarProps,
  skipStatusBarOnAndroid = true,
  skipStatusBarOnIOS = true,
  // children covers StyledHeader.Full usage
  children,
  ...rest
}, ref) => {
  // ── Left slot ─────────────────────────────────────────────────────────
  const renderLeft = () => /*#__PURE__*/_jsxs(Stack, {
    flex: 1,
    horizontal: true,
    alignItems: "center",
    justifyContent: "flex-start",
    children: [showBackArrow && /*#__PURE__*/_jsx(StyledPressable, {
      onPress: onBackPress ?? backArrowProps?.onPress,
      children: /*#__PURE__*/_jsx(StyleShape, {
        cycle: true,
        ...shapeProps,
        children: /*#__PURE__*/_jsx(ChevronLeft, {
          size: backArrowProps?.size ?? 24,
          color: backArrowProps?.color ?? theme.colors.gray[700],
          strokeWidth: backArrowProps?.strokeWidth
        })
      })
    }), leftIcon, titleAlignment === "left" && title && /*#__PURE__*/_jsx(StyledText, {
      marginLeft: showBackArrow || leftIcon ? 8 : 0,
      ...titleProps,
      children: title
    })]
  });

  // ── Center slot ───────────────────────────────────────────────────────
  const renderCenter = () => {
    if (titleAlignment !== "center" || !title) return null;
    return /*#__PURE__*/_jsx(Stack, {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
      children: /*#__PURE__*/_jsx(StyledText, {
        numberOfLines: 1,
        ...titleProps,
        children: title
      })
    });
  };

  // ── Right slot ────────────────────────────────────────────────────────
  const renderRight = () => /*#__PURE__*/_jsxs(Stack, {
    flex: 1,
    horizontal: true,
    alignItems: "center",
    justifyContent: "flex-end",
    children: [titleAlignment === "right" && title && /*#__PURE__*/_jsx(StyledText, {
      marginRight: rightIcon ? 8 : 0,
      ...titleProps,
      children: title
    }), rightIcon]
  });

  // ── When children is present (e.g. StyledHeader.Full usage), render
  //    them directly inside the container — skip the built-in layout slots.
  const renderContent = () => {
    if (children) return /*#__PURE__*/_jsx(_Fragment, {
      children: children
    });
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [renderLeft(), renderCenter(), renderRight()]
    });
  };
  return /*#__PURE__*/_jsxs(Stack, {
    vertical: true,
    children: [showStatusBar && /*#__PURE__*/_jsx(StatusBar, {
      ...statusBarProps
    }), /*#__PURE__*/_jsx(StyledHeaderContainer, {
      ref: ref,
      marginTop: getStatusBarHeight({
        skipAndroid: skipStatusBarOnAndroid,
        skipIos: skipStatusBarOnIOS
      }),
      ...rest,
      children: renderContent()
    })]
  });
});

// ─── Composition ──────────────────────────────────────────────────────────────

const StyledHeader = HeaderComponent;
StyledHeader.Full = Full;
StyledHeader.displayName = "StyledHeader";
export { StyledHeader };
//# sourceMappingURL=index.js.map