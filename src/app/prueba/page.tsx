"use client";

import { getGemini } from "@/lib/api";
import { FormEvent } from "react";

const pagePrueba = () => {
    const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(formData.get("mensage"));
        const mesage: string = String(formData.get("mensage")) ?? "";
        try {
            const res = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mesage }),
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="">
            <form className="" onSubmit={handlerSubmit}>
                <div className="grid space-y-3">
                    <p>holas como anda</p>
                    <input
                        className="bg-white text-black font-black"
                        name="mensage"
                    ></input>
                    <button className="bg-green-950 border-white" type="submit">
                        submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default pagePrueba;
