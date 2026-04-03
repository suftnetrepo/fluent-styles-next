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

import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import {
  Stack,
  StyledText,
  StyledPressable,
  theme,
  palettes,
} from 'fluent-styles';

// ─── Types ────────────────────────────────────────────────────────────────────

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
  // ── Convenience data fields (used by default renderItem) ──
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

// ─── Size tokens ──────────────────────────────────────────────────────────────

const VARIANT_GAP: Record<TimelineVariant, number> = {
  compact:  12,
  default:  20,
  spacious: 32,
};

// ─── Animated dot ─────────────────────────────────────────────────────────────

const TimelineDot: React.FC<{
  size: number;
  color: string;
  borderColor: string;
  shape: TimelineDotShape;
  animated: boolean;
  delay: number;
}> = ({ size, color, borderColor, shape, animated: anim, delay }) => {
  const scale = useRef(new Animated.Value(anim ? 0 : 1)).current;

  useEffect(() => {
    if (!anim) return;
    Animated.timing(scale, {
      toValue:         1,
      duration:        300,
      delay,
      easing:          Easing.out(Easing.back(1.8)),
      useNativeDriver: true,
    }).start();
  }, []);

  const inner =
    shape === 'circle' ? (
      <Stack
        width={size}
        height={size}
        borderRadius={size / 2}
        backgroundColor="transparent"
        borderWidth={2}
        borderColor={color}
      />
    ) : shape === 'ring' ? (
      <Stack
        width={size}
        height={size}
        borderRadius={size / 2}
        backgroundColor={borderColor}
        borderWidth={2.5}
        borderColor={color}
      />
    ) : (
      // filled (default)
      <Stack
        width={size}
        height={size}
        borderRadius={size / 2}
        backgroundColor={color}
      />
    );

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      {inner}
    </Animated.View>
  );
};

// ─── Default item renderer ────────────────────────────────────────────────────

const DefaultItemContent: React.FC<{ item: TimelineItem }> = ({ item }) => (
  <Stack flex={1} gap={4}>
    {item.title && (
      <StyledText
        fontSize={theme.fontSize.normal}
        fontWeight={theme.fontWeight.semiBold}
        color={theme.colors.gray[900]}
      >
        {item.title}
      </StyledText>
    )}
    {item.subtitle && (
      <StyledText fontSize={theme.fontSize.small} color={theme.colors.gray[500]}>
        {item.subtitle}
      </StyledText>
    )}
    {item.description && (
      <StyledText fontSize={theme.fontSize.small} color={theme.colors.gray[400]}>
        {item.description}
      </StyledText>
    )}
  </Stack>
);

// ─── StyledTimeline ───────────────────────────────────────────────────────────

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
export const StyledTimeline: React.FC<StyledTimelineProps> = ({
  items = [],
  renderItem,
  children,
  variant           = 'default',
  dotShape          = 'filled',
  dotSize           = 10,
  timeColumnWidth   = 56,
  timeGap           = 16,
  animated          = true,
  colors: colorsProp,
  onItemPress,
}) => {
  const C = {
    line:        colorsProp?.line        ?? theme.colors.gray[200],
    dot:         colorsProp?.dot         ?? '#8bc34a',
    dotBorder:   colorsProp?.dotBorder   ?? palettes.white,
    timeText:    colorsProp?.timeText    ?? theme.colors.gray[900],
    endTimeText: colorsProp?.endTimeText ?? theme.colors.gray[400],
  };

  const gap         = VARIANT_GAP[variant];
  const childArray  = React.Children.toArray(children);

  // Convert children into pseudo-items so they render in the same loop
  const childItems: TimelineItem[] = childArray.map((child, i) => ({
    id:      `__child_${i}`,
    time:    '',
    content: child as React.ReactNode,
  }));

  const allItems = [...items, ...childItems];

  // ── Row height measurement for line drawing ──────────────────────────────
  // We use a simple layout: each row renders into a measured Stack.
  // The connector line is drawn as a fixed-width left column overlay.

  return (
    <Stack>
      {allItems.map((item, index) => {
        const isLast   = index === allItems.length - 1;
        const hasTime  = !!item.time;

        // Resolve content
        const resolvedContent = item.content
          ? item.content
          : renderItem
          ? renderItem(item, index)
          : <DefaultItemContent item={item} />;

        return (
          <Stack key={item.id} horizontal alignItems="stretch">

            {/* ── Left: time + connector ── */}
            <Stack width={timeColumnWidth} alignItems="flex-end" paddingRight={12}>

              {/* Time labels */}
              <Stack alignItems="flex-end" gap={2} paddingTop={2}>
                {hasTime && (
                  <StyledText
                    fontSize={theme.fontSize.normal}
                    fontWeight={theme.fontWeight.semiBold}
                    color={C.timeText}
                    numberOfLines={1}
                  >
                    {item.time}
                  </StyledText>
                )}
                {item.endTime && (
                  <StyledText
                    fontSize={theme.fontSize.small}
                    color={C.endTimeText}
                    numberOfLines={1}
                  >
                    {item.endTime}
                  </StyledText>
                )}
              </Stack>
            </Stack>

            {/* ── Centre: dot + vertical line ── */}
            <Stack alignItems="center" width={dotSize + 12}>

              {/* Dot */}
              <Stack paddingTop={4}>
                <TimelineDot
                  size={dotSize}
                  color={C.dot}
                  borderColor={C.dotBorder}
                  shape={dotShape}
                  animated={animated}
                  delay={index * 60}
                />
              </Stack>

              {/* Connector line below the dot */}
              {!isLast && (
                <Stack
                  flex={1}
                  width={1.5}
                  backgroundColor={C.line}
                  marginTop={4}
                  marginBottom={0}
                  style={{ minHeight: gap }}
                />
              )}
            </Stack>

            {/* ── Right: content ── */}
            <Stack
              flex={1}
              paddingLeft={timeGap}
              paddingBottom={isLast ? 0 : gap}
            >
              <StyledPressable
                onPress={() => onItemPress?.(item)}
                style={{ flex: 1 }}
              >
                {resolvedContent}
              </StyledPressable>
            </Stack>

          </Stack>
        );
      })}
    </Stack>
  );
};

export default StyledTimeline;