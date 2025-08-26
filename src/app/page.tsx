"use client";
import { SearchForm } from "@/components/buscador/searchForm";
import { FormEvent, useState } from "react";

export default function Home() {
    const [respodido,setRespondido] = useState(false);
    
    return (<div>
      {respodido?<>holas como esta </>:<SearchForm/>}
          
    </div>
        
    );
}
