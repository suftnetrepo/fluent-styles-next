/**
 * StyledTimeline.tsx
 * ──────────────────
 * A fully reusable, data-driven vertical timeline component for fluent-styles.
 *
 * Features:
 *  • Accepts JSON data OR React children (or both)
 *  • Animated dot entrance on mount
 *  • Customisable dot size, colour, line style, connector colour
 *  • Time label column on the left (start + end)
 *  • Right content slot: any ReactNode per item
 *  • Variants: default · compact · spacious
 *  • Full TypeScript props
 */
import React from 'react';
export type TimelineVariant = 'default' | 'compact' | 'spacious';
export type TimelineDotShape = 'circle' | 'filled' | 'ring';
export interface TimelineItem {
    /** Unique key for this entry */
    id: string;
    /** Primary time label (e.g. "11:35") */
    time: string;
    /** Secondary time label shown below primary (e.g. "13:05") */
    endTime?: string;
    /**
     * Arbitrary content rendered to the right of the timeline.
     * If provided, `renderItem` and the data fields below are ignored.
     */
    content?: React.ReactNode;
    title?: string;
    subtitle?: string;
    description?: string;
    /** Any extra data you want to pass through */
    meta?: Record<string, unknown>;
}
export interface StyledTimelineColors {
    /** Vertical connector line. Default: theme.colors.gray[200] */
    line?: string;
    /** Default dot fill/stroke. Default: '#8bc34a' */
    dot?: string;
    /** Dot border (for 'ring' shape). Default: palettes.white */
    dotBorder?: string;
    /** Time text colour. Default: theme.colors.gray[900] */
    timeText?: string;
    /** Secondary time (endTime) colour. Default: theme.colors.gray[400] */
    endTimeText?: string;
}
export interface StyledTimelineProps {
    /**
     * Array of timeline entries.
     * Each item must have `id` and `time`.
     * Provide `content` for fully custom rendering, or use convenience fields.
     */
    items?: TimelineItem[];
    /**
     * Custom render function per item.
     * Receives the item and its index.
     * Takes priority over `item.content` and the default renderer.
     */
    renderItem?: (item: TimelineItem, index: number) => React.ReactNode;
    /**
     * React children are appended after `items` in the timeline.
     * Each direct child is treated as a standalone timeline entry
     * WITHOUT a time label — useful for one-off custom nodes.
     */
    children?: React.ReactNode;
    /** Visual density. Default: 'default' */
    variant?: TimelineVariant;
    /** Dot shape. Default: 'filled' */
    dotShape?: TimelineDotShape;
    /** Dot diameter in px. Default: 10 */
    dotSize?: number;
    /** Width of the time label column. Default: 56 */
    timeColumnWidth?: number;
    /** Gap between the time column and the content area. Default: 16 */
    timeGap?: number;
    /** Whether to animate dots on mount. Default: true */
    animated?: boolean;
    /** Colour overrides */
    colors?: StyledTimelineColors;
    /** Called when an item is pressed (only fires if item has no custom onPress) */
    onItemPress?: (item: TimelineItem) => void;
}
/**
 * StyledTimeline — vertical data-driven timeline for fluent-styles apps.
 *
 * @example JSON-driven (minimal)
 * ```tsx
 * <StyledTimeline
 *   items={[
 *     { id: '1', time: '09:00', title: 'Morning Run',    subtitle: 'Cardio · 5km'  },
 *     { id: '2', time: '11:30', title: 'Strength Class', subtitle: 'Upper body'    },
 *     { id: '3', time: '14:00', title: 'Yoga',           subtitle: 'Recovery'      },
 *   ]}
 * />
 * ```
 *
 * @example Custom renderItem
 * ```tsx
 * <StyledTimeline
 *   items={workoutItems}
 *   renderItem={(item) => <WorkoutCard item={item} />}
 * />
 * ```
 *
 * @example Mixed: data + inline children
 * ```tsx
 * <StyledTimeline items={scheduleItems}>
 *   <NoteCard note="Don't forget to hydrate!" />
 * </StyledTimeline>
 * ```
 *
 * @example Custom colours
 * ```tsx
 * <StyledTimeline
 *   items={items}
 *   colors={{ dot: '#2196f3', line: '#bbdefb' }}
 *   dotShape="ring"
 *   variant="spacious"
 * />
 * ```
 */
export declare const StyledTimeline: React.FC<StyledTimelineProps>;
export default StyledTimeline;
//# sourceMappingURL=index.d.ts.map