import { useState, useRef } from "react";
import { Result } from "../resultado/result";
import VeracidadCard from "../resultado/VeracidadCard";
import { ResultCard } from "../resultado/resultCard";
import { validateNewsResult } from "@/lib/validators";

const UploadForm = () => {
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [extractedText, setExtractedText] = useState<string | null>(null);
    const [resultData, setResultData] = useState<{
        title: string;
        summary: string;
        veracity: number;
        argument: string;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState<'upload' | 'analyzing' | 'complete'>('upload');
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleFileChange = (selectedFile: File) => {
        // Validar tamaño de archivo (máx. 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB en bytes
        if (selectedFile.size > maxSize) {
            alert("El archivo es demasiado grande. El tamaño máximo permitido es 10MB.");
            return;
        }

        // Validar tipo de archivo
        if (!selectedFile.type.startsWith("image/")) {
            alert("Por favor, selecciona solo archivos de imagen (JPG, PNG, WebP).");
            return;
        }

        setFile(selectedFile);
        setCurrentStep('upload');
        setExtractedText(null);
        setResultData(null);

        // Crear una vista previa para imágenes
        setFilePreview(URL.createObjectURL(selectedFile));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            const droppedFile = droppedFiles[0];
            if (droppedFile.type.startsWith("image/")) {
                handleFileChange(droppedFile);
            } else {
                alert("Por favor, selecciona solo archivos de imagen.");
            }
        }
    };

    const handleAnalyzeNews = async () => {
        if (!file) {
            alert("Por favor, selecciona un archivo.");
            return;
        }

        setIsLoading(true);
        setCurrentStep('analyzing');

        try {
            // Paso 1: Extraer texto de la imagen (automático)
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const uploadData = await uploadRes.json();

            if (uploadData.error) {
                alert(`Error al extraer texto: ${uploadData.error}`);
                setCurrentStep('upload');
                return;
            }

            if (!uploadData.text || !uploadData.text.trim()) {
                alert("No se pudo extraer texto del archivo.");
                setCurrentStep('upload');
                return;
            }

            setExtractedText(uploadData.text);

            // Paso 2: Analizar el texto extraído (automático)
            const analysisRes = await fetch("/api/gemini/text", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mesage: uploadData.text }),
            });

            const analysisData = await analysisRes.json();

            if (validateNewsResult(analysisData)) {
                setResultData(analysisData);
                setCurrentStep('complete');
            } else {
                alert("Error al analizar el contenido del texto extraído.");
                setCurrentStep('upload');
            }
        } catch (error) {
            console.error("Error al procesar el archivo:", error);
            alert("Ocurrió un error al procesar el archivo.");
            setCurrentStep('upload');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-6">
            {/* Indicador de progreso */}
            <div className="mb-8">
                <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        currentStep === 'upload' ? 'bg-[#7B8AFF] border-[#7B8AFF] text-white' : 
                        ['analyzing', 'complete'].includes(currentStep) ? 'bg-green-500 border-green-500 text-white' : 
                        'border-gray-400 text-gray-400'
                    }`}>
                        1
                    </div>
                    <div className={`h-1 w-16 ${['analyzing', 'complete'].includes(currentStep) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        currentStep === 'analyzing' ? 'bg-[#7B8AFF] border-[#7B8AFF] text-white' : 
                        currentStep === 'complete' ? 'bg-green-500 border-green-500 text-white' : 
                        'border-gray-400 text-gray-400'
                    }`}>
                        2
                    </div>
                </div>
                <div className="flex justify-between text-sm text-gray-300">
                    <span>Subir imagen</span>
                    <span>Analizar noticia</span>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="bg-gradient-to-br from-[#23253A] to-[#2A2D47] rounded-2xl p-8 shadow-xl border border-[#7B8AFF]/20">
                {!file ? (
                    /* Zona de carga */
                    <div className="flex flex-col items-center">
                        <label
                            htmlFor="fileInput"
                            className={`upload-area flex flex-col items-center justify-center w-full h-64 bg-gradient-to-br from-[#1E1E2A] to-[#252841] border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 group ${
                                isDragOver 
                                ? 'border-[#54B7A1] bg-gradient-to-br from-[#54B7A1]/10 to-[#7B8AFF]/10' 
                                : 'border-[#7B8AFF] hover:border-[#54B7A1] hover:bg-gradient-to-br hover:from-[#7B8AFF]/5 hover:to-[#54B7A1]/5'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center space-y-4">
                                {/* Icono de upload animado */}
                                <div className="relative">
                                    <svg className="w-16 h-16 text-[#7B8AFF] group-hover:text-[#54B7A1] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#54B7A1] rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {isDragOver ? "¡Suelta la imagen aquí!" : "Sube tu imagen"}
                                    </h3>
                                    <p className="text-[#7B8AFF] group-hover:text-[#54B7A1] transition-colors">
                                        {isDragOver ? (
                                            "Suelta para analizar la imagen"
                                        ) : (
                                            <>
                                                Arrastra y suelta una imagen aquí, o 
                                                <span className="font-semibold"> haz clic para seleccionar</span>
                                            </>
                                        )}
                                    </p>
                                    <p className="text-gray-400 text-sm mt-2">
                                        Formatos soportados: JPG, PNG, WebP (máx. 10MB)
                                    </p>
                                </div>
                            </div>
                        </label>
                        <input
                            id="fileInput"
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleInputChange}
                            className="hidden"
                        />
                    </div>
                ) : (
                    /* Vista previa compacta y elegante */
                    <div className="space-y-6">
                        {filePreview && (
                            <div className="w-full">
                                <h3 className="text-lg font-bold text-white mb-4 text-center">Imagen seleccionada</h3>
                                
                                {/* Imagen centrada y más grande */}
                                <div className="flex justify-center mb-4">
                                    <img
                                        src={filePreview}
                                        alt="Vista previa"
                                        className="max-w-lg h-auto max-h-80 object-cover rounded-xl border border-[#7B8AFF]/30 shadow-lg"
                                    />
                                </div>

                                {/* Información del archivo en formato más compacto */}
                                <div className="bg-[#1E1E2A] rounded-lg p-3 max-w-sm mx-auto">
                                    <div className="grid grid-cols-2 gap-3 text-center">
                                        <div>
                                            <span className="text-gray-400 text-xs uppercase tracking-wide block mb-1">Archivo</span>
                                            <span className="text-[#7B8AFF] font-medium text-xs break-words leading-tight">
                                                {file?.name}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-xs uppercase tracking-wide block mb-1">Tamaño</span>
                                            <span className="text-[#54B7A1] font-medium text-xs">
                                                {file && formatFileSize(file.size)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Estado del proceso - Solo cuando está analizando */}
                        {currentStep === 'analyzing' && (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-[#54B7A1] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                    <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Analizando noticia...</h3>
                                <p className="text-gray-300">Extrayendo texto y evaluando la veracidad del contenido</p>
                                {extractedText && (
                                    <div className="bg-[#1E1E2A] rounded-lg p-4 mt-4 max-w-md mx-auto">
                                        <h4 className="text-sm font-semibold text-[#7B8AFF] mb-2">Texto extraído:</h4>
                                        <p className="text-sm text-gray-300 max-h-20 overflow-y-auto">
                                            {extractedText.length > 200 ? extractedText.slice(0, 200) + "..." : extractedText}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Botones de acción */}
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => {
                                    setFile(null);
                                    setFilePreview(null);
                                    setExtractedText(null);
                                    setResultData(null);
                                    setCurrentStep('upload');
                                }}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
                                disabled={isLoading}
                            >
                                Cambiar imagen
                            </button>
                            
                            {currentStep === 'upload' && (
                                <button
                                    onClick={handleAnalyzeNews}
                                    className="bg-gradient-to-r from-[#54B7A1] to-[#7B8AFF] hover:from-[#429c87] hover:to-[#5a6eea] text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    disabled={isLoading}
                                >
                                    <span className="flex items-center space-x-2">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Analizar noticia</span>
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {resultData && currentStep === 'complete' && (
                <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-8">
                    <div className="flex justify-center items-start px-8">
                        <div className="flex items-start gap-8 w-full max-w-7xl">
                            <div className="flex-shrink-0">
                                <VeracidadCard
                                    veracidad={resultData.veracity}
                                    votos={resultData.veracity}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <ResultCard resultData={resultData} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadForm;