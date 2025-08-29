import React from "react";

const VeracidadCard = ({
    veracidad,
    votos,
}: {
    veracidad: number;
    votos: number;
}) => {
    const color = veracidad <= 50 ? "#EF4444" : "#54B7A1"; // Rojo para veracidad baja, verde para alta

    return (
        <div className="bg-[#23253A] rounded-xl w-[170px] h-[220px] flex flex-col justify-center items-center shadow">
            <div className="flex flex-col justify-center items-center h-full">
                <svg width="120" height="120">
                    <circle
                        cx="60"
                        cy="60"
                        r="48"
                        stroke={color}
                        strokeWidth="7"
                        fill="none"
                        opacity={0.18}
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r="48"
                        stroke={color}
                        strokeWidth="7"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 48}
                        strokeDashoffset={
                            2 * Math.PI * 48 -
                            (veracidad / 100) * (2 * Math.PI * 48)
                        }
                        strokeLinecap="round"
                    />
                    <text
                        x="60"
                        y="70"
                        textAnchor="middle"
                        fontSize="2.5em"
                        fill={color}
                        fontWeight="bold"
                    >
                        {veracidad}
                    </text>
                    <text
                        x="60"
                        y="90"
                        textAnchor="middle"
                        fontSize="1em"
                        fill="#B6C8D9"
                    >
                        / {votos}
                    </text>
                </svg>
                <div
                    className="text-base mt-2 font-semibold text-center"
                    style={{ color }}
                >
                    {veracidad}% de veracidad
                </div>
            </div>
        </div>
    );
};

export default VeracidadCard;