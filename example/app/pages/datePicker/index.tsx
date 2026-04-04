/**
 * StyledDatePickerDemo.tsx
 * ─────────────────────────
 * Full showcase of StyledDatePicker:
 *  1. Date    — inline, default dark
 *  2. Date    — input trigger → bottom sheet
 *  3. Range   — inline with indigo fill
 *  4. Time    — scroll drum
 *  5. DateTime — calendar + drum
 *  6. Month   — month grid
 *  7. Colour themes — lime, rose, indigo, amber
 *  8. Real-world — hotel booking, event scheduler, report period
 */

import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  StyledScrollView,
  StyledCard,
  Stack,
  StyledText,
  StyledPressable,
  StyledDivider,
  theme,
  palettes,
  StyledDatePicker
} from 'fluent-styles';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (d: Date | null) =>
  d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';

const fmtTime = (d: Date | null) =>
  d ? d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—';

const fmtMonth = (d: Date | null) =>
  d ? d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—';

const nightsBetween = (a: Date | null, b: Date | null) =>
  a && b ? Math.round((b.getTime() - a.getTime()) / 86_400_000) : 0;

// ─── Section ──────────────────────────────────────────────────────────────────

const Section: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <Stack gap={2} paddingBottom={8} marginBottom={12} borderBottomWidth={1} borderBottomColor={theme.colors.gray[200]}>
    <StyledText fontSize={theme.fontSize.normal} fontWeight="700" color={theme.colors.gray[800]} letterSpacing={0.8}>
      {title}
    </StyledText>
    {subtitle && (
      <StyledText fontSize={theme.fontSize.small} color={theme.colors.gray[400]}>
        {subtitle}
      </StyledText>
    )}
  </Stack>
);

// ─── Value pill ───────────────────────────────────────────────────────────────

const ValueRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <Stack horizontal alignItems="center" justifyContent="space-between"
    paddingVertical={10} paddingHorizontal={14} borderRadius={10}
    backgroundColor={theme.colors.gray[50]} marginTop={12}>
    <StyledText fontSize={12} color={theme.colors.gray[400]}>{label}</StyledText>
    <StyledText fontSize={13} fontWeight={theme.fontWeight.semiBold} color={theme.colors.gray[800]}>
      {value}
    </StyledText>
  </Stack>
);

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function StyledDatePickerDemo() {
  // Section state
  const [date1,     setDate1]     = useState<Date | null>(new Date());
  const [date2,     setDate2]     = useState<Date | null>(null);
  const [rangeS,    setRangeS]    = useState<Date | null>(null);
  const [rangeE,    setRangeE]    = useState<Date | null>(null);
  const [time1,     setTime1]     = useState<Date | null>(new Date());
  const [datetime1, setDatetime1] = useState<Date | null>(new Date());
  const [month1,    setMonth1]    = useState<Date | null>(new Date());

  // Colour theme demos
  const [lime,     setLime]    = useState<Date | null>(null);
  const [rose,     setRose]    = useState<Date | null>(null);
  const [indigo,   setIndigo]  = useState<Date | null>(null);
  const [amber,    setAmber]   = useState<Date | null>(null);

  // Real-world demos
  const [checkIn,    setCheckIn]    = useState<Date | null>(null);
  const [checkOut,   setCheckOut]   = useState<Date | null>(null);
  const [eventDate,  setEventDate]  = useState<Date | null>(null);
  const [eventTime,  setEventTime]  = useState<Date | null>(null);
  const [reportFrom, setReportFrom] = useState<Date | null>(null);
  const [reportTo,   setReportTo]   = useState<Date | null>(null);

  const nights = nightsBetween(checkIn, checkOut);

  return (
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
      >


          {/* ── 1. Date inline ── */}
          <Section title="Date — inline" subtitle="mode='date'  variant='inline'" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={20} shadow="light" marginBottom={28}>
            <StyledDatePicker
              mode="date"
              variant="inline"
              value={date1}
              onChange={setDate1}
              showTodayButton
            />
            <ValueRow label="Selected" value={fmt(date1)} />
            </StyledCard>

          {/* ── 2. Date input → sheet ── */}
          <Section title="Date — input → sheet" subtitle="mode='date'  variant='input'" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={20} shadow="light" marginBottom={28}>
            <StyledDatePicker
              mode="date"
              variant="input"
              label="Appointment date"
              placeholder="Pick a date"
              value={date2}
              onChange={setDate2}
              onConfirm={(d) => setDate2(d)}
              confirmLabel="Confirm date"
            />
            <ValueRow label="Confirmed" value={fmt(date2)} />
            </StyledCard>

          {/* ── 3. Range inline ── */}
          <Section title="Date Range — inline" subtitle="mode='range' · tap start then end" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={20} shadow="light" marginBottom={28}>
            <StyledDatePicker
              mode="range"
              variant="inline"
              valueStart={rangeS}
              valueEnd={rangeE}
              onRangeChange={(s, e) => { setRangeS(s); setRangeE(e); }}
              colors={{
                selected:  '#6366f1',
                rangeFill: '#eef2ff',
                today:     '#6366f1',
              }}
            />
            <ValueRow label="Start" value={fmt(rangeS)} />
            <ValueRow label="End"   value={fmt(rangeE)} />
            </StyledCard>

          {/* ── 4. Time inline ── */}
          <Section title="Time — inline" subtitle="mode='time' · scroll drum" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={20} shadow="light" marginBottom={28}>
            <StyledDatePicker
              mode="time"
              variant="inline"
              value={time1}
              onChange={setTime1}
              showTodayButton={false}
            />
            <ValueRow label="Selected time" value={fmtTime(time1)} />
            </StyledCard>

          {/* ── 5. DateTime inline ── */}
          <Section title="Date + Time — inline" subtitle="mode='datetime' · calendar + drum" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={20} shadow="light" marginBottom={28}>
            <StyledDatePicker
              mode="datetime"
              variant="inline"
              value={datetime1}
              onChange={setDatetime1}
              colors={{ selected: '#0f172a', today: '#6366f1' }}
            />
            <ValueRow
              label="Selected"
              value={datetime1 ? `${fmt(datetime1)} at ${fmtTime(datetime1)}` : '—'}
            />
            </StyledCard>

          {/* ── 6. Month inline ── */}
          <Section title="Month — inline" subtitle="mode='month' · tap any month" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={20} shadow="light" marginBottom={28}>
            <StyledDatePicker
              mode="month"
              variant="inline"
              value={month1}
              onChange={setMonth1}
              colors={{ selected: '#059669', today: '#059669' }}
            />
            <ValueRow label="Selected month" value={fmtMonth(month1)} />
            </StyledCard>

          {/* ── 7. Colour themes ── */}
          <Section title="Colour themes" subtitle="custom colors prop" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={20} shadow="light" marginBottom={28}>

            <StyledText fontSize={12} color={theme.colors.gray[400]} marginBottom={10}>
              Lime
            </StyledText>
            <StyledDatePicker
              mode="date" variant="inline"
              value={lime} onChange={setLime}
              colors={{ selected: '#8bc34a', today: '#8bc34a', confirmBg: '#8bc34a' }}
            />

            <StyledDivider borderBottomColor={theme.colors.gray[100]} marginVertical={20} />

            <StyledText fontSize={12} color={theme.colors.gray[400]} marginBottom={10}>
              Rose
            </StyledText>
            <StyledDatePicker
              mode="date" variant="inline"
              value={rose} onChange={setRose}
              colors={{ selected: '#e11d48', today: '#e11d48', rangeFill: '#fff1f2' }}
            />

            <StyledDivider borderBottomColor={theme.colors.gray[100]} marginVertical={20} />

            <StyledText fontSize={12} color={theme.colors.gray[400]} marginBottom={10}>
              Indigo
            </StyledText>
            <StyledDatePicker
              mode="date" variant="inline"
              value={indigo} onChange={setIndigo}
              colors={{ selected: '#6366f1', today: '#6366f1', rangeFill: '#eef2ff' }}
            />

            <StyledDivider borderBottomColor={theme.colors.gray[100]} marginVertical={20} />

            <StyledText fontSize={12} color={theme.colors.gray[400]} marginBottom={10}>
              Amber
            </StyledText>
            <StyledDatePicker
              mode="date" variant="inline"
              value={amber} onChange={setAmber}
              colors={{ selected: '#d97706', today: '#d97706', confirmBg: '#d97706' }}
            />
            </StyledCard>

          {/* ── 8. Real-world: Hotel booking ── */}
          <Section title="Hotel booking" subtitle="two date inputs with night count" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={20} shadow="light" marginBottom={28}>
            <Stack gap={12}>
              <StyledDatePicker
                mode="date"
                variant="input"
                label="Check-in"
                placeholder="Select check-in"
                value={checkIn}
                onChange={setCheckIn}
                onConfirm={setCheckIn}
                minDate={new Date()}
                colors={{
                  selected:   '#0ea5e9',
                  today:      '#0ea5e9',
                  confirmBg:  '#0ea5e9',
                }}
              />
              <StyledDatePicker
                mode="date"
                variant="input"
                label="Check-out"
                placeholder="Select check-out"
                value={checkOut}
                onChange={setCheckOut}
                onConfirm={setCheckOut}
                minDate={checkIn ?? new Date()}
                colors={{
                  selected:   '#0ea5e9',
                  today:      '#0ea5e9',
                  confirmBg:  '#0ea5e9',
                }}
              />
            </Stack>

            {checkIn && checkOut && nights > 0 && (
              <Stack
                marginTop={14}
                paddingHorizontal={16} paddingVertical={12}
                borderRadius={12}
                backgroundColor="#f0f9ff"
              >
                <StyledText fontSize={13} fontWeight={theme.fontWeight.semiBold} color="#0369a1">
                  {nights} {nights === 1 ? 'night' : 'nights'} · {fmt(checkIn)} → {fmt(checkOut)}
                </StyledText>
              </Stack>
            )}
            </StyledCard>

          {/* ── 9. Real-world: Event scheduler ── */}
          <Section title="Event scheduler" subtitle="date + time inputs" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={20} shadow="light" marginBottom={28}>
            <Stack gap={12}>
              <StyledDatePicker
                mode="date"
                variant="input"
                label="Event date"
                placeholder="Choose date"
                value={eventDate}
                onChange={setEventDate}
                onConfirm={setEventDate}
                colors={{ selected: '#8b5cf6', today: '#8b5cf6', confirmBg: '#8b5cf6' }}
              />
              <StyledDatePicker
                mode="time"
                variant="input"
                label="Event time"
                placeholder="Choose time"
                value={eventTime}
                onChange={setEventTime}
                onConfirm={setEventTime}
                formatDisplay={(d) =>
                  d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                }
                colors={{ selected: '#8b5cf6', today: '#8b5cf6', confirmBg: '#8b5cf6' }}
              />
            </Stack>
            {eventDate && eventTime && (
              <ValueRow
                label="Event"
                value={`${fmt(eventDate)} at ${fmtTime(eventTime)}`}
              />
            )}
            </StyledCard>

          {/* ── 10. Real-world: Report period ── */}
          <Section title="Report period" subtitle="month mode inputs" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={20} shadow="light" marginBottom={28}>
            <Stack gap={12}>
              <StyledDatePicker
                mode="month"
                variant="input"
                label="From month"
                placeholder="Select start month"
                value={reportFrom}
                onChange={setReportFrom}
                onConfirm={setReportFrom}
                formatDisplay={(d) =>
                  d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                }
                colors={{ selected: '#f59e0b', today: '#f59e0b', confirmBg: '#f59e0b' }}
              />
              <StyledDatePicker
                mode="month"
                variant="input"
                label="To month"
                placeholder="Select end month"
                value={reportTo}
                onChange={setReportTo}
                onConfirm={setReportTo}
                formatDisplay={(d) =>
                  d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                }
                colors={{ selected: '#f59e0b', today: '#f59e0b', confirmBg: '#f59e0b' }}
              />
            </Stack>
            {reportFrom && reportTo && (
              <ValueRow
                label="Period"
                value={`${fmtMonth(reportFrom)} – ${fmtMonth(reportTo)}`}
              />
            )}
            </StyledCard>

          {/* ── API Reference ── */}
          <StyledCard backgroundColor={theme.colors.gray[900]} borderRadius={18}
            padding={18} shadow="light" marginBottom={8}>
            <StyledText fontSize={12} fontWeight={theme.fontWeight.bold}
              color="#c6ef3e" marginBottom={12}>
              StyledDatePicker · Props
            </StyledText>
            {([
              ['mode',            'date·time·datetime·range·month', 'date'    ],
              ['variant',         'inline·sheet·input',             'inline'  ],
              ['size',            'sm·md·lg',                       'md'      ],
              ['value',           'Date | null',                    '—'       ],
              ['valueStart',      'Date | null',                    '—'       ],
              ['valueEnd',        'Date | null',                    '—'       ],
              ['minDate',         'Date',                           '—'       ],
              ['maxDate',         'Date',                           '—'       ],
              ['showTodayButton', 'boolean',                        'true'    ],
              ['showConfirm',     'boolean',                        'true'    ],
              ['confirmLabel',    'string',                         'Done'    ],
              ['placeholder',     'string',                         '—'       ],
              ['label',           'string',                         '—'       ],
              ['formatDisplay',   '(d: Date) => string',            'auto'    ],
              ['onChange',        '(d: Date) => void',              '—'       ],
              ['onRangeChange',   '(s, e: Date|null) => void',      '—'       ],
              ['onConfirm',       '(d: Date|null) => void',         '—'       ],
              ['disabled',        'boolean',                        'false'   ],
              ['colors',          'StyledDatePickerColors',         'dark'    ],
            ] as [string, string, string][]).map(([p, t, d]) => (
              <Stack key={p} horizontal alignItems="center" paddingVertical={5}
                borderBottomWidth={1} borderBottomColor={theme.colors.gray[800]}>
                <StyledText fontSize={11} fontWeight={theme.fontWeight.semiBold}
                  color="#f472b6" flex={1}>{p}</StyledText>
                <StyledText fontSize={10} color={theme.colors.gray[400]} flex={1}>{t}</StyledText>
                <StyledText fontSize={10} color={theme.colors.gray[600]} flex={1}>{d}</StyledText>
              </Stack>
            ))}
          </StyledCard>

   
      </StyledScrollView>
    </Stack>
  );
}