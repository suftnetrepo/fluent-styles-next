/**
 * SwitchUsage — exhaustive demo of every feature.
 */

import React, { Fragment, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
  Switch,
} from "fluent-styles";

export default function SwitchUsage() {
  // Controlled examples
  const [basic, setBasic] = useState(false);
  const [guarded, setGuarded] = useState(false);
  const [strValue, setStrValue] = useState<"yes" | "no">("no");

  // Simulate an async guard
  const asyncGuard = (next: boolean) =>
    new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 1200));

  // Simulate a rejection
  const rejectGuard = () =>
    new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 800));

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
          {/* ── 1. Basic controlled / uncontrolled ───────────────────────── */}
          <Section label="Basic">
            <Row label="Controlled" hint={basic ? "ON" : "OFF"}>
              <Switch value={basic} onChange={setBasic} />
            </Row>
            <Row label="Uncontrolled (default ON)">
              <Switch
                defaultValue
                onChange={(v) => console.log("uncontrolled:", v)}
              />
            </Row>
            <Row label="Uncontrolled (default OFF)">
              <Switch onChange={(v) => console.log("uncontrolled:", v)} />
            </Row>
          </Section>

          {/* ── 2. Sizes ─────────────────────────────────────────────────── */}
          <Section label="Sizes">
            <Row label="sm">
              <Switch size="sm" defaultValue />
            </Row>
            <Row label="md (default)">
              <Switch size="md" defaultValue />
            </Row>
            <Row label="lg">
              <Switch size="lg" defaultValue />
            </Row>
            <Row label="customSize={44}">
              <Switch customSize={44} defaultValue />
            </Row>
            <Row label="customSize={56}">
              <Switch customSize={56} defaultValue />
            </Row>
          </Section>

          {/* ── 3. Labels ────────────────────────────────────────────────── */}
          <Section label="Labels">
            <Row label="String labels">
              <Switch
                size="lg"
                defaultValue
                activeLabel="ON"
                inactiveLabel="OFF"
              />
            </Row>
            <Row label="Emoji labels">
              <Switch
                size="lg"
                defaultValue
                activeLabel="✓"
                inactiveLabel="✕"
              />
            </Row>
            <Row label="sm with labels">
              <Switch size="sm" activeLabel="1" inactiveLabel="0" />
            </Row>
          </Section>

          {/* ── 4. State flags ───────────────────────────────────────────── */}
          <Section label="State flags">
            <Row label="loading (ON)">
              <Switch value={true} loading />
            </Row>
            <Row label="loading (OFF)">
              <Switch value={false} loading />
            </Row>
            <Row label="disabled (ON)">
              <Switch value={true} disabled />
            </Row>
            <Row label="disabled (OFF)">
              <Switch value={false} disabled />
            </Row>
          </Section>

          {/* ── 5. beforeChange guard ────────────────────────────────────── */}
          <Section label="beforeChange guard">
            <Row
              label="Async confirm (1.2 s delay)"
              hint={guarded ? "ON" : "OFF"}
            >
              <Switch
                value={guarded}
                onChange={setGuarded}
                beforeChange={asyncGuard}
              />
            </Row>
            <Row label="Always rejected (0.8 s delay)">
              <Switch defaultValue={false} beforeChange={rejectGuard} />
            </Row>
          </Section>

          {/* ── 6. Custom (non-boolean) values ───────────────────────────── */}
          <Section label="Custom values">
            <Row label={`activeValue="yes" / inactiveValue="no" → ${strValue}`}>
              <Switch
                activeValue="yes"
                inactiveValue="no"
                value={strValue}
                onChange={(v) => setStrValue(v as "yes" | "no")}
              />
            </Row>
            <Row label="Numeric: 1 / 0">
              <Switch
                activeValue={1}
                inactiveValue={0}
                defaultValue={0}
                onChange={(v) => console.log("numeric:", v)}
              />
            </Row>
          </Section>

          {/* ── 7. Color overrides ───────────────────────────────────────── */}
          <Section label="Color overrides">
            <Row label="Green (activeColor)">
              <Switch defaultValue activeColor={palettes.green[500]} />
            </Row>
            <Row label="Rose / red">
              <Switch
                defaultValue
                colors={{
                  activeTrack: palettes.rose[500],
                  inactiveTrack: palettes.rose[100],
                  inactiveBorder: palettes.rose[200],
                  activeLabelText: "#fff",
                }}
              />
            </Row>
            <Row label="Amber">
              <Switch
                defaultValue
                activeColor={palettes.amber[400]}
                inactiveColor={palettes.amber[100]}
              />
            </Row>
            <Row label="Indigo (default palette)">
              <Switch defaultValue />
            </Row>
            <Row label="Teal + labels">
              <Switch
                size="lg"
                defaultValue
                activeLabel="ON"
                inactiveLabel="OFF"
                colors={{
                  activeTrack: palettes.teal[500],
                  inactiveTrack: palettes.teal[100],
                  inactiveBorder: palettes.teal[200],
                  activeLabelText: "#fff",
                  inactiveLabelText: palettes.teal[400],
                }}
              />
            </Row>
          </Section>

          {/* ── 8. Dark background demo ──────────────────────────────────── */}
          <Section label="On dark background">
            <View style={u.darkBg}>
              <View style={u.darkRow}>
                <Text style={u.darkLabel}>Default</Text>
                <Switch defaultValue />
              </View>
              <View style={u.darkRow}>
                <Text style={u.darkLabel}>Custom (slate)</Text>
                <Switch
                  defaultValue
                  colors={{
                    activeTrack: palettes.indigo[400],
                    inactiveTrack: palettes.blueGray[700],
                    inactiveBorder: palettes.blueGray[600],
                    thumb: "#ffffff",
                  }}
                />
              </View>
              <View style={u.darkRow}>
                <Text style={u.darkLabel}>Labels on dark</Text>
                <Switch
                  size="lg"
                  defaultValue
                  activeLabel="ON"
                  inactiveLabel="OFF"
                  colors={{
                    activeTrack: palettes.violet[500],
                    inactiveTrack: palettes.blueGray[700],
                    inactiveBorder: palettes.blueGray[600],
                    activeLabelText: "#fff",
                    inactiveLabelText: palettes.blueGray[400],
                  }}
                />
              </View>
            </View>
          </Section>

          {/* ── 9. Row of all sizes aligned ──────────────────────────────── */}
          <Section label="Size comparison (all ON)">
            <View style={u.sizeRow}>
              {(["sm", "md", "lg"] as const).map((s) => (
                <View key={s} style={u.sizeItem}>
                  <Switch size={s} defaultValue />
                  <Text style={u.sizeLabel}>{s}</Text>
                </View>
              ))}
            </View>
          </Section>
        </StyledCard>
      </StyledScrollView>
    </Fragment>
  );
}

// ─── Local primitives ─────────────────────────────────────────────────────────

const Section = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <View style={u.section}>
    <StyledSeperator
      leftLabel={label}
      borderRadius={8}
      paddingVertical={8}
      paddingHorizontal={8}
      marginVertical={8}
      backgroundColor={theme.colors.gray[100]}
    />
    <View style={u.sectionBody}>{children}</View>
  </View>
);

const Row = ({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <View style={u.row}>
    <View style={u.rowText}>
      <Text style={u.rowLabel}>{label}</Text>
      {hint ? <Text style={u.rowHint}>{hint}</Text> : null}
    </View>
    {children}
  </View>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const u = StyleSheet.create({
  scroll: { padding: 20, gap: 28, paddingBottom: 60 },

  section: { gap: 0 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8e8e93",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  sectionBody: { gap: 0 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 11,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5ea",
  },
  rowText: { flex: 1, marginRight: 16 },
  rowLabel: { fontSize: 14, color: "#1c1c1e", fontWeight: "500" },
  rowHint: { fontSize: 12, color: "#8e8e93", marginTop: 1 },

  darkBg: {
    backgroundColor: "#0f172a",
    borderRadius: 12,
    padding: 16,
    gap: 14,
  },
  darkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  darkLabel: { fontSize: 14, color: "#94a3b8", flex: 1, marginRight: 16 },

  sizeRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 24,
    paddingVertical: 12,
  },
  sizeItem: { alignItems: "center", gap: 8 },
  sizeLabel: { fontSize: 12, color: "#8e8e93", fontWeight: "600" },
});
