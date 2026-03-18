
import { View, ViewProps } from 'react-native';
import { styled } from '../utiles/styled';
import { ViewStyleProps, ViewStyle } from '../utiles/viewStyleProps';
import { theme } from '../utiles/theme';

type DividerVariants = {
    vertical?: boolean | [boolean, ViewStyle];
    horizontal?: boolean | [boolean, ViewStyle];
};

type DividerProps = ViewProps  & DividerVariants & ViewStyleProps;

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

        backgroundColor: (selected: string) => {
            if (!selected || selected.trim() === '') return {};
            return { backgroundColor: selected } as ViewStyle;
        },

        opacity: (selected: string) => {
            const value = parseFloat(selected);
            if (isNaN(value) || value < 0 || value > 1) return {};
            return { opacity: value } as ViewStyle;
        },
        width: (selected: string) => {
            const value = parseFloat(selected);
            if (isNaN(value) || value < 0) return {};
            return { width: value } as ViewStyle;
        },

        height: (selected: string) => {
            const value = parseFloat(selected);
            if (isNaN(value) || value < 0) return {};
            return { height: value } as ViewStyle;
        },

        // Margin Properties
        margin: (selected: string) => {
            const value = parseFloat(selected);
            if (isNaN(value) || value < 0) return {};
            return { margin: value } as ViewStyle;
        },

        marginTop: (selected: string) => {
            const value = parseFloat(selected);
            if (isNaN(value) || value < 0) return {};
            return { marginTop: value } as ViewStyle;
        },

        marginBottom: (selected: string) => {
            const value = parseFloat(selected);
            if (isNaN(value) || value < 0) return {};
            return { marginBottom: value } as ViewStyle;
        },

        marginLeft: (selected: string) => {
            const value = parseFloat(selected);
            if (isNaN(value) || value < 0) return {};
            return { marginLeft: value } as ViewStyle;
        },

        marginRight: (selected: string) => {
            const value = parseFloat(selected);
            if (isNaN(value) || value < 0) return {};
            return { marginRight: value } as ViewStyle;
        },

        marginHorizontal: (selected: string) => {
            const value = parseFloat(selected);
            if (isNaN(value) || value < 0) return {};
            return { marginHorizontal: value } as ViewStyle;
        },

        marginVertical: (selected: string) => {
            const value = parseFloat(selected);
            if (isNaN(value) || value < 0) return {};
            return { marginVertical: value } as ViewStyle;
        },
    }
});

export { StyledDivider };
export type { DividerProps };