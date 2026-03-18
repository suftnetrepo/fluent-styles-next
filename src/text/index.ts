
import {
    Text,
    TextProps,
    TextStyle,
} from 'react-native';
import { styled } from '../utiles/styled';
import { theme } from '../utiles/theme';

type TextVariants = {
    fontSize?: number;
    fontWeight?: number | string;
    color?: string;
    textDecorationLine?: boolean | string;
    textAlign?: string ;
    fontFamily?: string;
};

type StyledTextProps = TextVariants & TextProps & TextStyle;

const StyledText = styled<StyledTextProps>(Text, {
    base: {
        fontSize: theme.fontSize.normal,
        color: theme.colors.gray[800],
        fontWeight: theme.fontWeight.normal,
    } as TextStyle,
    variants: {
        fontSize: (selected: string) => {
            const size = selected || theme.fontSize.normal;
            if (isNaN(Number(size))) {
                // throw new Error('Invalid fontSize value');
            }
            return { fontSize: Number(size) };
        },

        fontWeight: (selected: string) => {
            const weight = selected || theme.fontWeight.normal;
            if (isNaN(Number(weight))) {
                // throw new Error('Invalid fontWeight value');
            }
            return { fontWeight: weight as any };
        },

        color: (selected: string) => {
            const colorValue = selected || theme.colors.gray[800];
            return { color: colorValue };
        },

        textAlign: (selected: string) => {
            const align = selected || 'left';
            const validAlignments = ['auto', 'left', 'right', 'center', 'justify'];
            if (!validAlignments.includes(align)) {
                // throw new Error('Invalid textAlign value');
            }
            return { textAlign: align as any };
        },
 
        fontFamily: (selected: string) => {
            if (!selected) return {};
            return { fontFamily: selected };
        },
    }
});

export { StyledText };
export type { StyledTextProps };
