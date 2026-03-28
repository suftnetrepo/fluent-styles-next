
import { Pressable, PressableProps } from 'react-native';
import { styled } from '../utiles/styled';
import { ViewStyleProps, ViewStyle } from '../utiles/viewStyleProps';


type StyledPressableProps = PressableProps & (Pick<ViewStyleProps, 'width'
    | 'height'
    | 'minHeight'
    | 'maxHeight'
    | 'minWidth'
    | 'maxWidth'
    | 'flex'
    | 'flexDirection'
    | 'justifyContent'
    | 'alignItems'
    | 'alignSelf'
    | 'position'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'>);

const StyledPressable = styled<StyledPressableProps>(Pressable, {
    base: {
        position: 'relative',
    } as ViewStyle,
    variants: {

    } as any
});

export { StyledPressable };
export type { StyledPressableProps };