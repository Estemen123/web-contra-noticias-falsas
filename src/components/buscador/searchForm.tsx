"use-client";
import { SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import { useSearchForm } from "@/hook/useSearchForm";
import { Textarea } from "../ui/textarea";
import { useVideoElemtStore } from "@/store/signsStore";
import UploadForm from "./uploadForm";

const ControlVoz = dynamic(() => import("@/components/voz/voz"), {
    ssr: false,
});

type SearchFormProps = {
    setRespondido: React.Dispatch<React.SetStateAction<boolean>>;
    setResultData: React.Dispatch<
        SetStateAction<{
            title: string;
            summary: string;
            veracity: number;
            argument: string;
        } | null>
    >;
};

const SearchForm = ({ setRespondido, setResultData }: SearchFormProps) => {
    const [value, setValue] = useState("");
    const [listening, setListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"url" | "text" | "image">("url");

    const { handlerSubmit, urlInput, setUrlInput } = useSearchForm({
        setRespondido,
        setResultData,
    });

    const { video } = useVideoElemtStore();
    const { setvideo } = useVideoElemtStore();

    const handleTabChange = (tab: "url" | "text" | "image") => {
        setActiveTab(tab);
        setRespondido(false); // Limpiar el estado de respondido
        setResultData(null); // Limpiar los datos del resultado
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);
        try {
            await handlerSubmit(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            {/* Navegación de tabs mejorada */}
            <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-r from-[#23253A] to-[#2A2D47] p-1 rounded-full shadow-xl border border-[#7B8AFF]/20">
                    <div className="flex space-x-1">
                        <button
                            type="button"
                            onClick={() => handleTabChange("url")}
                            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                                activeTab === "url" 
                                    ? "bg-gradient-to-r from-[#54B7A1] to-[#7B8AFF] text-white shadow-lg transform scale-105" 
                                    : "text-[#B6C8D9] hover:text-white hover:bg-[#7B8AFF]/20"
                            }`}
                            onMouseEnter={() => {
                                if (video !== 2) setvideo(2);
                            }}
                        >
                            URL
                        </button>
                        <button
                            type="button"
                            onClick={() => handleTabChange("text")}
                            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                                activeTab === "text" 
                                    ? "bg-gradient-to-r from-[#54B7A1] to-[#7B8AFF] text-white shadow-lg transform scale-105" 
                                    : "text-[#B6C8D9] hover:text-white hover:bg-[#7B8AFF]/20"
                            }`}
                            onMouseEnter={() => {
                                if (video !== 3) setvideo(3);
                            }}
                        >
                            TEXTO
                        </button>
                        <button
                            type="button"
                            onClick={() => handleTabChange("image")}
                            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                                activeTab === "image" 
                                    ? "bg-gradient-to-r from-[#54B7A1] to-[#7B8AFF] text-white shadow-lg transform scale-105" 
                                    : "text-[#B6C8D9] hover:text-white hover:bg-[#7B8AFF]/20"
                            }`}
                        >
                            IMAGEN
                        </button>
                    </div>
                </div>
            </div>

            <form onSubmit={handleFormSubmit}>
                <div className="space-y-6">

                    {/* Contenido de cada tab */}
                    {activeTab === "url" && (
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-gradient-to-br from-[#23253A] to-[#2A2D47] rounded-2xl p-8 shadow-xl border border-[#7B8AFF]/20">
                                <div className="space-y-4">
                                    <label className="block text-[#B6C8D9] text-sm font-medium mb-2">
                                        Ingresa la URL de la noticia
                                    </label>
                                    <Input
                                        onMouseEnter={() => {
                                            if (video !== 2) setvideo(2);
                                        }}
                                        name="url"
                                        className="w-full h-12 bg-[#1E1E2A] border border-[#7B8AFF]/30 text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#54B7A1] focus:border-transparent placeholder:text-[#7B8AFF]/60 text-lg transition-all duration-300"
                                        placeholder="https://ejemplo.com/noticia..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === "text" && (
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-gradient-to-br from-[#23253A] to-[#2A2D47] rounded-2xl p-8 shadow-xl border border-[#7B8AFF]/20">
                                <div className="space-y-4">
                                    <label className="block text-[#B6C8D9] text-sm font-medium mb-2">
                                        Escribe o dicta el texto de la noticia
                                    </label>
                                    <div className="relative">
                                        <Textarea
                                            onMouseEnter={() => {
                                                if (video !== 3) setvideo(3);
                                            }}
                                            name="texto"
                                            value={value}
                                            className="resize-none w-full min-h-[120px] bg-[#1E1E2A] border border-[#7B8AFF]/30 text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#54B7A1] focus:border-transparent placeholder:text-[#7B8AFF]/60 text-lg transition-all duration-300"
                                            onChange={(e) => setValue(e.target.value)}
                                            placeholder="Escribe el contenido de la noticia que quieres verificar..."
                                        />
                                        <ControlVoz
                                            language="es-ES"
                                            continuous
                                            onTranscriptChange={setValue}
                                            onListeningChange={setListening}
                                            className="absolute right-4 top-4 inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#7B8AFF]/20 hover:bg-[#7B8AFF]/40 focus:outline-none focus:ring-2 focus:ring-[#54B7A1] transition-all duration-300"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === "image" && (
                        <div>
                            <UploadForm />
                        </div>
                    )}

                    {/* Botón de Evaluar - Solo para URL y TEXTO */}
                    {activeTab !== "image" && (
                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                className={`bg-gradient-to-r from-[#54B7A1] to-[#7B8AFF] hover:from-[#429c87] hover:to-[#5a6eea] text-white text-lg px-12 py-4 rounded-xl font-bold shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-3 ${
                                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <svg
                                            className="animate-spin h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        <span
                                            onMouseEnter={() => {
                                                if (video !== 5) setvideo(5);
                                            }}
                                        >
                                            Evaluando noticia...
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span
                                            className="tracking-wide"
                                            onMouseEnter={() => {
                                                if (video !== 4) setvideo(4);
                                            }}
                                        >
                                            Evaluar noticia
                                        </span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export { SearchForm };
