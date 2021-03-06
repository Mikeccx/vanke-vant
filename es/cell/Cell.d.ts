import { PropType, CSSProperties } from 'vue';
export declare type CellArrowDirection = 'up' | 'down' | 'left' | 'right';
export declare const cellProps: {
    icon: StringConstructor;
    size: PropType<"large">;
    title: (NumberConstructor | StringConstructor)[];
    value: (NumberConstructor | StringConstructor)[];
    label: (NumberConstructor | StringConstructor)[];
    center: BooleanConstructor;
    isLink: BooleanConstructor;
    border: {
        type: BooleanConstructor;
        default: true;
    };
    required: BooleanConstructor;
    iconPrefix: StringConstructor;
    valueClass: PropType<unknown>;
    labelClass: PropType<unknown>;
    titleClass: PropType<unknown>;
    titleStyle: PropType<string | CSSProperties>;
    arrowDirection: PropType<CellArrowDirection>;
    clickable: {
        type: PropType<boolean | null>;
        default: null;
    };
};
declare const _default: import("vue").DefineComponent<{
    icon: StringConstructor;
    size: PropType<"large">;
    title: (NumberConstructor | StringConstructor)[];
    value: (NumberConstructor | StringConstructor)[];
    label: (NumberConstructor | StringConstructor)[];
    center: BooleanConstructor;
    isLink: BooleanConstructor;
    border: {
        type: BooleanConstructor;
        default: true;
    };
    required: BooleanConstructor;
    iconPrefix: StringConstructor;
    valueClass: PropType<unknown>;
    labelClass: PropType<unknown>;
    titleClass: PropType<unknown>;
    titleStyle: PropType<string | CSSProperties>;
    arrowDirection: PropType<CellArrowDirection>;
    clickable: {
        type: PropType<boolean | null>;
        default: null;
    };
} & {
    to: PropType<import("vue-router").RouteLocationRaw>;
    url: StringConstructor;
    replace: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    replace: boolean;
    center: boolean;
    border: boolean;
    isLink: boolean;
    required: boolean;
    clickable: boolean | null;
} & {
    value?: string | number | undefined;
    label?: string | number | undefined;
    title?: string | number | undefined;
    to?: import("vue-router").RouteLocationRaw | undefined;
    url?: string | undefined;
    icon?: string | undefined;
    size?: "large" | undefined;
    iconPrefix?: string | undefined;
    valueClass?: unknown;
    labelClass?: unknown;
    titleClass?: unknown;
    titleStyle?: string | CSSProperties | undefined;
    arrowDirection?: CellArrowDirection | undefined;
}>, {
    replace: boolean;
    center: boolean;
    border: boolean;
    isLink: boolean;
    required: boolean;
    clickable: boolean | null;
}>;
export default _default;
