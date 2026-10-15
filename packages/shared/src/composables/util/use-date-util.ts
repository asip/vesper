import { parse } from '@formkit/tempo'

export const useDateUtil = function (
  fmt = 'YYYY/MM/DD',
  locale?: string,
): {
  isDate: (value: string) => boolean
} {
  const isDate = (value: string): boolean => {
    try {
      const date = value ? parse(value, fmt, locale) : null
      return date instanceof Date && !isNaN(date.getTime())
    } catch {
      return false
    }
  }

  return { isDate }
}
