/**
 * StyledProgressBarDemo.tsx
 * ──────────────────────────
 * Full showcase of StyledProgressBar variants, sizes, label positions,
 * shapes, colour themes, and real-world usage patterns.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  StyledScrollView,
  StyledCard,
  Stack,
  StyledText,
  StyledPressable,
  theme,
  palettes,
  StyledProgressBar
} from 'fluent-styles';
import Icon from 'react-native-vector-icons/Feather';

// ─── Section wrapper ──────────────────────────────────────────────────────────

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

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <Stack marginBottom={16}>
    <StyledText fontSize={11} color={theme.colors.gray[400]} marginBottom={8}>{label}</StyledText>
    <>{children}</>
  </Stack>
);

// ─── Live counter ─────────────────────────────────────────────────────────────

const LiveCounter: React.FC = () => {
  const [v, setV] = useState(0);
  const dir = useRef(1);

  useEffect(() => {
    const t = setInterval(() => {
      setV((prev) => {
        const next = prev + dir.current * 2;
        if (next >= 100) dir.current = -1;
        if (next <= 0)   dir.current =  1;
        return Math.min(100, Math.max(0, next));
      });
    }, 80);
    return () => clearInterval(t);
  }, []);

  return (
    <StyledProgressBar
      value={v}
      variant="gradient"
      size="md"
      labelPosition="right"
      animationDuration={80}
      colors={{ gradFrom: '#6366f1', gradTo: '#22d3ee' }}
    />
  );
};

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function StyledProgressBarDemo() {
  const [controlled, setControlled] = useState(45);

  return (
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
      



          {/* ── 1. Variants ── */}
          <Section title="Variants" subtitle="default · striped · gradient · segmented · buffer" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            <Row label="default">
              <StyledProgressBar value={65} labelPosition="right" />
            </Row>
            <Row label="striped">
              <StyledProgressBar value={45} variant="striped" size="lg" labelPosition="right" />
            </Row>
            <Row label="gradient">
              <StyledProgressBar value={72} variant="gradient" labelPosition="right"
                colors={{ gradFrom: '#6366f1', gradTo: '#22d3ee' }} />
            </Row>
            <Row label="segmented (5 of 9 steps)">
              <StyledProgressBar value={5} total={9} variant="segmented" segments={9}
                showSteps labelPosition="right"
                colors={{ fill: '#8bc34a', track: '#e5e7eb' }} />
            </Row>
            <Row label="buffer (loaded 60%, played 30%)">
              <StyledProgressBar value={30} bufferValue={60} variant="buffer" size="sm"
                labelPosition="right"
                colors={{ fill: '#2563eb', buffer: '#bfdbfe', track: '#e5e7eb' }} />
            </Row>
            </StyledCard>

          {/* ── 2. Sizes ── */}
          <Section title="Sizes" subtitle="xs · sm · md · lg · xl" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            {(['xs','sm','md','lg','xl'] as const).map((s) => (
              <Row key={s} label={s}>
                <StyledProgressBar value={65} size={s} labelPosition="right"
                  colors={{ fill: '#3b82f6' }} />
              </Row>
            ))}
            </StyledCard>

          {/* ── 3. Label positions ── */}
          <Section title="Label positions" subtitle="none · above · below · right · inside" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            <Row label="none (default)">
              <StyledProgressBar value={60} />
            </Row>
            <Row label="above">
              <StyledProgressBar value={60} labelPosition="above" />
            </Row>
            <Row label="below">
              <StyledProgressBar value={60} labelPosition="below" />
            </Row>
            <Row label="right">
              <StyledProgressBar value={60} labelPosition="right" />
            </Row>
            <Row label="inside (needs size lg+)">
              <StyledProgressBar value={60} size="lg" labelPosition="inside"
                colors={{ fill: '#3b82f6', labelInside: '#fff' }} />
            </Row>
            <Row label="inside striped">
              <StyledProgressBar value={55} size="xl" variant="striped" labelPosition="inside"
                colors={{ fill: '#8bc34a', labelInside: '#1a1a1a' }} />
            </Row>
            </StyledCard>

          {/* ── 4. Shapes ── */}
          <Section title="Shapes" subtitle="rounded · square · pill" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            {(['rounded','square','pill'] as const).map((sh) => (
              <Row key={sh} label={sh}>
                <StyledProgressBar value={65} size="lg" shape={sh} labelPosition="right" />
              </Row>
            ))}
            </StyledCard>

          {/* ── 5. Colour themes ── */}
          <Section title="Colour themes" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            {[
              { label: 'Blue (default)',  fill: '#3b82f6', track: '#dbeafe' },
              { label: 'Lime / fitness',  fill: '#8bc34a', track: '#ecfccb' },
              { label: 'Rose / health',   fill: '#f43f5e', track: '#ffe4e6' },
              { label: 'Amber / warning', fill: '#f59e0b', track: '#fef3c7' },
              { label: 'Teal / calm',     fill: '#14b8a6', track: '#ccfbf1' },
              { label: 'Purple',          fill: '#8b5cf6', track: '#ede9fe' },
            ].map(({ label, fill, track }) => (
              <Row key={label} label={label}>
                <StyledProgressBar value={65} size="md" labelPosition="right"
                  colors={{ fill, track }} />
              </Row>
            ))}
            </StyledCard>

          {/* ── 6. Gradient themes ── */}
          <Section title="Gradient themes" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            {[
              { label: 'Indigo → Cyan',   from: '#6366f1', to: '#22d3ee' },
              { label: 'Rose → Orange',   from: '#f43f5e', to: '#fb923c' },
              { label: 'Lime → Emerald',  from: '#a3e635', to: '#10b981' },
              { label: 'Violet → Pink',   from: '#8b5cf6', to: '#ec4899' },
              { label: 'Amber → Red',     from: '#f59e0b', to: '#ef4444' },
            ].map(({ label, from, to }) => (
              <Row key={label} label={label}>
                <StyledProgressBar value={70} variant="gradient" size="md" labelPosition="right"
                  colors={{ gradFrom: from, gradTo: to }} />
              </Row>
            ))}
            </StyledCard>

          {/* ── 7. Controlled value ── */}
          <Section title="Controlled value" subtitle="tap buttons to change progress" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            <StyledProgressBar value={controlled} variant="gradient" size="lg"
              labelPosition="above" animationDuration={400}
              colors={{ gradFrom: '#6366f1', gradTo: '#22d3ee' }} />
            <Stack horizontal gap={10} justifyContent="center">
              {[0, 25, 50, 75, 100].map((v) => (
                <StyledPressable
                  key={v}
                  onPress={() => setControlled(v)}
                  paddingHorizontal={14} paddingVertical={8}
                  borderRadius={20}
                  backgroundColor={controlled === v ? '#6366f1' : theme.colors.gray[100]}
                >
                  <StyledText fontSize={13} fontWeight="600"
                    color={controlled === v ? '#fff' : theme.colors.gray[700]}>
                    {v}%
                  </StyledText>
                </StyledPressable>
              ))}
            </Stack>
            </StyledCard>

          {/* ── 8. Animated (live) ── */}
          <Section title="Live animation" subtitle="animates continuously" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            <LiveCounter />
            </StyledCard>

          {/* ── 9. Real-world: Workout card ── */}
          <Section title="Real-world: Workout card" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            {[
              { title: 'Cardio',  progress: 0.65, label: '4 Of 6', color: '#dc2626', bg: '#fff0f0' },
              { title: 'Muscle',  progress: 0.62, label: '5 Of 8', color: '#9333ea', bg: '#fdf4ff' },
              { title: 'Weight',  progress: 0.44, label: '4 Of 9', color: '#ea580c', bg: '#fff7ed' },
            ].map(({ title, progress, label, color, bg }) => (
              <Stack key={title} marginBottom={16}>
                <Stack horizontal alignItems="center" gap={10} marginBottom={8}>
                  <Stack width={32} height={32} borderRadius={16} backgroundColor={bg}
                    alignItems="center" justifyContent="center">
                    <Icon name="activity" size={14} color={color} />
                  </Stack>
                  <StyledText fontSize={14} fontWeight="700" color={theme.colors.gray[900]}>
                    {title}
                  </StyledText>
                </Stack>
                <StyledProgressBar
                  value={progress * 100}
                  size="sm"
                  labelPosition="right"
                  label={label}
                  colors={{ fill: color, track: theme.colors.gray[100] }}
                />
              </Stack>
            ))}
            </StyledCard>

          {/* ── 10. Real-world: File upload ── */}
          <Section title="Real-world: File upload" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            {[
              { name: 'design-assets.zip', size: '24.5 MB', v: 100, done: true },
              { name: 'report-final.pdf',  size: '3.2 MB',  v: 67,  done: false },
              { name: 'video-export.mp4',  size: '128 MB',  v: 23,  done: false },
            ].map(({ name, size, v, done }) => (
              <Stack key={name} marginBottom={14}>
                <Stack horizontal alignItems="center" justifyContent="space-between" marginBottom={6}>
                  <Stack horizontal alignItems="center" gap={8} flex={1}>
                    <Icon name={done ? 'check-circle' : 'file'} size={16}
                      color={done ? '#10b981' : theme.colors.gray[500]} />
                    <StyledText fontSize={13} fontWeight="600" color={theme.colors.gray[800]}
                      numberOfLines={1} flex={1}>
                      {name}
                    </StyledText>
                  </Stack>
                  <StyledText fontSize={11} color={theme.colors.gray[400]}>{size}</StyledText>
                </Stack>
                <StyledProgressBar
                  value={v}
                  size="xs"
                  shape="pill"
                  colors={{
                    fill:  done ? '#10b981' : '#3b82f6',
                    track: theme.colors.gray[100],
                  }}
                />
              </Stack>
            ))}
            </StyledCard>

          {/* ── 11. Real-world: Skills / profile ── */}
          <Section title="Real-world: Skills profile" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            {[
              { skill: 'React Native', pct: 92 },
              { skill: 'TypeScript',   pct: 85 },
              { skill: 'UI Design',    pct: 74 },
              { skill: 'Node.js',      pct: 68 },
              { skill: 'DevOps',       pct: 45 },
            ].map(({ skill, pct }) => (
              <Stack key={skill} horizontal alignItems="center" gap={12} marginBottom={12}>
                <StyledText fontSize={13} fontWeight="600" color={theme.colors.gray[700]}
                  width={100}>
                  {skill}
                </StyledText>
                <Stack flex={1}>
                  <StyledProgressBar
                    value={pct}
                    size="md"
                    variant="gradient"
                    labelPosition="right"
                    colors={{ gradFrom: '#6366f1', gradTo: '#8b5cf6' }}
                  />
                </Stack>
              </Stack>
            ))}
            </StyledCard>

          {/* ── API Reference ── */}
          <StyledCard backgroundColor={theme.colors.gray[900]} borderRadius={18}
            padding={18} shadow="light" marginBottom={8}>
            <StyledText fontSize={12} fontWeight={theme.fontWeight.bold}
              color="#c6ef3e" marginBottom={12}>
              StyledProgressBar · Props
            </StyledText>
            {([
              ['value',             'number',               'required'          ],
              ['total',             'number',               '100'               ],
              ['bufferValue',       'number',               '— (buffer only)'   ],
              ['variant',           'default·striped·gradient·segmented·buffer', 'default'],
              ['size',              'xs·sm·md·lg·xl',       'md'                ],
              ['shape',             'rounded·square·pill',  'rounded'           ],
              ['labelPosition',     'none·above·below·right·inside', 'none'     ],
              ['label',             'string | false',       'auto %'            ],
              ['showSteps',         'boolean',              'false'             ],
              ['segments',          'number',               '5'                 ],
              ['segmentGap',        'number',               '3'                 ],
              ['animated',          'boolean',              'true'              ],
              ['animationDuration', 'number',               '600'               ],
              ['colors',            'StyledProgressColors', 'blue theme'        ],
            ] as [string,string,string][]).map(([p, t, d]) => (
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