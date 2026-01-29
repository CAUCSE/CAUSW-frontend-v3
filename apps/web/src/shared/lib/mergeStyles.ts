import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with Tailwind CSS conflict resolution
 *
 * @example
 * mergeStyles('px-2 py-1', 'px-4') // => 'py-1 px-4'
 * mergeStyles('text-red-500', condition && 'text-blue-500')
 */
export function mergeStyles(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
