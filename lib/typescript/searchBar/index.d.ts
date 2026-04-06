/**
 * StyledSearchBar
 *
 * A polished animated search input with:
 * - 4 variants: outline | filled | ghost | floating
 * - 3 sizes: sm | md | lg
 * - Animated focus ring & clear button
 * - Optional left icon / right action slot
 * - Suggestion list with keyboard-aware dismiss
 * - Cancel button (mobile pattern)
 * - Voice / filter button slots
 * - Full colour token overrides
 *
 * Rules:
 * - Uses Stack, StyledText, StyledPressable — no bare View/Text
 * - No StyleSheet.create — flat style props only
 * - All colours from theme.colors / palettes
 * - Children typed as CompatNode
 */
import React, { type ReactNode } from 'react';
import { type TextInputProps } from 'react-native';
type CompatNode = ReactNode;
export interface SearchBarColors {
    background: string;
    border: string;
    focusBorder: string;
    placeholder: string;
    text: string;
    icon: string;
    clearBg: string;
    clearIcon: string;
    cancelText: string;
    suggestionBg: string;
    suggestionText: string;
    suggestionBorder: string;
    divider: string;
}
export interface SearchSuggestion {
    id: string;
    label: string;
    subtitle?: string;
    icon?: CompatNode;
}
export type SearchBarVariant = 'outline' | 'filled' | 'ghost' | 'floating';
export type SearchBarSize = 'sm' | 'md' | 'lg';
export interface StyledSearchBarProps extends Omit<TextInputProps, 'style'> {
    variant?: SearchBarVariant;
    size?: SearchBarSize;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onSubmit?: (text: string) => void;
    onCancel?: () => void;
    onClear?: () => void;
    showCancel?: boolean;
    cancelLabel?: string;
    leftIcon?: CompatNode;
    rightAction?: CompatNode;
    suggestions?: SearchSuggestion[];
    onSuggestionPress?: (item: SearchSuggestion) => void;
    loading?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    colors?: Partial<SearchBarColors>;
    /** borderRadius override */
    borderRadius?: number;
}
export declare const StyledSearchBar: React.FC<StyledSearchBarProps>;
export default StyledSearchBar;
//# sourceMappingURL=index.d.ts.map