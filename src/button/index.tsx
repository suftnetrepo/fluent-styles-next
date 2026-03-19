
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styled } from '../utiles/styled';
import { ViewStyleProps, ViewStyle } from '../utiles/viewStyleProps';
import { viewStyleStringVariants, viewStyleVariants } from '../utiles/viewStyleVariants';
import { StyledText } from '../text';
import { theme } from '../utiles/theme';

type buttonVariants = {
    link?: boolean;
    outline?: boolean;
    primary?: boolean;
    disabled?: boolean;
    dropdown?: boolean;
}
type ButtonProps = { variant?: buttonVariants } & TouchableOpacityProps & ViewStyleProps

interface StyledButtonProps extends ButtonProps {
    children?: React.ReactNode;
    link?: boolean;
    outline?: boolean;
    primary?: boolean;
    disabled?: boolean;
    dropdown?: boolean;
}

interface RefExoticComponent extends React.ForwardRefExoticComponent<StyledButtonProps & React.RefAttributes<React.ComponentRef<typeof ButtonBase>>> {
    Text: typeof StyledText;
}

const ButtonBase = styled<ButtonProps>(TouchableOpacity, {
    base: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 50,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flex: 1
    } as ViewStyle,
    variants: {
        ...viewStyleVariants,
        ...viewStyleStringVariants,
        link: {
            true: {
                backgroundColor: theme.colors.transparent,
                paddingHorizontal: 0,
                paddingVertical: 0,
                borderWidth: 0,
            } as ViewStyle
        },
        outline: {
            true: {
                backgroundColor: theme.colors.transparent,
                borderWidth: 1,
                borderColor: theme.colors.gray[800],
            } as ViewStyle
        },
        primary:{
            true: {
                backgroundColor: theme.colors.cyan[500],
                borderWidth: 0,
            } as ViewStyle
        },
        disabled: {
            true: {
                backgroundColor: theme.colors.gray[50],
                borderWidth: 0,
                disabled: true
            } as ViewStyle
        },
        dropdown: {
            true: {
                backgroundColor: theme.colors.white,
                borderLeftWidth: 1,
                borderTopWidth: 1,
                borderRightWidth: 1,
                borderBottomWidth: 0,
                borderColor: theme.colors.gray[200],
            } as ViewStyle
        }
    }
});


const Button = React.forwardRef<React.ComponentPropsWithRef<typeof ButtonBase>, StyledButtonProps>(({ children, ...rest }, ref) => {
    return (
        <ButtonBase ref={ref} {...rest}>
            {children}
        </ButtonBase>
    )
})

const StyledButton = Button as RefExoticComponent;
StyledButton.Text = StyledText;

export { StyledButton };
export type { StyledButtonProps };