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
import type { SortDirection } from "./";
export interface PaginatedQueryParams {
    page: number;
    pageSize: number;
    sortKey: string | null;
    sortDir: SortDirection;
    search?: string;
    filters?: Record<string, any>;
}
export interface PaginatedQueryResult<T> {
    data: T[];
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
    initialSearch?: string;
    /** Initial filter values */
    initialFilters?: Record<string, any>;
    /** Debounce ms for search input changes — default 300 */
    searchDebounce?: number;
}
export interface UsePaginatedQueryReturn<T> {
    data: T[];
    loading: boolean;
    error: Error | null;
    totalCount: number;
    totalPages: number;
    page: number;
    pageSize: number;
    setPage: (page: number) => void;
    sortKey: string | null;
    sortDir: SortDirection;
    setSort: (key: string, dir: SortDirection) => void;
    search: string;
    setSearch: (s: string) => void;
    filters: Record<string, any>;
    setFilters: (f: Record<string, any>) => void;
    /** Manually re-fetch the current page (e.g. after a mutation) */
    refresh: () => void;
    /**
     * Spread these directly onto StyledTable:
     *   <StyledTable {...table.tableProps} columns={COLUMNS} />
     */
    tableProps: {
        data: T[];
        loading: boolean;
        externalPagination: true;
        currentPage: number;
        totalPages: number;
        totalCount: number;
        pageSize: number;
        onPageChange: (page: number) => void;
        sortKey?: string | null;
        sortDirection: SortDirection;
        onSort: (key: string, dir: SortDirection) => void;
    };
}
export declare function usePaginatedQuery<T>(options: UsePaginatedQueryOptions<T>): UsePaginatedQueryReturn<T>;
//# sourceMappingURL=usepaginatedquery.d.ts.map