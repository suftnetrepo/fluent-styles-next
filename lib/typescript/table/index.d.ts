import React, { type ReactNode } from "react";
type CompatNode = ReactNode;
export type ColumnAlign = "left" | "center" | "right";
export type SortDirection = "asc" | "desc" | null;
export interface TableColumn<T = any> {
    /** Unique key — must match a key of the row data object */
    key: string;
    /** Header label */
    title: string;
    /** Fixed column width in px. If omitted the column stretches (flex: 1). */
    width?: number;
    /** Text alignment within the column — default "left" */
    align?: ColumnAlign;
    /** Allow sorting on this column */
    sortable?: boolean;
    /** Custom cell renderer. Receives the cell value + full row object + row index. */
    render?: (value: any, row: T, index: number) => CompatNode;
}
export interface TableRow {
    /** Must be unique across all rows */
    id: string | number;
    [key: string]: any;
}
export interface TableColors {
    background: string;
    headerBg: string;
    headerText: string;
    rowBg: string;
    rowAltBg: string;
    rowHoverBg: string;
    selectedBg: string;
    selectedBorder: string;
    border: string;
    divider: string;
    text: string;
    subText: string;
    sortActive: string;
    sortInactive: string;
    checkboxChecked: string;
    emptyText: string;
}
export interface StyledTableProps<T extends TableRow = TableRow> {
    columns: TableColumn<T>[];
    data: T[];
    selectable?: boolean;
    selectedIds?: (string | number)[];
    onSelectionChange?: (ids: (string | number)[]) => void;
    sortKey?: string | null;
    sortDirection?: SortDirection;
    onSort?: (key: string, direction: SortDirection) => void;
    pagination?: boolean;
    pageSize?: number;
    /**
     * Switch to external pagination mode.
     * The table renders `data` as-is (no internal slicing).
     * Parent is responsible for fetching the correct page.
     */
    externalPagination?: boolean;
    /** Current 0-based page index (controlled) */
    currentPage?: number;
    /** Total number of pages from the datasource */
    totalPages?: number;
    /** Total record count from the datasource */
    totalCount?: number;
    /** Called when the user taps Prev / Next / a page number */
    onPageChange?: (page: number) => void;
    /** Show a loading skeleton over the rows while fetching */
    loading?: boolean;
    /**
     * Swap the row renderer from Stack.map → FlatList.
     * Use when rendering 30+ unpaginated rows.
     * Automatically true when data.length > 50 and pagination is off.
     * Has no effect in card mode (CardList always uses map).
     */
    virtualized?: boolean;
    striped?: boolean;
    /** Show a horizontal divider between rows */
    showDivider?: boolean;
    /** Horizontal scroll when content overflows */
    scrollable?: boolean;
    /** Empty state content */
    emptyText?: string;
    emptyNode?: CompatNode;
    colors?: Partial<TableColors>;
    borderRadius?: number;
    /** Show outer card border */
    bordered?: boolean;
    /**
     * Width threshold below which rows render as cards instead of table rows.
     * Default: 768 (phone portrait).
     * Convenience shorthands: forceTable / forceCards override this entirely.
     */
    cardBreakpoint?: number;
    /** Always render as a table regardless of screen width */
    forceTable?: boolean;
    /** Always render as cards regardless of screen width */
    forceCards?: boolean;
    /**
     * Custom card renderer for each row in card mode.
     * If omitted a default auto-generated card is shown using column definitions.
     */
    cardRender?: (row: T, index: number, selected: boolean, onToggle?: () => void) => CompatNode;
    onRowPress?: (row: T, index: number) => void;
}
export declare function StyledTable<T extends TableRow = TableRow>({ columns, data, selectable, selectedIds: controlledSelectedIds, onSelectionChange, sortKey: controlledSortKey, sortDirection: controlledSortDir, onSort, pagination, pageSize, striped, showDivider, scrollable, emptyText, emptyNode, colors: colorOverrides, borderRadius, bordered, virtualized, cardBreakpoint, forceTable, forceCards, cardRender, externalPagination, currentPage, totalPages: externalTotalPages, totalCount, onPageChange, loading, onRowPress, }: StyledTableProps<T>): React.JSX.Element;
export default StyledTable;
//# sourceMappingURL=index.d.ts.map