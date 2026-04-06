
import { Pressable, PressableProps } from 'react-native';
import { styled } from '../utiles/styled';
import { ViewStyle } from '../utiles/viewStyleProps';
import { viewStyleStringVariants } from '../utiles/viewStyleVariants';

type StyledPressableProps = PressableProps & ViewStyle;

const StyledPressable = styled<StyledPressableProps>(Pressable, {
    base: {
        position: 'relative',
    } as ViewStyle,
    variants: {
        ...viewStyleStringVariants
    } as any
});

export { StyledPressable };
export type { StyledPressableProps };