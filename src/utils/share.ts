import { LetterData } from '../types';

export function encodeDataForUrl(data: LetterData): string {
  try {
    const jsonStr = JSON.stringify(data);
    const utf8Bytes = new TextEncoder().encode(jsonStr);
    let binary = '';
    for (let i = 0; i < utf8Bytes.byteLength; i++) {
      binary += String.fromCharCode(utf8Bytes[i]);
    }
    return encodeURIComponent(btoa(binary));
  } catch (err) {
    console.error('Encoding error:', err);
    return encodeURIComponent(JSON.stringify(data));
  }
}

export function decodeDataFromUrl(encoded: string): LetterData | null {
  try {
    const raw = decodeURIComponent(encoded);
    try {
      const binary = atob(raw);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const jsonStr = new TextDecoder().decode(bytes);
      return JSON.parse(jsonStr);
    } catch {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Decoding error:', err);
    return null;
  }
}

export function generateSurpriseShareUrl(data: LetterData): string {
  const encoded = encodeDataForUrl(data);
  const origin = window.location.origin;
  const pathname = window.location.pathname.replace(/\/+$/, '');
  const baseUrl = origin + pathname;
  return `${baseUrl}?v=1&d=${encoded}`;
}
