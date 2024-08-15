import { FormFieldProps } from "./types.ts";

const FormField: React.FC<FormFieldProps> = ({
                                                 top,
                                                 type,
                                                 placeholder,
                                                 name,
                                                 register,
                                                 error,
                                             }) => (
    <>
        <div className={"flex flex-col w-10/12"}>
            <span className={` ${error ? "text-red-500" : "text-white"} font-lato text-md`}>{error ? error.message : top}</span>
            <input
                className={`bg-[#1D1D1D] text-gray-400 focus:ring-0 focus:ring-transparent outline-none border-2 rounded-md w-full py-3 px-2 ${error ? 'border-red-500 placeholder-red-500 text-red-500' : 'border-gray-700'}`}
                type={type}
                placeholder={placeholder}
                autoComplete={"off"}
                {...register(name, { required: true })}
            />
        </div>
    </>
);

export default FormField;