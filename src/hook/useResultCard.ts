import { useState } from "react";

type useResultCardProps = {
    argument: string | null;
};

const useResultCard = ({ argument }: useResultCardProps) => {
    const [leyendo, setLeyendo] = useState(false);
    const handleSpeak = () => {
        if ("speechSynthesis" in window && argument) {
            const utter = new window.SpeechSynthesisUtterance(argument);
            utter.lang = "es-ES";
            const voices = window.speechSynthesis.getVoices();
            const spanishVoice = voices.find(
                (v) => v.lang.startsWith("es") && v.localService
            );
            if (spanishVoice) {
                utter.voice = spanishVoice;
            }
            utter.onstart = () => setLeyendo(true);
            utter.onend = () => setLeyendo(false);
            window.speechSynthesis.speak(utter);
        }
    };

    const veracityText = (veracity: number): string => {
        if (veracity === 0) return "Es falsa";
        if (veracity <= 25) return "Muy poco probable";
        if (veracity <= 50) return "No se sabe";
        if (veracity <= 75) return "Muy probable";
        if (veracity <= 100) return "Es verdadero";
        return "Valor inválido";
    };
    return { handleSpeak, leyendo, veracityText };
};

export { useResultCard };
