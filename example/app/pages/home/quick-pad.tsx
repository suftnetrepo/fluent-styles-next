import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import Svg, {
  Rect,
  Path,
  G,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Circle,
  Text as SvgText,
  Line,
  ClipPath,
  Pattern,
} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Feather';
import {
  StyledSafeAreaView,
  StyledScrollView,
  StyledPage,
  StyledCard,
  Stack,
  StyledText,
  StyledPressable,
  StyledSpacer,
  theme,
} from 'fluent-styles';

// ─── Constants ────────────────────────────────────────────────────────────────

const { width: W } = Dimensions.get('window');

const BG        = '#f4f9ee';
const CARD_BG   = '#ffffff';
const LIME      = '#d4f53c';
const LIME_DARK = '#b8e020';
const DARK      = '#1a1a1a';
const MUTED     = '#b0b0a8';
const TAG_BG    = '#f0f0ea';
const HATCH_CLR = 'rgba(0,0,0,0.07)';

// ─── Types ────────────────────────────────────────────────────────────────────

type NavKey = 'home' | 'stats' | 'fire' | 'profile';

// ─── Hatched bar helper ───────────────────────────────────────────────────────

interface HatchedRectProps {
  x: number;
  y: number;
  w: number;
  h: number;
  rx: number;
  fill: string;
  hatch?: boolean;
  opacity?: number;
}

const HatchedRect: React.FC<HatchedRectProps> = ({
  x, y, w, h, rx, fill, hatch = false, opacity = 1,
}) => {
  const id = `clip-${Math.round(x)}-${Math.round(y)}`;
  const lines: React.ReactNode[] = [];
  if (hatch) {
    const spacing = 8;
    for (let off = -h; off < w + h; off += spacing) {
      lines.push(
        <Line
          key={off}
          x1={x + off}       y1={y}
          x2={x + off + h}   y2={y + h}
          stroke={HATCH_CLR}
          strokeWidth="5"
        />,
      );
    }
  }
  return (
    <G opacity={opacity}>
      <Defs>
        <ClipPath id={id}>
          <Rect x={x} y={y} width={w} height={h} rx={rx} />
        </ClipPath>
      </Defs>
      <Rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} />
      {hatch && <G clipPath={`url(#${id})`}>{lines}</G>}
    </G>
  );
};

// ─── Workout Duration Bar Chart ───────────────────────────────────────────────

interface BarDatum {
  day: string;
  value: number;  // 0–1 fraction
  active: boolean;
}

const BAR_DATA: BarDatum[] = [
  { day: 'Sat', value: 0.45, active: false },
  { day: 'Sun', value: 0.60, active: false },
  { day: 'Mon', value: 0.35, active: false },
  { day: 'Twe', value: 0.85, active: true  },
  { day: 'Wed', value: 0.50, active: false },
  { day: 'Thu', value: 0.30, active: false },
  { day: 'Fri', value: 0.20, active: false },
];

const CHART_W  = W - 80;
const CHART_H  = 180;
const SLOT_W   = CHART_W / BAR_DATA.length;
const BAR_W    = SLOT_W * 0.62;
const BAR_PAD  = (SLOT_W - BAR_W) / 2;
const MAX_BAR  = CHART_H - 36; // space for label

const WorkoutChart: React.FC = () => (
  <Svg width={CHART_W} height={CHART_H + 8}>
    <Defs>
      <LinearGradient id="limeGrad" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0%"   stopColor={LIME}      stopOpacity="1" />
        <Stop offset="100%" stopColor={LIME_DARK} stopOpacity="1" />
      </LinearGradient>
    </Defs>

    {BAR_DATA.map((d, i) => {
      const bx   = i * SLOT_W + BAR_PAD;
      const bh   = d.value * MAX_BAR;
      const by   = MAX_BAR - bh + 4;
      const cx   = bx + BAR_W / 2;
      const rx   = BAR_W / 2;

      return (
        <G key={d.day}>
          {d.active ? (
            // Active bar: lime gradient, no hatch
            <>
              <Defs>
                <LinearGradient id={`ag${i}`} x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%"   stopColor={LIME}      stopOpacity="1" />
                  <Stop offset="100%" stopColor={LIME_DARK} stopOpacity="0.7" />
                </LinearGradient>
              </Defs>
              <Rect x={bx} y={by} width={BAR_W} height={bh} rx={rx} fill={`url(#ag${i})`} />

              {/* Tooltip */}
              <Rect x={cx - 30} y={by - 36} width={60} height={26} rx={13} fill={DARK} />
              {/* Pointer */}
              <Path
                d={`M ${cx - 6} ${by - 12} L ${cx + 6} ${by - 12} L ${cx} ${by - 4}`}
                fill={DARK}
              />
              <SvgText
                x={cx} y={by - 18}
                textAnchor="middle"
                fontSize="12" fontWeight="700" fill="#fff" fontFamily="System"
              >
                70 min
              </SvgText>
            </>
          ) : (
            // Inactive bar: grey with diagonal hatch
            <HatchedRect
              x={bx} y={by} w={BAR_W} h={bh} rx={rx}
              fill="#e8e8e0" hatch opacity={1}
            />
          )}

          {/* Day label */}
          <SvgText
            x={cx} y={CHART_H - 2}
            textAnchor="middle"
            fontSize="12"
            fill={d.active ? DARK : MUTED}
            fontWeight={d.active ? '700' : '400'}
            fontFamily="System"
          >
            {d.day}
          </SvgText>
        </G>
      );
    })}
  </Svg>
);

// ─── Weight Journey placeholder chart ────────────────────────────────────────

const WeightChart: React.FC = () => {
  const W2 = W - 80;
  const H2 = 100;
  const barCount = 7;
  const vals = [0.4, 0.6, 0.5, 0.75, 0.55, 0.45, 0.3];
  const sw = W2 / barCount;
  const bw = sw * 0.62;
  const maxH = H2 - 10;

  return (
    <Svg width={W2} height={H2}>
      {vals.map((v, i) => {
        const bx = i * sw + (sw - bw) / 2;
        const bh = v * maxH;
        const by = maxH - bh;
        return (
          <HatchedRect
            key={i} x={bx} y={by} w={bw} h={bh}
            rx={bw / 2} fill="#e8e8e0" hatch opacity={0.8}
          />
        );
      })}
    </Svg>
  );
};

// ─── Mini bar icon (for stat cards) ──────────────────────────────────────────

const MiniBars: React.FC<{ color: string; bg: string }> = ({ color, bg }) => (
  <Svg width={52} height={36}>
    {[
      { x: 2,  h: 18, active: false },
      { x: 18, h: 28, active: false },
      { x: 34, h: 36, active: true  },
    ].map((b, i) => (
      <Rect
        key={i}
        x={b.x} y={36 - b.h} width={14} height={b.h}
        rx={7}
        fill={b.active ? color : bg}
        opacity={b.active ? 1 : 0.5}
      />
    ))}
  </Svg>
);

// ─── Large "7" decorative SVG ─────────────────────────────────────────────────

const BigSeven: React.FC = () => (
  <Svg width={110} height={120} viewBox="0 0 110 120" style={{ position: 'absolute', bottom: -8, right: -8 }}>
    <Defs>
      <LinearGradient id="sevenGrad" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0%"   stopColor={LIME}      stopOpacity="0.9" />
        <Stop offset="100%" stopColor={LIME_DARK} stopOpacity="0.5" />
      </LinearGradient>
    </Defs>
    <Path
      d="M10 10 H90 L45 110 H20 L60 30 H10 Z"
      fill="url(#sevenGrad)"
    />
  </Svg>
);

// ─── Bottom Nav ───────────────────────────────────────────────────────────────

const BottomNav: React.FC<{
  active: NavKey;
  onPress: (k: NavKey) => void;
}> = ({ active, onPress }) => {
  const items: { key: NavKey; icon: string }[] = [
    { key: 'home',    icon: 'home'    },
    { key: 'stats',   icon: 'bar-chart-2' },
    { key: 'fire',    icon: 'zap'     },
    { key: 'profile', icon: 'user'    },
  ];

  return (
    <Stack
      backgroundColor={CARD_BG}
      borderTopLeftRadius={28}
      borderTopRightRadius={28}
      paddingBottom={20}
      paddingTop={4}

    >
      {/* FAB-style camera button above nav */}
      <Stack alignItems="center" style={{ marginTop: -28 }}>
        <Stack
          width={52}
          height={52}
          borderRadius={26}
          backgroundColor={DARK}
          alignItems="center"
          justifyContent="center"
      
        >
          <Icon name="camera" size={22} color="#fff" />
        </Stack>
      </Stack>

      <Stack horizontal alignItems="center" paddingTop={4} paddingHorizontal={16}>
        {items.map(({ key, icon }) => {
          const isActive = key === active;
          return (
            <StyledPressable
              key={key}
              flex={1}
              height={52}
              alignItems="center"
              justifyContent="center"
              onPress={() => onPress(key)}
            >
              <Stack
                width={46}
                height={46}
                borderRadius={23}
                backgroundColor={isActive ? LIME : 'transparent'}
                alignItems="center"
                justifyContent="center"
              >
                <Icon
                  name={icon}
                  size={20}
                  color={isActive ? DARK : MUTED}
                />
              </Stack>
            </StyledPressable>
          );
        })}
      </Stack>
    </Stack>
  );
};

// ─── Period pill ──────────────────────────────────────────────────────────────

const PeriodPill: React.FC<{ label: string }> = ({ label }) => (
  <StyledPressable
    onPress={() => {}}
    paddingHorizontal={14}
    paddingVertical={8}
    borderRadius={20}
    backgroundColor={TAG_BG}
  >
    <Stack horizontal alignItems="center" gap={5}>
      <StyledText fontSize={13} fontWeight="600" color={DARK}>{label}</StyledText>
      <Icon name="chevron-down" size={13} color={MUTED} />
    </Stack>
  </StyledPressable>
);

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function MyActivityScreen() {
  const [activeNav, setNav] = useState<NavKey>('stats');

  return (
    <Stack flex={1} backgroundColor={BG}>
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
   

          {/* ── Title ── */}
          <Stack paddingHorizontal={20} paddingTop={16} paddingBottom={18}>
            <StyledText fontSize={28} fontWeight="900" color={DARK}>My Activity</StyledText>
          </Stack>

          {/* ── Stat cards 2×2 ── */}
          <Stack paddingHorizontal={20} gap={10}>

            {/* Row 1 */}
            <Stack horizontal gap={10}>

              {/* 77% Completed */}
              <StyledCard
                flex={1}
                backgroundColor={CARD_BG}
                borderRadius={22}
                padding={18}
                shadow="light"
                overflow="hidden"
                minHeight={130}
              >
                <BigSeven />
                <StyledText fontSize={30} fontWeight="900" color={DARK}>77%</StyledText>
                <StyledSpacer height={4} />
                <StyledText fontSize={13} color={MUTED}>Completed</StyledText>
              </StyledCard>

              {/* 256 kcal */}
              <StyledCard
                flex={1}
                backgroundColor={LIME}
                borderRadius={22}
                padding={18}
                shadow="light"
                overflow="hidden"
                minHeight={130}
              >
                <Stack flex={1} justifyContent="space-between">
                  <Stack>
                    <Stack horizontal alignItems="flex-end" gap={4}>
                      <StyledText fontSize={28} fontWeight="900" color={DARK}>256</StyledText>
                      <StyledText fontSize={13} fontWeight="600" color={DARK} marginBottom={4}>/kcal</StyledText>
                    </Stack>
                    <StyledText fontSize={13} color={DARK} fontWeight="500">Calories burn</StyledText>
                  </Stack>
                  <Stack alignItems="flex-end">
                    <MiniBars color={CARD_BG} bg="rgba(255,255,255,0.5)" />
                  </Stack>
                </Stack>
              </StyledCard>
            </Stack>

            {/* Row 2 */}
            <Stack horizontal gap={10}>

              {/* Core Target */}
              <StyledCard
                flex={1}
                backgroundColor={CARD_BG}
                borderRadius={22}
                padding={18}
                shadow="light"
                minHeight={110}
              >
                <StyledText fontSize={16} fontWeight="800" color={DARK}>Core Target</StyledText>
                <StyledSpacer height={4} />
                <StyledText fontSize={13} color={MUTED}>Fitness focus</StyledText>
              </StyledCard>

              {/* 03 kg */}
              <StyledCard
                flex={1}
                backgroundColor={CARD_BG}
                borderRadius={22}
                padding={18}
                shadow="light"
                overflow="hidden"
                minHeight={110}
              >
                <Stack flex={1} justifyContent="space-between">
                  <Stack>
                    <Stack horizontal alignItems="flex-end" gap={4}>
                      <StyledText fontSize={28} fontWeight="900" color={DARK}>03</StyledText>
                      <StyledText fontSize={13} fontWeight="600" color={MUTED} marginBottom={4}>/kg</StyledText>
                    </Stack>
                    <StyledText fontSize={13} color={MUTED}>Weight lose</StyledText>
                  </Stack>
                  <Stack alignItems="flex-end">
                    <MiniBars color={LIME} bg="#f0f0e0" />
                  </Stack>
                </Stack>
              </StyledCard>
            </Stack>
          </Stack>

          <StyledSpacer height={24} />

          {/* ── Tracking Stats title ── */}
          <Stack paddingHorizontal={20} marginBottom={14}>
            <StyledText fontSize={22} fontWeight="900" color={DARK}>Tracking Stats</StyledText>
          </Stack>

          {/* ── Workout Duration card ── */}
          <Stack paddingHorizontal={20} marginBottom={14}>
            <StyledCard backgroundColor={CARD_BG} borderRadius={22} padding={20} shadow="light">
              <Stack horizontal alignItems="flex-start" justifyContent="space-between" marginBottom={4}>
                <Stack>
                  <StyledText fontSize={17} fontWeight="800" color={DARK}>Workout Duration</StyledText>
                  <StyledSpacer height={3} />
                  <StyledText fontSize={13} color={MUTED}>Total Time Spent in training</StyledText>
                </Stack>
                <PeriodPill label="Weekly" />
              </Stack>

              <StyledSpacer height={16} />
              <WorkoutChart />
            </StyledCard>
          </Stack>

          {/* ── Weight Journey card ── */}
          <Stack paddingHorizontal={20}>
            <StyledCard backgroundColor={CARD_BG} borderRadius={22} padding={20} shadow="light">
              <Stack horizontal alignItems="flex-start" justifyContent="space-between" marginBottom={4}>
                <Stack>
                  <StyledText fontSize={17} fontWeight="800" color={DARK}>Weight Journey</StyledText>
                  <StyledSpacer height={3} />
                  <StyledText fontSize={13} color={MUTED}>Last 7 Days</StyledText>
                </Stack>
                <PeriodPill label="Weekly" />
              </Stack>
              <StyledSpacer height={16} />
              <WeightChart />
            </StyledCard>
          </Stack>

          <StyledSpacer height={16} />
     
      </StyledScrollView>

      {/* ── Bottom Nav ── */}
      <BottomNav active={activeNav} onPress={setNav} />
    </Stack>
  );
}