import { z, ZodType } from "zod";
import { FormDataCreateTodo } from "./types.ts";
import { getLocalTimeZone, today, CalendarDate } from "@internationalized/date";

// Custom Zod type for CalendarDate
const calendarDateSchema = z.custom<CalendarDate>((data) => {
    return data instanceof CalendarDate;
}, {
    message: "Invalid date format. Expected CalendarDate."
});

export const TodoSchema: ZodType<FormDataCreateTodo> = z.object({
    name: z.string().min(3).max(20),
    description: z.string().min(1).max(20),
    dueDate: calendarDateSchema.refine(date => date.compare(today(getLocalTimeZone())) >= 0, {
        message: "Due date must be today or later."
    })
});