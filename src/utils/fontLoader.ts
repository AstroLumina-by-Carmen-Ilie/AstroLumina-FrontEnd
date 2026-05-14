import { R2_BASE_URL } from "@/config";

const R2_FONTS_URL = R2_BASE_URL + "/fonts";

const fontCache = new Map<string, string>();

export async function loadFontAsBase64(filename: string): Promise<string> {
  if (fontCache.has(filename)) {
    return fontCache.get(filename)!;
  }

  const url = `${R2_FONTS_URL}/${filename}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load font: ${url} (${response.status})`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  // Chunk to avoid call stack overflow with large font files
  let binary = "";
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  const base64 = btoa(binary);
  fontCache.set(filename, base64);
  return base64;
}

export async function loadFontsForPDF(
  doc: any,
  fonts: { filename: string; family: string; style: string }[],
): Promise<void> {
  for (const font of fonts) {
    const base64 = await loadFontAsBase64(font.filename);
    doc.addFileToVFS(font.filename, base64);
    doc.addFont(font.filename, font.family, font.style);
  }
}
