declare const Field: import("../utils").WithInstall<import("vue").DefineComponent<{
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
    arrowDirection: import("vue").PropType<import("..").CellArrowDirection>;
    clickable: {
        type: import("vue").PropType<boolean | null>;
        default: null;
    };
} & {
    formatter: import("vue").PropType<(value: string) => string>;
    leftIcon: StringConstructor;
    rightIcon: StringConstructor;
    autofocus: BooleanConstructor;
    clearable: BooleanConstructor;
    maxlength: (NumberConstructor | StringConstructor)[];
    inputAlign: import("vue").PropType<import("./types").FieldTextAlign>;
    placeholder: StringConstructor;
    errorMessage: StringConstructor;
    error: {
        type: BooleanConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: null;
    };
    readonly: {
        type: BooleanConstructor;
        default: null;
    };
    clearIcon: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    clearTrigger: {
        type: import("vue").PropType<import("./types").FieldClearTrigger>;
        default: string;
    };
    formatTrigger: {
        type: import("vue").PropType<import("./types").FieldFormatTrigger>;
        default: string;
    };
} & {
    rows: (NumberConstructor | StringConstructor)[];
    name: StringConstructor;
    rules: import("vue").PropType<import("./types").FieldRule[]>;
    autosize: import("vue").PropType<boolean | import("./types").FieldAutosizeConfig>;
    labelWidth: (NumberConstructor | StringConstructor)[];
    labelClass: import("vue").PropType<unknown>;
    labelAlign: import("vue").PropType<import("./types").FieldTextAlign>;
    autocomplete: StringConstructor;
    showWordLimit: BooleanConstructor;
    errorMessageAlign: import("vue").PropType<import("./types").FieldTextAlign>;
    type: {
        type: import("vue").PropType<import("./types").FieldType>;
        default: string;
    };
    colon: {
        type: BooleanConstructor;
        default: null;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("clear" | "blur" | "focus" | "keypress" | "click-input" | "click-left-icon" | "click-right-icon" | "update:modelValue")[], "clear" | "blur" | "focus" | "keypress" | "click-input" | "click-left-icon" | "click-right-icon" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    center: boolean;
    type: import("./types").FieldType;
    border: boolean;
    disabled: boolean;
    error: boolean;
    readonly: boolean;
    isLink: boolean;
    required: boolean;
    clickable: boolean | null;
    autofocus: boolean;
    clearable: boolean;
    clearIcon: string;
    modelValue: string | number;
    clearTrigger: import("./types").FieldClearTrigger;
    formatTrigger: import("./types").FieldFormatTrigger;
    showWordLimit: boolean;
    colon: boolean;
} & {
    name?: string | undefined;
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
    arrowDirection?: import("..").CellArrowDirection | undefined;
    formatter?: ((value: string) => string) | undefined;
    leftIcon?: string | undefined;
    rightIcon?: string | undefined;
    maxlength?: string | number | undefined;
    inputAlign?: import("./types").FieldTextAlign | undefined;
    placeholder?: string | undefined;
    errorMessage?: string | undefined;
    rows?: string | number | undefined;
    rules?: import("./types").FieldRule[] | undefined;
    autosize?: boolean | import("./types").FieldAutosizeConfig | undefined;
    labelWidth?: string | number | undefined;
    labelAlign?: import("./types").FieldTextAlign | undefined;
    autocomplete?: string | undefined;
    errorMessageAlign?: import("./types").FieldTextAlign | undefined;
}>, {
    center: boolean;
    type: import("./types").FieldType;
    border: boolean;
    disabled: boolean;
    error: boolean;
    readonly: boolean;
    isLink: boolean;
    required: boolean;
    clickable: boolean | null;
    autofocus: boolean;
    clearable: boolean;
    clearIcon: string;
    modelValue: string | number;
    clearTrigger: import("./types").FieldClearTrigger;
    formatTrigger: import("./types").FieldFormatTrigger;
    showWordLimit: boolean;
    colon: boolean;
}>>;
export default Field;
export { Field };
export type { FieldType, FieldRule, FieldTextAlign, FieldClearTrigger, FieldFormatTrigger, FieldValidateError, FieldAutosizeConfig, FieldValidateTrigger, } from './types';
