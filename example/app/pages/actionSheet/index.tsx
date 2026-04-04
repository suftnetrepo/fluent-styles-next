import React, { useState } from "react";
import {
  Stack,
  StyledText,
  theme,
  StyledScrollView,
  StyledCard,
  StyledPressable,
  StyledButton,
  useActionSheet,
  useToast,
  actionSheetService,
} from "fluent-styles";
const ActionSheet = () => {
  const actionSheet = useActionSheet();
  const toast = useToast();
  const [colour, setColour] = useState("#3b82f6");

  const ITEMS = [
    {
      icon: "✏️",
      label: "Edit",
      description: "Update content",
      onPress: () => toast.info("Editing…"),
    },
    { icon: "🔗", label: "Copy link", onPress: () => toast.success("Copied!") },
    { icon: "📌", label: "Pin", onPress: () => toast.info("Pinned") },
    {
      icon: "🚩",
      label: "Report",
      variant: "destructive" as const,
      onPress: () => toast.warning("Reported"),
    },
    { icon: "🔒", label: "Premium only", variant: "disabled" as const },
  ];

  // ── Theme demos ──────────────────────────────────────────────────────────

  const demoDark = () =>
    actionSheet.show({
      title: "Dark theme",
      message: "Default",
      theme: "dark",
      items: ITEMS,
    });

  const demoLight = () =>
    actionSheet.show({
      title: "Light theme",
      message: "Clean & minimal",
      theme: "light",
      items: ITEMS,
    });

  const demoSystem = () =>
    actionSheet.show({
      title: "System theme",
      message: "Follows device appearance",
      theme: "system",
      items: ITEMS,
    });

  // ── Color override demos ──────────────────────────────────────────────────

  const demoIndigoLight = () =>
    actionSheet.show({
      title: "Indigo accent",
      theme: "light",
      colors: {
        cancelLabel: "#6366f1",
        destructiveLabel: "#ef4444",
      },
      items: ITEMS,
    });

  const demoCustomDark = () =>
    actionSheet.show({
      title: "Custom dark",
      theme: "dark",
      colors: {
        background: "#0f172a", // slate-900
        border: "#1e293b",
        separator: "#1e293b",
        gutter: "#020617",
        handle: "#334155",
        cancelLabel: "#38bdf8", // sky-400 accent
        itemLabel: "#e2e8f0",
      },
      items: ITEMS,
    });

  const demoWarm = () =>
    actionSheet.show({
      title: "Warm light",
      theme: "light",
      colors: {
        background: "#fffbf5",
        border: "#f0e6d3",
        separator: "#f0e6d3",
        gutter: "#fdf6ec",
        handle: "#d4b896",
        title: "#3d2b1f",
        message: "#8b6f5e",
        itemLabel: "#3d2b1f",
        cancelLabel: "#c2410c", // orange-700
      },
      items: ITEMS,
    });

  // ── Children + mixed ─────────────────────────────────────────────────────

  const demoChildrenLight = () =>
    actionSheet.present(
      <ColourPicker
        onSelect={(c) => {
          setColour(c);
          toast.success("Colour applied");
        }}
      />,
      { title: "Choose accent colour", theme: "light", cancelLabel: "Done" },
    );

  const demoChildrenDark = () =>
    actionSheet.present(
      <ColourPicker
        onSelect={(c) => {
          setColour(c);
          toast.success("Colour applied");
        }}
      />,
      { title: "Choose accent colour", theme: "dark", cancelLabel: "Done" },
    );

  const demoMixed = () =>
    actionSheet.show({
      title: "Share & actions",
      theme: "light",
      children: (
        <Stack gap={8}>
          <StyledText color="#8e8e93" fontSize={13} textAlign="center">
            Selected colour
          </StyledText>
          <Stack width={48} height={48} borderRadius={24} backgroundColor={colour} alignSelf="center" />
        </Stack>
      ),
      items: [
        {
          icon: "📤",
          label: "Export",
          onPress: () => toast.info("Exporting…"),
        },
        {
          icon: "🗑️",
          label: "Delete",
          variant: "destructive",
          onPress: () => toast.error("Deleted"),
        },
      ],
    });

  // ── Imperative ────────────────────────────────────────────────────────────

  const demoImperative = () =>
    actionSheetService.show({
      title: "File options",
      theme: "light",
      colors: { cancelLabel: "#6366f1" },
      items: [
        {
          icon: "📤",
          label: "Export as PDF",
          onPress: () => toast.info("Exporting…"),
        },
        {
          icon: "☁️",
          label: "Save to cloud",
          onPress: () => toast.success("Saved"),
        },
        {
          icon: "🗑️",
          label: "Delete file",
          variant: "destructive",
          onPress: () => toast.error("Deleted"),
        },
      ],
    });

  return (
    <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
    <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
          
          <Section label="Theme presets">
            <Row>
              <Btn label="Dark" color="#a1a1aa" onPress={demoDark} />
              <Btn label="Light" color="#3b82f6" onPress={demoLight} />
              <Btn label="System" color="#22c55e" onPress={demoSystem} />
            </Row>
          </Section>

          <Section label="Color overrides">
            <Btn
              label="Light + indigo cancel"
              color="#6366f1"
              onPress={demoIndigoLight}
              full
            />
            <Btn
              label="Custom dark (slate/sky)"
              color="#38bdf8"
              onPress={demoCustomDark}
              full
            />
            <Btn
              label="Warm light (amber tones)"
              color="#c2410c"
              onPress={demoWarm}
              full
            />
          </Section>

          <Section label="Children slot">
            <Row>
              <Btn
                label="Colour picker — light"
                color="#3b82f6"
                onPress={demoChildrenLight}
              />
              <Btn
                label="Colour picker — dark"
                color="#a1a1aa"
                onPress={demoChildrenDark}
              />
            </Row>
            <Btn
              label="Mixed: preview + items"
              color="#8b5cf6"
              onPress={demoMixed}
              full
            />
          </Section>

          <Section label="Imperative service">
            <Btn
              label="actionSheetService.show()"
              color="#f59e0b"
              onPress={demoImperative}
              full
            />
          </Section>
      </StyledScrollView>
    </Stack>
  );
};

// ─── UI primitives ────────────────────────────────────────────────────────────
const COLOURS = [
  "#ef4444",
  "#f59e0b",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

const ColourPicker: React.FC<{ onSelect: (c: string) => void }> = ({
  onSelect,
}) => (
  <Stack horizontal gap={8} flexWrap="wrap">
    {COLOURS.map((c) => (
      <StyledPressable key={c} onPress={() => onSelect(c)} width={44} height={44} borderRadius={22} backgroundColor={c} />
    ))}
  </Stack>
);
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

const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Stack horizontal gap={8}>
    <>
    {children}
    </>
    </Stack>
);

const Btn: React.FC<{
  label: string;
  color: string;
  onPress: () => void;
  full?: boolean;
}> = ({ label, color, onPress, full }) => (
  <StyledPressable
    onPress={onPress}
    paddingVertical={13}
    paddingHorizontal={16}
    borderRadius={10}
    borderWidth={1}
    borderColor={color}
    backgroundColor={theme.colors.gray[900]}
    alignItems="center"
    flex={full ? undefined : 1}
  >
    <StyledText fontSize={14} fontWeight="600" letterSpacing={0.1} color={color}>{label}</StyledText>
  </StyledPressable>
);
export default ActionSheet;
