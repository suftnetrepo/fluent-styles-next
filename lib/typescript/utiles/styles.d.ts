/**
 * Styles shared across portal rendering components.
 * Kept in a single module so both `PortalManager` and `GlobalPortalProvider`
 * reference the same cached `StyleSheet` object.
 */
export declare const portalStyles: {
    /** Full-screen semi-transparent overlay rendered behind portal content. */
    backdrop: {
        backgroundColor: string;
        position: "absolute";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    };
    /**
     * Touch-capture layer that sits on top of the backdrop colour layer.
     * Using a separate view (rather than making the backdrop itself touchable)
     * lets us keep `pointerEvents="box-none"` on the backdrop so that touches
     * outside the inner layer still fall through when no `onBackdropPress` is
     * needed.
     */
    backdropTouchable: {
        position: "absolute";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    };
};
//# sourceMappingURL=styles.d.ts.map