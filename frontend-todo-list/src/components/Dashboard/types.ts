import {DateValue} from "@nextui-org/react";
import {FieldError, UseFormRegister} from "react-hook-form";

export type FormDataCreateTodo = {
    name: string;
    description: string;
    dueDate: DateValue;
};


export type FormTodoProps = {
    type: string;
    placeholder: string;
    name: ValidTodoNames;
    register: UseFormRegister<FormDataCreateTodo>;
    error: FieldError | undefined;
};


export type ValidTodoNames =
    | "name"
    | "description"
    | "dueDate";

