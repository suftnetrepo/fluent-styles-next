
import { View, ViewProps, ViewStyle } from 'react-native';
import { styled } from '../utiles/styled';

type SpacerProps =  ViewProps & ViewStyle;

const StyledSpacer = styled<SpacerProps>(View, {
    base: {
        marginHorizontal: 1,
    } as ViewStyle,
});

export {  StyledSpacer };
export type { SpacerProps };