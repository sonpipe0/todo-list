import { Link, useNavigate } from "react-router-dom";
import { FormDataLogin } from "../components/Login-RegisterForms/types.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchemaLogin } from "../components/Login-RegisterForms/UserSchema.ts";
import FormField from "../components/Login-RegisterForms/FormField.tsx";
import {useAuth} from "../hooks/useAuth.tsx";
import React from "react";

export default function LoginPage() {
	const navigate = useNavigate();
	const {login, token, tokenExpiry} = useAuth();

	React.useEffect(() => {
		if (token && tokenExpiry && Date.now() < tokenExpiry) {
			navigate("/");
		}
	}, [token, tokenExpiry, navigate]);


	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<FormDataLogin>({
		resolver: zodResolver(UserSchemaLogin),
	});

	const onSubmit = async (data: FormDataLogin) => {
		const response: { code: number, message: string} = await login(data);
		switch (response.code) {
			case 200:
				navigate("/");
				break;
			case 401:
				setError("password", {
					type: "manual",
					message: response.message,
				});
				break;
			case 404:
				setError("username", {
					type: "manual",
					message: response.message,
				});
				break;
			default:
				console.error("Unknown error:", response);
		}
	};

	return (
		<div className={"bg-myblack h-screen w-screen"}>
			<h1
				className={
					"text-2xl text-white font-semibold font-lato px-8 pt-10 pb-5"
				}
			>
				Login
			</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={"grid-rows-5 grid place-items-center h-[89vh]"}
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
					top={"Password"}
					type="password"
					placeholder="• • • • • • • •"
					name="password"
					register={register}
					error={errors.password}
				/>

				<button
					type="submit"
					className={
						"text-white bg-primary rounded-md w-10/12 py-3 drop-shadow-xl drop-shadow"
					}
				>
					Sign in
				</button>
				<p className={"text-gray-500 font-lato font-semibold"}>
					{" "}
					Don't have an Account?{" "}
					<Link to={"/register"} className={"text-blue-500 font-bold"}>
						Sign up
					</Link>
				</p>
			</form>
		</div>
	);
}
