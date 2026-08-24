import React from 'react';
export type CircularProgressVariant = 'default' | 'ghost' | 'gradient' | 'dashboard';
export type CircularProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CircularProgressColors = {
    arc: string;
    track: string;
    label: string;
    sublabel: string;
    gradientFrom: string;
    gradientTo: string;
};
export interface StyledCircularProgressProps {
    value: number;
    total?: number;
    display?: 'percent' | 'fraction' | 'value' | 'label' | 'none';
    label?: string;
    sublabel?: string;
    variant?: CircularProgressVariant;
    size?: CircularProgressSize;
    diameter?: number;
    strokeWidth?: number;
    lineCap?: 'round' | 'butt' | 'square';
    animated?: boolean;
    duration?: number;
    colors?: Partial<CircularProgressColors>;
    /**
     * 'inside'  — percentage / label rendered centred inside the ring (default)
     * 'stacked' — text sits below the ring
     * 'center'  — alias for 'inside' (backwards-compat)
     */
    contentPosition?: 'inside' | 'center' | 'stacked';
    children?: React.ReactNode;
}
export declare const StyledCircularProgress: React.FC<StyledCircularProgressProps>;
//# sourceMappingURL=index.d.ts.map