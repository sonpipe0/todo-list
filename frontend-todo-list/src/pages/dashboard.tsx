import {useAxios} from "../hooks/axiosContext.tsx";
import {AxiosInstance} from "axios";
import TodoComponent, {Todo} from "../components/Dashboard/TodoComponent.tsx";
import {useEffect, useState} from "react";
import TodoTable from "../components/Dashboard/TodoTable.tsx";
import {Button, DateValue, Spinner} from "@nextui-org/react";
import {IoAdd} from "react-icons/io5";
import CreateTodoModal from "../components/Dashboard/CreateTodoModal.tsx";
import {CiLogout} from "react-icons/ci";
import ConfirmForm from "../components/Dashboard/Confirm Form.tsx";


async function getTodos(axiosInstance: AxiosInstance): Promise<any[] | void> {
    const response = await axiosInstance.get(`/todo/get-all`).then(
        (response) => {
            console.log("Fetched todos:", response.data);
            const res = [];

            for (let i = 0; i < response.data.length; i++) {
                res.push({
                    todoId: response.data[i].todoId,
                    title: response.data[i].title,
                    description: response.data[i].description,
                    dueDate: new Date(response.data[i].dueDate),
                    done: response.data[i].done
                });
            }
            console.log("Returning todos:", res);
            return res;
        }
    ).catch((error) => {
            console.error("Error fetching todos:", error)
        }
    );
    return response;
}


export default function Dashboard() {
    const axiosInstance = useAxios();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(false);

    useEffect(() => {
        getTodos(axiosInstance).then((todos) => {
            console.log("Setting todos:", todos);
            setTodos(todos!);
            setLoading(false);
        });
    }, [axiosInstance]);


    async function handleDateChange(date: DateValue, todoId: string) {
        try {
            const response = await axiosInstance.post(`/todo/change-date`, {
                todoId: todoId,
                newDate: date.toDate('America/Argentina/Buenos_Aires')
            });
            console.log("Updated todo:", response.data);
            setTodos(todos.map(todo => {
                if (todo.todoId === todoId) {
                    return {
                        ...todo,
                        dueDate: date.toDate('America/Argentina/Buenos_Aires')
                    };
                }
                return todo;
            }));
            return response;
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    }

    async function handleStatusChange(todoId: string) {
        try {
            const response = await axiosInstance.post(`/todo/mark-done`, {
                todoId: todoId
            });
            console.log("Updated todo:", response.data);
            setTodos(todos.map(todo => {
                if (todo.todoId === todoId) {
                    return {
                        ...todo,
                        done: !todo.done
                    };
                }
                return todo;
            }));
            return response;
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    }

    async function handleDelete(todoId: string) {
        try {
            const response = await axiosInstance.post(`/todo/delete`, {
                todoId: todoId
            });
            console.log("Deleted todo:", response.data);
            setTodos(todos.filter(todo => todo.todoId !== todoId));
            return response;
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    }


    return (
        (!loading) ?
            <div className="flex flex-col bg-white h-screen items-center w-screen ">
                <h1 className="text-2xl text-black self-start font-semibold font-lato px-8 pt-10 pb-5">
                    Dashboard
                </h1>
                <section
                    className="flex flex-col p-4 rounded-md shadow-lg drop-shadow-lg  w-11/12 bg-gray-100 justify-start items-start align-top">
                    <h2 className="text-2xl self-center pb-2 text-myblack font-semibold font-lato">
                        To Do
                    </h2>
                    <TodoTable>
                        {todos.filter(todo => !todo.done).map((todo) => {
                            console.log(todo);
                            return (
                                <TodoComponent
                                    key={todo.todoId}
                                    todo={todo}
                                    handleDateChange={handleDateChange}
                                    handleStatusChange={handleStatusChange}
                                    handleDelete={handleDelete}
                                />
                            );
                        })}
                    </TodoTable>
                    <h2 className="text-2xl self-center py-4 text-myblack font-semibold font-lato">
                        Done
                    </h2>
                    <TodoTable>
                        {todos.filter(todo => todo.done).map((todo) => {
                            console.log(todo);
                            return (
                                <TodoComponent
                                    key={todo.todoId}
                                    todo={todo}
                                    handleDateChange={handleDateChange}
                                    handleStatusChange={handleStatusChange}
                                    handleDelete={handleDelete}
                                />
                            );
                        })}
                    </TodoTable>
                    <div className="h-20 w-full">
                    </div>
                </section>
                <Button className={"transition fixed bottom-4 right-4 drop-shadow-2xl hover:py-6 hover:px-[1.15rem] hover:transition-all duration-150"} variant={"shadow"} color={"primary"} onClick={() => {setOpen(true)}}>
                    <IoAdd size={30}/>
                    Add Todo
                </Button>
                <Button className={"transition fixed bottom-4 left-4 drop-shadow-2xl hover:py-6 hover:px-[1.15rem] hover:transition-all duration-150"} variant={"shadow"} color={"primary"} onClick={() => {setConfirm(true)}}>
                    <CiLogout size={30}/>
                    Logout
                </Button>
                {confirm && <ConfirmForm open={confirm} setOpen={setConfirm}/>}
                {(open) && <CreateTodoModal open={open} setOpen={setOpen} setTodos={setTodos} todos={todos}/>}
            </div> : <div className="flex flex-col gap-20 justify-center items-center h-screen w-screen">
                <Spinner size="lg" color="primary"/>
                <Spinner size="lg" color="primary"/>
                <Spinner size="lg" color="primary"/>
                <Spinner size="lg" color="primary"/>
                <Spinner size="lg" color="primary"/>
                <Spinner size="lg" color="primary"/>
            </div>
    );
}