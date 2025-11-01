import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// função utilitária 'cn' para mesclar classes do Tailwind de forma segura.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}