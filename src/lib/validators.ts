type NewsResult = {
    summary: string;
    title: string;
    veracity: number;
    argument: string;
};

function validateNewsResult(obj: unknown): obj is NewsResult {
  if (typeof obj !== "object" || obj === null) return false;

  const candidate = obj as Record<string, unknown>;

  // Verificar claves requeridas
  const requiredKeys: (keyof NewsResult)[] = [
    "summary",
    "title",
    "veracity",
    "argument",
  ];
  for (const key of requiredKeys) {
    if (!(key in candidate)) return false;
  }

  // Verificar valores
  if (typeof candidate.summary !== "string" || candidate.summary.trim() === "")
    return false;
  if (typeof candidate.title !== "string" || candidate.title.trim() === "")
    return false;
  if (typeof candidate.argument !== "string" || candidate.argument.trim() === "")
    return false;
  if (
    typeof candidate.veracity !== "number" ||
    ![0, 25, 50, 75, 100].includes(candidate.veracity)
  )
    return false;

  return true;
}

export {validateNewsResult};