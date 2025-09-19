import { useEffect, useState } from "react";
import { useResultCard } from "@/hook/useResultCard";

interface ResultCardProps {
    resultData: {
        title: string;
        summary: string;
        veracity: number;
        argument: string;
    };
}

const ResultCard = ({ resultData }: ResultCardProps) => {
    const { handleSpeak, leyendo, veracityText } = useResultCard({
        argument: resultData.argument,
    });

    const [referenceLinks, setReferenceLinks] = useState<string[]>([]);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const res = await fetch("/api/scrape", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query: resultData.title || resultData.summary }),
                });
                const data = await res.json();
                setReferenceLinks(data.links || []);
            } catch (err) {
                console.error("Error al buscar enlaces:", err);
            }
        };

        fetchLinks();
    }, [resultData.title, resultData.summary]);

    const isLowVeracity = resultData.veracity <= 50;
    const textColorClass = isLowVeracity ? "text-red-500" : "text-[#54B7A1]";
    const strokeColor = isLowVeracity ? "#EF4444" : "#54B7A1";

    return (
        <div className="flex-1 rounded-xl overflow-hidden">
            <div className="bg-[#2A3143] px-6 py-2 flex items-center justify-between">
                <span
                    className={`${textColorClass} font-semibold text-lg flex items-center gap-2`}
                >
                    <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke={strokeColor}
                            strokeWidth="2"
                        />
                        <path
                            d="M8 12l2 2 4-4"
                            stroke={strokeColor}
                            strokeWidth="2"
                            fill="none"
                        />
                    </svg>
                    {veracityText(resultData.veracity)}
                </span>
            </div>
            <div
                className="bg-[#23253A] px-6 py-4 text-white text-sm min-h-[110px]"
                aria-live="polite"
                role="region"
            >
                <div className="p-5 space-y-4">
                    <div>
                        <h2 className="font-bold text-lg mb-1">
                            {resultData.title}
                        </h2>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-400 mb-1">
                            Resumen de la noticia:
                        </p>
                        <p className="text-gray-300">{resultData.summary}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-400 mb-1">
                            Argumento:
                        </p>
                        <p className="text-gray-300">{resultData.argument}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-400 mb-2">
                            Fuentes de referencia:
                        </p>
                        <ul className="space-y-2">
                            {referenceLinks.map((link, index) => (
                                <li key={index} className="flex items-center">
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#7B8AFF] hover:underline text-sm flex items-center gap-1.5 transition-colors"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
                                        </svg>
                                        <span>{new URL(link).hostname}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {leyendo && (
                    <div className="mt-2 text-[#54B7A1] font-semibold flex items-center gap-2">
                        <span aria-live="assertive">Leyendo...</span>
                        <span className="animate-pulse">🔊</span>
                    </div>
                )}
            </div>
            <div className="flex gap-4 px-6 py-3 bg-[#23253A] border-t border-[#2A3143]">
                <button
                    className="text-[#B6C8D9] flex items-center"
                    onClick={handleSpeak}
                    aria-label="Escuchar explicación en voz"
                    tabIndex={0}
                >
                    <img
                        src="/hablando.png"
                        alt="Escuchar explicación en voz"
                        width={32}
                        height={32}
                        className="object-contain"
                    />
                </button>
            </div>
        </div>
    );
};

export { ResultCard };
