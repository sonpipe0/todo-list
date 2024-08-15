import { useState} from 'react';
import {DatePicker, DateValue} from '@nextui-org/react';
import {parseDate} from '@internationalized/date';
import {IoCheckmarkDoneCircleSharp} from 'react-icons/io5';
import {RxCrossCircled} from 'react-icons/rx';

export type Todo = {
    todoId: string;
    title: string;
    description: string;
    dueDate: Date;
    done: boolean;
};

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}


type TodoComponentProps = {
    todo: Todo;
    handleDateChange: (date: DateValue, todoId: string) => void;
    handleStatusChange: (todoId: string) => void;
    handleDelete: (todoId: string) => void;
}


export default function TodoComponent(props: TodoComponentProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDescription = () => {
        setIsOpen(prevState => !prevState);
    };
    const todo = props.todo;
    const handleDateChange = props.handleDateChange;
    const handleStatusChange = props.handleStatusChange;
    const handleDelete = props.handleDelete;




    return (
        <div className={"w-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden"}>
            <div
                className="w-full flex flex-col p-4 justify-between gap-10 items-center bg-gray-100 cursor-pointer sm:flex sm:flex-row sm:gap-0 "
                onClick={toggleDescription}
            >
                <h1 className="text-2xl font-semibold text-gray-800 w-1/4">{todo.title}</h1>
                <div className="flex  items-center space-x-2 sm: gap-10">
                    <DatePicker
                        label={"Due Date"}
                        className="w-40 p-0 border-gray-300 border-2   hover:border-gray-400 rounded-lg"
                        variant={"flat"}
                        defaultValue={parseDate(formatDate(todo.dueDate))}
                        onChange={(date) => handleDateChange(date, todo.todoId)}
                    />
                    <div className="flex items-center">
                        {todo.done ? (
                            <IoCheckmarkDoneCircleSharp
                                size={40}
                                className="text-green-500 text-2xl cursor-pointer"
                                onClick={() => handleStatusChange(todo.todoId)}
                            />
                        ) : (
                            <RxCrossCircled
                                size={40}
                                className="text-red-500 text-2xl cursor-pointer"
                                onClick={() => handleStatusChange(todo.todoId)}
                            />
                        )}
                    </div>
                </div>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => handleDelete(todo.todoId)}
                >
                    Delete
                </button>
            </div>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out delay-100 ${isOpen ? 'max-h-[1000px] p-4' : 'max-h-0 p-0'}`}
            >
                <p className="text-gray-700">{todo.description}</p>
            </div>
        </div>
    );
}
