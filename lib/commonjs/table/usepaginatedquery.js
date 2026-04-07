"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePaginatedQuery = usePaginatedQuery;
var _react = require("react");
/**
 * usePaginatedQuery
 *
 * A generic hook that manages page state, loading, error, and data fetching
 * for use with StyledTable's externalPagination mode.
 *
 * Works with:
 *   - REST / GraphQL APIs  (pass a `fetcher` function)
 *   - Realm (pass a `realmQuery` function)
 *   - SQLite / WatermelonDB (pass a `fetcher` function)
 *   - Any async datasource
 *
 * Usage with REST API:
 *   const table = usePaginatedQuery({
 *     pageSize: 10,
 *     fetcher: async ({ page, pageSize, sortKey, sortDir }) => {
 *       const res = await api.get('/orders', { params: { page, pageSize, sortKey, sortDir } })
 *       return { data: res.data.items, totalCount: res.data.total }
 *     },
 *   })
 *
 * Usage with Realm:
 *   const table = usePaginatedQuery({
 *     pageSize: 10,
 *     realmQuery: ({ page, pageSize, sortKey, sortDir }) => {
 *       const results = realm.objects('Order')
 *         .sorted(sortKey ?? 'createdAt', sortDir === 'desc')
 *       const total = results.length
 *       const data  = results.slice(page * pageSize, (page + 1) * pageSize)
 *       return { data: Array.from(data), totalCount: total }
 *     },
 *   })
 *
 * Then wire into StyledTable:
 *   <StyledTable
 *     {...table.tableProps}
 *     columns={COLUMNS}
 *   />
 */

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Hook ─────────────────────────────────────────────────────────────────────

function usePaginatedQuery(options) {
  const {
    pageSize = 10,
    fetcher,
    realmQuery,
    initialSortKey = null,
    initialSortDir = null,
    initialSearch = "",
    initialFilters = {},
    searchDebounce = 300
  } = options;
  const [page, setPageState] = (0, _react.useState)(0);
  const [sortKey, setSortKey] = (0, _react.useState)(initialSortKey);
  const [sortDir, setSortDir] = (0, _react.useState)(initialSortDir);
  const [search, setSearchState] = (0, _react.useState)(initialSearch);
  const [filters, setFiltersState] = (0, _react.useState)(initialFilters);
  const [data, setData] = (0, _react.useState)([]);
  const [totalCount, setTotalCount] = (0, _react.useState)(0);
  const [loading, setLoading] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)(null);
  const [refreshKey, setRefreshKey] = (0, _react.useState)(0);

  // Debounced search
  const searchTimerRef = (0, _react.useRef)(null);
  const [debouncedSearch, setDebouncedSearch] = (0, _react.useState)(initialSearch);
  const setSearch = (0, _react.useCallback)(s => {
    setSearchState(s);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setDebouncedSearch(s);
      setPageState(0); // reset to first page on new search
    }, searchDebounce);
  }, [searchDebounce]);
  const setPage = (0, _react.useCallback)(p => {
    setPageState(p);
  }, []);
  const setSort = (0, _react.useCallback)((key, dir) => {
    setSortKey(key);
    setSortDir(dir);
    setPageState(0); // reset to first page on sort change
  }, []);
  const setFilters = (0, _react.useCallback)(f => {
    setFiltersState(f);
    setPageState(0);
  }, []);
  const refresh = (0, _react.useCallback)(() => {
    setRefreshKey(k => k + 1);
  }, []);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const params = {
    page,
    pageSize,
    sortKey,
    sortDir,
    search: debouncedSearch,
    filters
  };

  // ── Realm (synchronous) ────────────────────────────────────────────────
  (0, _react.useEffect)(() => {
    if (!realmQuery) return;
    try {
      const result = realmQuery(params);
      setData(result.data);
      setTotalCount(result.totalCount);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    }
  }, [page, sortKey, sortDir, debouncedSearch, filters, refreshKey]);

  // ── Async fetcher (REST / GraphQL / SQLite) ────────────────────────────
  (0, _react.useEffect)(() => {
    if (!fetcher) return;
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetcher(params);
        if (!cancelled) {
          setData(result.data);
          setTotalCount(result.totalCount);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e : new Error(String(e)));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [page, sortKey, sortDir, debouncedSearch, filters, refreshKey]);
  return {
    data,
    loading,
    error,
    totalCount,
    totalPages,
    page,
    pageSize,
    setPage,
    sortKey,
    sortDir,
    setSort,
    search,
    setSearch,
    filters,
    setFilters,
    refresh,
    tableProps: {
      data,
      loading,
      externalPagination: true,
      currentPage: page,
      totalPages,
      totalCount,
      pageSize,
      onPageChange: setPage,
      sortKey,
      sortDirection: sortDir,
      onSort: setSort
    }
  };
}
//# sourceMappingURL=usepaginatedquery.js.map