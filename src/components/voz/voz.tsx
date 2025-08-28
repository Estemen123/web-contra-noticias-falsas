"use client";
import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

type VoiceControlsProps = {
  language?: string;               
  continuous?: boolean;             
  onTranscriptChange?: (t: string) => void; 
  onListeningChange?: (listening: boolean) => void; 
  autoStopOnUnmount?: boolean;      
  className?: string;               
};

export default function ControlVoz({
  language = "es-ES",
  continuous = true,
  onTranscriptChange,
  onListeningChange,
  autoStopOnUnmount = true,
  className,
}: VoiceControlsProps) {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();


  useEffect(() => {
    onTranscriptChange?.(transcript);
  }, [transcript, onTranscriptChange]);


  useEffect(() => {
    onListeningChange?.(listening);
  }, [listening, onListeningChange]);


  useEffect(() => {
    return () => {
      if (autoStopOnUnmount) SpeechRecognition.stopListening();
    };
  }, [autoStopOnUnmount]);

  
  if (!browserSupportsSpeechRecognition) {
    return <span>Tu navegador no soporta reconocimiento de voz.</span>;
  }

  const start = () => {
    SpeechRecognition.startListening({ continuous, language });
  };
  const stop = () => SpeechRecognition.stopListening();
  const reset = () => resetTranscript();

  return (
    <div className={className}>
        {!listening ? (
        <button
          type="button"
          onClick={start}
          aria-label="Iniciar dictado"
          aria-pressed={false}
        >
          <img src="/mic.svg" alt="" width={20} height={20} />
        </button>
      ) : (
        <button
          type="button"
          onClick={stop}
          aria-label="Detener dictado"
          aria-pressed={true}
        >
          <img src="/micstop.svg" alt="" width={20} height={20} />
        </button>
      )}
    </div>
  );
}
