// Types for output.js, so a site that imports it from the package is type-checked.

/** Empties the panel's log. */
export function outputClear(panel: Element): void;
/** Adds one line of text to the log: a command ('cmd'), an error ('err') or plain output. */
export function outputLine(panel: Element, text: string, kind?: 'cmd' | 'err'): void;
/** Sets the status text, and shows the spinner while `running` is true. */
export function outputStatus(panel: Element, text: string, running: boolean): void;
