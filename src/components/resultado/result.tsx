import React, { useRef, useState } from "react";
import VeracidadCard from "./VeracidadCard";
import { Button } from "@/components/ui/button"; 

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
    const speechRef = useRef<HTMLButtonElement>(null);
    const [leyendo, setLeyendo] = useState(false);

    // Para leer el contenido usando el icono de la bocina
    const handleSpeak = () => {
        if ("speechSynthesis" in window) {
            const utter = new window.SpeechSynthesisUtterance(explicacion);
            utter.lang = "es-ES";
            const voices = window.speechSynthesis.getVoices();
            const spanishVoice = voices.find(
                v => v.lang.startsWith("es") && v.localService
            );
            if (spanishVoice) {
                utter.voice = spanishVoice;
            }
            utter.onstart = () => setLeyendo(true);
            utter.onend = () => setLeyendo(false);
            window.speechSynthesis.speak(utter);
        }
    };

    return (
        <div className="flex justify-center items-start mt-8">
            <div className="flex gap-12 w-full max-w-[90vw]">
                <VeracidadCard veracidad={veracidad} votos={votos} />

                {/* Para el resultado y explicación */}
                <div className="flex-1 rounded-xl overflow-hidden">
                    <div className="bg-[#2A3143] px-6 py-2 flex items-center justify-between">
                        <span className="text-[#54B7A1] font-semibold text-lg flex items-center gap-2">
                            {/* Icono check que esta en el resultado de si es verdadero o falso*/}
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" stroke="#54B7A1" strokeWidth="2" />
                                <path
                                    d="M8 12l2 2 4-4"
                                    stroke="#54B7A1"
                                    strokeWidth="2"
                                    fill="none"
                                />
                            </svg>
                            {resultado}
                        </span>
                        <Button
                            className="text-[#B6C8D9] flex items-center gap-2 text-base font-medium bg-transparent hover:bg-[#23253A] px-3 py-1"
                            type="button"
                            aria-label="Revaluar resultado"
                        >
                            <img
                                src="/actualizar.png"
                                alt="Actualizar resultado"
                                width={20}
                                height={20}
                                className="object-contain"
                            />
                            Revaluar
                        </Button>
                    </div>
                    <div
                        className="bg-[#23253A] px-6 py-4 text-white text-sm min-h-[110px]"
                        aria-live="polite"
                        role="region"
                    >
                        {Array(5)
                            .fill(explicacion)
                            .map((text, i) => (
                                <div key={i}>{text}</div>
                            ))}
                        {/* Indicador de que se esta leyendo */}
                        {leyendo && (
                            <div className="mt-2 text-[#54B7A1] font-semibold flex items-center gap-2">
                                <span aria-live="assertive">Leyendo...</span>
                                <span className="animate-pulse">🔊</span>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-4 px-6 py-3 bg-[#23253A] border-t border-[#2A3143]">
                        <button
                            className="text-[#B6C8D9] flex items-center"
                            onClick={handleSpeak}
                            ref={speechRef}
                            aria-label="Escuchar explicación en voz"
                            tabIndex={0}
                        >
                            <img
                                src="/hablando.png"
                                alt="Escuchar explicación en voz"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                        </button>
                        <button
                            className="text-[#B6C8D9] flex items-center"
                            aria-label="Ver explicación en lengua de señas"
                            tabIndex={0}
                            onClick={() => {
                                document.getElementById("video-card")?.classList.remove("hidden");
                            }}
                        >
                            <img
                                src="/hand-gestures.png"
                                alt="Ver explicación en lengua de señas"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                        </button>
                    </div>
                </div>

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
