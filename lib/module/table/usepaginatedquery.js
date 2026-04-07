"use strict";

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

import { useState, useEffect, useCallback, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function usePaginatedQuery(options) {
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
  const [page, setPageState] = useState(0);
  const [sortKey, setSortKey] = useState(initialSortKey);
  const [sortDir, setSortDir] = useState(initialSortDir);
  const [search, setSearchState] = useState(initialSearch);
  const [filters, setFiltersState] = useState(initialFilters);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Debounced search
  const searchTimerRef = useRef(null);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const setSearch = useCallback(s => {
    setSearchState(s);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setDebouncedSearch(s);
      setPageState(0); // reset to first page on new search
    }, searchDebounce);
  }, [searchDebounce]);
  const setPage = useCallback(p => {
    setPageState(p);
  }, []);
  const setSort = useCallback((key, dir) => {
    setSortKey(key);
    setSortDir(dir);
    setPageState(0); // reset to first page on sort change
  }, []);
  const setFilters = useCallback(f => {
    setFiltersState(f);
    setPageState(0);
  }, []);
  const refresh = useCallback(() => {
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
  useEffect(() => {
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
  useEffect(() => {
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