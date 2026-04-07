/**
 * DrawerUsage — exhaustive demo of every Drawer feature.
 */

import React, { useState } from "react";
import {
    Stack,
    StyledText,
    StyledPressable,
    StyledScrollView,
    theme,
    palettes,
    Drawer,
    DrawerNavItem,
} from "fluent-styles";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const Btn = ({
    label,
    color = palettes.indigo[500],
    onPress,
}: {
    label: string;
    color?: string;
    onPress: () => void;
}) => (
    <StyledPressable
        onPress={onPress}
        paddingVertical={12}
        paddingHorizontal={18}
        borderRadius={10}
        borderWidth={1.5}
        borderColor={color}
        backgroundColor="#fff"
        alignItems="center"
    >
        <StyledText fontSize={14} fontWeight="600" color={color}>{label}</StyledText>
    </StyledPressable>
);

const E = ({ e }: { e: string }) => <StyledText fontSize={18}>{e}</StyledText>;

// ─── Nav datasets ─────────────────────────────────────────────────────────────

const MAIN_NAV: DrawerNavItem[] = [
    {
        key: "home",
        label: "Home",
        icon: <E e="🏠" />,
        active: true,
        section: "Main",
    },
    { key: "explore", label: "Explore", icon: <E e="🔍" />, section: "Main" },
    {
        key: "activity",
        label: "Activity",
        icon: <E e="⚡" />,
        badge: 5,
        section: "Main",
    },
    { key: "bookmarks", label: "Bookmarks", icon: <E e="🔖" />, section: "Main" },
    {
        key: "settings",
        label: "Settings",
        icon: <E e="⚙️" />,
        section: "Account",
    },
    { key: "help", label: "Help", icon: <E e="❓" />, section: "Account" },
    { key: "pro", label: "Upgrade", icon: <E e="⭐" />, section: "Account" },
    {
        key: "locked",
        label: "Restricted",
        icon: <E e="🔒" />,
        disabled: true,
        section: "Account",
    },
];

const SIMPLE_NAV: DrawerNavItem[] = [
    { key: "dashboard", label: "Dashboard", icon: <E e="📊" />, active: true },
    { key: "reports", label: "Reports", icon: <E e="📈" />, badge: 3 },
    { key: "users", label: "Users", icon: <E e="👥" /> },
    { key: "billing", label: "Billing", icon: <E e="💳" /> },
    { key: "logout", label: "Log out", icon: <E e="🚪" /> },
];

// ─── Footer examples ──────────────────────────────────────────────────────────

const ProfileFooter = ({ close }: { close: () => void }) => (
    <StyledPressable flexDirection="row" alignItems="center" gap={12} paddingVertical={14} onPress={close}>
        <Stack width={44} height={44} borderRadius={22} backgroundColor="#f3f4f6" alignItems="center" justifyContent="center">
            <StyledText fontSize={18}>👤</StyledText>
        </Stack>
        <Stack flex={1}>
            <StyledText fontSize={15} fontWeight="700" color="#1f2937">Alex Johnson</StyledText>
            <StyledText fontSize={12} color="#6b7280">alex@example.com</StyledText>
        </Stack>
        <StyledText color={palettes.gray[400]} fontSize={18}>›</StyledText>
    </StyledPressable>
);

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function DrawerUsage() {
    const [open, setOpen] = useState<string | null>(null);
    const show = (k: string) => setOpen(k);
    const hide = () => setOpen(null);
    const is = (k: string) => open === k;

    return (
        <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
            <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
                        {/* ── 1. Sides ──────────────────────────────────────────────────── */}
                        <Section label="Side">
                            <Btn
                                label="← Left drawer (default)"
                                onPress={() => show("left")}
                            />
                            <Btn
                                label="Right drawer →"
                                color={palettes.violet[500]}
                                onPress={() => show("right")}
                            />
                        </Section>

                        {/* ── 2. With nav list ──────────────────────────────────────────── */}
                        <Section label="Nav list — sections + badges + disabled">
                            <Btn label="Left — full nav" onPress={() => show("nav-left")} />
                            <Btn
                                label="Right — simple nav"
                                color={palettes.violet[500]}
                                onPress={() => show("nav-right")}
                            />
                        </Section>

                        {/* ── 3. Footer slot ────────────────────────────────────────────── */}
                        <Section label="Footer slot (profile row)">
                            <Btn
                                label="Nav + pinned profile footer"
                                onPress={() => show("footer")}
                            />
                        </Section>

                        {/* ── 4. Header variants ────────────────────────────────────────── */}
                        <Section label="Header variants">
                            <Btn
                                label="Title only"
                                color={palettes.teal[600]}
                                onPress={() => show("h-title")}
                            />
                            <Btn
                                label="Title + subtitle"
                                color={palettes.teal[600]}
                                onPress={() => show("h-sub")}
                            />
                            <Btn
                                label="Title + header right"
                                color={palettes.teal[600]}
                                onPress={() => show("h-right")}
                            />
                            <Btn
                                label="No header"
                                color={palettes.teal[600]}
                                onPress={() => show("h-none")}
                            />
                        </Section>

                        {/* ── 5. Width ──────────────────────────────────────────────────── */}
                        <Section label="Width">
                            <Btn
                                label="60% width"
                                color={palettes.amber[600]}
                                onPress={() => show("w-60")}
                            />
                            <Btn
                                label="78% width (default)"
                                color={palettes.amber[600]}
                                onPress={() => show("w-78")}
                            />
                            <Btn
                                label="320 px fixed"
                                color={palettes.amber[600]}
                                onPress={() => show("w-320")}
                            />
                        </Section>

                        {/* ── 6. Swipe to close ─────────────────────────────────────────── */}
                        <Section label="Swipe to close">
                            <Btn
                                label="Swipe enabled (default)"
                                color={palettes.green[600]}
                                onPress={() => show("swipe-on")}
                            />
                            <Btn
                                label="Swipe disabled"
                                color={palettes.green[600]}
                                onPress={() => show("swipe-off")}
                            />
                        </Section>

                        {/* ── 7. Animation ──────────────────────────────────────────────── */}
                        <Section label="Animation speed + spring">
                            <Btn
                                label="Fast (150 ms)"
                                color={palettes.rose[500]}
                                onPress={() => show("fast")}
                            />
                            <Btn
                                label="Slow (600 ms)"
                                color={palettes.rose[500]}
                                onPress={() => show("slow")}
                            />
                            <Btn
                                label="Spring physics"
                                color={palettes.rose[500]}
                                onPress={() => show("spring")}
                            />
                        </Section>

                        {/* ── 8. No overlay ─────────────────────────────────────────────── */}
                        <Section label="Overlay control">
                            <Btn
                                label="No overlay"
                                color={palettes.coolGray[500]}
                                onPress={() => show("no-overlay")}
                            />
                            <Btn
                                label="Don't close on overlay tap"
                                color={palettes.coolGray[500]}
                                onPress={() => show("no-close-overlay")}
                            />
                        </Section>

                        {/* ── 9. Color themes ───────────────────────────────────────────── */}
                        <Section label="Color overrides">
                            <Btn
                                label="Dark slate"
                                color={palettes.blueGray[600]}
                                onPress={() => show("dark")}
                            />
                            <Btn
                                label="Indigo"
                                color={palettes.indigo[600]}
                                onPress={() => show("indigo")}
                            />
                            <Btn
                                label="Warm amber"
                                color={palettes.amber[600]}
                                onPress={() => show("amber")}
                            />
                            <Btn
                                label="Green forest"
                                color={palettes.emerald[600]}
                                onPress={() => show("forest")}
                            />
                        </Section>

                        {/* ── 10. Render strategy ───────────────────────────────────────── */}
                        <Section label="Render strategy">
                            <Btn
                                label="destroyOnClose — unmounts on every close"
                                color={palettes.gray[500]}
                                onPress={() => show("destroy")}
                            />
                        </Section>

                        {/* ── 11. Lifecycle ─────────────────────────────────────────────── */}
                        <Section label="Lifecycle (check console)">
                            <Btn
                                label="onOpen / onOpened / onClose / onClosed"
                                onPress={() => show("lifecycle")}
                            />
                        </Section>
            </StyledScrollView>
            {/* ════════════════════ DRAWER INSTANCES ════════════════════ */}

                    {/* Basic left */}
                    <Drawer visible={is("left")} onClose={hide} title="Menu" side="left">
                        <BodyText text="This is a basic left-side drawer with a title and back button." />
                    </Drawer>

                    {/* Basic right */}
                    <Drawer
                        visible={is("right")}
                        onClose={hide}
                        title="Filters"
                        side="right"
                    >
                        <BodyText text="This is a right-side drawer. The chevron points right." />
                    </Drawer>

                    {/* Nav left */}
                    <Drawer
                        visible={is("nav-left")}
                        onClose={hide}
                        title="Navigation"
                        side="left"
                        navItems={MAIN_NAV}
                        footer={<ProfileFooter close={hide} />}
                    />

                    {/* Nav right */}
                    <Drawer
                        visible={is("nav-right")}
                        onClose={hide}
                        title="Admin"
                        side="right"
                        navItems={SIMPLE_NAV}
                    />

                    {/* Footer */}
                    <Drawer
                        visible={is("footer")}
                        onClose={hide}
                        title="Account"
                        navItems={MAIN_NAV.slice(4)}
                        footer={<ProfileFooter close={hide} />}
                    />

                    {/* Headers */}
                    <Drawer visible={is("h-title")} onClose={hide} title="Title only">
                        <BodyText text="Just a title in the header." />
                    </Drawer>

                    <Drawer
                        visible={is("h-sub")}
                        onClose={hide}
                        title="Profile"
                        subtitle="Manage your account"
                    >
                        <BodyText text="Title + subtitle header variant." />
                    </Drawer>

                    <Drawer
                        visible={is("h-right")}
                        onClose={hide}
                        title="Notifications"
                        
                        headerRight={
                            <StyledPressable onPress={hide}>
                                <StyledText fontSize={12} color={palettes.indigo[500]} fontWeight="700">
                                    Clear all
                                </StyledText>
                            </StyledPressable>
                        }
                    >
                        <BodyText text="Custom node in the header right slot." />
                    </Drawer>

                    <Drawer visible={is("h-none")} onClose={hide} showBack={false}>
                        <Stack padding={20}>
                            <StyledText fontSize={18} fontWeight="700" marginBottom={8}>
                                No header
                            </StyledText>
                            <BodyText text="No header at all — close via swipe or overlay tap." />
                        </Stack>
                    </Drawer>

                    {/* Width */}
                    <Drawer
                        visible={is("w-60")}
                        onClose={hide}
                        title="60% wide"
                        width="80%"
                    >
                        <BodyText text="Width is 60% of screen width." />
                    </Drawer>
                    <Drawer
                        visible={is("w-78")}
                        onClose={hide}
                        title="78% wide (default)"
                        width="78%"
                    >
                        <BodyText text="Default drawer width." />
                    </Drawer>
                    <Drawer
                        visible={is("w-320")}
                        onClose={hide}
                        title="320 px fixed"
                        width={320}
                    >
                        <BodyText text="Fixed pixel width — good for tablets." />
                    </Drawer>

                    {/* Swipe */}
                    <Drawer
                        visible={is("swipe-on")}
                        onClose={hide}
                        title="Swipe to close"
                        swipeToClose
                    >
                        <BodyText text="Swipe left to dismiss. Watch the overlay fade as you drag." />
                    </Drawer>
                    <Drawer
                        visible={is("swipe-off")}
                        onClose={hide}
                        title="No swipe"
                        swipeToClose={false}
                    >
                        <BodyText text="Swipe gesture disabled. Use the back button or tap overlay." />
                    </Drawer>

                    {/* Animation */}
                    <Drawer
                        visible={is("fast")}
                        onClose={hide}
                        title="Fast (150 ms)"
                        duration={150}
                    >
                        <BodyText text="Very snappy open/close." />
                    </Drawer>
                    <Drawer
                        visible={is("slow")}
                        onClose={hide}
                        title="Slow (600 ms)"
                        duration={600}
                    >
                        <BodyText text="Slowed down so you can see the slide." />
                    </Drawer>
                    <Drawer
                        visible={is("spring")}
                        onClose={hide}
                        title="Spring"
                        spring={{ damping: 20, stiffness: 260 }}
                    >
                        <BodyText text="Physics-driven spring — bouncy open, snappy close." />
                    </Drawer>

                    {/* Overlay control */}
                    <Drawer
                        visible={is("no-overlay")}
                        onClose={hide}
                        title="No backdrop"
                        overlay={false}
                    >
                        <BodyText text="Background visible behind the drawer." />
                    </Drawer>
                    <Drawer
                        visible={is("no-close-overlay")}
                        onClose={hide}
                        title="Tap overlay — nothing"
                        closeOnPressOverlay={false}
                    >
                        <BodyText text="Only the back button closes this drawer." />
                    </Drawer>

                    {/* Dark slate */}
                    <Drawer
                        visible={is("dark")}
                        onClose={hide}
                        title="Dark slate"
                        subtitle="Color override"
                        navItems={SIMPLE_NAV}
                        colors={{
                            background: palettes.blueGray[900],
                            overlay: "rgba(0,0,0,0.75)",
                            headerBg: palettes.blueGray[900],
                            headerTitle: palettes.blueGray[100],
                            headerSubtitle: palettes.blueGray[400],
                            headerBorder: palettes.blueGray[700],
                            backIcon: palettes.blueGray[400],
                            footerBg: palettes.blueGray[900],
                            footerBorder: palettes.blueGray[700],
                            edgeHandle: palettes.blueGray[600],
                            navActiveItemBg: palettes.indigo[900],
                            navActiveText: palettes.indigo[300],
                            navText: palettes.blueGray[200],
                            navSectionLabel: palettes.blueGray[500],
                            separator: palettes.blueGray[800],
                        }}
                        footer={<ProfileFooter close={hide} />}
                    />

                    {/* Indigo */}
                    <Drawer
                        visible={is("indigo")}
                        onClose={hide}
                        title="Indigo"
                        navItems={SIMPLE_NAV}
                        colors={{
                            background: palettes.indigo[50],
                            headerBg: palettes.indigo[50],
                            headerTitle: palettes.indigo[900],
                            headerSubtitle: palettes.indigo[500],
                            headerBorder: palettes.indigo[200],
                            backIcon: palettes.indigo[400],
                            edgeHandle: palettes.indigo[300],
                            navActiveItemBg: palettes.indigo[100],
                            navActiveText: palettes.indigo[700],
                            navText: palettes.indigo[800],
                            navSectionLabel: palettes.indigo[400],
                            separator: palettes.indigo[100],
                            footerBg: palettes.indigo[50],
                            footerBorder: palettes.indigo[200],
                        }}
                    />

                    {/* Amber */}
                    <Drawer
                        visible={is("amber")}
                        onClose={hide}
                        title="Warm amber"
                        navItems={SIMPLE_NAV}
                        colors={{
                            background: palettes.amber[50],
                            headerBg: palettes.amber[50],
                            headerTitle: palettes.amber[900],
                            headerSubtitle: palettes.amber[600],
                            headerBorder: palettes.amber[200],
                            backIcon: palettes.amber[600],
                            edgeHandle: palettes.amber[400],
                            navActiveItemBg: palettes.amber[100],
                            navActiveText: palettes.amber[800],
                            navText: palettes.amber[900],
                            navSectionLabel: palettes.amber[500],
                            separator: palettes.amber[200],
                            footerBg: palettes.amber[50],
                            footerBorder: palettes.amber[200],
                        }}
                    />

                    {/* Forest */}
                    <Drawer
                        visible={is("forest")}
                        onClose={hide}
                        title="Green forest"
                        navItems={SIMPLE_NAV}
                        colors={{
                            background: palettes.emerald[900],
                            overlay: "rgba(0,0,0,0.6)",
                            headerBg: palettes.emerald[900],
                            headerTitle: palettes.emerald[50],
                            headerSubtitle: palettes.emerald[300],
                            headerBorder: palettes.emerald[700],
                            backIcon: palettes.emerald[300],
                            edgeHandle: palettes.emerald[600],
                            navActiveItemBg: palettes.emerald[800],
                            navActiveText: palettes.emerald[300],
                            navText: palettes.emerald[100],
                            navSectionLabel: palettes.emerald[500],
                            separator: palettes.emerald[800],
                            footerBg: palettes.emerald[900],
                            footerBorder: palettes.emerald[700],
                        }}
                    />

                    {/* destroyOnClose */}
                    <Drawer
                        visible={is("destroy")}
                        onClose={hide}
                        title="Destroy on close"
                        destroyOnClose
                    >
                        <BodyText text="Children unmount every time this drawer closes." />
                    </Drawer>

                    {/* Lifecycle */}
                    <Drawer
                        visible={is("lifecycle")}
                        onClose={hide}
                        title="Lifecycle"
                        onOpen={() => console.log("[Drawer] onOpen")}
                        onOpened={() => console.log("[Drawer] onOpened")}
                        onClosed={() => console.log("[Drawer] onClosed")}
                    >
                        <BodyText text="Check console for lifecycle events." />
                    </Drawer>
        </Stack>
    );
}

// ─── Mini components ──────────────────────────────────────────────────────────

const BodyText = ({ text }: { text: string }) => (
    <Stack padding={20}>
        <StyledText fontSize={14} color="#4b5563" lineHeight={22}>{text}</StyledText>
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
        <Stack gap={8}>
            <>
              {children}
            </>
          </Stack>
    </Stack>
);
