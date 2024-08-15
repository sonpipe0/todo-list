import {ReactNode} from "react";


export default function TodoTable({children}: {children: ReactNode}) {

    return (
        <table className={"flex flex-col border-2 border-gray-300 bg-gray-300 divide-y-4 divide-white w-full rounded-md "}>
            {children}
        </table>
    )


}