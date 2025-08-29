import React, { useRef, useState } from "react";
import VeracidadCard from "./VeracidadCard";
import { Button } from "@/components/ui/button"; 
import { ResultCard } from "./resultCard";

const Result = ({
    veracidad = 80,
    votos = 80,
    resultado = "ES VERDADERO",
    explicacion = "La noticia es verdadera porque se encontro informacion relacionada en línea y en distintos portales web",
}: {
    veracidad?: number;
    votos?: number;
    resultado?: string;
    explicacion?: string;
}) => {
 

    return (
        <div className="flex justify-center items-start mt-8">
            <div className="flex gap-12 w-full max-w-[90vw]">
                <VeracidadCard veracidad={veracidad} votos={votos} />
                <ResultCard argument="holas" resultado="es verdadero"/>
                {/* Para el resultado y explicación */}
                {/* Para el video */}
                <div
                    id="video-card"
                    className="bg-[#F5F8FF] rounded-xl p-4 w-[170px] flex items-center justify-center text-[#B6C8D9] text-lg hidden"
                    role="region"
                    aria-label="Video en lengua de señas"
                >
                    <span>Video de señas aquí</span>
                </div>
            </div>
        </div>
    );
};


export { Result };
