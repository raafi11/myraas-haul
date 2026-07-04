const STORAGE_KEYS = {
  personPhoto: "myraas-haul-person-photo",
  outfits: "myraas-haul-outfits",
  savedLooks: "myraas-haul-saved-looks",
} as const;

export function loadPersonPhoto(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.personPhoto);
  } catch {
    return null;
  }
}

export function savePersonPhoto(dataUrl: string): void {
  localStorage.setItem(STORAGE_KEYS.personPhoto, dataUrl);
}

export function clearPersonPhoto(): void {
  localStorage.removeItem(STORAGE_KEYS.personPhoto);
}

export function loadOutfits<T>(): T[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.outfits);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function saveOutfits<T>(outfits: T[]): void {
  localStorage.setItem(STORAGE_KEYS.outfits, JSON.stringify(outfits));
}

export function loadSavedLooks<T>(): T[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.savedLooks);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function saveSavedLooks<T>(looks: T[]): void {
  localStorage.setItem(STORAGE_KEYS.savedLooks, JSON.stringify(looks));
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Could not read file."));
    };
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

export async function compressImage(file: File, maxWidth = 1024): Promise<string> {
  const dataUrl = await readFileAsDataUrl(file);

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(dataUrl);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
