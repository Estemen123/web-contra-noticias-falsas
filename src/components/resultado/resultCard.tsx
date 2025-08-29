import { Button } from "../ui/button";
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
    const resultado = {};
    const { handleSpeak, leyendo, veracityText } = useResultCard({
        argument: resultData.argument,
    });
    const links = [
        "https://cnnespanol.cnn.com/2025/08/27/latinoamerica/argentina-busca-cuadro-nazi-ap",
        "https://cnnespanol.cnn.com/2025/08/27/latinoamerica/argentina-busca-cuadro-nazi-ap",
        "https://cnnespanol.cnn.com/2025/08/27/latinoamerica/argentina-busca-cuadro-nazi-ap",
        "https://cnnespanol.cnn.com/2025/08/27/latinoamerica/argentina-busca-cuadro-nazi-ap"
    ];
    return (
        <div className="flex-1 rounded-xl overflow-hidden">
            <div className="bg-[#2A3143] px-6 py-2 flex items-center justify-between">
                <span className="text-[#54B7A1] font-semibold text-lg flex items-center gap-2">
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
                            stroke="#54B7A1"
                            strokeWidth="2"
                        />
                        <path
                            d="M8 12l2 2 4-4"
                            stroke="#54B7A1"
                            strokeWidth="2"
                            fill="none"
                        />
                    </svg>
                    {veracityText(resultData.veracity)}
                </span>
                <Button
                    className="text-[#B6C8D9] flex items-center gap-2 text-base font-medium bg-transparent hover:bg-[#23253A] px-3 py-1"
                    type="button"
                    aria-label="Revaluar resultado"
                >
                    <img
                        src="/actualizar.png"
                        alt="Actualizar resultado"
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                    Revaluar
                </Button>
            </div>
            <div
                className="bg-[#23253A] px-6 py-4 text-white text-sm min-h-[110px]"
                aria-live="polite"
                role="region"
            >
                {/* aqui hay que colocar toda la data  */}
                <div className="p-5">
                    <h2>{resultData.title}</h2>
                    <p>resumen de la noticia:</p>
                    <p>{resultData.summary}</p>
                    <p>argumento: </p>
                    <p>{resultData.argument}</p>
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
                <button
                    className="text-[#B6C8D9] flex items-center"
                    aria-label="Ver explicación en lengua de señas"
                    tabIndex={0}
                    onClick={() => {
                        document
                            .getElementById("video-card")
                            ?.classList.remove("hidden");
                    }}
                >
                    <img
                        src="/hand-gestures.png"
                        alt="Ver explicación en lengua de señas"
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
