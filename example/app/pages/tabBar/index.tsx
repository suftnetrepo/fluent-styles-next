/**
 * TabBarUsage — exhaustive demo of every feature.
 */

import React, { Fragment, useState } from "react";
import {
  ColorValue,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  theme,
  StyledScrollView,
  StyledSpacer,
  StyledCard,
  StyledSeperator,
  TabBar,
  TabItem,
  palettes,
} from "fluent-styles";

// ─── Icon stubs (replace with your icon library) ──────────────────────────────

const Emoji = ({
  e,
  color,
  size = 20,
}: {
  e: string;
  color?: ColorValue;
  size?: number;
}) => <Text style={{ fontSize: size }}>{e}</Text>;

// ─── Static option sets ───────────────────────────────────────────────────────

type Nav = "home" | "explore" | "activity" | "profile";
type Cat =
  | "all"
  | "design"
  | "dev"
  | "pm"
  | "data"
  | "ops"
  | "qa"
  | "mkt"
  | "sales";
type Seg = "day" | "week" | "month" | "year";
type Num = 1 | 2 | 3;

const NAV_TABS: TabItem<Nav>[] = [
  {
    value: "home",
    label: "Home",
    iconRender: (c) => <Emoji e="🏠" color={c} />,
  },
  {
    value: "explore",
    label: "Explore",
    iconRender: (c) => <Emoji e="🔍" color={c} />,
    badge: 3,
  },
  {
    value: "activity",
    label: "Activity",
    iconRender: (c) => <Emoji e="⚡" color={c} />,
    badge: "",
  },
  {
    value: "profile",
    label: "Profile",
    iconRender: (c) => <Emoji e="👤" color={c} />,
  },
];

const SIMPLE_TABS: TabItem<Seg>[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

const MANY_TABS: TabItem<Cat>[] = [
  { value: "all", label: "All" },
  { value: "design", label: "Design" },
  { value: "dev", label: "Dev" },
  { value: "pm", label: "Product" },
  { value: "data", label: "Data" },
  { value: "ops", label: "DevOps" },
  { value: "qa", label: "QA" },
  { value: "mkt", label: "Marketing" },
  { value: "sales", label: "Sales" },
];

const NUMBERED_TABS: TabItem<Num>[] = [
  { value: 1, label: "Step 1" },
  { value: 2, label: "Step 2" },
  { value: 3, label: "Step 3" },
];

const BADGE_TABS: TabItem<string>[] = [
  { value: "inbox", label: "Inbox", badge: 24 },
  { value: "sent", label: "Sent" },
  { value: "drafts", label: "Drafts", badge: 2 },
  { value: "spam", label: "Spam", badge: "" },
  { value: "archived", label: "Archived" },
];

const DISABLED_TABS: TabItem<string>[] = [
  { value: "available", label: "Available" },
  { value: "locked", label: "Locked", disabled: true },
  { value: "preview", label: "Preview", disabled: true },
  { value: "open", label: "Open" },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function TabBarUsage() {
  // Controlled states
  const [nav, setNav] = useState<Nav>("home");
  const [seg, setSeg] = useState<Seg>("week");
  const [cat, setCat] = useState<Cat>("all");
  const [step, setStep] = useState<Num>(1);
  const [mail, setMail] = useState("inbox");
  const [dis, setDis] = useState("available");

  // Content colours for demo
  const PANEL_BG: Record<Nav, string> = {
    home: "#eef2ff",
    explore: "#f0fdf4",
    activity: "#fff7ed",
    profile: "#fdf2f8",
  };

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
          {/* ── 1. Bottom navigation with icons ─────────────────────────── */}
          <Section label="Bottom nav — icons + dot badges">
            <View style={[u.panel, { backgroundColor: PANEL_BG[nav] }]}>
              <Text style={u.panelText}>Active: {nav}</Text>
            </View>
            <TabBar
              options={NAV_TABS}
              value={nav}
              onChange={setNav}
              indicator="dot"
              showBorder
            />
          </Section>

          {/* ── 2. Underline indicator (line) ────────────────────────────── */}
          <Section label="Indicator: line (animated)">
            <TabBar
              options={SIMPLE_TABS}
              value={seg}
              onChange={setSeg}
              indicator="line"
              showBorder
            />
          </Section>

          {/* ── 3. Pill indicator ────────────────────────────────────────── */}
          <Section label="Indicator: pill (sliding background)">
            <TabBar
              options={SIMPLE_TABS}
              defaultValue="week"
              indicator="pill"
              colors={{
                background: palettes.indigo[50],
                activeText: palettes.indigo[700],
                indicator: palettes.indigo[200],
                text: palettes.indigo[400],
              }}
            />
          </Section>

          {/* ── 4. Scrollable — many tabs ─────────────────────────────────── */}
          <Section label="Scrollable (tabAlign=scroll) — 9 tabs">
            <TabBar
              options={MANY_TABS}
              value={cat}
              onChange={setCat}
              tabAlign="scroll"
              indicator="line"
              showBorder
            />
            <Text style={u.hint}>Active: {cat}</Text>
          </Section>

          {/* ── 5. Badges ────────────────────────────────────────────────── */}
          <Section label="Badges — number · dot (empty string)">
            <TabBar
              options={BADGE_TABS}
              value={mail}
              onChange={setMail}
              indicator="line"
              tabAlign="scroll"
              colors={{ badge: palettes.rose[500] }}
              showBorder
            />
          </Section>

          {/* ── 6. Disabled tabs ──────────────────────────────────────────── */}
          <Section label="Disabled tabs">
            <TabBar
              options={DISABLED_TABS}
              value={dis}
              onChange={setDis}
              indicator="line"
              showBorder
            />
          </Section>

          {/* ── 7. Solid / chip variant ──────────────────────────────────── */}
          <Section label="Variant: solid (chip tabs)">
            <TabBar
              options={SIMPLE_TABS}
              defaultValue="week"
              variant="solid"
              indicator="pill"
              colors={{
                background: palettes.gray[100],
                activeChipBg: "#ffffff",
                activeChipText: palettes.gray[900],
                indicator: palettes.coolGray[200],
                text: palettes.gray[500],
              }}
              style={u.chipBar}
            />
          </Section>

          {/* ── 8. Controlled step tabs (numeric values) ─────────────────── */}
          <Section label="Numeric values — stepper">
            <TabBar
              options={NUMBERED_TABS}
              value={step}
              onChange={setStep}
              indicator="line"
              indicatorHeight={2}
              fontSize={13}
              colors={{
                activeText: palettes.violet[600],
                indicator: palettes.violet[600],
                text: palettes.gray[400],
              }}
              showBorder
            />
            <View style={u.stepContent}>
              <Text style={u.stepText}>
                {step === 1 && "① Fill in your details"}
                {step === 2 && "② Review your order"}
                {step === 3 && "③ Confirm & pay"}
              </Text>
            </View>
          </Section>

          {/* ── 9. Label bulge ────────────────────────────────────────────── */}
          <Section label="Label bulge (active tab scales up)">
            <TabBar
              options={SIMPLE_TABS}
              defaultValue="week"
              indicator="line"
              labelBulge={1.15}
              showBorder
            />
          </Section>

          {/* ── 10. Custom indicator width ────────────────────────────────── */}
          <Section label="Fixed indicator width (24 px)">
            <TabBar
              options={SIMPLE_TABS}
              defaultValue="month"
              indicator="line"
              indicatorWidth={24}
              indicatorHeight={3}
              indicatorRadius={3}
              showBorder
            />
          </Section>

          {/* ── 11. Scrollable + full-width indicator ─────────────────────── */}
          <Section label="Scrollable + full-width indicator (0)">
            <TabBar
              options={MANY_TABS}
              defaultValue="design"
              tabAlign="scroll"
              indicator="line"
              indicatorWidth={0}
              indicatorHeight={3}
              showBorder
            />
          </Section>

          {/* ── 12. Color themes ──────────────────────────────────────────── */}
          <Section label="Color overrides — green">
            <TabBar
              options={SIMPLE_TABS}
              defaultValue="day"
              indicator="line"
              showBorder
              colors={{
                background: palettes.green[50],
                activeText: palettes.green[700],
                indicator: palettes.green[500],
                text: palettes.green[400],
                border: palettes.green[200],
              }}
            />
          </Section>

          <Section label="Color overrides — dark slate">
            <TabBar
              options={NAV_TABS}
              defaultValue="home"
              indicator="dot"
              showBorder
              colors={{
                background: palettes.blueGray[900],
                activeText: palettes.indigo[400],
                indicator: palettes.indigo[400],
                text: palettes.blueGray[400],
                border: palettes.blueGray[700],
                badge: palettes.rose[400],
              }}
            />
          </Section>

          {/* ── 13. No indicator — plain tabs ─────────────────────────────── */}
          <Section label="No indicator — plain (default)">
            <TabBar options={SIMPLE_TABS} defaultValue="month" />
          </Section>

          {/* ── 14. Large font ────────────────────────────────────────────── */}
          <Section label="Large font (fontSize=17)">
            <TabBar
              options={SIMPLE_TABS}
              defaultValue="week"
              indicator="line"
              fontSize={17}
              height={52}
              showBorder
            />
          </Section>
        </StyledCard>
      </StyledScrollView>
    </Fragment>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

const Section = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
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
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const u = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f9fafb" },
  scroll: { paddingTop: 16, paddingBottom: 48, gap: 28 },
  section: { gap: 0 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8e8e93",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  panel: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginBottom: 0,
    borderRadius: 12,
  },
  panelText: { fontSize: 14, fontWeight: "600", color: "#374151" },
  hint: { fontSize: 12, color: "#9ca3af", paddingHorizontal: 16, marginTop: 6 },
  stepContent: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    marginHorizontal: 16,
    borderRadius: 10,
  },
  stepText: { fontSize: 15, color: "#374151", fontWeight: "500" },
  chipBar: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
});
