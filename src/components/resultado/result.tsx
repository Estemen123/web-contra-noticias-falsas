import React, { useRef, useState } from "react";
import VeracidadCard from "./VeracidadCard";
import { ResultCard } from "./resultCard";
import { useVideoElemtStore } from "@/store/signsStore";

type ResultProps = {
    resultData: {
        title: string;
        summary: string;
        veracity: number;
        argument: string;
    } | null;
};
const Result = ({ resultData }: ResultProps) => {
    const {video} = useVideoElemtStore()
        const {setvideo} = useVideoElemtStore()
    return (
        <div className="flex justify-center items-start mt-8" onMouseEnter={() =>{ if (video !== 0) setvideo(0);}}>
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
                
            </div>
        </div>
    );
};

export { Result };
