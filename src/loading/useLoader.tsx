import { useCallback, useRef } from 'react'
import React from 'react'
import { usePortal } from '../portal/PortalContext'
import { Loader, LoaderProps } from './'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ShowLoaderOptions = LoaderProps

export type LoaderAPI = {
  /** Shows a loader overlay and returns its portal id. */
  show: (options?: ShowLoaderOptions) => number
  /** Hides the loader with the given id. */
  hide: (id: number) => void
  /**
   * Wraps an async function: shows the loader before it runs, hides after
   * it resolves or rejects (always, via `finally`).
   *
   * @example
   * ```ts
   * const data = await loader.wrap(
   *   () => api.fetchReport(),
   *   { label: 'Loading report…', variant: 'dots' },
   * )
   * ```
   */

}

// ─── Hook ─────────────────────────────────────────────────────────────────────

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
export function useLoader(): LoaderAPI {
  const { mount, unmount } = usePortal()

  // Tracks the last shown loader id so callers who didn't store the id can
  // still call hide() without arguments in simple single-loader flows.
  const lastIdRef = useRef<number | null>(null)

  const show = useCallback(
    (options: ShowLoaderOptions = {}): number => {
      // Loader has no onDismiss callback, so no idBox dance needed here.
      const id = mount(
        <Loader {...options} overlay={options.overlay ?? true} />,
        { position: 'center' },
      )
      lastIdRef.current = id
      return id
    },
    [mount],
  )

  const hide = useCallback(
    (id: number) => {
      unmount(id)
      if (lastIdRef.current === id) lastIdRef.current = null
    },
    [unmount],
  )

  return { show, hide }
}