"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledHeader = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _styled = require("../utiles/styled.js");
var _statusBar = require("../utiles/statusBar.js");
var _index = require("../stack/index.js");
var _index2 = require("../shape/index.js");
var _index3 = require("../text/index.js");
var _index4 = require("../icons/index.js");
var _theme = require("../utiles/theme.js");
var _index5 = require("../pressable/index.js");
var _viewStyleVariants = require("../utiles/viewStyleVariants.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Container ────────────────────────────────────────────────────────────────

const StyledHeaderContainer = (0, _styled.styled)(_reactNative.View, {
  base: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: _reactNative.Platform.select({
      ios: 44,
      android: 56,
      default: 56
    }),
    paddingHorizontal: 4
  },
  variants: {
    // ── Forward all generic style props ─────────────────────────────────────
    ..._viewStyleVariants.viewStyleVariants,
    ..._viewStyleVariants.viewStyleStringVariants
  }
});

// ─── Side slot ────────────────────────────────────────────────────────────────
// Fixed-width, always-rendered container used only when titleAlignment is
// "center". It guarantees the back-icon side and the rightIcon side reserve
// equal width, so the centered title is centered relative to the whole
// header — not just the leftover space between two differently-sized
// siblings (which is what caused center titles to drift previously).

const SideSlot = (0, _styled.styled)(_reactNative.View, {
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
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
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
  const renderBackIcon = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: showBackArrow && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.StyledPressable, {
      onPress: onBackPress ?? backArrowProps?.onPress,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyleShape, {
        cycle: true,
        ...shapeProps,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.ChevronLeft, {
          size: backArrowProps?.size ?? 24,
          color: backArrowProps?.color ?? _theme.theme.colors.gray[700],
          strokeWidth: backArrowProps?.strokeWidth
        })
      })
    })
  });

  // ── Left slot ─────────────────────────────────────────────────────────
  const renderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: titleAlignment === "left" && title && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
      flex: 1,
      horizontal: true,
      alignItems: "center",
      justifyContent: "flex-start",
      children: [leftIcon, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.StyledText, {
        marginLeft: showBackArrow || leftIcon ? 8 : 0,
        ...titleProps,
        children: title
      })]
    })
  });

  // ── Center slot ───────────────────────────────────────────────────────
  const renderCenter = () => {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: titleAlignment === "center" && title && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
        flex: 1,
        horizontal: true,
        alignItems: "center",
        justifyContent: "center",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.StyledText, {
          numberOfLines: 1,
          ...titleProps,
          children: title
        })
      })
    });
  };

  // ── Right slot ────────────────────────────────────────────────────────
  const renderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [titleAlignment === "right" && title && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.StyledText, {
      marginRight: rightIcon ? 8 : 0,
      ...titleProps,
      children: title
    }), rightIcon && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: rightIcon
    })]
  });

  // ── When children is present (e.g. StyledHeader.Full usage), render
  //    them directly inside the container — skip the built-in layout slots.
  const renderContent = () => {
    if (children) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: children
    });

    // Centered titles need symmetric side widths to actually sit in the
    // middle of the header — see SideSlot above. Left/right alignment
    // already hug an edge and don't need this.
    if (titleAlignment === "center") {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(SideSlot, {
          children: renderBackIcon()
        }), renderCenter(), /*#__PURE__*/(0, _jsxRuntime.jsx)(SideSlot, {
          children: rightIcon
        })]
      });
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [renderBackIcon(), renderLeft(), renderCenter(), renderRight()]
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(StyledHeaderContainer, {
    ref: ref,
    marginTop: (0, _statusBar.getStatusBarHeight)({
      skipAndroid: skipStatusBarOnAndroid,
      skipIos: skipStatusBarOnIOS
    }),
    ...rest,
    children: renderContent()
  });
};

// ─── Composition (React 19 Style) ─────────────────────────────────────────────

// Define the static property on the function type

const StyledHeader = exports.StyledHeader = HeaderComponent;
StyledHeader.Full = Full;
StyledHeader.displayName = "StyledHeader";
//# sourceMappingURL=index.js.map