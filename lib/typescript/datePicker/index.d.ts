/**
 * StyledDatePicker.tsx
 * ─────────────────────
 * Production-ready date picker for fluent-styles apps.
 * Pure JS — no native deps. Built exclusively on fluent-styles primitives.
 *
 * Modes:    date | time | datetime | range | month
 * Variants: inline | sheet | input
 */
import React from 'react';
export type DatePickerMode = 'date' | 'time' | 'datetime' | 'range' | 'month';
export type DatePickerVariant = 'inline' | 'sheet' | 'input';
export type DatePickerSize = 'sm' | 'md' | 'lg';
export interface StyledDatePickerColors {
    selected?: string;
    selectedText?: string;
    today?: string;
    rangeFill?: string;
    dayText?: string;
    disabledText?: string;
    headerText?: string;
    background?: string;
    inputBorder?: string;
    confirmBg?: string;
    confirmText?: string;
}
export interface StyledDatePickerProps {
    mode?: DatePickerMode;
    variant?: DatePickerVariant;
    size?: DatePickerSize;
    value?: Date | null;
    valueStart?: Date | null;
    valueEnd?: Date | null;
    minDate?: Date;
    maxDate?: Date;
    showTodayButton?: boolean;
    showConfirm?: boolean;
    confirmLabel?: string;
    placeholder?: string;
    label?: string;
    formatDisplay?: (date: Date) => string;
    colors?: StyledDatePickerColors;
    onChange?: (date: Date) => void;
    onRangeChange?: (start: Date | null, end: Date | null) => void;
    onConfirm?: (date: Date | null) => void;
    disabled?: boolean;
}
/**
 * StyledDatePicker — pure-JS date/time picker built on fluent-styles.
 *
 * @example Inline date
 * ```tsx
 * <StyledDatePicker value={date} onChange={setDate} />
 * ```
 *
 * @example Input → bottom sheet
 * ```tsx
 * <StyledDatePicker
 *   variant="input"
 *   label="Check-in date"
 *   placeholder="Select date"
 *   value={date}
 *   onChange={setDate}
 *   onConfirm={setDate}
 * />
 * ```
 *
 * @example Date range
 * ```tsx
 * <StyledDatePicker
 *   mode="range"
 *   valueStart={start}
 *   valueEnd={end}
 *   onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
 *   colors={{ selected: '#6366f1', rangeFill: '#eef2ff' }}
 * />
 * ```
 *
 * @example Time picker
 * ```tsx
 * <StyledDatePicker mode="time" value={time} onChange={setTime} />
 * ```
 *
 * @example Month picker
 * ```tsx
 * <StyledDatePicker mode="month" value={month} onChange={setMonth} />
 * ```
 */
export declare const StyledDatePicker: React.FC<StyledDatePickerProps>;
export default StyledDatePicker;
//# sourceMappingURL=index.d.ts.map