import React, { forwardRef, ComponentType, ReactElement } from "react";
import { ViewStyle, TextStyle, ImageStyle } from "react-native";

type Style = ViewStyle | TextStyle | ImageStyle;

type VariantFunction<P extends Record<string, any> = Record<string, any>> = (
  value: any,
  options: P
) => Style | undefined;

type VariantOption<P extends Record<string, any> = Record<string, any>> =
  | Style
  | VariantFunction<P>;

type VariantConfig<P extends Record<string, any> = Record<string, any>> =
  | VariantFunction<P>
  | { [key: string]: VariantOption<P> };

interface StyledOptions<P extends Record<string, any> = Record<string, any>> {
  base?: Style;
  variants?: { [key: string]: VariantConfig<P> };
}

type StyledComponent<P extends Record<string, any>> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<any>
>;

// List of known component props that should not be treated as styles
const COMPONENT_PROPS = new Set([
  'children',
  'onPress',
  'onPressIn',
  'onPressOut',
  'onLongPress',
  'disabled',
  'activeOpacity',
  'delayLongPress',
  'delayPressIn',
  'delayPressOut',
  'hitSlop',
  'pressRetentionOffset',
  'testID',
  'accessible',
  'accessibilityLabel',
  'accessibilityHint',
  'accessibilityRole',
  'accessibilityState',
  'accessibilityValue',
  'accessibilityActions',
  'onAccessibilityAction',
  'accessibilityLiveRegion',
  'importantForAccessibility',
  'accessibilityElementsHidden',
  'accessibilityViewIsModal',
  'onAccessibilityEscape',
  'onAccessibilityTap',
  'onMagicTap',
  'accessibilityIgnoresInvertColors',
  'ref',
  'style',
]);

const styled = <P extends Record<string, any> = Record<string, any>>(
  Component: ComponentType<P>,
  { base = {}, variants = {} }: StyledOptions<P> = {}
): StyledComponent<P> => {
  return forwardRef<any, P>((props, ref): ReactElement => {
    const styles: Style = { ...base };
    const options = props as P;
    const variantKeys = Object.keys(variants);
    
    // Separate component props from style props
    const componentProps: Record<string, any> = {};
    const declarativeStyleProps: Record<string, any> = {};
    
    Object.keys(props).forEach((key) => {
      if (COMPONENT_PROPS.has(key) || variantKeys.includes(key)) {
        componentProps[key] = props[key];
      } else {
        declarativeStyleProps[key] = props[key];
      }
    });

    // Apply variant styles
    Object.keys(variants).forEach((category) => {
      const variantSelected = options[category];
      const variantValue = variants[category] as any;

      if (typeof variantValue === "function") {
        const style = variantValue(variantSelected, options);
        if (style) {
          Object.assign(styles, style);
        }
      } else if (variantValue && variantValue[variantSelected]) {
        const value = variantValue[variantSelected];
        Object.assign(
          styles,
          typeof value === "function" ? value(variantSelected, options) : value
        );
      }
    });

    // Merge declarative style props last (so they override variant styles)
    Object.assign(styles, declarativeStyleProps);

    return <Component {...(componentProps as any)} style={styles} ref={ref} />;
  });
};

export { styled };
export type { StyledOptions, VariantFunction, VariantConfig };