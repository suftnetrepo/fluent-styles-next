import { LoaderProps } from './';
export type ShowLoaderOptions = LoaderProps;
export type LoaderAPI = {
    /** Shows a loader overlay and returns its portal id. */
    show: (options?: ShowLoaderOptions) => number;
    /** Hides the loader with the given id. */
    hide: (id: number) => void;
};
/**
 * Declarative loader hook.
 * Requires a `PortalManager` ancestor.
 *
 * @example
 * ```tsx
 * const loader = useLoader()
 *
 * // Manual control
 * const id = loader.show({ label: 'Saving…', variant: 'spinner' })
 * await saveData()
 * loader.hide(id)
 *
 * // Automatic via wrap()
 * const result = await loader.wrap(() => fetchData(), { label: 'Loading…' })
 * ```
 */
export declare function useLoader(): LoaderAPI;
//# sourceMappingURL=useLoader.d.ts.map