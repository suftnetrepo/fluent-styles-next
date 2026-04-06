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
declare const StyledCheckBox: React.ForwardRefExoticComponent<StyledCheckBoxProps & React.RefAttributes<any>>;
export { StyledCheckBox, type StyledCheckBoxProps };
//# sourceMappingURL=index.d.ts.map