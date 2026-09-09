import { ViewStyle } from 'react-native';

/**
 * A raw variant value as it arrives from a prop. Numeric props (e.g. `width={100}`)
 * come through as `number`, string props (e.g. `width="100%"`) come through as `string`.
 */
type RawValue = string | number | null | undefined;

/**
 * Parses a raw prop value into a React Native `DimensionValue` (`number | \`${number}%\``).
 *
 * `parseFloat` alone silently discards any trailing unit (e.g. `parseFloat('100%') === 100`),
 * which turns a percentage into a plain pixel value. This keeps the `%` suffix intact when
 * present, and otherwise numerically parses the value (so `"16px"`, `"16dp"`, `16`, `"16"`
 * all resolve to the number `16`, matching the previous behaviour for non-percentage units).
 */
const parseDimension = (
  selected: RawValue,
  { min, max }: { min?: number; max?: number } = {}
): number | `${number}%` | undefined => {
  if (selected === null || selected === undefined) return undefined;

  if (typeof selected === 'number') {
    if (isNaN(selected)) return undefined;
    if (min !== undefined && selected < min) return undefined;
    if (max !== undefined && selected > max) return undefined;
    return selected;
  }

  const trimmed = selected.trim();
  if (trimmed === '') return undefined;

  const isPercent = trimmed.endsWith('%');
  const numeric = parseFloat(trimmed);
  if (isNaN(numeric)) return undefined;
  if (min !== undefined && numeric < min) return undefined;
  if (max !== undefined && numeric > max) return undefined;

  return isPercent ? (`${numeric}%` as `${number}%`) : numeric;
};

export const viewStyleVariants = {

  width: (selected: RawValue) => {
    const value = parseDimension(selected, { min: 0 });
    if (value === undefined) return {};
    return { width: value } as ViewStyle;
  },

  height: (selected: RawValue) => {
    const value = parseDimension(selected, { min: 0 });
    if (value === undefined) return {};
    return { height: value } as ViewStyle;
  },

  minWidth: (selected: RawValue) => {
    const value = parseDimension(selected, { min: 0 });
    if (value === undefined) return {};
    return { minWidth: value } as ViewStyle;
  },

  maxWidth: (selected: RawValue) => {
    const value = parseDimension(selected, { min: 0 });
    if (value === undefined) return {};
    return { maxWidth: value } as ViewStyle;
  },

  minHeight: (selected: RawValue) => {
    const value = parseDimension(selected, { min: 0 });
    if (value === undefined) return {};
    return { minHeight: value } as ViewStyle;
  },

  maxHeight: (selected: RawValue) => {
    const value = parseDimension(selected, { min: 0 });
    if (value === undefined) return {};
    return { maxHeight: value } as ViewStyle;
  },

  // Position Properties
  top: (selected: RawValue) => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return { top: value } as ViewStyle;
  },

  bottom: (selected: RawValue) => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return { bottom: value } as ViewStyle;
  },

  left: (selected: RawValue) => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return { left: value } as ViewStyle;
  },

  right: (selected: RawValue) => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return { right: value } as ViewStyle;
  },

  // Margin Properties
  margin: (selected: RawValue) => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return { margin: value } as ViewStyle;
  },

  marginTop: (selected: RawValue) => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return { marginTop: value } as ViewStyle;
  },

  marginBottom: (selected: RawValue) => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return { marginBottom: value } as ViewStyle;
  },

  marginLeft: (selected: RawValue) => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return { marginLeft: value } as ViewStyle;
  },

  marginRight: (selected: RawValue) => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return { marginRight: value } as ViewStyle;
  },

  marginHorizontal: (selected: RawValue) => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return { marginHorizontal: value } as ViewStyle;
  },

  marginVertical: (selected: RawValue) => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return { marginVertical: value } as ViewStyle;
  },

  // Padding Properties
  padding: (selected: RawValue) => {
    const value = parseDimension(selected, { min: 0 });
    if (value === undefined) return {};
    return { padding: value } as ViewStyle;
  },

  paddingTop: (selected: RawValue) => {
    const value = parseDimension(selected, { min: 0 });
    if (value === undefined) return {};
    return { paddingTop: value } as ViewStyle;
  },

  paddingBottom: (selected: RawValue) => {
    const value = parseDimension(selected, { min: 0 });
    if (value === undefined) return {};
    return { paddingBottom: value } as ViewStyle;
  },

  paddingLeft: (selected: RawValue) => {
    const value = parseDimension(selected, { min: 0 });
    if (value === undefined) return {};
    return { paddingLeft: value } as ViewStyle;
  },

  paddingRight: (selected: RawValue) => {
    const value = parseDimension(selected, { min: 0 });
    if (value === undefined) return {};
    return { paddingRight: value } as ViewStyle;
  },

  paddingHorizontal: (selected: RawValue) => {
    const value = parseDimension(selected, { min: 0 });
    if (value === undefined) return {};
    return { paddingHorizontal: value } as ViewStyle;
  },

  paddingVertical: (selected: RawValue) => {
    const value = parseDimension(selected, { min: 0 });
    if (value === undefined) return {};
    return { paddingVertical: value } as ViewStyle;
  },

  // Border Properties
  borderWidth: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { borderWidth: value } as ViewStyle;
  },

  borderTopWidth: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { borderTopWidth: value } as ViewStyle;
  },

  borderBottomWidth: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { borderBottomWidth: value } as ViewStyle;
  },

  borderLeftWidth: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { borderLeftWidth: value } as ViewStyle;
  },

  borderRightWidth: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { borderRightWidth: value } as ViewStyle;
  },

  // Border Radius Properties
  borderRadius: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { borderRadius: value } as ViewStyle;
  },

  borderTopLeftRadius: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { borderTopLeftRadius: value } as ViewStyle;
  },

  borderTopRightRadius: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { borderTopRightRadius: value } as ViewStyle;
  },

  borderBottomLeftRadius: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { borderBottomLeftRadius: value } as ViewStyle;
  },

  borderBottomRightRadius: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { borderBottomRightRadius: value } as ViewStyle;
  },

  // Border Color Properties (accept color strings)
  borderColor: (selected: RawValue) => {
    if (!selected || String(selected).trim() === '') return {};
    return { borderColor: selected } as ViewStyle;
  },

  borderTopColor: (selected: RawValue) => {
    if (!selected || String(selected).trim() === '') return {};
    return { borderTopColor: selected } as ViewStyle;
  },

  borderBottomColor: (selected: RawValue) => {
    if (!selected || String(selected).trim() === '') return {};
    return { borderBottomColor: selected } as ViewStyle;
  },

  borderLeftColor: (selected: RawValue) => {
    if (!selected || String(selected).trim() === '') return {};
    return { borderLeftColor: selected } as ViewStyle;
  },

  borderRightColor: (selected: RawValue) => {
    if (!selected || String(selected).trim() === '') return {};
    return { borderRightColor: selected } as ViewStyle;
  },

  // Background Properties
  backgroundColor: (selected: RawValue) => {
    if (!selected || String(selected).trim() === '') return {};
    return { backgroundColor: selected } as ViewStyle;
  },

  opacity: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0 || value > 1) return {};
    return { opacity: value } as ViewStyle;
  },

  // Transform Properties (simplified - only scale, rotate)
  rotation: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value)) return {};
    return { transform: [{ rotate: `${value}deg` }] } as ViewStyle;
  },

  scale: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { transform: [{ scale: value }] } as ViewStyle;
  },

  // Shadow Properties (iOS)
  shadowOpacity: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0 || value > 1) return {};
    return { shadowOpacity: value } as ViewStyle;
  },

  shadowRadius: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { shadowRadius: value } as ViewStyle;
  },

  shadowColor: (selected: RawValue) => {
    if (!selected || String(selected).trim() === '') return {};
    return { shadowColor: selected } as ViewStyle;
  },

  // Elevation (Android)
  elevation: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { elevation: value } as ViewStyle;
  },

  // Z-Index
  zIndex: (selected: RawValue) => {
    const value = parseInt(String(selected), 10);
    if (isNaN(value)) return {};
    return { zIndex: value } as ViewStyle;
  },
};

export const viewStyleStringVariants = {
  position: {
    absolute: { position: 'absolute' } as ViewStyle,
    relative: { position: 'relative' } as ViewStyle,
  },

  flexDirection: {
    row: { flexDirection: 'row' } as ViewStyle,
    column: { flexDirection: 'column' } as ViewStyle,
    'row-reverse': { flexDirection: 'row-reverse' } as ViewStyle,
    'column-reverse': { flexDirection: 'column-reverse' } as ViewStyle,
  },

  justifyContent: {
    'flex-start': { justifyContent: 'flex-start' } as ViewStyle,
    'flex-end': { justifyContent: 'flex-end' } as ViewStyle,
    center: { justifyContent: 'center' } as ViewStyle,
    'space-between': { justifyContent: 'space-between' } as ViewStyle,
    'space-around': { justifyContent: 'space-around' } as ViewStyle,
    'space-evenly': { justifyContent: 'space-evenly' } as ViewStyle,
  },

  alignItems: {
    'flex-start': { alignItems: 'flex-start' } as ViewStyle,
    'flex-end': { alignItems: 'flex-end' } as ViewStyle,
    center: { alignItems: 'center' } as ViewStyle,
    stretch: { alignItems: 'stretch' } as ViewStyle,
    baseline: { alignItems: 'baseline' } as ViewStyle,
  },

  alignSelf: {
    auto: { alignSelf: 'auto' } as ViewStyle,
    'flex-start': { alignSelf: 'flex-start' } as ViewStyle,
    'flex-end': { alignSelf: 'flex-end' } as ViewStyle,
    center: { alignSelf: 'center' } as ViewStyle,
    stretch: { alignSelf: 'stretch' } as ViewStyle,
    baseline: { alignSelf: 'baseline' } as ViewStyle,
  },

  alignContent: {
    'flex-start': { alignContent: 'flex-start' } as ViewStyle,
    'flex-end': { alignContent: 'flex-end' } as ViewStyle,
    center: { alignContent: 'center' } as ViewStyle,
    stretch: { alignContent: 'stretch' } as ViewStyle,
    'space-between': { alignContent: 'space-between' } as ViewStyle,
    'space-around': { alignContent: 'space-around' } as ViewStyle,
  },

  flexWrap: {
    wrap: { flexWrap: 'wrap' } as ViewStyle,
    nowrap: { flexWrap: 'nowrap' } as ViewStyle,
    'wrap-reverse': { flexWrap: 'wrap-reverse' } as ViewStyle,
  },

  overflow: {
    visible: { overflow: 'visible' } as ViewStyle,
    hidden: { overflow: 'hidden' } as ViewStyle,
    scroll: { overflow: 'scroll' } as ViewStyle,
  },

  display: {
    flex: { display: 'flex' } as ViewStyle,
    none: { display: 'none' } as ViewStyle,
  },

  borderStyle: {
    solid: { borderStyle: 'solid' } as ViewStyle,
    dotted: { borderStyle: 'dotted' } as ViewStyle,
    dashed: { borderStyle: 'dashed' } as ViewStyle,
  },
  // Flexbox Properties
  flex: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { flex: value } as ViewStyle;
  },

  flexBasis: (selected: RawValue) => {
    const value = parseDimension(selected);
    if (value === undefined) return {};
    return { flexBasis: value } as ViewStyle;
  },

  flexGrow: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { flexGrow: value } as ViewStyle;
  },

  flexShrink: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { flexShrink: value } as ViewStyle;
  },

  // Gap Properties (for newer React Native versions)
  gap: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { gap: value } as ViewStyle;
  },

  columnGap: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { columnGap: value } as ViewStyle;
  },

  rowGap: (selected: RawValue) => {
    const value = parseFloat(String(selected));
    if (isNaN(value) || value < 0) return {};
    return { rowGap: value } as ViewStyle;
  },
};
