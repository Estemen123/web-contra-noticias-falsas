import { useResultCard } from "@/hook/useResultCard";

type ResultCardProps = {
    resultData: {
        title: string;
        summary: string;
        veracity: number;
        argument: string;
    };
};

const ResultCard = ({ resultData }: ResultCardProps) => {
    const { handleSpeak, leyendo, veracityText } = useResultCard({
        argument: resultData.argument,
    });

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
