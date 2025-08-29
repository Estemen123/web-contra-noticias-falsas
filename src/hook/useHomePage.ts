import { useState } from "react";

const useHOmePage = () => {
    const [buttomChange, setButtomChange] = useState(false);
    const [resultData, setResultData] = useState<{
        title: string;
        summary: string;
        veracity: string;
        argument: string;
    } | null>(null);
    const [resultValid, setResultValid] = useState(false);

    return {
        resultData,
        setResultData,
        buttomChange,
        setButtomChange,
        resultValid,
        setResultValid,
    };
};

export { useHOmePage };
