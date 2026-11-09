// Types for icon-controls.js, so a site that imports it from the package is type-checked.

/** A copy of the icon rendered into <template data-icon="key">, or nothing if there is none. */
export function icon(key: string): Node;
/** An icon-only <a> or <button> with its accessible name and hover label. */
export function iconControl<T extends 'a' | 'button'>(
  tag: T,
  key: string,
  label: string,
  className?: string,
): HTMLElementTagNameMap[T];
/**
 * Call just before removing `item` from `list`, with focus on its remove button. Returns a
 * function to call just after: it moves focus to the remove button now in that place, or to
 * `fallback` once the list is empty.
 */
export function focusAfterRemoval(
  list: Element,
  item: Element,
  selector: string,
  fallback?: HTMLElement | null,
): () => void;
