type NewsResult = {
    summary: string;
    title: string;
    veracity: number;
    argument: string;
};

function validateNewsResult(obj: any): obj is NewsResult {
    if (!obj) return false;

    // Verificar que existen las claves
    const requiredKeys: (keyof NewsResult)[] = [
        "summary",
        "title",
        "veracity",
        "argument",
    ];
    for (const key of requiredKeys) {
        if (!(key in obj)) return false;
    }

    // Verificar valores
    if (typeof obj.summary !== "string" || obj.summary.trim() === "")
        return false;
    if (typeof obj.title !== "string" || obj.title.trim() === "") return false;
    if (typeof obj.argument !== "string" || obj.argument.trim() === "")
        return false;
    if (
        typeof obj.veracity !== "number" ||
        ![0, 25, 50, 75, 100].includes(obj.veracity)
    )
        return false;

    return true;
}

export {validateNewsResult};