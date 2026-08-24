import React from "react";
import { ViewStyle } from "react-native";
export type DropdownOptionItem<TMeta = unknown> = {
    value: string;
    label: string;
    /** Leading icon rendered inside the row. */
    icon?: React.ReactNode;
    /** Secondary line below the label. */
    subtitle?: string;
    /** Non-selectable, greyed-out row. */
    disabled?: boolean;
    /** Arbitrary payload forwarded to onChange. */
    meta?: TMeta;
};
export type DropdownSize = "sm" | "md" | "lg";
export type DropdownVariant = "outline" | "filled" | "underline" | "ghost";
interface DropdownBaseProps<TItem extends DropdownOptionItem> extends ViewStyle {
    data: TItem[];
    placeholder: string;
    placeholderTextColor?: string;
    disabled?: boolean;
    maxHeight?: number;
    size?: DropdownSize;
    variant?: DropdownVariant;
    leftIcon?: React.ReactNode;
    label?: string;
    helperText?: string;
    errorMessage?: string;
    error?: boolean;
    searchable?: boolean;
    searchPlaceholder?: string;
    clearable?: boolean;
    loading?: boolean;
    emptyText?: string;
    focusColor?: string;
    groupBy?: (item: TItem) => string;
}
export interface StyledDropdownProps<TItem extends DropdownOptionItem = DropdownOptionItem> extends DropdownBaseProps<TItem> {
    value?: string;
    defaultValue?: string;
    onChange: (item: TItem) => void;
}
export interface StyledMultiSelectDropdownProps<TItem extends DropdownOptionItem = DropdownOptionItem> extends DropdownBaseProps<TItem> {
    value?: string[];
    defaultValue?: string[];
    onChange: (items: TItem[]) => void;
    separator?: string;
    maxDisplay?: number;
    selectAll?: boolean;
}
export declare const StyledDropdown: {
    ({ data, onChange, placeholder, placeholderTextColor, value, defaultValue, disabled, maxHeight, size, variant, leftIcon, label, helperText, errorMessage, error, searchable, searchPlaceholder, clearable, loading, emptyText, focusColor, groupBy, ref, ...rest }: StyledDropdownProps<DropdownOptionItem<unknown>> & {
        ref?: React.Ref<any> | undefined;
    }): React.JSX.Element;
    displayName: string;
};
export declare const StyledMultiSelectDropdown: {
    ({ data, onChange, placeholder, placeholderTextColor, value, defaultValue, disabled, maxHeight, size, variant, leftIcon, label, helperText, errorMessage, error, searchable, searchPlaceholder, clearable, loading, emptyText, focusColor, groupBy, separator, maxDisplay, selectAll, ref, ...rest }: StyledMultiSelectDropdownProps<DropdownOptionItem<unknown>> & {
        ref?: React.Ref<any> | undefined;
    }): React.JSX.Element;
    displayName: string;
};
export {};
//# sourceMappingURL=index.d.ts.map