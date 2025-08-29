import { validateNewsResult } from "@/lib/validators";
import { FormEvent, SetStateAction } from "react";

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
const useSearchForm = ({ setRespondido, setResultData }: SearchFormProps) => {
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
            if (validateNewsResult(data)) {
                setRespondido(true);
                setResultData(data);
            } else setRespondido(false);
        } catch (error) {
            setRespondido(false);
            console.log(error);
        }
    };
    return { handlerSubmit };
};

export { useSearchForm };
