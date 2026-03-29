// FitnessHomeScreen.tsx
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import Svg, { Circle } from 'react-native-svg'  // npm install react-native-svg
import {
  StyledSafeAreaView,
  StyledScrollView,
  StyledCard,
  StyledImage,
  StyledText,
  StyledBadge,
  Stack,
  StyledSpacer,
  StyleShape,
  StyledPressable,
  useToast,
  theme,
} from 'fluent-styles'

const C = {
  lime:  '#A8E63D',
  dark:  '#1C1F1A',
  bg:    '#F4F5F0',
  muted: '#8A8F82',
  white: '#FFFFFF',
}

const CATEGORIES = [
  { value: 'all',    label: 'All' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'muscle', label: 'Muscle' },
  { value: 'weight', label: 'Weight' },
  { value: 'yoga',   label: 'Yoga' },
]

const WORKOUTS = [
  {
    id: '1',
    title: 'Cardio Exercise',
    level: 'Intermediate',
    duration: '120 Menit',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
    liked: false,
  },
  {
    id: '2',
    title: 'Muscle Exercise',
    level: 'Beginner',
    duration: '90 Menit',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80',
    liked: true,
  },
  {
    id: '3',
    title: 'Weight Training',
    level: 'Advanced',
    duration: '60 Menit',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80',
    liked: false,
  },
  {
    id: '4',
    title: 'Yoga Flow',
    level: 'Beginner',
    duration: '45 Menit',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80',
    liked: false,
  },
]

const BOTTOM_TABS = [
  { value: 'home',     icon: '🏠' },
  { value: 'schedule', icon: '📅' },
  { value: 'add',      icon: '＋' },
  { value: 'likes',    icon: '🤍' },
  { value: 'profile',  icon: '👤' },
]

// ─── Circular Progress ────────────────────────────────────────────────────────
// ✅ Uses react-native-svg — the only reliable way to draw a partial arc in RN.
// strokeDasharray = [filledLength, remainingLength] on a circle of circumference 2πr.
function CircularProgress({
  value,
  total,
  label,
  size = 80,
}: {
  value: number
  total: number
  label: string
  size?: number
}) {
  const strokeWidth = 6
  const radius      = (size - strokeWidth) / 2   // radius fits inside the SVG canvas
  const circumference = 2 * Math.PI * radius
  const filled      = (value / total) * circumference
  const gap         = circumference - filled
  const center      = size / 2

  return (
    // Outer wrapper: fixed size, centres SVG + text overlay
    <Stack width={size} height={size} alignItems="center" justifyContent="center">
      {/* SVG ring — absolutely fills the wrapper */}
      <Stack style={{ position: 'absolute', top: 0, left: 0 }}>
        <Svg width={size} height={size}>
          {/* Track (full circle, dim) */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress arc — rotated so it starts at 12 o'clock */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={C.white}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={[filled, gap]}
            strokeLinecap="round"
            rotation={-90}
            origin={`${center}, ${center}`}
          />
        </Svg>
      </Stack>

      {/* Centre label — layered on top of SVG */}
      <Stack alignItems="center" gap={1}>
        <StyledText fontSize={15} fontWeight="800" color={C.white} lineHeight={18}>
          {value}/{total}
        </StyledText>
        <StyledText fontSize={9} color="rgba(255,255,255,0.65)" lineHeight={11}>
          {label}
        </StyledText>
      </Stack>
    </Stack>
  )
}

// ─── Stat Item ────────────────────────────────────────────────────────────────
function StatItem({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <Stack gap={2} flex={1}>
      <Stack horizontal alignItems="baseline" gap={3}>
        <StyledText fontSize={20} fontWeight="800" color={C.white}>{value}</StyledText>
        <StyledText fontSize={11} fontWeight="600" color="rgba(255,255,255,0.65)">{unit}</StyledText>
      </Stack>
      <StyledText fontSize={11} color="rgba(255,255,255,0.45)" lineHeight={14}>{label}</StyledText>
      {/* Track */}
      <Stack marginTop={4} height={2} width={52} borderRadius={1} backgroundColor="rgba(255,255,255,0.15)">
        <Stack height={2} width={26} borderRadius={1} backgroundColor="rgba(255,255,255,0.5)" />
      </Stack>
    </Stack>
  )
}

// ─── Activity Card ────────────────────────────────────────────────────────────
function ActivityCard() {
  return (
    <StyledCard
      shadow="dark"
      borderRadius={20}
      padding={0}
      backgroundColor={C.dark}
      overflow="hidden"
    >
      <Stack padding={20} gap={20}>
        {/* Top row: title left, ring right */}
        <Stack horizontal justifyContent="space-between" alignItems="center">
          <Stack gap={4} flex={1}>
            <StyledText fontSize={22} fontWeight="800" color={C.white} lineHeight={28}>
              Today's{'\n'}Activities
            </StyledText>
            <StyledText fontSize={13} color="rgba(255,255,255,0.5)">
              Body Weight
            </StyledText>
          </Stack>
          {/* Fixed-width container stops ring from flexing */}
          <Stack width={84} alignItems="center" style={{ flexShrink: 0 }}>
            <CircularProgress value={7} total={9} label="Workout" size={80} />
          </Stack>
        </Stack>

        {/* Stats row */}
        <Stack horizontal>
          <StatItem value="1200" unit="kcal" label="Calories Burned" />
          <StatItem value="90"   unit="bpm"  label="Heart Rate" />
          <StatItem value="03:00" unit="hr"  label="Time" />
        </Stack>
      </Stack>
    </StyledCard>
  )
}

// ─── Category Pills ───────────────────────────────────────────────────────────
function CategoryPills({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 10, paddingRight: 16 }}
    >
      {CATEGORIES.map((cat) => {
        const isActive = cat.value === selected
        return (
          <StyledPressable
            key={cat.value}
            onPress={() => onSelect(cat.value)}
            paddingHorizontal={20}
            paddingVertical={10}
            borderRadius={9999}
            borderWidth={1.5}
            borderColor={isActive ? C.lime : theme.colors.gray[200]}
            backgroundColor={isActive ? C.lime : C.white}
          >
            <StyledText
              fontSize={14}
              fontWeight={isActive ? '700' : '500'}
              color={isActive ? C.dark : theme.colors.gray[600]}
            >
              {cat.label}
            </StyledText>
          </StyledPressable>
        )
      })}
    </ScrollView>
  )
}

// ─── Workout Card ─────────────────────────────────────────────────────────────
function WorkoutCard({ item, onLike }: { item: typeof WORKOUTS[0]; onLike: () => void }) {
  return (
    <StyledCard shadow="light" borderRadius={16} padding={0} overflow="hidden" width={180}>
      <Stack height={190} style={{ position: 'relative' }}>
        <StyledImage source={{ uri: item.image }} width={180} height={190} resizeMode="cover" />
        <Stack
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
          height={80}
          backgroundColor="rgba(0,0,0,0.28)"
        />
        <Stack style={{ position: 'absolute', top: 10, left: 10 }}>
          <StyledBadge
            fontSize={11}
            fontWeight="600"
            color={C.white}
            backgroundColor="rgba(0,0,0,0.45)"
            paddingHorizontal={10}
            paddingVertical={4}
            borderRadius={9999}
          >
            {item.level}
          </StyledBadge>
        </Stack>
        <StyledPressable
          onPress={onLike}
          style={{ position: 'absolute', top: 8, right: 8 }}
          width={32}
          height={32}
          borderRadius={16}
          backgroundColor="rgba(255,255,255,0.88)"
          alignItems="center"
          justifyContent="center"
        >
          <StyledText fontSize={15}>{item.liked ? '❤️' : '🤍'}</StyledText>
        </StyledPressable>
      </Stack>
      <Stack padding={12} gap={6}>
        <StyledText fontSize={14} fontWeight="700" color={C.dark}>{item.title}</StyledText>
        <Stack horizontal alignItems="center" gap={4}>
          <StyledText fontSize={12} color={C.muted}>⏱</StyledText>
          <StyledText fontSize={12} color={C.muted}>{item.duration}</StyledText>
        </Stack>
      </Stack>
    </StyledCard>
  )
}

// ─── Bottom Tab Bar ───────────────────────────────────────────────────────────
function BottomTabBar({ active, onPress }: { active: string; onPress: (v: string) => void }) {
  return (
    <StyledCard
      shadow="mediumDark"
      borderRadius={0}
      padding={0}
      backgroundColor={C.white}
      style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
    >
      <Stack
        horizontal
        alignItems="center"
        justifyContent="space-around"
        paddingHorizontal={8}
        paddingTop={12}
        paddingBottom={28}
      >
        {BOTTOM_TABS.map((tab) => {
          const isAdd    = tab.value === 'add'
          const isActive = tab.value === active && !isAdd

          if (isAdd) {
            return (
              <StyledPressable
                key={tab.value}
                onPress={() => onPress(tab.value)}
                width={54}
                height={54}
                borderRadius={27}
                backgroundColor={C.lime}
                alignItems="center"
                justifyContent="center"
                style={{ marginTop: -22 }}
              >
                <StyledText fontSize={24} color={C.dark}>+</StyledText>
              </StyledPressable>
            )
          }

          return (
            <StyledPressable
              key={tab.value}
              onPress={() => onPress(tab.value)}
              alignItems="center"
              justifyContent="center"
              width={44}
              height={44}
              gap={2}
            >
              <StyledText fontSize={22}>{tab.icon}</StyledText>
              <Stack
                width={4}
                height={4}
                borderRadius={2}
                backgroundColor={isActive ? C.dark : 'transparent'}
              />
            </StyledPressable>
          )
        })}
      </Stack>
    </StyledCard>
  )
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function Demo() {
  const [category, setCategory]   = useState('all')
  const [activeTab, setActiveTab] = useState('home')
  const [workouts, setWorkouts]   = useState(WORKOUTS)
  const toast = useToast()

  const filtered =
    category === 'all'
      ? workouts
      : workouts.filter((w) => w.title.toLowerCase().includes(category.toLowerCase()))

  function toggleLike(id: string) {
    setWorkouts((prev) => prev.map((w) => (w.id === id ? { ...w, liked: !w.liked } : w)))
    const item = workouts.find((w) => w.id === id)
    if (item) toast.success(item.liked ? 'Removed from likes' : 'Added to likes!')
  }

  return (
    <StyledSafeAreaView flex={1} backgroundColor={C.bg}>
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* ── Top Bar ──────────────────────────────────────────────────────── */}
        <Stack
          horizontal
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal={16}
          paddingVertical={12}
        >
          <StyleShape size={46} borderRadius={23} overflow="hidden" borderWidth={2.5} borderColor={C.lime}>
            <StyledImage
              source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
              width={46}
              height={46}
              resizeMode="cover"
            />
          </StyleShape>

          <Stack horizontal gap={10} alignItems="center">
            <StyledPressable
              onPress={() => toast.info('Search coming soon')}
              width={42} height={42} borderRadius={21}
              backgroundColor={C.white}
              alignItems="center" justifyContent="center"
            >
              <StyledText fontSize={18}>🔍</StyledText>
            </StyledPressable>

            <Stack width={42} height={42}>
              <StyledPressable
                onPress={() => toast.info('No new notifications')}
                width={42} height={42} borderRadius={21}
                backgroundColor={C.white}
                alignItems="center" justifyContent="center"
              >
                <StyledText fontSize={18}>🔔</StyledText>
              </StyledPressable>
              <Stack
                style={{ position: 'absolute', top: 8, right: 8 }}
                width={9} height={9} borderRadius={5}
                backgroundColor="#EF4444"
                borderWidth={1.5}
                borderColor={C.bg}
              />
            </Stack>
          </Stack>
        </Stack>

        {/* ── Activity Card ─────────────────────────────────────────────────── */}
        <Stack paddingHorizontal={16}>
          <ActivityCard />
        </Stack>

        <StyledSpacer height={24} />

        {/* ── Category ──────────────────────────────────────────────────────── */}
        <Stack paddingHorizontal={16} marginBottom={10}>
          <StyledText fontSize={18} fontWeight="800" color={C.dark}>Category</StyledText>
        </Stack>
        <Stack paddingLeft={16}>
          <CategoryPills selected={category} onSelect={setCategory} />
        </Stack>

        <StyledSpacer height={24} />

        {/* ── Popular ───────────────────────────────────────────────────────── */}
        <Stack
          horizontal
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal={16}
          marginBottom={14}
        >
          <StyledText fontSize={18} fontWeight="800" color={C.dark}>Popular</StyledText>
          <StyledPressable onPress={() => toast.info('See all workouts')}>
            <StyledText fontSize={14} fontWeight="600" color={C.lime}>See All</StyledText>
          </StyledPressable>
        </Stack>

        <StyledScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 14, paddingHorizontal: 16, paddingRight: 24 }}
        >
          {filtered.map((item) => (
            <WorkoutCard key={item.id} item={item} onLike={() => toggleLike(item.id)} />
          ))}
        </StyledScrollView>
      </StyledScrollView>

      <BottomTabBar active={activeTab} onPress={setActiveTab} />
    </StyledSafeAreaView>
  )
}