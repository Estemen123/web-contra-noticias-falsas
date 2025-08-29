"use client";

import { useSignsStore, useVideoElemtStore, useVideoResultState } from "@/store/signsStore";
import { useEffect, useRef } from "react";

type PropsVideoModal = {
    srcVideo: number;
    srcWeb: string;
    title?: string;
    className?: string; 
     
}
const color = new Map<number, string>([
    [0, "bg-red-600"],
  [25, "bg-orange-500"],
  [50, "bg-amber-400"],
  [75, "bg-lime-500"],
  [100, "bg-green-600"],
  ]);
  const fuenteVideo = [
    "/videos/yourToolToVerifyNewsInSeconds.mp4",
    "/videos/writeTheLinkToYourNews.mp4",
    "/videos/writeYourNews.mp4",
    "/videos/evaluateTheNews.mp4",
    "/videos/evaluatingNews.mp4"
];

const VideosResult = new Map<number, string>([
  [0, "/videos/theNewsIsFake.mp4"],
  [25, "/videos/TheNewsHasVeryLowCredibility.mp4"],
  [50, "/videos/TheNewsIsUncertainDoubtful.mp4"],
  [75, "/videos/TheNewsIsPartiallyReliable.mp4"],
  [100, "/videos/theNewIsTrue.mp4"],
]);


export default function VideoModal({
     srcVideo, srcWeb,className, title = "BSL-Result"
}: PropsVideoModal) {

    const {open} = useSignsStore()
    const {setOpen} = useSignsStore()
    const videoElemet    = useVideoElemtStore(s => s.video)
    const videoResult    = useVideoResultState(s => s.video)
    const videoRef = useRef<HTMLVideoElement | null>(null);


    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        // Validar índice
        //const url = VideosResult.get(video) ?? null;
        //if (!url) return;

        v.pause();
        v.currentTime = 0;
        v.load();
        v.muted = true;
        v.play().catch(() => {/* ignore */});
    }, [videoElemet]);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        if (open) {
            v.muted = true;
            v.currentTime = 0;
            v.play();

        } else {
            v.pause;
            v.currentTime = 0;

        }
    }, [open])

    if (!open) return null;

    return (
                
            <div className={`${className ?? ""} ${
                videoElemet === 0 ? (color.get(videoResult) ?? ""): "bg-blue-950"
            }`}
            >
                <button
                    onClick={()=>{setOpen(false)}}
                    aria-label="Cerrar"
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "rgba(0,0,0,0.6)",
                        color: "white",
                        border: "none",
                        borderRadius: 6,
                        padding: "6px 10px",
                        cursor: "pointer",
                        zIndex: 1,
                    }}
                >
                    ✕
                </button>
                <video
                    ref={videoRef}
                    // Para que autoplay funcione en móvil:
                    muted
                    playsInline
                    preload="metadata"
                    style={{ width: "800px", height: "auto", display: "block" }}
                >
                    {srcWeb && <source src={srcWeb} type="video/webm" />}
                    <source src={videoElemet === 0 ? VideosResult.get(videoResult) : fuenteVideo[videoElemet - 1]} 
                    type="video/mp4" />
                    Tu navegador no soporta el elemento video.
                </video>
            </div>



    )

}