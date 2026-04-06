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
var _index2 = _interopRequireDefault(require("./statusBar/index.js"));
var _index3 = require("../shape/index.js");
var _index4 = require("../text/index.js");
var _index5 = require("../icons/index.js");
var _theme = require("../utiles/theme.js");
var _index6 = require("../pressable/index.js");
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

const HeaderComponent = /*#__PURE__*/_react.default.forwardRef(({
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
  const renderLeft = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
    flex: 1,
    horizontal: true,
    alignItems: "center",
    justifyContent: "flex-start",
    children: [showBackArrow && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index6.StyledPressable, {
      onPress: onBackPress ?? backArrowProps?.onPress,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.StyleShape, {
        cycle: true,
        ...shapeProps,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.ChevronLeft, {
          size: backArrowProps?.size ?? 24,
          color: backArrowProps?.color ?? _theme.theme.colors.gray[700],
          strokeWidth: backArrowProps?.strokeWidth
        })
      })
    }), leftIcon, titleAlignment === "left" && title && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.StyledText, {
      marginLeft: showBackArrow || leftIcon ? 8 : 0,
      ...titleProps,
      children: title
    })]
  });

  // ── Center slot ───────────────────────────────────────────────────────
  const renderCenter = () => {
    if (titleAlignment !== "center" || !title) return null;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.StyledText, {
        numberOfLines: 1,
        ...titleProps,
        children: title
      })
    });
  };

  // ── Right slot ────────────────────────────────────────────────────────
  const renderRight = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
    flex: 1,
    horizontal: true,
    alignItems: "center",
    justifyContent: "flex-end",
    children: [titleAlignment === "right" && title && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.StyledText, {
      marginRight: rightIcon ? 8 : 0,
      ...titleProps,
      children: title
    }), rightIcon]
  });

  // ── When children is present (e.g. StyledHeader.Full usage), render
  //    them directly inside the container — skip the built-in layout slots.
  const renderContent = () => {
    if (children) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: children
    });
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [renderLeft(), renderCenter(), renderRight()]
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Stack, {
    vertical: true,
    children: [showStatusBar && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
      ...statusBarProps
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(StyledHeaderContainer, {
      ref: ref,
      marginTop: (0, _statusBar.getStatusBarHeight)({
        skipAndroid: skipStatusBarOnAndroid,
        skipIos: skipStatusBarOnIOS
      }),
      ...rest,
      children: renderContent()
    })]
  });
});

// ─── Composition ──────────────────────────────────────────────────────────────

const StyledHeader = exports.StyledHeader = HeaderComponent;
StyledHeader.Full = Full;
StyledHeader.displayName = "StyledHeader";
//# sourceMappingURL=index.js.map