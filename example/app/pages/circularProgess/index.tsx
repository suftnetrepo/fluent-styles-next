/**
 * CircularProgressUsage — exhaustive demo of every feature.
 */

import React, { Fragment, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  theme,
  Stack,
  StyledText,
  StyledCircularProgress,
  StyledCard,
  StyledScrollView,
  StyledSpacer,
  StyledSeperator,
} from "fluent-styles";

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
      marginVertical={32}
      borderBottomColor={theme.colors.gray[500]}
      borderBottomWidth={0.5}
      backgroundColor={theme.colors.gray[1]}
    />
    {children}
  </>
);



// ─── Screen ───────────────────────────────────────────────────────────────────

export default function CircularProgressUsage() {
  const [controlled, setControlled] = useState(35);

  return (
    <Fragment>
      <StyledSpacer marginVertical={8} />

      <StyledScrollView showsVerticalScrollIndicator={false}>
        <Stack
          padding={16}
          borderRadius={16}
          backgroundColor={theme.colors.gray[1]}
        >
          <StyledCard shadow="light">
            {/* ── 2. Display modes ──────────────────────────────────────── */}
            <Section label="Display modes">
              <Stack
                horizontal
                gap={32}
                flexWrap="wrap"
                justifyContent="space-between"
              >
                <Stack alignItems="center" gap={6}>
                  <StyledCircularProgress value={72} display="percent" />
                  <StyledText fontSize={11} color={theme.colors.gray[400]}>
                    percent
                  </StyledText>
                </Stack>
                <Stack alignItems="center" gap={6}>
                  <StyledCircularProgress
                    value={18}
                    total={25}
                    display="fraction"
                  />
                  <StyledText fontSize={11} color={theme.colors.gray[400]}>
                    fraction
                  </StyledText>
                </Stack>
                <Stack alignItems="center" gap={6}>
                  <StyledCircularProgress value={43} display="value" />
                  <StyledText fontSize={11} color={theme.colors.gray[400]}>
                    value
                  </StyledText>
                </Stack>
                <Stack alignItems="center" gap={6}>
                  <StyledCircularProgress
                    value={60}
                    display="label"
                    label="Done"
                  />
                  <StyledText fontSize={11} color={theme.colors.gray[400]}>
                    label only
                  </StyledText>
                </Stack>
                <Stack alignItems="center" gap={6}>
                  <StyledCircularProgress value={80} display="none" />
                  <StyledText fontSize={11} color={theme.colors.gray[400]}>
                    none
                  </StyledText>
                </Stack>
              </Stack>
            </Section>

            {/* ── 3. Label + sublabel ───────────────────────────────────── */}
            <Section label="Label + sublabel">
              <Stack horizontal gap={32} flexWrap="wrap">
                <StyledCircularProgress
                  value={72}
                  display="percent"
                  label="Tasks"
                  size="lg"
                />
                <StyledCircularProgress
                  value={18}
                  total={25}
                  display="fraction"
                  label="Tasks"
                  sublabel="this week"
                  size="lg"
                />
              </Stack>
            </Section>

            {/* ── 4. Variants ───────────────────────────────────────────── */}
            <Section label="Variants">
              <Stack
                horizontal
                gap={32}
                flexWrap="wrap"
                justifyContent="space-between"
              >
                {(["default", "ghost", "gradient", "dashboard"] as const).map(
                  (v) => (
                    <Stack
                      marginBottom={16}
                      key={v}
                      alignItems="center"
                      gap={6}
                      justifyContent="flex-start"
                      flexWrap="wrap"
                    >
                      <StyledCircularProgress
                        value={68}
                        variant={v}
                        size="md"
                      />
                      <StyledText fontSize={11} color={theme.colors.gray[400]}>
                        {v}
                      </StyledText>
                    </Stack>
                  ),
                )}
              </Stack>
            </Section>

            {/* ── 5. Sizes ──────────────────────────────────────────────── */}
            <Section label="Sizes">
              <Stack horizontal gap={32} alignItems="center" flexWrap="wrap">
                {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
                  <Stack key={s} alignItems="center" gap={6}>
                    <StyledCircularProgress value={75} size={s} />
                    <StyledText fontSize={10} color={theme.colors.gray[400]}>
                      {s}
                    </StyledText>
                  </Stack>
                ))}
              </Stack>
            </Section>

            {/* ── 6. Custom diameter + strokeWidth ──────────────────────── */}
            <Section label="Custom diameter + strokeWidth">
              <Stack horizontal gap={20} flexWrap="wrap" alignItems="center">
                <StyledCircularProgress
                  value={55}
                  diameter={60}
                  strokeWidth={4}
                  display="percent"
                />
                <StyledCircularProgress
                  value={55}
                  diameter={90}
                  strokeWidth={8}
                  display="percent"
                />
                <StyledCircularProgress
                  value={55}
                  diameter={120}
                  strokeWidth={24}
                  display="percent"
                />
                <StyledCircularProgress
                  value={55}
                  diameter={150}
                  strokeWidth={32}
                  display="percent"
                  colors={{
                    arc: theme.colors.yellow[500],
                    track: theme.colors.yellow[100],
                    label: theme.colors.yellow[700],
                    sublabel: theme.colors.yellow[400],
                  }}
                />
              </Stack>
            </Section>

            {/* ── 7. Line cap styles ────────────────────────────────────── */}
            <Section label="Line cap: round vs butt vs square">
              <Stack horizontal gap={24} flexWrap="wrap">
                {(["round", "butt", "square"] as const).map((cap) => (
                  <Stack key={cap} alignItems="center" gap={6}>
                    <StyledCircularProgress
                      value={45}
                      lineCap={cap}
                      size="md"
                    />
                    <StyledText fontSize={11} color={theme.colors.gray[400]}>
                      {cap}
                    </StyledText>
                  </Stack>
                ))}
              </Stack>
            </Section>

            {/* ── 8. Colour overrides ───────────────────────────────────── */}
            <Section label="Colour overrides">
              <Stack horizontal gap={32} flexWrap="wrap">
                {/* Green */}
                <StyledCircularProgress
                  value={82}
                  display="percent"
                  label="Health"
                  size="md"
                  colors={{
                    arc: theme.colors.green[500],
                    track: theme.colors.green[100],
                    label: theme.colors.green[700],
                    sublabel: theme.colors.green[400],
                  }}
                />

                {/* Rose */}
                <StyledCircularProgress
                  value={41}
                  display="percent"
                  label="Risk"
                  size="md"
                  colors={{
                    arc: theme.colors.rose?.[500] ?? "#f43f5e",
                    track: theme.colors.rose?.[100] ?? "#ffe4e6",
                    label: theme.colors.rose?.[700] ?? "#be123c",
                    sublabel: theme.colors.rose?.[400] ?? "#fb7185",
                  }}
                />

                {/* Amber */}
                <StyledCircularProgress
                  value={63}
                  display="percent"
                  label="Speed"
                  size="md"
                  colors={{
                    arc: theme.colors.amber[500],
                    track: theme.colors.amber[100],
                    label: theme.colors.amber[700],
                    sublabel: theme.colors.amber[400],
                  }}
                />

                {/* Violet */}
                <StyledCircularProgress
                  value={91}
                  display="percent"
                  label="Score"
                  size="md"
                  colors={{
                    arc: theme.colors.violet?.[500] ?? "#8b5cf6",
                    track: theme.colors.violet?.[100] ?? "#ede9fe",
                    label: theme.colors.violet?.[700] ?? "#6d28d9",
                    sublabel: theme.colors.violet?.[400] ?? "#a78bfa",
                  }}
                />
              </Stack>
            </Section>

            {/* ── 9. Gradient with custom stops ─────────────────────────── */}
            <Section label="Gradient variant — custom stop colours">
              <Stack horizontal gap={32} flexWrap="wrap">
                <StyledCircularProgress
                  value={78}
                  variant="gradient"
                  size="lg"
                  colors={{
                    gradientFrom: theme.colors.indigo?.[500] ?? "#6366f1",
                    gradientTo: theme.colors.cyan?.[400] ?? "#22d3ee",
                  }}
                />
                <StyledCircularProgress
                  value={55}
                  variant="gradient"
                  size="lg"
                  colors={{
                    gradientFrom: theme.colors.rose?.[500] ?? "#f43f5e",
                    gradientTo: theme.colors.amber[400],
                  }}
                />
                <StyledCircularProgress
                  value={92}
                  variant="gradient"
                  size="lg"
                  colors={{
                    gradientFrom: theme.colors.emerald?.[400] ?? "#34d399",
                    gradientTo: theme.colors.teal?.[600] ?? "#0d9488",
                  }}
                />
              </Stack>
            </Section>

            {/* ── 11. Dark surface ──────────────────────────────────────── */}
            <Section label="On dark surface">
              <Stack
                backgroundColor={theme.colors.gray[900]}
                borderRadius={16}
                padding={32}
                horizontal
                gap={20}
                flexWrap="wrap"
                justifyContent="space-around"
              >
                <StyledCircularProgress
                  value={72}
                  variant="gradient"
                  size="md"
                  display="percent"
                  label="Progress"
                  colors={{
                    gradientFrom: "#818cf8",
                    gradientTo: "#22d3ee",
                    track: "rgba(255,255,255,0.12)",
                    label: "#f4f4f5",
                    sublabel: "rgba(255,255,255,0.5)",
                  }}
                />
                <StyledCircularProgress
                  value={18}
                  total={25}
                  display="fraction"
                  label="Tasks"
                  size="md"
                  colors={{
                    arc: "#22c55e",
                    track: "rgba(255,255,255,0.12)",
                    label: "#f4f4f5",
                    sublabel: "rgba(255,255,255,0.5)",
                  }}
                />
                <StyledCircularProgress
                  value={85}
                  variant="ghost"
                  display="percent"
                  size="md"
                  colors={{
                    arc: "#f59e0b",
                    label: "#fbbf24",
                  }}
                />
              </Stack>
            </Section>

            {/* ── 12. Custom centre children ────────────────────────────── */}
            <Section label="Custom centre content (children)">
              <Stack horizontal gap={5} flexWrap="wrap">
                {/* Emoji */}
                <StyledCircularProgress value={100} display="none" size="lg">
                  <StyledText fontSize={14}>🏆</StyledText>
                </StyledCircularProgress>

                {/* Icon + text */}
                <StyledCircularProgress
                  value={55}
                  display="none"
                  size="lg"
                  colors={{ arc: theme.colors.rose?.[500] ?? "#f43f5e" }}
                >
                  <Stack alignItems="center" gap={2}>
                    <StyledText fontSize={14}>❤️</StyledText>
                    <StyledText
                      fontSize={12}
                      fontWeight={theme.fontWeight.bold}
                      color={theme.colors.rose?.[500] ?? "#f43f5e"}
                    >
                      55 bpm
                    </StyledText>
                  </Stack>
                </StyledCircularProgress>

                {/* Multi-line */}
                <StyledCircularProgress
                  value={4200}
                  total={10000}
                  display="none"
                  size="lg"
                  colors={{ arc: theme.colors.green[500] }}
                >
                  <Stack alignItems="center" gap={1}>
                    <StyledText
                      fontSize={16}
                      fontWeight={theme.fontWeight.bold}
                      color={theme.colors.gray[800]}
                    >
                      4,200
                    </StyledText>
                    <StyledText fontSize={9} color={theme.colors.gray[400]}>
                      / 10,000
                    </StyledText>
                    <StyledText fontSize={9} color={theme.colors.gray[400]}>
                      steps
                    </StyledText>
                  </Stack>
                </StyledCircularProgress>
              </Stack>
            </Section>

            {/* ── 13. Controlled value ──────────────────────────────────── */}
            <Section label="Controlled value (tap to change)">
              <Stack alignItems="center" gap={16}>
                <StyledCircularProgress
                  value={controlled}
                  display="percent"
                  label="Progress"
                  sublabel={`${controlled} / 100`}
                  size="xl"
                  variant="gradient"
                  duration={600}
                />
                <Stack marginTop={16} horizontal gap={10}>
                  {[0, 25, 50, 75, 100].map((v) => (
                    <TouchableOpacity
                      key={v}
                      onPress={() => setControlled(v)}
                      style={[u.pill, controlled === v && u.pillActive]}
                      activeOpacity={0.7}
                    >
                      <StyledText
                        fontSize={13}
                        fontWeight={theme.fontWeight.semiBold}
                        color={
                          controlled === v
                            ? theme.colors.white
                            : theme.colors.indigo?.[500] ?? "#6366f1"
                        }
                      >
                        {v}%
                      </StyledText>
                    </TouchableOpacity>
                  ))}
                </Stack>
              </Stack>
            </Section>

            {/* ── 14. Animated = false ──────────────────────────────────── */}
            <Section label="No animation (animated=false)">
              <Stack horizontal gap={16}>
                <StyledCircularProgress
                  value={30}
                  animated={false}
                  display="percent"
                />
                <StyledCircularProgress
                  value={60}
                  animated={false}
                  display="percent"
                />
                <StyledCircularProgress
                  value={90}
                  animated={false}
                  display="percent"
                />
              </Stack>
            </Section>

            {/* ── 16. Real-world: onboarding checklist ──────────────────── */}
            <Section label="Real-world — onboarding card">
              <Stack
                backgroundColor={theme.colors.indigo?.[600] ?? "#4f46e5"}
                borderRadius={16}
                horizontal
                gap={20}
                vertical
                paddingVertical={32}
                paddingHorizontal={16}
                flex={1}
                alignItems="center"
                alignSelf="flex-start"
              >
                <StyledCircularProgress
                  value={3}
                  total={5}
                  display="fraction"
                  label="done"
                  size="lg"
                  colors={{
                    arc: theme.colors.white,
                    track: "rgba(255,255,255,0.2)",
                    label: theme.colors.white,
                    sublabel: "rgba(255,255,255,0.65)",
                  }}
                />
                <Stack vertical flex={1} gap={4}>
                  <StyledText
                    fontSize={16}
                    fontWeight={theme.fontWeight.bold}
                    color={theme.colors.white}
                  >
                    Getting started
                  </StyledText>
                  <StyledText fontSize={13} color="rgba(255,255,255,0.75)">
                    Complete 2 more steps to unlock all features.
                  </StyledText>
                </Stack>
              </Stack>
            </Section>
          </StyledCard>
        </Stack>
      </StyledScrollView>
    </Fragment>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const u = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f9fafb" },
  scroll: { padding: 20, gap: 28, paddingBottom: 60 },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.indigo?.[50] ?? "#eef2ff",
    alignSelf: "center",
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: theme.colors.indigo?.[400] ?? "#818cf8",
  },
  pillActive: {
    backgroundColor: theme.colors.indigo?.[500] ?? "#6366f1",
    borderColor: theme.colors.indigo?.[500] ?? "#6366f1",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
});
