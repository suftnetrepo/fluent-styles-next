
import { styled } from '../utiles/styled';
import { ViewStyle, ScrollView, ScrollViewProps } from 'react-native'
import { viewStyleVariants } from '../utiles/viewStyleVariants';

type StyledScrollViewProps = ScrollViewProps & ViewStyle;

const StyledScrollView = styled<StyledScrollViewProps>(ScrollView, {
    base: {
        flex: 1,
    },
    variants: {
        ...viewStyleVariants,
    } 
});

export { StyledScrollView };
export type { StyledScrollViewProps };