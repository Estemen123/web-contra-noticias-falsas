"use-client";
import { SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import { useSearchForm } from "@/hook/useSearchForm";
import { Textarea } from "../ui/textarea";
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
    const { handlerSubmit, urlInput, setUrlInput } = useSearchForm({
        setRespondido,
        setResultData,
    });
    

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
        <div className="p-6 rounded-2xl w-full max-w-5xl mx-auto">
            <form onSubmit={handleFormSubmit} className="p-6">
                <div className="grid gap-3">
                    <div>
                        <Button type="button" onClick={() => setUrlInput(true)} className="">
                            URL
                        </Button>
                        <Button type="button" onClick={() => setUrlInput(false)} className="" >
                            TEXTO
                        </Button>
                    </div>
                    {urlInput ? (
                        <div className="relative">
                            <Input
                                name="url"
                                className="w-full h-10 bg-[#23253A] border border-[#7B8AFF] text-white pl-4 pr-4 py-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B8AFF] placeholder:text-[#7B8AFF] text-lg "
                                placeholder="Escribe el link de tu noticia..."
                            />
                        </div>
                    ) : (
                        <div className="relative">
                            <Textarea
                                name="texto"
                                value={value}
                                className="resize-none  bg-[#23253A] border border-[#7B8AFF] text-white pl-4 pr-4 py-6 rounded-lg   placeholder:text-[#7B8AFF] text-lg "
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Escribe tu noticia ..."
                            ></Textarea>

                            <ControlVoz
                                language="es-ES"
                                continuous
                                onTranscriptChange={setValue}
                                onListeningChange={setListening}
                                className="absolute  right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-7 w-7 rounded-md hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                    )}
                    <div className="flex justify-center mt-4">
                        <Button
                            type="submit"
                            variant="default"
                            className="bg-gradient-to-r from-[#54B7A1] to-[#7B8AFF] hover:from-[#429c87] hover:to-[#5a6eea] text-white text-base px-8 py-3 rounded-xl font-bold shadow-lg transition-all duration-200 flex items-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Evaluando...</span>
                                </>
                            ) : (
                                <span className="tracking-wide drop-shadow">
                                    Evaluar noticia
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export { SearchForm };
