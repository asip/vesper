export const useBrowserLocale = function (): string {
  return globalThis.navigator.language || globalThis.navigator.languages[0]
}
