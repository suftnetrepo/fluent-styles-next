/**
 * SkeletonDemo
 * Demonstrates all StyledSkeleton templates, primitives, animations, and themes.
 * Uses only fluent-styles primitives.
 */

import React, { useState, useEffect } from 'react'
import {
  StyledSafeAreaView,
  StyledScrollView,
  StyledHeader,
  Stack,
  StyledText,
  StyledPressable,
  StyledCard,
  StyledDivider,
  theme,
  palettes,
  StyledSkeleton, SkeletonBone
} from 'fluent-styles'

const Section: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <Stack gap={2} marginBottom={12}>
    <StyledText fontSize={11} fontWeight="700" color={theme.colors.gray[400]} letterSpacing={0.8}>
      {title.toUpperCase()}
    </StyledText>
    {subtitle && <StyledText fontSize={12} color={theme.colors.gray[400]}>{subtitle}</StyledText>}
  </Stack>
)

// ─── Simulated loaded content ─────────────────────────────────────────────────
const LoadedCard: React.FC = () => (
  <StyledCard padding={16} borderRadius={14} shadow="light">
    <Stack gap={12}>
      <Stack height={140} borderRadius={10} backgroundColor={palettes.indigo[50]}
        alignItems="center" justifyContent="center">
        <StyledText fontSize={40}>🌄</StyledText>
      </Stack>
      <StyledText fontSize={15} fontWeight="700" color={theme.colors.gray[900]}>
        Mountain sunrise photography
      </StyledText>
      <StyledText fontSize={13} color={theme.colors.gray[400]}>
        Shot at 5:30 AM with zero equipment
      </StyledText>
      <Stack horizontal gap={10} alignItems="center">
        <Stack width={36} height={36} borderRadius={18} backgroundColor={palettes.indigo[100]}
          alignItems="center" justifyContent="center">
          <StyledText fontSize={18}>👤</StyledText>
        </Stack>
        <Stack gap={2}>
          <StyledText fontSize={13} fontWeight="600" color={theme.colors.gray[800]}>Alex Morgan</StyledText>
          <StyledText fontSize={11} color={theme.colors.gray[400]}>2 hours ago</StyledText>
        </Stack>
      </Stack>
    </Stack>
  </StyledCard>
)

const LoadedListItem: React.FC<{ name: string; role: string }> = ({ name, role }) => (
  <Stack horizontal gap={14} alignItems="center" paddingVertical={12} paddingHorizontal={4}>
    <Stack width={48} height={48} borderRadius={24} backgroundColor={palettes.indigo[100]}
      alignItems="center" justifyContent="center">
      <StyledText fontSize={20}>👤</StyledText>
    </Stack>
    <Stack flex={1} gap={4}>
      <StyledText fontSize={14} fontWeight="600" color={theme.colors.gray[900]}>{name}</StyledText>
      <StyledText fontSize={12} color={theme.colors.gray[400]}>{role}</StyledText>
    </Stack>
    <StyledText fontSize={12} color={palettes.indigo[500]} fontWeight="600">Follow</StyledText>
  </Stack>
)

// ─── Screen ───────────────────────────────────────────────────────────────────
export const SkeletonDemo: React.FC = () => {
  const [loadingCard,   setLoadingCard]   = useState(true)
  const [loadingList,   setLoadingList]   = useState(true)
  const [loadingToggle, setLoadingToggle] = useState(true)

  // Auto-resolve simulated loads
  useEffect(() => {
    const t1 = setTimeout(() => setLoadingCard(false),   2200)
    const t2 = setTimeout(() => setLoadingList(false),   3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const resetLoads = () => {
    setLoadingCard(true)
    setLoadingList(true)
    setTimeout(() => setLoadingCard(false),  2200)
    setTimeout(() => setLoadingList(false),  3000)
  }

  return (
    <Stack borderRadius={32} marginTop={16} flex={1} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>

        {/* Replay button */}
        <StyledPressable
          onPress={resetLoads}
          paddingVertical={10} paddingHorizontal={18}
          borderRadius={10}
          backgroundColor={palettes.indigo[600]}
          alignSelf="flex-end"
          marginBottom={20}
        >
          <StyledText fontSize={13} fontWeight="600" color={palettes.white}>↺  Replay loads</StyledText>
        </StyledPressable>

        {/* 1 — Templates */}
        <Section title="Templates" subtitle="Pre-built composed layouts" />
        <Stack gap={16} marginBottom={28}>

          {/* card */}
          <Stack gap={4}>
            <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">CARD TEMPLATE</StyledText>
            {loadingCard
              ? <StyledSkeleton template="card" animation="shimmer" />
              : <LoadedCard />
            }
          </Stack>

          {/* list-item × 3 */}
          <Stack gap={4}>
            <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">LIST-ITEM TEMPLATE × 3</StyledText>
            <StyledCard padding={0} borderRadius={14} shadow="light" overflow="hidden">
              {loadingList ? (
                <Stack paddingHorizontal={16}>
                  <StyledSkeleton template="list-item" repeat={3} animation="shimmer" />
                </Stack>
              ) : (
                <Stack paddingHorizontal={16}>
                  {[
                    { name: 'Priya Kapoor',   role: 'Product Designer'  },
                    { name: 'James Li',       role: 'Frontend Engineer' },
                    { name: 'Maria Santos',   role: 'UX Researcher'     },
                  ].map(({ name, role }, i) => (
                    <Stack key={name}>
                      <LoadedListItem name={name} role={role} />
                      {i < 2 && <StyledDivider borderBottomColor={theme.colors.gray[100]} />}
                    </Stack>
                  ))}
                </Stack>
              )}
            </StyledCard>
          </Stack>

          {/* profile */}
          <Stack gap={4}>
            <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">PROFILE TEMPLATE</StyledText>
            <StyledCard padding={0} borderRadius={14} shadow="light" overflow="hidden">
              <StyledSkeleton template="profile" animation="shimmer" />
            </StyledCard>
          </Stack>

          {/* article */}
          <Stack gap={4}>
            <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">ARTICLE TEMPLATE</StyledText>
            <StyledSkeleton template="article" animation="shimmer" />
          </Stack>

          {/* grid */}
          <Stack gap={4}>
            <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">GRID TEMPLATE (2×2)</StyledText>
            <StyledSkeleton template="grid" animation="shimmer" />
          </Stack>
        </Stack>

        {/* 2 — Animation types */}
        <Section title="Animation types" />
        <StyledCard padding={16} borderRadius={16} shadow="light" marginBottom={28}>
          <Stack gap={20}>
            <Stack gap={8}>
              <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">SHIMMER</StyledText>
              <StyledSkeleton width="100%" height={14} animation="shimmer" />
              <StyledSkeleton width="80%"  height={14} animation="shimmer" />
              <StyledSkeleton width="60%"  height={14} animation="shimmer" />
            </Stack>
            <StyledDivider borderBottomColor={theme.colors.gray[100]} />
            <Stack gap={8}>
              <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">PULSE</StyledText>
              <StyledSkeleton width="100%" height={14} animation="pulse" />
              <StyledSkeleton width="75%"  height={14} animation="pulse" />
              <StyledSkeleton width="55%"  height={14} animation="pulse" />
            </Stack>
            <StyledDivider borderBottomColor={theme.colors.gray[100]} />
            <Stack gap={8}>
              <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">NONE (static)</StyledText>
              <StyledSkeleton width="100%" height={14} animation="none" />
              <StyledSkeleton width="70%"  height={14} animation="none" />
            </Stack>
          </Stack>
        </StyledCard>

        {/* 3 — Primitive shapes */}
        <Section title="Primitive shapes" />
        <StyledCard padding={16} borderRadius={16} shadow="light" marginBottom={28}>
          <Stack gap={16}>
            <Stack gap={6}>
              <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">RECT</StyledText>
              <StyledSkeleton width="100%" height={60} shape="rect" animation="shimmer" />
            </Stack>
            <Stack gap={6}>
              <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">ROUNDED</StyledText>
              <StyledSkeleton width="100%" height={60} shape="rounded" animation="shimmer" />
            </Stack>
            <Stack gap={6}>
              <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">TEXT LINES</StyledText>
              <Stack gap={8}>
                <StyledSkeleton width="100%" height={13} shape="text" animation="shimmer" />
                <StyledSkeleton width="92%"  height={13} shape="text" animation="shimmer" />
                <StyledSkeleton width="78%"  height={13} shape="text" animation="shimmer" />
              </Stack>
            </Stack>
            <Stack gap={6}>
              <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">CIRCLES</StyledText>
              <Stack horizontal gap={12} alignItems="center">
                {[24, 36, 48, 64].map(s => (
                  <StyledSkeleton key={s} width={s} height={s} shape="circle" animation="shimmer" />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </StyledCard>

        {/* 4 — Speed variations */}
        <Section title="Speed variations" />
        <StyledCard padding={16} borderRadius={16} shadow="light" marginBottom={28}>
          <Stack gap={12}>
            {([600, 1000, 1400, 2200] as const).map(spd => (
              <Stack key={spd} horizontal alignItems="center" gap={12}>
                <StyledText fontSize={11} fontWeight="600" color={theme.colors.gray[400]} width={46}>
                  {spd}ms
                </StyledText>
                <Stack flex={1}>
                  <StyledSkeleton width="100%" height={12} shape="text" animation="shimmer" speed={spd} />
                </Stack>
              </Stack>
            ))}
          </Stack>
        </StyledCard>

        {/* 5 — Dark theme */}
        <Section title="Dark theme" />
        <Stack
          backgroundColor={theme.colors.gray[900]}
          padding={16}
          borderRadius={16}
          gap={14}
          marginBottom={28}
        >
          <Stack horizontal gap={12} alignItems="center">
            <SkeletonBone
              width={48} height={48} shape="circle"
              colors={{ base: theme.colors.gray[700], highlight: theme.colors.gray[600], shimmer: 'rgba(255,255,255,0.06)' }}
              animation="shimmer" speed={1400}
            />
            <Stack flex={1} gap={8}>
              <StyledSkeleton width="65%" height={14} skeletonTheme="dark" animation="shimmer" />
              <StyledSkeleton width="45%" height={12} skeletonTheme="dark" animation="shimmer" />
            </Stack>
          </Stack>
          <StyledSkeleton width="100%" height={120} shape="rounded" skeletonTheme="dark" animation="shimmer" />
          <Stack gap={8}>
            <StyledSkeleton width="90%" height={13} shape="text" skeletonTheme="dark" animation="shimmer" />
            <StyledSkeleton width="80%" height={13} shape="text" skeletonTheme="dark" animation="shimmer" />
            <StyledSkeleton width="60%" height={13} shape="text" skeletonTheme="dark" animation="shimmer" />
          </Stack>
        </Stack>

        {/* 6 — Colour overrides */}
        <Section title="Colour token overrides" />
        <Stack gap={12} marginBottom={28}>

          {/* Indigo */}
          <StyledCard padding={14} borderRadius={14} shadow="light">
            <Stack gap={8}>
              <StyledText fontSize={11} color={palettes.indigo[400]} fontWeight="600">INDIGO</StyledText>
              <Stack gap={8}>
                {[100, 80, 60].map(w => (
                  <StyledSkeleton key={w} width={`${w}%` as any} height={13} shape="text" animation="pulse"
                    colors={{ base: palettes.indigo[100], highlight: palettes.indigo[50], shimmer: 'rgba(99,102,241,0.15)' }} />
                ))}
              </Stack>
            </Stack>
          </StyledCard>

          {/* Amber */}
          <StyledCard padding={14} borderRadius={14} shadow="light">
            <Stack gap={8}>
              <StyledText fontSize={11} color={palettes.amber[500]} fontWeight="600">AMBER</StyledText>
              <Stack horizontal gap={12} alignItems="center">
                <SkeletonBone width={52} height={52} shape="circle"
                  colors={{ base: palettes.amber[100], highlight: palettes.amber[50], shimmer: 'rgba(245,158,11,0.2)' }}
                  animation="shimmer" speed={1400} />
                <Stack flex={1} gap={8}>
                  <StyledSkeleton width="70%" height={14} shape="text" animation="shimmer"
                    colors={{ base: palettes.amber[200], highlight: palettes.amber[100], shimmer: 'rgba(245,158,11,0.25)' }} />
                  <StyledSkeleton width="50%" height={12} shape="text" animation="shimmer"
                    colors={{ base: palettes.amber[100], highlight: palettes.amber[50], shimmer: 'rgba(245,158,11,0.2)' }} />
                </Stack>
              </Stack>
            </Stack>
          </StyledCard>
        </Stack>

        {/* 7 — Toggle simulation */}
        <Section title="Toggle loading state" />
        <StyledCard padding={16} borderRadius={16} shadow="light" marginBottom={8}>
          <Stack gap={14}>
            <Stack horizontal justifyContent="space-between" alignItems="center">
              <StyledText fontSize={14} fontWeight="700" color={theme.colors.gray[800]}>User profile</StyledText>
              <StyledPressable
                onPress={() => setLoadingToggle(v => !v)}
                paddingHorizontal={14} paddingVertical={7}
                borderRadius={8}
                backgroundColor={loadingToggle ? theme.colors.gray[900] : palettes.indigo[600]}
              >
                <StyledText fontSize={12} fontWeight="600" color={palettes.white}>
                  {loadingToggle ? 'Stop loading' : 'Simulate load'}
                </StyledText>
              </StyledPressable>
            </Stack>

            {loadingToggle ? (
              <StyledSkeleton template="profile" animation="shimmer" />
            ) : (
              <Stack alignItems="center" gap={14} paddingVertical={12}>
                <Stack width={80} height={80} borderRadius={40}
                  backgroundColor={palettes.indigo[100]} alignItems="center" justifyContent="center">
                  <StyledText fontSize={36}>👩‍💻</StyledText>
                </Stack>
                <Stack alignItems="center" gap={4}>
                  <StyledText fontSize={18} fontWeight="800" color={theme.colors.gray[900]}>
                    Priya Kapoor
                  </StyledText>
                  <StyledText fontSize={14} color={theme.colors.gray[400]}>
                    Senior Product Designer
                  </StyledText>
                </Stack>
                <Stack horizontal gap={24} justifyContent="center">
                  {[['142','Posts'],['3.8k','Followers'],['218','Following']].map(([val, lbl]) => (
                    <Stack key={lbl} alignItems="center" gap={2}>
                      <StyledText fontSize={16} fontWeight="800" color={theme.colors.gray[900]}>{val}</StyledText>
                      <StyledText fontSize={12} color={theme.colors.gray[400]}>{lbl}</StyledText>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            )}
          </Stack>
        </StyledCard>

      </StyledScrollView>
    </Stack>
  )
}

export default SkeletonDemo