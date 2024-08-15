import {FormTodoProps} from "./types.ts";
import {Input} from "@nextui-org/react";
import React from "react";

const TodoField: React.FC<FormTodoProps> = ({
    type,
    placeholder,
    name,
    register,
    error,
}) => (
    <Input
        placeholder={placeholder}
        type={type}
        className="w-full p-2"
        isInvalid={!!error}
        errorMessage={error?.message}
        variant={"bordered"}
        size={"lg"}
        {...register(name, { required: true })}
    />

);

export default TodoField;