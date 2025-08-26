"use client";
import { SearchForm } from "@/components/buscador/searchForm";
import { Result } from "@/components/resultado/result";
import { FormEvent, useState } from "react";

export default function Home() {
    const [respodido,setRespondido] = useState(false);
    
    return (<div>
        <SearchForm setRespondido={setRespondido}/>
        <Result/>
      {/* {respodido?<Result></Result>:<SearchForm setRespondido={setRespondido}/>} */}
    </div>
        
    );
}
