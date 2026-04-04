/**
 * CollapsibleDemo — exhaustive demo of every Collapse / CollapseGroup feature.
 */

import React, { useState } from 'react'
import {
  Collapse,
  CollapseGroup,
  CollapseItem,
  StyledText,
  StyledPressable,
  theme,
  StyledScrollView,
  StyledCard,
  palettes,
  Stack,
} from 'fluent-styles'
import { capitalizeFirstLetter } from '../../../utiles/helper'

// ─── Body helper ─────────────────────────────────────────────────────────────

const Body = ({ text }: { text: string }) => (
  <StyledText fontSize={theme.fontSize.medium} fontWeight={theme.fontWeight.normal} color={theme.colors.gray[800]}>
    {capitalizeFirstLetter(text)}
  </StyledText>
)

// ─── Badge helper ─────────────────────────────────────────────────────────────

const Badge = ({ label, color }: { label: string; color: string }) => (
  <Stack borderRadius={10} paddingHorizontal={8} paddingVertical={2} backgroundColor={color}>
    <StyledText fontSize={11} fontWeight="700" color={palettes.white}>{label}</StyledText>
  </Stack>
)

// ─── StatusChip helper ────────────────────────────────────────────────────────

const StatusChip = ({ open }: { open: boolean }) => (
  <Stack
    paddingHorizontal={9}
    paddingVertical={3}
    backgroundColor={open ? palettes.indigo[50] : theme.colors.gray[100]}
    borderRadius={6}
    marginRight={4}
  >
    <StyledText fontSize={12} fontWeight="600" color={open ? palettes.indigo[500] : theme.colors.gray[500]}>
      {open ? 'Open' : 'Closed'}
    </StyledText>
  </Stack>
)

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

const Collapsible = () => {
  const [controlled, setControlled] = useState(false)

  return (
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>

        {/* ── 1. Variants ──────────────────────────────────────────────── */}
        <Section title="Variants" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={8}>
            <Collapse title="Cell (default)" variant="cell">
              <Body text="Flat list row — no border, no shadow. Inherits background from parent." />
            </Collapse>
            <Collapse title="Card" subtitle="Shadow + radius" variant="card">
              <Body text="Elevated card with rounded corners and a subtle shadow." />
            </Collapse>
            <Collapse title="Bordered" variant="bordered">
              <Body text="Outlined box. No shadow — great for settings panels and forms." />
            </Collapse>
            <Collapse title="Ghost" variant="ghost">
              <Body text="No background, no border. Useful inside cards or sheets." />
            </Collapse>
          </Stack>
        </StyledCard>

        {/* ── 2. Sizes ─────────────────────────────────────────────────── */}
        <Section title="Sizes" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={8}>
            <Collapse title="Small" variant="bordered" size="sm">
              <Body text="Compact padding — dense UIs, sidebars." />
            </Collapse>
            <Collapse title="Medium (default)" variant="bordered" size="md">
              <Body text="Standard spacing." />
            </Collapse>
            <Collapse title="Large" variant="bordered" size="lg">
              <Body text="Generous padding — landing pages, onboarding flows." />
            </Collapse>
          </Stack>
        </StyledCard>

        {/* ── 3. Header slots ──────────────────────────────────────────── */}
        <Section title="Slots: leading · subtitle · trailing" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={8}>
            <Collapse variant="card" leading={<StyledText fontSize={20}>📦</StyledText>} title="Leading icon" subtitle="Any ReactNode on the left">
              <Body text="Use leading for icons, avatars, or status indicators." />
            </Collapse>
            <Collapse variant="card" title="Trailing badge" trailing={<Badge label="NEW" color={palettes.indigo[500]} />}>
              <Body text="Use trailing for badges, counts, or action buttons." />
            </Collapse>
            <Collapse variant="card" leading={<StyledText fontSize={20}>🛡️</StyledText>} title="All slots" subtitle="Leading + subtitle + trailing together" trailing={<Badge label="3" color={palettes.rose[500]} />}>
              <Body text="Every slot populated at once." />
            </Collapse>
          </Stack>
        </StyledCard>

        {/* ── 4. Active header tint ────────────────────────────────────── */}
        <Section title="Active header tint" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Collapse title="Header tints when open" variant="bordered" activeHeader>
            <Body text="activeHeader applies colors.activeHeaderBg while the panel is expanded." />
          </Collapse>
        </StyledCard>

        {/* ── 5. Disabled ──────────────────────────────────────────────── */}
        <Section title="Disabled" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Collapse title="Non-interactive" subtitle="Premium feature" variant="bordered" disabled>
            <Body text="This body is unreachable." />
          </Collapse>
        </StyledCard>

        {/* ── 6. Default open ──────────────────────────────────────────── */}
        <Section title="Default open (uncontrolled)" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Collapse title="Starts expanded" variant="card" defaultCollapse>
            <Body text="Pass defaultCollapse to start open without controlling the state yourself." />
          </Collapse>
        </StyledCard>

        {/* ── 7. Controlled ────────────────────────────────────────────── */}
        <Section title="Controlled" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <StyledPressable
            onPress={() => setControlled((v) => !v)}
            paddingVertical={8}
            paddingHorizontal={14}
            backgroundColor={palettes.indigo[50]}
            borderRadius={8}
            alignSelf="flex-start"
            marginBottom={8}
          >
            <StyledText fontSize={14} fontWeight="600" color={palettes.indigo[500]}>
              Toggle externally — currently {controlled ? 'open' : 'closed'}
            </StyledText>
          </StyledPressable>
          <Collapse title="Externally driven" variant="bordered" collapse={controlled} onCollapse={setControlled}>
            <Body text="Open state owned by parent; both the chevron and body follow." />
          </Collapse>
        </StyledCard>

        {/* ── 8. Custom renderers ──────────────────────────────────────── */}
        <Section title="Custom renderers" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={8}>
            <Collapse
              variant="card"
              renderHeader={(open) => (
                <Stack padding={14} backgroundColor={open ? palettes.indigo[50] : theme.colors.gray[100]}>
                  <StyledText fontSize={14} fontWeight="600" color={theme.colors.gray[900]}>
                    {open ? 'Custom header — open' : 'Custom header — closed'}
                  </StyledText>
                </Stack>
              )}
            >
              <Body text="renderHeader replaces the entire header row. You own the layout." />
            </Collapse>
            <Collapse
              title="Custom header right"
              variant="bordered"
              renderHeaderRight={(open, chevron) => (
                <Stack horizontal alignItems="center" gap={6}>
                  <StatusChip open={open} />
                  {chevron}
                </Stack>
              )}
            >
              <Body text="renderHeaderRight keeps the default title block but replaces the right side." />
            </Collapse>
          </Stack>
        </StyledCard>

        {/* ── 9. Color overrides ───────────────────────────────────────── */}
        <Section title="Color token overrides" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <Stack gap={8}>
            <Collapse
              title="Slate dark theme"
              subtitle="Custom background + borders"
              variant="card"
              colors={{
                background: theme.colors.blueGray[900],
                border: theme.colors.blueGray[700],
                shadow: '#000',
                titleColor: theme.colors.blueGray[100],
                subtitleColor: theme.colors.blueGray[400],
                iconColor: theme.colors.blueGray[400],
                divider: palettes.blueGray[700],
                bodyText: palettes.blueGray[300],
                activeHeaderBg: palettes.blueGray[800],
              }}
            >
              <Body text="Pass any CollapseColors token via the colors prop." />
            </Collapse>
            <Collapse
              title="Warm amber theme"
              variant="bordered"
              colors={{
                background: palettes.amber[50],
                border: palettes.amber[300],
                titleColor: palettes.amber[900],
                subtitleColor: palettes.amber[600],
                iconColor: palettes.amber[500],
                divider: palettes.amber[200],
                bodyText: palettes.amber[800],
                activeHeaderBg: palettes.amber[100],
              }}
            >
              <Body text="Any colour from your palette works — rose, teal, violet, etc." />
            </Collapse>
          </Stack>
        </StyledCard>

        {/* ── 10. CollapseGroup — multi-open ───────────────────────────── */}
        <Section title="CollapseGroup — multi-open" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <CollapseGroup variant="bordered" defaultActiveKey={['shipping']}>
            <CollapseItem itemKey="shipping" title="Shipping" subtitle="2–5 business days">
              <Body text="We ship worldwide via FedEx and DHL." />
            </CollapseItem>
            <CollapseItem itemKey="returns" title="Returns" subtitle="30-day policy" style={{ marginTop: 8 }}>
              <Body text="Items must be unworn, with original tags attached." />
            </CollapseItem>
            <CollapseItem itemKey="sizing" title="Size guide" style={{ marginTop: 8 }}>
              <Body text="Our garments run slightly large — we recommend sizing down." />
            </CollapseItem>
          </CollapseGroup>
        </StyledCard>

        {/* ── 11. CollapseGroup — accordion (card) ─────────────────────── */}
        <Section title="CollapseGroup — accordion" subtitle="Card variant with single-open" />
        <StyledCard borderRadius={16} shadow="light" marginBottom={24}>
          <CollapseGroup accordion variant="card" defaultActiveKey="q1" style={{ gap: 8 }}>
            <CollapseItem itemKey="q1" leading={<StyledText fontSize={20}>💳</StyledText>} title="Accepted payment methods">
              <Body text="Visa, Mastercard, PayPal, Apple Pay, and Google Pay." />
            </CollapseItem>
            <CollapseItem itemKey="q2" leading={<StyledText fontSize={20}>🔒</StyledText>} title="Is my data secure?">
              <Body text="All data is encrypted in transit and at rest using AES-256." />
            </CollapseItem>
            <CollapseItem itemKey="q3" leading={<StyledText fontSize={20}>📞</StyledText>} title="How do I contact support?">
              <Body text="Email support@example.com — we aim to reply within 24 hours." />
            </CollapseItem>
          </CollapseGroup>
        </StyledCard>

      </StyledScrollView>
    </Stack>
  )
}

export default Collapsible
