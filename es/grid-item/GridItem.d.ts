declare const _default: import("vue").DefineComponent<{
    to: import("vue").PropType<import("vue-router").RouteLocationRaw>;
    url: StringConstructor;
    replace: BooleanConstructor;
} & {
    dot: BooleanConstructor;
    text: StringConstructor;
    icon: StringConstructor;
    badge: (NumberConstructor | StringConstructor)[];
    iconPrefix: StringConstructor;
}, (() => JSX.Element) | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    replace: boolean;
    dot: boolean;
} & {
    text?: string | undefined;
    to?: import("vue-router").RouteLocationRaw | undefined;
    url?: string | undefined;
    badge?: string | number | undefined;
    icon?: string | undefined;
    iconPrefix?: string | undefined;
}>, {
    replace: boolean;
    dot: boolean;
}>;
export default _default;
