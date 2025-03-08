
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  if (!name) return "";
  
  const nameParts = name.split(" ").filter(part => part.length > 0);
  
  if (nameParts.length === 0) return "";
  if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
  
  return (
    nameParts[0].charAt(0).toUpperCase() +
    nameParts[nameParts.length - 1].charAt(0).toUpperCase()
  );
}
