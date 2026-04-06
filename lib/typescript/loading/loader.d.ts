import React from 'react';
import { ComponentTheme } from '../utiles/theme';
export type LoaderColors = {
    indicator: string;
    overlayBg: string;
    cardBg: string;
    cardBorder: string;
    label: string;
};
export declare const LOADER_LIGHT: LoaderColors;
export declare const LOADER_DARK: LoaderColors;
export type LoaderVariant = 'spinner' | 'pulse' | 'dots' | 'circular';
export type LoaderProps = {
    label?: string;
    variant?: LoaderVariant;
    /** Overrides the indicator tint from the theme. */
    color?: string;
    overlay?: boolean;
    theme?: ComponentTheme;
    colors?: Partial<LoaderColors>;
};
export declare const Loader: React.FC<LoaderProps>;
//# sourceMappingURL=loader.d.ts.map