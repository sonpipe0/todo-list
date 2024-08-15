import FormField from "../components/Login-RegisterForms/FormField.tsx";
import { useForm } from "react-hook-form";
import { FormDataRegister } from "../components/Login-RegisterForms/types.ts";
import { useNavigate } from "react-router-dom";
import { UserSchema } from "../components/Login-RegisterForms/UserSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAxios } from "../hooks/axiosContext.tsx";

export default function RegisterPage() {
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormDataRegister>({
        resolver: zodResolver(UserSchema),
    });

    const onSubmit = async (data: FormDataRegister) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...rest } = data;
        try {
            const response = await axiosInstance.post("auth/register", rest);
            if (response.status === 201) {
                navigate("/login");
            }
        } catch (error) {
            if (error.response.data.statusCode === 409) {
                setError("username", {
                    type: "manual",
                    message: error.response.data.message,
                });
            }
        }
    };
    return (
        <div className={"bg-myblack h-screen w-screen"}>
        <h1
            className={
                "text-2xl text-white font-semibold font-lato px-8 pt-10 pb-5"
            }
            >
            Register
            </h1>
            <form
    onSubmit={handleSubmit(onSubmit)}
    className={"grid-rows-7 grid place-items-center h-[89vh]"}
    >
    <FormField
        top={"Username"}
    type="text"
    placeholder="Enter Your Username"
    name="username"
    register={register}
    error={errors.username}
    />
    <FormField
    top={"Name"}
    type="text"
    placeholder="Name"
    name="firstname"
    register={register}
    error={errors.firstname}
    />
    <FormField
    top={"Last Name"}
    type="text"
    placeholder="Last Name"
    name="lastname"
    register={register}
    error={errors.lastname}
    />
    <FormField
    top={"Password"}
    type="password"
    placeholder="• • • • • • • •"
    name="password"
    register={register}
    error={errors.password}
    />
    <FormField
    top={"Confirm Password"}
    type="password"
    placeholder="• • • • • • • •"
    name="confirmPassword"
    register={register}
    error={errors.confirmPassword}
    />
    <button
    type="submit"
    className={
            "text-white bg-primary rounded-md w-10/12 py-3 drop-shadow-xl drop-shadow"
        }
        >
        Register
        </button>
        </form>
        </div>
);
}