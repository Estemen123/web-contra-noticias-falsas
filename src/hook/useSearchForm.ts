import { validateNewsResult } from "@/lib/validators";
import { FormEvent, SetStateAction, useState } from "react";

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
    const [urlInput, setUrlInput] = useState(true);
    const handlerSubmit = async (e: FormEvent<HTMLFormElement>): Promise<boolean> => {
        const formData = new FormData(e.currentTarget);
        const mesage: string = urlInput? String(formData.get("url")) ?? "":String(formData.get("texto")) ?? "";
        const direction:string = urlInput?"/api/gemini/url":"/api/gemini/text";
        try {
            const res = await fetch(direction, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mesage }),
            });
            if (!res.ok) {
                throw new Error("API request failed");
            }
            const data = await res.json();
            if (validateNewsResult(data)) {
                setRespondido(true);
                setResultData(data);
                return true;
            } else {
                setRespondido(false);
                return false;
            }
        } catch (error) {
            setRespondido(false);
            console.log(error);
            return false;
        }
    };
    return { handlerSubmit, urlInput, setUrlInput };
};

export { useSearchForm };
