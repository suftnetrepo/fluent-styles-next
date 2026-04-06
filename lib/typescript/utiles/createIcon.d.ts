import React from 'react';
/**
 * Creates a reusable icon component with standardised size, color, and strokeWidth props.
 *
 * @template P - Additional props passed through to the underlying Svg element
 *
 * @param {IconRenderer<P>} renderer - A render function that receives resolved icon props
 *   and any extra SVG props, and returns a React element containing the Svg markup.
 *
 * @returns {React.FC<IconProps & P>} A React functional component that accepts:
 *   - `size`        {number}  Width and height in dp. Default: `24`
 *   - `color`       {string}  Stroke (and optional fill) color. Default: `"currentColor"`
 *   - `strokeWidth` {number}  Stroke thickness in SVG units. Default: `1.5`
 *   - `...props`    {P}       Any additional props forwarded to the Svg element
 *
 * @example
 * const BackArrow = createIcon(({ size, color, strokeWidth }, props) => (
 *   <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
 *     <Path d="M19 12H5"      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
 *     <Path d="M12 19l-7-7 7-7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
 *   </Svg>
 * ))
 *
 * // Usage
 * <BackArrow size={20} color={theme.text} strokeWidth={2} />
 */
type IconProps = {
    size?: number;
    color?: string;
    strokeWidth?: number;
    [key: string]: any;
};
type IconRenderer = (props: IconProps, svgProps: any) => React.ReactElement;
export declare function createIcon(renderer: IconRenderer): {
    ({ size, color, strokeWidth, ...props }: IconProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    displayName: string;
};
export {};
//# sourceMappingURL=createIcon.d.ts.map