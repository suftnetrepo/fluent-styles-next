/**
 * BottomSheetDemo
 * Demonstrates all StyledBottomSheet configurations.
 * Uses only fluent-styles primitives.
 */

import React, { useState } from 'react'
import {
  StyledPage,
  StyledScrollView,
  StyledSafeAreaView,
  StyledHeader,
  Stack,
  StyledText,
  StyledPressable,
  StyledCard,
  StyledDivider,
  theme,
  palettes,
  StyledBottomSheet
} from 'fluent-styles'

// ─── Demo trigger button ──────────────────────────────────────────────────────
const TriggerBtn: React.FC<{ label: string; onPress: () => void; color?: string }> = ({
  label, onPress, color = theme.colors.gray[900]
}) => (
  <StyledPressable
    onPress={onPress}
    paddingVertical={11}
    paddingHorizontal={16}
    borderRadius={10}
    backgroundColor={color}
    alignItems="center"
    flex={1}
  >
    <StyledText fontSize={13} fontWeight="600" color={palettes.white} textAlign="center">{label}</StyledText>
  </StyledPressable>
)

// ─── Section label ────────────────────────────────────────────────────────────
const Section: React.FC<{ title: string }> = ({ title }) => (
  <StyledText fontSize={theme.fontSize.normal} fontWeight={theme.fontWeight.medium} color={theme.colors.gray[800]}
    letterSpacing={0.8} >
    {title}
  </StyledText>
)

// ─── Screen ───────────────────────────────────────────────────────────────────
export const BottomSheetDemo: React.FC = () => {
  const [activeSheet, setActiveSheet] = useState<string | null>(null)

  const show  = (id: string) => setActiveSheet(id)
  const close = ()            => setActiveSheet(null)
  const is    = (id: string) => activeSheet === id

  return (
    <Stack flex={1} borderRadius={16} marginTop={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>

        {/* Basic */}
        <Section title="Basic" />
        <StyledCard padding={16} borderRadius={16} shadow="light" marginBottom={24}>
          <Stack horizontal gap={10}>
            <TriggerBtn label="Plain" onPress={() => show('plain')} />
            <TriggerBtn label="With title" onPress={() => show('title')} color={palettes.indigo[600]} />
            <TriggerBtn label="With close ✕" onPress={() => show('close')} color={theme.colors.gray[700]} />
          </Stack>
        </StyledCard>

        {/* Snap points */}
        <Section title="Snap points" />
        <StyledCard padding={16} borderRadius={16} shadow="light" marginBottom={24}>
          <StyledText fontSize={13} color={theme.colors.gray[500]} marginBottom={12}>
            Drag the sheet between snap heights. Release near a snap to lock.
          </StyledText>
          <Stack horizontal gap={10}>
            <TriggerBtn label="2 snaps" onPress={() => show('snap2')} />
            <TriggerBtn label="3 snaps" onPress={() => show('snap3')} color={palettes.indigo[600]} />
          </Stack>
        </StyledCard>

        {/* Scrollable content */}
        <Section title="Scrollable content" />
        <StyledCard padding={16} borderRadius={16} shadow="light" marginBottom={24}>
          <TriggerBtn label="Scrollable list sheet" onPress={() => show('scroll')} />
        </StyledCard>

        {/* No backdrop */}
        <Section title="Backdrop options" />
        <StyledCard padding={16} borderRadius={16} shadow="light" marginBottom={24}>
          <Stack horizontal gap={10}>
            <TriggerBtn label="No backdrop" onPress={() => show('nobackdrop')} />
            <TriggerBtn
              label="Lock (no dismiss on tap)"
              onPress={() => show('lock')}
              color={palettes.rose[600]}
            />
          </Stack>
        </StyledCard>

        {/* Themes */}
        <Section title="Themes" />
        <StyledCard padding={16} borderRadius={16} shadow="light" marginBottom={24}>
          <Stack horizontal gap={10}>
            <TriggerBtn label="Light" onPress={() => show('light')} />
            <TriggerBtn label="Dark" onPress={() => show('dark')} color={theme.colors.gray[900]} />
          </Stack>
        </StyledCard>

        {/* Colour overrides */}
        <Section title="Colour token overrides" />
        <StyledCard padding={16} borderRadius={16} shadow="light" marginBottom={24}>
          <Stack horizontal gap={10}>
            <TriggerBtn label="Indigo" onPress={() => show('indigo')} color={palettes.indigo[600]} />
            <TriggerBtn label="Rose"   onPress={() => show('rose')}   color={palettes.rose[600]} />
            <TriggerBtn label="Teal"   onPress={() => show('teal')}   color={palettes.teal[600]} />
          </Stack>
        </StyledCard>

        {/* Real world: share sheet */}
        <Section title="Real-world examples" />
        <StyledCard padding={16} borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={10}>
            <TriggerBtn label="Share sheet"       onPress={() => show('share')} />
            <TriggerBtn label="Options menu"      onPress={() => show('options')} color={theme.colors.gray[700]} />
            <TriggerBtn label="Filter panel"      onPress={() => show('filter')} color={palettes.indigo[600]} />
          </Stack>
        </StyledCard>

      </StyledScrollView>

      {/* ── Sheets ─────────────────────────────────────────────── */}

      {/* Plain */}
      <StyledBottomSheet visible={is('plain')} onClose={close}>
        <Stack padding={24} gap={8}>
          <StyledText fontSize={16} fontWeight="700" color={theme.colors.gray[900]}>Plain sheet</StyledText>
          <StyledText fontSize={14} color={theme.colors.gray[500]}>
            No header, no title. Just your content.
          </StyledText>
        </Stack>
      </StyledBottomSheet>

      {/* With title */}
      <StyledBottomSheet visible={is('title')} onClose={close} title="Notifications" subtitle="Your recent alerts">
        <Stack padding={20} gap={12}>
          {['New follower',  'Comment on post', 'Reaction to photo'].map((t, i) => (
            <Stack key={t} horizontal gap={12} alignItems="center" paddingVertical={8}
              borderBottomWidth={i < 2 ? 1 : 0} borderBottomColor={theme.colors.gray[100]}>
              <StyledText fontSize={20}>{['👤','💬','❤️'][i]}</StyledText>
              <StyledText fontSize={14} color={theme.colors.gray[800]}>{t}</StyledText>
            </Stack>
          ))}
        </Stack>
      </StyledBottomSheet>

      {/* With close button */}
      <StyledBottomSheet visible={is('close')} onClose={close} title="Settings" showClose>
        <Stack padding={20} gap={14}>
          {['Profile', 'Privacy', 'Notifications', 'Security', 'Help'].map((item) => (
            <Stack key={item} horizontal justifyContent="space-between" alignItems="center"
              paddingVertical={10} borderBottomWidth={1} borderBottomColor={theme.colors.gray[100]}>
              <StyledText fontSize={15} fontWeight="600" color={theme.colors.gray[800]}>{item}</StyledText>
              <StyledText fontSize={14} color={theme.colors.gray[400]}>›</StyledText>
            </Stack>
          ))}
        </Stack>
      </StyledBottomSheet>

      {/* 2 snaps */}
      <StyledBottomSheet
        visible={is('snap2')} onClose={close}
        title="Two snap points" showClose
        snapPoints={['35%', '70%']}
      >
        <Stack padding={20} gap={8}>
          <StyledText fontSize={14} color={theme.colors.gray[500]}>
            Drag up to 70 % or down to 35 %. Flick down to dismiss.
          </StyledText>
          {Array.from({ length: 10 }).map((_, i) => (
            <Stack key={i} height={44} borderRadius={10} backgroundColor={theme.colors.gray[100]}
              alignItems="center" justifyContent="center">
              <StyledText fontSize={13} color={theme.colors.gray[500]}>Row {i + 1}</StyledText>
            </Stack>
          ))}
        </Stack>
      </StyledBottomSheet>

      {/* 3 snaps */}
      <StyledBottomSheet
        visible={is('snap3')} onClose={close}
        title="Three snap points" showClose
        snapPoints={['25%', '50%', '85%']}
      >
        <Stack padding={20}>
          <StyledText fontSize={14} color={theme.colors.gray[500]} marginBottom={12}>
            Snaps at 25 %, 50 %, and 85 % of screen height.
          </StyledText>
          {Array.from({ length: 16 }).map((_, i) => (
            <Stack key={i} height={40} marginBottom={8} borderRadius={8}
              backgroundColor={theme.colors.gray[100]} alignItems="center" justifyContent="center">
              <StyledText fontSize={13} color={theme.colors.gray[500]}>Item {i + 1}</StyledText>
            </Stack>
          ))}
        </Stack>
      </StyledBottomSheet>

      {/* Scrollable */}
      <StyledBottomSheet
        visible={is('scroll')} onClose={close}
        title="Scrollable list" showClose
        snapPoints={['60%']}
        scrollable
      >
        <Stack padding={20} gap={10}>
          {Array.from({ length: 24 }).map((_, i) => (
            <Stack key={i} horizontal gap={12} alignItems="center"
              padding={12} borderRadius={12} backgroundColor={theme.colors.gray[50]}>
              <Stack width={36} height={36} borderRadius={18}
                backgroundColor={theme.colors.gray[200]}
                alignItems="center" justifyContent="center">
                <StyledText fontSize={16}>{['🍎','🍊','🍋','🍇','🍓'][i % 5]}</StyledText>
              </Stack>
              <StyledText fontSize={14} fontWeight="600" color={theme.colors.gray[800]}>
                Item {i + 1}
              </StyledText>
            </Stack>
          ))}
        </Stack>
      </StyledBottomSheet>

      {/* No backdrop */}
      <StyledBottomSheet
        visible={is('nobackdrop')} onClose={close}
        title="No backdrop" showClose
        colors={{ overlay: 'transparent' }}
      >
        <Stack padding={20}>
          <StyledText fontSize={14} color={theme.colors.gray[500]}>
            The background is still interactive — only the sheet shows.
          </StyledText>
        </Stack>
      </StyledBottomSheet>

      {/* Lock */}
      <StyledBottomSheet
        visible={is('lock')} onClose={close}
        title="Locked sheet" showClose
        closeOnBackdrop={false}
      >
        <Stack padding={20} gap={8}>
          <StyledText fontSize={14} color={theme.colors.gray[500]}>
            Tapping the backdrop does nothing. Use the ✕ button to dismiss.
          </StyledText>
        </Stack>
      </StyledBottomSheet>

      {/* Light theme */}
      <StyledBottomSheet
        visible={is('light')} onClose={close}
        title="Light theme" showClose
        sheetTheme="light"
      >
        <Stack padding={20}>
          <StyledText fontSize={14} color={theme.colors.gray[500]}>Default light-mode sheet.</StyledText>
        </Stack>
      </StyledBottomSheet>

      {/* Dark theme */}
      <StyledBottomSheet
        visible={is('dark')} onClose={close}
        title="Dark theme" subtitle="Midnight surface" showClose
        sheetTheme="dark"
      >
        <Stack padding={20} gap={12}>
          {['Dashboard', 'Analytics', 'Reports', 'Export'].map(item => (
            <Stack key={item} horizontal justifyContent="space-between"
              padding={14} borderRadius={12}
              backgroundColor={theme.colors.gray[800]}>
              <StyledText fontSize={14} fontWeight="600" color={theme.colors.gray[100]}>{item}</StyledText>
              <StyledText fontSize={14} color={theme.colors.gray[500]}>›</StyledText>
            </Stack>
          ))}
        </Stack>
      </StyledBottomSheet>

      {/* Indigo */}
      <StyledBottomSheet
        visible={is('indigo')} onClose={close}
        title="Indigo theme" showClose
        colors={{
          background:   palettes.indigo[50],
          handle:       palettes.indigo[300],
          headerTitle:  palettes.indigo[900],
          headerBorder: palettes.indigo[100],
          closeIconBg:  palettes.indigo[100],
          closeIcon:    palettes.indigo[600],
        }}
      >
        <Stack padding={20}>
          <StyledText fontSize={14} color={palettes.indigo[500]}>Custom indigo surface.</StyledText>
        </Stack>
      </StyledBottomSheet>

      {/* Rose */}
      <StyledBottomSheet
        visible={is('rose')} onClose={close}
        title="Rose theme" showClose
        colors={{
          background:   palettes.rose[50],
          handle:       palettes.rose[300],
          headerTitle:  palettes.rose[900],
          headerBorder: palettes.rose[100],
          closeIconBg:  palettes.rose[100],
          closeIcon:    palettes.rose[600],
        }}
      >
        <Stack padding={20}>
          <StyledText fontSize={14} color={palettes.rose[500]}>Warm rose palette.</StyledText>
        </Stack>
      </StyledBottomSheet>

      {/* Teal */}
      <StyledBottomSheet
        visible={is('teal')} onClose={close}
        title="Teal theme" showClose
        colors={{
          background:   palettes.teal[50],
          handle:       palettes.teal[300],
          headerTitle:  palettes.teal[900],
          headerBorder: palettes.teal[100],
          closeIconBg:  palettes.teal[100],
          closeIcon:    palettes.teal[600],
        }}
      >
        <Stack padding={20}>
          <StyledText fontSize={14} color={palettes.teal[600]}>Cool teal surface.</StyledText>
        </Stack>
      </StyledBottomSheet>

      {/* Share sheet */}
      <StyledBottomSheet
        visible={is('share')} onClose={close}
        title="Share post" subtitle="Choose where to send"
        showClose showHandle
        snapPoints={['42%']}
      >
        <Stack padding={20} gap={16}>
          <Stack horizontal gap={20} justifyContent="center">
            {[
              { icon: '💬', label: 'Messages' },
              { icon: '✉️', label: 'Mail' },
              { icon: '🔗', label: 'Copy link' },
              { icon: '📋', label: 'More' },
            ].map(({ icon, label }) => (
              <Stack key={label} alignItems="center" gap={6}>
                <StyledPressable
                  onPress={close}
                  width={52} height={52} borderRadius={26}
                  backgroundColor={theme.colors.gray[100]}
                  alignItems="center" justifyContent="center"
                >
                  <StyledText fontSize={22}>{icon}</StyledText>
                </StyledPressable>
                <StyledText fontSize={11} color={theme.colors.gray[500]}>{label}</StyledText>
              </Stack>
            ))}
          </Stack>
          <StyledPressable
            onPress={close}
            paddingVertical={13}
            borderRadius={12}
            backgroundColor={theme.colors.gray[100]}
            alignItems="center"
          >
            <StyledText fontSize={15} fontWeight="600" color={theme.colors.gray[800]}>Cancel</StyledText>
          </StyledPressable>
        </Stack>
      </StyledBottomSheet>

      {/* Options */}
      <StyledBottomSheet
        visible={is('options')} onClose={close}
        title="Post options" showClose
        snapPoints={['48%']}
      >
        <Stack paddingHorizontal={20} paddingBottom={16}>
          {[
            { icon: '✏️', label: 'Edit post',        color: theme.colors.gray[800] },
            { icon: '🔗', label: 'Copy link',         color: theme.colors.gray[800] },
            { icon: '📌', label: 'Pin to profile',    color: theme.colors.gray[800] },
            { icon: '🚩', label: 'Report',            color: palettes.rose[600] },
            { icon: '🗑️', label: 'Delete post',       color: palettes.rose[600] },
          ].map(({ icon, label, color }, idx) => (
            <Stack key={label}>
              <StyledPressable onPress={close} flexDirection='row' gap={14} paddingVertical={14} alignItems="center">
                <StyledText fontSize={20}>{icon}</StyledText>
                <StyledText fontSize={15} fontWeight="600" color={color}>{label}</StyledText>
              </StyledPressable>
              {idx < 4 && <StyledDivider borderBottomColor={theme.colors.gray[100]} />}
            </Stack>
          ))}
        </Stack>
      </StyledBottomSheet>

      {/* Filter */}
      <StyledBottomSheet
        visible={is('filter')} onClose={close}
        title="Filter results" subtitle="Narrow down your search"
        showClose snapPoints={['65%']}
        colors={{
          background:   palettes.indigo[50],
          headerTitle:  palettes.indigo[900],
          headerBorder: palettes.indigo[100],
          handle:       palettes.indigo[300],
          closeIconBg:  palettes.indigo[100],
          closeIcon:    palettes.indigo[600],
        }}
      >
        <Stack padding={20} gap={16}>
          <StyledText fontSize={14} fontWeight="700" color={palettes.indigo[800]}>Category</StyledText>
          <Stack horizontal gap={8} flexWrap="wrap">
            {['All', 'Design', 'Engineering', 'Marketing', 'Product'].map(cat => (
              <StyledPressable
                key={cat}
                onPress={() => {}}
                paddingHorizontal={14} paddingVertical={8}
                borderRadius={20}
                backgroundColor={cat === 'Engineering' ? palettes.indigo[600] : palettes.indigo[100]}
              >
                <StyledText
                  fontSize={13} fontWeight="600"
                  color={cat === 'Engineering' ? palettes.white : palettes.indigo[700]}
                >
                  {cat}
                </StyledText>
              </StyledPressable>
            ))}
          </Stack>
          <StyledText fontSize={14} fontWeight="700" color={palettes.indigo[800]} marginTop={4}>Sort by</StyledText>
          {['Newest first', 'Most popular', 'Highest rated'].map(opt => (
            <Stack key={opt} horizontal justifyContent="space-between"
              padding={14} borderRadius={12}
              backgroundColor={opt === 'Newest first' ? palettes.indigo[600] : palettes.white}>
              <StyledText fontSize={14} fontWeight="600"
                color={opt === 'Newest first' ? palettes.white : palettes.indigo[700]}>{opt}</StyledText>
              {opt === 'Newest first' && <StyledText color={palettes.white}>✓</StyledText>}
            </Stack>
          ))}
          <StyledPressable
            onPress={close}
            paddingVertical={14}
            borderRadius={12}
            backgroundColor={palettes.indigo[600]}
            alignItems="center"
            marginTop={4}
          >
            <StyledText fontSize={15} fontWeight="700" color={palettes.white}>Apply filters</StyledText>
          </StyledPressable>
        </Stack>
      </StyledBottomSheet>
    </Stack>
  )
}

export default BottomSheetDemo