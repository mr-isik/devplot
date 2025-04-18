import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely creates an object URL from various image input types
 * Returns null if the image is invalid, so the component can decide whether to render anything
 */
export function getSafeImageUrl(image: any): string | undefined {
  try {
    // Case 1: null, undefined, empty values
    if (!image) {
      return undefined;
    }

    // Case 2: Already a simple string (URL or path)
    if (typeof image === "string") {
      // Check for empty string or array-like strings
      if (
        image.trim() === "" ||
        image === "[]" ||
        image === "{}" ||
        image === "null"
      ) {
        return undefined;
      }
      return image;
    }

    // Case 3: Single File object
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }

    // Case 4: Array with items
    if (Array.isArray(image)) {
      // Empty array check
      if (image.length === 0) {
        return undefined;
      }

      const firstItem = image[0];

      // First item null/undefined check
      if (!firstItem) {
        return undefined;
      }

      // Check if first item is a string that represents an empty array/object
      if (typeof firstItem === "string") {
        if (
          firstItem.trim() === "" ||
          firstItem === "[]" ||
          firstItem === "{}" ||
          firstItem === "null"
        ) {
          return undefined;
        }
        return firstItem;
      }

      // If first item is a File
      if (firstItem instanceof File) {
        return URL.createObjectURL(firstItem);
      }
    }

    // Default: Nothing valid found
    return undefined;
  } catch (error) {
    console.error("Image processing error:", error);
    return undefined;
  }
}
