import { STORAGE_KEYS, STORAGE_KEYS_TYPES } from "@/constants/storage";

export function getFromLocalStorage(
  key: keyof STORAGE_KEYS_TYPES
): string | null {
  return localStorage.getItem(STORAGE_KEYS[key]) || null;
}

export function SetFromLocalStorage(
  key: keyof STORAGE_KEYS_TYPES,
  value: string
) {
  return localStorage.setItem(STORAGE_KEYS[key], value);
}
export function RemoveFromLocalStorage(key: keyof STORAGE_KEYS_TYPES) {
  return localStorage.removeItem(STORAGE_KEYS[key]);
}
