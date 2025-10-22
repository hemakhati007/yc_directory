import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
//this will help us merge tailwind classes and avoid conflicts


export function formatDate(date: string) {     
  return new Date(date).toLocaleDateString('en-US',{
    month:'long',
    day:'numeric',
    year:'numeric'
  })
}
export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}