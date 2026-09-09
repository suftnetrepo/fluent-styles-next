import { ViewStyle } from 'react-native';
/**
 * A raw variant value as it arrives from a prop. Numeric props (e.g. `width={100}`)
 * come through as `number`, string props (e.g. `width="100%"`) come through as `string`.
 */
type RawValue = string | number | null | undefined;
export declare const viewStyleVariants: {
    width: (selected: RawValue) => ViewStyle;
    height: (selected: RawValue) => ViewStyle;
    minWidth: (selected: RawValue) => ViewStyle;
    maxWidth: (selected: RawValue) => ViewStyle;
    minHeight: (selected: RawValue) => ViewStyle;
    maxHeight: (selected: RawValue) => ViewStyle;
    top: (selected: RawValue) => ViewStyle;
    bottom: (selected: RawValue) => ViewStyle;
    left: (selected: RawValue) => ViewStyle;
    right: (selected: RawValue) => ViewStyle;
    margin: (selected: RawValue) => ViewStyle;
    marginTop: (selected: RawValue) => ViewStyle;
    marginBottom: (selected: RawValue) => ViewStyle;
    marginLeft: (selected: RawValue) => ViewStyle;
    marginRight: (selected: RawValue) => ViewStyle;
    marginHorizontal: (selected: RawValue) => ViewStyle;
    marginVertical: (selected: RawValue) => ViewStyle;
    padding: (selected: RawValue) => ViewStyle;
    paddingTop: (selected: RawValue) => ViewStyle;
    paddingBottom: (selected: RawValue) => ViewStyle;
    paddingLeft: (selected: RawValue) => ViewStyle;
    paddingRight: (selected: RawValue) => ViewStyle;
    paddingHorizontal: (selected: RawValue) => ViewStyle;
    paddingVertical: (selected: RawValue) => ViewStyle;
    borderWidth: (selected: RawValue) => ViewStyle;
    borderTopWidth: (selected: RawValue) => ViewStyle;
    borderBottomWidth: (selected: RawValue) => ViewStyle;
    borderLeftWidth: (selected: RawValue) => ViewStyle;
    borderRightWidth: (selected: RawValue) => ViewStyle;
    borderRadius: (selected: RawValue) => ViewStyle;
    borderTopLeftRadius: (selected: RawValue) => ViewStyle;
    borderTopRightRadius: (selected: RawValue) => ViewStyle;
    borderBottomLeftRadius: (selected: RawValue) => ViewStyle;
    borderBottomRightRadius: (selected: RawValue) => ViewStyle;
    borderColor: (selected: RawValue) => ViewStyle;
    borderTopColor: (selected: RawValue) => ViewStyle;
    borderBottomColor: (selected: RawValue) => ViewStyle;
    borderLeftColor: (selected: RawValue) => ViewStyle;
    borderRightColor: (selected: RawValue) => ViewStyle;
    backgroundColor: (selected: RawValue) => ViewStyle;
    opacity: (selected: RawValue) => ViewStyle;
    rotation: (selected: RawValue) => ViewStyle;
    scale: (selected: RawValue) => ViewStyle;
    shadowOpacity: (selected: RawValue) => ViewStyle;
    shadowRadius: (selected: RawValue) => ViewStyle;
    shadowColor: (selected: RawValue) => ViewStyle;
    elevation: (selected: RawValue) => ViewStyle;
    zIndex: (selected: RawValue) => ViewStyle;
};
export declare const viewStyleStringVariants: {
    position: {
        absolute: ViewStyle;
        relative: ViewStyle;
    };
    flexDirection: {
        row: ViewStyle;
        column: ViewStyle;
        'row-reverse': ViewStyle;
        'column-reverse': ViewStyle;
    };
    justifyContent: {
        'flex-start': ViewStyle;
        'flex-end': ViewStyle;
        center: ViewStyle;
        'space-between': ViewStyle;
        'space-around': ViewStyle;
        'space-evenly': ViewStyle;
    };
    alignItems: {
        'flex-start': ViewStyle;
        'flex-end': ViewStyle;
        center: ViewStyle;
        stretch: ViewStyle;
        baseline: ViewStyle;
    };
    alignSelf: {
        auto: ViewStyle;
        'flex-start': ViewStyle;
        'flex-end': ViewStyle;
        center: ViewStyle;
        stretch: ViewStyle;
        baseline: ViewStyle;
    };
    alignContent: {
        'flex-start': ViewStyle;
        'flex-end': ViewStyle;
        center: ViewStyle;
        stretch: ViewStyle;
        'space-between': ViewStyle;
        'space-around': ViewStyle;
    };
    flexWrap: {
        wrap: ViewStyle;
        nowrap: ViewStyle;
        'wrap-reverse': ViewStyle;
    };
    overflow: {
        visible: ViewStyle;
        hidden: ViewStyle;
        scroll: ViewStyle;
    };
    display: {
        flex: ViewStyle;
        none: ViewStyle;
    };
    borderStyle: {
        solid: ViewStyle;
        dotted: ViewStyle;
        dashed: ViewStyle;
    };
    flex: (selected: RawValue) => ViewStyle;
    flexBasis: (selected: RawValue) => ViewStyle;
    flexGrow: (selected: RawValue) => ViewStyle;
    flexShrink: (selected: RawValue) => ViewStyle;
    gap: (selected: RawValue) => ViewStyle;
    columnGap: (selected: RawValue) => ViewStyle;
    rowGap: (selected: RawValue) => ViewStyle;
};
export {};
//# sourceMappingURL=viewStyleVariants.d.ts.map