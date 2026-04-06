import React, { useState } from "react";
import {
  StyledSafeAreaView,
  StyledScrollView,
  StyledCard,
  StyledText,
  StyledPressable,
  StyledDivider,
  Stack,
  theme,
  palettes,
  StyledHeader,
  StyledBadge,
  BadgeIcon,
  StyledSpacer,
} from "fluent-styles";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DemoSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <Stack gap={10}>
    <StyledText
      fontSize={11}
      fontWeight="700"
      color={theme.colors.gray[400]}
      letterSpacing={0.8}
    >
      {title.toUpperCase()}
    </StyledText>
    <>{children}</>
  </Stack>
);

// Thin frame that shows the header against a realistic background
const HeaderFrame: React.FC<{ bg?: string; children: React.ReactNode }> = ({
  bg = theme.colors.gray[50],
  children,
}) => (
  <Stack
    borderRadius={14}
    overflow="hidden"
    borderWidth={1}
    borderColor={theme.colors.gray[100]}
    backgroundColor={bg}
    paddingHorizontal={8}
    paddingVertical={8}
  >
    <>{children}</>

    {/* fake screen body */}
    <Stack padding={16} gap={8}>
      {[100, 80, 90, 60].map((w, i) => (
        <Stack
          key={i}
          height={10}
          width={`${w}%`}
          borderRadius={5}
          backgroundColor={theme.colors.gray[100]}
        />
      ))}
    </Stack>
  </Stack>
);

// Simple icon buttons used in examples
const IconBtn: React.FC<{ label: string; onPress?: () => void }> = ({
  label,
  onPress,
}) => (
  <StyledPressable
    onPress={onPress}
    width={32}
    height={32}
    borderRadius={16}
    backgroundColor={theme.colors.gray[100]}
    alignItems="center"
    justifyContent="center"
  >
    <StyledText fontSize={15}>{label}</StyledText>
  </StyledPressable>
);

const E = ({ e, size = 16 }: { e: string; size?: number }) => (
  <StyledText fontSize={size}>{e}</StyledText>
);

// ─────────────────────────────────────────────────────────────────────────────
// Screen
// ─────────────────────────────────────────────────────────────────────────────

export const StyledHeaderDemo: React.FC = () => {
  const [liked, setLiked] = useState(false);

  return (
    <Stack flex={1} marginTop={16} paddingHorizontal={20} backgroundColor={theme.colors.gray[50]} borderRadius={32}>
      <StyledSpacer marginVertical={8} />
      <StyledScrollView
      showsVerticalScrollIndicator={false}
        contentContainerStyle={{  paddingBottom: 60, gap: 28 }}
      >
        {/* ── 1. Title alignment ─────────────────────────────────────────── */}
        <DemoSection title="Title alignment">
          <Stack gap={12}>
            <HeaderFrame>
              <StyledHeader
                title="Left aligned"
                titleAlignment="left"
                showStatusBar={false}
                backgroundColor={theme.colors.gray[50]}
              />
            </HeaderFrame>

            <HeaderFrame>
              <StyledHeader
                title="Center aligned"
                titleAlignment="center"
                showStatusBar={false}
                backgroundColor={theme.colors.gray[50]}
              />
            </HeaderFrame>

            <HeaderFrame>
              <StyledHeader
                title="Right aligned"
                titleAlignment="right"
                showStatusBar={false}
                backgroundColor={theme.colors.gray[50]}
              />
            </HeaderFrame>
          </Stack>
        </DemoSection>

        {/* ── 2. Back arrow ──────────────────────────────────────────────── */}
        <DemoSection title="Back arrow">
          <Stack gap={12}>
            {/* left + back arrow */}
            <HeaderFrame>
              <StyledHeader
                title="Go back"
                titleAlignment="left"
                showBackArrow
                showStatusBar={false}
                backgroundColor={theme.colors.gray[50]}
              />
            </HeaderFrame>

            {/* center + back arrow */}
            <HeaderFrame>
              <StyledHeader
                title="Detail"
                titleAlignment="center"
                showBackArrow
                showStatusBar={false}
                backgroundColor={theme.colors.gray[50]}
              />
            </HeaderFrame>

            {/* custom back arrow color + size */}
            <HeaderFrame bg={palettes.indigo[600]}>
              <StyledHeader
                title="Custom arrow"
                titleAlignment="center"
                showBackArrow
                showStatusBar={false}
                backgroundColor={palettes.indigo[600]}
                titleProps={{ color: palettes.white, fontWeight: "700" }}
                backArrowProps={{ color: palettes.white, size: 20 }}
              />
            </HeaderFrame>
          </Stack>
        </DemoSection>

        {/* ── 3. Right icon ──────────────────────────────────────────────── */}
        <DemoSection title="Right icon">
          <Stack gap={12}>
            <HeaderFrame>
              <StyledHeader
                title="Settings"
                titleAlignment="center"
                showBackArrow
                showStatusBar={false}
                backgroundColor={theme.colors.gray[50]}
                rightIcon={<IconBtn label="⚙️" />}
              />
            </HeaderFrame>

            <HeaderFrame>
              <StyledHeader
                title="Notifications"
                titleAlignment="center"
                showBackArrow
                showStatusBar={false}
                backgroundColor={theme.colors.gray[50]}
                rightIcon={<IconBtn label="🔔" />}
              />
            </HeaderFrame>

            {/* multiple right icons */}
            <HeaderFrame>
              <StyledHeader
                title="Photos"
                titleAlignment="center"
                showBackArrow
                showStatusBar={false}
                backgroundColor={theme.colors.gray[50]}
                rightIcon={
                  <Stack horizontal gap={8}>
                    <IconBtn label="🔍" />
                    <IconBtn label="⋯" />
                  </Stack>
                }
              />
            </HeaderFrame>
          </Stack>
        </DemoSection>

        {/* ── 4. Left icon ───────────────────────────────────────────────── */}
        <DemoSection title="Left icon (no back arrow)">
          <Stack gap={12}>
            {/* avatar left, action right */}
            <HeaderFrame>
              <StyledHeader
                titleAlignment="center"
                title="Messages"
                showStatusBar={false}
                backgroundColor={theme.colors.gray[50]}
                leftIcon={
                  <Stack
                    width={32}
                    height={32}
                    borderRadius={16}
                    backgroundColor={palettes.indigo[100]}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <StyledText fontSize={16}>👤</StyledText>
                  </Stack>
                }
                rightIcon={<IconBtn label="✏️" />}
              />
            </HeaderFrame>

            {/* logo left */}
            <HeaderFrame>
              <StyledHeader
                titleAlignment="left"
                showStatusBar={false}
                backgroundColor={theme.colors.gray[50]}
                leftIcon={
                  <Stack horizontal gap={6} alignItems="center">
                    <Stack
                      width={28}
                      height={28}
                      borderRadius={8}
                      backgroundColor={palettes.indigo[600]}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <StyledText
                        fontSize={14}
                        color={palettes.white}
                        fontWeight="900"
                      >
                        F
                      </StyledText>
                    </Stack>
                    <StyledText
                      fontSize={16}
                      fontWeight="800"
                      color={theme.colors.gray[900]}
                    >
                      fluent
                    </StyledText>
                  </Stack>
                }
                rightIcon={
                  <Stack horizontal gap={8}>
                    <IconBtn label="🔍" />
                    <IconBtn label="🛒" />
                  </Stack>
                }
              />
            </HeaderFrame>
          </Stack>
        </DemoSection>

        {/* ── 5. Coloured / themed headers ───────────────────────────────── */}
        <DemoSection title="Themed backgrounds">
          <Stack gap={12}>
            {/* Dark */}
            <HeaderFrame bg={theme.colors.gray[900]}>
              <StyledHeader
                title="Dark header"
                titleAlignment="center"
                showBackArrow
                showStatusBar={false}
                backgroundColor={theme.colors.gray[900]}
                titleProps={{ color: palettes.white, fontWeight: "700" }}
                backArrowProps={{ color: palettes.white }}
                rightIcon={<IconBtn label="⋯" />}
              />
            </HeaderFrame>

            {/* Rose */}
            <HeaderFrame bg={palettes.rose[500]}>
              <StyledHeader
                title="Rose"
                titleAlignment="center"
                showBackArrow
                showStatusBar={false}
                backgroundColor={palettes.rose[500]}
                titleProps={{ color: palettes.white, fontWeight: "700" }}
                backArrowProps={{ color: palettes.white }}
                rightIcon={
                  <StyledPressable onPress={() => setLiked((v) => !v)}>
                    <StyledText fontSize={20}>{liked ? "❤️" : "🤍"}</StyledText>
                  </StyledPressable>
                }
              />
            </HeaderFrame>

            {/* Teal */}
            <HeaderFrame bg={palettes.teal[500]}>
              <StyledHeader
                title="Teal"
                titleAlignment="center"
                showBackArrow
                showStatusBar={false}
                backgroundColor={palettes.teal[500]}
                titleProps={{ color: palettes.white, fontWeight: "700" }}
                backArrowProps={{ color: palettes.white }}
                rightIcon={<IconBtn label="🔔" />}
              />
            </HeaderFrame>

            {/* Amber */}
            <HeaderFrame bg={palettes.amber[400]}>
              <StyledHeader
                title="Amber"
                titleAlignment="center"
                showBackArrow
                showStatusBar={false}
                backgroundColor={palettes.amber[400]}
                titleProps={{
                  color: theme.colors.gray[900],
                  fontWeight: "700",
                }}
                backArrowProps={{ color: theme.colors.gray[900] }}
              />
            </HeaderFrame>
          </Stack>
        </DemoSection>

        {/* ── 6. StyledHeader.Full — custom children ─────────────────────── */}
        <DemoSection title="StyledHeader.Full — custom children">
          <Stack gap={12}>
            {/* Search bar header */}
            <HeaderFrame>
              <StyledHeader
                showStatusBar={false}
                backgroundColor={palettes.white}
              >
                <StyledHeader.Full>
                  <Stack
                    flex={1}
                    horizontal
                    alignItems="center"
                    gap={10}
                    paddingHorizontal={12}
                  >
                    <StyledPressable>
                      <StyledText fontSize={18}>←</StyledText>
                    </StyledPressable>
                    <Stack
                      flex={1}
                      height={34}
                      borderRadius={10}
                      backgroundColor={theme.colors.gray[100]}
                      horizontal
                      alignItems="center"
                      paddingHorizontal={10}
                      gap={6}
                    >
                      <StyledText fontSize={14}>🔍</StyledText>
                      <StyledText fontSize={14} color={theme.colors.gray[400]}>
                        Search…
                      </StyledText>
                    </Stack>
                    <StyledPressable>
                      <StyledText
                        fontSize={14}
                        fontWeight="600"
                        color={palettes.indigo[600]}
                      >
                        Cancel
                      </StyledText>
                    </StyledPressable>
                  </Stack>
                </StyledHeader.Full>
              </StyledHeader>
            </HeaderFrame>

            {/* Tab-style header */}
            <HeaderFrame>
              <StyledHeader
                showStatusBar={false}
                backgroundColor={palettes.white}
              >
                <StyledHeader.Full>
                  <Stack
                    flex={1}
                    horizontal
                    alignItems="center"
                    justifyContent="space-around"
                    paddingHorizontal={16}
                  >
                    {["Feed", "Explore", "Activity"].map((tab, i) => (
                      <StyledPressable
                        key={tab}
                        paddingVertical={8}
                        paddingHorizontal={4}
                      >
                        <StyledText
                          fontSize={15}
                          fontWeight={i === 0 ? "800" : "500"}
                          color={
                            i === 0
                              ? theme.colors.gray[900]
                              : theme.colors.gray[400]
                          }
                        >
                          {tab}
                        </StyledText>
                        {i === 0 && (
                          <Stack
                            height={2}
                            borderRadius={1}
                            backgroundColor={theme.colors.gray[900]}
                            marginTop={4}
                          />
                        )}
                      </StyledPressable>
                    ))}
                  </Stack>
                </StyledHeader.Full>
              </StyledHeader>
            </HeaderFrame>

            {/* User profile header */}
            <HeaderFrame bg={palettes.indigo[600]}>
              <StyledHeader
                showStatusBar={false}
                backgroundColor={palettes.indigo[600]}
              >
                <StyledHeader.Full>
                  <Stack
                    flex={1}
                    horizontal
                    alignItems="center"
                    justifyContent="space-between"
                    paddingHorizontal={16}
                  >
                    <Stack horizontal alignItems="center" gap={10}>
                      <Stack
                        width={36}
                        height={36}
                        borderRadius={18}
                        backgroundColor={theme.colors.gray[100]}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <StyledText fontSize={18}>👤</StyledText>
                      </Stack>
                      <Stack gap={1}>
                        <StyledText
                          fontSize={14}
                          fontWeight="700"
                          color={palettes.white}
                        >
                          Alex Morgan
                        </StyledText>
                        <StyledText
                          fontSize={11}
                          color={"rgba(255,255,255,0.65)"}
                        >
                          Online
                        </StyledText>
                      </Stack>
                    </Stack>
                    <Stack horizontal gap={8}>
                      <StyledPressable
                        width={32}
                        height={32}
                        borderRadius={16}
                        backgroundColor={theme.colors.gray[100]}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <StyledText fontSize={15}>📞</StyledText>
                      </StyledPressable>
                      <StyledPressable
                        width={32}
                        height={32}
                        borderRadius={16}
                        backgroundColor={theme.colors.gray[100]}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <StyledText fontSize={15}>⋯</StyledText>
                      </StyledPressable>
                    </Stack>
                  </Stack>
                </StyledHeader.Full>
              </StyledHeader>
            </HeaderFrame>

            {/* E-commerce header */}
            <HeaderFrame>
              <StyledHeader
                showStatusBar={false}
                backgroundColor={palettes.white}
              >
                <StyledHeader.Full>
                  <Stack
                    flex={1}
                    horizontal
                    alignItems="center"
                    justifyContent="space-between"
                    paddingHorizontal={8}
                  >
                    {/* Logo */}
                    <Stack horizontal gap={6} alignItems="center">
                      <Stack
                        width={28}
                        height={28}
                        borderRadius={8}
                        backgroundColor={palettes.rose[500]}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <StyledText
                          fontSize={14}
                          color={palettes.white}
                          fontWeight="900"
                        >
                          S
                        </StyledText>
                      </Stack>
                      <StyledText
                        fontSize={16}
                        fontWeight="800"
                        color={theme.colors.gray[900]}
                      >
                        Shop
                      </StyledText>
                    </Stack>

                    {/* Actions */}
                    <Stack horizontal gap={6}>
                      <StyledPressable
                        width={34}
                        height={34}
                        borderRadius={17}
                        backgroundColor={theme.colors.gray[100]}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <StyledText fontSize={16}>🔍</StyledText>
                      </StyledPressable>

                      {/* cart with badge */}
                      <Stack>
                        <BadgeIcon
                          icon={<E e="🛒" size={24} />}
                          char="4"
                          backgroundColor={theme.colors.green[600]}
                          right={16}
                          top={-12}
                          size={16}
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                </StyledHeader.Full>
              </StyledHeader>
            </HeaderFrame>
          </Stack>
        </DemoSection>

        {/* ── 7. Real-world screen headers ───────────────────────────────── */}
        <DemoSection title="Real-world screen headers">
          <Stack gap={12}>
            {/* Chat detail */}
            <StyledCard
              padding={0}
              borderRadius={14}
              shadow="light"
              overflow="hidden"
            >
              <StyledHeader
                showStatusBar={false}
                backgroundColor={palettes.white}
                borderBottomWidth={1}
                borderBottomColor={theme.colors.gray[100]}
              >
                <StyledHeader.Full>
                  <Stack
                    flex={1}
                    horizontal
                    alignItems="center"
                    paddingHorizontal={12}
                    gap={10}
                  >
                    <StyledPressable>
                      <StyledText fontSize={18} color={palettes.indigo[600]}>
                        ←
                      </StyledText>
                    </StyledPressable>
                    <Stack
                      width={36}
                      height={36}
                      borderRadius={18}
                      backgroundColor={palettes.indigo[100]}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <StyledText fontSize={18}>👩‍💻</StyledText>
                    </Stack>
                    <Stack flex={1} gap={1}>
                      <StyledText
                        fontSize={14}
                        fontWeight="700"
                        color={theme.colors.gray[900]}
                      >
                        Priya Kapoor
                      </StyledText>
                      <StyledText
                        fontSize={11}
                        color={palettes.teal[500]}
                        fontWeight="600"
                      >
                        Active now
                      </StyledText>
                    </Stack>
                    <Stack horizontal gap={8}>
                      <StyledPressable>
                        <StyledText fontSize={18}>📞</StyledText>
                      </StyledPressable>
                      <StyledPressable>
                        <StyledText fontSize={18}>📹</StyledText>
                      </StyledPressable>
                    </Stack>
                  </Stack>
                </StyledHeader.Full>
              </StyledHeader>
              <Stack padding={16}>
                <StyledText fontSize={13} color={theme.colors.gray[400]}>
                  Chat screen body…
                </StyledText>
              </Stack>
            </StyledCard>

            {/* Article / blog post */}
            <StyledCard
              padding={0}
              borderRadius={14}
              shadow="light"
              overflow="hidden"
            >
              <StyledHeader
                showStatusBar={false}
                backgroundColor={palettes.white}
                borderBottomWidth={1}
                borderBottomColor={theme.colors.gray[100]}
                showBackArrow
                backArrowProps={{ color: theme.colors.gray[800] }}
                title="The Future of UI"
                titleAlignment="center"
                titleProps={{ fontSize: 15, fontWeight: "700" }}
                rightIcon={
                  <Stack horizontal gap={6}>
                    <StyledPressable onPress={() => setLiked((v) => !v)}>
                      <StyledText fontSize={18}>
                        {liked ? "❤️" : "🤍"}
                      </StyledText>
                    </StyledPressable>
                    <StyledPressable>
                      <StyledText fontSize={18}>⬆️</StyledText>
                    </StyledPressable>
                  </Stack>
                }
              />
              <Stack padding={16}>
                <StyledText fontSize={13} color={theme.colors.gray[400]}>
                  Article body…
                </StyledText>
              </Stack>
            </StyledCard>

            {/* Settings screen */}
            <StyledCard
              padding={0}
              borderRadius={14}
              shadow="light"
              overflow="hidden"
            >
              <StyledHeader
                showStatusBar={false}
                backgroundColor={palettes.white}
                title="Settings"
                titleAlignment="left"
                titleProps={{
                  paddingLeft: 16,
                  fontSize: 22,
                  fontWeight: "800",
                  color: theme.colors.gray[900],
                }}
                rightIcon={
                  <StyledPressable
                    paddingHorizontal={12}
                    paddingVertical={6}
                    borderRadius={8}
                    backgroundColor={palettes.indigo[50]}
                  >
                    <StyledText
                      fontSize={13}
                      fontWeight="600"
                      color={palettes.indigo[600]}
                    >
                      Done
                    </StyledText>
                  </StyledPressable>
                }
              />
              <StyledDivider borderBottomColor={theme.colors.gray[100]} />
              <Stack padding={16} gap={14}>
                {["Profile", "Privacy", "Notifications"].map((item) => (
                  <Stack
                    key={item}
                    horizontal
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <StyledText fontSize={14} color={theme.colors.gray[800]}>
                      {item}
                    </StyledText>
                    <StyledText fontSize={14} color={theme.colors.gray[300]}>
                      ›
                    </StyledText>
                  </Stack>
                ))}
              </Stack>
            </StyledCard>
          </Stack>
        </DemoSection>
      </StyledScrollView>
    </Stack>
  );
};

export default StyledHeaderDemo;
