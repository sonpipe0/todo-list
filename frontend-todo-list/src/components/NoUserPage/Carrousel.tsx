import ImgCarrousel from "./ImgCarrousel.tsx";
import Frame1 from "../../assets/svg/Frame 161.svg";
import Frame2 from "../../assets/svg/Frame 162.svg";
import Frame3 from "../../assets/svg/Group 182.svg";

export default function Carrousel({step}: { step: number }) {

    const svgs: string[] = [Frame1, Frame2, Frame3];


    const text1: string = "Puedes configurar facilmente tus tareas " +
        "diarias en todo-list de manera sencilla y rapida";
    const text2: string = "En todo-list podras crear tus propias rutinas personalizadas " +
        "para ser mas productivo y eficiente";
    const text3: string = "Con todo-list podras llevar un control de tus tareas " +
        "diarias y ver tu progreso en tiempo real";

    const texts: string[] = [text1, text2, text3];
    return <div className={"flex flex-col items-center justify-center w-full"}>
        <div className={"flex justify-center items-center w-full"}>
            <ImgCarrousel images={svgs} step={step}/>
        </div>
        <div className={"flex justify-center items-center py-4"}>
            <div className={"w-4 h-0.5 bg-primary rounded-full mx-1"}/>
            <div className={"w-4 h-0.5 bg-gray-300 rounded-full mx-1"}/>
            <div className={"w-4 h-0.5 bg-gray-300 rounded-full mx-1"}/>
        </div>
        <p className={"px-4 py-2 text-white font-semibold  "}>{texts[step]}</p>
    </div>
}