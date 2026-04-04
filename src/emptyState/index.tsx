/**
 * StyledEmptyState
 *
 * A data-empty / zero-state display with:
 * - 5 variants: default | card | minimal | illustrated | action-focused
 * - Illustration slot (emoji, icon, or custom ReactNode)
 * - Primary + secondary action buttons
 * - Animated entrance (fade + slide-up)
 * - Compact mode for inline use
 * - Full colour token overrides
 *
 * Rules:
 * - Stack / StyledText / StyledPressable / StyledCard — no bare View/Text
 * - No StyleSheet.create
 * - Colours from theme.colors / palettes
 * - Children typed as CompatNode
 */

import React, { useEffect, useRef, type ReactNode } from 'react'
import { Animated } from 'react-native'
import { Stack, StyledText, StyledPressable, StyledCard, theme, palettes } from 'fluent-styles'

// ─── CompatNode ───────────────────────────────────────────────────────────────
type CompatNode = ReactNode

// ─── Tokens ───────────────────────────────────────────────────────────────────
export interface EmptyStateColors {
  background:       string
  illustrationBg:   string
  title:            string
  description:      string
  primaryBg:        string
  primaryText:      string
  primaryBorder:    string
  secondaryBg:      string
  secondaryText:    string
  secondaryBorder:  string
  border:           string
}

const DEFAULT_COLORS: EmptyStateColors = {
  background:       'transparent',
  illustrationBg:   theme.colors.gray[100],
  title:            theme.colors.gray[900],
  description:      theme.colors.gray[400],
  primaryBg:        theme.colors.gray[900],
  primaryText:      palettes.white,
  primaryBorder:    theme.colors.gray[900],
  secondaryBg:      'transparent',
  secondaryText:    theme.colors.gray[700],
  secondaryBorder:  theme.colors.gray[200],
  border:           theme.colors.gray[100],
}

// ─── Action ───────────────────────────────────────────────────────────────────
export interface EmptyStateAction {
  label:    string
  onPress:  () => void
  icon?:    CompatNode
  variant?: 'primary' | 'secondary'
}

// ─── Types ────────────────────────────────────────────────────────────────────
export type EmptyStateVariant = 'default' | 'card' | 'minimal' | 'illustrated' | 'action'

export interface StyledEmptyStateProps {
  variant?:      EmptyStateVariant
  /** Emoji string, icon component, or any ReactNode */
  illustration?: CompatNode
  title?:        string
  description?:  string
  actions?:      EmptyStateAction[]
  /** Compact horizontal layout */
  compact?:      boolean
  animated?:     boolean
  colors?:       Partial<EmptyStateColors>
  /** Padding around the whole container */
  padding?:      number
  children?:     CompatNode
}

// ─── Component ────────────────────────────────────────────────────────────────
export const StyledEmptyState: React.FC<StyledEmptyStateProps> = ({
  variant     = 'default',
  illustration,
  title,
  description,
  actions     = [],
  compact     = false,
  animated    = true,
  colors: overrides,
  padding     = 32,
  children,
}) => {
  const c = { ...DEFAULT_COLORS, ...overrides }

  const fadeAnim   = useRef(new Animated.Value(animated ? 0 : 1)).current
  const slideAnim  = useRef(new Animated.Value(animated ? 16 : 0)).current

  useEffect(() => {
    if (!animated) return
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 380, delay: 80, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 340, delay: 80, useNativeDriver: true }),
    ]).start()
  }, [])

  // ── Illustration area ────────────────────────────────────────────────────
  const renderIllustration = () => {
    if (!illustration && variant !== 'illustrated') return null

    const isEmoji = typeof illustration === 'string'

    if (variant === 'minimal') {
      return (
        <StyledText fontSize={compact ? 28 : 40} textAlign="center">
          {isEmoji ? illustration : '◌'}
        </StyledText>
      )
    }

    if (variant === 'illustrated') {
      return (
        <Stack
          width={compact ? 56 : 96}
          height={compact ? 56 : 96}
          borderRadius={compact ? 28 : 48}
          backgroundColor={c.illustrationBg}
          alignItems="center"
          justifyContent="center"
        >
          {isEmoji
            ? <StyledText fontSize={compact ? 24 : 40}>{illustration}</StyledText>
            : illustration ?? <StyledText fontSize={32}>📭</StyledText>
          }
        </Stack>
      )
    }

    // default / card / action
    return (
      <Stack
        width={compact ? 48 : 80}
        height={compact ? 48 : 80}
        borderRadius={compact ? 24 : 40}
        backgroundColor={c.illustrationBg}
        alignItems="center"
        justifyContent="center"
      >
        {isEmoji
          ? <StyledText fontSize={compact ? 20 : 36}>{illustration}</StyledText>
          : illustration
        }
      </Stack>
    )
  }

  // ── Action buttons ───────────────────────────────────────────────────────
  const renderActions = () => {
    if (actions.length === 0) return null
    return (
      <Stack
        horizontal={compact || actions.length > 1}
        gap={10}
        marginTop={compact ? 0 : 4}
        flexWrap="wrap"
        justifyContent={compact ? 'flex-start' : 'center'}
      >
        {actions.map((action, idx) => {
          const isPrimary = action.variant === 'primary' || idx === 0
          return (
            <StyledPressable
              key={action.label}
              onPress={action.onPress}
              flexDirection='row'
              alignItems="center"
              gap={6}
              paddingHorizontal={18}
              paddingVertical={10}
              borderRadius={10}
              backgroundColor={isPrimary ? c.primaryBg : c.secondaryBg}
              borderWidth={1}
              borderColor={isPrimary ? c.primaryBorder : c.secondaryBorder}
            >
              {action.icon && <Stack>{action.icon}</Stack>}
              <StyledText
                fontSize={14}
                fontWeight="600"
                color={isPrimary ? c.primaryText : c.secondaryText}
              >
                {action.label}
              </StyledText>
            </StyledPressable>
          )
        })}
      </Stack>
    )
  }

  // ── Text block ───────────────────────────────────────────────────────────
  const renderText = () => (
    <Stack gap={6} flex={compact ? 1 : undefined} alignItems={compact ? 'flex-start' : 'center'}>
      {title && (
        <StyledText
          fontSize={compact ? 15 : 18}
          fontWeight="700"
          color={c.title}
          textAlign={compact ? 'left' : 'center'}
        >
          {title}
        </StyledText>
      )}
      {description && (
        <StyledText
          fontSize={compact ? 13 : 14}
          color={c.description}
          textAlign={compact ? 'left' : 'center'}
          lineHeight={20}
        >
          {description}
        </StyledText>
      )}
    </Stack>
  )

  // ── Inner content ────────────────────────────────────────────────────────
  const inner = (
    <Animated.View
      style={{
        opacity:   fadeAnim,
        transform: [{ translateY: slideAnim }],
        width:     '100%',
      }}
    >
      <Stack
        horizontal={compact}
        alignItems="center"
        gap={compact ? 14 : 16}
        padding={padding}
        backgroundColor={variant === 'card' ? undefined : c.background}
      >
        {renderIllustration()}
        <Stack
          gap={compact ? 8 : 12}
          alignItems={compact ? 'flex-start' : 'center'}
          flex={compact ? 1 : undefined}
        >
          {renderText()}
          {!compact && renderActions()}
          {children}
        </Stack>
        {compact && renderActions()}
      </Stack>
    </Animated.View>
  )

  if (variant === 'card') {
    return (
      <StyledCard
        shadow="light"
        borderRadius={16}
        backgroundColor={c.background === 'transparent' ? palettes.white : c.background}
        overflow="hidden"
      >
        {inner}
      </StyledCard>
    )
  }

  if (variant === 'illustrated') {
    return (
      <Stack
        borderRadius={16}
        borderWidth={1}
        borderColor={c.border}
        overflow="hidden"
        backgroundColor={c.background}
      >
        {inner}
      </Stack>
    )
  }

  return inner
}

export default StyledEmptyState