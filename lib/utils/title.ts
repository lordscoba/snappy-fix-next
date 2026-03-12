export function splitTitle(text: string, part: number = 1): string {
  if (!text) return "";

  const segments = text.split("|").map((s) => s.trim());

  // convert to zero-based index
  const index = part - 1;

  // fallback to first segment if out of range
  return segments[index] ?? segments[0];
}
