
import React, { ComponentType, Ref, forwardRef } from "react";
import { ViewStyle, TextStyle, ImageStyle } from "react-native";

type Style = ViewStyle | TextStyle | ImageStyle;

interface StyledOptions {
    base?: Style;
    variants?: {
        [key: string]: {
            [variant: string]: Style | ((selected: string, options: any) => Style);
        } | ((selected: string, options: any) => Style);
    };
}

// React 19 passes ref as a regular prop; React 18 and below do not.
const isReact19 = typeof React.version === "string" && parseInt(React.version) >= 19;

const styled = <P extends object>(
    Component: ComponentType<P>,
    { base, variants }: StyledOptions = {}
) => {
    function buildStyles(options: Record<string, any>): Style {
        const styles: Style = { ...(base || {}) };

        if (variants) {
            Object.keys(variants).forEach((category) => {
                const variantSelected = options[category];
                const variantValue = variants[category];

                if (typeof variantValue === "function") {
                    const style = variantValue(variantSelected, options);
                    if (style) Object.assign(styles, style);
                } else if (variantValue && variantValue[variantSelected]) {
                    const value = variantValue[variantSelected];
                    Object.assign(
                        styles,
                        typeof value === "function" ? value(variantSelected, options) : value
                    );
                }
            });
        }

        return styles;
    }

    if (isReact19) {
        // React 19: ref is a plain prop
        function StyledComponent19(props: P & { ref?: Ref<any> }) {
            const { ref, ...rest } = props as any;
            const styles = buildStyles(rest);
            return <Component {...(rest as any)} style={styles} ref={ref} />;
        }
        return StyledComponent19;
    }

    // React 18 and below: use forwardRef
    return forwardRef<any, P>((props, ref) => {
        const styles = buildStyles(props as Record<string, any>);
        return <Component {...(props as any)} style={styles} ref={ref} />;
    });
};

export { styled };
