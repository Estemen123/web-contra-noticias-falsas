import { FormEvent } from "react";

type SearchFormProps = {
    setRespondido: React.Dispatch<React.SetStateAction<boolean>>;
};
const useSearchForm = ({setRespondido}:SearchFormProps)=>{
    const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const mesage: string = String(formData.get("mensage")) ?? "";
            try {
                const res = await fetch("/api/gemini", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ mesage }),
                });
                const data = await res.json();
                setRespondido(true);
                console.log(data)
            } catch (error) {
                setRespondido(false);
                console.log(error);
            }
        };
    return{handlerSubmit};
}

export {useSearchForm};