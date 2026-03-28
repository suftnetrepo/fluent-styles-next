import React, { Fragment } from "react";
import { StyleSheet, Text } from "react-native";

import {
  theme,
  Stack,
  StyledScrollView,
  StyledSpacer,
  StyledSeperator,
  StyledText,
  StyledImage,
  StyledImageBackground,
} from "fluent-styles";

// ─── Small emoji helper ──────────────────────────────────────────────────────

const E = ({ e }: { e: string }) => (
  <Text style={{ fontSize: 18 }}>{e}</Text>
);

// ─── Section wrapper ─────────────────────────────────────────────────────────

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
        marginVertical={8}
        borderBottomColor={theme.colors.gray[500]}
        borderBottomWidth={0.5}
        backgroundColor={theme.colors.gray[1]}
      />
      {children}
    </>
  </Stack>
);

// ─── Remote image sources ────────────────────────────────────────────────────

const photos = {
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  avatar2:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  banner:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
  product:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
  nature:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  city:
    "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
  workspace:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
};

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function ImageUsage() {
  return (
    <Fragment>
      <StyledSpacer marginVertical={8} />

      <StyledScrollView showsVerticalScrollIndicator={false}>
        <Stack padding={16} backgroundColor={theme.colors.gray[50]}>
          {/* 1. Basic image */}
          <Section label="Basic image">
            <Stack gap={12}>
              <StyledImage
                source={{ uri: photos.product }}
                width={140}
                height={140}
                borderRadius={16}
              />

              <StyledText color={theme.colors.gray[500]}>
                Simple remote image with fixed width and height.
              </StyledText>
            </Stack>
          </Section>

          {/* 2. Different sizes */}
          <Section label="Different sizes">
            <Stack horizontal gap={12} alignItems="center">
              <StyledImage
                source={{ uri: photos.avatar }}
                width={60}
                height={60}
                borderRadius={12}
              />
              <StyledImage
                source={{ uri: photos.avatar }}
                width={90}
                height={90}
                borderRadius={14}
              />
              <StyledImage
                source={{ uri: photos.avatar }}
                width={120}
                height={120}
                borderRadius={18}
              />
            </Stack>
          </Section>

          {/* 3. Circular images */}
          <Section label="Circular images with cycle">
            <Stack horizontal gap={14} alignItems="center">
              <Stack alignItems="center" gap={8}>
                <StyledImage
                  source={{ uri: photos.avatar }}
                  cycle
                  size={48}
                  borderRadius={999}
                />
                <StyledText fontSize={12}>48</StyledText>
              </Stack>

              <Stack alignItems="center" gap={8}>
                <StyledImage
                  source={{ uri: photos.avatar2 }}
                  cycle
                  size={72}
                  borderRadius={999}
                />
                <StyledText fontSize={12}>72</StyledText>
              </Stack>

              <Stack alignItems="center" gap={8}>
                <StyledImage
                  source={{ uri: photos.avatar }}
                  cycle
                  size={96}
                  borderRadius={999}
                />
                <StyledText fontSize={12}>96</StyledText>
              </Stack>
            </Stack>
          </Section>

          {/* 4. Avatar row */}
          <Section label="Avatar row">
            <Stack horizontal gap={12} alignItems="center">
              <StyledImage
                source={{ uri: photos.avatar }}
                cycle
                size={52}
                borderRadius={999}
              />
              <Stack flex={1}>
                <StyledText fontSize={17} fontWeight={800}>
                  Abel Aghorighor
                </StyledText>
                <StyledText color={theme.colors.gray[500]}>
                  React Native Developer
                </StyledText>
              </Stack>
              <E e="✅" />
            </Stack>
          </Section>

          {/* 5. Banner image */}
          <Section label="Banner image">
            <StyledImage
              source={{ uri: photos.banner }}
              width={"100%" as any}
              height={180}
              borderRadius={20}
            />
          </Section>

          {/* 6. resizeMode examples */}
          <Section label="Resize mode examples">
            <Stack vertical gap={12}>
              <Stack gap={6}>
                <StyledText fontWeight={700}>Cover</StyledText>
                <StyledImage
                  source={{ uri: photos.product }}
                  width={"100%" as any}
                  height={140}
                  borderRadius={16}
                  resizeMode="cover"
                />
              </Stack>

              <Stack gap={6}>
                <StyledText fontWeight={700}>Contain</StyledText>
                <Stack
                  backgroundColor={theme.colors.white}
                  borderRadius={16}
                  padding={10}
                  borderWidth={1}
                  borderColor={theme.colors.gray[200]}
                >
                  <StyledImage
                    source={{ uri: photos.product }}
                    width={"100%" as any}
                    height={140}
                    resizeMode="contain"
                  />
                </Stack>
              </Stack>
            </Stack>
          </Section>

          {/* 7. Rounded thumbnail grid */}
          <Section label="Thumbnail grid">
            <Stack horizontal gap={10} flexWrap="wrap">
              {[photos.nature, photos.city, photos.workspace, photos.product].map((src, i) => (
                <StyledImage
                  key={i}
                  source={{ uri: src }}
                  width={76}
                  height={76}
                  borderRadius={12}
                />
              ))}
            </Stack>
          </Section>

          {/* 8. Image card pattern */}
          <Section label="Image card pattern">
            <Stack
              backgroundColor={theme.colors.white}
              borderRadius={20}
              borderWidth={1}
              borderColor={theme.colors.gray[100]}
              overflow="hidden"
            >
              <StyledImage
                source={{ uri: photos.workspace }}
                width={"100%" as any}
                height={180}
                resizeMode="cover"
              />
              <Stack padding={16} gap={8}>
                <StyledText fontSize={18} fontWeight={800}>
                  Modern workspace
                </StyledText>
                <StyledText color={theme.colors.gray[500]}>
                  A simple card layout using StyledImage at the top.
                </StyledText>
              </Stack>
            </Stack>
          </Section>

          {/* 9. Image background basic */}
          <Section label="Image background">
            <StyledImageBackground
              source={{ uri: photos.nature }}
              height={220}
              borderRadius={22}
              overflow="hidden"
              justifyContent="flex-end"
            >
              <Stack
                padding={18}
                borderTopLeftRadius={22}
                borderTopRightRadius={22}
                backgroundColor="rgba(0,0,0,0.28)"
              >
                <StyledText color={theme.colors.white} fontSize={22} fontWeight={800}>
                  Explore nature
                </StyledText>
                <StyledText color={theme.colors.white}>
                  Beautiful full-width background section
                </StyledText>
              </Stack>
            </StyledImageBackground>
          </Section>

          {/* 10. Hero background */}
          <Section label="Hero background">
            <StyledImageBackground
              source={{ uri: photos.banner }}
              height={260}
              borderRadius={24}
              overflow="hidden"
              justifyContent="space-between"
            >
              <Stack padding={18} alignItems="flex-end">
                <Stack
                  paddingHorizontal={12}
                  paddingVertical={6}
                  borderRadius={999}
                  backgroundColor="rgba(255,255,255,0.85)"
                >
                  <StyledText fontWeight={700}>Featured</StyledText>
                </Stack>
              </Stack>

              <Stack padding={20} backgroundColor="rgba(0,0,0,0.34)">
                <StyledText color={theme.colors.white} fontSize={24} fontWeight={800}>
                  Build better mobile UI
                </StyledText>
                <StyledSpacer marginVertical={4} />
                <StyledText color={theme.colors.white}>
                  Use image backgrounds for banners, heroes, and featured content.
                </StyledText>
              </Stack>
            </StyledImageBackground>
          </Section>

          {/* 11. Profile header background */}
          <Section label="Profile header background">
            <Stack
              backgroundColor={theme.colors.white}
              borderRadius={22}
              overflow="hidden"
              borderWidth={1}
              borderColor={theme.colors.gray[100]}
            >
              <StyledImageBackground
                source={{ uri: photos.city }}
                height={150}
                justifyContent="flex-end"
              >
                <Stack height={24} />
              </StyledImageBackground>

              <Stack paddingHorizontal={16} paddingBottom={16}>
                <Stack marginTop={-38} horizontal alignItems="flex-end" gap={12}>
                  <StyledImage
                    source={{ uri: photos.avatar }}
                    cycle
                    size={68}
                    borderRadius={999}
                    borderWidth={3}
                    borderColor={theme.colors.white}
                  />

                  <Stack flex={1} paddingBottom={6}>
                    <StyledText color={theme.colors.gray[1]} fontSize={18} fontWeight={800}>
                      Sarah Johnson
                    </StyledText>
                    <StyledText fontSize={theme.fontSize.normal} color={theme.colors.gray[500]}>
                      Product Designer
                    </StyledText>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Section>

          {/* 12. Category tiles */}
          <Section label="Category tiles">
            <Stack horizontal gap={12}>
              <StyledImageBackground
                source={{ uri: photos.nature }}
                width={160}
                height={110}
                borderRadius={18}
                overflow="hidden"
                justifyContent="flex-end"
              >
                <Stack borderTopLeftRadius={18} borderTopRightRadius={18}  padding={12} backgroundColor="rgba(0,0,0,0.22)">
                  <StyledText color={theme.colors.white} fontWeight={800}>
                    Travel
                  </StyledText>
                </Stack>
              </StyledImageBackground>

              <StyledImageBackground
                source={{ uri: photos.workspace }}
                width={160}
                height={110}
                borderRadius={18}
                overflow="hidden"
                justifyContent="flex-end"
              >
                <Stack borderTopLeftRadius={18} borderTopRightRadius={18} padding={12} backgroundColor="rgba(0,0,0,0.22)">
                  <StyledText color={theme.colors.white} fontWeight={800}>
                    Work
                  </StyledText>
                </Stack>
              </StyledImageBackground>
            </Stack>
          </Section>

          {/* 13. Gallery row */}
          <Section label="Horizontal gallery">
            <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Stack horizontal gap={12}>
                {[photos.banner, photos.nature, photos.city, photos.workspace].map((src, i) => (
                  <StyledImage
                    key={i}
                    source={{ uri: src }}
                    width={220}
                    height={140}
                    borderRadius={18}
                  />
                ))}
              </Stack>
            </StyledScrollView>
          </Section>

          {/* 14. With overlay badge */}
          <Section label="Image with overlay badge">
            <Stack>
              <StyledImage
                source={{ uri: photos.product }}
                width={"100%" as any}
                height={220}
                borderRadius={22}
              />
              <Stack
                position="absolute"
                top={14}
                right={14}
                paddingHorizontal={12}
                paddingVertical={6}
                borderRadius={999}
                backgroundColor="rgba(17,24,39,0.78)"
              >
                <StyledText color={theme.colors.white} fontWeight={700}>
                  New
                </StyledText>
              </Stack>
            </Stack>
          </Section>

          {/* 15. Empty state illustration style */}
          <Section label="Illustration / visual block">
            <Stack
              backgroundColor={theme.colors.white}
              borderRadius={20}
              padding={20}
              alignItems="center"
              gap={12}
              borderWidth={1}
              borderColor={theme.colors.gray[100]}
            >
              <StyledImage
                source={{ uri: photos.nature }}
                width={180}
                height={120}
                borderRadius={16}
              />
              <StyledText fontSize={18} fontWeight={800}>
                No saved items
              </StyledText>
              <StyledText fontSize={theme.fontSize.normal} color={theme.colors.gray[500]} textAlign="center">
                Use StyledImage to build empty states, onboarding blocks, and visual highlights.
              </StyledText>
            </Stack>
          </Section>
        </Stack>
      </StyledScrollView>
    </Fragment>
  );
}
