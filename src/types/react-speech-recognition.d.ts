declare module "react-speech-recognition" {
  export interface SpeechRecognitionOptions {
    continuous?: boolean;
    interimResults?: boolean;
    language?: string;
  }

  export interface ListeningOptions {
    continuous?: boolean;
    interimResults?: boolean;
    language?: string;
  }

  export interface UseSpeechRecognitionOptions {
    commands?: Array<{
      command: string | string[];
      callback: (...args: any[]) => void;
      matchInterim?: boolean;
      isFuzzyMatch?: boolean;
      fuzzyMatchingThreshold?: number;
    }>;
  }

  export interface SpeechRecognitionHook {
    transcript: string;
    interimTranscript: string;
    finalTranscript: string;
    listening: boolean;
    resetTranscript: () => void;
    browserSupportsSpeechRecognition: boolean;
    isMicrophoneAvailable: boolean;
  }

  export function useSpeechRecognition(
    options?: UseSpeechRecognitionOptions
  ): SpeechRecognitionHook;

  export interface SpeechRecognition {
    startListening: (options?: ListeningOptions) => void;
    stopListening: () => void;
    abortListening: () => void;
  }

  const SpeechRecognition: SpeechRecognition;

  export default SpeechRecognition;
}
