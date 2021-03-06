declare const SidebarItem: import("../utils").WithInstall<import("vue").DefineComponent<{
    to: import("vue").PropType<import("vue-router").RouteLocationRaw>;
    url: StringConstructor;
    replace: BooleanConstructor;
} & {
    dot: BooleanConstructor;
    title: StringConstructor;
    badge: (NumberConstructor | StringConstructor)[];
    disabled: BooleanConstructor;
}, (() => JSX.Element) | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    replace: boolean;
    dot: boolean;
    disabled: boolean;
} & {
    title?: string | undefined;
    to?: import("vue-router").RouteLocationRaw | undefined;
    url?: string | undefined;
    badge?: string | number | undefined;
}>, {
    replace: boolean;
    dot: boolean;
    disabled: boolean;
}>>;
export default SidebarItem;
export { SidebarItem };
