declare const Divider: import("../utils").WithInstall<import("vue").DefineComponent<{
    dashed: BooleanConstructor;
    hairline: {
        type: BooleanConstructor;
        default: true;
    };
    contentPosition: {
        type: import("vue").PropType<import("./Divider").DividerContentPosition>;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    dashed: boolean;
    hairline: boolean;
    contentPosition: import("./Divider").DividerContentPosition;
} & {}>, {
    dashed: boolean;
    hairline: boolean;
    contentPosition: import("./Divider").DividerContentPosition;
}>>;
export default Divider;
export { Divider };
export type { DividerContentPosition } from './Divider';
