/**
 * StyledBarDemo.tsx
 * Full showcase of StyledBar variants.
 * All instances live inside StyledCard padding={20},
 * screen paddingHorizontal=20 → containerPaddingHorizontal=80
 */
import React from 'react';
import {
  StyledScrollView,
  StyledCard,
  Stack,
  StyledText,
  theme,
  palettes,
  StyledBar
} from 'fluent-styles';

// ─── Datasets ─────────────────────────────────────────────────────────────────

const workoutData = [
  { label: 'Sat', value: 45  },
  { label: 'Sun', value: 60  },
  { label: 'Mon', value: 35  },
  { label: 'Twe', value: 70,  active: true },
  { label: 'Wed', value: 50  },
  { label: 'Thu', value: 30  },
  { label: 'Fri', value: 20  },
];

const weightData = [
  { label: '13',  value: null },
  { label: '14',  value: 60.0, active: true },
  { label: '15',  value: 58.2 },
  { label: '16',  value: 59.1 },
  { label: '17',  value: 57.4 },
  { label: '18',  value: 58.0 },
  { label: '19',  value: 56.8 },
];

const tempData = [
  { label: '13',  value: null },
  { label: '14',  value: 36.9, active: true },
  { label: '15',  value: 37.1 },
  { label: '16',  value: 36.8 },
  { label: '17',  value: 37.0 },
  { label: '18',  value: 37.2 },
  { label: '19',  value: 36.5 },
];

const waterData = [
  { label: '13',  value: null  },
  { label: '14',  value: 1750, active: true },
  { label: '15',  value: 2100 },
  { label: '16',  value: 1600 },
  { label: '17',  value: 1900 },
  { label: '18',  value: 800  },
  { label: '19',  value: null  },
];

const caloriesData = [
  { label: 'Mon', value: 1800 },
  { label: 'Tue', value: 2200, active: true },
  { label: 'Wed', value: 1600 },
  { label: 'Thu', value: 1950 },
  { label: 'Fri', value: 2100 },
  { label: 'Sat', value: 1400 },
  { label: 'Sun', value: 1750 },
];

// ─── Section card ─────────────────────────────────────────────────────────────

/**
 * PADDING RULE:
 * screen paddingHorizontal = 20  →  both sides = 40
 * card   padding           = 20  →  both sides = 40
 * total containerPaddingHorizontal = 80
 *
 * StyledBar uses this to compute: chartWidth = screenWidth - 80
 * which is exactly the inner width of the card content area.
 */
const CONTAINER_PAD = 80;

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

// ─── Demo screen ──────────────────────────────────────────────────────────────

export default function StyledBarDemo() {
  return (
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
      >
     


            {/* 1. Workout — default lime */}
            <Section title="Workout Duration" subtitle="Default lime theme · unit='min'" />
            <StyledCard backgroundColor={palettes.white} borderRadius={22} shadow="light" marginBottom={16} padding={20} alignItems="center">
              <StyledBar
                data={workoutData}
                unit="min"
                maxValue={100}
                containerPaddingHorizontal={CONTAINER_PAD}
              />
            </StyledCard>

            {/* 2. Weight — green, null placeholders */}
            <Section title="Weight (kg)"
              subtitle="Green theme · null values render as placeholders" />
            <StyledCard backgroundColor={palettes.white} borderRadius={22} shadow="light" marginBottom={16} padding={20} alignItems="center">
              <StyledBar
                data={weightData}
                unit="kg"
                maxValue={80}
                containerPaddingHorizontal={CONTAINER_PAD}
                colors={{
                  activeTop:    palettes.green?.[400] ?? '#4ade80',
                  activeBottom: palettes.green?.[600] ?? '#16a34a',
                  tooltipBg:    palettes.green?.[800] ?? '#15803d',
                  tooltipText:  palettes.white,
                }}
              />
            </StyledCard>

            {/* 3. Temperature — orange, no hatch */}
            <Section title="Temperature (°C)"
              subtitle="Orange theme · showHatch=false" />
            <StyledCard backgroundColor={palettes.white} borderRadius={22} shadow="light" marginBottom={16} padding={20} alignItems="center">
              <StyledBar
                data={tempData}
                unit="°C"
                maxValue={38}
                showHatch={false}
                containerPaddingHorizontal={CONTAINER_PAD}
                colors={{
                  inactiveBar:  theme.colors.orange?.[100] ?? '#fed7aa',
                  activeTop:    theme.colors.orange?.[400] ?? '#fb923c',
                  activeBottom: theme.colors.orange?.[600] ?? '#ea580c',
                  tooltipBg:    theme.colors.orange?.[800] ?? '#c2410c',
                  tooltipText:  palettes.white,
                }}
              />
            </StyledCard>

            {/* 4. Water — blue */}
            <Section title="Water (mL)" subtitle="Blue theme · large values" />
            <StyledCard backgroundColor={palettes.white} borderRadius={22} shadow="light" marginBottom={16} padding={20} alignItems="center">
              <StyledBar
                data={waterData}
                unit="mL"
                maxValue={2500}
                containerPaddingHorizontal={CONTAINER_PAD}
                colors={{
                  inactiveBar:  theme.colors.blue?.[100] ?? '#bfdbfe',
                  hatchLine:    'rgba(59,130,246,0.15)',
                  activeTop:    theme.colors.blue?.[400] ?? '#60a5fa',
                  activeBottom: theme.colors.blue?.[600] ?? '#2563eb',
                  tooltipBg:    theme.colors.blue?.[900] ?? '#1e3a8a',
                  tooltipText:  palettes.white,
                }}
              />
            </StyledCard>

            {/* 5. Calories — rose/pink */}
            <Section title="Calories Burned" subtitle="Rose theme · custom tooltipLabel" />
            <StyledCard backgroundColor={palettes.white} borderRadius={22} shadow="light" marginBottom={16} padding={20} alignItems="center">
              <StyledBar
                data={caloriesData}
                unit="kcal"
                maxValue={2500}
                tooltipLabel="2,200 kcal"
                containerPaddingHorizontal={CONTAINER_PAD}
                colors={{
                  inactiveBar:      theme.colors.rose?.[100] ?? '#fce7f3',
                  hatchLine:        'rgba(236,72,153,0.12)',
                  activeTop:        theme.colors.rose?.[400] ?? '#f472b6',
                  activeBottom:     theme.colors.rose?.[600] ?? '#db2777',
                  tooltipBg:        theme.colors.rose?.[900] ?? '#831843',
                  tooltipText:      palettes.white,
                  activeLabelColor: theme.colors.rose?.[700] ?? '#be185d',
                }}
              />
            </StyledCard>

            {/* 6. Minimal — no animation, narrow bars, purple */}
            <Section title="Steps (minimal)"
              subtitle="animated=false · no hatch · narrow bars" />
            <StyledCard backgroundColor={palettes.white} borderRadius={22} shadow="light" marginBottom={16} padding={20} alignItems="center">
              <StyledBar
                data={workoutData}
                unit="k"
                maxValue={100}
                animated={false}
                showHatch={false}
                barWidthRatio={0.42}
                containerPaddingHorizontal={CONTAINER_PAD}
                colors={{
                  inactiveBar:  theme.colors.indigo?.[100] ?? '#e0e7ff',
                  activeTop:    theme.colors.indigo?.[400] ?? '#818cf8',
                  activeBottom: theme.colors.indigo?.[700] ?? '#4338ca',
                  tooltipBg:    theme.colors.indigo?.[900] ?? '#312e81',
                  tooltipText:  palettes.white,
                }}
              />
            </StyledCard>


          {/* API reference */}
          <>            <StyledCard
              backgroundColor={theme.colors.gray[900]}
              borderRadius={22}
              padding={20}
              shadow="light"
            >
              <StyledText
                fontSize={theme.fontSize.small}
                fontWeight={theme.fontWeight.bold}
                color="#d4f53c"
                marginBottom={12}
              >
                StyledBar · Props
              </StyledText>
              {([
                ['data',                     'StyledBarDatum[]',   'required'          ],
                ['maxValue',                 'number',             'auto from data'     ],
                ['width',                    'number',             '—'                  ],
                ['containerPaddingHorizontal','number',            '80'                 ],
                ['height',                   'number',             '180'                ],
                ['barWidthRatio',            '0–1',                '0.62'               ],
                ['labelHeight',              'number',             '28'                 ],
                ['showHatch',                'boolean',            'true'               ],
                ['hatchSpacing',             'number',             '8'                  ],
                ['unit',                     'string',             "''  "               ],
                ['tooltipLabel',             'string',             'auto'               ],
                ['colors',                   'StyledBarColors',    'lime theme'         ],
                ['animated',                 'boolean',            'true'               ],
                ['animationDuration',        'number',             '600'                ],
              ] as [string, string, string][]).map(([prop, type, def]) => (
                <Stack
                  key={prop}
                  horizontal
                  alignItems="center"
                  paddingVertical={5}
                  borderBottomWidth={1}
                  borderBottomColor={theme.colors.gray[800]}
                >
                  <StyledText
                    fontSize={11}
                    fontWeight={theme.fontWeight.semiBold}
                    color={theme.colors.rose?.[400] ?? '#f472b6'}
                    flex={1}
                  >
                    {prop}
                  </StyledText>
                  <StyledText fontSize={11} color={theme.colors.gray[400]} flex={1}>
                    {type}
                  </StyledText>
                  <StyledText fontSize={11} color={theme.colors.gray[600]} flex={1}>
                    {def}
                  </StyledText>
                </Stack>
              ))}
            </StyledCard>
          </>
      </StyledScrollView>
    </Stack>
  );
}