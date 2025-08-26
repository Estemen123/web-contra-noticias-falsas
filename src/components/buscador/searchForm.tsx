"use-client";
import { FormEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type SearchFormProps = {
    setRespondido: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchForm = ({setRespondido}:{setRespondido: React.Dispatch<React.SetStateAction<boolean>>}) => {
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
            console.log(data.text);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className=" p-6 rounded-2xl max-w-sm mx-auto">
            <div className="text-8xl text-white">
                <h1> VALIDADOR DE NOTICIAS </h1>
            </div>
            <form onSubmit={handlerSubmit} className="p-6">
                <div className="grid gap-3">
                    <Input name="mensage" className="bg-white" />
                    <Button type="submit" variant="default">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export { SearchForm };
