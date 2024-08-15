import { FieldError, UseFormRegister } from "react-hook-form";



export type FormDataRegister = {
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    confirmPassword: string;
};

export type FormFieldProps = {
    top: string;
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormDataRegister>;
    error: FieldError | undefined;
};

export type FormDataLogin = {
    username: string;
    password: string;
};

export type FormFieldPropsLogin = {
    top: string;
    type: string;
    placeholder: string;
    name: "username" | "password";
    register: UseFormRegister<FormDataLogin>;
    error: FieldError | undefined;
};


export type ValidFieldNames =
    | "username"
    | "firstname"
    | "lastname"
    | "password"
    | "confirmPassword";