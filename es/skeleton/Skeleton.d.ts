import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    title: BooleanConstructor;
    round: BooleanConstructor;
    avatar: BooleanConstructor;
    loading: {
        type: BooleanConstructor;
        default: true;
    };
    animate: {
        type: BooleanConstructor;
        default: true;
    };
    avatarSize: (NumberConstructor | StringConstructor)[];
    titleWidth: (NumberConstructor | StringConstructor)[];
    row: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    avatarShape: {
        type: PropType<"round" | "square">;
        default: string;
    };
    rowWidth: {
        type: PropType<string | number | (string | number)[]>;
        default: string;
    };
}, () => JSX.Element | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    title: boolean;
    animate: boolean;
    round: boolean;
    loading: boolean;
    row: string | number;
    avatar: boolean;
    avatarShape: "round" | "square";
    rowWidth: string | number | (string | number)[];
} & {
    avatarSize?: string | number | undefined;
    titleWidth?: string | number | undefined;
}>, {
    title: boolean;
    animate: boolean;
    round: boolean;
    loading: boolean;
    row: string | number;
    avatar: boolean;
    avatarShape: "round" | "square";
    rowWidth: string | number | (string | number)[];
}>;
export default _default;
