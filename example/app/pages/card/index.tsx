/**
 * CardDemo — exhaustive demo of every StyledCard feature.
 */

import React from 'react'
import { Alert } from 'react-native'
import {
  theme,
  Stack,
  StyledScrollView,
  StyledText,
  StyledButton,
  StyledCard,
} from 'fluent-styles'

// ─── Emoji helper ─────────────────────────────────────────────────────────────

const E = ({ e }: { e: string }) => <StyledText fontSize={18}>{e}</StyledText>

// ─── Section header ───────────────────────────────────────────────────────────

const Section: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <Stack gap={2} marginBottom={12} padding={8} borderBottomWidth={1} borderBottomColor={theme.colors.gray[200]}>
    <StyledText fontSize={theme.fontSize.normal} fontWeight="700" color={theme.colors.gray[800]} letterSpacing={0.8}>
      {title}
    </StyledText>
    {subtitle && (
      <StyledText fontSize={theme.fontSize.small} color={theme.colors.gray[400]}>
        {subtitle}
      </StyledText>
    )}
  </Stack>
)

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function Card() {
  return (
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>

        {/* 1. Basic card */}
        <Section title="Basic card" />
        <StyledCard backgroundColor={theme.colors.white} borderRadius={16} padding={16} borderWidth={1} borderColor={theme.colors.gray[100]} shadow="light" marginBottom={24}>
          <StyledText fontSize={18} fontWeight={800} color={theme.colors.gray[900]}>
            Simple card
          </StyledText>
          <StyledText color={theme.colors.gray[500]} marginTop={4}>
            A clean card container for grouping related content.
          </StyledText>
        </StyledCard>

        {/* 2. Header + Content + Footer */}
        <Section title="Header + content + footer" />
        <StyledCard backgroundColor={theme.colors.white} borderRadius={18} borderWidth={1} borderColor={theme.colors.gray[100]} shadow="light" overflow="hidden" marginBottom={24}>
          <StyledCard.Header padding={16}>
            <StyledText fontSize={17} fontWeight={800}>Project summary</StyledText>
          </StyledCard.Header>

          <StyledCard.Content padding={16} gap={10}>
            <StyledText color={theme.colors.gray[600]}>
              Mobile app redesign is 72% complete and currently on track for delivery this sprint.
            </StyledText>
            <Stack horizontal justifyContent="space-between">
              <StyledText color={theme.colors.gray[500]}>Progress</StyledText>
              <StyledText fontWeight={700}>72%</StyledText>
            </Stack>
          </StyledCard.Content>

          <StyledCard.Footer padding={16} flexDirection="row" justifyContent="space-between" alignItems="center">
            <StyledText color={theme.colors.gray[500]}>Updated 2h ago</StyledText>
            <StyledText color={theme.colors.indigo?.[500] ?? '#6366f1'} fontWeight={700}>View details</StyledText>
          </StyledCard.Footer>
        </StyledCard>

        {/* 3. Pressable card */}
        <Section title="Pressable card" />
        <StyledCard
          pressable
          pressableProps={{ onPress: () => Alert.alert('Pressed', 'You tapped the card') }}
          backgroundColor={theme.colors.white}
          borderRadius={16}
          padding={16}
          borderWidth={1}
          borderColor={theme.colors.gray[100]}
          shadow="light"
          marginBottom={24}
        >
          <Stack horizontal alignItems="center" gap={12}>
            <Stack width={44} height={44} borderRadius={22} backgroundColor={theme.colors.indigo?.[50] ?? '#eef2ff'} alignItems="center" justifyContent="center">
              <E e="👆" />
            </Stack>
            <Stack flex={1}>
              <StyledText fontWeight={800} fontSize={16}>Tap me</StyledText>
              <StyledText color={theme.colors.gray[500]}>This card is wrapped with Pressable.</StyledText>
            </Stack>
          </Stack>
        </StyledCard>

        {/* 4. Image card */}
        <Section title="Image card" />
        <StyledCard backgroundColor={theme.colors.white} borderRadius={18} borderWidth={1} borderColor={theme.colors.gray[100]} shadow="medium" overflow="hidden" marginBottom={24}>
          <StyledCard.Image
            source={{ uri: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80' }}
            height={180}
            resizeMode="cover"
            justifyContent="flex-end"
          >
            <Stack padding={16} backgroundColor="rgba(0,0,0,0.28)">
              <StyledText color={theme.colors.white} fontSize={20} fontWeight={800}>Design inspiration</StyledText>
              <StyledText color={theme.colors.white}>Explore modern mobile UI patterns</StyledText>
            </Stack>
          </StyledCard.Image>
          <StyledCard.Content padding={16} gap={10}>
            <StyledText color={theme.colors.gray[600]}>
              Use image cards for featured content, blog posts, products, or destinations.
            </StyledText>
          </StyledCard.Content>
        </StyledCard>

        {/* 5. Profile card */}
        <Section title="Profile card" />
        <StyledCard backgroundColor={theme.colors.white} borderRadius={20} borderWidth={1} borderColor={theme.colors.gray[100]} shadow="lightMedium" overflow="hidden" marginBottom={24}>
          <StyledCard.Content padding={18}>
            <Stack horizontal alignItems="center" gap={14}>
              <Stack width={56} height={56} borderRadius={28} backgroundColor={theme.colors.gray[100]} alignItems="center" justifyContent="center">
                <E e="👨🏽‍💻" />
              </Stack>
              <Stack flex={1}>
                <StyledText fontSize={17} fontWeight={800}>Abel Aghorighor</StyledText>
                <StyledText color={theme.colors.gray[500]}>React Native Developer</StyledText>
              </Stack>
            </Stack>
            <StyledText color={theme.colors.gray[600]} marginTop={12}>
              Builds polished mobile apps with React Native, reusable UI systems, and clean integration patterns.
            </StyledText>
          </StyledCard.Content>
          <StyledCard.Footer padding={16} flexDirection="row" justifyContent="space-between">
            <StyledText color={theme.colors.gray[500]}>Edinburgh, UK</StyledText>
            <StyledText fontWeight={700}>Available</StyledText>
          </StyledCard.Footer>
        </StyledCard>

        {/* 6. Product card */}
        <Section title="Product card" />
        <StyledCard backgroundColor={theme.colors.white} borderRadius={18} borderWidth={1} borderColor={theme.colors.gray[100]} shadow="medium" overflow="hidden" marginBottom={24}>
          <StyledCard.Image
            source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80' }}
            height={170}
            resizeMode="cover"
          />
          <StyledCard.Content padding={16} gap={8}>
            <StyledText fontSize={18} fontWeight={800}>Air Runner X</StyledText>
            <StyledText color={theme.colors.gray[500]}>Lightweight everyday trainers with premium comfort.</StyledText>
            <Stack horizontal justifyContent="space-between" alignItems="center" marginTop={8}>
              <StyledText fontSize={18} fontWeight={800}>£89.00</StyledText>
              <StyledButton compact paddingHorizontal={14} paddingVertical={10}>
                Add to cart
              </StyledButton>
            </Stack>
          </StyledCard.Content>
        </StyledCard>

        {/* 7. Stats card */}
        <Section title="Stats card" />
        <Stack horizontal gap={12} marginBottom={24}>
          <StyledCard flex={1} backgroundColor={theme.colors.white} borderRadius={16} padding={16} borderWidth={1} borderColor={theme.colors.gray[100]} shadow="light">
            <StyledText color={theme.colors.gray[500]}>Revenue</StyledText>
            <StyledText fontSize={22} fontWeight={800} marginTop={4}>£12.4k</StyledText>
          </StyledCard>
          <StyledCard flex={1} backgroundColor={theme.colors.white} borderRadius={16} padding={16} borderWidth={1} borderColor={theme.colors.gray[100]} shadow="light">
            <StyledText color={theme.colors.gray[500]}>Users</StyledText>
            <StyledText fontSize={22} fontWeight={800} marginTop={4}>1,248</StyledText>
          </StyledCard>
        </Stack>

        {/* 8. Task card */}
        <Section title="Task card" />
        <StyledCard backgroundColor={theme.colors.white} borderRadius={18} borderWidth={1} borderColor={theme.colors.gray[100]} shadow="lightMedium" marginBottom={24}>
          <StyledCard.Content padding={16} gap={10}>
            <Stack horizontal justifyContent="space-between" alignItems="center">
              <StyledText fontSize={17} fontWeight={800}>Build dropdown docs</StyledText>
              <Stack paddingHorizontal={10} paddingVertical={4} borderRadius={999} backgroundColor={theme.colors.green[50]}>
                <StyledText color={theme.colors.green[600]} fontWeight={700}>Active</StyledText>
              </Stack>
            </Stack>
            <StyledText color={theme.colors.gray[600]}>
              Create usage examples and production-ready documentation for the dropdown and card components.
            </StyledText>
            <Stack horizontal gap={8}>
              <Stack paddingHorizontal={10} paddingVertical={4} borderRadius={999} backgroundColor={theme.colors.gray[100]}>
                <StyledText color={theme.colors.gray[600]}>UI</StyledText>
              </Stack>
              <Stack paddingHorizontal={10} paddingVertical={4} borderRadius={999} backgroundColor={theme.colors.gray[100]}>
                <StyledText color={theme.colors.gray[600]}>Docs</StyledText>
              </Stack>
            </Stack>
          </StyledCard.Content>
        </StyledCard>

        {/* 9. Horizontal cards */}
        <Section title="Horizontal card row" />
        <StyledScrollView horizontal showsHorizontalScrollIndicator={false} marginBottom={24}>
          <Stack horizontal gap={12} paddingVertical={4}>
            {[
              { emoji: '📈', title: 'Analytics', text: 'See performance trends' },
              { emoji: '🧾', title: 'Invoices',  text: 'Track your billing'     },
              { emoji: '👥', title: 'Team',       text: 'Manage collaborators'  },
            ].map((item) => (
              <StyledCard key={item.title} width={220} backgroundColor={theme.colors.white} borderRadius={18} padding={16} borderWidth={1} borderColor={theme.colors.gray[100]} shadow="lightMedium">
                <Stack gap={10}>
                  <Stack width={42} height={42} borderRadius={21} backgroundColor={theme.colors.gray[100]} alignItems="center" justifyContent="center">
                    <E e={item.emoji} />
                  </Stack>
                  <StyledText fontSize={16} fontWeight={800}>{item.title}</StyledText>
                  <StyledText color={theme.colors.gray[500]}>{item.text}</StyledText>
                </Stack>
              </StyledCard>
            ))}
          </Stack>
        </StyledScrollView>

        {/* 10. Shadow variants */}
        <Section title="Shadow variants" />
        <Stack gap={12} marginBottom={24}>
          {(['light', 'lightMedium', 'medium', 'mediumDark', 'dark', 'veryDark'] as const).map((level) => (
            <StyledCard key={level} backgroundColor={theme.colors.white} borderRadius={14} padding={14} shadow={level}>
              <StyledText fontWeight={700}>{level}</StyledText>
            </StyledCard>
          ))}
        </Stack>

      </StyledScrollView>
    </Stack>
  )
}
