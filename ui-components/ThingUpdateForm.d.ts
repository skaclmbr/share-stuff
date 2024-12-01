import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Thing } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ThingUpdateFormInputValues = {
    content?: string;
};
export declare type ThingUpdateFormValidationValues = {
    content?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ThingUpdateFormOverridesProps = {
    ThingUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ThingUpdateFormProps = React.PropsWithChildren<{
    overrides?: ThingUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    thing?: Thing;
    onSubmit?: (fields: ThingUpdateFormInputValues) => ThingUpdateFormInputValues;
    onSuccess?: (fields: ThingUpdateFormInputValues) => void;
    onError?: (fields: ThingUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ThingUpdateFormInputValues) => ThingUpdateFormInputValues;
    onValidate?: ThingUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ThingUpdateForm(props: ThingUpdateFormProps): React.ReactElement;
