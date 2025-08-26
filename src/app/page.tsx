"use client";
import { SearchForm } from "@/components/buscador/searchForm";
import { Result } from "@/components/resultado/result";
import { FormEvent, useState } from "react";

export default function Home() {
    const [respodido,setRespondido] = useState(false);
    
    return (<div>
      <div className="flex flex-col items-center mt-20 mb-10">
                <h1 className="text-white text-7xl font-extrabold tracking-tight drop-shadow-lg text-center bg-gradient-to-r from-[#54B7A1] via-[#7B8AFF] to-[#23253A] bg-clip-text text-transparent">
                    Verifica<span className="text-[#7B8AFF]">Ya</span>
                </h1>
                <div className="mt-4 text-[#B6C8D9] text-xl font-medium text-center">
                    Tu herramienta para verificar noticias en segundos
                </div>
      </div>
        <SearchForm setRespondido={setRespondido}/>
        <Result/>
      {/* {respodido?<Result></Result>:<SearchForm setRespondido={setRespondido}/>} */}
    </div>
        
    );
}
