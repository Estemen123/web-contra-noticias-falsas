"use client";
import { SearchForm } from "@/components/buscador/searchForm";
import { Result } from "@/components/resultado/result";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";

export default function Home() {
    const [respodido, setRespondido] = useState(false);
    const [respuesta, setRespuesta] = useState("");
    return (
        <div>
            <Button>URL</Button>
            <Button>TEXTO</Button>
            <SearchForm setResultado={setRespuesta} setRespondido={setRespondido} />
            <Result
                content={respuesta}
                scores={10}
                title={"noticia falsa"}
                urls={""}
            />
            {/* {respodido?<Result></Result>:<SearchForm setRespondido={setRespondido}/>} */}
        </div>
    );
}
