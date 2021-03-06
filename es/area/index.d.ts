declare const Area: import("../utils").WithInstall<import("vue").DefineComponent<{
    title: StringConstructor;
    loading: BooleanConstructor;
    readonly: BooleanConstructor;
    allowHtml: BooleanConstructor;
    showToolbar: {
        type: BooleanConstructor;
        default: true;
    };
    cancelButtonText: StringConstructor;
    confirmButtonText: StringConstructor;
    itemHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    visibleItemCount: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    swipeDuration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
} & {
    value: StringConstructor;
    areaList: {
        type: import("vue").PropType<import("./Area").AreaList>;
        default: () => {};
    };
    columnsNum: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    isOverseaCode: {
        type: import("vue").PropType<(code: string) => boolean>;
        default: (code: string) => boolean;
    };
    columnsPlaceholder: {
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "confirm")[], "change" | "confirm", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    loading: boolean;
    readonly: boolean;
    allowHtml: boolean;
    itemHeight: string | number;
    swipeDuration: string | number;
    visibleItemCount: string | number;
    showToolbar: boolean;
    areaList: import("./Area").AreaList;
    columnsNum: string | number;
    isOverseaCode: (code: string) => boolean;
    columnsPlaceholder: string[];
} & {
    value?: string | undefined;
    title?: string | undefined;
    cancelButtonText?: string | undefined;
    confirmButtonText?: string | undefined;
}>, {
    loading: boolean;
    readonly: boolean;
    allowHtml: boolean;
    itemHeight: string | number;
    swipeDuration: string | number;
    visibleItemCount: string | number;
    showToolbar: boolean;
    areaList: import("./Area").AreaList;
    columnsNum: string | number;
    isOverseaCode: (code: string) => boolean;
    columnsPlaceholder: string[];
}>>;
export default Area;
export { Area };
export type { AreaList, AreaColumnOption } from './Area';
