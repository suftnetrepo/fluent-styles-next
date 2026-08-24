import React from "react";
import { TouchableOpacityProps } from "react-native";
import { ViewStyleProps } from "../utiles/viewStyleProps";
type VariantProps = {
    checked?: boolean;
    disabled?: boolean;
    checkedColor?: string;
    uncheckedColor?: string;
    borderColor?: string;
    checkMarkColor?: string;
    size?: number;
};
type CheckBoxProps = VariantProps & ViewStyleProps & TouchableOpacityProps;
interface StyledCheckBoxProps extends CheckBoxProps {
    checked?: boolean;
    onCheck?: (checked: boolean) => void;
    checkedColor?: string;
    uncheckedColor?: string;
    borderColor?: string;
    checkMarkColor?: string;
    size?: number;
    disabled?: boolean;
    iconProps?: any;
    iconSize?: number;
}
declare const CheckBoxBase: {
    (props: VariantProps & ViewStyleProps & TouchableOpacityProps & {
        ref?: React.Ref<any> | undefined;
    }): React.JSX.Element;
    displayName: string;
};
declare const StyledCheckBox: {
    ({ checked, onCheck, checkedColor, uncheckedColor, checkMarkColor, size, disabled, iconProps, iconSize, ref, ...rest }: StyledCheckBoxProps & {
        ref?: React.Ref<any> | undefined;
    }): React.JSX.Element;
    displayName: string;
};
export { StyledCheckBox, type StyledCheckBoxProps };
//# sourceMappingURL=index.d.ts.map