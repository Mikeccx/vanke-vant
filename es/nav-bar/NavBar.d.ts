declare const _default: import("vue").DefineComponent<{
    title: StringConstructor;
    fixed: BooleanConstructor;
    zIndex: (NumberConstructor | StringConstructor)[];
    border: {
        type: BooleanConstructor;
        default: true;
    };
    leftText: StringConstructor;
    rightText: StringConstructor;
    leftArrow: BooleanConstructor;
    placeholder: BooleanConstructor;
    safeAreaInsetTop: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click-left" | "click-right")[], "click-left" | "click-right", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    fixed: boolean;
    border: boolean;
    placeholder: boolean;
    leftArrow: boolean;
    safeAreaInsetTop: boolean;
} & {
    title?: string | undefined;
    zIndex?: string | number | undefined;
    leftText?: string | undefined;
    rightText?: string | undefined;
}>, {
    fixed: boolean;
    border: boolean;
    placeholder: boolean;
    leftArrow: boolean;
    safeAreaInsetTop: boolean;
}>;
export default _default;
