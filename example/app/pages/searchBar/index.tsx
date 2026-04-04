/**
 * SearchBarDemo
 * Demonstrates all StyledSearchBar variants, sizes, and features.
 * Uses only fluent-styles primitives — no bare View/Text.
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
  StyledSearchBar, type SearchSuggestion
} from 'fluent-styles'

// ─── Sample data ──────────────────────────────────────────────────────────────
const SUGGESTIONS: SearchSuggestion[] = [
  { id: '1', label: 'React Native',    subtitle: 'Framework',       icon: <StyledText>⚛️</StyledText> },
  { id: '2', label: 'TypeScript',      subtitle: 'Language',        icon: <StyledText>🔷</StyledText> },
  { id: '3', label: 'fluent-styles',   subtitle: 'UI Library',      icon: <StyledText>🎨</StyledText> },
  { id: '4', label: 'Expo',            subtitle: 'Build tool',      icon: <StyledText>📱</StyledText> },
  { id: '5', label: 'Reanimated',      subtitle: 'Animation',       icon: <StyledText>✨</StyledText> },
]

// ─── Section header ───────────────────────────────────────────────────────────
const Section: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <Stack gap={2} marginBottom={12}>
    <StyledText fontSize={theme.fontSize.normal} fontWeight="700" color={theme.colors.gray[800]} letterSpacing={0.8}>
      {title}
    </StyledText>
    {subtitle && <StyledText fontSize={theme.fontSize.small} color={theme.colors.gray[400]}>{subtitle}</StyledText>}
  </Stack>
)

// ─── Screen ───────────────────────────────────────────────────────────────────
export const SearchBarDemo: React.FC = () => {
  const [filledVal,   setFilledVal]   = useState('')
  const [outlineVal,  setOutlineVal]  = useState('')
  const [ghostVal,    setGhostVal]    = useState('')
  const [floatVal,    setFloatVal]    = useState('')
  const [cancelVal,   setCancelVal]   = useState('')
  const [suggestVal,  setSuggestVal]  = useState('')
  const [darkVal,     setDarkVal]     = useState('')

  const [lastSubmit,  setLastSubmit]  = useState<string | null>(null)
  const [lastSuggest, setLastSuggest] = useState<string | null>(null)

  // Filter suggestions while typing
  const filtered = suggestVal.length > 0
    ? SUGGESTIONS.filter(s => s.label.toLowerCase().includes(suggestVal.toLowerCase()))
    : SUGGESTIONS

  return (
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>

        {/* 1 — Variants */}
        <Section title="Variants" />
        <StyledCard  borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={14}>
            <Stack gap={4}>
              <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">FILLED (default)</StyledText>
              <StyledSearchBar
                variant="filled"
                value={filledVal}
                onChangeText={setFilledVal}
                onSubmit={setLastSubmit}
              />
            </Stack>

            <StyledDivider borderBottomColor={theme.colors.gray[100]} />

            <Stack gap={4}>
              <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">OUTLINE</StyledText>
              <StyledSearchBar
                variant="outline"
                value={outlineVal}
                onChangeText={setOutlineVal}
                onSubmit={setLastSubmit}
              />
            </Stack>

            <StyledDivider borderBottomColor={theme.colors.gray[100]} />

            <Stack gap={4}>
              <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">GHOST</StyledText>
              <Stack backgroundColor={theme.colors.gray[100]} borderRadius={12} padding={8}>
                <StyledSearchBar
                  variant="ghost"
                  value={ghostVal}
                  onChangeText={setGhostVal}
                  onSubmit={setLastSubmit}
                />
              </Stack>
            </Stack>

            <StyledDivider borderBottomColor={theme.colors.gray[100]} />

            <Stack gap={4}>
              <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">FLOATING (shadow)</StyledText>
              <StyledSearchBar
                variant="floating"
                value={floatVal}
                onChangeText={setFloatVal}
                onSubmit={setLastSubmit}
              />
            </Stack>
          </Stack>
        </StyledCard>

        {/* 2 — Sizes */}
        <Section title="Sizes" />
        <StyledCard  borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={14}>
            {(['sm', 'md', 'lg'] as const).map(s => (
              <Stack key={s} gap={4}>
                <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">{s.toUpperCase()}</StyledText>
                <StyledSearchBar variant="filled" size={s} placeholder={`Size ${s}`} />
              </Stack>
            ))}
          </Stack>
        </StyledCard>

        {/* 3 — With Cancel */}
        <Section title="With Cancel button" subtitle="Appears on focus or when value present" />
        <StyledCard padding={16} borderRadius={16} shadow="light" marginBottom={24}>
          <StyledSearchBar
            variant="filled"
            value={cancelVal}
            onChangeText={setCancelVal}
            showCancel
            onCancel={() => setCancelVal('')}
          />
        </StyledCard>

        {/* 4 — Suggestions */}
        <Section title="Suggestions dropdown" subtitle="Filters as you type" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledSearchBar
            variant="outline"
            value={suggestVal}
            onChangeText={setSuggestVal}
            onSubmit={setLastSubmit}
            suggestions={filtered}
            onSuggestionPress={(item) => {
              setSuggestVal(item.label)
              setLastSuggest(item.label)
            }}
            showCancel
            onCancel={() => setSuggestVal('')}
          />
          {lastSuggest && (
            <StyledText fontSize={13} color={theme.colors.gray[400]} marginTop={8}>
              Selected: <StyledText fontWeight="600" color={theme.colors.gray[800]}>{lastSuggest}</StyledText>
            </StyledText>
          )}
        </StyledCard>

        {/* 5 — Right action slot */}
        <Section title="Right action slot" subtitle="Filter / voice / camera buttons" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={12}>
            <StyledSearchBar
              variant="filled"
              placeholder="Search with filter…"
              rightAction={
                <StyledPressable
                  onPress={() => {}}
                  paddingHorizontal={8}
                  paddingVertical={4}
                  borderRadius={8}
                  backgroundColor={theme.colors.gray[200]}
                >
                  <StyledText fontSize={14}>⚙️</StyledText>
                </StyledPressable>
              }
            />
            <StyledSearchBar
              variant="outline"
              placeholder="Voice search…"
              rightAction={
                <StyledPressable onPress={() => {}} padding={4}>
                  <StyledText fontSize={16}>🎙️</StyledText>
                </StyledPressable>
              }
            />
          </Stack>
        </StyledCard>

        {/* 6 — Loading state */}
        <Section title="States" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={12}>
            <Stack gap={4}>
              <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">LOADING</StyledText>
              <StyledSearchBar variant="filled" value="react native" loading />
            </Stack>
            <Stack gap={4}>
              <StyledText fontSize={11} color={theme.colors.gray[400]} fontWeight="600">DISABLED</StyledText>
              <StyledSearchBar variant="outline" value="disabled search" disabled />
            </Stack>
          </Stack>
        </StyledCard>

        {/* 7 — Colour themes */}
        <Section title="Colour themes" />
        <Stack gap={12} marginBottom={24}>

          {/* Indigo */}
          <StyledCard borderRadius={14} shadow="light">
            <StyledSearchBar
              variant="outline"
              placeholder="Search (indigo)…"
              colors={{
                focusBorder:  palettes.indigo[500],
                background:   palettes.indigo[50],
                clearBg:      palettes.indigo[200],
                clearIcon:    palettes.indigo[700],
                cancelText:   palettes.indigo[600],
              }}
            />
          </StyledCard>

          {/* Dark / midnight */}
          <Stack
            backgroundColor={theme.colors.gray[900]}
            padding={14}
            borderRadius={14}
            gap={0}
          >
            <StyledSearchBar
              variant="filled"
              value={darkVal}
              onChangeText={setDarkVal}
              placeholder="Dark theme search…"
              colors={{
                background:   theme.colors.gray[800],
                border:       theme.colors.gray[700],
                focusBorder:  palettes.indigo[400],
                placeholder:  theme.colors.gray[500],
                text:         palettes.white,
                icon:         theme.colors.gray[500],
                clearBg:      theme.colors.gray[600],
                clearIcon:    theme.colors.gray[200],
                cancelText:   palettes.white,
                suggestionBg: theme.colors.gray[800],
                suggestionText: palettes.white,
                suggestionBorder: theme.colors.gray[700],
                divider:      theme.colors.gray[700],
              }}
            />
          </Stack>

          {/* Rose */}
          <StyledCard borderRadius={14} shadow="light">
            <StyledSearchBar
              variant="outline"
              placeholder="Search (rose)…"
              colors={{
                focusBorder: palettes.rose[500],
                background:  palettes.rose[50],
                icon:        palettes.rose[400],
                clearBg:     palettes.rose[200],
                clearIcon:   palettes.rose[700],
              }}
            />
          </StyledCard>
        </Stack>

        {/* 8 — Custom left icon */}
        <Section title="Custom left icon" />
        <StyledCard padding={16} borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={12}>
            <StyledSearchBar
              variant="filled"
              placeholder="Search locations…"
              leftIcon={<StyledText fontSize={16}>📍</StyledText>}
            />
            <StyledSearchBar
              variant="outline"
              placeholder="Search products…"
              leftIcon={<StyledText fontSize={16}>🛍️</StyledText>}
            />
          </Stack>
        </StyledCard>

        {/* Submit feedback */}
        {lastSubmit && (
          <StyledCard padding={14} borderRadius={12} shadow="light" backgroundColor={palettes.indigo[50]}>
            <StyledText fontSize={14} color={palettes.indigo[700]}>
              Last search: <StyledText fontWeight="700">{lastSubmit}</StyledText>
            </StyledText>
          </StyledCard>
        )}

      </StyledScrollView>
    </Stack>
  )
}

export default SearchBarDemo