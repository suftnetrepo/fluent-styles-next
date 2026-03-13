
import { View, ViewProps, ViewStyle } from 'react-native';
import { styled } from '../utiles/styled';

type ShapeVariants = {
    cycle?: boolean | [boolean, ViewStyle];
    size?: string | [string, ViewStyle];
};

type ShapeProps = ShapeVariants & ViewProps & ViewStyle;

const StyleShape = styled<ShapeProps>(View, {
    base: {
        position: 'relative',
    } as ViewStyle,
    variants: {
        cycle: {
            true: {
                borderRadius: 50,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0,
            } as ViewStyle,
            false: {} as ViewStyle,
        },
        size: (size: string) => {
            const selected = size || 0;
            if (isNaN(Number(selected))) {
                throw new Error('Invalid size value');
            }
            return { height: Number(selected), width: Number(selected) };
        },
    } as any
});

export { StyleShape };
export type { ShapeProps };