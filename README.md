# Fluent Styles

A comprehensive, TypeScript-first React Native UI library providing production-ready components, hooks, and an imperative service layer — all powered by a portal-based rendering system.

[![npm version](https://img.shields.io/npm/v/fluent-styles)](https://www.npmjs.com/package/fluent-styles)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Portal System](#portal-system)
- [Components](#components)
  - [StyledButton](#styledbutton)
  - [StyledTextInput](#styledtextinput)
  - [Switch](#switch)
  - [StyledCheckBox](#styledcheckbox)
  - [StyledCard](#styledcard)
  - [StyledBadge / BadgeWithIcon](#styledbadge--badgewithicon)
  - [StyledImage / StyledImageBackground](#styledimage--styledimagebackground)
  - [StyledHeader / FullHeader](#styledheader--fullheader)
  - [StyledDropdown / StyledMultiSelectDropdown](#styleddropdown--styledmultiselectdropdown)
  - [Popup](#popup)
  - [Drawer](#drawer)
  - [Collapse / CollapseGroup](#collapse--collapsegroup)
  - [TabBar](#tabbar)
  - [StyledDivider](#styleddivider)
  - [StyledSeperator](#styledseperator)
  - [Stack](#stack)
  - [StyledText](#styledtext)
  - [StyledPressable](#styledpressable)
  - [StyledPage / StyledScrollView](#styledpage--styledscrollview)
  - [StyledSafeAreaView](#styledsafeareaview)
  - [Spacer](#spacer)
  - [StyledShape](#styledshape)
  - [Loader](#loader)
- [Hooks](#hooks)
  - [useToast](#usetoast)
  - [useNotification](#usenotification)
  - [useDialogue](#usedialogue)
  - [useActionSheet](#useactionsheet)
  - [useLoader](#useloader)
- [Imperative Services](#imperative-services)
  - [toastService](#toastservice)
  - [notificationService](#notificationservice)
  - [dialogueService](#dialogueservice)
  - [actionSheetService](#actionsheetservice)
  - [loaderService](#loaderservice)
- [Theme & Tokens](#theme--tokens)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

```bash
npm install fluent-styles
# or
yarn add fluent-styles
```

Peer dependencies (install separately if not already present):

```bash
npm install react-native-safe-area-context
```

---

## Quick Start

Wrap your root component with `GlobalPortalProvider`. This single wrapper enables **all** portal-based UI — toasts, notifications, loaders, dialogues, drawers, and action sheets.

```tsx
import { GlobalPortalProvider } from 'fluent-styles'

export default function App() {
  return (
    <GlobalPortalProvider>
      <YourNavigator />
    </GlobalPortalProvider>
  )
}
```

If you also use the declarative hooks (`useToast`, `useDialogue`, etc.) inside descendant components, nest a `PortalManager` as well:

```tsx
import { GlobalPortalProvider, PortalManager } from 'fluent-styles'

export default function App() {
  return (
    <GlobalPortalProvider>
      <PortalManager>
        <YourNavigator />
      </PortalManager>
    </GlobalPortalProvider>
  )
}
```

---

## Portal System

Fluent Styles uses a dual-layer portal architecture:

| Layer | Provider | Use case |
|---|---|---|
| **Global singleton** | `GlobalPortalProvider` | Imperative services (`toastService`, `loaderService`, etc.) — usable outside React |
| **Declarative hooks** | `PortalManager` | Hook APIs (`useToast`, `useDialogue`, etc.) — usable inside React components |

The low-level `portal` singleton is also exported for advanced use:

```ts
import { portal } from 'fluent-styles'

const id = portal.show(<MyWidget />, { position: 'top', backdrop: false })
setTimeout(() => portal.hide(id), 3000)
```

---

## Components

### StyledButton

A fully themed button with variant, shape, size, and icon support.

```tsx
import { StyledButton, theme } from 'fluent-styles'

// Variants (compact style)
<StyledButton primary compact>
  <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.small} fontWeight={theme.fontWeight.semiBold}>
    Primary
  </StyledButton.Text>
</StyledButton>
<StyledButton secondary compact>Secondary</StyledButton>
<StyledButton outline compact>Outline</StyledButton>
<StyledButton ghost compact>Ghost</StyledButton>
<StyledButton link compact>Link</StyledButton>
<StyledButton danger compact>Danger</StyledButton>
<StyledButton success compact>Success</StyledButton>
<StyledButton warning compact>Warning</StyledButton>
<StyledButton disabled compact>Disabled</StyledButton>

// Sizes: xs | sm | md | lg | xl
{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
  <StyledButton key={s} primary compact {...{ [s]: true }}>
    <StyledButton.Text color={theme.colors.white}>{s.toUpperCase()}</StyledButton.Text>
  </StyledButton>
))}

// Shapes
<StyledButton primary compact pill>Pill</StyledButton>
<StyledButton primary compact rounded>Rounded</StyledButton>
<StyledButton backgroundColor={theme.colors.yellow[500]} borderWidth={0} square>Square</StyledButton>

// Icons — left, right, or both
<StyledButton primary compact leftIcon={<Icon emoji="🚀" />}>Deploy</StyledButton>
<StyledButton outline compact rightIcon={<Icon emoji="→" />}>Continue</StyledButton>
<StyledButton secondary compact leftIcon={<Icon emoji="⬇" />} rightIcon={<Icon emoji="📦" />}>
  Download package
</StyledButton>

// Icon-only circular buttons
<StyledButton icon backgroundColor={theme.colors.indigo[500]}><Icon emoji="✉️" size={18} /></StyledButton>
<StyledButton icon backgroundColor={theme.colors.amber[400]}><Icon emoji="🔔" size={18} /></StyledButton>
<StyledButton icon backgroundColor={theme.colors.red[500]}><Icon emoji="🗑️" size={18} /></StyledButton>

// Loading state (async example)
const [loading, setLoading] = useState(false)
<StyledButton primary compact loading={loading} onPress={() => { setLoading(true); setTimeout(() => setLoading(false), 2000) }}>
  <StyledButton.Text color={theme.colors.white}>{loading ? 'Saving…' : 'Save changes'}</StyledButton.Text>
</StyledButton>

// Full-width block
<StyledButton primary block>
  <StyledButton.Text color={theme.colors.white} fontSize={theme.fontSize.medium} fontWeight={theme.fontWeight.bold}>
    Create account
  </StyledButton.Text>
</StyledButton>
<StyledButton outline block>
  <StyledButton.Text color={theme.colors.gray[800]} fontSize={theme.fontSize.medium}>Sign in instead</StyledButton.Text>
</StyledButton>

// Disabled
<StyledButton primary disabled>Disabled</StyledButton>
```

Accepts all `TouchableOpacityProps` and flat `ViewStyle` props.

---

### StyledTextInput

A rich text input with label, validation, addons, and an imperative ref handle.

```tsx
import { StyledTextInput } from 'fluent-styles'

// Variants: outline | filled | underline | ghost
<StyledTextInput variant="outline" label="Email" placeholder="you@example.com" />

// Sizes: sm | md | lg
<StyledTextInput size="md" label="Medium" />

// Floating label (Material Design style)
<StyledTextInput floatLabel label="Floating Label" />

// Validation
<StyledTextInput
  label="Username"
  required
  helperText="Must be unique"
  errorMessage="Already taken"
  error
/>

// Character counter
<StyledTextInput label="Bio" showCounter maxLength={200} multiline />

// Icons & addons
<StyledTextInput leftIcon={<SearchIcon />} placeholder="Search…" />
<StyledTextInput
  leftAddon={{ text: 'https://', bg: '#f4f4f5' }}
  rightAddon={{ text: '.com', bg: '#f4f4f5' }}
  placeholder="yoursite"
/>

// States
<StyledTextInput clearable value={value} onChangeText={setValue} />
<StyledTextInput loading />

// Imperative handle
const inputRef = useRef<StyledTextInputHandle>(null)
<StyledTextInput ref={inputRef} label="Password" secureTextEntry />
inputRef.current?.focus()
inputRef.current?.clear()
inputRef.current?.isFocused()
```

**Key props:**

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Input label |
| `floatLabel` | `boolean` | Animated floating label |
| `required` | `boolean` | Appends `*` to label |
| `helperText` | `string` | Hint text below input |
| `errorMessage` | `string` | Error text (visible when `error` is true) |
| `error` | `boolean` | Activates error state |
| `showCounter` | `boolean` | Character counter (requires `maxLength`) |
| `variant` | `outline \| filled \| underline \| ghost` | Visual style |
| `size` | `sm \| md \| lg` | Input size |
| `leftIcon / rightIcon` | `ReactNode` | Icon slots |
| `leftAddon / rightAddon` | `{ text?, node?, bg?, color?, onPress? }` | Prefix/suffix addons |
| `clearable` | `boolean` | Clear button when value is present |
| `loading` | `boolean` | Right-side activity spinner |
| `focusColor` | `string` | Border colour on focus |

---

### Switch

A generic animated toggle with async confirmation guard and customisable labels.

```tsx
import { Switch } from 'fluent-styles'

// Uncontrolled boolean
<Switch defaultValue={false} onChange={(val) => console.log(val)} />

// Controlled
<Switch value={isOn} onChange={setIsOn} />

// Non-boolean (generic types)
<Switch<'yes', 'no'>
  activeValue="yes"
  inactiveValue="no"
  defaultValue="no"
  onChange={(val) => console.log(val)}
/>

// Sizes: sm | md | lg
<Switch size="lg" defaultValue />

// Async guard — return false to cancel toggle
<Switch
  beforeChange={async (next) => {
    const ok = await confirmDialog()
    return ok
  }}
/>

// Inline labels & colours
<Switch activeLabel="ON" inactiveLabel="OFF" />
<Switch activeColor="#10b981" inactiveColor="#d4d4d8" />

// Fine-grained color token overrides
<Switch
  defaultValue
  colors={{
    activeTrack: palettes.rose[500],
    inactiveTrack: palettes.rose[100],
    inactiveBorder: palettes.rose[200],
    activeLabelText: '#fff',
  }}
/>
<Switch defaultValue activeColor={palettes.amber[400]} inactiveColor={palettes.amber[100]} />

// Teal with labels
<Switch
  size="lg"
  defaultValue
  activeLabel="ON"
  inactiveLabel="OFF"
  colors={{
    activeTrack: palettes.teal[500],
    inactiveTrack: palettes.teal[100],
    activeLabelText: '#fff',
    inactiveLabelText: palettes.teal[400],
  }}
/>

// On a dark background (slate palette)
<Switch
  defaultValue
  colors={{
    activeTrack: palettes.indigo[400],
    inactiveTrack: palettes.blueGray[700],
    inactiveBorder: palettes.blueGray[600],
    thumb: '#ffffff',
  }}
/>

// Always-rejected guard (demonstrates async guard returning false)
<Switch defaultValue={false} beforeChange={() => Promise.resolve(false)} />

// States
<Switch loading />
<Switch disabled />
```

**Key props:**

| Prop | Type | Description |
|---|---|---|
| `value` | `T` | Controlled value |
| `defaultValue` | `T` | Uncontrolled initial value |
| `activeValue / inactiveValue` | `T` | Values for on/off (default `true`/`false`) |
| `onChange` | `(val: T) => void` | Change callback |
| `beforeChange` | `(next: T) => boolean \| Promise<boolean>` | Async guard |
| `size` | `sm \| md \| lg` | Track size preset |
| `activeLabel / inactiveLabel` | `string \| ReactNode` | Label inside track |
| `activeColor / inactiveColor` | `string` | Track colour overrides |
| `loading` | `boolean` | Replaces thumb with a spinner |
| `disabled` | `boolean` | Disables interaction |
| `colors` | `Partial<SwitchColors>` | Fine-grained token overrides |

---

### StyledCheckBox

An accessible checkbox with customisable size and colour.

```tsx
import { StyledCheckBox, StyledCard, StyledText, Stack, theme } from 'fluent-styles'

// Basic
<StyledCheckBox checked={isChecked} onCheck={setChecked} />

// Sizes: 18 | 24 | 32 | 40
<Stack horizontal gap={16} alignItems="center">
  <StyledCheckBox checked size={18} onCheck={() => {}} />
  <StyledCheckBox checked size={24} onCheck={() => {}} />
  <StyledCheckBox checked size={32} onCheck={() => {}} />
  <StyledCheckBox checked size={40} onCheck={() => {}} />
</Stack>

// Custom colors
<StyledCheckBox checked checkedColor={theme.colors.green[500]}  checkMarkColor="#fff" onCheck={() => {}} />
<StyledCheckBox checked checkedColor={theme.colors.blue[600]}   checkMarkColor="#fff" onCheck={() => {}} />
<StyledCheckBox checked checkedColor={theme.colors.rose[500]}   checkMarkColor="#fff" onCheck={() => {}} />

// Disabled states
<StyledCheckBox checked={false} disabled onCheck={() => {}} />
<StyledCheckBox checked          disabled onCheck={() => {}} />

// --- Real-world: Settings preferences card ---
<StyledCard backgroundColor={theme.colors.white} borderRadius={18} padding={16} shadow="light">
  <Stack gap={18}>
    <StyledText fontSize={18} fontWeight={800}>Preferences</StyledText>
    {[{ label: 'Product updates', checked: updates, setter: setUpdates },
      { label: 'Marketing emails', checked: marketing, setter: setMarketing },
      { label: 'Push notifications', checked: notifs, setter: setNotifs }]
      .map(({ label, checked, setter }) => (
        <Stack key={label} horizontal alignItems="center" gap={12}>
          <StyledCheckBox checked={checked} onCheck={setter} />
          <StyledText fontSize={15} fontWeight={600}>{label}</StyledText>
        </Stack>
    ))}
  </Stack>
</StyledCard>

// --- Real-world: Task list with green checkmarks ---
<Stack gap={16}>
  {tasks.map(({ key, label, helper }) => (
    <Stack key={key} horizontal alignItems="center" gap={12}>
      <StyledCheckBox
        checked={done[key]}
        onCheck={(v) => setDone(prev => ({ ...prev, [key]: v }))}
        checkedColor={theme.colors.green[500]}
        checkMarkColor="#fff"
      />
      <Stack flex={1}>
        <StyledText fontSize={15} fontWeight={600}>{label}</StyledText>
        {helper && <StyledText fontSize={13} color={theme.colors.gray[500]}>{helper}</StyledText>}
      </Stack>
    </Stack>
  ))}
</Stack>

// --- Compact inline usage ---
<Stack horizontal alignItems="center" gap={10}>
  <StyledCheckBox checked={remember} onCheck={setRemember} size={20} />
  <StyledText>Remember me</StyledText>
</Stack>
```

---

### StyledCard

A flexible container with optional shadow levels and pressable wrapper.

```tsx
import { StyledCard } from 'fluent-styles'

<StyledCard shadow="light" padding={16} borderRadius={12}>
  <StyledText>Card content</StyledText>
</StyledCard>

// Pressable card
<StyledCard
  shadow="medium"
  pressable
  pressableProps={{ onPress: () => navigate('Detail') }}
>
  <StyledText>Tap me</StyledText>
</StyledCard>
```

**Shadow levels:** `light` | `lightMedium` | `medium` | `mediumDark` | `dark` | `veryDark`

Accepts all `ViewProps` and flat `ViewStyle` props.

---

### StyledBadge / BadgeWithIcon / BadgeIcon

Styled text badges, icon badges, and notification count overlays.

```tsx
import { StyledBadge, BadgeWithIcon, BadgeIcon, StyledImage, Stack, theme } from 'fluent-styles'

// --- Pill status badges ---
<Stack horizontal gap={10} flexWrap="wrap">
  <StyledBadge
    backgroundColor={theme.colors.green[50]}
    color={theme.colors.green[700]}
    paddingHorizontal={10} paddingVertical={6} borderRadius={999}
  >Active</StyledBadge>

  <StyledBadge
    backgroundColor={theme.colors.red[50]}
    color={theme.colors.red[600]}
    paddingHorizontal={10} paddingVertical={6} borderRadius={999}
  >Rejected</StyledBadge>

  <StyledBadge
    backgroundColor={theme.colors.blue[50]}
    color={theme.colors.blue[700]}
    paddingHorizontal={10} paddingVertical={6} borderRadius={999}
  >New</StyledBadge>
</Stack>

// --- Link badge ---
<StyledBadge link>View details</StyledBadge>

// --- BadgeWithIcon: feature / status badges ---
<BadgeWithIcon
  title="Featured"
  iconLeft={<Text>⭐</Text>}
  backgroundColor={theme.colors.yellow[50]}
  paddingHorizontal={12} paddingVertical={7} borderRadius={999} gap={6}
/>
<BadgeWithIcon
  title="Verified"
  iconLeft={<Text>✅</Text>}
  backgroundColor={theme.colors.green[50]}
  paddingHorizontal={12} paddingVertical={7} borderRadius={999} gap={6}
/>

// --- Status badges (workflow states) ---
<BadgeWithIcon title="In progress" iconLeft={<Text>🟡</Text>} color={theme.colors.yellow[700]}
  backgroundColor={theme.colors.yellow[50]} paddingHorizontal={12} paddingVertical={8} borderRadius={999} gap={6} />
<BadgeWithIcon title="Completed"  iconLeft={<Text>🟢</Text>} color={theme.colors.green[700]}
  backgroundColor={theme.colors.green[50]}  paddingHorizontal={12} paddingVertical={8} borderRadius={999} gap={6} />
<BadgeWithIcon title="Blocked"    iconLeft={<Text>🔴</Text>} color={theme.colors.red[700]}
  backgroundColor={theme.colors.red[50]}    paddingHorizontal={12} paddingVertical={8} borderRadius={999} gap={6} />

// --- BadgeIcon: count bubbles ---
<Stack horizontal gap={24} alignItems="center">
  <BadgeIcon char="1" size={24} />
  <BadgeIcon char="3" backgroundColor={theme.colors.blue[600]}  size={24} />
  <BadgeIcon char="9+" backgroundColor={theme.colors.gray[800]} size={24} />
</Stack>

// --- BadgeIcon over an icon (notification dot) ---
<BadgeIcon icon={<Text style={{ fontSize: 24 }}>🔔</Text>} char="2" right={20} top={-12} size={16} />
<BadgeIcon icon={<Text style={{ fontSize: 24 }}>🛒</Text>} char="4" backgroundColor={theme.colors.green[600]} right={16} top={-12} size={16} />

// --- Overlay badge on an image ---
<Stack>
  <StyledImage source={{ uri: '…' }} width={220} height={150} borderRadius={18} />
  <Stack position="absolute" top={10} right={10}>
    <StyledBadge backgroundColor="rgba(17,24,39,0.78)" color="#fff"
      paddingHorizontal={10} paddingVertical={6} borderRadius={999} fontWeight="700">New</StyledBadge>
  </Stack>
</Stack>

// --- Avatar with notification count ---
<Stack>
  <StyledImage source={{ uri: '…' }} cycle size={64} borderRadius={999} />
  <Stack position="absolute" top={2} right={2}>
    <BadgeIcon char="3" size={18} />
  </Stack>
</Stack>

// --- Product badges ---
<Stack horizontal gap={10} flexWrap="wrap">
  <StyledBadge backgroundColor={theme.colors.red[50]} color={theme.colors.red[600]}
    paddingHorizontal={10} paddingVertical={6} borderRadius={999} fontWeight="700">Sale</StyledBadge>
  <StyledBadge backgroundColor={theme.colors.gray[900]} color={theme.colors.white}
    paddingHorizontal={10} paddingVertical={6} borderRadius={999} fontWeight="700">Limited</StyledBadge>
  <BadgeWithIcon title="Free delivery" iconLeft={<Text>🚚</Text>} backgroundColor={theme.colors.green[50]}
    paddingHorizontal={12} paddingVertical={7} borderRadius={999} gap={6} />
</Stack>
```

**`BadgeIcon` props:** `char`, `icon?`, `size?`, `backgroundColor?`, `top?`, `right?`

---

### StyledImage / StyledImageBackground

Styled wrappers around React Native's `Image` and `ImageBackground`.

```tsx
import { StyledImage, StyledImageBackground } from 'fluent-styles'

// Fixed dimensions
<StyledImage source={{ uri: 'https://…' }} width={120} height={80} borderRadius={8} />

// Circular avatar (cycle + size)
<StyledImage source={{ uri: 'https://…' }} cycle size={64} />

// Background image with overlay
<StyledImageBackground source={require('./assets/hero.jpg')} height={200} borderRadius={12}>
  <StyledText color="#fff">Overlay text</StyledText>
</StyledImageBackground>
```

---

### StyledHeader / FullHeader

A pre-built navigation header with optional status bar management.

```tsx
import { StyledHeader, FullHeader } from 'fluent-styles'

<StyledHeader
  title="Settings"
  titleAlignment="center"
  showBackArrow
  onBackPress={() => navigation.goBack()}
  rightIcon={<SettingsIcon />}
/>

// Custom back button styling
<StyledHeader
  title="Profile"
  showBackArrow
  backArrowProps={{ size: 20, color: '#6366f1', onPress: () => navigation.goBack() }}
/>

// Full header — manages status bar spacer automatically
<FullHeader statusBarProps={{ barStyle: 'dark-content' }}>
  <MyCustomHeaderContent />
</FullHeader>
```

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | Header title |
| `titleAlignment` | `left \| center \| right` | Title alignment |
| `showBackArrow` | `boolean` | Renders a back arrow |
| `onBackPress` | `() => void` | Back arrow handler |
| `leftIcon / rightIcon` | `ReactNode` | Custom icon slots |
| `backArrowProps` | `BackArrowProps` | Size, colour, custom press handler |
| `showStatusBar` | `boolean` | Include status bar spacer |

---

### StyledDropdown / StyledMultiSelectDropdown

Modal-based dropdowns with optional search, icons, and subtitles.

```tsx
import { StyledDropdown, StyledMultiSelectDropdown } from 'fluent-styles'

const options = [
  { value: 'react',   label: 'React Native' },
  { value: 'flutter', label: 'Flutter', subtitle: 'by Google' },
  { value: 'ionic',   label: 'Ionic', disabled: true },
]

// Single-select
<StyledDropdown
  label="Framework"
  placeholder="Pick one…"
  options={options}
  value={selected}
  onChange={(item) => setSelected(item.value)}
  variant="outline"
  size="md"
/>

// With search
<StyledDropdown label="Country" options={countryOptions} searchable searchPlaceholder="Filter…" />

// Multi-select
<StyledMultiSelectDropdown label="Tags" options={options} value={selectedTags} onChange={setSelectedTags} />
```

**DropdownOptionItem:** `value`, `label`, `icon?`, `subtitle?`, `disabled?`, `meta?`

**Trigger props:** `variant` (`outline | filled | underline | ghost`), `size` (`sm | md | lg`), `label`, `placeholder`, `disabled`

---

### Popup

A versatile overlay with multiple positions, animation styles, and a built-in header.

```tsx
import { Popup } from 'fluent-styles'

// --- Bottom sheet variants ---
<Popup visible={visible} onClose={hide}>Plain content — no header</Popup>
<Popup visible={visible} onClose={hide} title="Post options" showClose><ActionList /></Popup>
<Popup visible={visible} onClose={hide} title="Share post" subtitle="Choose where to send" showClose><ShareList /></Popup>
<Popup visible={visible} onClose={hide} title="Safe area" showClose safeAreaBottom>…</Popup>

// No backdrop
<Popup visible={visible} onClose={hide} title="No backdrop" overlay={false} showClose>…</Popup>

// Prevent dismiss on backdrop tap
<Popup visible={visible} onClose={hide} title="Tap overlay — nothing" showClose closeOnPressOverlay={false}>…</Popup>

// --- Positions ---
<Popup visible={visible} onClose={hide} position="top"    title="Notification" showClose>…</Popup>
<Popup visible={visible} onClose={hide} position="left"   title="Side menu"    showClose>…</Popup>
<Popup visible={visible} onClose={hide} position="right"  title="Filters"      showClose>…</Popup>
<Popup visible={visible} onClose={hide} position="center" title="Confirm"      showClose round>…</Popup>

// --- Animation styles ---
<Popup visible={visible} onClose={hide} animation="slide" title="Slide" showClose>…</Popup>
<Popup visible={visible} onClose={hide} animation="fade"  title="Fade"  showClose>…</Popup>
<Popup visible={visible} onClose={hide} position="center" animation="scale" title="Scale" showClose round>…</Popup>
<Popup visible={visible} onClose={hide} animation="none"  title="Instant" showClose>…</Popup>

// Spring physics
<Popup visible={visible} onClose={hide} title="Spring" showClose spring={{ damping: 18, stiffness: 280 }}>…</Popup>

// --- Corner rounding ---
<Popup visible={visible} onClose={hide} round           title="Default 20 px" showClose>…</Popup>
<Popup visible={visible} onClose={hide} round={false}   title="Square corners" showClose>…</Popup>
<Popup visible={visible} onClose={hide} round roundRadius={36} title="Large radius" showClose>…</Popup>

// --- Render strategy ---
<Popup visible={visible} onClose={hide} lazyRender title="Lazy (default)" showClose>…</Popup>
<Popup visible={visible} onClose={hide} destroyOnClose title="Destroy on close" showClose>…</Popup>

// --- Color token overrides ---
<Popup
  visible={visible} onClose={hide}
  title="Dark slate" subtitle="Token overrides" showClose
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
>…</Popup>

<Popup
  visible={visible} onClose={hide} title="Indigo surface" showClose
  colors={{ background: palettes.indigo[50], headerTitle: palettes.indigo[900], handle: palettes.indigo[300], closeIconBg: palettes.indigo[100] }}
>…</Popup>

// --- Lifecycle callbacks ---
<Popup
  visible={visible} onClose={hide} title="Lifecycle" showClose
  onOpen={()   => console.log('onOpen')}
  onOpened={()  => console.log('onOpened — animation done')}
  onClosed={()  => console.log('onClosed — animation done')}
>…</Popup>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `visible` | `boolean` | — | Controls visibility |
| `position` | `top \| bottom \| left \| right \| center` | `bottom` | Entry edge |
| `animation` | `slide \| fade \| scale \| none` | auto | Animation style |
| `overlay` | `boolean` | `true` | Show backdrop |
| `closeOnPressOverlay` | `boolean` | `true` | Dismiss on backdrop tap |
| `round / roundRadius` | `boolean / number` | `true / 20` | Rounded interior corners |
| `title / subtitle` | `ReactNode` | — | Built-in header content |
| `showHandle` | `boolean` | auto | Drag handle pill |
| `showClose` | `boolean` | `false` | Close (×) button |
| `safeAreaBottom` | `boolean` | `false` | Padding for home bar |
| `lazyRender` | `boolean` | `true` | Mount children on first open |
| `destroyOnClose` | `boolean` | `false` | Unmount children when closed |
| `spring` | `{ damping, stiffness, mass? }` | — | Spring physics override |
| `colors` | `Partial<PopupColors>` | — | Token overrides |

**Lifecycle callbacks:** `onOpen`, `onOpened`, `onClose`, `onClosed`

---

### Drawer

A swipeable side panel with built-in navigation list, header, and footer slot.

```tsx
import { Drawer } from 'fluent-styles'

<Drawer
  visible={isOpen}
  side="left"
  title="Menu"
  onClose={() => setOpen(false)}
  navItems={[
    { key: 'home',    label: 'Home',    icon: '🏠', active: true, onPress: () => navigate('Home') },
    { key: 'profile', label: 'Profile', icon: '👤', onPress: () => navigate('Profile') },
    { key: 'logout',  label: 'Logout',  icon: '🚪', section: 'Account', onPress: logout },
  ]}
  footer={<UserProfileRow />}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `visible` | `boolean` | — | Controls visibility |
| `side` | `left \| right` | `left` | Entry edge |
| `width` | `number \| string` | `'78%'` | Drawer width |
| `navItems` | `DrawerNavItem[]` | — | Built-in nav list (auto-grouped by `section`) |
| `footer` | `ReactNode` | — | Pinned footer content |
| `swipeToClose` | `boolean` | `true` | Pan gesture dismiss |
| `swipeThreshold` | `number` | `0.4` | Fraction of width to trigger dismiss |
| `title / subtitle` | `ReactNode` | — | Header content |
| `headerRight` | `ReactNode` | — | Header right slot |
| `colors` | `Partial<DrawerColors>` | — | Token overrides |

**DrawerNavItem:** `key`, `label`, `icon?`, `badge?`, `section?`, `active?`, `disabled?`, `onPress?`

---

### Collapse / CollapseGroup

Animated accordion panels with full render-slot control.

```tsx
import { Collapse, CollapseGroup, CollapseItem, palettes, theme } from 'fluent-styles'

// --- Variants ---
<Collapse title="Cell (default)" variant="cell">…</Collapse>
<Collapse title="Card" subtitle="Shadow + radius" variant="card">…</Collapse>
<Collapse title="Bordered" variant="bordered">…</Collapse>
<Collapse title="Ghost" variant="ghost">…</Collapse>

// --- Sizes ---
<Collapse title="Small"  variant="bordered" size="sm">…</Collapse>
<Collapse title="Medium" variant="bordered" size="md">…</Collapse>
<Collapse title="Large"  variant="bordered" size="lg">…</Collapse>

// --- Header slots: leading · subtitle · trailing ---
<Collapse
  variant="card"
  leading={<Text style={{ fontSize: 20 }}>📦</Text>}
  title="Leading icon"
  subtitle="Any ReactNode on the left"
>…</Collapse>

<Collapse
  variant="card"
  title="Trailing badge"
  trailing={<View style={{ backgroundColor: palettes.indigo[500], borderRadius: 10, paddingHorizontal: 8 }}><Text style={{ color: '#fff', fontWeight: '700' }}>NEW</Text></View>}
>…</Collapse>

// --- Active header tint ---
<Collapse title="Tints when open" variant="bordered" activeHeader>…</Collapse>

// --- Disabled ---
<Collapse title="Premium feature" subtitle="Upgrade to unlock" variant="bordered" disabled>…</Collapse>

// --- Default open (uncontrolled) ---
<Collapse title="Starts expanded" variant="card" defaultCollapse>…</Collapse>

// --- Controlled open state ---
const [open, setOpen] = useState(false)
<Collapse
  title="Externally driven"
  variant="bordered"
  collapse={open}
  onCollapse={setOpen}
>…</Collapse>

// --- Custom header renderer ---
<Collapse
  variant="card"
  renderHeader={(open) => (
    <View style={{ padding: 14, backgroundColor: open ? '#eef2ff' : '#f2f2f7' }}>
      <Text style={{ fontWeight: '600' }}>{open ? '▲ Open' : '▼ Closed'}</Text>
    </View>
  )}
>…</Collapse>

// --- Custom header right (keep title, replace right side) ---
<Collapse
  title="Custom right"
  variant="bordered"
  renderHeaderRight={(open, chevron) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Text style={{ color: open ? '#6366f1' : '#8e8e93' }}>{open ? 'Open' : 'Closed'}</Text>
      {chevron}
    </View>
  )}
>…</Collapse>

// --- Color token overrides ---
<Collapse
  title="Dark slate theme"
  variant="card"
  colors={{
    background: theme.colors.blueGray[900],
    border: theme.colors.blueGray[700],
    titleColor: theme.colors.blueGray[100],
    subtitleColor: theme.colors.blueGray[400],
    iconColor: theme.colors.blueGray[400],
    activeHeaderBg: palettes.blueGray[800],
  }}
>…</Collapse>

<Collapse
  title="Warm amber theme"
  variant="bordered"
  colors={{
    background: palettes.amber[50],
    border: palettes.amber[300],
    titleColor: palettes.amber[900],
    iconColor: palettes.amber[500],
    activeHeaderBg: palettes.amber[100],
  }}
>…</Collapse>

// --- CollapseGroup: multi-open with defaultActiveKey array ---
<CollapseGroup variant="bordered" defaultActiveKey={['shipping']}>
  <CollapseItem itemKey="shipping" title="Shipping" subtitle="2–5 business days">…</CollapseItem>
  <CollapseItem itemKey="returns"  title="Returns"  subtitle="30-day policy">…</CollapseItem>
  <CollapseItem itemKey="sizing"   title="Size guide">…</CollapseItem>
</CollapseGroup>

// --- CollapseGroup: accordion FAQ with icons ---
<CollapseGroup accordion variant="card" defaultActiveKey="q1" style={{ gap: 8 }}>
  <CollapseItem itemKey="q1" leading={<Text style={{ fontSize: 18 }}>💳</Text>} title="Accepted payment methods">…</CollapseItem>
  <CollapseItem itemKey="q2" leading={<Text style={{ fontSize: 18 }}>🔒</Text>} title="Is my data secure?">…</CollapseItem>
  <CollapseItem itemKey="q3" leading={<Text style={{ fontSize: 18 }}>📞</Text>} title="How do I contact support?">…</CollapseItem>
</CollapseGroup>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `title / subtitle` | `ReactNode` | — | Header content |
| `leading / trailing` | `ReactNode` | — | Header side slots |
| `variant` | `cell \| card \| bordered \| ghost` | `cell` | Visual style |
| `size` | `sm \| md \| lg` | `md` | Padding scale |
| `collapse / defaultCollapse` | `boolean` | — | Controlled / uncontrolled open state |
| `onCollapse` | `(open: boolean) => void` | — | Toggle callback |
| `activeHeader` | `boolean` | `false` | Tint header when open |
| `disabled` | `boolean` | `false` | Prevent interaction |
| `lazyRender` | `boolean` | `true` | Mount body on first expand |
| `destroyOnClose` | `boolean` | `false` | Unmount body when collapsed |
| `renderHeader` | `(open: boolean) => ReactNode` | — | Replace the entire header |
| `renderHeaderRight` | `(open, chevron) => ReactNode` | — | Replace only the right side of the header |
| `colors` | `Partial<CollapseColors>` | — | Token overrides |

`CollapseGroup` additional props: `accordion` (single-open), `defaultActiveKey` (`string \| string[]`)

---

### TabBar

A feature-rich animated tab bar with badge, icon, and indicator support.

```tsx
import { TabBar, TabItem, palettes } from 'fluent-styles'

// --- Bottom nav with icons + dot badges ---
type Nav = 'home' | 'explore' | 'activity' | 'profile'
const NAV_TABS: TabItem<Nav>[] = [
  { value: 'home',     label: 'Home',     iconRender: (c) => <HomeIcon color={c} /> },
  { value: 'explore',  label: 'Explore',  iconRender: (c) => <SearchIcon color={c} />, badge: 3 },
  { value: 'activity', label: 'Activity', iconRender: (c) => <BellIcon color={c} />,   badge: '' }, // '' = dot badge
  { value: 'profile',  label: 'Profile',  iconRender: (c) => <UserIcon color={c} /> },
]
<TabBar options={NAV_TABS} value={nav} onChange={setNav} indicator="dot" showBorder />

// --- Animated underline indicator ---
<TabBar options={SIMPLE_TABS} value={seg} onChange={setSeg} indicator="line" showBorder />

// --- Sliding pill indicator ---
<TabBar
  options={SIMPLE_TABS}
  defaultValue="week"
  indicator="pill"
  colors={{ background: palettes.indigo[50], activeText: palettes.indigo[700], indicator: palettes.indigo[200], text: palettes.indigo[400] }}
/>

// --- Scrollable tabs (many items) ---
<TabBar options={MANY_TABS} value={cat} onChange={setCat} tabAlign="scroll" indicator="line" showBorder />

// --- Disabled tabs ---
const TABS_WITH_DISABLED: TabItem<string>[] = [
  { value: 'available', label: 'Available' },
  { value: 'locked',    label: 'Locked',  disabled: true },
  { value: 'open',      label: 'Open' },
]
<TabBar options={TABS_WITH_DISABLED} value={active} onChange={setActive} indicator="line" showBorder />

// --- Solid / chip variant ---
<TabBar
  options={SIMPLE_TABS}
  defaultValue="week"
  variant="solid"
  indicator="pill"
  colors={{
    background: palettes.gray[100],
    activeChipBg: '#ffffff',
    activeChipText: palettes.gray[900],
    indicator: palettes.coolGray[200],
    text: palettes.gray[500],
  }}
/>

// --- Numeric values (step wizard) ---
type Step = 1 | 2 | 3
const STEPS: TabItem<Step>[] = [
  { value: 1, label: 'Step 1' },
  { value: 2, label: 'Step 2' },
  { value: 3, label: 'Step 3' },
]
<TabBar
  options={STEPS}
  value={step}
  onChange={setStep}
  indicator="line"
  colors={{ activeText: palettes.violet[600], indicator: palettes.violet[600], text: palettes.gray[400] }}
  showBorder
/>

// --- Custom indicator sizing ---
<TabBar options={SIMPLE_TABS} defaultValue="month" indicator="line" indicatorWidth={24} indicatorHeight={3} indicatorRadius={3} showBorder />

// --- Label scale on active tab ---
<TabBar options={SIMPLE_TABS} defaultValue="week" indicator="line" labelBulge={1.15} showBorder />

// --- Color overrides: green theme ---
<TabBar
  options={SIMPLE_TABS}
  defaultValue="day"
  indicator="line"
  showBorder
  colors={{ background: palettes.green[50], activeText: palettes.green[700], indicator: palettes.green[500], text: palettes.green[400], border: palettes.green[200] }}
/>

// --- Color overrides: dark slate ---
<TabBar
  options={NAV_TABS}
  defaultValue="home"
  indicator="dot"
  showBorder
  colors={{ background: palettes.blueGray[900], activeText: palettes.indigo[400], indicator: palettes.indigo[400], text: palettes.blueGray[400], border: palettes.blueGray[700], badge: palettes.rose[400] }}
/>

// --- Large font / taller bar ---
<TabBar options={SIMPLE_TABS} defaultValue="week" indicator="line" fontSize={17} height={52} showBorder />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `TabItem<T>[]` | — | Tab definitions |
| `value / defaultValue` | `T` | — | Controlled / uncontrolled value |
| `onChange` | `(val: T) => void` | — | Change callback |
| `variant` | `default \| underline \| card \| solid` | `default` | Visual preset |
| `indicator` | `false \| line \| pill \| dot` | `false` | Animated indicator style |
| `indicatorColor` | `ColorValue` | — | Indicator colour override |
| `indicatorWidth` | `number` | auto | Fixed indicator width (0 = full tab width) |
| `indicatorHeight` | `number` | `2` | Indicator thickness |
| `indicatorRadius` | `number` | auto | Indicator border radius |
| `tabAlign` | `center \| scroll` | `center` | Equal-width or scrolling tabs |
| `labelBulge` | `number \| boolean` | `1` | Active label scale factor |
| `fontSize` | `number` | — | Label font size |
| `height` | `number` | — | Bar height override |
| `showBorder` | `boolean` | `false` | Persistent bottom border |
| `colors` | `Partial<TabBarColors>` | — | Token overrides |

**TabItem:** `value`, `label`, `badge?` (`number` = count, `''` = dot), `iconRender?`, `disabled?`

---

### StyledDivider

A simple horizontal rule.

```tsx
import { StyledDivider } from 'fluent-styles'

<StyledDivider />
<StyledDivider borderBottomColor="#e4e4e7" marginVertical={8} />
```

---

### StyledSeperator

A horizontal row with left and optional right label — ideal for section headers.

```tsx
import { StyledSeperator } from 'fluent-styles'

<StyledSeperator leftLabel="Recent" rightLabel="See all" marginVertical={8} />
```

Props: `leftLabel`, `leftLabelProps`, `rightLabel`, `rightLabelProps`, plus all `StackProps`.

---

### Stack

A layout primitive for row and column arrangements.

```tsx
import { Stack } from 'fluent-styles'

// Vertical (column)
<Stack gap={12}>
  <StyledText>Item 1</StyledText>
  <StyledText>Item 2</StyledText>
</Stack>

// Horizontal (row)
<Stack horizontal alignItems="center" gap={8}>
  <Avatar />
  <StyledText>Jane Doe</StyledText>
</Stack>
```

---

### StyledText

A variant-aware Text component accepting `TextStyle` props directly.

```tsx
import { StyledText } from 'fluent-styles'

<StyledText fontSize={18} fontWeight="700" color="#1c1c1e">Heading</StyledText>
<StyledText link>Click here</StyledText>
<StyledText textAlign="center" color="#6b7280">Muted caption</StyledText>
```

---

### StyledPressable

A styled `Pressable` accepting flat `ViewStyle` props.

```tsx
import { StyledPressable } from 'fluent-styles'

<StyledPressable padding={12} borderRadius={8} backgroundColor="#f4f4f5" onPress={handlePress}>
  <StyledText>Press me</StyledText>
</StyledPressable>
```

---

### StyledPage / StyledScrollView

Base layout containers.

```tsx
import { StyledPage, StyledScrollView } from 'fluent-styles'

<StyledPage flex={1} backgroundColor="#f8f8f8">
  <StyledScrollView contentContainerStyle={{ padding: 16 }}>
    <MyContent />
  </StyledScrollView>
</StyledPage>
```

---

### StyledSafeAreaView

A styled wrapper around `SafeAreaView`.

```tsx
import { StyledSafeAreaView } from 'fluent-styles'

<StyledSafeAreaView flex={1} backgroundColor="#fff">
  <App />
</StyledSafeAreaView>
```

---

### Spacer

Inserts fixed or flexible whitespace.

```tsx
import { Spacer } from 'fluent-styles'

<Spacer height={16} />
<Spacer flex={1} />  {/* fills remaining space */}
```

---

### StyledShape

A shaped container for icon chips, avatars, and dot indicators.

```tsx
import { StyledShape } from 'fluent-styles'

<StyledShape size={40} borderRadius={20} backgroundColor="#6366f1">
  <StyledText color="#fff">A</StyledText>
</StyledShape>
```

---

### Loader

A loading indicator with four animation variants, optional overlay, and label.

```tsx
import { Loader } from 'fluent-styles'

<Loader variant="spinner" />
<Loader variant="dots"     color="#6366f1" label="Saving…" />
<Loader variant="pulse"    overlay />
<Loader variant="circular" label="Loading…" theme="dark" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `spinner \| pulse \| dots \| circular` | `spinner` | Animation style |
| `label` | `string` | — | Text below the indicator |
| `color` | `string` | — | Indicator tint colour |
| `overlay` | `boolean` | `false` | Full-screen dimmed backdrop |
| `theme` | `light \| dark \| system` | `system` | Colour scheme |
| `colors` | `Partial<LoaderColors>` | — | Fine-grained token overrides |

---

## Hooks

All hooks require a `PortalManager` ancestor.

### useToast

```tsx
import { useToast } from 'fluent-styles'

const toast = useToast()

// --- Shortcut methods ---
toast.success('Profile saved')
toast.error('Upload failed', 'The selected file is larger than 5 MB.')
toast.warning('Unsaved changes', 'You have pending edits on this screen.')
toast.info('New update available', 'Restart the app to use the latest version.')

// --- Full control with show() ---
const id = toast.show({
  message: 'Settings updated',
  description: 'Your preferences were saved successfully.',
  variant: 'success',     // 'success' | 'error' | 'warning' | 'info'
  duration: 2500,
  theme: 'light',         // 'light' | 'dark' | 'system'
})

// Dark-themed toast
toast.show({
  message: 'Background sync started',
  description: 'We will notify you when sync is complete.',
  variant: 'info',
  duration: 4000,
  theme: 'dark',
})

// --- Persistent toast (duration: 0 — never auto-dismisses) ---
const persistId = toast.show({
  message: 'Uploading file…',
  description: 'Please keep the app open until upload finishes.',
  variant: 'info',
  duration: 0,
  theme: 'dark',
})
toast.dismiss(persistId)  // dismiss manually later

// --- Short / long durations ---
toast.show({ message: 'Quick message', variant: 'info', duration: 1200, theme: 'light' })
toast.show({ message: 'Read this carefully', variant: 'warning', duration: 6000, theme: 'light' })

// --- Color token overrides ---
toast.show({
  message: 'Custom success',
  variant: 'success',
  theme: 'light',
  colors: {
    successBg: '#ecfdf5',
    successBorder: '#10b981',
    successLabel: '#065f46',
    description: '#047857',
    closeIcon: '#065f46',
  },
})

toast.show({
  message: 'Custom error',
  variant: 'error',
  theme: 'dark',
  colors: {
    errorBg: '#3b0a0a',
    errorBorder: '#ef4444',
    errorLabel: '#fecaca',
    description: '#fca5a5',
    closeIcon: '#fecaca',
  },
})

// --- Dismiss ---
toast.dismiss(id)    // single
toast.dismissAll()   // all active
```

| Method | Signature | Description |
|---|---|---|
| `show` | `(options) => number` | Show a toast, returns portal id |
| `success` | `(message, description?) => number` | Green success toast |
| `error` | `(message, description?) => number` | Red error toast |
| `warning` | `(message, description?) => number` | Amber warning toast |
| `info` | `(message, description?) => number` | Blue info toast |
| `dismiss` | `(id: number) => void` | Dismiss specific toast |
| `dismissAll` | `() => void` | Dismiss all active toasts |

**`show` options:** `message`, `description?`, `variant`, `duration` (`0` = persistent), `theme`, `colors`

---

### useNotification

```tsx
import { useNotification } from 'fluent-styles'

const notification = useNotification()

// --- Basic notification ---
const id = notification.show({
  title: 'New message from Alex',
  body: 'Hey, are you free this afternoon?',
  source: 'Messages',
  initials: 'AK',
  timestamp: 'now',
  theme: 'dark',
})

// --- With avatar image ---
notification.show({
  title: 'Sarah Johnson',
  body: 'Sent you 3 new design files.',
  source: 'Drive',
  avatar: { uri: 'https://example.com/avatar.jpg' },
  timestamp: '2m',
  theme: 'light',
})

// --- With action button ---
notification.show({
  title: 'Deployment finished',
  body: 'Production build completed successfully.',
  source: 'CI/CD',
  initials: 'CI',
  timestamp: 'now',
  actionLabel: 'Open',
  onAction: () => navigate('Dashboard'),
  theme: 'dark',
})

// --- Custom duration ---
notification.show({ title: 'Quick', body: 'Disappears fast', initials: 'Q', duration: 1500, theme: 'light' })
notification.show({ title: 'Long',  body: 'Stays a while',   initials: 'L', duration: 8000, theme: 'dark'  })

// --- Color token overrides ---
notification.show({
  title: 'Custom brand notification',
  body: 'Using token overrides on top of the active theme.',
  source: 'Brand',
  initials: 'BR',
  timestamp: 'now',
  theme: 'light',
  actionLabel: 'View',
  onAction: () => navigate('Brand'),
  colors: {
    background: '#eff6ff',
    border: '#2563eb',
    title: '#1e3a8a',
    body: '#1d4ed8',
    source: '#2563eb',
    timestamp: '#3b82f6',
    avatarBg: '#dbeafe',
    avatarBorder: '#60a5fa',
    avatarInitials: '#1d4ed8',
    actionBg: '#dbeafe',
    actionLabel: '#1d4ed8',
    closeIcon: '#1d4ed8',
  },
})

// --- Real-world examples ---
notification.show({
  title: 'New comment on your PR',
  body: 'Chris left feedback on the latest changes.',
  source: 'Git',
  initials: 'CK',
  timestamp: '1m',
  actionLabel: 'Review',
  onAction: () => navigate('PRReview'),
  theme: 'dark',
})

notification.show({
  title: 'Meeting starts in 10 minutes',
  body: 'Frontend sync with the product team.',
  source: 'Calendar',
  initials: 'CA',
  timestamp: 'soon',
  actionLabel: 'Join',
  onAction: joinMeeting,
  theme: 'light',
})

notification.dismiss(id)
```

**Show options:** `title`, `body`, `avatar`, `initials`, `source`, `timestamp`, `actionLabel`, `onAction`, `duration` (`0` = persistent), `theme`, `colors`

---

### useDialogue

```tsx
import { useDialogue } from 'fluent-styles'

const dialogue = useDialogue()

// --- Alert (Promise<void>) ---
await dialogue.alert(
  'Session expired',
  'Please log in again to continue.',
  '🔒',
  'light',  // optional theme
)

// --- Confirm (Promise<boolean>) ---
const confirmed = await dialogue.confirm({
  title: 'Save changes?',
  message: 'Your edits will be saved to this project.',
  icon: '💾',
  confirmLabel: 'Save',
  cancelLabel: 'Cancel',
  theme: 'light',
})
if (confirmed) save()

// --- Destructive confirm ---
const ok = await dialogue.confirm({
  title: 'Delete project?',
  message: 'This action cannot be undone.',
  icon: '⚠️',
  confirmLabel: 'Delete',
  cancelLabel: 'Keep it',
  destructive: true,
})
if (ok) deleteProject()

// --- Custom multi-action dialogue ---
dialogue.show({
  title: 'Unsaved changes',
  message: 'You have unsaved edits. What would you like to do?',
  icon: '📝',
  theme: 'light',
  actions: [
    { label: 'Discard',      variant: 'destructive', onPress: () => discard() },
    { label: 'Save draft',   variant: 'secondary',   onPress: () => saveDraft() },
    { label: 'Keep editing', variant: 'primary',     onPress: () => keepEditing() },
  ],
})

// --- Async chained flow (confirm then alert) ---
const publish = async () => {
  const confirmed = await dialogue.confirm({
    title: 'Publish update?',
    message: 'This will make the latest version visible to users.',
    icon: '🚀',
    confirmLabel: 'Publish',
    cancelLabel: 'Not now',
    theme: 'light',
  })
  if (!confirmed) return

  await performPublish()

  await dialogue.alert('Published', 'Your update is now live.', '✅')
}

// --- Programmatic dismiss by id ---
const id = dialogue.show({
  title: 'Temporary dialogue',
  message: 'This will close automatically in 2 seconds.',
  icon: '⏳',
  theme: 'light',
  actions: [{ label: 'OK', variant: 'primary', onPress: () => {} }],
})
setTimeout(() => dialogue.dismiss(id), 2000)

// --- Real-world: log out + rate app ---
const handleLogout = async () => {
  const ok = await dialogue.confirm({ title: 'Log out?', message: 'You will need to sign in again.', icon: '👋', confirmLabel: 'Log out', destructive: true })
  if (ok) logout()
}

const handleRateApp = () => {
  dialogue.show({
    title: 'Enjoying the app?',
    icon: '⭐',
    actions: [
      { label: '😠 1',  variant: 'secondary', onPress: () => submitRating(1) },
      { label: '😐 3',  variant: 'secondary', onPress: () => submitRating(3) },
      { label: '😁 5',  variant: 'primary',   onPress: () => submitRating(5) },
    ],
  })
}
```

**Action variants:** `primary` | `secondary` | `destructive`

---

### useActionSheet

```tsx
import { useActionSheet } from 'fluent-styles'

const actionSheet = useActionSheet()

// Items list
actionSheet.show({
  title: 'Post options',
  items: [
    { icon: '✏️', label: 'Edit',      onPress: onEdit },
    { icon: '🔗', label: 'Copy link', onPress: onCopy },
    { icon: '🚩', label: 'Report',    variant: 'destructive', onPress: onReport },
    { icon: '🔒', label: 'Premium',   variant: 'disabled' },
  ],
})

// Custom content sheet
actionSheet.present(<MyDatePicker onChange={setDate} />, { title: 'Pick a date' })

// Mixed: content + items
actionSheet.show({
  title: 'Choose a colour',
  children: <ColorSwatchRow onSelect={setColor} />,
  items: [{ label: 'Reset to default', onPress: resetColor }],
})
```

**ActionSheetItem variants:** `default` | `destructive` | `disabled`

---

### useLoader

```tsx
import { useLoader } from 'fluent-styles'

const loader = useLoader()

// --- Manual show / hide ---
const id = loader.show({ label: 'Saving…', variant: 'spinner' })
await saveData()
loader.hide(id)

// --- Variants ---
loader.show({ variant: 'spinner'  })
loader.show({ variant: 'dots',    label: 'Processing…' })
loader.show({ variant: 'pulse',   overlay: true })
loader.show({ variant: 'circular', label: 'Loading…', theme: 'dark' })

// --- Color overrides ---
loader.show({
  label: 'Preparing analytics…',
  variant: 'circular',
  theme: 'dark',
  colors: { indicator: '#60a5fa', label: '#dbeafe' },
})

// --- Automatic wrap (always hides, even on error) ---
const report = await loader.wrap(
  () => api.fetchReport(),
  { label: 'Loading report…', variant: 'dots' },
)

// --- Wrap example with status feedback ---
const runFakeTask = async (options, successMsg) => {
  const result = await loader.wrap(
    () => new Promise(resolve => setTimeout(resolve, 2000)),
    options,
  )
  toast.success(successMsg)
}
await runFakeTask({ label: 'Saving profile…', variant: 'spinner'  }, 'Profile saved')
await runFakeTask({ label: 'Uploading data…', variant: 'circular' }, 'Upload complete')
```

---

## Imperative Services

These services are callable from **anywhere** — Redux middleware, Axios interceptors, navigation helpers — because they use the global `portal` singleton. No `PortalManager` is required.

### toastService

```ts
import { toastService } from 'fluent-styles'

toastService.success('Saved!')
toastService.error('Network error', 'Check your connection.')
toastService.warning('Session expiring')
toastService.info('New version available')

const id = toastService.show({ message: 'Custom', variant: 'info', duration: 2000 })
toastService.dismiss(id)
```

### notificationService

```ts
import { notificationService } from 'fluent-styles'

const id = notificationService.show({
  title: 'Payment received',
  body: '$49.99 from John Smith',
  initials: 'JS',
})
notificationService.dismiss(id)
```

### dialogueService

```ts
import { dialogueService } from 'fluent-styles'

const ok = await dialogueService.confirm({ title: 'Sign out?', destructive: true })
await dialogueService.alert('Welcome back!', 'You were away for 3 days.')

dialogueService.show({ title: 'Custom', actions: [{ label: 'Got it', onPress: () => {} }] })
```

### actionSheetService

```ts
import { actionSheetService } from 'fluent-styles'

actionSheetService.show({
  title: 'Share',
  items: [
    { icon: '📋', label: 'Copy link', onPress: copyLink },
    { icon: '✉️', label: 'Email',     onPress: shareEmail },
  ],
})

actionSheetService.present(<MyPicker />, { title: 'Choose' })
```

### loaderService

```ts
import { loaderService } from 'fluent-styles'

const id = loaderService.show({ label: 'Uploading…', variant: 'circular' })
await uploadFile()
loaderService.hide(id)

// Wrapped — always hides, even on error
const result = await loaderService.wrap(() => api.submit(form), { label: 'Submitting…' })
```

---

## Theme & Tokens

The design token system is fully exported for use in your own components.

```ts
import { theme, palettes, lightColors, darkColors, fontStyles } from 'fluent-styles'

// Colour scales (50–900)
theme.colors.indigo[500]  // '#6366f1'
theme.colors.rose[600]    // '#e11d48'
theme.colors.gray[100]    // '#f4f4f5'

// Base values
palettes.white  // '#FFFFFF'
palettes.black  // '#000000'

// Typography scale
theme.fontSize.small
theme.fontSize.normal
theme.fontSize.medium
theme.fontSize.large

theme.fontWeight.normal
theme.fontWeight.semiBold
theme.fontWeight.bold

// Prebuilt font style objects
fontStyles.body
fontStyles.heading
```

### Per-component colour token overrides

Every complex component accepts a `colors` prop typed as `Partial<ComponentColors>`. Exported default token maps:

| Export | Used by |
|---|---|
| `TAB_BAR_COLORS_LIGHT` / `TAB_BAR_COLORS_DARK` | `TabBar` |
| `POPUP_COLORS_LIGHT` / `POPUP_COLORS_DARK` | `Popup` |
| `DRAWER_COLORS_LIGHT` / `DRAWER_COLORS_DARK` | `Drawer` |
| `COLLAPSE_LIGHT` / `COLLAPSE_DARK` | `Collapse` |
| `LOADER_LIGHT` / `LOADER_DARK` | `Loader` |

### `theme` prop

Overlay and feedback components accept a `theme` prop:

```tsx
<Popup theme="dark" visible={…}>…</Popup>
<Loader theme="system" />  {/* follows device dark mode */}
```

Values: `'light'` | `'dark'` | `'system'`

---

## Contributing

Issues and pull requests are welcome. Please open an issue first to discuss any significant changes.

- Repository: [github.com/aaghorighor/fluent-styles](https://github.com/aaghorighor/fluent-styles)
- Bug reports: [github.com/aaghorighor/fluent-styles/issues](https://github.com/aaghorighor/fluent-styles/issues)

---

## License

[Apache 2.0](LICENSE)
