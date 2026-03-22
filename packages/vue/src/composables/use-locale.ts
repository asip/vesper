import { i18n } from '../i18n'

export const useLocale = () => {
  const { locale, availableLocales, fallbackLocale } = i18n.global

  const autoDetect = (): void => {
    const viewLocale = globalThis.navigator.languages[0]

    type AvailableLocales = (typeof availableLocales)[number]

    locale.value = (
      (availableLocales as string[]).includes(viewLocale) ? viewLocale : fallbackLocale.value
    ) as AvailableLocales
  }

  return { locale, autoDetect }
}
