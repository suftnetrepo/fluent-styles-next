import React, { useState, useEffect } from "react";
import {
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from "react-native";
import { theme } from "../utiles/theme";
import { styled } from "../utiles/styled";
import { viewStyleVariants } from "../utiles/viewStyleVariants";
import { ViewStyleProps } from "../utiles/viewStyleProps";
import { Checkmark } from "../icons";

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

    // Styling
    checkedColor?: string;
    uncheckedColor?: string;
    borderColor?: string;
    checkMarkColor?: string;

    // Sizing
    size?: number;

    // State
    disabled?: boolean;

    // Icon customization
    iconProps?: any;
    iconSize?: number;
}

const CheckBoxBase = styled<CheckBoxProps>(TouchableOpacity, {
    base: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    } as ViewStyle,
    variants: {
        ...viewStyleVariants,
        disabled: {
            true: {
                opacity: 0.6,
                backgroundColor: theme.colors.gray[400],
                borderColor: theme.colors.gray[400],
            },
            false: {},
        },
        checkedColor: (color: string) => {
            if (!color)
                return {
                    backgroundColor: theme.colors.gray[500],
                    borderColor: theme.colors.gray[500],
                    width: 24,
                    height: 24,
                    borderWidth: 2,
                    borderRadius: 4,
                };
            return {
                backgroundColor: color,
                borderColor: color,
            };
        },
        size: (size: number = 24) => ({
            width: size,
            height: size,
        }),
    } as any,
});

const StyledCheckBox = (
    {
        checked = false,
        onCheck,
        checkedColor,
        uncheckedColor,
        checkMarkColor = theme.colors.gray[400],
        size = 24,
        disabled = false,
        iconProps,
        iconSize = size * 0.6,
        ref,
        ...rest
    }: StyledCheckBoxProps & { ref?: React.Ref<React.ComponentRef<typeof CheckBoxBase>> },
) => {
        const [internalChecked, setInternalChecked] = useState(checked);

        useEffect(() => {
            setInternalChecked(checked);
        }, [checked]);
        
        const handlePress = () => {
            if (disabled) return;
            const newChecked = !internalChecked;
            setInternalChecked(newChecked);
            onCheck && onCheck(newChecked);
        };

        return (
            <CheckBoxBase
                ref={ref}
                checked={internalChecked}
                checkedColor={checkedColor}
                uncheckedColor={uncheckedColor}
                size={size}
                disabled={disabled}
                onPress={handlePress}
                {...rest}
            >
                {internalChecked && (
                    <Checkmark size={iconSize} color={checkMarkColor} {...iconProps} />
                )}
            </CheckBoxBase>
        );
};

StyledCheckBox.displayName = "StyledCheckBox";
export { StyledCheckBox, type StyledCheckBoxProps };
