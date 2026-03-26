/**
 * PopupUsage — exhaustive demo of every feature.
 */

import React, { Fragment, useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

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
    TabBar,
    TabItem,
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
    <TouchableOpacity
        style={[u.btn, { borderColor: color }]}
        onPress={onPress}
        activeOpacity={0.7}
    >
        <Text style={[u.btnText, { color }]}>{label}</Text>
    </TouchableOpacity>
)

// ─── Demo content blocks ──────────────────────────────────────────────────────

const ListContent = ({ close }: { close: () => void }) => (
    <View>
        {['Edit profile', 'Share link', 'Download', 'Archive'].map(item => (
            <TouchableOpacity key={item} style={u.listItem} onPress={close} activeOpacity={0.7}>
                <Text style={u.listText}>{item}</Text>
            </TouchableOpacity>
        ))}
        <TouchableOpacity style={[u.listItem, u.listDestructive]} onPress={close} activeOpacity={0.7}>
            <Text style={[u.listText, { color: palettes.red[500] }]}>Delete</Text>
        </TouchableOpacity>
    </View>
)

const FormContent = ({ close }: { close: () => void }) => (
    <View style={u.formWrap}>
        <Text style={u.formLabel}>Full name</Text>
        <View style={u.fakeInput}><Text style={u.fakeInputText}>Alex Johnson</Text></View>
        <Text style={u.formLabel}>Email</Text>
        <View style={u.fakeInput}><Text style={u.fakeInputText}>alex@example.com</Text></View>
        <TouchableOpacity style={u.formSubmit} onPress={close} activeOpacity={0.75}>
            <Text style={u.formSubmitText}>Save changes</Text>
        </TouchableOpacity>
    </View>
)

const TallContent = () => (
    <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator={false}>
        {Array.from({ length: 12 }, (_, i) => (
            <View key={i} style={u.listItem}>
                <Text style={u.listText}>Scrollable item {i + 1}</Text>
            </View>
        ))}
    </ScrollView>
)

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function PopupUsage() {

    // One state key per demo
    const [open, setOpen] = useState<string | null>(null)
    const show = (key: string) => setOpen(key)
    const hide = () => setOpen(null)
    const is = (key: string) => open === key

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
                    
                >
                    <ScrollView contentContainerStyle={u.scroll} showsVerticalScrollIndicator={false}>

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

                    </ScrollView>

                    {/* ════════════════ POPUP INSTANCES ════════════════ */}

                    {/* Basic bottom */}
                    <Popup visible={is('bottom-plain')} onClose={hide}>
                        <View style={u.body}>
                            <Text style={u.bodyText}>Plain bottom sheet — no header, just content.</Text>
                        </View>
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
                        <View style={u.body}>
                            <Text style={u.bodyText}>
                                `safeAreaBottom` adds padding equal to the device's home bar inset.
                            </Text>
                        </View>
                    </Popup>

                    {/* No overlay */}
                    <Popup visible={is('bottom-nooverlay')} onClose={hide} title="No backdrop" showClose overlay={false}>
                        <View style={u.body}>
                            <Text style={u.bodyText}>The background is visible behind this popup.</Text>
                        </View>
                    </Popup>

                    {/* No close on overlay */}
                    <Popup
                        visible={is('bottom-nocloseonoverlay')}
                        onClose={hide}
                        title="Tap overlay — nothing happens"
                        showClose
                        closeOnPressOverlay={false}
                    >
                        <View style={u.body}>
                            <Text style={u.bodyText}>Only the ✕ button closes this sheet.</Text>
                        </View>
                    </Popup>

                    {/* Top */}
                    <Popup visible={is('top')} onClose={hide} position="top" title="Notification" showClose>
                        <View style={u.body}>
                            <Text style={u.bodyText}>Slides in from the top of the screen.</Text>
                        </View>
                    </Popup>

                    {/* Left */}
                    <Popup visible={is('left')} onClose={hide} position="left" title="Side menu" showClose>
                        <View style={[u.body, { minWidth: 260 }]}>
                            {['Home', 'Explore', 'Settings', 'Help'].map(item => (
                                <TouchableOpacity key={item} style={u.listItem} onPress={hide}>
                                    <Text style={u.listText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Popup>

                    {/* Right */}
                    <Popup visible={is('right')} onClose={hide} position="right" title="Filters" showClose>
                        <View style={[u.body, { minWidth: 260 }]}>
                            {['Price', 'Rating', 'Distance', 'Category'].map(item => (
                                <TouchableOpacity key={item} style={u.listItem} onPress={hide}>
                                    <Text style={u.listText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Popup>

                    {/* Center */}
                    <Popup visible={is('center')} onClose={hide} position="center" title="Confirm action" showClose round>
                        <View style={u.body}>
                            <Text style={u.bodyText}>This dialog slides in from the centre with a scale animation.</Text>
                            <TouchableOpacity style={u.formSubmit} onPress={hide} activeOpacity={0.75}>
                                <Text style={u.formSubmitText}>Got it</Text>
                            </TouchableOpacity>
                        </View>
                    </Popup>

                    {/* Animation: slide */}
                    <Popup visible={is('anim-slide')} onClose={hide} animation="slide" title="Slide" showClose>
                        <View style={u.body}><Text style={u.bodyText}>Classic slide from the edge.</Text></View>
                    </Popup>

                    {/* Animation: fade */}
                    <Popup visible={is('anim-fade')} onClose={hide} animation="fade" title="Fade" showClose>
                        <View style={u.body}><Text style={u.bodyText}>Fades in and out with opacity only.</Text></View>
                    </Popup>

                    {/* Animation: scale (center) */}
                    <Popup visible={is('anim-scale')} onClose={hide} position="center" animation="scale" title="Scale" showClose round>
                        <View style={u.body}><Text style={u.bodyText}>Scales from 0.88 → 1 like a native dialog.</Text></View>
                    </Popup>

                    {/* Animation: none */}
                    <Popup visible={is('anim-none')} onClose={hide} animation="none" title="Instant" showClose>
                        <View style={u.body}><Text style={u.bodyText}>No animation — appears and disappears instantly.</Text></View>
                    </Popup>

                    {/* Animation: spring */}
                    <Popup
                        visible={is('anim-spring')}
                        onClose={hide}
                        title="Spring physics"
                        showClose
                        spring={{ damping: 18, stiffness: 280 }}
                    >
                        <View style={u.body}><Text style={u.bodyText}>Driven by spring rather than a fixed duration curve.</Text></View>
                    </Popup>

                    {/* Round corners */}
                    <Popup visible={is('round-true')} onClose={hide} title="round=true" showClose round>
                        <View style={u.body}><Text style={u.bodyText}>Default 20 px top corners.</Text></View>
                    </Popup>
                    <Popup visible={is('round-false')} onClose={hide} title="round=false" showClose round={false}>
                        <View style={u.body}><Text style={u.bodyText}>Sharp square corners.</Text></View>
                    </Popup>
                    <Popup visible={is('round-large')} onClose={hide} title="roundRadius=36" showClose round roundRadius={36}>
                        <View style={u.body}><Text style={u.bodyText}>Larger 36 px top corner radius.</Text></View>
                    </Popup>

                    {/* Handle */}
                    <Popup visible={is('handle-yes')} onClose={hide} showHandle title="With handle" showClose>
                        <View style={u.body}><Text style={u.bodyText}>Pill handle above the header.</Text></View>
                    </Popup>
                    <Popup visible={is('handle-no')} onClose={hide} showHandle={false} title="No handle" showClose>
                        <View style={u.body}><Text style={u.bodyText}>Handle hidden — header flush to top.</Text></View>
                    </Popup>

                    {/* Lazy render */}
                    <Popup visible={is('lazy')} onClose={hide} title="Lazy render" showClose lazyRender>
                        <View style={u.body}><Text style={u.bodyText}>Children mount only after first open (default).</Text></View>
                    </Popup>
                    <Popup visible={is('destroy')} onClose={hide} title="Destroy on close" showClose destroyOnClose>
                        <View style={u.body}><Text style={u.bodyText}>Children are unmounted every time the sheet closes.</Text></View>
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
                        <View style={u.body}>
                            <Text style={{ color: palettes.blueGray[300], fontSize: 14, lineHeight: 22 }}>
                                Every colour token overridden via the `colors` prop.
                            </Text>
                        </View>
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
                        <View style={u.body}><Text style={{ color: palettes.indigo[800], fontSize: 14 }}>Indigo tinted surface.</Text></View>
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
                        <View style={u.body}><Text style={{ color: palettes.amber[800], fontSize: 14 }}>Warm amber surface.</Text></View>
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
                        <View style={u.body}><Text style={u.bodyText}>Open your console to see lifecycle events fire.</Text></View>
                    </Popup>

                </StyledCard>
            </StyledScrollView>
        </Fragment>
    )
}

// ─── Section ──────────────────────────────────────────────────────────────────

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
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
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const u = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#f9fafb' },
    scroll: { padding: 20, gap: 28, paddingBottom: 60 },

    section: { gap: 10 },
    sectionLabel: {
        fontSize: 11, fontWeight: '700', color: '#8e8e93',
        letterSpacing: 1, textTransform: 'uppercase',
    },
    sectionBody: { gap: 8 },

    btn: {
        paddingVertical: 12, paddingHorizontal: 18,
        borderRadius: 10, borderWidth: 1.5,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    btnText: { fontSize: 14, fontWeight: '600' },

    body: { padding: 20, paddingTop: 12 },
    bodyText: { fontSize: 14, color: '#374151', lineHeight: 22 },

    listItem: {
        paddingHorizontal: 20, paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#f3f4f6',
    },
    listDestructive: { marginTop: 4 },
    listText: { fontSize: 16, color: '#1f2937', fontWeight: '500' },

    formWrap: { padding: 20, gap: 6 },
    formLabel: { fontSize: 12, fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5 },
    fakeInput: { height: 44, backgroundColor: '#f9fafb', borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 14, justifyContent: 'center', marginBottom: 10 },
    fakeInputText: { fontSize: 15, color: '#1f2937' },
    formSubmit: { marginTop: 8, backgroundColor: palettes.indigo[600], borderRadius: 10, height: 48, alignItems: 'center', justifyContent: 'center' },
    formSubmitText: { color: '#fff', fontSize: 15, fontWeight: '700' },
})
