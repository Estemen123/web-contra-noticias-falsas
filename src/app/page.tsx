"use client";
import { SearchForm } from "@/components/buscador/searchForm";
import { Result } from "@/components/resultado/result";
import VideoModal from "@/components/signLanguage/videoModal";
import { Button } from "@/components/ui/button";
import { useHOmePage } from "@/hook/useHomePage";
import { useSignsStore, useVideoElemtStore } from "@/store/signsStore";
import { FormEvent, useState } from "react";

export default function Home() {
    const { resultValid, setResultValid, setResultData, resultData } =
        useHOmePage();
    const {open} = useSignsStore()
    const {setOpen} = useSignsStore()
    const {video} = useVideoElemtStore()
    const {setvideo} = useVideoElemtStore()
    return (
        <div>
            <div className="flex flex-col items-center mt-20 mb-10" onMouseEnter={() =>{ if (video !== 1) setvideo(1);}}>
                <h1 className="text-white text-7xl font-extrabold tracking-tight drop-shadow-lg text-center bg-gradient-to-r from-[#54B7A1] via-[#7B8AFF] to-[#23253A] bg-clip-text text-transparent">
                    Verifica<span className="text-[#7B8AFF]">Ya</span>
                </h1>
                <div className="mt-4 text-[#B6C8D9] text-xl font-medium text-center">
                    Tu herramienta para verificar noticias en segundos
                </div>
            </div>            
            <SearchForm setRespondido={setResultValid} setResultData={setResultData}/>
            {resultValid && <Result resultData={resultData}/>}
            {/* <Result/> */}
            {/* {respodido?<Result></Result>:<SearchForm setRespondido={setRespondido}/>} */}
            {!open && (
                <button
                        className="fixed right-4 top-20 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition"
                        aria-label="Ver explicación en lengua de señas"
                        tabIndex={0}
                        onClick={
                            () => {setOpen(true)}
                        }
                    >
                        <img
                            src="/hand-gestures.png"
                            alt="Ver explicación en lengua de señas"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                </button>
            )}

            <VideoModal
                    srcVideo={video}
                    srcWeb=""
                    className="fixed  right-4 top-20 rounded-xl p-2 w-[200px] flex items-center justify-center"
                />
        </div>
        
    );
}
