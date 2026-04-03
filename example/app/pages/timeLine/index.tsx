/**
 * DailyPlanScreen.tsx
 * ────────────────────
 * Daily fitness planner using:
 *  • react-native-calendars  — horizontal week strip (CalendarProvider + WeekCalendar)
 *  • StyledTimeline          — vertical workout schedule
 *  • fluent-styles           — all layout / UI primitives
 */

import React, { useState, useCallback } from 'react';
import { CalendarProvider } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';
import {
  StyledSafeAreaView,
  StyledScrollView,
  StyledPage,
  StyledCard,
  Stack,
  StyledText,
  StyledPressable,
  StyledImage,
  StyledSpacer,
  StyledDivider,
  theme,
  palettes,
    StyledTimeline,
  type TimelineItem,
} from 'fluent-styles';

// ─── Constants ────────────────────────────────────────────────────────────────

const LIME      = '#c6ef3e';
const LIME_DARK = '#8bc34a';
const DARK      = '#1a1a1e';
const MUTED     = '#9ca3af';
const BG        = '#f5f5f5';

// ─── Workout meta type ────────────────────────────────────────────────────────

interface WorkoutMeta {
  [key: string]: unknown;
  iconName:      string;
  progress:      number;
  progressLabel: string;
  calories:      string;
  bpm:           string;
  duration:      string;
  bgColor:       string;
  iconColor:     string;
}

// ─── Week navigation helpers ──────────────────────────────────────────────────

const DAY_LABELS   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun',
                      'Jul','Aug','Sep','Oct','Nov','Dec'];

/**
 * Safe ISO date helpers — all arithmetic done in LOCAL time,
 * serialised as YYYY-MM-DD without any UTC conversion.
 * This avoids the timezone-offset bug where toISOString() rolls
 * a local midnight date back to the previous UTC day, producing
 * duplicate date strings when a week spans a month boundary.
 */

/** Format a Date as "YYYY-MM-DD" using local calendar fields */
function toISO(d: Date): string {
  const y  = d.getFullYear();
  const m  = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

/** Parse an ISO string into a local-time Date at midnight */
function fromISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** ISO string for today in local time */
const isoToday = (): string => toISO(new Date());

/** Shift an ISO date string by `days` — safe across month/year boundaries */
function shiftDate(iso: string, days: number): string {
  const d = fromISO(iso);
  d.setDate(d.getDate() + days);
  return toISO(d);
}

/**
 * Returns exactly 7 unique ISO date strings for the Sun–Sat week
 * that contains `date`. Uses local-time arithmetic to avoid UTC rollover.
 */
function getWeekDates(date: string): string[] {
  const d   = fromISO(date);
  const dow = d.getDay(); // 0 = Sunday
  // Find the Sunday that starts this week
  const sunday = new Date(d);
  sunday.setDate(d.getDate() - dow);
  // Build 7 days from that Sunday
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(sunday);
    day.setDate(sunday.getDate() + i);
    return toISO(day);
  });
}

/** "Sep 2024" label for a given ISO date — uses local-time fromISO */
function monthLabel(iso: string): string {
  const d = fromISO(iso);
  return `${MONTH_LABELS[d.getMonth()]} ${d.getFullYear()}`;
}

// ─── Schedule templates (offset from today) ──────────────────────────────────
//
// Keys are day offsets from today (0 = today, -1 = yesterday, +1 = tomorrow…).
// buildSchedule() maps these to real ISO dates at runtime so the demo is
// always anchored to the current date regardless of when the app is opened.

interface WorkoutTemplate {
  id: string; time: string; endTime: string; title: string; meta: WorkoutMeta;
}

const SCHEDULE_TEMPLATES: Record<number, WorkoutTemplate[]> = {
  [-3]: [
    { id: 'tm3a', time: '08:00', endTime: '09:30', title: 'Morning Yoga',
      meta: { iconName: 'wind', progress: 0.9, progressLabel: '9 Of 10',
        calories: '240', bpm: '64', duration: '01:30',
        bgColor: '#f0fdf4', iconColor: '#16a34a' } },
  ],
  [-2]: [
    { id: 'tm2a', time: '07:00', endTime: '08:00', title: 'Cycling',
      meta: { iconName: 'activity', progress: 0.5, progressLabel: '3 Of 6',
        calories: '640', bpm: '138', duration: '01:00',
        bgColor: '#eff6ff', iconColor: '#2563eb' } },
    { id: 'tm2b', time: '18:00', endTime: '19:00', title: 'Stretch',
      meta: { iconName: 'feather', progress: 0.8, progressLabel: '4 Of 5',
        calories: '120', bpm: '62', duration: '01:00',
        bgColor: '#fdf4ff', iconColor: '#9333ea' } },
  ],
  // Today — 3 sessions
  [0]: [
    { id: 't0a', time: '11:35', endTime: '13:05', title: 'Cardio',
      meta: { iconName: 'heart', progress: 0.65, progressLabel: '4 Of 6',
        calories: '1200', bpm: '90', duration: '03:00',
        bgColor: '#fff0f0', iconColor: '#dc2626' } },
    { id: 't0b', time: '14:45', endTime: '15:45', title: 'Muscle',
      meta: { iconName: 'zap', progress: 0.62, progressLabel: '5 Of 8',
        calories: '980', bpm: '102', duration: '01:00',
        bgColor: '#fdf4ff', iconColor: '#9333ea' } },
    { id: 't0c', time: '17:00', endTime: '18:00', title: 'Weight Training',
      meta: { iconName: 'trending-up', progress: 0.44, progressLabel: '4 Of 9',
        calories: '800', bpm: '85', duration: '01:00',
        bgColor: '#fff7ed', iconColor: '#ea580c' } },
  ],
  [1]: [
    { id: 't1a', time: '06:30', endTime: '07:30', title: 'Morning Run',
      meta: { iconName: 'navigation', progress: 0, progressLabel: '0 Of 6',
        calories: '520', bpm: '145', duration: '01:00',
        bgColor: '#f0fdf4', iconColor: '#16a34a' } },
    { id: 't1b', time: '16:00', endTime: '17:00', title: 'Swimming',
      meta: { iconName: 'droplet', progress: 0, progressLabel: '0 Of 6',
        calories: '430', bpm: '120', duration: '01:00',
        bgColor: '#eff6ff', iconColor: '#0284c7' } },
  ],
  [2]: [
    { id: 't2a', time: '09:00', endTime: '10:30', title: 'HIIT Session',
      meta: { iconName: 'zap', progress: 0, progressLabel: '0 Of 8',
        calories: '750', bpm: '165', duration: '01:30',
        bgColor: '#fff7ed', iconColor: '#ea580c' } },
  ],
  // +3 = rest day (empty array)
  [3]: [],
  [4]: [
    { id: 't4a', time: '10:00', endTime: '11:30', title: 'Boxing',
      meta: { iconName: 'shield', progress: 0, progressLabel: '0 Of 10',
        calories: '870', bpm: '155', duration: '01:30',
        bgColor: '#fff0f0', iconColor: '#dc2626' } },
    { id: 't4b', time: '19:00', endTime: '20:00', title: 'Evening Yoga',
      meta: { iconName: 'sun', progress: 0, progressLabel: '0 Of 10',
        calories: '120', bpm: '60', duration: '01:00',
        bgColor: '#fefce8', iconColor: '#ca8a04' } },
  ],
};

/**
 * Builds the live schedule keyed by real ISO dates.
 * Called once at module level so it's stable for the app session.
 */
function buildSchedule(): Record<string, TimelineItem[]> {
  const today = isoToday();
  const result: Record<string, TimelineItem[]> = {};
  Object.entries(SCHEDULE_TEMPLATES).forEach(([offsetStr, templates]) => {
    const offset  = parseInt(offsetStr, 10);
    const isoDate = shiftDate(today, offset);
    result[isoDate] = templates.map((t) => ({
      id:      t.id,
      time:    t.time,
      endTime: t.endTime,
      title:   t.title,
      meta:    t.meta,
    }));
  });
  return result;
}

// Live schedule — always relative to today
const SCHEDULE = buildSchedule();

// Dot markers — derived from live schedule
const MARKED_DATES = Object.fromEntries(
  Object.entries(SCHEDULE)
    .filter(([, items]) => items.length > 0)
    .map(([date]) => [date, { marked: true, dotColor: LIME_DARK }]),
);


// ─── WeekStrip ────────────────────────────────────────────────────────────────
//
// Full week navigation strip built entirely from fluent-styles.
//
// Navigation:
//  • < / > chevrons shift the visible week ±7 days
//  • Tapping any day selects it AND moves to that week if needed
//  • "Today" pill resets to the current week + selects today
//
// Props:
//  selectedDate  — ISO string of the currently selected date
//  markedDates   — set of ISO strings that have a dot indicator
//  onSelect      — called with ISO string when a day is tapped or week changes

interface WeekStripProps {
  /** ISO date string of the currently selected/highlighted day */
  selectedDate: string;
  /** ISO date string anchoring which week is visible (owned by parent) */
  anchorDate:   string;
  /** Called when the user navigates weeks or taps a day — parent updates both */
  onSelect:     (date: string) => void;
  /** Called only when the user navigates weeks, so parent can update anchorDate */
  onAnchorChange: (date: string) => void;
  /** Dates that should show a dot indicator */
  markedDates:  Record<string, unknown>;
}

const WeekStrip: React.FC<WeekStripProps> = ({
  selectedDate,
  anchorDate,
  onSelect,
  onAnchorChange,
  markedDates,
}) => {
  // Derive visible week purely from anchorDate — no local state, no side effects
  const weekDates  = getWeekDates(anchorDate);
  const todayIso   = isoToday();
  const isThisWeek = getWeekDates(todayIso).includes(weekDates[0]);

  const prevWeek = () => onAnchorChange(shiftDate(anchorDate, -7));
  const nextWeek = () => onAnchorChange(shiftDate(anchorDate,  7));
  const goToday  = () => { onAnchorChange(todayIso); onSelect(todayIso); };

  return (
    <Stack
      backgroundColor={palettes.white}
      borderBottomWidth={1}
      borderBottomColor={theme.colors.gray[100]}
    >
      {/* ── Month label row + navigation arrows ── */}
      <Stack
        horizontal
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={16}
        paddingTop={10}
        paddingBottom={4}
      >
        {/* Prev week */}
        <StyledPressable
          onPress={prevWeek}
          width={32} height={32} borderRadius={16}
          backgroundColor={theme.colors.gray[100]}
          alignItems="center" justifyContent="center"
        >
          <Icon name="chevron-left" size={16} color={DARK} />
        </StyledPressable>

        {/* Month + year + optional Today pill */}
        <Stack horizontal alignItems="center" gap={10}>
          <StyledText fontSize={14} fontWeight="700" color={DARK}>
            {monthLabel(weekDates[3])}
          </StyledText>
          {!isThisWeek && (
            <StyledPressable
              onPress={goToday}
              paddingHorizontal={10} paddingVertical={3}
              borderRadius={12} backgroundColor={LIME}
            >
              <StyledText fontSize={11} fontWeight="700" color={DARK}>Today</StyledText>
            </StyledPressable>
          )}
        </Stack>

        {/* Next week */}
        <StyledPressable
          onPress={nextWeek}
          width={32} height={32} borderRadius={16}
          backgroundColor={theme.colors.gray[100]}
          alignItems="center" justifyContent="center"
        >
          <Icon name="chevron-right" size={16} color={DARK} />
        </StyledPressable>
      </Stack>

      {/* ── Day cells ── */}
      <Stack horizontal alignItems="center" paddingHorizontal={4} paddingBottom={10}>
        {weekDates.map((iso) => {
          const d          = fromISO(iso);
          const dayNum     = d.getDate();
          const label      = DAY_LABELS[d.getDay()];
          const isSelected = iso === selectedDate;
          const isToday    = iso === todayIso;
          const hasDot     = !!markedDates[iso];

          return (
            <StyledPressable
              key={iso}
              flex={1}
              alignItems="center"
              paddingVertical={2}
              onPress={() => { onSelect(iso); onAnchorChange(iso); }}
            >
              {/* Day name */}
              <StyledText
                fontSize={11}
                fontWeight="500"
                color={isSelected ? LIME_DARK : MUTED}
                marginBottom={5}
              >
                {label}
              </StyledText>

              {/* Date circle */}
              <Stack
                width={36} height={36} borderRadius={18}
                backgroundColor={isSelected ? LIME : 'transparent'}
                alignItems="center" justifyContent="center"
              >
                <StyledText
                  fontSize={17}
                  fontWeight={isSelected ? '800' : isToday ? '800' : '600'}
                  color={isSelected ? DARK : isToday ? LIME_DARK : theme.colors.gray[800]}
                >
                  {dayNum}
                </StyledText>
              </Stack>

              {/* Workout dot */}
              <Stack
                width={5} height={5} borderRadius={2.5} marginTop={4}
                backgroundColor={hasDot ? (isSelected ? DARK : LIME_DARK) : 'transparent'}
              />
            </StyledPressable>
          );
        })}
      </Stack>
    </Stack>
  );
};

// ─── Progress bar ─────────────────────────────────────────────────────────────

const ProgressBar: React.FC<{ progress: number; label: string }> = ({ progress, label }) => (
  <Stack horizontal alignItems="center" gap={8} marginBottom={12}>
    <StyledText fontSize={12} color={MUTED} width={56}>Exercise</StyledText>
    <Stack flex={1} height={5} borderRadius={3} backgroundColor={theme.colors.gray[100]}>
      <Stack
        width={`${Math.round(progress * 100)}%` as any}
        height={5}
        borderRadius={3}
        backgroundColor={LIME_DARK}
      />
    </Stack>
    <StyledText fontSize={12} color={MUTED}>{label}</StyledText>
  </Stack>
);

// ─── Workout card ─────────────────────────────────────────────────────────────

const WorkoutCard: React.FC<{ item: TimelineItem }> = ({ item }) => {
  const m = item.meta as unknown as WorkoutMeta;
  return (
    <StyledCard
      backgroundColor={palettes.white}
      borderRadius={20}
      padding={16}
      shadow="light"
      marginBottom={4}
      borderLeftWidth={4}
      borderLeftColor={m.iconColor}
    >
      <Stack horizontal alignItems="center" justifyContent="space-between" marginBottom={12}>
        <Stack horizontal alignItems="center" gap={10}>
          <Stack
            width={38} height={38} borderRadius={19}
            backgroundColor={m.bgColor} alignItems="center" justifyContent="center"
          >
            <Icon name={m.iconName} size={17} color={m.iconColor} />
          </Stack>
          <StyledText fontSize={16} fontWeight="800" color={DARK}>{item.title}</StyledText>
        </Stack>
        <StyledPressable onPress={() => {}}>
          <Icon name="more-vertical" size={17} color={MUTED} />
        </StyledPressable>
      </Stack>

      <ProgressBar progress={m.progress} label={m.progressLabel} />
      <StyledDivider borderBottomColor={theme.colors.gray[50]} marginBottom={12} />

      <Stack horizontal>
        {[
          { v: m.calories, u: 'kcal', l: 'Calories Burn' },
          { v: m.bpm,      u: 'bpm',  l: 'Heart Rate'    },
          { v: m.duration, u: 'hr',   l: 'Time'          },
        ].map(({ v, u, l }) => (
          <Stack key={l} flex={1} gap={3}>
            <Stack horizontal alignItems="flex-end" gap={2}>
              <StyledText fontSize={20} fontWeight="900" color={DARK}>{v}</StyledText>
              <StyledText fontSize={11} color={MUTED} marginBottom={2}>{u}</StyledText>
            </Stack>
            <StyledText fontSize={11} color={MUTED}>{l}</StyledText>
          </Stack>
        ))}
      </Stack>
    </StyledCard>
  );
};

// ─── Rest day ─────────────────────────────────────────────────────────────────

const RestDay: React.FC = () => (
  <Stack alignItems="center" paddingVertical={48} gap={12}>
    <Stack width={72} height={72} borderRadius={36} backgroundColor="#f0fdf4"
      alignItems="center" justifyContent="center">
      <Icon name="moon" size={28} color={LIME_DARK} />
    </Stack>
    <StyledText fontSize={18} fontWeight="800" color={DARK}>Rest Day</StyledText>
    <StyledText fontSize={14} color={MUTED} textAlign="center">
      Recovery is part of the plan.{'\n'}Rest up and come back stronger 💚
    </StyledText>
  </Stack>
);

// ─── Summary strip ────────────────────────────────────────────────────────────

const SummaryStrip: React.FC<{ items: TimelineItem[] }> = ({ items }) => {
  if (!items.length) return null;
  const totalCal = items.reduce((s, i) => {
    const m = i.meta as unknown as WorkoutMeta;
    return s + parseInt(m.calories.replace(',', ''), 10);
  }, 0);
  return (
    <Stack horizontal gap={10} marginBottom={16} flexWrap="wrap">
      {[
        { icon: 'layers', label: `${items.length} sessions`          },
        { icon: 'zap',    label: `${totalCal.toLocaleString()} kcal` },
      ].map(({ icon, label }) => (
        <Stack key={label} horizontal alignItems="center" gap={6}
          paddingHorizontal={12} paddingVertical={7} borderRadius={20}
          backgroundColor={palettes.white}>
          <Icon name={icon} size={13} color={LIME_DARK} />
          <StyledText fontSize={13} fontWeight="600" color={DARK}>{label}</StyledText>
        </Stack>
      ))}
    </Stack>
  );
};

// ─── Bottom nav ───────────────────────────────────────────────────────────────

type NavKey = 'home' | 'calendar' | 'add' | 'heart' | 'profile';

const NAV_ITEMS: { key: NavKey; icon: string; label: string }[] = [
  { key: 'home',     icon: 'home',     label: 'Home'     },
  { key: 'calendar', icon: 'calendar', label: 'Plan'     },
  { key: 'heart',    icon: 'heart',    label: 'Health'   },
  { key: 'profile',  icon: 'user',     label: 'Profile'  },
];

const BottomNav: React.FC<{
  active: NavKey;
  onPress: (k: NavKey) => void;
}> = ({ active, onPress }) => (
  <Stack horizontal alignItems="center" backgroundColor={palettes.white}
    paddingVertical={8} paddingHorizontal={8}
    borderTopWidth={1} borderTopColor={theme.colors.gray[100]}>
    {NAV_ITEMS.map(({ key, icon, label }, i) => {
      const isActive = key === active;
      return (
        <React.Fragment key={key}>
          {i === 2 && (
            <StyledPressable
              onPress={() => onPress('add')}
              width={58} height={58} borderRadius={29}
              backgroundColor={LIME} alignItems="center" justifyContent="center"
              marginHorizontal={4}
              style={{ marginTop: -20, elevation: 6, shadowColor: LIME_DARK,
                shadowOpacity: 0.4, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } }}
            >
              <Icon name="plus" size={26} color={DARK} />
            </StyledPressable>
          )}
          <StyledPressable flex={1} alignItems="center" paddingVertical={4}
            onPress={() => onPress(key)}>
            <Icon name={icon} size={22} color={isActive ? DARK : MUTED} />
            {isActive && (
              <Stack width={5} height={5} borderRadius={2.5}
                backgroundColor={LIME_DARK} marginTop={3} />
            )}
            <StyledText fontSize={10}
              fontWeight={isActive ? '700' : '400'}
              color={isActive ? DARK : MUTED} marginTop={2}>
              {label}
            </StyledText>
          </StyledPressable>
        </React.Fragment>
      );
    })}
  </Stack>
);

// ─── Screen ───────────────────────────────────────────────────────────────────

// TODAY is always the real current date — computed at render time
const TODAY = isoToday();

export default function DailyPlanScreen() {
  const [selectedDate, setSelectedDate] = useState(TODAY);
  const [anchorDate,  setAnchorDate]    = useState(TODAY);   // drives visible week
  const [activeNav, setNav]             = useState<NavKey>('calendar');

  const todayIso = isoToday();                        // fresh — safe across midnight
  const items    = SCHEDULE[selectedDate] ?? [];
  const dateObj  = fromISO(selectedDate);
  const isToday  = selectedDate === todayIso;

  const dayLabel  = isToday
    ? 'Today'
    : dateObj.toLocaleDateString('en-US', { weekday: 'long' });  // non-today day name
  const monthYear = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // When CalendarProvider fires date changes, sync both
  const onDateChanged = useCallback((date: string) => {
    setSelectedDate(date);
    setAnchorDate(date);
  }, []);

  // Full marked dates: dots + selected highlight
  const markedDates = {
    ...MARKED_DATES,
    [selectedDate]: {
      selected:          true,
      selectedColor:     LIME,
      selectedTextColor: DARK,
      marked:            !!(SCHEDULE[selectedDate]?.length),
      dotColor:          LIME_DARK,
    },
  };

  return (
    <Stack flex={1} marginVertical={16} backgroundColor={BG}>

      {/* ── CalendarProvider owns both the week strip + scroll content ── */}
      <CalendarProvider
        date={selectedDate}
        onDateChanged={onDateChanged}
        style={{ flex: 1, borderRadius: 8, overflow: 'hidden', backgroundColor: palettes.white }}
      >
        {/* ── Custom week strip — built from fluent-styles, pixel-perfect layout ── */}
        <WeekStrip
          selectedDate={selectedDate}
          anchorDate={anchorDate}
          markedDates={MARKED_DATES}
          onSelect={(date) => { setSelectedDate(date); setAnchorDate(date); }}
          onAnchorChange={setAnchorDate}
        />

        <StyledSpacer marginVertical={8} />

        {/* ── Scrollable schedule body ── */}
        <StyledScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >

            {/* Day heading + avatar */}
            <Stack horizontal alignItems="flex-start" justifyContent="space-between"
              paddingHorizontal={20}  paddingBottom={12}>
              <Stack gap={2}>
                <StyledText fontSize={28} fontWeight="900" color={DARK}>{dayLabel}</StyledText>
                <StyledText fontSize={14} color={MUTED}>{monthYear}</StyledText>
              </Stack>
              <StyledImage
                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' }}
                width={50} height={50} cycle size={50} borderRadius={25}
              />
            </Stack>

            {/* Summary chips */}
            <Stack paddingHorizontal={20}>
              <SummaryStrip items={items} />
            </Stack>

            {/* Column headers */}
            {items.length > 0 && (
              <Stack horizontal alignItems="center" justifyContent="space-between"
                paddingHorizontal={20} marginBottom={14}>
                <Stack horizontal gap={20}>
                  <StyledText fontSize={13} fontWeight="600" color={MUTED}>Time</StyledText>
                  <StyledText fontSize={13} fontWeight="600" color={MUTED}>Exercise</StyledText>
                </Stack>
                <StyledPressable onPress={() => {}}>
                  <Icon name="sliders" size={16} color={MUTED} />
                </StyledPressable>
              </Stack>
            )}

            {/* Timeline / rest day */}
            <Stack paddingHorizontal={16}>
              {items.length > 0 ? (
                <StyledTimeline
                  items={items}
                  renderItem={(item) => <WorkoutCard item={item} />}
                  variant="default"
                  dotShape="filled"
                  dotSize={10}
                  timeColumnWidth={58}
                  timeGap={12}
                  animated
                  colors={{
                    dot:         LIME_DARK,
                    line:        theme.colors.gray[200],
                    timeText:    DARK,
                    endTimeText: MUTED,
                  }}
                />
              ) : (
                <RestDay />
              )}
            </Stack>

     
        </StyledScrollView>
      </CalendarProvider>

      {/* ── Bottom nav ── */}
      <BottomNav active={activeNav} onPress={setNav} />

    </Stack>
  );
}