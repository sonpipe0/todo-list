import { motion } from "framer-motion";
import {ReactNode} from "react";

export default function ImgCarrousel({ images, step }: { images: string[], step: number }) {


    if (step < 0 || step >= images.length) {
        throw new Error("Step out of bounds");
    }

    const svgs: ReactNode[] = images.map((image, index) => {
        return <img key={index} src={image} alt={"frame"} className={"w-96 h-96"}/>
    })

    return images.length === 0 ? (
        <div className={"flex justify-center items-center"}>
            <p className={"text-white font-semibold text-lg"}>No hay imagenes</p>
        </div>
    ) : (
        <div className={"flex justify-start items-start flex-nowrap"}>
            <motion.div
                key={step}
                initial={{x: 0}}
                animate={{x: -100 * step + "%"}}
                transition={{duration: 1}}
                className={"flex"}
            >
                {svgs[step]}
            </motion.div>
        </div>
    );
}