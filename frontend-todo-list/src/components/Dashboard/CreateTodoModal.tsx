import {useEffect, useState} from "react";
import {FormDataCreateTodo} from "./types.ts";
import {TodoSchema} from "./TodoSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useAxios} from "../../hooks/axiosContext.tsx";
import {Todo} from "./TodoComponent.tsx";
import {Button} from "@nextui-org/react";
import CustomDatePicker from "./CustomDatePicker.tsx";
import TodoField from "./CreateTodoInput.tsx";

interface CreateTodoModalProps {
    setOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function CreateTodoModal({setOpen, open, setTodos, todos}: {
    setOpen: CreateTodoModalProps["setOpen"],
    open: boolean,
    setTodos: (value: (((prevState: Todo[]) => Todo[]) | Todo[])) => void,
    todos: Todo[]
}) {
    const[isCurrent, setIsCurrent] = useState<boolean>(!open);
    const axiosInstance = useAxios();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setError,
    } = useForm<FormDataCreateTodo>({
        resolver: zodResolver(TodoSchema),
    });

    const onSubmit = async (data: FormDataCreateTodo) => {
        axiosInstance.post("/todo/create", {
            name: data.name,
            description: data.description,
            dueDate: data.dueDate.toDate("America/Argentina/Buenos_Aires")
        }).then(
            (response) => {
                console.log("Created todo:", response.data);
                setTodos([...todos, {
                    todoId: response.data.todoId,
                    title: response.data.title,
                    description: response.data.description,
                    dueDate: new Date(response.data.dueDate),
                    done: response.data.done
                }]);
                    setIsCurrent(false)
                    setTimeout(
                        () => {
                            setOpen(false)
                        }, 500
                    )
            }).catch((error) => {
            console.error("Error creating todo:", error);
            if (error.response.data.statusCode === 400) {
                setError("name", {
                    type: "manual",
                    message: error.response.data.message
                });
            }
        });

    }

    useEffect(() => {
        setTimeout(() => {
            setIsCurrent(open)
        } , 300)
    }, [open]);

    return (
        <form  onSubmit={handleSubmit(onSubmit)} className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 ${isCurrent  ? "opacity-100": "opacity-0"}  transition-opacity`}>
            <div
                className="fixed flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-max sm:w-1/2 p-10 rounded-lg gap-5">
                <h1 className="text-2xl font-semibold text-black">Add Todo</h1>

                <TodoField type={"text"} placeholder={"Title"} name={"name"} register={register} error={errors.name}/>
                <TodoField type={"text"} placeholder={"Description"} name={"description"} register={register} error={errors.description}/>
                <CustomDatePicker placeholder={"Due Date"} variant={"bordered"} size={"lg"} name={"dueDate"} control={control} rules={{ required: true }}/>
                <Button className="w-full mt-4" color={"success"} type={"submit"} onClick={() => {}}>Create</Button>
            </div>
        </form>
    );
}