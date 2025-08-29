import { validateNewsResult } from "@/lib/validators";
import { useVideoResultState } from "@/store/signsStore";
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
    const {setvideo} = useVideoResultState()
    const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const mesage: string = urlInput? String(formData.get("url")) ?? "":String(formData.get("texto")) ?? "";
        const direction:string = urlInput?"/api/gemini/url":"/api/gemini/text";
        try {
            const res = await fetch(direction, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mesage }),
            });
            const data = await res.json();
            if (validateNewsResult(data)) {
                setRespondido(true);
                setResultData(data);
                setvideo(data.veracity);
            } else setRespondido(false);
        } catch (error) {
            setRespondido(false);
            console.log(error);
        }
    };
    return { handlerSubmit, urlInput, setUrlInput };
};

export { useSearchForm };
