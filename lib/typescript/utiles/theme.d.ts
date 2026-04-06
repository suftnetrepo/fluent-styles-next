import { useColorScheme } from 'react-native';
import { fontStyles } from './fontStyles';
export type ComponentTheme = 'dark' | 'light' | 'system';
/**
 * Resolves 'system' to the device's current color scheme.
 * Returns `'light'` or `'dark'`.
 */
export declare function resolveTheme(theme: ComponentTheme, deviceScheme: ReturnType<typeof useColorScheme>): 'light' | 'dark';
export type ToastColors = {
    /** Background of the toast pill. */
    successBg: string;
    successBorder: string;
    successLabel: string;
    errorBg: string;
    errorBorder: string;
    errorLabel: string;
    warningBg: string;
    warningBorder: string;
    warningLabel: string;
    infoBg: string;
    infoBorder: string;
    infoLabel: string;
    /** Body description text colour (shared across all variants). */
    description: string;
    /** The small × close button. */
    closeIcon: string;
};
export declare const TOAST_DARK: ToastColors;
export declare const TOAST_LIGHT: ToastColors;
export type NotificationColors = {
    background: string;
    border: string;
    source: string;
    title: string;
    timestamp: string;
    body: string;
    avatarBg: string;
    avatarBorder: string;
    avatarInitials: string;
    actionBg: string;
    actionBorder: string;
    actionLabel: string;
    closeIcon: string;
};
export declare const NOTIFICATION_DARK: NotificationColors;
export declare const NOTIFICATION_LIGHT: NotificationColors;
export type LoaderColors = {
    /** Overlay backdrop. */
    overlayBg: string;
    /** Card background (overlay mode). */
    cardBg: string;
    cardBorder: string;
    /** Spinner / pulse / dots tint. */
    indicator: string;
    label: string;
};
export declare const LOADER_DARK: LoaderColors;
export declare const LOADER_LIGHT: LoaderColors;
export type DialogueColors = {
    background: string;
    border: string;
    title: string;
    message: string;
    divider: string;
    primaryBg: string;
    primaryBorder: string;
    primaryLabel: string;
    secondaryBg: string;
    secondaryBorder: string;
    secondaryLabel: string;
    destructiveBg: string;
    destructiveBorder: string;
    destructiveLabel: string;
};
export declare const DIALOGUE_DARK: DialogueColors;
export declare const DIALOGUE_LIGHT: DialogueColors;
declare const palettes: {
    readonly white: "#FFFFFF";
    readonly black: "#000000";
    readonly lightText: "#FFFFFF";
    readonly darkText: "#000000";
    readonly transparent: "rgba(0, 0, 0, 0)";
    readonly transparent05: "rgba(0, 0, 0, 0.5)";
    readonly transparent09: "rgba(0, 0, 0, 0.9)";
    readonly rose: {
        readonly 50: "#fff1f2";
        readonly 100: "#ffe4e6";
        readonly 200: "#fecdd3";
        readonly 300: "#fda4af";
        readonly 400: "#fb7185";
        readonly 500: "#f43f5e";
        readonly 600: "#e11d48";
        readonly 700: "#be123c";
        readonly 800: "#9f1239";
        readonly 900: "#881337";
    };
    readonly pink: {
        readonly 50: "#fdf2f8";
        readonly 100: "#fce7f3";
        readonly 200: "#fbcfe8";
        readonly 300: "#f9a8d4";
        readonly 400: "#f472b6";
        readonly 500: "#ec4899";
        readonly 600: "#db2777";
        readonly 700: "#be185d";
        readonly 800: "#9d174d";
        readonly 900: "#831843";
    };
    readonly fuchsia: {
        readonly 50: "#fdf4ff";
        readonly 100: "#fae8ff";
        readonly 200: "#f5d0fe";
        readonly 300: "#f0abfc";
        readonly 400: "#e879f9";
        readonly 500: "#d946ef";
        readonly 600: "#c026d3";
        readonly 700: "#a21caf";
        readonly 800: "#86198f";
        readonly 900: "#701a75";
    };
    readonly purple: {
        readonly 50: "#faf5ff";
        readonly 100: "#f3e8ff";
        readonly 200: "#e9d5ff";
        readonly 300: "#d8b4fe";
        readonly 400: "#c084fc";
        readonly 500: "#a855f7";
        readonly 600: "#9333ea";
        readonly 700: "#7e22ce";
        readonly 800: "#6b21a8";
        readonly 900: "#581c87";
    };
    readonly violet: {
        readonly 50: "#f5f3ff";
        readonly 100: "#ede9fe";
        readonly 200: "#ddd6fe";
        readonly 300: "#c4b5fd";
        readonly 400: "#a78bfa";
        readonly 500: "#8b5cf6";
        readonly 600: "#7c3aed";
        readonly 700: "#6d28d9";
        readonly 800: "#5b21b6";
        readonly 900: "#4c1d95";
    };
    readonly indigo: {
        readonly 50: "#eef2ff";
        readonly 100: "#e0e7ff";
        readonly 200: "#c7d2fe";
        readonly 300: "#a5b4fc";
        readonly 400: "#818cf8";
        readonly 500: "#6366f1";
        readonly 600: "#4f46e5";
        readonly 700: "#4338ca";
        readonly 800: "#3730a3";
        readonly 900: "#312e81";
    };
    readonly blue: {
        readonly 50: "#eff6ff";
        readonly 100: "#dbeafe";
        readonly 200: "#bfdbfe";
        readonly 300: "#93c5fd";
        readonly 400: "#60a5fa";
        readonly 500: "#3b82f6";
        readonly 600: "#2563eb";
        readonly 700: "#1d4ed8";
        readonly 800: "#1e40af";
        readonly 900: "#1e3a8a";
    };
    readonly lightBlue: {
        readonly 50: "#f0f9ff";
        readonly 100: "#e0f2fe";
        readonly 200: "#bae6fd";
        readonly 300: "#7dd3fc";
        readonly 400: "#38bdf8";
        readonly 500: "#0ea5e9";
        readonly 600: "#0284c7";
        readonly 700: "#0369a1";
        readonly 800: "#075985";
        readonly 900: "#0c4a6e";
    };
    readonly darkBlue: {
        readonly 50: "#dbf4ff";
        readonly 100: "#addbff";
        readonly 200: "#7cc2ff";
        readonly 300: "#4aa9ff";
        readonly 400: "#1a91ff";
        readonly 500: "#0077e6";
        readonly 600: "#005db4";
        readonly 700: "#004282";
        readonly 800: "#002851";
        readonly 900: "#000e21";
    };
    readonly cyan: {
        readonly 50: "#ecfeff";
        readonly 100: "#cffafe";
        readonly 200: "#a5f3fc";
        readonly 300: "#67e8f9";
        readonly 400: "#22d3ee";
        readonly 500: "#06b6d4";
        readonly 600: "#0891b2";
        readonly 700: "#0e7490";
        readonly 800: "#155e75";
        readonly 900: "#164e63";
    };
    readonly teal: {
        readonly 50: "#f0fdfa";
        readonly 100: "#ccfbf1";
        readonly 200: "#99f6e4";
        readonly 300: "#5eead4";
        readonly 400: "#2dd4bf";
        readonly 500: "#14b8a6";
        readonly 600: "#0d9488";
        readonly 700: "#0f766e";
        readonly 800: "#115e59";
        readonly 900: "#134e4a";
    };
    readonly emerald: {
        readonly 50: "#ecfdf5";
        readonly 100: "#d1fae5";
        readonly 200: "#a7f3d0";
        readonly 300: "#6ee7b7";
        readonly 400: "#34d399";
        readonly 500: "#10b981";
        readonly 600: "#059669";
        readonly 700: "#047857";
        readonly 800: "#065f46";
        readonly 900: "#064e3b";
    };
    readonly green: {
        readonly 50: "#f0fdf4";
        readonly 100: "#dcfce7";
        readonly 200: "#bbf7d0";
        readonly 300: "#86efac";
        readonly 400: "#4ade80";
        readonly 500: "#22c55e";
        readonly 600: "#16a34a";
        readonly 700: "#15803d";
        readonly 800: "#166534";
        readonly 900: "#14532d";
    };
    readonly lime: {
        readonly 50: "#f7fee7";
        readonly 100: "#ecfccb";
        readonly 200: "#d9f99d";
        readonly 300: "#bef264";
        readonly 400: "#a3e635";
        readonly 500: "#84cc16";
        readonly 600: "#65a30d";
        readonly 700: "#4d7c0f";
        readonly 800: "#3f6212";
        readonly 900: "#365314";
    };
    readonly yellow: {
        readonly 50: "#fefce8";
        readonly 100: "#fef9c3";
        readonly 200: "#fef08a";
        readonly 300: "#fde047";
        readonly 400: "#facc15";
        readonly 500: "#eab308";
        readonly 600: "#ca8a04";
        readonly 700: "#a16207";
        readonly 800: "#854d0e";
        readonly 900: "#713f12";
    };
    readonly amber: {
        readonly 50: "#fffbeb";
        readonly 100: "#fef3c7";
        readonly 200: "#fde68a";
        readonly 300: "#fcd34d";
        readonly 400: "#fbbf24";
        readonly 500: "#f59e0b";
        readonly 600: "#d97706";
        readonly 700: "#b45309";
        readonly 800: "#92400e";
        readonly 900: "#78350f";
    };
    readonly orange: {
        readonly 50: "#fff7ed";
        readonly 100: "#ffedd5";
        readonly 200: "#fed7aa";
        readonly 300: "#fdba74";
        readonly 400: "#fb923c";
        readonly 500: "#f97316";
        readonly 600: "#ea580c";
        readonly 700: "#c2410c";
        readonly 800: "#9a3412";
        readonly 900: "#7c2d12";
    };
    readonly red: {
        readonly 50: "#fef2f2";
        readonly 100: "#fee2e2";
        readonly 200: "#fecaca";
        readonly 300: "#fca5a5";
        readonly 400: "#f87171";
        readonly 500: "#ef4444";
        readonly 600: "#dc2626";
        readonly 700: "#b91c1c";
        readonly 800: "#991b1b";
        readonly 900: "#7f1d1d";
    };
    readonly warmGray: {
        readonly 50: "#fafaf9";
        readonly 100: "#f5f5f4";
        readonly 200: "#e7e5e4";
        readonly 300: "#d6d3d1";
        readonly 400: "#a8a29e";
        readonly 500: "#78716c";
        readonly 600: "#57534e";
        readonly 700: "#44403c";
        readonly 800: "#292524";
        readonly 900: "#1c1917";
    };
    readonly trueGray: {
        readonly 50: "#fafafa";
        readonly 100: "#f5f5f5";
        readonly 200: "#e5e5e5";
        readonly 300: "#d4d4d4";
        readonly 400: "#a3a3a3";
        readonly 500: "#737373";
        readonly 600: "#525252";
        readonly 700: "#404040";
        readonly 800: "#262626";
        readonly 900: "#171717";
    };
    readonly gray: {
        readonly 1: "#FFFFFF";
        readonly 50: "#fafafa";
        readonly 100: "#f4f4f5";
        readonly 200: "#e4e4e7";
        readonly 300: "#d4d4d8";
        readonly 400: "#a1a1aa";
        readonly 500: "#71717a";
        readonly 600: "#52525b";
        readonly 700: "#3f3f46";
        readonly 800: "#27272a";
        readonly 900: "#18181b";
    };
    readonly coolGray: {
        readonly 50: "#f9fafb";
        readonly 100: "#f3f4f6";
        readonly 200: "#e5e7eb";
        readonly 300: "#d1d5db";
        readonly 400: "#9ca3af";
        readonly 500: "#6b7280";
        readonly 600: "#4b5563";
        readonly 700: "#374151";
        readonly 800: "#1f2937";
        readonly 900: "#111827";
    };
    readonly blueGray: {
        readonly 50: "#f8fafc";
        readonly 100: "#f1f5f9";
        readonly 200: "#e2e8f0";
        readonly 300: "#cbd5e1";
        readonly 400: "#94a3b8";
        readonly 500: "#64748b";
        readonly 600: "#475569";
        readonly 700: "#334155";
        readonly 800: "#1e293b";
        readonly 900: "#0f172a";
    };
    readonly dark: {
        readonly 50: "#18181b";
        readonly 100: "#27272a";
        readonly 200: "#3f3f46";
        readonly 300: "#52525b";
        readonly 400: "#71717a";
        readonly 500: "#a1a1aa";
        readonly 600: "#d4d4d8";
        readonly 700: "#e4e4e7";
        readonly 800: "#f4f4f5";
        readonly 900: "#fafafa";
    };
};
declare const darkColors: {
    primary: "#60a5fa";
    button_hover: "#4f46e5";
    button_primary: "#6366f1";
    cardBg: "#1f2937";
    textColor: "#f9fafb";
    borderColor: "#f9fafb";
    shadowColor: "#f9fafb";
    hover: "#1e40af";
    pressed: "#1e3a8a";
    pressed_secondary: "#60a5fa";
};
declare const lightColors: {
    primary: "#f59e0b";
    button_hover: "#4338ca";
    button_primary: "#4f46e5";
    cardBg: "#f9fafb";
    textColor: "#111827";
    borderColor: "#111827";
    shadowColor: "#111827";
    hover: "#dbeafe";
    pressed: "#bfdbfe";
    pressed_secondary: "#60a5fa";
};
declare const theme: {
    readonly colors: {
        readonly background: "#fafafa";
        readonly surface: "#FFFFFF";
        readonly surfaceMuted: "#f4f4f5";
        readonly text: "#18181b";
        readonly textMuted: "#71717a";
        readonly textSoft: "#a1a1aa";
        readonly border: "#e4e4e7";
        readonly divider: "#e4e4e7";
        readonly success: "#16a34a";
        readonly warning: "#f59e0b";
        readonly danger: "#dc2626";
        readonly info: "#2563eb";
        readonly primary: "#f59e0b";
        readonly button_hover: "#4338ca";
        readonly button_primary: "#4f46e5";
        readonly cardBg: "#f9fafb";
        readonly textColor: "#111827";
        readonly borderColor: "#111827";
        readonly shadowColor: "#111827";
        readonly hover: "#dbeafe";
        readonly pressed: "#bfdbfe";
        readonly pressed_secondary: "#60a5fa";
        readonly white: "#FFFFFF";
        readonly black: "#000000";
        readonly lightText: "#FFFFFF";
        readonly darkText: "#000000";
        readonly transparent: "rgba(0, 0, 0, 0)";
        readonly transparent05: "rgba(0, 0, 0, 0.5)";
        readonly transparent09: "rgba(0, 0, 0, 0.9)";
        readonly rose: {
            readonly 50: "#fff1f2";
            readonly 100: "#ffe4e6";
            readonly 200: "#fecdd3";
            readonly 300: "#fda4af";
            readonly 400: "#fb7185";
            readonly 500: "#f43f5e";
            readonly 600: "#e11d48";
            readonly 700: "#be123c";
            readonly 800: "#9f1239";
            readonly 900: "#881337";
        };
        readonly pink: {
            readonly 50: "#fdf2f8";
            readonly 100: "#fce7f3";
            readonly 200: "#fbcfe8";
            readonly 300: "#f9a8d4";
            readonly 400: "#f472b6";
            readonly 500: "#ec4899";
            readonly 600: "#db2777";
            readonly 700: "#be185d";
            readonly 800: "#9d174d";
            readonly 900: "#831843";
        };
        readonly fuchsia: {
            readonly 50: "#fdf4ff";
            readonly 100: "#fae8ff";
            readonly 200: "#f5d0fe";
            readonly 300: "#f0abfc";
            readonly 400: "#e879f9";
            readonly 500: "#d946ef";
            readonly 600: "#c026d3";
            readonly 700: "#a21caf";
            readonly 800: "#86198f";
            readonly 900: "#701a75";
        };
        readonly purple: {
            readonly 50: "#faf5ff";
            readonly 100: "#f3e8ff";
            readonly 200: "#e9d5ff";
            readonly 300: "#d8b4fe";
            readonly 400: "#c084fc";
            readonly 500: "#a855f7";
            readonly 600: "#9333ea";
            readonly 700: "#7e22ce";
            readonly 800: "#6b21a8";
            readonly 900: "#581c87";
        };
        readonly violet: {
            readonly 50: "#f5f3ff";
            readonly 100: "#ede9fe";
            readonly 200: "#ddd6fe";
            readonly 300: "#c4b5fd";
            readonly 400: "#a78bfa";
            readonly 500: "#8b5cf6";
            readonly 600: "#7c3aed";
            readonly 700: "#6d28d9";
            readonly 800: "#5b21b6";
            readonly 900: "#4c1d95";
        };
        readonly indigo: {
            readonly 50: "#eef2ff";
            readonly 100: "#e0e7ff";
            readonly 200: "#c7d2fe";
            readonly 300: "#a5b4fc";
            readonly 400: "#818cf8";
            readonly 500: "#6366f1";
            readonly 600: "#4f46e5";
            readonly 700: "#4338ca";
            readonly 800: "#3730a3";
            readonly 900: "#312e81";
        };
        readonly blue: {
            readonly 50: "#eff6ff";
            readonly 100: "#dbeafe";
            readonly 200: "#bfdbfe";
            readonly 300: "#93c5fd";
            readonly 400: "#60a5fa";
            readonly 500: "#3b82f6";
            readonly 600: "#2563eb";
            readonly 700: "#1d4ed8";
            readonly 800: "#1e40af";
            readonly 900: "#1e3a8a";
        };
        readonly lightBlue: {
            readonly 50: "#f0f9ff";
            readonly 100: "#e0f2fe";
            readonly 200: "#bae6fd";
            readonly 300: "#7dd3fc";
            readonly 400: "#38bdf8";
            readonly 500: "#0ea5e9";
            readonly 600: "#0284c7";
            readonly 700: "#0369a1";
            readonly 800: "#075985";
            readonly 900: "#0c4a6e";
        };
        readonly darkBlue: {
            readonly 50: "#dbf4ff";
            readonly 100: "#addbff";
            readonly 200: "#7cc2ff";
            readonly 300: "#4aa9ff";
            readonly 400: "#1a91ff";
            readonly 500: "#0077e6";
            readonly 600: "#005db4";
            readonly 700: "#004282";
            readonly 800: "#002851";
            readonly 900: "#000e21";
        };
        readonly cyan: {
            readonly 50: "#ecfeff";
            readonly 100: "#cffafe";
            readonly 200: "#a5f3fc";
            readonly 300: "#67e8f9";
            readonly 400: "#22d3ee";
            readonly 500: "#06b6d4";
            readonly 600: "#0891b2";
            readonly 700: "#0e7490";
            readonly 800: "#155e75";
            readonly 900: "#164e63";
        };
        readonly teal: {
            readonly 50: "#f0fdfa";
            readonly 100: "#ccfbf1";
            readonly 200: "#99f6e4";
            readonly 300: "#5eead4";
            readonly 400: "#2dd4bf";
            readonly 500: "#14b8a6";
            readonly 600: "#0d9488";
            readonly 700: "#0f766e";
            readonly 800: "#115e59";
            readonly 900: "#134e4a";
        };
        readonly emerald: {
            readonly 50: "#ecfdf5";
            readonly 100: "#d1fae5";
            readonly 200: "#a7f3d0";
            readonly 300: "#6ee7b7";
            readonly 400: "#34d399";
            readonly 500: "#10b981";
            readonly 600: "#059669";
            readonly 700: "#047857";
            readonly 800: "#065f46";
            readonly 900: "#064e3b";
        };
        readonly green: {
            readonly 50: "#f0fdf4";
            readonly 100: "#dcfce7";
            readonly 200: "#bbf7d0";
            readonly 300: "#86efac";
            readonly 400: "#4ade80";
            readonly 500: "#22c55e";
            readonly 600: "#16a34a";
            readonly 700: "#15803d";
            readonly 800: "#166534";
            readonly 900: "#14532d";
        };
        readonly lime: {
            readonly 50: "#f7fee7";
            readonly 100: "#ecfccb";
            readonly 200: "#d9f99d";
            readonly 300: "#bef264";
            readonly 400: "#a3e635";
            readonly 500: "#84cc16";
            readonly 600: "#65a30d";
            readonly 700: "#4d7c0f";
            readonly 800: "#3f6212";
            readonly 900: "#365314";
        };
        readonly yellow: {
            readonly 50: "#fefce8";
            readonly 100: "#fef9c3";
            readonly 200: "#fef08a";
            readonly 300: "#fde047";
            readonly 400: "#facc15";
            readonly 500: "#eab308";
            readonly 600: "#ca8a04";
            readonly 700: "#a16207";
            readonly 800: "#854d0e";
            readonly 900: "#713f12";
        };
        readonly amber: {
            readonly 50: "#fffbeb";
            readonly 100: "#fef3c7";
            readonly 200: "#fde68a";
            readonly 300: "#fcd34d";
            readonly 400: "#fbbf24";
            readonly 500: "#f59e0b";
            readonly 600: "#d97706";
            readonly 700: "#b45309";
            readonly 800: "#92400e";
            readonly 900: "#78350f";
        };
        readonly orange: {
            readonly 50: "#fff7ed";
            readonly 100: "#ffedd5";
            readonly 200: "#fed7aa";
            readonly 300: "#fdba74";
            readonly 400: "#fb923c";
            readonly 500: "#f97316";
            readonly 600: "#ea580c";
            readonly 700: "#c2410c";
            readonly 800: "#9a3412";
            readonly 900: "#7c2d12";
        };
        readonly red: {
            readonly 50: "#fef2f2";
            readonly 100: "#fee2e2";
            readonly 200: "#fecaca";
            readonly 300: "#fca5a5";
            readonly 400: "#f87171";
            readonly 500: "#ef4444";
            readonly 600: "#dc2626";
            readonly 700: "#b91c1c";
            readonly 800: "#991b1b";
            readonly 900: "#7f1d1d";
        };
        readonly warmGray: {
            readonly 50: "#fafaf9";
            readonly 100: "#f5f5f4";
            readonly 200: "#e7e5e4";
            readonly 300: "#d6d3d1";
            readonly 400: "#a8a29e";
            readonly 500: "#78716c";
            readonly 600: "#57534e";
            readonly 700: "#44403c";
            readonly 800: "#292524";
            readonly 900: "#1c1917";
        };
        readonly trueGray: {
            readonly 50: "#fafafa";
            readonly 100: "#f5f5f5";
            readonly 200: "#e5e5e5";
            readonly 300: "#d4d4d4";
            readonly 400: "#a3a3a3";
            readonly 500: "#737373";
            readonly 600: "#525252";
            readonly 700: "#404040";
            readonly 800: "#262626";
            readonly 900: "#171717";
        };
        readonly gray: {
            readonly 1: "#FFFFFF";
            readonly 50: "#fafafa";
            readonly 100: "#f4f4f5";
            readonly 200: "#e4e4e7";
            readonly 300: "#d4d4d8";
            readonly 400: "#a1a1aa";
            readonly 500: "#71717a";
            readonly 600: "#52525b";
            readonly 700: "#3f3f46";
            readonly 800: "#27272a";
            readonly 900: "#18181b";
        };
        readonly coolGray: {
            readonly 50: "#f9fafb";
            readonly 100: "#f3f4f6";
            readonly 200: "#e5e7eb";
            readonly 300: "#d1d5db";
            readonly 400: "#9ca3af";
            readonly 500: "#6b7280";
            readonly 600: "#4b5563";
            readonly 700: "#374151";
            readonly 800: "#1f2937";
            readonly 900: "#111827";
        };
        readonly blueGray: {
            readonly 50: "#f8fafc";
            readonly 100: "#f1f5f9";
            readonly 200: "#e2e8f0";
            readonly 300: "#cbd5e1";
            readonly 400: "#94a3b8";
            readonly 500: "#64748b";
            readonly 600: "#475569";
            readonly 700: "#334155";
            readonly 800: "#1e293b";
            readonly 900: "#0f172a";
        };
        readonly dark: {
            readonly 50: "#18181b";
            readonly 100: "#27272a";
            readonly 200: "#3f3f46";
            readonly 300: "#52525b";
            readonly 400: "#71717a";
            readonly 500: "#a1a1aa";
            readonly 600: "#d4d4d8";
            readonly 700: "#e4e4e7";
            readonly 800: "#f4f4f5";
            readonly 900: "#fafafa";
        };
    };
    readonly space: {
        readonly 0: 0;
        readonly 1: 1;
        readonly 2: 2;
        readonly 4: 4;
        readonly 6: 6;
        readonly 8: 8;
        readonly 10: 10;
        readonly 12: 12;
        readonly 14: 14;
        readonly 16: 16;
        readonly 18: 18;
        readonly 20: 20;
        readonly 24: 24;
        readonly 28: 28;
        readonly 32: 32;
        readonly 36: 36;
        readonly 40: 40;
        readonly 44: 44;
        readonly 48: 48;
        readonly 56: 56;
        readonly 64: 64;
        readonly 72: 72;
        readonly 80: 80;
        readonly 96: 96;
        readonly 112: 112;
        readonly 128: 128;
    };
    readonly fontWeight: {
        readonly thin: "100";
        readonly extraLight: "200";
        readonly light: "300";
        readonly normal: "400";
        readonly medium: "500";
        readonly semiBold: "600";
        readonly bold: "700";
        readonly extraBold: "800";
        readonly black: "900";
    };
    readonly fontSize: {
        readonly xs: 10;
        readonly sm: 12;
        readonly md: 14;
        readonly base: 16;
        readonly lg: 18;
        readonly xl: 20;
        readonly '2xl': 24;
        readonly '3xl': 28;
        readonly '4xl': 32;
        readonly '5xl': 40;
        readonly nano: 10;
        readonly micro: 12;
        readonly small: 14;
        readonly medium: 16;
        readonly normal: 18;
        readonly large: 20;
        readonly xlarge: 22;
        readonly xxlarge: 26;
        readonly xxxlarge: 30;
        readonly splash: 40;
    };
    readonly lineHeight: {
        readonly xs: 14;
        readonly sm: 16;
        readonly md: 18;
        readonly base: 20;
        readonly lg: 24;
        readonly xl: 28;
        readonly '2xl': 32;
        readonly '3xl': 36;
        readonly '4xl': 40;
        readonly '5xl': 48;
    };
    readonly radius: {
        readonly none: 0;
        readonly xs: 4;
        readonly sm: 6;
        readonly md: 8;
        readonly lg: 12;
        readonly xl: 16;
        readonly '2xl': 20;
        readonly '3xl': 24;
        readonly full: 9999;
    };
    readonly borderWidth: {
        readonly none: 0;
        readonly hairline: 0.5;
        readonly thin: 1;
        readonly medium: 1.5;
        readonly thick: 2;
        readonly heavy: 3;
    };
    readonly iconSize: {
        readonly xs: 12;
        readonly sm: 14;
        readonly md: 16;
        readonly lg: 20;
        readonly xl: 24;
        readonly '2xl': 28;
        readonly '3xl': 32;
    };
    readonly opacity: {
        readonly disabled: 0.4;
        readonly muted: 0.65;
        readonly overlay: 0.5;
        readonly pressed: 0.8;
    };
    readonly zIndex: {
        readonly base: 0;
        readonly dropdown: 1000;
        readonly sticky: 1100;
        readonly overlay: 1200;
        readonly modal: 1300;
        readonly toast: 1400;
        readonly tooltip: 1500;
    };
    readonly size: {
        readonly xs: 24;
        readonly sm: 32;
        readonly md: 40;
        readonly lg: 48;
        readonly xl: 56;
        readonly '2xl': 64;
    };
    readonly shadow: {
        readonly none: {
            readonly shadowColor: "transparent";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 0;
            };
            readonly shadowOpacity: 0;
            readonly shadowRadius: 0;
            readonly elevation: 0;
        };
        readonly sm: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 1;
            };
            readonly shadowOpacity: 0.08;
            readonly shadowRadius: 2;
            readonly elevation: 1;
        };
        readonly md: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 4;
            };
            readonly shadowOpacity: 0.12;
            readonly shadowRadius: 8;
            readonly elevation: 3;
        };
        readonly lg: {
            readonly shadowColor: "#000000";
            readonly shadowOffset: {
                readonly width: 0;
                readonly height: 8;
            };
            readonly shadowOpacity: 0.16;
            readonly shadowRadius: 16;
            readonly elevation: 6;
        };
    };
    readonly textAlign: {
        readonly left: {
            readonly textAlign: "left";
        };
        readonly right: {
            readonly textAlign: "right";
        };
        readonly center: {
            readonly textAlign: "center";
        };
        readonly justify: {
            readonly textAlign: "justify";
        };
    };
    readonly component: {
        readonly buttonHeight: {
            readonly sm: 32;
            readonly md: 40;
            readonly lg: 48;
        };
        readonly inputHeight: {
            readonly sm: 36;
            readonly md: 44;
            readonly lg: 52;
        };
        readonly tabBarHeight: 64;
        readonly headerHeight: 56;
        readonly bottomSheetHandleWidth: 40;
    };
};
export type Theme = typeof theme;
export { theme, lightColors, darkColors, palettes, fontStyles };
//# sourceMappingURL=theme.d.ts.map