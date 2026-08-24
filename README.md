# fluent-styles

**A comprehensive TypeScript-first React Native UI library**

[![npm version](https://img.shields.io/npm/v/fluent-styles)](https://www.npmjs.com/package/fluent-styles)
[![npm downloads](https://img.shields.io/npm/dm/fluent-styles)](https://www.npmjs.com/package/fluent-styles)
[![license](https://img.shields.io/npm/l/fluent-styles)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-first-blue)](https://www.typescriptlang.org/)

---

## What is it?

`fluent-styles` provides 35+ production-ready React Native components built with TypeScript from the ground up. It includes portal-based overlays and imperative service APIs for toasts, dialogs, loaders, and action sheets — no boilerplate required. Drop in the provider and start building immediately.

---

## Installation

```sh
npm install fluent-styles
# or
yarn add fluent-styles
```

---

## Quick Start

```tsx
import { GlobalPortalProvider, PortalManager } from 'fluent-styles';

export default function App() {
  return (
    <GlobalPortalProvider>
      <PortalManager>
        <YourNavigator />
      </PortalManager>
    </GlobalPortalProvider>
  );
}
```

---

## Components

| Component | Category |
|---|---|
| `Stack` / `XStack` / `YStack` | Layout |
| `StyledPage` | Layout |
| `StyledHeader` | Layout |
| `StyledCard` | Layout |
| `StyledSpacer` | Layout |
| `StyledDivider` | Layout |
| `StyledSeperator` | Layout |
| `StyledScrollView` | Layout |
| `StyledSafeAreaProvider` | Layout |
| `StyledSafeAreaView` | Layout |
| `StyledText` | Typography |
| `StyledButton` | Actions |
| `StyledPressable` | Actions |
| `StyledInput` / `StyledTextInput` | Form |
| `StyledForm` | Form |
| `StyledCheckBox` | Form |
| `Switch` | Form |
| `StyledDropdown` | Form |
| `StyledMultiSelectDropdown` | Form |
| `StyledRadio` / `StyledRadioGroup` | Form |
| `StyledSlider` | Form |
| `StyledDatePicker` | Form |
| `StyledSearchBar` | Form |
| `StyledImage` / `StyledImageBackground` | Media |
| `StyleShape` / `StyledCycle` | Shape |
| `StyledBadge` / `BadgeWithIcon` / `BadgeIcon` | Indicators |
| `StyledChip` | Indicators |
| `Spinner` / `Circular` / `Loader` | Loading |
| `StyledProgressBar` | Progress |
| `StyledCircularProgress` | Progress |
| `StyledBar` | Charts |
| `StyledDialog` / `StyledConfirmDialog` / `StyledOkDialog` | Overlays |
| `Drawer` | Overlays |
| `Popup` | Overlays |
| `Collapse` / `CollapseGroup` | Navigation |
| `TabBar` | Navigation |
| `StyledTimeline` | Display |
| `StyledTable` | Display |
| `StyledSkeleton` | Display |
| `StyledEmptyState` | Display |
| `GlobalPortalProvider` | Portal |

> Action sheets are accessed via `useActionSheet` / `actionSheetService`, not a standalone component — see [Hooks & Services](#hooks--services).

---

## Hooks & Services

**Hooks**
- `useToast`
- `useNotification`
- `useLoader` / `useLoaderBinding`
- `useDialogue`
- `useActionSheet`
- `usePortal`
- `usePaginatedQuery`

**Imperative Services**
- `toastService`
- `notificationService`
- `loaderService`
- `dialogueService`
- `actionSheetService`

---

## Documentation

- **Full docs:** https://fluent-styles.io
- **Live examples:** https://github.com/suftnetrepo/fluent-styles-next/tree/main/example

---

## License

[Apache 2.0](LICENSE)
