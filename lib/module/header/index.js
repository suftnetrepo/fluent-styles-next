"use strict";

import React from "react";
import { View, Platform } from "react-native";
import { styled } from "../utiles/styled.js";
import { getStatusBarHeight } from "../utiles/statusBar.js";
import { Stack } from "../stack/index.js";
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

// ─── Side slot ────────────────────────────────────────────────────────────────
// Fixed-width, always-rendered container used only when titleAlignment is
// "center". It guarantees the back-icon side and the rightIcon side reserve
// equal width, so the centered title is centered relative to the whole
// header — not just the leftover space between two differently-sized
// siblings (which is what caused center titles to drift previously).

const SideSlot = styled(View, {
  base: {
    width: 48,
    alignItems: "center",
    justifyContent: "center"
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

const HeaderComponent = ({
  showBackArrow,
  backArrowProps,
  onBackPress,
  title,
  titleAlignment = "left",
  titleProps,
  leftIcon,
  rightIcon,
  shapeProps,
  skipStatusBarOnAndroid = true,
  skipStatusBarOnIOS = true,
  children,
  // Pull ref directly from props
  ref,
  ...rest
}) => {
  // ── Left slot ─────────────────────────────────────────────────────────
  const renderBackIcon = () => /*#__PURE__*/_jsx(_Fragment, {
    children: showBackArrow && /*#__PURE__*/_jsx(StyledPressable, {
      onPress: onBackPress ?? backArrowProps?.onPress,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      children: /*#__PURE__*/_jsx(StyleShape, {
        cycle: true,
        ...shapeProps,
        children: /*#__PURE__*/_jsx(ChevronLeft, {
          size: backArrowProps?.size ?? 24,
          color: backArrowProps?.color ?? theme.colors.gray[700],
          strokeWidth: backArrowProps?.strokeWidth
        })
      })
    })
  });

  // ── Left slot ─────────────────────────────────────────────────────────
  const renderLeft = () => /*#__PURE__*/_jsx(_Fragment, {
    children: titleAlignment === "left" && title && /*#__PURE__*/_jsxs(Stack, {
      flex: 1,
      horizontal: true,
      alignItems: "center",
      justifyContent: "flex-start",
      children: [leftIcon, /*#__PURE__*/_jsx(StyledText, {
        marginLeft: showBackArrow || leftIcon ? 8 : 0,
        ...titleProps,
        children: title
      })]
    })
  });

  // ── Center slot ───────────────────────────────────────────────────────
  const renderCenter = () => {
    return /*#__PURE__*/_jsx(_Fragment, {
      children: titleAlignment === "center" && title && /*#__PURE__*/_jsx(Stack, {
        flex: 1,
        horizontal: true,
        alignItems: "center",
        justifyContent: "center",
        children: /*#__PURE__*/_jsx(StyledText, {
          numberOfLines: 1,
          ...titleProps,
          children: title
        })
      })
    });
  };

  // ── Right slot ────────────────────────────────────────────────────────
  const renderRight = () => /*#__PURE__*/_jsxs(_Fragment, {
    children: [titleAlignment === "right" && title && /*#__PURE__*/_jsx(StyledText, {
      marginRight: rightIcon ? 8 : 0,
      ...titleProps,
      children: title
    }), rightIcon && /*#__PURE__*/_jsx(_Fragment, {
      children: rightIcon
    })]
  });

  // ── When children is present (e.g. StyledHeader.Full usage), render
  //    them directly inside the container — skip the built-in layout slots.
  const renderContent = () => {
    if (children) return /*#__PURE__*/_jsx(_Fragment, {
      children: children
    });

    // Centered titles need symmetric side widths to actually sit in the
    // middle of the header — see SideSlot above. Left/right alignment
    // already hug an edge and don't need this.
    if (titleAlignment === "center") {
      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(SideSlot, {
          children: renderBackIcon()
        }), renderCenter(), /*#__PURE__*/_jsx(SideSlot, {
          children: rightIcon
        })]
      });
    }
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [renderBackIcon(), renderLeft(), renderCenter(), renderRight()]
    });
  };
  return /*#__PURE__*/_jsx(StyledHeaderContainer, {
    ref: ref,
    marginTop: getStatusBarHeight({
      skipAndroid: skipStatusBarOnAndroid,
      skipIos: skipStatusBarOnIOS
    }),
    ...rest,
    children: renderContent()
  });
};

// ─── Composition (React 19 Style) ─────────────────────────────────────────────

// Define the static property on the function type

const StyledHeader = HeaderComponent;
StyledHeader.Full = Full;
StyledHeader.displayName = "StyledHeader";
export { StyledHeader };
//# sourceMappingURL=index.js.map