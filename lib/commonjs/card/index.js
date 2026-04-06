"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shadow = exports.StyledHeader = exports.StyledFooter = exports.StyledContent = exports.StyledCard = void 0;
var _reactNative = require("react-native");
var _styled = require("../utiles/styled.js");
var _react = _interopRequireDefault(require("react"));
var _theme = require("../utiles/theme.js");
var _index = require("../stack/index.js");
var _index2 = require("../image/index.js");
var _viewStyleVariants = require("../utiles/viewStyleVariants.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const shadow = exports.shadow = {
  light: _reactNative.Platform.select({
    ios: {
      shadowColor: _theme.theme.colors.gray[400],
      shadowOffset: {
        width: 1,
        height: 1
      },
      shadowOpacity: 0.2,
      shadowRadius: 2.22
    },
    android: {
      elevation: 1
    }
  }),
  lightMedium: _reactNative.Platform.select({
    ios: {
      shadowColor: _theme.theme.colors.gray[900],
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.24,
      shadowRadius: 2.84
    },
    android: {
      elevation: 3
    }
  }),
  medium: _reactNative.Platform.select({
    ios: {
      shadowColor: _theme.theme.colors.gray[900],
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65
    },
    android: {
      elevation: 7
    }
  }),
  mediumDark: _reactNative.Platform.select({
    ios: {
      shadowColor: _theme.theme.colors.gray[900],
      shadowOffset: {
        width: 0,
        height: 5
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68
    },
    android: {
      elevation: 10
    }
  }),
  dark: _reactNative.Platform.select({
    ios: {
      shadowColor: _theme.theme.colors.gray[900],
      shadowOffset: {
        width: 0,
        height: 7
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11
    },
    android: {
      elevation: 14
    }
  }),
  veryDark: _reactNative.Platform.select({
    ios: {
      shadowColor: _theme.theme.colors.gray[900],
      shadowOffset: {
        width: 0,
        height: 10
      },
      shadowOpacity: 0.5,
      shadowRadius: 13.34
    },
    android: {
      elevation: 20
    }
  })
};
/**
 * Base Card component with shadow support
 * Flexible layout container with optional shadow variants
 */
const CardBase = (0, _styled.styled)(_reactNative.View, {
  base: {
    flexDirection: 'column',
    borderRadius: 8
  },
  variants: {
    ..._viewStyleVariants.viewStyleVariants,
    shadow: {
      light: shadow.light,
      lightMedium: shadow.lightMedium,
      medium: shadow.medium,
      mediumDark: shadow.mediumDark,
      dark: shadow.dark,
      veryDark: shadow.veryDark
    }
  }
});

/**
 * Wrapper component for Card with optional pressable support
 * Flexible layout container with shadow variants
 * Can be wrapped in Pressable for interactive behavior
 */
const CardComponent = /*#__PURE__*/_react.default.forwardRef(({
  children,
  pressable = false,
  pressableProps,
  ...rest
}, ref) => {
  const cardContent = /*#__PURE__*/(0, _jsxRuntime.jsx)(CardBase, {
    ref: ref,
    ...rest,
    children: children
  });
  if (pressable && pressableProps) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
      ...pressableProps,
      children: cardContent
    });
  }
  return cardContent;
});
const StyledHeader = exports.StyledHeader = /*#__PURE__*/_react.default.forwardRef(({
  children,
  ...rest
}, ref) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
    borderBottomWidth: 1,
    borderBottomColor: _theme.theme.colors.gray[100],
    ref: ref,
    ...rest,
    children: children
  });
});
StyledHeader.displayName = 'StyledHeader';
const StyledImage = /*#__PURE__*/_react.default.forwardRef(({
  children,
  ...rest
}, ref) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StyledImageBackground, {
    ref: ref,
    ...rest,
    children: children
  });
});
StyledImage.displayName = 'StyledImage';
const StyledContent = exports.StyledContent = /*#__PURE__*/_react.default.forwardRef(({
  children,
  ...rest
}, ref) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
    ref: ref,
    ...rest,
    children: children
  });
});
StyledContent.displayName = 'StyledContent';
const StyledFooter = exports.StyledFooter = /*#__PURE__*/_react.default.forwardRef(({
  children,
  ...rest
}, ref) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Stack, {
    borderTopWidth: 1,
    borderTopColor: _theme.theme.colors.gray[100],
    ref: ref,
    ...rest,
    children: children
  });
});
StyledFooter.displayName = 'StyledFooter';
const StyledCard = exports.StyledCard = CardComponent;
StyledCard.Header = StyledHeader;
StyledCard.Footer = StyledFooter;
StyledCard.Image = StyledImage;
StyledCard.Content = StyledContent;
StyledCard.displayName = 'StyledCard';
//# sourceMappingURL=index.js.map