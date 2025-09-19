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
        <div className="flex justify-center items-start px-8" onMouseEnter={() =>{ if (video !== 0) setvideo(0);}}>
            <div className="flex items-start gap-8 w-full max-w-6xl">
                {resultData && (
                    <>
                        <div className="flex-shrink-0">
                            <VeracidadCard
                                veracidad={resultData.veracity}
                                votos={resultData.veracity}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <ResultCard resultData={resultData} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export { Result };
