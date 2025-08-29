import React, { useRef, useState } from "react";
import VeracidadCard from "./VeracidadCard";
import { ResultCard } from "./resultCard";

type ResultProps = {
    resultData: {
        title: string;
        summary: string;
        veracity: number;
        argument: string;
    } | null;
};
const Result = ({ resultData }: ResultProps) => {
    return (
        <div className="flex justify-center items-start mt-8">
            <div className="flex gap-12 w-full max-w-[90vw]">
                {resultData && (
                    <>
                        <VeracidadCard
                            veracidad={resultData.veracity}
                            votos={resultData.veracity}
                        />
                        <ResultCard resultData={resultData} />
                    </>
                )}

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
