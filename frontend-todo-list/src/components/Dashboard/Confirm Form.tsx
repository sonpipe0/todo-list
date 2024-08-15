import {Button} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth.tsx";

interface ConfirmFormProps {
    open: boolean,
    setOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function ConfirmForm({open, setOpen}: ConfirmFormProps) {
    const [isCurrent, setIsCurrent] = useState<boolean>(!open);
    const {logout} = useAuth();

    useEffect(() => {
        setTimeout(() => {
            setIsCurrent(open);
        }, 500);
    }, [open]);

    function close() {
        setIsCurrent(false);
        setTimeout(() => {
            setOpen(false);
        } , 500);
    }
    return (
        <section
            className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 ${isCurrent ? "opacity-100" : "opacity-0"}  transition-opacity`}>
            <div
                className="fixed flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-max sm:w-1/2 p-10 rounded-lg gap-5">
                <h1 className="text-2xl font-semibold text-black">Are you Sure?</h1>

                <div className={"flex flex-row justify-between w-full h-full"}>
                    <Button className="w-1/4 mt-4" color={"danger"} type={"submit"} onClick={() => {
                        close();
                        setTimeout(() => {
                        logout();
                        }, 800);
                    }}>Yes</Button>
                    <Button className="w-1/4 mt-4" color={"secondary"} type={"submit"} onClick={() => {
                        close();
                    }}>No</Button>
                </div>
            </div>
        </section>
    );
}