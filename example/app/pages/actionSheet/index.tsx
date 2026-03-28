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
  useActionSheet,
  useToast,
  actionSheetService,
} from "fluent-styles";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
        <View style={{ gap: 8 }}>
          <Text style={{ color: "#8e8e93", fontSize: 13, textAlign: "center" }}>
            Selected colour
          </Text>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: colour,
              alignSelf: "center",
            }}
          />
        </View>
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
          
          <Section title="Theme presets">
            <Row>
              <Btn label="Dark" color="#a1a1aa" onPress={demoDark} />
              <Btn label="Light" color="#3b82f6" onPress={demoLight} />
              <Btn label="System" color="#22c55e" onPress={demoSystem} />
            </Row>
          </Section>

          <Section title="Color overrides">
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

          <Section title="Children slot">
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

          <Section title="Imperative service">
            <Btn
              label="actionSheetService.show()"
              color="#f59e0b"
              onPress={demoImperative}
              full
            />
          </Section>
        </StyledCard>
      </StyledScrollView>
    </Fragment>
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
  <View style={cp.wrap}>
    {COLOURS.map((c) => (
      <TouchableOpacity
        key={c}
        style={[cp.swatch, { backgroundColor: c }]}
        onPress={() => onSelect(c)}
        activeOpacity={0.75}
      />
    ))}
  </View>
);
const cp = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    paddingVertical: 8,
  },
  swatch: { width: 44, height: 44, borderRadius: 22 },
});

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <Stack paddingVertical={0}>
      <>
        <StyledSeperator
          leftLabel={title}
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

const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={s.row}>{children}</View>
);

const Btn: React.FC<{
  label: string;
  color: string;
  onPress: () => void;
  full?: boolean;
}> = ({ label, color, onPress, full }) => (
  <TouchableOpacity
    style={[s.btn, { borderColor: color }, full && s.btnFull]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[s.btnText, { color }]}>{label}</Text>
  </TouchableOpacity>
);

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#09090b" },
  scroll: { padding: 20, gap: 24, paddingBottom: 60 },
  screenTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#f4f4f5",
    letterSpacing: -0.5,
  },
  screenSub: { fontSize: 14, color: "#71717a", marginTop: 4 },

  preview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#18181b",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
  },
  dot: { width: 28, height: 28, borderRadius: 14 },
  previewLabel: { fontSize: 13, color: "#a1a1aa", flex: 1 },

  section: { gap: 10 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#71717a",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  sectionBody: { gap: 8 },
  row: { flexDirection: "row", gap: 8 },

  btn: {
    flex: 1,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#18181b",
    alignItems: "center",
  },
  btnFull: { flex: 0 },
  btnText: { fontSize: 14, fontWeight: "600", letterSpacing: 0.1 },
});

export default ActionSheet;
