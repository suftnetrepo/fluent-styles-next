import type { CollapseSize } from './interface';
export declare const PADDING: Record<CollapseSize, {
    h: number;
    v: number;
}>;
export declare const FONT_SIZE: Record<CollapseSize, {
    title: number;
    subtitle: number;
}>;
export declare const S: {
    root_cell: {};
    root_card: {
        borderRadius: number;
        borderWidth: number;
        overflow: "hidden";
        shadowOffset: {
            width: number;
            height: number;
        };
        shadowRadius: number;
        elevation: number;
    };
    root_card_square: {
        borderRadius: number;
    };
    root_bordered: {
        borderWidth: number;
        borderRadius: number;
        overflow: "hidden";
    };
    root_ghost: {};
    header: {
        flexDirection: "row";
        alignItems: "center";
    };
    leading: {
        marginRight: number;
    };
    trailing: {
        marginLeft: number;
        marginRight: number;
    };
    title_block: {
        flex: number;
        gap: number;
    };
    title_base: {
        fontWeight: "600";
    };
    subtitle_base: {
        fontWeight: "400";
    };
    icon_wrap: {
        marginLeft: number;
        alignItems: "center";
        justifyContent: "center";
        width: number;
        height: number;
    };
    body_animated: {
        overflow: "hidden";
    };
    body_inner: {
        position: "absolute";
        left: number;
        right: number;
        top: number;
    };
    divider: {
        height: number;
    };
    body_divider: {
        height: number;
    };
};
export declare function headerPadStyle(size: CollapseSize): {
    paddingHorizontal: number;
    paddingVertical: number;
};
export declare function bodyPadStyle(size: CollapseSize): {
    paddingHorizontal: number;
    paddingVertical: number;
};
export declare function titleTextStyle(size: CollapseSize, color: string): {
    fontSize: number;
    color: string;
};
export declare function subtitleTextStyle(size: CollapseSize, color: string): {
    fontSize: number;
    color: string;
};
//# sourceMappingURL=style.d.ts.map