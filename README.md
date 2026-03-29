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
import { StyledButton } from 'fluent-styles'

// Variants
<StyledButton primary>Primary</StyledButton>
<StyledButton secondary>Secondary</StyledButton>
<StyledButton outline>Outline</StyledButton>
<StyledButton ghost>Ghost</StyledButton>
<StyledButton link>Link</StyledButton>
<StyledButton danger>Danger</StyledButton>
<StyledButton success>Success</StyledButton>
<StyledButton warning>Warning</StyledButton>

// Shapes
<StyledButton primary pill>Pill</StyledButton>
<StyledButton primary rounded>Rounded</StyledButton>
<StyledButton primary square>Square</StyledButton>

// Sizes: xs | sm | md | lg | xl
<StyledButton primary lg>Large</StyledButton>

// Layout
<StyledButton primary block>Full Width</StyledButton>
<StyledButton primary compact>Compact</StyledButton>
<StyledButton primary icon><MyIcon /></StyledButton>

// Icons
<StyledButton primary leftIcon={<Icon />}>With Left Icon</StyledButton>
<StyledButton primary rightIcon={<Icon />}>With Right Icon</StyledButton>

// States
<StyledButton primary loading>Saving…</StyledButton>
<StyledButton primary disabled>Disabled</StyledButton>

// Styled text sub-component
<StyledButton primary>
  <StyledButton.Text>Custom Text</StyledButton.Text>
</StyledButton>
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
import { StyledCheckBox } from 'fluent-styles'

<StyledCheckBox checked={isChecked} onCheck={setChecked} />

<StyledCheckBox
  checkedColor="#6366f1"
  checkMarkColor="#ffffff"
  uncheckedColor="#e4e4e7"
  size={28}
/>

<StyledCheckBox checked disabled />
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

### StyledBadge / BadgeWithIcon

A styled text badge with optional leading/trailing icon slots.

```tsx
import { StyledBadge, BadgeWithIcon } from 'fluent-styles'

<StyledBadge
  fontSize={12}
  color="#ffffff"
  backgroundColor="#ef4444"
  paddingHorizontal={8}
  paddingVertical={2}
  borderRadius={9999}
>
  New
</StyledBadge>

<BadgeWithIcon
  title="Pro"
  iconLeft={<StarIcon size={12} />}
  backgroundColor="#6366f1"
  color="#ffffff"
  gap={4}
  paddingHorizontal={8}
  paddingVertical={4}
  borderRadius={8}
/>

<StyledBadge link>Click here</StyledBadge>
```

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

// Bottom sheet (default)
<Popup visible={visible} onClose={() => setVisible(false)} title="Options" showHandle showClose safeAreaBottom>
  <MyContent />
</Popup>

// Centered modal
<Popup visible={visible} position="center" animation="scale" onClose={() => setVisible(false)}>
  <MyModal />
</Popup>

// Left side panel
<Popup visible={visible} position="left" animation="slide" onClose={() => setVisible(false)}>
  <MySideContent />
</Popup>
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
import { Collapse, CollapseGroup, CollapseItem } from 'fluent-styles'

// Single panel
<Collapse title="What is React Native?" variant="card" defaultCollapse>
  <StyledText>React Native lets you build mobile apps with React…</StyledText>
</Collapse>

// Accordion group
<CollapseGroup accordion defaultActiveKey="panel1">
  <CollapseItem itemKey="panel1" title="Section 1"><StyledText>Content 1</StyledText></CollapseItem>
  <CollapseItem itemKey="panel2" title="Section 2"><StyledText>Content 2</StyledText></CollapseItem>
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
| `lazyRender` | `boolean` | `true` | Mount body on first expand |
| `destroyOnClose` | `boolean` | `false` | Unmount body when collapsed |
| `renderHeader` | `(open: boolean) => ReactNode` | — | Custom header renderer |
| `renderBody` | `() => ReactNode` | — | Custom body renderer |
| `colors` | `Partial<CollapseColors>` | — | Token overrides |

---

### TabBar

A feature-rich animated tab bar with badge, icon, and indicator support.

```tsx
import { TabBar } from 'fluent-styles'

const tabs = [
  { value: 'home',    label: 'Home',    iconRender: (color) => <HomeIcon color={color} /> },
  { value: 'explore', label: 'Explore', badge: 3 },
  { value: 'profile', label: 'Profile', iconRender: (color) => <UserIcon color={color} /> },
]

<TabBar options={tabs} value={activeTab} onChange={setActiveTab} variant="underline" indicator="line" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `TabItem<T>[]` | — | Tab definitions |
| `value / defaultValue` | `T` | — | Controlled / uncontrolled value |
| `onChange` | `(val: T) => void` | — | Change callback |
| `variant` | `default \| underline \| card \| solid` | `default` | Visual preset |
| `indicator` | `false \| line \| pill \| dot` | `false` | Animated indicator style |
| `indicatorColor` | `ColorValue` | — | Indicator colour override |
| `tabAlign` | `center \| scroll` | `center` | Equal-width or scrolling tabs |
| `labelBulge` | `number \| boolean` | `1` | Active label scale factor |
| `showBorder` | `boolean` | `false` | Persistent bottom border |
| `colors` | `Partial<TabBarColors>` | — | Token overrides |

**TabItem:** `value`, `label`, `badge?` (empty string = dot badge), `iconRender?`, `disabled?`

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

toast.success('Saved!', 'Your changes have been saved.')
toast.error('Failed', 'Please try again.')
toast.warning('Low storage')
toast.info('Update available')

const id = toast.show({
  message: 'Profile updated',
  description: 'Changes are live.',
  variant: 'success',
  duration: 3000,
  theme: 'dark',
})

toast.dismiss(id)
toast.dismissAll()
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

---

### useNotification

```tsx
import { useNotification } from 'fluent-styles'

const notification = useNotification()

const id = notification.show({
  title: 'New message',
  body: 'Hey, are you free tonight?',
  initials: 'JD',
  timestamp: '2 min ago',
  actionLabel: 'Reply',
  onAction: () => navigate('Chat'),
  duration: 5000,
})

notification.dismiss(id)
```

**Show options:** `title`, `body`, `avatar`, `initials`, `source`, `timestamp`, `actionLabel`, `onAction`, `duration`, `theme`, `colors`

---

### useDialogue

```tsx
import { useDialogue } from 'fluent-styles'

const dialogue = useDialogue()

// Async confirm — returns Promise<boolean>
const confirmed = await dialogue.confirm({
  title: 'Delete account?',
  message: 'This action cannot be undone.',
  confirmLabel: 'Delete',
  cancelLabel: 'Cancel',
  destructive: true,
  icon: '⚠️',
})
if (confirmed) deleteAccount()

// Async alert — returns Promise<void>
await dialogue.alert('Done!', 'Your profile has been updated.', '✅')

// Fully custom dialogue
const id = dialogue.show({
  title: 'Rate your experience',
  icon: '⭐',
  actions: [
    { label: '😠', onPress: () => submit(1) },
    { label: '😐', onPress: () => submit(3) },
    { label: '😁', onPress: () => submit(5) },
  ],
})
dialogue.dismiss(id)
```

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

// Manual
const id = loader.show({ label: 'Saving…', variant: 'spinner' })
await saveData()
loader.hide(id)

// Automatic wrap — hides on completion or error
const data = await loader.wrap(() => api.fetchReport(), { label: 'Loading report…', variant: 'dots' })
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
