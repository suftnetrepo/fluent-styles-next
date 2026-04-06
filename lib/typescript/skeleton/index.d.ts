/**
 * StyledSkeleton
 *
 * An animated loading placeholder with:
 * - 2 animation types: shimmer | pulse
 * - Primitive shapes: rect | circle | text | rounded
 * - Pre-built layout templates: card | list-item | profile | article | grid
 * - Composable: nest <Skeleton.Row> / <Skeleton.Group> for custom layouts
 * - Speed + colour token overrides
 *
 * Rules:
 * - Stack / StyledText — no bare View/Text
 * - No StyleSheet.create
 * - Colours from theme.colors / palettes
 * - Children typed as CompatNode
 */
import React, { type ReactNode } from 'react';
import { type ViewStyle } from 'react-native';
type CompatNode = ReactNode;
export interface SkeletonColors {
    base: string;
    highlight: string;
    shimmer: string;
}
declare const LIGHT_COLORS: SkeletonColors;
declare const DARK_COLORS: SkeletonColors;
export type SkeletonAnimation = 'shimmer' | 'pulse' | 'none';
export type SkeletonShape = 'rect' | 'circle' | 'text' | 'rounded';
export type SkeletonTemplate = 'card' | 'list-item' | 'profile' | 'article' | 'grid';
export type SkeletonTheme = 'light' | 'dark';
export interface StyledSkeletonProps {
    /** Primitive: render a single bone */
    width?: number | `${number}%`;
    height?: number;
    shape?: SkeletonShape;
    borderRadius?: number;
    /** Template: render a composed layout */
    template?: SkeletonTemplate;
    /** Repeat template N times */
    repeat?: number;
    animation?: SkeletonAnimation;
    speed?: number;
    skeletonTheme?: SkeletonTheme;
    colors?: Partial<SkeletonColors>;
    style?: ViewStyle;
    children?: CompatNode;
}
interface BoneProps {
    width?: number | string;
    height?: number;
    shape?: SkeletonShape;
    borderRadius?: number;
    colors: SkeletonColors;
    animation: SkeletonAnimation;
    speed: number;
    style?: ViewStyle;
}
declare const Bone: React.FC<BoneProps>;
export declare const StyledSkeleton: React.FC<StyledSkeletonProps>;
export { Bone as SkeletonBone };
export { LIGHT_COLORS as SKELETON_LIGHT, DARK_COLORS as SKELETON_DARK };
export default StyledSkeleton;
//# sourceMappingURL=index.d.ts.map