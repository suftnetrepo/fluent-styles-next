
import { View, ViewProps, ViewStyle } from 'react-native';
import { styled } from '../utiles/styled';
import { viewStyleStringVariants, viewStyleVariants } from '../utiles/viewStyleVariants';

type ShapeVariants = {
    cycle?: boolean | [boolean, ViewStyle];
    size?: string | number | [string | number, ViewStyle];
};

type ShapeProps = ShapeVariants & ViewProps & ViewStyle;

const StyledShape = styled<ShapeProps>(View, {
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
        size: (size: string | number) => {
            const selected = size ?? 0;
            if (isNaN(Number(selected))) {
                throw new Error('Invalid size value');
            }
            return { height: Number(selected), width: Number(selected) };
        },
        ...viewStyleVariants,
        ...viewStyleStringVariants,
    } as any,
});


export { StyledShape, StyledShape as StyleShape };
export type { ShapeProps };