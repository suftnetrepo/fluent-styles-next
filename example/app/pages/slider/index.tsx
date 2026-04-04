/**
 * StyledSliderDemo.tsx
 * ─────────────────────
 * Full showcase of StyledSlider:
 *  1. default       — single thumb
 *  2. range         — two thumbs (price filter, age range)
 *  3. stepped       — snaps to discrete ticks (star rating, quality)
 *  4. gradient      — coloured gradient fill
 *  5. buffer        — media player seek bar
 *  6. sizes         — sm / md / lg
 *  7. colour themes — lime, rose, amber, purple, teal
 *  8. Real-world    — volume, brightness, temperature, media player, price filter
 */

import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  StyledScrollView,
  StyledCard,
  Stack,
  StyledText,
  StyledPressable,
  theme,
  palettes,
  StyledSlider
} from 'fluent-styles';

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

const Row: React.FC<{ label: string; value?: string; children: React.ReactNode }> = ({
  label, value, children,
}) => (
  <Stack >
    <Stack horizontal alignItems="center" justifyContent="space-between" >
      <StyledText fontSize={12} color={theme.colors.gray[400]}>{label}</StyledText>
      {value !== undefined && (
        <StyledText fontSize={12} fontWeight={theme.fontWeight.semiBold}
          color={theme.colors.gray[700]}>
          {value}
        </StyledText>
      )}
    </Stack>
    <>
     {children}
    </>
   
  </Stack>
);

// ─── Media player ─────────────────────────────────────────────────────────────

const formatTime = (secs: number) =>
  `${Math.floor(secs / 60)}:${String(Math.floor(secs % 60)).padStart(2, '0')}`;

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function StyledSliderDemo() {
  // Default
  const [vol,    setVol]    = useState(65);
  const [bright, setBright] = useState(80);

  // Range
  const [priceLow,  setPriceLow]  = useState(20);
  const [priceHigh, setPriceHigh] = useState(75);
  const [ageLow,    setAgeLow]    = useState(25);
  const [ageHigh,   setAgeHigh]   = useState(45);

  // Stepped
  const [quality,  setQuality]  = useState(3);
  const [rating,   setRating]   = useState(4);

  // Gradient
  const [temp,     setTemp]     = useState(22);
  const [hue,      setHue]      = useState(200);

  // Buffer
  const [played,   setPlayed]   = useState(95);
  const DURATION = 243; // seconds

  // Sizes
  const [smVal, setSmVal] = useState(40);
  const [mdVal, setMdVal] = useState(60);
  const [lgVal, setLgVal] = useState(80);

  // Colour themes
  const [lime,   setLime]   = useState(65);
  const [rose,   setRose]   = useState(50);
  const [amber,  setAmber]  = useState(70);
  const [purple, setPurple] = useState(45);
  const [teal,   setTeal]   = useState(80);

  return (
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>


          {/* ── 1. Variants ── */}
          <Section title="Variants" subtitle="default · range · stepped · gradient · buffer" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            <Row label="default" value={`${vol}`}>
              <StyledSlider value={vol} onValueChange={setVol} showMinMax />
            </Row>

            <Row label="range" value={`${priceLow} – ${priceHigh}`}>
              <StyledSlider
                variant="range"
                value={priceLow}
                valueHigh={priceHigh}
                onRangeChange={(lo, hi) => { setPriceLow(lo); setPriceHigh(hi); }}
                showMinMax
              />
            </Row>

            <Row label="stepped (5 ticks)" value={`${quality} / 5`}>
              <StyledSlider
                variant="stepped"
                value={quality}
                min={1} max={5} steps={5}
                onValueChange={setQuality}
                alwaysShowTooltip
              />
            </Row>

            <Row label="gradient" value={`${bright}%`}>
              <StyledSlider
                variant="gradient"
                value={bright}
                onValueChange={setBright}
                formatLabel={(v) => `${v}%`}
                alwaysShowTooltip
                colors={{ gradFrom: '#6366f1', gradTo: '#22d3ee' }}
              />
            </Row>

            <Row label="buffer (media seek)" value={`${formatTime(played)} / ${formatTime(DURATION)}`}>
              <StyledSlider
                variant="buffer"
                value={played}
                bufferValue={Math.min(played + 60, DURATION)}
                min={0}
                max={DURATION}
                size="sm"
                onValueChange={setPlayed}
                formatLabel={formatTime}
                colors={{ fill: '#2563eb', buffer: '#bfdbfe' }}
              />
            </Row>
            </StyledCard>

          {/* ── 2. Sizes ── */}
          <Section title="Sizes" subtitle="sm · md · lg" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            <Row label="sm" value={`${smVal}`}>
              <StyledSlider value={smVal} size="sm" onValueChange={setSmVal} />
            </Row>
            <Row label="md (default)" value={`${mdVal}`}>
              <StyledSlider value={mdVal} size="md" onValueChange={setMdVal} />
            </Row>
            <Row label="lg" value={`${lgVal}`}>
              <StyledSlider value={lgVal} size="lg" onValueChange={setLgVal} />
            </Row>
            </StyledCard>

          {/* ── 3. Colour themes ── */}
          <Section title="Colour themes" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            {[
              { label: 'Lime / fitness',  val: lime,   set: setLime,   fill: '#8bc34a', track: '#ecfccb' },
              { label: 'Rose / health',   val: rose,   set: setRose,   fill: '#f43f5e', track: '#ffe4e6' },
              { label: 'Amber / warning', val: amber,  set: setAmber,  fill: '#f59e0b', track: '#fef3c7' },
              { label: 'Purple',          val: purple, set: setPurple, fill: '#8b5cf6', track: '#ede9fe' },
              { label: 'Teal',            val: teal,   set: setTeal,   fill: '#14b8a6', track: '#ccfbf1' },
            ].map(({ label, val, set, fill, track }) => (
              <Row key={label} label={label} value={`${val}%`}>
                <StyledSlider
                  value={val}
                  onValueChange={set}
                  colors={{ fill, track, thumbBorder: fill, tooltipBg: fill }}
                  formatLabel={(v) => `${v}%`}
                />
              </Row>
            ))}
            </StyledCard>

          {/* ── 4. Real-world: Audio controls ── */}
          <Section title="Real-world: Audio controls" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            <Stack horizontal alignItems="center" gap={12} marginBottom={20}>
              <Icon name="volume-x" size={18} color={theme.colors.gray[400]} />
              <Stack flex={1}>
                <StyledSlider
                  value={vol}
                  onValueChange={setVol}
                  showTooltip={false}
                  colors={{ fill: '#1a1a1a', track: theme.colors.gray[200], thumbBorder: '#1a1a1a' }}
                />
              </Stack>
              <Icon name="volume-2" size={18} color={theme.colors.gray[400]} />
              <StyledText fontSize={13} fontWeight="600" color={theme.colors.gray[700]} width={32}>
                {vol}%
              </StyledText>
            </Stack>

            <Stack horizontal alignItems="center" gap={12}>
              <Icon name="sun" size={18} color={theme.colors.gray[400]} />
              <Stack flex={1}>
                <StyledSlider
                  value={bright}
                  onValueChange={setBright}
                  showTooltip={false}
                  colors={{ fill: '#f59e0b', track: '#fef3c7', thumbBorder: '#f59e0b' }}
                />
              </Stack>
              <Icon name="sun" size={18} color="#f59e0b" />
              <StyledText fontSize={13} fontWeight="600" color={theme.colors.gray[700]} width={32}>
                {bright}%
              </StyledText>
            </Stack>
            </StyledCard>

          {/* ── 5. Real-world: Temperature ── */}
          <Section title="Real-world: Temperature control" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            <Stack alignItems="center" marginBottom={16}>
              <StyledText fontSize={48} fontWeight="900" color="#f43f5e">
                {temp}°
              </StyledText>
              <StyledText fontSize={13} color={theme.colors.gray[400]}>
                {temp < 18 ? 'Cold 🥶' : temp < 24 ? 'Comfortable 😊' : 'Warm 🔥'}
              </StyledText>
            </Stack>
            <StyledSlider
              variant="gradient"
              value={temp}
              min={10}
              max={35}
              onValueChange={setTemp}
              formatLabel={(v) => `${v}°`}
              alwaysShowTooltip
              showMinMax
              size="lg"
              colors={{
                gradFrom:    '#60a5fa',
                gradTo:      '#ef4444',
                tooltipBg:   temp < 22 ? '#60a5fa' : '#ef4444',
              }}
            />
            </StyledCard>

          {/* ── 6. Real-world: Price filter ── */}
          <Section title="Real-world: Price range filter" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            <Stack horizontal alignItems="center" justifyContent="space-between" marginBottom={8}>
              <Stack paddingHorizontal={16} paddingVertical={8} borderRadius={12}
                backgroundColor={theme.colors.gray[100]}>
                <StyledText fontSize={11} color={theme.colors.gray[400]}>Min</StyledText>
                <StyledText fontSize={16} fontWeight="800" color={theme.colors.gray[900]}>
                  ${priceLow}
                </StyledText>
              </Stack>
              <StyledText fontSize={14} color={theme.colors.gray[300]}>—</StyledText>
              <Stack paddingHorizontal={16} paddingVertical={8} borderRadius={12}
                backgroundColor={theme.colors.gray[100]}>
                <StyledText fontSize={11} color={theme.colors.gray[400]}>Max</StyledText>
                <StyledText fontSize={16} fontWeight="800" color={theme.colors.gray[900]}>
                  ${priceHigh}
                </StyledText>
              </Stack>
            </Stack>
            <StyledSlider
              variant="range"
              value={priceLow}
              valueHigh={priceHigh}
              min={0}
              max={200}
              step={5}
              onRangeChange={(lo, hi) => { setPriceLow(lo); setPriceHigh(hi); }}
              showMinMax
              formatLabel={(v) => `$${v}`}
              colors={{ fill: '#6366f1', thumbBorder: '#6366f1', tooltipBg: '#6366f1' }}
            />
            </StyledCard>

          {/* ── 7. Real-world: Star rating ── */}
          <Section title="Real-world: Rating slider" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            <Stack alignItems="center" marginBottom={12}>
              <Stack horizontal gap={4}>
                {[1,2,3,4,5].map((i) => (
                  <Icon
                    key={i}
                    name="star"
                    size={28}
                    color={i <= rating ? '#f59e0b' : theme.colors.gray[200]}
                  />
                ))}
              </Stack>
              <StyledText fontSize={13} color={theme.colors.gray[400]} marginTop={6}>
                {['','Poor','Fair','Good','Very Good','Excellent'][rating]}
              </StyledText>
            </Stack>
            <StyledSlider
              variant="stepped"
              value={rating}
              min={1} max={5} steps={5}
              onValueChange={setRating}
              alwaysShowTooltip
              size="lg"
              formatLabel={(v) => ['','★','★★','★★★','★★★★','★★★★★'][Math.round(v)] ?? ''}
              colors={{
                fill:       '#f59e0b',
                track:      '#fef3c7',
                thumbBorder:'#f59e0b',
                tooltipBg:  '#f59e0b',
                tickActive: '#f59e0b',
              }}
            />
            </StyledCard>

          {/* ── 8. Disabled state ── */}
          <Section title="Disabled state" />
            <StyledCard backgroundColor={palettes.white} borderRadius={18} padding={18} shadow="light" marginBottom={28}>
            <Row label="disabled — cannot interact">
              <StyledSlider value={55} disabled showMinMax />
            </Row>
            </StyledCard>

          {/* ── API reference ── */}
          <StyledCard backgroundColor={theme.colors.gray[900]} borderRadius={18}
            padding={18} shadow="light" marginBottom={8}>
            <StyledText fontSize={12} fontWeight={theme.fontWeight.bold}
              color="#c6ef3e" marginBottom={12}>
              StyledSlider · Props
            </StyledText>
            {([
              ['value',             'number',                      'required'             ],
              ['valueHigh',         'number',                      '— (range only)'       ],
              ['bufferValue',       'number',                      '— (buffer only)'      ],
              ['min / max',         'number',                      '0 / 100'              ],
              ['step',              'number',                      '1'                    ],
              ['variant',           'default·range·stepped·gradient·buffer', 'default'   ],
              ['size',              'sm·md·lg',                    'md'                   ],
              ['showTooltip',       'boolean',                     'true'                 ],
              ['alwaysShowTooltip', 'boolean',                     'false'                ],
              ['showMinMax',        'boolean',                     'false'                ],
              ['steps',             'number',                      '5 (stepped only)'     ],
              ['formatLabel',       '(v: number) => string',       'String(v)'            ],
              ['disabled',          'boolean',                     'false'                ],
              ['colors',            'StyledSliderColors',          'blue theme'           ],
              ['onValueChange',     '(v: number) => void',         '—'                    ],
              ['onSlidingComplete', '(v: number) => void',         '—'                    ],
              ['onRangeChange',     '(lo, hi: number) => void',    '— (range only)'       ],
              ['onRangeComplete',   '(lo, hi: number) => void',    '— (range only)'       ],
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