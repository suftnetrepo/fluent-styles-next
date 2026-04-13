
import React, { ComponentType } from "react";
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

const styled = <P extends object>(
    Component: ComponentType<P>,
    { base, variants }: StyledOptions = {}
) => {
    const StyledComponent = (props: P & { ref?: React.Ref<any> }) => {
        const styles: Style = { ...(base || {}) };
        const options = props as Record<string, any>;
        const cleanProps = { ...options };

        if (variants) {
            Object.keys(variants).forEach((category) => {
                delete cleanProps[category];
                const variantSelected = options[category];
                const variantValue = variants[category];

                if (typeof variantValue === "function") {
                    const style = variantValue(variantSelected, options);
                    if (style) Object.assign(styles, style);
                } else if (variantValue?.[variantSelected]) {
                    const value = variantValue[variantSelected];
                    Object.assign(styles, typeof value === "function" ? value(variantSelected, options) : value);
                }
            });
        }

        return <Component {...(cleanProps as P)} style={styles} />;
    };

    StyledComponent.displayName = `Styled(${
        typeof Component === "string" ? Component : Component.displayName ?? Component.name ?? "Component"
    })`;

    return StyledComponent;
};

export { styled };