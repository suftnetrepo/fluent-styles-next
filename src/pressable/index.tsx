
import { Pressable, PressableProps, ViewStyle } from 'react-native';
import { styled } from '../utiles/styled';


type StyledPressableProps =  PressableProps & ViewStyle;

const StyledPressaable = styled<StyledPressableProps>(Pressable, {
    base: {
        position: 'relative',
    } as ViewStyle,
    variants: {
        
    } as any
});

export { StyledPressaable };
export type { PressableProps as StyledPressableProps };