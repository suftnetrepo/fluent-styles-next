import React from 'react';
import type { ColorValue, ViewProps } from 'react-native';
export interface SpinnerProps extends ViewProps {
    /**
     * Size of the spinner in pixels
     * @default 32
     */
    size?: number;
    /**
     * Color of the spinner petals
     * @default '#888888'
     */
    color?: ColorValue;
    /**
     * Duration of one full rotation in milliseconds
     * @default 800
     */
    duration?: number;
}
declare const Spinner: React.FC<SpinnerProps>;
export { Spinner };
//# sourceMappingURL=spinner.d.ts.map