/**
 * Unit tests for the portal module.
 *
 * Run with: jest --testPathPattern=portal
 *
 * These tests cover the two independently-testable units:
 *   1. `PortalInstance` — the imperative singleton logic
 *   2. `getPositionStyles` — the position-to-style mapping utility
 */

import { PortalInstance } from './PortalInstance'
import { getPositionStyles } from '../utiles/position'

// ─── PortalInstance ───────────────────────────────────────────────────────────

describe('PortalInstance', () => {
  let instance: PortalInstance

  beforeEach(() => {
    instance = new PortalInstance()
  })

  it('starts with no portals', () => {
    expect(instance.getPortals()).toHaveLength(0)
  })

  it('show() adds a portal and returns a unique id', () => {
    const id1 = instance.show(null)
    const id2 = instance.show(null)
    expect(id1).not.toBe(id2)
    expect(instance.getPortals()).toHaveLength(2)
  })

  it('show() stores the supplied options', () => {
    const id = instance.show(null, { position: 'top', backdrop: true })
    const portal = instance.getPortals().find(p => p.id === id)
    expect(portal?.options.position).toBe('top')
    expect(portal?.options.backdrop).toBe(true)
  })

  it('update() replaces children and options', () => {
    const id = instance.show(null, { position: 'top' })
    instance.update(id, null, { position: 'bottom' })
    const portal = instance.getPortals().find(p => p.id === id)
    expect(portal?.options.position).toBe('bottom')
  })

  it('update() preserves options when none supplied', () => {
    const id = instance.show(null, { position: 'top' })
    instance.update(id, null)
    const portal = instance.getPortals().find(p => p.id === id)
    expect(portal?.options.position).toBe('top')
  })

  it('update() is a no-op for unknown ids', () => {
    instance.update(99999, null)
    expect(instance.getPortals()).toHaveLength(0)
  })

  it('hide() removes the portal', () => {
    const id = instance.show(null)
    instance.hide(id)
    expect(instance.getPortals()).toHaveLength(0)
  })

  it('hide() is safe to call twice', () => {
    const id = instance.show(null)
    instance.hide(id)
    expect(() => instance.hide(id)).not.toThrow()
  })

  it('hideAll() clears every portal', () => {
    instance.show(null)
    instance.show(null)
    instance.show(null)
    instance.hideAll()
    expect(instance.getPortals()).toHaveLength(0)
  })

  it('notifies subscribers on show', () => {
    const listener = jest.fn()
    instance.subscribe(listener)
    instance.show(null)
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('notifies subscribers on hide', () => {
    const listener = jest.fn()
    const id = instance.show(null)
    instance.subscribe(listener)
    instance.hide(id)
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('unsubscribe stops notifications', () => {
    const listener = jest.fn()
    const unsubscribe = instance.subscribe(listener)
    unsubscribe()
    instance.show(null)
    expect(listener).not.toHaveBeenCalled()
  })

  it('hideAll() does not notify when already empty', () => {
    const listener = jest.fn()
    instance.subscribe(listener)
    instance.hideAll()
    expect(listener).not.toHaveBeenCalled()
  })
})

// ─── getPositionStyles ────────────────────────────────────────────────────────

describe('getPositionStyles', () => {
  it('returns position:absolute for all variants', () => {
    const positions = ['top', 'bottom', 'center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'] as const
    positions.forEach(pos => {
      expect(getPositionStyles(pos).position).toBe('absolute')
    })
  })

  it('top spans full width', () => {
    const styles = getPositionStyles('top')
    expect(styles.left).toBe(0)
    expect(styles.right).toBe(0)
    expect(styles.top).toBe(0)
  })

  it('bottom spans full width', () => {
    const styles = getPositionStyles('bottom')
    expect(styles.left).toBe(0)
    expect(styles.right).toBe(0)
    expect(styles.bottom).toBe(0)
  })

  it('top-right uses right/top anchors', () => {
    const styles = getPositionStyles('top-right')
    expect(styles.right).toBeDefined()
    expect(styles.top).toBeDefined()
    expect((styles as any).left).toBeUndefined()
  })

  it('applies x offset to top-left', () => {
    const styles = getPositionStyles('top-left', { x: 16, y: 0 })
    expect(styles.left).toBe(16)
  })

  it('applies y offset to bottom', () => {
    const styles = getPositionStyles('bottom', { x: 0, y: 24 })
    expect(styles.bottom).toBe(24)
  })

  it('defaults to center when no position given', () => {
    const styles = getPositionStyles()
    expect(styles.top).toBe('50%')
    expect(styles.left).toBe('50%')
  })
})
