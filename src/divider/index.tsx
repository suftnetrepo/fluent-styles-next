
import { View, ViewProps } from 'react-native';
import { styled } from '../utiles/styled';
import { ViewStyle } from '../utiles/viewStyleProps';
import { theme } from '../utiles/theme';
import { viewStyleStringVariants, viewStyleVariants } from '../utiles/viewStyleVariants';


type DividerVariants = {
    vertical?: boolean | [boolean, ViewStyle];
    horizontal?: boolean | [boolean, ViewStyle];
};

type DividerProps = ViewProps  & DividerVariants & ViewStyle;

const StyledDivider = styled<DividerProps>(View, {
    base: {
        flexDirection: 'row',
        flex: 1,
        height: 1,
        backgroundColor: theme.colors.gray[100],
    } as ViewStyle,
    variants: {
        vertical: {
            true: {
                flexDirection: 'column',
                flex: 1
            } as ViewStyle,
            false: {} as ViewStyle,
        },
        horizontal: {
            true: {
                flexDirection: 'row',
                flex: 1
            } as ViewStyle,
            false: {} as ViewStyle,
        },

        ...viewStyleStringVariants,
        ...viewStyleVariants
    }}
);

export { StyledDivider };
export type { DividerProps };