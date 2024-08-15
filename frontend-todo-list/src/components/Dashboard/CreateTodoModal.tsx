import {Button, DatePicker, Input} from "@nextui-org/react";
import {useEffect, useState} from "react";


interface CreateTodoModalProps {
    setOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function CreateTodoModal({setOpen , open}: { setOpen: CreateTodoModalProps["setOpen"], open: boolean }) {
    const[isCurrent, setIsCurrent] = useState<boolean>(!open);

    useEffect(() => {
        setTimeout(() => {
            setIsCurrent(open)
        } , 300)
    }, [open]);

    return (
        <form className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 ${isCurrent  ? "opacity-100": "opacity-0"}  transition-opacity`}>
            <div
                className="fixed flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-1/2 p-10 rounded-lg gap-5">
                <h1 className="text-2xl font-semibold text-black">Add Todo</h1>

                <Input placeholder="Title" className="w-full p-2" variant={"bordered"} size={"lg"}/>
                <Input placeholder="Description" className="w-full p-2" variant={"bordered"} size={"lg"}/>

                <DatePicker label={"Due Date"} variant={"bordered"} className={"p-2"} size={"lg"}/>
                <Button className="w-full mt-4" color={"success"} type={"submit"} onClick={
                    () => {
                        setIsCurrent(false)
                        setTimeout(
                            () => {
                                setOpen(false)
                            }, 500
                        )
                    }
                }>Create</Button>
            </div>
        </form>
    );
}