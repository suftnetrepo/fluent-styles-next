"use strict";

import { Platform, Pressable, View } from 'react-native';
import { styled } from "../utiles/styled.js";
import React from 'react';
import { theme } from "../utiles/theme.js";
import { Stack } from "../stack/index.js";
import { StyledImageBackground } from "../image/index.js";
import { viewStyleVariants } from "../utiles/viewStyleVariants.js";
import { jsx as _jsx } from "react/jsx-runtime";
const shadow = {
  light: Platform.select({
    ios: {
      shadowColor: theme.colors.gray[400],
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
  lightMedium: Platform.select({
    ios: {
      shadowColor: theme.colors.gray[900],
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
  medium: Platform.select({
    ios: {
      shadowColor: theme.colors.gray[900],
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
  mediumDark: Platform.select({
    ios: {
      shadowColor: theme.colors.gray[900],
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
  dark: Platform.select({
    ios: {
      shadowColor: theme.colors.gray[900],
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
  veryDark: Platform.select({
    ios: {
      shadowColor: theme.colors.gray[900],
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
const CardBase = styled(View, {
  base: {
    flexDirection: 'column',
    borderRadius: 8
  },
  variants: {
    ...viewStyleVariants,
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
const CardComponent = /*#__PURE__*/React.forwardRef(({
  children,
  pressable = false,
  pressableProps,
  ...rest
}, ref) => {
  const cardContent = /*#__PURE__*/_jsx(CardBase, {
    ref: ref,
    ...rest,
    children: children
  });
  if (pressable && pressableProps) {
    return /*#__PURE__*/_jsx(Pressable, {
      ...pressableProps,
      children: cardContent
    });
  }
  return cardContent;
});
const StyledHeader = /*#__PURE__*/React.forwardRef(({
  children,
  ...rest
}, ref) => {
  return /*#__PURE__*/_jsx(Stack, {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
    ref: ref,
    ...rest,
    children: children
  });
});
StyledHeader.displayName = 'StyledHeader';
const StyledImage = /*#__PURE__*/React.forwardRef(({
  children,
  ...rest
}, ref) => {
  return /*#__PURE__*/_jsx(StyledImageBackground, {
    ref: ref,
    ...rest,
    children: children
  });
});
StyledImage.displayName = 'StyledImage';
const StyledContent = /*#__PURE__*/React.forwardRef(({
  children,
  ...rest
}, ref) => {
  return /*#__PURE__*/_jsx(Stack, {
    ref: ref,
    ...rest,
    children: children
  });
});
StyledContent.displayName = 'StyledContent';
const StyledFooter = /*#__PURE__*/React.forwardRef(({
  children,
  ...rest
}, ref) => {
  return /*#__PURE__*/_jsx(Stack, {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
    ref: ref,
    ...rest,
    children: children
  });
});
StyledFooter.displayName = 'StyledFooter';
const StyledCard = CardComponent;
StyledCard.Header = StyledHeader;
StyledCard.Footer = StyledFooter;
StyledCard.Image = StyledImage;
StyledCard.Content = StyledContent;
StyledCard.displayName = 'StyledCard';
export { StyledCard, StyledHeader, StyledContent, StyledFooter, shadow };
//# sourceMappingURL=index.js.map