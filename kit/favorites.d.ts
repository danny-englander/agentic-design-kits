// Types for favorites.js, so a site that imports it from the package is type-checked.

/** The saved favorite ids, oldest first. */
export function getFavorites(): string[];
/** Adds the id if it is not saved, removes it if it is, then fires 'favorites:change'. */
export function toggleFavorite(id: string): void;
