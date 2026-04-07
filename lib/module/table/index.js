"use strict";

import React, { useState, useCallback } from "react";
import { ScrollView, FlatList, useWindowDimensions } from "react-native";
import { Stack } from "../stack/index.js";
import { StyledText } from "../text/index.js";
import { StyledCheckBox } from "../checkBox/index.js";
import { StyledPressable } from "../pressable/index.js";
import { theme, palettes } from "../utiles/theme.js";

// ─── CompatNode ───────────────────────────────────────────────────────────────

// ─── Column definition ────────────────────────────────────────────────────────

// ─── Row data ─────────────────────────────────────────────────────────────────

// ─── Color tokens ─────────────────────────────────────────────────────────────
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_COLORS = {
  background: palettes.white,
  headerBg: theme.colors.gray[50],
  headerText: theme.colors.gray[400],
  rowBg: palettes.white,
  rowAltBg: palettes.white,
  rowHoverBg: theme.colors.gray[50],
  selectedBg: palettes.indigo[50],
  selectedBorder: palettes.indigo[200],
  border: theme.colors.gray[100],
  divider: theme.colors.gray[100],
  text: theme.colors.gray[900],
  subText: theme.colors.gray[400],
  sortActive: theme.colors.gray[900],
  sortInactive: theme.colors.gray[300],
  checkboxChecked: theme.colors.gray[900],
  emptyText: theme.colors.gray[400]
};

// ─── Props ────────────────────────────────────────────────────────────────────

// ─── Sort icon ────────────────────────────────────────────────────────────────

const SortIcon = ({
  direction,
  active,
  color,
  inactiveColor
}) => /*#__PURE__*/_jsxs(Stack, {
  gap: 1,
  marginLeft: 4,
  children: [/*#__PURE__*/_jsx(StyledText, {
    fontSize: 8,
    lineHeight: 9,
    color: active && direction === "asc" ? color : inactiveColor,
    children: "\u25B2"
  }), /*#__PURE__*/_jsx(StyledText, {
    fontSize: 8,
    lineHeight: 9,
    color: active && direction === "desc" ? color : inactiveColor,
    children: "\u25BC"
  })]
});

// ─── Cell wrapper ─────────────────────────────────────────────────────────────

const Cell = ({
  width,
  align = "left",
  children,
  isFirst
}) => /*#__PURE__*/_jsx(Stack, {
  flex: width ? undefined : 1,
  width: width,
  alignItems: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
  paddingHorizontal: isFirst ? 16 : 12,
  paddingVertical: 14,
  justifyContent: "center",
  children: children
});

// ─── StyledTable ──────────────────────────────────────────────────────────────

// ─── Card list (phone layout) ─────────────────────────────────────────────────

function CardList({
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
  borderRadius
}) {
  const c = {
    ...DEFAULT_COLORS,
    ...colorOverrides
  };
  const br = borderRadius ?? 16;

  // internal selection
  const [internalSelected, setInternalSelected] = React.useState([]);
  const selectedIds_ = selectedIds ?? internalSelected;
  const toggle = id => {
    const next = selectedIds_.includes(id) ? selectedIds_.filter(s => s !== id) : [...selectedIds_, id];
    setInternalSelected(next);
    onSelectionChange?.(next);
  };

  // pagination
  const [page, setPage] = React.useState(0);
  const ps = pageSize ?? 10;
  const totalPages = Math.ceil(data.length / ps);
  const visible = pagination ? data.slice(page * ps, (page + 1) * ps) : data;
  if (visible.length === 0) {
    return /*#__PURE__*/_jsx(Stack, {
      paddingVertical: 48,
      alignItems: "center",
      justifyContent: "center",
      children: emptyNode ?? /*#__PURE__*/_jsx(StyledText, {
        fontSize: 14,
        color: c.emptyText,
        children: emptyText ?? "No data"
      })
    });
  }
  return /*#__PURE__*/_jsxs(Stack, {
    gap: 10,
    children: [visible.map((row, idx) => {
      const isSelected = selectedIds_.includes(row.id);
      if (cardRender) {
        return /*#__PURE__*/_jsx(React.Fragment, {
          children: cardRender(row, idx, isSelected, selectable ? () => toggle(row.id) : undefined)
        }, row.id);
      }

      // ── Default auto-card ─────────────────────────────────────────────
      // Uses column definitions to render label: value pairs.
      const [primary, ...rest] = columns;
      return /*#__PURE__*/_jsxs(StyledPressable, {
        onPress: () => onRowPress?.(row, idx),
        disabled: !onRowPress && !selectable,
        borderRadius: br,
        borderWidth: 1,
        borderColor: isSelected ? c.selectedBorder : c.border,
        backgroundColor: isSelected ? c.selectedBg : c.rowBg,
        borderLeftWidth: isSelected ? 3 : 1,
        borderLeftColor: isSelected ? c.selectedBorder : c.border,
        overflow: "hidden",
        style: {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 1
        },
        children: [/*#__PURE__*/_jsxs(Stack, {
          horizontal: true,
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 14,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: c.divider,
          backgroundColor: c.headerBg,
          children: [/*#__PURE__*/_jsx(Stack, {
            flex: 1,
            children: primary.render ? primary.render(row[primary.key], row, idx) : /*#__PURE__*/_jsx(StyledText, {
              fontSize: 14,
              fontWeight: "700",
              color: c.text,
              numberOfLines: 1,
              children: row[primary.key]
            })
          }), selectable && /*#__PURE__*/_jsx(StyledCheckBox, {
            checked: isSelected,
            onCheck: () => toggle(row.id),
            size: 18,
            checkedColor: c.checkboxChecked
          })]
        }), /*#__PURE__*/_jsx(Stack, {
          paddingHorizontal: 14,
          paddingVertical: 10,
          gap: 8,
          children: rest.map(col => /*#__PURE__*/_jsxs(Stack, {
            horizontal: true,
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            children: [/*#__PURE__*/_jsx(StyledText, {
              fontSize: 12,
              color: c.subText,
              fontWeight: "500",
              children: col.title
            }), /*#__PURE__*/_jsx(Stack, {
              alignItems: "flex-end",
              children: col.render ? col.render(row[col.key], row, idx) : /*#__PURE__*/_jsx(StyledText, {
                fontSize: 13,
                color: c.text,
                children: row[col.key] ?? "—"
              })
            })]
          }, col.key))
        })]
      }, row.id);
    }), pagination && totalPages > 1 && /*#__PURE__*/_jsxs(Stack, {
      horizontal: true,
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 4,
      children: [/*#__PURE__*/_jsxs(StyledText, {
        fontSize: 12,
        color: c.subText,
        children: [page * ps + 1, "\u2013", Math.min((page + 1) * ps, data.length), " of ", data.length]
      }), /*#__PURE__*/_jsxs(Stack, {
        horizontal: true,
        gap: 6,
        children: [/*#__PURE__*/_jsx(StyledPressable, {
          onPress: () => setPage(p => Math.max(0, p - 1)),
          disabled: page === 0,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: page === 0 ? c.border : c.sortActive,
          opacity: page === 0 ? 0.4 : 1,
          children: /*#__PURE__*/_jsx(StyledText, {
            fontSize: 12,
            fontWeight: "600",
            color: c.text,
            children: "\u2190 Prev"
          })
        }), /*#__PURE__*/_jsx(StyledPressable, {
          onPress: () => setPage(p => Math.min(totalPages - 1, p + 1)),
          disabled: page >= totalPages - 1,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: page >= totalPages - 1 ? c.border : c.sortActive,
          opacity: page >= totalPages - 1 ? 0.4 : 1,
          children: /*#__PURE__*/_jsx(StyledText, {
            fontSize: 12,
            fontWeight: "600",
            color: c.text,
            children: "Next \u2192"
          })
        })]
      })]
    })]
  });
}
export function StyledTable({
  columns,
  data,
  selectable = false,
  selectedIds: controlledSelectedIds,
  onSelectionChange,
  sortKey: controlledSortKey,
  sortDirection: controlledSortDir,
  onSort,
  pagination = false,
  pageSize = 10,
  striped = false,
  showDivider = true,
  scrollable = false,
  emptyText = "No data",
  emptyNode,
  colors: colorOverrides,
  borderRadius = 16,
  bordered = true,
  virtualized,
  cardBreakpoint = 768,
  forceTable,
  forceCards,
  cardRender,
  externalPagination = false,
  currentPage = 0,
  totalPages: externalTotalPages,
  totalCount,
  onPageChange,
  loading = false,
  onRowPress
}) {
  const {
    width
  } = useWindowDimensions();
  const isCardMode = forceCards ? true : forceTable ? false : cardBreakpoint > 0 && width < cardBreakpoint;

  // ── Card mode — render rows as stacked cards ─────────────────────────────
  if (isCardMode) {
    return /*#__PURE__*/_jsx(CardList, {
      columns: columns,
      data: data,
      selectable: selectable,
      selectedIds: controlledSelectedIds,
      onSelectionChange: onSelectionChange,
      cardRender: cardRender,
      emptyText: emptyText,
      emptyNode: emptyNode,
      pagination: pagination,
      pageSize: pageSize,
      onRowPress: onRowPress,
      colors: colorOverrides,
      borderRadius: borderRadius
    });
  }
  const c = {
    ...DEFAULT_COLORS,
    ...colorOverrides
  };

  // ── Internal selection state (uncontrolled fallback) ───────────────────
  const [internalSelected, setInternalSelected] = useState([]);
  const selectedIds = controlledSelectedIds ?? internalSelected;
  const toggleRow = useCallback(id => {
    const next = selectedIds.includes(id) ? selectedIds.filter(s => s !== id) : [...selectedIds, id];
    setInternalSelected(next);
    onSelectionChange?.(next);
  }, [selectedIds, onSelectionChange]);
  const toggleAll = useCallback(() => {
    const allIds = data.map(r => r.id);
    const allSelected = allIds.every(id => selectedIds.includes(id));
    const next = allSelected ? [] : allIds;
    setInternalSelected(next);
    onSelectionChange?.(next);
  }, [data, selectedIds, onSelectionChange]);
  const allSelected = data.length > 0 && data.every(r => selectedIds.includes(r.id));

  // ── Internal sort state (uncontrolled fallback) ────────────────────────
  const [internalSortKey, setInternalSortKey] = useState(null);
  const [internalSortDir, setInternalSortDir] = useState(null);
  const activeSortKey = controlledSortKey ?? internalSortKey;
  const activeSortDir = controlledSortDir ?? internalSortDir;
  const handleSort = useCallback(key => {
    const next = activeSortKey === key ? activeSortDir === "asc" ? "desc" : activeSortDir === "desc" ? null : "asc" : "asc";
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
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av ?? "").localeCompare(String(bv ?? ""));
      return activeSortDir === "asc" ? cmp : -cmp;
    });
  }, [data, activeSortKey, activeSortDir, onSort]);

  // ── Pagination ────────────────────────────────────────────────────────
  const [internalPage, setInternalPage] = useState(0);

  // External mode: parent controls page + data
  // Internal mode: we slice sortedData ourselves
  const page = externalPagination ? currentPage : internalPage;
  const totalPages = externalPagination ? externalTotalPages ?? 1 : Math.ceil(sortedData.length / pageSize);
  const visibleData = externalPagination ? sortedData // parent already gave us just this page
  : pagination ? sortedData.slice(page * pageSize, (page + 1) * pageSize) : sortedData;

  // Auto-enable FlatList virtualisation for large unpaginated datasets
  const useVirtualized = virtualized ?? (!pagination && !externalPagination && visibleData.length > 50);
  const handlePageChange = p => {
    if (externalPagination) {
      onPageChange?.(p);
    } else {
      setInternalPage(p);
    }
  };

  // Row count label
  const rowStart = page * pageSize + 1;
  const rowEnd = externalPagination ? totalCount != null ? Math.min(rowStart + visibleData.length - 1, totalCount) : rowStart + visibleData.length - 1 : Math.min((page + 1) * pageSize, sortedData.length);
  const rowTotal = externalPagination ? totalCount ?? "?" : sortedData.length;

  // ── Render ────────────────────────────────────────────────────────────
  const tableContent = /*#__PURE__*/_jsxs(Stack, {
    children: [/*#__PURE__*/_jsxs(Stack, {
      horizontal: true,
      backgroundColor: c.headerBg,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
      children: [selectable && /*#__PURE__*/_jsx(Stack, {
        width: 52,
        paddingHorizontal: 16,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
        children: /*#__PURE__*/_jsx(StyledCheckBox, {
          checked: allSelected,
          onCheck: toggleAll,
          size: 18,
          checkedColor: c.checkboxChecked
        })
      }), columns.map((col, i) => /*#__PURE__*/_jsx(Cell, {
        width: col.width,
        align: col.align,
        isFirst: i === 0 && !selectable,
        children: /*#__PURE__*/_jsxs(StyledPressable, {
          flexDirection: "row",
          alignItems: "center",
          onPress: col.sortable ? () => handleSort(col.key) : undefined,
          disabled: !col.sortable,
          children: [/*#__PURE__*/_jsx(StyledText, {
            fontSize: 12,
            fontWeight: "600",
            color: c.headerText,
            letterSpacing: 0.3,
            children: col.title
          }), col.sortable && /*#__PURE__*/_jsx(SortIcon, {
            direction: activeSortDir,
            active: activeSortKey === col.key,
            color: c.sortActive,
            inactiveColor: c.sortInactive
          })]
        })
      }, col.key))]
    }), visibleData.length === 0 ? /*#__PURE__*/_jsx(Stack, {
      paddingVertical: 48,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: c.rowBg,
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      children: emptyNode ?? /*#__PURE__*/_jsx(StyledText, {
        fontSize: 14,
        color: c.emptyText,
        children: emptyText
      })
    }) : useVirtualized ?
    /*#__PURE__*/
    // ── FlatList path — only mounts rows in the viewport ────────────
    _jsx(FlatList, {
      data: visibleData,
      keyExtractor: row => String(row.id)
      // Pass selectedIds + striped as extraData so FlatList knows to re-render
      // when selection changes (FlatList only re-renders items whose key changes
      // otherwise — extraData forces a full diff)
      ,
      extraData: [selectedIds, striped],
      scrollEnabled: false // outer ScrollView handles scrolling
      ,
      renderItem: ({
        item: row,
        index: rowIndex
      }) => {
        const isSelected = selectedIds.includes(row.id);
        const isLast = rowIndex === visibleData.length - 1;
        const isAlt = striped && rowIndex % 2 !== 0;
        const rowBg = isSelected ? c.selectedBg : isAlt ? c.rowAltBg : c.rowBg;
        return /*#__PURE__*/_jsxs(StyledPressable, {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: rowBg,
          borderLeftWidth: isSelected ? 3 : 0,
          borderLeftColor: isSelected ? c.selectedBorder : "transparent",
          borderBottomWidth: showDivider && !isLast ? 1 : 0,
          borderBottomColor: c.divider,
          borderBottomLeftRadius: isLast ? borderRadius : 0,
          borderBottomRightRadius: isLast ? borderRadius : 0,
          onPress: () => onRowPress?.(row, rowIndex),
          disabled: !onRowPress && !selectable,
          children: [selectable && /*#__PURE__*/_jsx(Stack, {
            width: 52,
            paddingHorizontal: 16,
            paddingVertical: 14,
            alignItems: "center",
            justifyContent: "center",
            children: /*#__PURE__*/_jsx(StyledCheckBox, {
              checked: isSelected,
              onCheck: () => toggleRow(row.id),
              size: 18,
              checkedColor: c.checkboxChecked
            })
          }), columns.map((col, colIndex) => /*#__PURE__*/_jsx(Cell, {
            width: col.width,
            align: col.align,
            isFirst: colIndex === 0 && !selectable,
            children: col.render ? col.render(row[col.key], row, rowIndex) : /*#__PURE__*/_jsx(StyledText, {
              fontSize: 14,
              color: c.text,
              numberOfLines: 1,
              children: row[col.key] ?? "—"
            })
          }, col.key))]
        });
      }
    }) :
    // ── Stack.map path — simple, best for ≤ 50 rows ─────────────────
    visibleData.map((row, rowIndex) => {
      const isSelected = selectedIds.includes(row.id);
      const isLast = rowIndex === visibleData.length - 1;
      const isAlt = striped && rowIndex % 2 !== 0;
      const rowBg = isSelected ? c.selectedBg : isAlt ? c.rowAltBg : c.rowBg;
      return /*#__PURE__*/_jsxs(StyledPressable, {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: rowBg,
        borderLeftWidth: isSelected ? 3 : 0,
        borderLeftColor: isSelected ? c.selectedBorder : "transparent",
        borderBottomWidth: showDivider && !isLast ? 1 : 0,
        borderBottomColor: c.divider,
        borderBottomLeftRadius: isLast ? borderRadius : 0,
        borderBottomRightRadius: isLast ? borderRadius : 0,
        onPress: () => onRowPress?.(row, rowIndex),
        disabled: !onRowPress && !selectable,
        children: [selectable && /*#__PURE__*/_jsx(Stack, {
          width: 52,
          paddingHorizontal: 16,
          paddingVertical: 14,
          alignItems: "center",
          justifyContent: "center",
          children: /*#__PURE__*/_jsx(StyledCheckBox, {
            checked: isSelected,
            onCheck: () => toggleRow(row.id),
            size: 18,
            checkedColor: c.checkboxChecked
          })
        }), columns.map((col, colIndex) => /*#__PURE__*/_jsx(Cell, {
          width: col.width,
          align: col.align,
          isFirst: colIndex === 0 && !selectable,
          children: col.render ? col.render(row[col.key], row, rowIndex) : /*#__PURE__*/_jsx(StyledText, {
            fontSize: 14,
            color: c.text,
            numberOfLines: 1,
            children: row[col.key] ?? "—"
          })
        }, col.key))]
      }, row.id);
    }), (pagination || externalPagination) && totalPages > 1 && /*#__PURE__*/_jsxs(Stack, {
      horizontal: true,
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: c.border,
      backgroundColor: c.headerBg,
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      children: [/*#__PURE__*/_jsxs(StyledText, {
        fontSize: 12,
        color: c.subText,
        children: [rowStart, "\u2013", rowEnd, " of ", rowTotal]
      }), /*#__PURE__*/_jsxs(Stack, {
        horizontal: true,
        gap: 6,
        children: [Array.from({
          length: totalPages
        }, (_, i) => i).filter(i => i === 0 || i === totalPages - 1 || Math.abs(i - page) <= 1).reduce((acc, i, idx, arr) => {
          if (idx > 0 && i - arr[idx - 1] > 1) acc.push("…");
          acc.push(i);
          return acc;
        }, []).map((item, idx) => item === "…" ? /*#__PURE__*/_jsx(StyledText, {
          fontSize: 12,
          color: c.subText,
          paddingHorizontal: 4,
          children: "\u2026"
        }, `ellipsis-${idx}`) : /*#__PURE__*/_jsx(StyledPressable, {
          onPress: () => handlePageChange(item),
          disabled: loading,
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: page === item ? c.sortActive : c.border,
          backgroundColor: page === item ? c.sortActive : "transparent",
          children: /*#__PURE__*/_jsx(StyledText, {
            fontSize: 12,
            fontWeight: "600",
            color: page === item ? c.background : c.text,
            children: item + 1
          })
        }, item)), /*#__PURE__*/_jsx(StyledPressable, {
          onPress: () => handlePageChange(Math.min(totalPages - 1, page + 1)),
          disabled: page >= totalPages - 1 || loading,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: page >= totalPages - 1 ? c.border : c.sortActive,
          opacity: page >= totalPages - 1 ? 0.4 : 1,
          children: /*#__PURE__*/_jsx(StyledText, {
            fontSize: 12,
            fontWeight: "600",
            color: c.text,
            children: "\u2192"
          })
        })]
      })]
    }), loading && /*#__PURE__*/_jsx(Stack, {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255,255,255,0.7)",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: borderRadius,
      children: /*#__PURE__*/_jsx(StyledText, {
        fontSize: 13,
        color: c.subText,
        children: "Loading\u2026"
      })
    })]
  });
  return /*#__PURE__*/_jsx(Stack, {
    borderRadius: borderRadius,
    borderWidth: bordered ? 1 : 0,
    borderColor: c.border,
    overflow: "hidden",
    backgroundColor: c.background,
    style: bordered ? {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2
    } : undefined,
    children: scrollable ? /*#__PURE__*/_jsx(ScrollView, {
      horizontal: true,
      showsHorizontalScrollIndicator: false,
      children: tableContent
    }) : tableContent
  });
}
export default StyledTable;
//# sourceMappingURL=index.js.map