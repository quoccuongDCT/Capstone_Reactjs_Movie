import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(url, fallback = "/placeholder.svg") {
  if (!url) return fallback

  // Check if URL is valid
  try {
    new URL(url)
    return url
  } catch {
    // If not a valid URL, assume it's a local path
    return url.startsWith("/") ? url : `/${url}`
  }
}

export function formatDuration(minutes) {
  if (!minutes) return "128 min"
  return `${minutes} min`
}

export function formatRating(rating) {
  if (!rating) return "3.5"
  return typeof rating === "number" ? rating.toFixed(1) : rating
}
