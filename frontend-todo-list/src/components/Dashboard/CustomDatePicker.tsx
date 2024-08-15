import {DatePicker, DatePickerProps} from "@nextui-org/react";
import {useController, UseControllerProps} from "react-hook-form";
import {CalendarDate} from "@internationalized/date";

interface CustomDatePickerProps extends UseControllerProps {
    placeholder: string;
    variant: DatePickerProps["variant"];
    size: DatePickerProps["size"];
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
           placeholder,
           variant,
           size,
           control,
           name,
           rules,
           defaultValue,

       }) => {
    const {
        field: {onChange, onBlur, value, ref},
        fieldState: {error},
    } = useController({
        name,
        control,
        rules,
        defaultValue,
    });

    return (
        <DatePicker
            className={"p-2"}
            label={placeholder}
            variant={variant}
            size={size}
            value={value as CalendarDate}
            onChange={(date) => onChange(date)}
            onBlur={onBlur}
            ref={ref}
            isInvalid={!!error}
            errorMessage={error?.message}
        />
    );
};

export default CustomDatePicker;