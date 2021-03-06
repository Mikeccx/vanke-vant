declare const _default: import("vue").DefineComponent<{
    icon: StringConstructor;
    size: import("vue").PropType<"large">;
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
    valueClass: import("vue").PropType<unknown>;
    labelClass: import("vue").PropType<unknown>;
    titleClass: import("vue").PropType<unknown>;
    titleStyle: import("vue").PropType<string | import("vue").CSSProperties>;
    arrowDirection: import("vue").PropType<import("../cell").CellArrowDirection>;
    clickable: {
        type: import("vue").PropType<boolean | null>;
        default: null;
    };
} & {
    name: (NumberConstructor | StringConstructor)[];
    isLink: {
        type: BooleanConstructor;
        default: true;
    };
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
}, (() => JSX.Element) | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    center: boolean;
    border: boolean;
    disabled: boolean;
    readonly: boolean;
    isLink: boolean;
    required: boolean;
    clickable: boolean | null;
} & {
    name?: string | number | undefined;
    value?: string | number | undefined;
    label?: string | number | undefined;
    title?: string | number | undefined;
    icon?: string | undefined;
    size?: "large" | undefined;
    iconPrefix?: string | undefined;
    valueClass?: unknown;
    labelClass?: unknown;
    titleClass?: unknown;
    titleStyle?: string | import("vue").CSSProperties | undefined;
    arrowDirection?: import("../cell").CellArrowDirection | undefined;
}>, {
    center: boolean;
    border: boolean;
    disabled: boolean;
    readonly: boolean;
    isLink: boolean;
    required: boolean;
    clickable: boolean | null;
}>;
export default _default;
