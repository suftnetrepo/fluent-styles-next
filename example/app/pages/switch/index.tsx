/**
 * SwitchUsage — exhaustive demo of every feature.
 */

import React, { useState } from "react";

import {
  Stack,
  StyledText,
  StyledScrollView,
  theme,
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
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
      <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>

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
            <Stack backgroundColor="#0f172a" borderRadius={12} padding={16} gap={14}>
              <Stack horizontal justifyContent="space-between" alignItems="center">
                <StyledText fontSize={14} color="#94a3b8" flex={1} marginRight={16}>Default</StyledText>
                <Switch defaultValue />
              </Stack>
              <Stack horizontal justifyContent="space-between" alignItems="center">
                <StyledText fontSize={14} color="#94a3b8" flex={1} marginRight={16}>Custom (slate)</StyledText>
                <Switch
                  defaultValue
                  colors={{
                    activeTrack: palettes.indigo[400],
                    inactiveTrack: palettes.blueGray[700],
                    inactiveBorder: palettes.blueGray[600],
                    thumb: "#ffffff",
                  }}
                />
              </Stack>
              <Stack horizontal justifyContent="space-between" alignItems="center">
                <StyledText fontSize={14} color="#94a3b8" flex={1} marginRight={16}>Labels on dark</StyledText>
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
              </Stack>
            </Stack>
          </Section>

          {/* ── 9. Row of all sizes aligned ──────────────────────────────── */}
          <Section label="Size comparison (all ON)">
            <Stack horizontal alignItems="flex-end" gap={24} paddingVertical={12}>
              {(["sm", "md", "lg"] as const).map((s) => (
                <Stack key={s} alignItems="center" gap={8}>
                  <Switch size={s} defaultValue />
                  <StyledText fontSize={12} color="#8e8e93" fontWeight="600">{s}</StyledText>
                </Stack>
              ))}
            </Stack>
          </Section>
      </StyledScrollView>
    </Stack>
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
  <Stack gap={2} paddingBottom={8} marginBottom={12} borderBottomWidth={1} borderBottomColor={theme.colors.gray[200]}>
    <StyledText fontSize={theme.fontSize.normal} fontWeight="700" color={theme.colors.gray[800]} letterSpacing={0.8}>
      {label}
    </StyledText>
    <>
       {children}
    </>
 
  </Stack>
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
  <Stack horizontal justifyContent="space-between" alignItems="center" paddingVertical={11} borderBottomWidth={0.5} borderBottomColor={theme.colors.gray[200]}>
    <Stack flex={1} marginRight={16}>
      <StyledText fontSize={14} color={theme.colors.gray[900]} fontWeight="500">{label}</StyledText>
      {hint ? <StyledText fontSize={12} color={theme.colors.gray[500]} marginTop={1}>{hint}</StyledText> : null}
    </Stack>
    <>
       {children}
    </>
 
  </Stack>
);


