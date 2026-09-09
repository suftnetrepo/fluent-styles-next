import { PressableProps } from 'react-native';
import { ViewStyle } from '../utiles/viewStyleProps';
type StyledPressableProps = PressableProps & ViewStyle;
declare const StyledPressable: {
    (props: PressableProps & ViewStyle & {
        ref?: import("react").Ref<any> | undefined;
    }): import("react").JSX.Element;
    displayName: string;
};
export { StyledPressable };
export type { StyledPressableProps };
//# sourceMappingURL=index.d.ts.map