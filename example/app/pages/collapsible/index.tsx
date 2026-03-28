import React, { Fragment, useState } from "react";
import {
  Collapse,
  CollapseGroup,
  CollapseItem,
  StyledSeperator,
  StyledText,
  theme,
  StyledScrollView,
  StyledSpacer,
  StyledCard,
  palettes,
  Stack,
} from "fluent-styles";
import { capitalizeFirstLetter } from "../../../utiles/helper";
import { View, StyleSheet, Text } from "react-native";

const Body = ({ text }: { text: string }) => (
  <StyledText
    fontSize={theme.fontSize.medium}
    fontWeight={theme.fontWeight.normal}
    color={theme.colors.gray[800]}
  >
    {capitalizeFirstLetter(text)}
  </StyledText>
);

const Collapsible = () => {
  const [controlled, setControlled] = useState(false);

  return (
    <Fragment>
      <StyledSpacer marginVertical={8} />
      <StyledScrollView showsVerticalScrollIndicator={false}>
        <StyledCard
          backgroundColor={theme.colors.gray[1]}
          marginHorizontal={1}
          borderWidth={0.5}
          borderColor={theme.colors.gray[1]}
          borderRadius={32}
          padding={16}
        >
          {/* ── 1. Variants ──────────────────────────────────────────────── */}
          <Section label="Variants">
            <Collapse title="Cell (default)" variant="cell">
              <Body text="Flat list row — no border, no shadow. Inherits background from parent." />
            </Collapse>

            <Collapse
              title="Card"
              subtitle="Shadow + radius"
              variant="card"
              style={u.mt}
            >
              <Body text="Elevated card with rounded corners and a subtle shadow." />
            </Collapse>

            <Collapse title="Bordered" variant="bordered" style={u.mt}>
              <Body text="Outlined box. No shadow — great for settings panels and forms." />
            </Collapse>

            <Collapse title="Ghost" variant="ghost" style={u.mt}>
              <Body text="No background, no border. Useful inside cards or sheets." />
            </Collapse>
          </Section>

          {/* ── 2. Sizes ─────────────────────────────────────────────────── */}
          <Section label="Sizes">
            <Collapse title="Small" variant="bordered" size="sm" style={u.mt}>
              <Body text="Compact padding — dense UIs, sidebars." />
            </Collapse>
            <Collapse
              title="Medium (default)"
              variant="bordered"
              size="md"
              style={u.mt}
            >
              <Body text="Standard spacing." />
            </Collapse>
            <Collapse title="Large" variant="bordered" size="lg" style={u.mt}>
              <Body text="Generous padding — landing pages, onboarding flows." />
            </Collapse>
          </Section>

          {/* ── 3. Header slots ──────────────────────────────────────────── */}
          <Section label="Slots: leading · subtitle · trailing">
            <Collapse
              variant="card"
              leading={<Text style={u.emoji}>📦</Text>}
              title="Leading icon"
              subtitle="Any ReactNode on the left"
              style={u.mt}
            >
              <Body text="Use `leading` for icons, avatars, or status indicators." />
            </Collapse>

            <Collapse
              variant="card"
              title="Trailing badge"
              trailing={<Badge label="NEW" color={palettes.indigo[500]} />}
              style={u.mt}
            >
              <Body text="Use `trailing` for badges, counts, or action buttons." />
            </Collapse>

            <Collapse
              variant="card"
              leading={<Text style={u.emoji}>🛡️</Text>}
              title="All slots"
              subtitle="Leading + subtitle + trailing together"
              trailing={<Badge label="3" color={palettes.rose[500]} />}
              style={u.mt}
            >
              <Body text="Every slot populated at once." />
            </Collapse>
          </Section>

          {/* ── 4. Active header tint ────────────────────────────────────── */}
          <Section label="Active header tint">
            <Collapse
              title="Header tints when open"
              variant="bordered"
              activeHeader
            >
              <Body text="`activeHeader` applies `colors.activeHeaderBg` while the panel is expanded." />
            </Collapse>
          </Section>

          {/* ── 5. Disabled ──────────────────────────────────────────────── */}
          <Section label="Disabled">
            <Collapse
              title="Non-interactive"
              subtitle="Premium feature"
              variant="bordered"
              disabled
            >
              <Body text="This body is unreachable." />
            </Collapse>
          </Section>

          {/* ── 6. Default open ──────────────────────────────────────────── */}
          <Section label="Default open (uncontrolled)">
            <Collapse title="Starts expanded" variant="card" defaultCollapse>
              <Body text="Pass `defaultCollapse` to start open without controlling the state yourself." />
            </Collapse>
          </Section>

          {/* ── 7. Controlled ────────────────────────────────────────────── */}
          <Section label="Controlled">
            <Text style={u.link} onPress={() => setControlled((v) => !v)}>
              Toggle externally — currently {controlled ? "open" : "closed"}
            </Text>
            <Collapse
              title="Externally driven"
              variant="bordered"
              collapse={controlled}
              onCollapse={setControlled}
              style={u.mt}
            >
              <Body text="Open state owned by parent; both the chevron and body follow." />
            </Collapse>
          </Section>

          {/* ── 8. Custom renderers ──────────────────────────────────────── */}
          <Section label="Custom renderers">
            <Collapse
              variant="card"
              renderHeader={(open) => (
                <View style={[u.customHeader, open && u.customHeaderOpen]}>
                  <Text style={u.customHeaderText}>
                    {open
                      ? "▲ Custom header — open"
                      : "▼ Custom header — closed"}
                  </Text>
                </View>
              )}
              style={u.mt}
            >
              <Body text="`renderHeader` replaces the entire header row. You own the layout." />
            </Collapse>

            <Collapse
              title="Custom header right"
              variant="bordered"
              renderHeaderRight={(open, chevron) => (
                <View style={u.row}>
                  <StatusChip open={open} />
                  {chevron}
                </View>
              )}
              style={u.mt}
            >
              <Body text="`renderHeaderRight` keeps the default title block but replaces the right side." />
            </Collapse>
          </Section>

          {/* ── 11. Color overrides ──────────────────────────────────────── */}
          <Section label="Color token overrides">
            <Collapse
              title="Slate dark theme"
              subtitle="Custom background + borders"
              variant="card"
              colors={{
                background: theme.colors.blueGray[900],
                border: theme.colors.blueGray[700],
                shadow: "#000",
                titleColor: theme.colors.blueGray[100],
                subtitleColor: theme.colors.blueGray[400],
                iconColor: theme.colors.blueGray[400],
                divider: palettes.blueGray[700],
                bodyText: palettes.blueGray[300],
                activeHeaderBg: palettes.blueGray[800],
              }}
              style={u.mt}
            >
              <Body text="Pass any CollapseColors token via the `colors` prop." />
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
              style={u.mt}
            >
              <Body text="Any colour from your palette works — rose, teal, violet, etc." />
            </Collapse>
          </Section>

          {/* ── 12. Group — multi-open ───────────────────────────────────── */}
          <Section label="CollapseGroup — multi-open">
            <CollapseGroup variant="bordered" defaultActiveKey={["shipping"]}>
              <CollapseItem
                itemKey="shipping"
                title="Shipping"
                subtitle="2–5 business days"
              >
                <Body text="We ship worldwide via FedEx and DHL." />
              </CollapseItem>
              <CollapseItem
                itemKey="returns"
                title="Returns"
                subtitle="30-day policy"
                style={u.mt}
              >
                <Body text="Items must be unworn, with original tags attached." />
              </CollapseItem>
              <CollapseItem itemKey="sizing" title="Size guide" style={u.mt}>
                <Body text="Our garments run slightly large — we recommend sizing down." />
              </CollapseItem>
            </CollapseGroup>
          </Section>

          {/* ── 13. Group — accordion (card) ─────────────────────────────── */}
          <Section label="CollapseGroup — accordion · card">
            <CollapseGroup
              accordion
              variant="card"
              defaultActiveKey="q1"
              style={u.cardGroup}
            >
              <CollapseItem
                itemKey="q1"
                leading={<StyledText style={u.emoji}>💳</StyledText>}
                title="Accepted payment methods"
              >
                <Body text="Visa, Mastercard, PayPal, Apple Pay, and Google Pay." />
              </CollapseItem>
              <CollapseItem
                itemKey="q2"
                leading={<StyledText style={u.emoji}>🔒</StyledText>}
                title="Is my data secure?"
              >
                <Body text="All data is encrypted in transit and at rest using AES-256." />
              </CollapseItem>
              <CollapseItem
                itemKey="q3"
                leading={<StyledText style={u.emoji}>📞</StyledText>}
                title="How do I contact support?"
              >
                <Body text="Email support@example.com — we aim to reply within 24 hours." />
              </CollapseItem>
            </CollapseGroup>
          </Section>
        </StyledCard>
      </StyledScrollView>
    </Fragment>
  );
};

// ─── Tiny shared components ───────────────────────────────────────────────────

const Badge = ({ label, color }: { label: string; color: string }) => (
  <View style={[u.badge, { backgroundColor: color }]}>
    <StyledText style={u.badgeText}>{label}</StyledText>
  </View>
);

const StatusChip = ({ open }: { open: boolean }) => (
  <View style={[u.chip, open && u.chipOpen]}>
    <StyledText style={[u.chipText, open && u.chipTextOpen]}>
      {open ? "Open" : "Closed"}
    </StyledText>
  </View>
);

const Section = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
 <Stack paddingVertical={0}>
    <>
      <StyledSeperator
        leftLabel={label}
        leftLabelProps={{
          color: theme.colors.gray[800],
          fontSize: theme.fontSize.normal,
        }}
        borderRadius={8}
        paddingVertical={8}
        marginVertical={16}
        borderBottomColor={theme.colors.gray[500]}
        borderBottomWidth={0.5}
        backgroundColor={theme.colors.gray[1]}
      />
      {children}
    </>
  </Stack>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const u = StyleSheet.create({
  scroll: { padding: 16, gap: 24, paddingBottom: 60 },
  section: { gap: 0 },
  mt: { marginTop: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 6 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8e8e93",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  body: { fontSize: 14, color: "#636366", lineHeight: 20 },
  emoji: { fontSize: 20 },
  link: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6366f1",
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#eef2ff",
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  badge: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { fontSize: 11, fontWeight: "700", color: "#fff" },

  chip: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    backgroundColor: "#f2f2f7",
    borderRadius: 6,
    marginRight: 4,
  },
  chipOpen: { backgroundColor: "#eef2ff" },
  chipText: { fontSize: 12, fontWeight: "600", color: "#8e8e93" },
  chipTextOpen: { color: "#6366f1" },

  customHeader: {
    padding: 14,
    backgroundColor: "#f2f2f7",
  },
  customHeaderOpen: { backgroundColor: "#eef2ff" },
  customHeaderText: { fontSize: 14, fontWeight: "600", color: "#1c1c1e" },

  fullBleed: { backgroundColor: "#f2f2f7", padding: 16 },
  fullBleedText: { fontSize: 14, color: "#1c1c1e" },

  cardGroup: { gap: 8 },
});

export default Collapsible;
