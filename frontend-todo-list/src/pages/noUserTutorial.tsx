import NoFillButton from "../components/NoUserPage/NoFillButton.tsx";
import FilledButton from "../components/NoUserPage/FilledButton.tsx";
import Carrousel from "../components/NoUserPage/Carrousel.tsx";
import {useState} from "react";

export default function NoUserTutorial() {

    const [step, setStep] = useState<number>(0);

    const handleAdvance = () => {
        if (step < 2){
            setStep(step + 1);
        }
    }

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    }
    return <>
        <div className={"flex flex-col py-10 px-4 bg-myblack items-start justify-between h-screen"}>
            <NoFillButton text={"SKIP"} onClick={()=>{}}/>
            <Carrousel step={step}/>
            <div className={"flex w-full align-middle justify-between"}>
                <NoFillButton text={"BACK"} onClick={()=>{handleBack()}}/>
                <FilledButton text={"NEXT"} onClick={()=>{handleAdvance()}}/>
            </div>
        </div>

    </>
}