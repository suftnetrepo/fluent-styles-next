/**
 * PopupUsage — exhaustive demo of every feature.
 */

import React, { useState } from 'react'
import {
    Stack,
    StyledText,
    StyledPressable,
    StyledScrollView,
    theme,
    palettes,
    Popup,
} from "fluent-styles";

// ─── Trigger button ───────────────────────────────────────────────────────────

const Btn = ({
    label,
    color = palettes.indigo[500],
    onPress,
}: {
    label: string
    color?: string
    onPress: () => void
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
)

// ─── Demo content blocks ──────────────────────────────────────────────────────

const ListContent = ({ close }: { close: () => void }) => (
    <Stack>
        {['Edit profile', 'Share link', 'Download', 'Archive'].map(item => (
            <StyledPressable key={item} paddingHorizontal={20} paddingVertical={14} borderBottomWidth={0.5} borderBottomColor="#f3f4f6" onPress={close}>
                <StyledText fontSize={16} color="#1f2937" fontWeight="500">{item}</StyledText>
            </StyledPressable>
        ))}
        <StyledPressable paddingHorizontal={20} paddingVertical={14} marginTop={4} onPress={close}>
            <StyledText fontSize={16} fontWeight="500" color={palettes.red[500]}>Delete</StyledText>
        </StyledPressable>
    </Stack>
)

const FormContent = ({ close }: { close: () => void }) => (
    <Stack padding={20} gap={6}>
        <StyledText fontSize={12} fontWeight="600" color="#6b7280">Full name</StyledText>
        <Stack height={44} backgroundColor="#f9fafb" borderRadius={8} borderWidth={1} borderColor="#e5e7eb" paddingHorizontal={14} justifyContent="center" marginBottom={10}>
            <StyledText fontSize={15} color="#1f2937">Alex Johnson</StyledText>
        </Stack>
        <StyledText fontSize={12} fontWeight="600" color="#6b7280">Email</StyledText>
        <Stack height={44} backgroundColor="#f9fafb" borderRadius={8} borderWidth={1} borderColor="#e5e7eb" paddingHorizontal={14} justifyContent="center" marginBottom={10}>
            <StyledText fontSize={15} color="#1f2937">alex@example.com</StyledText>
        </Stack>
        <StyledPressable marginTop={8} backgroundColor={palettes.indigo[600]} borderRadius={10} height={48} alignItems="center" justifyContent="center" onPress={close}>
            <StyledText color="#fff" fontSize={15} fontWeight="700">Save changes</StyledText>
        </StyledPressable>
    </Stack>
)

const TallContent = () => (
    <StyledScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator={false}>
        {Array.from({ length: 12 }, (_, i) => (
            <Stack key={i} paddingHorizontal={20} paddingVertical={14} borderBottomWidth={0.5} borderBottomColor="#f3f4f6">
                <StyledText fontSize={16} color="#1f2937" fontWeight="500">Scrollable item {i + 1}</StyledText>
            </Stack>
        ))}
    </StyledScrollView>
)

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function PopupUsage() {

    // One state key per demo
    const [open, setOpen] = useState<string | null>(null)
    const show = (key: string) => setOpen(key)
    const hide = () => setOpen(null)
    const is = (key: string) => open === key

    return (
        <Stack flex={1} marginTop={16} borderRadius={16} backgroundColor={theme.colors.gray[1]}>
            <StyledScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>

                        {/* ── 1. Bottom sheet (default) ─────────────────────────────────── */}
                        <Section label="Bottom sheet (default)">
                            <Btn label="Basic — no header" onPress={() => show('bottom-plain')} />
                            <Btn label="With title + close" onPress={() => show('bottom-header')} />
                            <Btn label="With subtitle" onPress={() => show('bottom-sub')} />
                            <Btn label="Scrollable list" onPress={() => show('bottom-list')} />
                            <Btn label="Tall scrollable body" onPress={() => show('bottom-tall')} />
                            <Btn label="Form sheet" onPress={() => show('bottom-form')} />
                            <Btn label="Safe area bottom" onPress={() => show('bottom-safe')} />
                            <Btn label="No overlay" onPress={() => show('bottom-nooverlay')} />
                            <Btn label="Don't close on overlay tap" onPress={() => show('bottom-nocloseonoverlay')} />
                        </Section>

                        {/* ── 2. Positions ──────────────────────────────────────────────── */}
                        <Section label="Positions">
                            <Btn label="Top" color={palettes.violet[500]} onPress={() => show('top')} />
                            <Btn label="Left" color={palettes.violet[500]} onPress={() => show('left')} />
                            <Btn label="Right" color={palettes.violet[500]} onPress={() => show('right')} />
                            <Btn label="Center" color={palettes.violet[500]} onPress={() => show('center')} />
                        </Section>

                        {/* ── 3. Animation styles ───────────────────────────────────────── */}
                        <Section label="Animation styles">
                            <Btn label="slide (default)" color={palettes.teal[600]} onPress={() => show('anim-slide')} />
                            <Btn label="fade" color={palettes.teal[600]} onPress={() => show('anim-fade')} />
                            <Btn label="scale (center)" color={palettes.teal[600]} onPress={() => show('anim-scale')} />
                            <Btn label="none (instant)" color={palettes.teal[600]} onPress={() => show('anim-none')} />
                            <Btn label="spring physics" color={palettes.teal[600]} onPress={() => show('anim-spring')} />
                        </Section>

                        {/* ── 4. Round corners ──────────────────────────────────────────── */}
                        <Section label="Corner rounding">
                            <Btn label="round=true (default, 20)" color={palettes.amber[600]} onPress={() => show('round-true')} />
                            <Btn label="round=false (square)" color={palettes.amber[600]} onPress={() => show('round-false')} />
                            <Btn label="roundRadius=36 (large)" color={palettes.amber[600]} onPress={() => show('round-large')} />
                        </Section>

                        {/* ── 5. Handle ─────────────────────────────────────────────────── */}
                        <Section label="Handle pill">
                            <Btn label="showHandle=true (default)" color={palettes.rose[500]} onPress={() => show('handle-yes')} />
                            <Btn label="showHandle=false" color={palettes.rose[500]} onPress={() => show('handle-no')} />
                        </Section>

                        {/* ── 6. Render strategy ────────────────────────────────────────── */}
                        <Section label="Render strategy">
                            <Btn label="lazyRender (default)" color={palettes.green[600]} onPress={() => show('lazy')} />
                            <Btn label="destroyOnClose" color={palettes.green[600]} onPress={() => show('destroy')} />
                        </Section>

                        {/* ── 7. Color overrides ────────────────────────────────────────── */}
                        <Section label="Color overrides">
                            <Btn label="Dark slate" color={palettes.blueGray[700]} onPress={() => show('dark')} />
                            <Btn label="Indigo surface" color={palettes.indigo[600]} onPress={() => show('indigo')} />
                            <Btn label="Warm amber" color={palettes.amber[600]} onPress={() => show('amber')} />
                        </Section>

                        {/* ── 8. Lifecycle callbacks ────────────────────────────────────── */}
                        <Section label="Lifecycle (check console)">
                            <Btn label="onOpen / onOpened / onClose / onClosed" onPress={() => show('lifecycle')} />
                        </Section>
            </StyledScrollView>
            {/* ════════════════ POPUP INSTANCES ════════════════ */}

                    {/* Basic bottom */}
                    <Popup visible={is('bottom-plain')} onClose={hide}>
                        <Stack padding={20} paddingTop={12}>
                            <StyledText fontSize={14} color="#374151" lineHeight={22}>Plain bottom sheet — no header, just content.</StyledText>
                        </Stack>
                    </Popup>

                    {/* With header */}
                    <Popup visible={is('bottom-header')} onClose={hide} title="Post options" showClose>
                        <ListContent close={hide} />
                    </Popup>

                    {/* With subtitle */}
                    <Popup visible={is('bottom-sub')} onClose={hide} title="Share post" subtitle="Choose where to send" showClose>
                        <ListContent close={hide} />
                    </Popup>

                    {/* List */}
                    <Popup visible={is('bottom-list')} onClose={hide} title="Select action" showClose>
                        <ListContent close={hide} />
                    </Popup>

                    {/* Tall scrollable */}
                    <Popup visible={is('bottom-tall')} onClose={hide} title="Select item" showClose>
                        <TallContent />
                    </Popup>

                    {/* Form */}
                    <Popup visible={is('bottom-form')} onClose={hide} title="Edit profile" showClose>
                        <FormContent close={hide} />
                    </Popup>

                    {/* Safe area */}
                    <Popup visible={is('bottom-safe')} onClose={hide} title="Safe area" showClose safeAreaBottom>
                        <Stack padding={20} paddingTop={12}>
                            <StyledText fontSize={14} color="#374151" lineHeight={22}>
                                `safeAreaBottom` adds padding equal to the device's home bar inset.
                            </StyledText>
                        </Stack>
                    </Popup>

                    {/* No overlay */}
                    <Popup visible={is('bottom-nooverlay')} onClose={hide} title="No backdrop" showClose overlay={false}>
                        <Stack padding={20} paddingTop={12}>
                            <StyledText fontSize={14} color="#374151" lineHeight={22}>The background is visible behind this popup.</StyledText>
                        </Stack>
                    </Popup>

                    {/* No close on overlay */}
                    <Popup
                        visible={is('bottom-nocloseonoverlay')}
                        onClose={hide}
                        title="Tap overlay — nothing happens"
                        showClose
                        closeOnPressOverlay={false}
                    >
                        <Stack padding={20} paddingTop={12}>
                            <StyledText fontSize={14} color="#374151" lineHeight={22}>Only the ✕ button closes this sheet.</StyledText>
                        </Stack>
                    </Popup>

                    {/* Top */}
                    <Popup visible={is('top')} onClose={hide} position="top" title="Notification" showClose>
                        <Stack padding={20} paddingTop={12}>
                            <StyledText fontSize={14} color="#374151" lineHeight={22}>Slides in from the top of the screen.</StyledText>
                        </Stack>
                    </Popup>

                    {/* Left */}
                    <Popup visible={is('left')} onClose={hide} position="left" title="Side menu" showClose>
                        <Stack style={{ minWidth: 260 }}>
                            {['Home', 'Explore', 'Settings', 'Help'].map(item => (
                                <StyledPressable key={item} paddingHorizontal={20} paddingVertical={14} borderBottomWidth={0.5} borderBottomColor="#f3f4f6" onPress={hide}>
                                    <StyledText fontSize={16} color="#1f2937" fontWeight="500">{item}</StyledText>
                                </StyledPressable>
                            ))}
                        </Stack>
                    </Popup>

                    {/* Right */}
                    <Popup visible={is('right')} onClose={hide} position="right" title="Filters" showClose>
                        <Stack style={{ minWidth: 260 }}>
                            {['Price', 'Rating', 'Distance', 'Category'].map(item => (
                                <StyledPressable key={item} paddingHorizontal={20} paddingVertical={14} borderBottomWidth={0.5} borderBottomColor="#f3f4f6" onPress={hide}>
                                    <StyledText fontSize={16} color="#1f2937" fontWeight="500">{item}</StyledText>
                                </StyledPressable>
                            ))}
                        </Stack>
                    </Popup>

                    {/* Center */}
                    <Popup visible={is('center')} onClose={hide} position="center" title="Confirm action" showClose round>
                        <Stack padding={20} paddingTop={12}>
                            <StyledText fontSize={14} color="#374151" lineHeight={22}>This dialog slides in from the centre with a scale animation.</StyledText>
                            <StyledPressable marginTop={8} backgroundColor={palettes.indigo[600]} borderRadius={10} height={48} alignItems="center" justifyContent="center" onPress={hide}>
                                <StyledText color="#fff" fontSize={15} fontWeight="700">Got it</StyledText>
                            </StyledPressable>
                        </Stack>
                    </Popup>

                    {/* Animation: slide */}
                    <Popup visible={is('anim-slide')} onClose={hide} animation="slide" title="Slide" showClose>
                        <Stack padding={20} paddingTop={12}><StyledText fontSize={14} color="#374151" lineHeight={22}>Classic slide from the edge.</StyledText></Stack>
                    </Popup>

                    {/* Animation: fade */}
                    <Popup visible={is('anim-fade')} onClose={hide} animation="fade" title="Fade" showClose>
                        <Stack padding={20} paddingTop={12}><StyledText fontSize={14} color="#374151" lineHeight={22}>Fades in and out with opacity only.</StyledText></Stack>
                    </Popup>

                    {/* Animation: scale (center) */}
                    <Popup visible={is('anim-scale')} onClose={hide} position="center" animation="scale" title="Scale" showClose round>
                        <Stack padding={20} paddingTop={12}><StyledText fontSize={14} color="#374151" lineHeight={22}>Scales from 0.88 → 1 like a native dialog.</StyledText></Stack>
                    </Popup>

                    {/* Animation: none */}
                    <Popup visible={is('anim-none')} onClose={hide} animation="none" title="Instant" showClose>
                        <Stack padding={20} paddingTop={12}><StyledText fontSize={14} color="#374151" lineHeight={22}>No animation — appears and disappears instantly.</StyledText></Stack>
                    </Popup>

                    {/* Animation: spring */}
                    <Popup
                        visible={is('anim-spring')}
                        onClose={hide}
                        title="Spring physics"
                        showClose
                        spring={{ damping: 18, stiffness: 280 }}
                    >
                        <Stack padding={20} paddingTop={12}><StyledText fontSize={14} color="#374151" lineHeight={22}>Driven by spring rather than a fixed duration curve.</StyledText></Stack>
                    </Popup>

                    {/* Round corners */}
                    <Popup visible={is('round-true')} onClose={hide} title="round=true" showClose round>
                        <Stack padding={20} paddingTop={12}><StyledText fontSize={14} color="#374151" lineHeight={22}>Default 20 px top corners.</StyledText></Stack>
                    </Popup>
                    <Popup visible={is('round-false')} onClose={hide} title="round=false" showClose round={false}>
                        <Stack padding={20} paddingTop={12}><StyledText fontSize={14} color="#374151" lineHeight={22}>Sharp square corners.</StyledText></Stack>
                    </Popup>
                    <Popup visible={is('round-large')} onClose={hide} title="roundRadius=36" showClose round roundRadius={36}>
                        <Stack padding={20} paddingTop={12}><StyledText fontSize={14} color="#374151" lineHeight={22}>Larger 36 px top corner radius.</StyledText></Stack>
                    </Popup>

                    {/* Handle */}
                    <Popup visible={is('handle-yes')} onClose={hide} showHandle title="With handle" showClose>
                        <Stack padding={20} paddingTop={12}><StyledText fontSize={14} color="#374151" lineHeight={22}>Pill handle above the header.</StyledText></Stack>
                    </Popup>
                    <Popup visible={is('handle-no')} onClose={hide} showHandle={false} title="No handle" showClose>
                        <Stack padding={20} paddingTop={12}><StyledText fontSize={14} color="#374151" lineHeight={22}>Handle hidden — header flush to top.</StyledText></Stack>
                    </Popup>

                    {/* Lazy render */}
                    <Popup visible={is('lazy')} onClose={hide} title="Lazy render" showClose lazyRender>
                        <Stack padding={20} paddingTop={12}><StyledText fontSize={14} color="#374151" lineHeight={22}>Children mount only after first open (default).</StyledText></Stack>
                    </Popup>
                    <Popup visible={is('destroy')} onClose={hide} title="Destroy on close" showClose destroyOnClose>
                        <Stack padding={20} paddingTop={12}><StyledText fontSize={14} color="#374151" lineHeight={22}>Children are unmounted every time the sheet closes.</StyledText></Stack>
                    </Popup>

                    {/* Dark */}
                    <Popup
                        visible={is('dark')}
                        onClose={hide}
                        title="Dark slate theme"
                        subtitle="Color override demo"
                        showClose
                        colors={{
                            background: palettes.blueGray[900],
                            overlay: 'rgba(0,0,0,0.75)',
                            handle: palettes.blueGray[600],
                            headerTitle: palettes.blueGray[100],
                            headerSubtitle: palettes.blueGray[400],
                            headerBorder: palettes.blueGray[700],
                            closeIcon: palettes.blueGray[300],
                            closeIconBg: palettes.blueGray[700],
                        }}
                    >
                        <Stack padding={20} paddingTop={12}>
                            <StyledText fontSize={14} color={palettes.blueGray[300]} lineHeight={22}>
                                Every colour token overridden via the `colors` prop.
                            </StyledText>
                        </Stack>
                    </Popup>

                    {/* Indigo */}
                    <Popup
                        visible={is('indigo')}
                        onClose={hide}
                        title="Indigo surface"
                        showClose
                        colors={{
                            background: palettes.indigo[50],
                            headerTitle: palettes.indigo[900],
                            headerBorder: palettes.indigo[200],
                            handle: palettes.indigo[300],
                            closeIcon: palettes.indigo[600],
                            closeIconBg: palettes.indigo[100],
                        }}
                    >
                        <Stack padding={20} paddingTop={12}><StyledText fontSize={14} color={palettes.indigo[800]}>Indigo tinted surface.</StyledText></Stack>
                    </Popup>

                    {/* Amber */}
                    <Popup
                        visible={is('amber')}
                        onClose={hide}
                        title="Warm amber theme"
                        showClose
                        colors={{
                            background: palettes.amber[50],
                            headerTitle: palettes.amber[900],
                            headerBorder: palettes.amber[200],
                            handle: palettes.amber[400],
                            closeIcon: palettes.amber[700],
                            closeIconBg: palettes.amber[100],
                        }}
                    >
                        <Stack padding={20} paddingTop={12}><StyledText fontSize={14} color={palettes.amber[800]}>Warm amber surface.</StyledText></Stack>
                    </Popup>

                    {/* Lifecycle */}
                    <Popup
                        visible={is('lifecycle')}
                        onClose={hide}
                        title="Lifecycle events"
                        showClose
                        onOpen={() => console.log('[Popup] onOpen')}
                        onOpened={() => console.log('[Popup] onOpened — animation done')}
                        onClosed={() => console.log('[Popup] onClosed — animation done')}
                    >
                        <Stack padding={20} paddingTop={12}><StyledText fontSize={14} color="#374151" lineHeight={22}>Open your console to see lifecycle events fire.</StyledText></Stack>
                    </Popup>

        </Stack>
    )
}

// ─── Section ──────────────────────────────────────────────────────────────────

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
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
)
