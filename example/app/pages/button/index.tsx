import React, { Fragment, useState } from "react";
import {
  ChevronRight,
  Stack,
  StyledText,
  StyledDivider,
  theme,
  StyledScrollView,
  StyleShape,
  StyledSpacer,
  StyledCard,
  StyledButton,
  StyledSeperator,
} from "fluent-styles";
import { StyleSheet, View, Text } from "react-native";

const Button = () => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const fakeAsync = (set: (v: boolean) => void) => {
    set(true);
    setTimeout(() => set(false), 2000);
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
          {/* ── 1. Appearance variants ────────────────────────────────────── */}
          <Section label="Appearance variants">
            <Stack horizontal flex={1} gap={8} flexWrap="wrap">
              <StyledButton primary compact>
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Primary
                </StyledButton.Text>
              </StyledButton>

              <StyledButton secondary compact>
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Secondary
                </StyledButton.Text>
              </StyledButton>

              <StyledButton outline compact>
                <StyledButton.Text
                  color={theme.colors.gray[800]}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Outline
                </StyledButton.Text>
              </StyledButton>

              <StyledButton ghost compact>
                <StyledButton.Text
                  color={theme.colors.gray[700]}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Ghost
                </StyledButton.Text>
              </StyledButton>

              <StyledButton link compact>
                <StyledButton.Text
                  color={theme.colors.blue[500]}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Link
                </StyledButton.Text>
              </StyledButton>

              <StyledButton danger compact>
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Danger
                </StyledButton.Text>
              </StyledButton>

              <StyledButton success compact>
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Success
                </StyledButton.Text>
              </StyledButton>

              <StyledButton warning compact>
                <StyledButton.Text
                  color={theme.colors.gray[900]}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Warning
                </StyledButton.Text>
              </StyledButton>

              <StyledButton disabled compact>
                <StyledButton.Text
                  color={theme.colors.gray[400]}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Disabled
                </StyledButton.Text>
              </StyledButton>
            </Stack>
          </Section>

          {/* ── 2. Sizes ──────────────────────────────────────────────────── */}
          <Section label="Sizes (xs → xl)">
            <Stack
              horizontal
              flex={1}
              gap={8}
              alignItems="center"
              flexWrap="wrap"
            >
              {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
                <StyledButton key={s} primary compact {...{ [s]: true }}>
                  <StyledButton.Text
                    color={theme.colors.white}
                    fontSize={
                      s === "xs"
                        ? theme.fontSize.nano
                        : s === "sm"
                          ? theme.fontSize.micro
                          : s === "md"
                            ? theme.fontSize.small
                            : s === "lg"
                              ? theme.fontSize.normal
                              : theme.fontSize.large
                    }
                    fontWeight={theme.fontWeight.normal}
                  >
                    {s.toUpperCase()}
                  </StyledButton.Text>
                </StyledButton>
              ))}
            </Stack>
          </Section>

          {/* ── 3. Shapes ─────────────────────────────────────────────────── */}
          <Section label="Shapes">
            <Stack horizontal flex={1} gap={8}>
              <StyledButton primary compact pill>
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Pill
                </StyledButton.Text>
              </StyledButton>

              <StyledButton primary compact rounded>
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Rounded
                </StyledButton.Text>
              </StyledButton>

              <StyledButton backgroundColor={theme.colors.yellow[500]} borderWidth={0} square>
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Square
                </StyledButton.Text>
              </StyledButton>
            </Stack>
          </Section>

          {/* ── 4. With icons ─────────────────────────────────────────────── */}
          <Section label="With icons">
            <Stack gap={10}>
              {/* Left icon */}
              <StyledButton
                primary
                compact
                leftIcon={<Icon emoji="🚀" size={14} />}
              >
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Deploy
                </StyledButton.Text>
              </StyledButton>

              {/* Right icon */}
              <StyledButton
                outline
                compact
                rightIcon={<Icon emoji="→" size={14} />}
              >
                <StyledButton.Text
                  color={theme.colors.gray[800]}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Continue
                </StyledButton.Text>
              </StyledButton>

              {/* Both icons */}
              <StyledButton
                secondary
                compact
                leftIcon={<Icon emoji="⬇" size={13} />}
                rightIcon={<Icon emoji="📦" size={13} />}
              >
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Download package
                </StyledButton.Text>
              </StyledButton>

              {/* Icon-only (circle) */}
              <Stack horizontal gap={10}>
                {[
                  { emoji: "✉️", bg: theme.colors.indigo[500] },
                  { emoji: "🔔", bg: theme.colors.amber[400] },
                  { emoji: "⚙️", bg: theme.colors.gray[200] },
                  { emoji: "🗑️", bg: theme.colors.red[500] },
                ].map(({ emoji, bg }) => (
                  <StyledButton key={emoji} icon backgroundColor={bg}>
                    <Icon emoji={emoji} size={18} />
                  </StyledButton>
                ))}
              </Stack>
            </Stack>
          </Section>

          {/* ── 5. Loading state ──────────────────────────────────────────── */}
          <Section label="Loading state">
            <Stack gap={10}>
              <StyledButton
                primary
                compact
                loading={loading}
                onPress={() => fakeAsync(setLoading)}
              >
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  {loading ? "Saving…" : "Save changes"}
                </StyledButton.Text>
              </StyledButton>

              <StyledButton
                outline
                compact
                loading={loading2}
                onPress={() => fakeAsync(setLoading2)}
              >
                <StyledButton.Text
                  color={theme.colors.gray[800]}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  {loading2 ? "Uploading…" : "Upload file"}
                </StyledButton.Text>
              </StyledButton>
            </Stack>
          </Section>

          {/* ── 6. Full-width block buttons ────────────────────────────────── */}
          <Section label="Full-width (block)">
            <Stack gap={10}>
              <StyledButton primary block>
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.medium}
                  fontWeight={theme.fontWeight.bold}
                >
                  Create account
                </StyledButton.Text>
              </StyledButton>

              <StyledButton outline block>
                <StyledButton.Text
                  color={theme.colors.gray[800]}
                  fontSize={theme.fontSize.medium}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Sign in instead
                </StyledButton.Text>
              </StyledButton>

              <StyledButton
                danger
                block
                leftIcon={<Icon emoji="🗑️" size={15} />}
              >
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.medium}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Delete account
                </StyledButton.Text>
              </StyledButton>
            </Stack>
          </Section>

          {/* ── 7. Custom colours (inline overrides) ──────────────────────── */}
          <Section label="Custom colours">
            <Stack horizontal flex={1} gap={8} flexWrap="wrap">
              <StyledButton
                compact
                backgroundColor={theme.colors.yellow[500]}
                borderWidth={0}
                borderRadius={100}
              >
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.bold}
                >
                  View on GitHub
                </StyledButton.Text>
              </StyledButton>

              <StyledButton
                compact
                backgroundColor={theme.colors.violet[600]}
                borderRadius={12}
              >
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Upgrade plan
                </StyledButton.Text>
              </StyledButton>

              <StyledButton
                compact
                backgroundColor={theme.colors.teal[500]}
                borderRadius={8}
              >
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Connect wallet
                </StyledButton.Text>
              </StyledButton>
            </Stack>
          </Section>

          {/* ── 8. Button groups ──────────────────────────────────────────── */}
          <Section label="Button groups">
            {/* Segmented / tab-style */}
            <View style={u.segmented}>
              {["Day", "Week", "Month"].map((label, i, arr) => (
                <StyledButton
                  key={label}
                  compact
                  backgroundColor={
                    i === 1 ? theme.colors.indigo[500] : theme.colors.white
                  }
                  borderRadius={0}
                  borderWidth={1}
                  borderColor={theme.colors.gray[200]}
                  flex={1}
                  style={[
                    i === 0 && u.segLeft,
                    i === arr.length - 1 && u.segRight,
                  ]}
                >
                  <StyledButton.Text
                    color={
                      i === 1 ? theme.colors.white : theme.colors.gray[700]
                    }
                    fontSize={theme.fontSize.small}
                    fontWeight={theme.fontWeight.semiBold}
                  >
                    {label}
                  </StyledButton.Text>
                </StyledButton>
              ))}
            </View>

            {/* Inline action row */}
            <Stack horizontal flex={1} gap={8} marginTop={12}>
              <StyledButton outline flex={1}>
                <StyledButton.Text
                  color={theme.colors.gray[700]}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Cancel
                </StyledButton.Text>
              </StyledButton>
              <StyledButton primary flex={2}>
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Confirm & pay
                </StyledButton.Text>
              </StyledButton>
            </Stack>
          </Section>

          {/* ── 9. Social / branded ────────────────────────────────────────── */}
          <Section label="Social / branded">
            <Stack gap={10}>
              <StyledButton
                block
                backgroundColor="#1DA1F2"
                borderRadius={100}
                leftIcon={<Icon emoji="🐦" size={16} />}
              >
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.bold}
                >
                  Continue with Twitter
                </StyledButton.Text>
              </StyledButton>

              <StyledButton
                block
                backgroundColor="#24292e"
                borderRadius={100}
                leftIcon={<Icon emoji="🐙" size={16} />}
              >
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.bold}
                >
                  Continue with GitHub
                </StyledButton.Text>
              </StyledButton>

              <StyledButton
                block
                backgroundColor={theme.colors.white}
                borderRadius={100}
                borderWidth={1}
                borderColor={theme.colors.gray[200]}
                leftIcon={<Icon emoji="🔵" size={16} />}
              >
                <StyledButton.Text
                  color={theme.colors.gray[800]}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.bold}
                >
                  Continue with Google
                </StyledButton.Text>
              </StyledButton>
            </Stack>
          </Section>

          {/* ── 11. Real-world card CTA ────────────────────────────────────── */}
          <Section label="Card CTA (real-world)">
            <StyledCard shadow="light" padding={20} borderRadius={20} gap={12} borderWidth={1} borderColor={theme.colors.gray[200]}>
              <StyledText
                fontSize={theme.fontSize.normal}
                fontWeight={theme.fontWeight.bold}
                color={theme.colors.gray[900]}
              >
                Pro plan — $12/mo
              </StyledText>
              <StyledText
                fontSize={theme.fontSize.small}
                color={theme.colors.gray[500]}
                marginTop={4}
                marginBottom={16}
              >
                Unlimited projects, priority support, and advanced analytics.
              </StyledText>

              <StyledButton
                block
                backgroundColor={theme.colors.indigo[600]}
                borderRadius={14}
                paddingVertical={14}
              >
                <StyledButton.Text
                  color={theme.colors.white}
                  fontSize={theme.fontSize.medium}
                  fontWeight={theme.fontWeight.bold}
                >
                  Get started
                </StyledButton.Text>
              </StyledButton>

              <StyledButton link block marginTop={8}>
                <StyledButton.Text
                  color={theme.colors.gray[400]}
                  fontSize={theme.fontSize.small}
                  fontWeight={theme.fontWeight.normal}
                >
                  Maybe later
                </StyledButton.Text>
              </StyledButton>
            </StyledCard>
          </Section>

          <StyledSpacer marginVertical={32} />
        </StyledCard>
      </StyledScrollView>
    </Fragment>
  );
};

// ─── Section wrapper ──────────────────────────────────────────────────────────

const Icon = ({ emoji, size = 16 }: { emoji: string; size?: number }) => (
  <Text style={{ fontSize: size, lineHeight: size + 2 }}>{emoji}</Text>
);

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
    {children}
  </View>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const u = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 32,
  },
  section: {
    gap: 12,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8e8e93",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  segmented: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  segLeft: { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
  segRight: { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
});

export default Button;
