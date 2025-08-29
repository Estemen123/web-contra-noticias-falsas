import { useState } from "react";

type useResultCardProps = {
    argument: string;
};

const useResultCard = ({ argument }: useResultCardProps) => {
    const [leyendo, setLeyendo] = useState(false);
    const handleSpeak = () => {
        if ("speechSynthesis" in window) {
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
    return { handleSpeak, leyendo };
};

export { useResultCard };
