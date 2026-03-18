
import { Platform, Pressable, PressableProps, View, ViewProps, ViewStyle } from 'react-native';
import { styled } from '../utiles/styled';
import React from 'react';
import { theme } from '../utiles/theme';
import { Stack, StackProps } from '../stack';
import { StyledImageBackground, StyledImageBackgroundProps } from '../image';
import { viewStyleVariants } from '../utiles/viewStyleVariants';

const shadow = {
  light: Platform.select({
    ios: {
      shadowColor: theme.colors.gray[900],
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    },
    android: {
      elevation: 1,
    },
  }) as ViewStyle,
  lightMedium: Platform.select({
    ios: {
      shadowColor: theme.colors.gray[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.24,
      shadowRadius: 2.84,
    },
    android: {
      elevation: 3,
    },
  }) as ViewStyle,
  medium: Platform.select({
    ios: {
      shadowColor: theme.colors.gray[900],
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
    },
    android: {
      elevation: 7,
    },
  }) as ViewStyle,
  mediumDark: Platform.select({
    ios: {
      shadowColor: theme.colors.gray[900],
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
    },
    android: {
      elevation: 10,
    },
  }) as ViewStyle,
  dark: Platform.select({
    ios: {
      shadowColor: theme.colors.gray[900],
      shadowOffset: { width: 0, height: 7 },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
    },
    android: {
      elevation: 14,
    },
  }) as ViewStyle,
  veryDark: Platform.select({
    ios: {
      shadowColor: theme.colors.gray[900],
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.5,
      shadowRadius: 13.34,
    },
    android: {
      elevation: 20,
    },
  }) as ViewStyle,
};

type ShadowLevel = keyof typeof shadow;

type CardVariants = {
  shadow?: ShadowLevel;
};

type CardComponentProps = CardVariants & ViewProps & ViewStyle;

interface StyledCardProps extends CardComponentProps {
  children?: React.ReactNode;
  pressable?: boolean;
  pressableProps?: Omit<PressableProps, 'children'>;
}

/**
 * Base Card component with shadow support
 * Flexible layout container with optional shadow variants
 */
const CardBase = styled<CardComponentProps>(View, {
  base: {
    flexDirection: 'column',
    borderRadius: 8,
  } as ViewStyle,
  variants: {
    ...viewStyleVariants,
    shadow: {
      light: shadow.light,
      lightMedium: shadow.lightMedium,
      medium: shadow.medium,
      mediumDark: shadow.mediumDark,
      dark: shadow.dark,
      veryDark: shadow.veryDark,
    } as any,
  },
});

/**
 * Wrapper component for Card with optional pressable support
 * Flexible layout container with shadow variants
 * Can be wrapped in Pressable for interactive behavior
 */
const CardComponent = React.forwardRef<React.ComponentRef<typeof CardBase>, StyledCardProps>(
  (
    {
      children,
      pressable = false,
      pressableProps,
      ...rest
    },
    ref
  ) => {
    const cardContent = (
      <CardBase ref={ref} {...rest}>
        {children}
      </CardBase>
    );

    if (pressable && pressableProps) {
      return <Pressable {...pressableProps}>{cardContent}</Pressable>;
    }

    return cardContent;
  }
);

interface HeaderProps extends StackProps {
  children: React.ReactNode;
}

const StyledHeader = React.forwardRef<React.ComponentRef<typeof Stack>, HeaderProps>(({ children, ...rest }, ref) => {
  return (
    <Stack borderBottomWidth={1} borderBottomColor={theme.colors.gray[100]} ref={ref} {...rest}>
      {children}
    </Stack>
  );
});

StyledHeader.displayName = 'StyledHeader';

interface ImageProps extends StyledImageBackgroundProps {
  children?: React.ReactNode;
}

const StyledImage = React.forwardRef<React.ComponentRef<typeof StyledImageBackground>, ImageProps>(({ children, ...rest }, ref) => {
  return (
    <StyledImageBackground ref={ref} {...rest}>
      {children}
    </StyledImageBackground>
  );
});

StyledImage.displayName = 'StyledImage';

interface ContentProps extends StackProps {
  children: React.ReactNode;
}

const StyledContent= React.forwardRef<React.ComponentRef<typeof Stack>, ContentProps>(({ children, ...rest }, ref) => {
  return (
    <Stack ref={ref} {...rest}>
      {children}
    </Stack>
  );
});

StyledContent.displayName = 'StyledContent';

interface FooterProps extends StackProps {
  children: React.ReactNode;
}

const StyledFooter = React.forwardRef<React.ComponentRef<typeof Stack>, FooterProps>(({ children, ...rest }, ref) => {
  return (
    <Stack borderTopWidth={1} borderTopColor={theme.colors.gray[100]} ref={ref} {...rest}>
      {children}
    </Stack>
  );
});


StyledFooter.displayName = 'StyledFooter';

interface Card extends React.ForwardRefExoticComponent<
  StyledCardProps & React.RefAttributes<React.ComponentRef<typeof CardBase>>
> {
  Header: typeof StyledHeader;
  Footer: typeof StyledFooter;
  Image: typeof StyledImage;
  Content: typeof StyledContent;
}

const StyledCard = CardComponent as Card;
StyledCard.Header = StyledHeader;
StyledCard.Footer = StyledFooter;
StyledCard.Image = StyledImage;
StyledCard.Content = StyledContent;

StyledCard.displayName = 'StyledCard';


export { StyledCard, StyledHeader, StyledContent, StyledFooter, shadow };
export type { CardVariants, CardComponentProps, StyledCardProps, ShadowLevel };