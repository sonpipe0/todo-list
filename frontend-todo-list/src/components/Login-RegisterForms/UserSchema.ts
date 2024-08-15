import {z, ZodType} from "zod";
import {FormDataLogin, FormDataRegister} from "./types.ts";


export const UserSchema: ZodType<FormDataRegister> = z.
object({
    username: z.string().min(3).max(20),
    firstname: z.string().min(1).max(20),
    lastname: z.string().min(1).max(20),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
}).refine((data: FormDataRegister) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const UserSchemaLogin: ZodType<FormDataLogin> = z.
object({
    username: z.string().min(3).max(20),
    password: z.string().min(8).max(20),
});