"use-client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import { useSearchForm } from "@/hook/useSearchForm";
const ControlVoz = dynamic(() => import("@/components/voz/voz"), {
    ssr: false,
});

type SearchFormProps = {
    setRespondido: React.Dispatch<React.SetStateAction<boolean>>;
};
const SearchForm = ({
    setRespondido,
}: {
    setRespondido: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [value, setValue] = useState("");
    const [listening, setListening] = useState(false);
    const {handlerSubmit} = useSearchForm({setRespondido});

    return (
        <div className="p-6 rounded-2xl w-full max-w-5xl mx-auto">
            <form onSubmit={handlerSubmit} className="p-6">
                <div className="grid gap-3">
                    <div className="relative">
                        <Input
                            name="mensage"
                            className="w-full h-10 bg-[#23253A] border border-[#7B8AFF] text-white pl-4 pr-4 py-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B8AFF] placeholder:text-[#7B8AFF] text-lg "
                            placeholder="Escribe tu noticia..."
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <ControlVoz
                            language="es-ES"
                            continuous
                            onTranscriptChange={setValue}
                            onListeningChange={setListening}
                            className="absolute  right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-7 w-7 rounded-md hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button
                            type="submit"
                            variant="default"
                            className="bg-gradient-to-r from-[#54B7A1] to-[#7B8AFF] hover:from-[#429c87] hover:to-[#5a6eea] text-white text-base px-8 py-3 rounded-xl font-bold shadow-lg transition-all duration-200 flex items-center gap-2"
                        >
                            <span className="tracking-wide drop-shadow">
                                {" "}
                                Evaluar noticia
                            </span>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export { SearchForm };
