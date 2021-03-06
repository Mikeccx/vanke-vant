declare const _default: import("vue").DefineComponent<{
    info: StringConstructor;
    mask: {
        type: BooleanConstructor;
        default: true;
    };
    gutter: (NumberConstructor | StringConstructor)[];
    focused: BooleanConstructor;
    errorInfo: StringConstructor;
    value: {
        type: StringConstructor;
        default: string;
    };
    length: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "focus"[], "focus", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    length: string | number;
    value: string;
    mask: boolean;
    focused: boolean;
} & {
    errorInfo?: string | undefined;
    gutter?: string | number | undefined;
    info?: string | undefined;
}>, {
    length: string | number;
    value: string;
    mask: boolean;
    focused: boolean;
}>;
export default _default;
