import React from 'react';
import type { CollapseGroupProps, CollapseItemProps, CollapseColors, CollapseVariant, CollapseSize } from './interface';
interface GroupCtx {
    openKeys: Set<string>;
    toggle: (key: string) => void;
    inherited: {
        variant?: CollapseVariant;
        size?: CollapseSize;
        bodyPadding?: boolean;
        headerDivider?: boolean;
        lazyRender?: boolean;
        square?: boolean;
        colors?: Partial<CollapseColors>;
    };
}
/** Access the parent CollapseGroup context from within a CollapseItem. */
export declare const useCollapseGroup: () => GroupCtx | null;
/**
 * Manages open/close state across multiple `CollapseItem` children.
 *
 * @example
 * ```tsx
 * // Accordion — only one panel open at a time
 * <CollapseGroup accordion defaultActiveKey="a" variant="card">
 *   <CollapseItem itemKey="a" title="Item A">…</CollapseItem>
 *   <CollapseItem itemKey="b" title="Item B">…</CollapseItem>
 * </CollapseGroup>
 *
 * // Multi-open, controlled
 * <CollapseGroup activeKey={openKeys} onChange={setOpenKeys}>
 *   <CollapseItem itemKey="x" title="X">…</CollapseItem>
 *   <CollapseItem itemKey="y" title="Y">…</CollapseItem>
 * </CollapseGroup>
 * ```
 */
declare const CollapseGroup: React.FC<CollapseGroupProps>;
export { CollapseGroup };
/**
 * A Collapse panel managed by a parent `CollapseGroup`.
 *
 * @example
 * ```tsx
 * <CollapseItem itemKey="shipping" title="Shipping" subtitle="2–5 days">
 *   <Text>We ship worldwide via FedEx…</Text>
 * </CollapseItem>
 * ```
 */
export declare const CollapseItem: React.FC<CollapseItemProps>;
//# sourceMappingURL=CollapseGroup.d.ts.map