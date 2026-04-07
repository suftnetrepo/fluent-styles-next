import React, { useState, useCallback, type ReactNode } from "react";
import {
  ScrollView,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Stack } from "../stack";
import { StyledText } from "../text";
import { StyledCheckBox } from "../checkBox";
import { StyledPressable } from "../pressable";
import { theme, palettes } from "../utiles/theme";

// ─── CompatNode ───────────────────────────────────────────────────────────────
type CompatNode = ReactNode;

// ─── Column definition ────────────────────────────────────────────────────────

export type ColumnAlign = "left" | "center" | "right";
export type SortDirection = "asc" | "desc" | null;

export interface TableColumn<T = any> {
  /** Unique key — must match a key of the row data object */
  key:        string;
  /** Header label */
  title:      string;
  /** Fixed column width in px. If omitted the column stretches (flex: 1). */
  width?:     number;
  /** Text alignment within the column — default "left" */
  align?:     ColumnAlign;
  /** Allow sorting on this column */
  sortable?:  boolean;
  /** Custom cell renderer. Receives the cell value + full row object + row index. */
  render?:    (value: any, row: T, index: number) => CompatNode;
}

// ─── Row data ─────────────────────────────────────────────────────────────────

export interface TableRow {
  /** Must be unique across all rows */
  id: string | number;
  [key: string]: any;
}

// ─── Color tokens ─────────────────────────────────────────────────────────────

export interface TableColors {
  background:       string;
  headerBg:         string;
  headerText:       string;
  rowBg:            string;
  rowAltBg:         string;
  rowHoverBg:       string;
  selectedBg:       string;
  selectedBorder:   string;
  border:           string;
  divider:          string;
  text:             string;
  subText:          string;
  sortActive:       string;
  sortInactive:     string;
  checkboxChecked:  string;
  emptyText:        string;
}

const DEFAULT_COLORS: TableColors = {
  background:      palettes.white,
  headerBg:        theme.colors.gray[50],
  headerText:      theme.colors.gray[400],
  rowBg:           palettes.white,
  rowAltBg:        palettes.white,
  rowHoverBg:      theme.colors.gray[50],
  selectedBg:      palettes.indigo[50],
  selectedBorder:  palettes.indigo[200],
  border:          theme.colors.gray[100],
  divider:         theme.colors.gray[100],
  text:            theme.colors.gray[900],
  subText:         theme.colors.gray[400],
  sortActive:      theme.colors.gray[900],
  sortInactive:    theme.colors.gray[300],
  checkboxChecked: theme.colors.gray[900],
  emptyText:       theme.colors.gray[400],
};

// ─── Props ────────────────────────────────────────────────────────────────────

export interface StyledTableProps<T extends TableRow = TableRow> {
  columns:            TableColumn<T>[];
  data:               T[];

  // Selection
  selectable?:        boolean;
  selectedIds?:       (string | number)[];
  onSelectionChange?: (ids: (string | number)[]) => void;

  // Sorting
  sortKey?:           string | null;
  sortDirection?:     SortDirection;
  onSort?:            (key: string, direction: SortDirection) => void;

  // Pagination — internal (client-side)
  pagination?:        boolean;
  pageSize?:          number;

  // Pagination — external (server-side / Realm / SQLite)
  /**
   * Switch to external pagination mode.
   * The table renders `data` as-is (no internal slicing).
   * Parent is responsible for fetching the correct page.
   */
  externalPagination?: boolean;
  /** Current 0-based page index (controlled) */
  currentPage?:        number;
  /** Total number of pages from the datasource */
  totalPages?:         number;
  /** Total record count from the datasource */
  totalCount?:         number;
  /** Called when the user taps Prev / Next / a page number */
  onPageChange?:       (page: number) => void;
  /** Show a loading skeleton over the rows while fetching */
  loading?:            boolean;

  // Performance
  /**
   * Swap the row renderer from Stack.map → FlatList.
   * Use when rendering 30+ unpaginated rows.
   * Automatically true when data.length > 50 and pagination is off.
   * Has no effect in card mode (CardList always uses map).
   */
  virtualized?:       boolean;

  // Display
  striped?:           boolean;
  /** Show a horizontal divider between rows */
  showDivider?:       boolean;
  /** Horizontal scroll when content overflows */
  scrollable?:        boolean;
  /** Empty state content */
  emptyText?:         string;
  emptyNode?:         CompatNode;

  // Style
  colors?:            Partial<TableColors>;
  borderRadius?:      number;
  /** Show outer card border */
  bordered?:          boolean;

  // Responsive card mode
  /**
   * Width threshold below which rows render as cards instead of table rows.
   * Default: 768 (phone portrait).
   * Convenience shorthands: forceTable / forceCards override this entirely.
   */
  cardBreakpoint?:    number;
  /** Always render as a table regardless of screen width */
  forceTable?:        boolean;
  /** Always render as cards regardless of screen width */
  forceCards?:        boolean;
  /**
   * Custom card renderer for each row in card mode.
   * If omitted a default auto-generated card is shown using column definitions.
   */
  cardRender?:        (row: T, index: number, selected: boolean, onToggle?: () => void) => CompatNode;

  // Callbacks
  onRowPress?:        (row: T, index: number) => void;
}

// ─── Sort icon ────────────────────────────────────────────────────────────────

const SortIcon: React.FC<{
  direction: SortDirection;
  active: boolean;
  color: string;
  inactiveColor: string;
}> = ({ direction, active, color, inactiveColor }) => (
  <Stack gap={1} marginLeft={4}>
    <StyledText
      fontSize={8}
      lineHeight={9}
      color={active && direction === "asc" ? color : inactiveColor}
    >
      ▲
    </StyledText>
    <StyledText
      fontSize={8}
      lineHeight={9}
      color={active && direction === "desc" ? color : inactiveColor}
    >
      ▼
    </StyledText>
  </Stack>
);

// ─── Cell wrapper ─────────────────────────────────────────────────────────────

const Cell: React.FC<{
  width?:    number;
  align?:    ColumnAlign;
  children?: CompatNode;
  isFirst?:  boolean;
}> = ({ width, align = "left", children, isFirst }) => (
  <Stack
    flex={width ? undefined : 1}
    width={width}
    alignItems={
      align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start"
    }
    paddingHorizontal={isFirst ? 16 : 12}
    paddingVertical={14}
    justifyContent="center"
  >
    {children}
  </Stack>
);

// ─── StyledTable ──────────────────────────────────────────────────────────────


// ─── Card list (phone layout) ─────────────────────────────────────────────────

function CardList<T extends TableRow>({
  columns,
  data,
  selectable,
  selectedIds,
  onSelectionChange,
  cardRender,
  emptyText,
  emptyNode,
  pagination,
  pageSize,
  onRowPress,
  colors: colorOverrides,
  borderRadius,
}: StyledTableProps<T>) {
  const c = { ...DEFAULT_COLORS, ...colorOverrides };
  const br = borderRadius ?? 16;

  // internal selection
  const [internalSelected, setInternalSelected] = React.useState<(string | number)[]>([]);
  const selectedIds_ = selectedIds ?? internalSelected;

  const toggle = (id: string | number) => {
    const next = selectedIds_.includes(id)
      ? selectedIds_.filter((s) => s !== id)
      : [...selectedIds_, id];
    setInternalSelected(next);
    onSelectionChange?.(next);
  };

  // pagination
  const [page, setPage] = React.useState(0);
  const ps           = pageSize ?? 10;
  const totalPages   = Math.ceil(data.length / ps);
  const visible      = pagination ? data.slice(page * ps, (page + 1) * ps) : data;

  if (visible.length === 0) {
    return (
      <Stack paddingVertical={48} alignItems="center" justifyContent="center">
        {emptyNode ?? (
          <StyledText fontSize={14} color={c.emptyText}>{emptyText ?? "No data"}</StyledText>
        )}
      </Stack>
    );
  }

  return (
    <Stack gap={10}>
      {visible.map((row, idx) => {
        const isSelected = selectedIds_.includes(row.id);

        if (cardRender) {
          return (
            <React.Fragment key={row.id}>
              {cardRender(row, idx, isSelected, selectable ? () => toggle(row.id) : undefined)}
            </React.Fragment>
          );
        }

        // ── Default auto-card ─────────────────────────────────────────────
        // Uses column definitions to render label: value pairs.
        const [primary, ...rest] = columns;

        return (
          <StyledPressable
            key={row.id}
            onPress={() => onRowPress?.(row, idx)}
            disabled={!onRowPress && !selectable}
            borderRadius={br}
            borderWidth={1}
            borderColor={isSelected ? c.selectedBorder : c.border}
            backgroundColor={isSelected ? c.selectedBg : c.rowBg}
            borderLeftWidth={isSelected ? 3 : 1}
            borderLeftColor={isSelected ? c.selectedBorder : c.border}
            overflow="hidden"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 1,
            }}
          >
            {/* Card header — primary column + checkbox */}
            <Stack
              horizontal
              alignItems="center"
              justifyContent="space-between"
              paddingHorizontal={14}
              paddingVertical={12}
              borderBottomWidth={1}
              borderBottomColor={c.divider}
              backgroundColor={c.headerBg}
            >
              <Stack flex={1}>
                {primary.render
                  ? primary.render(row[primary.key], row, idx)
                  : (
                    <StyledText fontSize={14} fontWeight="700" color={c.text} numberOfLines={1}>
                      {row[primary.key]}
                    </StyledText>
                  )
                }
              </Stack>
              {selectable && (
                <StyledCheckBox
                  checked={isSelected}
                  onCheck={() => toggle(row.id)}
                  size={18}
                  checkedColor={c.checkboxChecked}
                />
              )}
            </Stack>

            {/* Card body — remaining columns as label/value pairs */}
            <Stack paddingHorizontal={14} paddingVertical={10} gap={8}>
              {rest.map((col) => (
                <Stack key={col.key} horizontal alignItems="center" justifyContent="space-between" gap={8}>
                  <StyledText fontSize={12} color={c.subText} fontWeight="500">
                    {col.title}
                  </StyledText>
                  <Stack alignItems="flex-end">
                    {col.render
                      ? col.render(row[col.key], row, idx)
                      : (
                        <StyledText fontSize={13} color={c.text}>
                          {row[col.key] ?? "—"}
                        </StyledText>
                      )
                    }
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </StyledPressable>
        );
      })}

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <Stack horizontal alignItems="center" justifyContent="space-between" paddingVertical={4}>
          <StyledText fontSize={12} color={c.subText}>
            {page * ps + 1}–{Math.min((page + 1) * ps, data.length)} of {data.length}
          </StyledText>
          <Stack horizontal gap={6}>
            <StyledPressable
              onPress={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              paddingHorizontal={12} paddingVertical={6}
              borderRadius={8} borderWidth={1}
              borderColor={page === 0 ? c.border : c.sortActive}
              opacity={page === 0 ? 0.4 : 1}
            >
              <StyledText fontSize={12} fontWeight="600" color={c.text}>← Prev</StyledText>
            </StyledPressable>
            <StyledPressable
              onPress={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              paddingHorizontal={12} paddingVertical={6}
              borderRadius={8} borderWidth={1}
              borderColor={page >= totalPages - 1 ? c.border : c.sortActive}
              opacity={page >= totalPages - 1 ? 0.4 : 1}
            >
              <StyledText fontSize={12} fontWeight="600" color={c.text}>Next →</StyledText>
            </StyledPressable>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

export function StyledTable<T extends TableRow = TableRow>({
  columns,
  data,

  selectable       = false,
  selectedIds: controlledSelectedIds,
  onSelectionChange,

  sortKey: controlledSortKey,
  sortDirection: controlledSortDir,
  onSort,

  pagination       = false,
  pageSize         = 10,

  striped          = false,
  showDivider      = true,
  scrollable       = false,
  emptyText        = "No data",
  emptyNode,

  colors: colorOverrides,
  borderRadius     = 16,
  bordered         = true,
  virtualized,
  cardBreakpoint   = 768,
  forceTable,
  forceCards,
  cardRender,

  externalPagination = false,
  currentPage       = 0,
  totalPages: externalTotalPages,
  totalCount,
  onPageChange,
  loading           = false,

  onRowPress,
}: StyledTableProps<T>) {
  const { width } = useWindowDimensions();
  const isCardMode = forceCards ? true : forceTable ? false : (cardBreakpoint > 0 && width < cardBreakpoint);

  // ── Card mode — render rows as stacked cards ─────────────────────────────
  if (isCardMode) {
    return (
      <CardList
        columns={columns}
        data={data}
        selectable={selectable}
        selectedIds={controlledSelectedIds}
        onSelectionChange={onSelectionChange}
        cardRender={cardRender}
        emptyText={emptyText}
        emptyNode={emptyNode}
        pagination={pagination}
        pageSize={pageSize}
        onRowPress={onRowPress}
        colors={colorOverrides}
        borderRadius={borderRadius}
      />
    );
  }

  const c = { ...DEFAULT_COLORS, ...colorOverrides };

  // ── Internal selection state (uncontrolled fallback) ───────────────────
  const [internalSelected, setInternalSelected] = useState<(string | number)[]>([]);
  const selectedIds = controlledSelectedIds ?? internalSelected;

  const toggleRow = useCallback((id: string | number) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((s) => s !== id)
      : [...selectedIds, id];
    setInternalSelected(next);
    onSelectionChange?.(next);
  }, [selectedIds, onSelectionChange]);

  const toggleAll = useCallback(() => {
    const allIds  = data.map((r) => r.id);
    const allSelected = allIds.every((id) => selectedIds.includes(id));
    const next    = allSelected ? [] : allIds;
    setInternalSelected(next);
    onSelectionChange?.(next);
  }, [data, selectedIds, onSelectionChange]);

  const allSelected   = data.length > 0 && data.every((r) => selectedIds.includes(r.id));

  // ── Internal sort state (uncontrolled fallback) ────────────────────────
  const [internalSortKey, setInternalSortKey] = useState<string | null>(null);
  const [internalSortDir, setInternalSortDir] = useState<SortDirection>(null);
  const activeSortKey = controlledSortKey ?? internalSortKey;
  const activeSortDir = controlledSortDir ?? internalSortDir;

  const handleSort = useCallback((key: string) => {
    const next: SortDirection =
      activeSortKey === key
        ? activeSortDir === "asc" ? "desc" : activeSortDir === "desc" ? null : "asc"
        : "asc";
    setInternalSortKey(next === null ? null : key);
    setInternalSortDir(next);
    onSort?.(key, next);
  }, [activeSortKey, activeSortDir, onSort]);

  // ── Client-side sort (used when onSort not provided) ───────────────────
  const sortedData = React.useMemo(() => {
    if (!activeSortKey || !activeSortDir || onSort) return data;
    return [...data].sort((a, b) => {
      const av = a[activeSortKey];
      const bv = b[activeSortKey];
      const cmp = typeof av === "number" && typeof bv === "number"
        ? av - bv
        : String(av ?? "").localeCompare(String(bv ?? ""));
      return activeSortDir === "asc" ? cmp : -cmp;
    });
  }, [data, activeSortKey, activeSortDir, onSort]);

  // ── Pagination ────────────────────────────────────────────────────────
  const [internalPage, setInternalPage] = useState(0);

  // External mode: parent controls page + data
  // Internal mode: we slice sortedData ourselves
  const page        = externalPagination ? currentPage : internalPage;
  const totalPages  = externalPagination
    ? (externalTotalPages ?? 1)
    : Math.ceil(sortedData.length / pageSize);
  const visibleData = externalPagination
    ? sortedData                   // parent already gave us just this page
    : pagination
      ? sortedData.slice(page * pageSize, (page + 1) * pageSize)
      : sortedData;

  // Auto-enable FlatList virtualisation for large unpaginated datasets
  const useVirtualized = virtualized ?? (!pagination && !externalPagination && visibleData.length > 50);

  const handlePageChange = (p: number) => {
    if (externalPagination) {
      onPageChange?.(p);
    } else {
      setInternalPage(p);
    }
  };

  // Row count label
  const rowStart = page * pageSize + 1;
  const rowEnd   = externalPagination
    ? (totalCount != null ? Math.min(rowStart + visibleData.length - 1, totalCount) : rowStart + visibleData.length - 1)
    : Math.min((page + 1) * pageSize, sortedData.length);
  const rowTotal = externalPagination ? (totalCount ?? "?") : sortedData.length;

  // ── Render ────────────────────────────────────────────────────────────
  const tableContent = (
    <Stack>
      {/* Header row */}
      <Stack
        horizontal
        backgroundColor={c.headerBg}
        borderTopLeftRadius={borderRadius}
        borderTopRightRadius={borderRadius}
        borderBottomWidth={1}
        borderBottomColor={c.border}
      >
        {selectable && (
          <Stack
            width={52}
            paddingHorizontal={16}
            paddingVertical={14}
            alignItems="center"
            justifyContent="center"
          >
            <StyledCheckBox
              checked={allSelected}
              onCheck={toggleAll}
              size={18}
              checkedColor={c.checkboxChecked}
            />
          </Stack>
        )}

        {columns.map((col, i) => (
          <Cell key={col.key} width={col.width} align={col.align} isFirst={i === 0 && !selectable}>
            <StyledPressable
              flexDirection="row"
              alignItems="center"
              onPress={col.sortable ? () => handleSort(col.key) : undefined}
              disabled={!col.sortable}
            >
              <StyledText
                fontSize={12}
                fontWeight="600"
                color={c.headerText}
                letterSpacing={0.3}
              >
                {col.title}
              </StyledText>
              {col.sortable && (
                <SortIcon
                  direction={activeSortDir}
                  active={activeSortKey === col.key}
                  color={c.sortActive}
                  inactiveColor={c.sortInactive}
                />
              )}
            </StyledPressable>
          </Cell>
        ))}
      </Stack>

      {/* Data rows */}
      {visibleData.length === 0 ? (
        <Stack
          paddingVertical={48}
          alignItems="center"
          justifyContent="center"
          backgroundColor={c.rowBg}
          borderBottomLeftRadius={borderRadius}
          borderBottomRightRadius={borderRadius}
        >
          {emptyNode ?? (
            <StyledText fontSize={14} color={c.emptyText}>{emptyText}</StyledText>
          )}
        </Stack>
      ) : useVirtualized ? (
        // ── FlatList path — only mounts rows in the viewport ────────────
        <FlatList
          data={visibleData}
          keyExtractor={(row) => String(row.id)}
          // Pass selectedIds + striped as extraData so FlatList knows to re-render
          // when selection changes (FlatList only re-renders items whose key changes
          // otherwise — extraData forces a full diff)
          extraData={[selectedIds, striped]}
          scrollEnabled={false}  // outer ScrollView handles scrolling
          renderItem={({ item: row, index: rowIndex }) => {
            const isSelected = selectedIds.includes(row.id);
            const isLast     = rowIndex === visibleData.length - 1;
            const isAlt      = striped && rowIndex % 2 !== 0;
            const rowBg      = isSelected ? c.selectedBg : isAlt ? c.rowAltBg : c.rowBg;
            return (
              <StyledPressable
                flexDirection="row"
                alignItems="center"
                backgroundColor={rowBg}
                borderLeftWidth={isSelected ? 3 : 0}
                borderLeftColor={isSelected ? c.selectedBorder : "transparent"}
                borderBottomWidth={showDivider && !isLast ? 1 : 0}
                borderBottomColor={c.divider}
                borderBottomLeftRadius={isLast ? borderRadius : 0}
                borderBottomRightRadius={isLast ? borderRadius : 0}
                onPress={() => onRowPress?.(row, rowIndex)}
                disabled={!onRowPress && !selectable}
              >
                {selectable && (
                  <Stack width={52} paddingHorizontal={16} paddingVertical={14}
                    alignItems="center" justifyContent="center">
                    <StyledCheckBox checked={isSelected} onCheck={() => toggleRow(row.id)}
                      size={18} checkedColor={c.checkboxChecked} />
                  </Stack>
                )}
                {columns.map((col, colIndex) => (
                  <Cell key={col.key} width={col.width} align={col.align}
                    isFirst={colIndex === 0 && !selectable}>
                    {col.render
                      ? col.render(row[col.key], row, rowIndex)
                      : <StyledText fontSize={14} color={c.text} numberOfLines={1}>{row[col.key] ?? "—"}</StyledText>
                    }
                  </Cell>
                ))}
              </StyledPressable>
            );
          }}
        />
      ) : (
        // ── Stack.map path — simple, best for ≤ 50 rows ─────────────────
        visibleData.map((row, rowIndex) => {
          const isSelected  = selectedIds.includes(row.id);
          const isLast      = rowIndex === visibleData.length - 1;
          const isAlt       = striped && rowIndex % 2 !== 0;

          const rowBg = isSelected
            ? c.selectedBg
            : isAlt
            ? c.rowAltBg
            : c.rowBg;

          return (
            <StyledPressable
              key={row.id}
              flexDirection="row"
              alignItems="center"
              backgroundColor={rowBg}
              borderLeftWidth={isSelected ? 3 : 0}
              borderLeftColor={isSelected ? c.selectedBorder : "transparent"}
              borderBottomWidth={showDivider && !isLast ? 1 : 0}
              borderBottomColor={c.divider}
              borderBottomLeftRadius={isLast ? borderRadius : 0}
              borderBottomRightRadius={isLast ? borderRadius : 0}
              onPress={() => onRowPress?.(row, rowIndex)}
              disabled={!onRowPress && !selectable}
            >
              {selectable && (
                <Stack
                  width={52}
                  paddingHorizontal={16}
                  paddingVertical={14}
                  alignItems="center"
                  justifyContent="center"
                >
                  <StyledCheckBox
                    checked={isSelected}
                    onCheck={() => toggleRow(row.id)}
                    size={18}
                    checkedColor={c.checkboxChecked}
                  />
                </Stack>
              )}

              {columns.map((col, colIndex) => (
                <Cell
                  key={col.key}
                  width={col.width}
                  align={col.align}
                  isFirst={colIndex === 0 && !selectable}
                >
                  {col.render
                    ? col.render(row[col.key], row, rowIndex)
                    : (
                      <StyledText
                        fontSize={14}
                        color={c.text}
                        numberOfLines={1}
                      >
                        {row[col.key] ?? "—"}
                      </StyledText>
                    )
                  }
                </Cell>
              ))}
            </StyledPressable>
          );
        })
      )}

      {/* Pagination footer */}
      {(pagination || externalPagination) && totalPages > 1 && (
        <Stack
          horizontal
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal={16}
          paddingVertical={12}
          borderTopWidth={1}
          borderTopColor={c.border}
          backgroundColor={c.headerBg}
          borderBottomLeftRadius={borderRadius}
          borderBottomRightRadius={borderRadius}
        >
          <StyledText fontSize={12} color={c.subText}>
            {rowStart}–{rowEnd} of {rowTotal}
          </StyledText>

          <Stack horizontal gap={6}>
            {/* Page number pills — show up to 5 around current page */}
            {Array.from({ length: totalPages }, (_, i) => i)
              .filter(i => i === 0 || i === totalPages - 1 || Math.abs(i - page) <= 1)
              .reduce<(number | "…")[]>((acc, i, idx, arr) => {
                if (idx > 0 && (i as number) - (arr[idx - 1] as number) > 1) acc.push("…");
                acc.push(i);
                return acc;
              }, [])
              .map((item, idx) =>
                item === "…" ? (
                  <StyledText key={`ellipsis-${idx}`} fontSize={12} color={c.subText} paddingHorizontal={4}>…</StyledText>
                ) : (
                  <StyledPressable
                    key={item}
                    onPress={() => handlePageChange(item as number)}
                    disabled={loading}
                    paddingHorizontal={10}
                    paddingVertical={6}
                    borderRadius={8}
                    borderWidth={1}
                    borderColor={page === item ? c.sortActive : c.border}
                    backgroundColor={page === item ? c.sortActive : "transparent"}
                  >
                    <StyledText
                      fontSize={12}
                      fontWeight="600"
                      color={page === item ? c.background : c.text}
                    >
                      {(item as number) + 1}
                    </StyledText>
                  </StyledPressable>
                )
              )
            }
            <StyledPressable
              onPress={() => handlePageChange(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1 || loading}
              paddingHorizontal={12}
              paddingVertical={6}
              borderRadius={8}
              borderWidth={1}
              borderColor={page >= totalPages - 1 ? c.border : c.sortActive}
              opacity={page >= totalPages - 1 ? 0.4 : 1}
            >
              <StyledText fontSize={12} fontWeight="600" color={c.text}>→</StyledText>
            </StyledPressable>
          </Stack>
        </Stack>
      )}

      {/* Loading overlay */}
      {loading && (
        <Stack
          position="absolute"
          top={0} left={0} right={0} bottom={0}
          backgroundColor="rgba(255,255,255,0.7)"
          alignItems="center"
          justifyContent="center"
          borderRadius={borderRadius}
        >
          <StyledText fontSize={13} color={c.subText}>Loading…</StyledText>
        </Stack>
      )}
    </Stack>
  );

  return (
    <Stack
      borderRadius={borderRadius}
      borderWidth={bordered ? 1 : 0}
      borderColor={c.border}
      overflow="hidden"
      backgroundColor={c.background}
      style={bordered ? {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
      } : undefined}
    >
      {scrollable ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tableContent}
        </ScrollView>
      ) : tableContent}
    </Stack>
  );
}

export default StyledTable;