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
import type { SortDirection } from "./";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginatedQueryParams {
  page:     number;
  pageSize: number;
  sortKey:  string | null;
  sortDir:  SortDirection;
  search?:  string;
  filters?: Record<string, any>;
}

export interface PaginatedQueryResult<T> {
  data:       T[];
  totalCount: number;
}

export interface UsePaginatedQueryOptions<T> {
  pageSize?: number;

  /**
   * Async fetcher for REST / GraphQL / SQLite.
   * Return `{ data, totalCount }`.
   */
  fetcher?: (params: PaginatedQueryParams) => Promise<PaginatedQueryResult<T>>;

  /**
   * Synchronous Realm query function.
   * Called whenever page / sort changes.
   * Return `{ data, totalCount }`.
   */
  realmQuery?: (params: PaginatedQueryParams) => PaginatedQueryResult<T>;

  /** Initial sort column key */
  initialSortKey?: string;
  /** Initial sort direction */
  initialSortDir?: SortDirection;
  /** Initial search string */
  initialSearch?:  string;
  /** Initial filter values */
  initialFilters?: Record<string, any>;
  /** Debounce ms for search input changes — default 300 */
  searchDebounce?: number;
}

export interface UsePaginatedQueryReturn<T> {
  // Data
  data:       T[];
  loading:    boolean;
  error:      Error | null;
  totalCount: number;
  totalPages: number;

  // Pagination state
  page:        number;
  pageSize:    number;
  setPage:     (page: number) => void;

  // Sort state
  sortKey:    string | null;
  sortDir:    SortDirection;
  setSort:    (key: string, dir: SortDirection) => void;

  // Search / filter
  search:     string;
  setSearch:  (s: string) => void;
  filters:    Record<string, any>;
  setFilters: (f: Record<string, any>) => void;

  /** Manually re-fetch the current page (e.g. after a mutation) */
  refresh:    () => void;

  /**
   * Spread these directly onto StyledTable:
   *   <StyledTable {...table.tableProps} columns={COLUMNS} />
   */
  tableProps: {
    data:               T[];
    loading:            boolean;
    externalPagination: true;
    currentPage:        number;
    totalPages:         number;
    totalCount:         number;
    pageSize:           number;
    onPageChange:       (page: number) => void;
    sortKey?:           string | null;
    sortDirection:      SortDirection;
    onSort:             (key: string, dir: SortDirection) => void;
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function usePaginatedQuery<T>(
  options: UsePaginatedQueryOptions<T>
): UsePaginatedQueryReturn<T> {
  const {
    pageSize        = 10,
    fetcher,
    realmQuery,
    initialSortKey  = null,
    initialSortDir  = null,
    initialSearch   = "",
    initialFilters  = {},
    searchDebounce  = 300,
  } = options;

  const [page,       setPageState]   = useState(0);
  const [sortKey,    setSortKey]     = useState<string | null>(initialSortKey);
  const [sortDir,    setSortDir]     = useState<SortDirection>(initialSortDir);
  const [search,     setSearchState] = useState(initialSearch);
  const [filters,    setFiltersState]= useState<Record<string, any>>(initialFilters);
  const [data,       setData]        = useState<T[]>([]);
  const [totalCount, setTotalCount]  = useState(0);
  const [loading,    setLoading]     = useState(false);
  const [error,      setError]       = useState<Error | null>(null);
  const [refreshKey, setRefreshKey]  = useState(0);

  // Debounced search
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  const setSearch = useCallback((s: string) => {
    setSearchState(s);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setDebouncedSearch(s);
      setPageState(0); // reset to first page on new search
    }, searchDebounce);
  }, [searchDebounce]);

  const setPage = useCallback((p: number) => {
    setPageState(p);
  }, []);

  const setSort = useCallback((key: string, dir: SortDirection) => {
    setSortKey(key);
    setSortDir(dir);
    setPageState(0); // reset to first page on sort change
  }, []);

  const setFilters = useCallback((f: Record<string, any>) => {
    setFiltersState(f);
    setPageState(0);
  }, []);

  const refresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const params: PaginatedQueryParams = {
    page,
    pageSize,
    sortKey,
    sortDir,
    search: debouncedSearch,
    filters,
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
    return () => { cancelled = true; };
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
      externalPagination: true as const,
      currentPage:        page,
      totalPages,
      totalCount,
      pageSize,
      onPageChange:       setPage,
      sortKey,
      sortDirection:      sortDir,
      onSort:             setSort,
    },
  };
}