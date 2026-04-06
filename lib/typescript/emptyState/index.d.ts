/**
 * StyledEmptyState
 *
 * A data-empty / zero-state display with:
 * - 5 variants: default | card | minimal | illustrated | action-focused
 * - Illustration slot (emoji, icon, or custom ReactNode)
 * - Primary + secondary action buttons
 * - Animated entrance (fade + slide-up)
 * - Compact mode for inline use
 * - Full colour token overrides
 *
 * Rules:
 * - Stack / StyledText / StyledPressable / StyledCard — no bare View/Text
 * - No StyleSheet.create
 * - Colours from theme.colors / palettes
 * - Children typed as CompatNode
 */
import React, { type ReactNode } from 'react';
type CompatNode = ReactNode;
export interface EmptyStateColors {
    background: string;
    illustrationBg: string;
    title: string;
    description: string;
    primaryBg: string;
    primaryText: string;
    primaryBorder: string;
    secondaryBg: string;
    secondaryText: string;
    secondaryBorder: string;
    border: string;
}
export interface EmptyStateAction {
    label: string;
    onPress: () => void;
    icon?: CompatNode;
    variant?: 'primary' | 'secondary';
}
export type EmptyStateVariant = 'default' | 'card' | 'minimal' | 'illustrated' | 'action';
export interface StyledEmptyStateProps {
    variant?: EmptyStateVariant;
    /** Emoji string, icon component, or any ReactNode */
    illustration?: CompatNode;
    title?: string;
    description?: string;
    actions?: EmptyStateAction[];
    /** Compact horizontal layout */
    compact?: boolean;
    animated?: boolean;
    colors?: Partial<EmptyStateColors>;
    /** Padding around the whole container */
    padding?: number;
    children?: CompatNode;
}
export declare const StyledEmptyState: React.FC<StyledEmptyStateProps>;
export default StyledEmptyState;
//# sourceMappingURL=index.d.ts.map