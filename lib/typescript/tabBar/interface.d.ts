import type React from 'react';
import type { ColorValue, StyleProp, ViewStyle } from 'react-native';
export type TabValue = number | string;
export type TabItem<T extends TabValue> = {
    /** Unique identifier for this tab. */
    value: T;
    /** Display label. */
    label: string;
    /**
     * Badge rendered beside the label.
     * - number → shown as-is
     * - string → shown as-is (pass '' to show a dot badge)
     */
    badge?: number | string;
    /**
     * Renders an icon above (or instead of) the label.
     * Receives the resolved icon colour and the active state.
     */
    iconRender?: (color: ColorValue, isActive: boolean) => React.ReactElement;
    /** Disable this specific tab. */
    disabled?: boolean;
};
export type IndicatorStyle = 'line' | 'pill' | 'dot';
export type TabBarVariant = 'default' | 'underline' | 'card' | 'solid';
export type TabBarColors = {
    /** Bar background. */
    background: string;
    /** Inactive tab label + icon. */
    text: string;
    /** Active tab label + icon. */
    activeText: string;
    /** Underline / pill / dot indicator. */
    indicator: string;
    /** Badge text. */
    badge: string;
    /** Bar bottom border (underline variant). */
    border: string;
    /** Active chip background (solid/card variant). */
    activeChipBg: string;
    /** Active chip text (solid/card variant). */
    activeChipText: string;
    /** Disabled tab. */
    disabled: string;
};
export declare const TAB_BAR_COLORS_LIGHT: TabBarColors;
export declare const TAB_BAR_COLORS_DARK: TabBarColors;
export interface TabBarProps<T extends TabValue> {
    /** Tab options. Memoize this array to avoid spurious re-renders. */
    options: TabItem<T>[];
    /** Controlled active value. */
    value?: T;
    /** Uncontrolled initial value. Defaults to options[0].value. */
    defaultValue?: T;
    /** Called when the active tab changes. */
    onChange?: (value: T) => void;
    /**
     * Indicator style shown on the active tab.
     * - `'line'` — animated bottom line (classic underline)
     * - `'pill'` — animated pill that slides behind the active tab
     * - `'dot'`  — small dot below the label
     * - `false`  — no indicator (default)
     */
    indicator?: false | IndicatorStyle;
    /**
     * Explicit indicator width in px.
     * - Omit → matches label text width (line) or tab width (pill).
     * - `0`  → stretches to tab width.
     */
    indicatorWidth?: number;
    /**
     * Indicator height in px.
     * - line default: 3
     * - pill: auto (covers whole tab)
     * - dot: 6
     */
    indicatorHeight?: number;
    /** Indicator colour override. Falls back to `colors.indicator`. */
    indicatorColor?: ColorValue;
    /** Border radius of the indicator shape. */
    indicatorRadius?: number;
    /**
     * - `'center'` — tabs divide the bar equally (no scroll).
     * - `'scroll'` — tabs are natural width; bar scrolls horizontally.
     */
    tabAlign?: 'center' | 'scroll';
    /**
     * Fixed height for the bar.
     * Defaults: 48 with icons, 44 with indicator, 40 plain.
     */
    height?: number;
    /**
     * Visual style preset.
     * @default 'default'
     */
    variant?: TabBarVariant;
    /** Scale factor for the active label (pop / bulge effect). @default 1 */
    labelBulge?: number | boolean;
    /** Show a persistent bottom border on the bar. @default false */
    showBorder?: boolean;
    /** Padding inside each tab. @default 12 */
    tabPaddingHorizontal?: number;
    /** Gap between icon and label. @default 4 */
    iconLabelGap?: number;
    /** Font size for tab labels. @default 14 */
    fontSize?: number;
    /** Font size for labels when tabs also have icons. @default 11 */
    iconFontSize?: number;
    /** Explicit text/icon colour for inactive tabs. */
    textColor?: ColorValue;
    /** Explicit text/icon colour for active tab. */
    activeTextColor?: ColorValue;
    /** Fine-grained colour token overrides. */
    colors?: Partial<TabBarColors>;
    style?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    tabStyle?: StyleProp<ViewStyle>;
    testID?: string;
}
//# sourceMappingURL=interface.d.ts.map