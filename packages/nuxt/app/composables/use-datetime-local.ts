import { parse, format } from '@formkit/tempo'

import { useLocale } from './use-locale'

export const useDatetimeLocal = function (fmtDT = 'YYYY/MM/DD HH:mm'): {
  upDTL: (datetime: string | null) => string | null
  downDTL: (datetime: string | null) => string
  toISO8601: (datetime: string) => string
  formatHTML: (datetime: string | null, fmt: string) => string
} {
  const { locale } = useLocale()

  const fmtISO8601 = 'YYYY-MM-DDTHH:mm'

  const parseDT = (datetime: string, format: string): Date => {
    return parse(datetime, format, locale.value)
  }

  const toISO8601 = (datetime: string): string => {
    return format(parseDT(datetime, fmtDT), fmtISO8601, locale.value)
  }

  const fromISO8601 = (datetime: string): string => {
    return format(parseDT(datetime, fmtISO8601), fmtDT, locale.value)
  }

  const upDTL = (datetime: string | null): string | null => {
    return datetime ? toISO8601(datetime) : null
  }

  const downDTL = (datetime: string | null): string => {
    return datetime ? fromISO8601(datetime) : ''
  }

  const formatHTML = (datetime: string | null, fmt: string): string => {
    return datetime ? format(parse(datetime, fmtDT, locale.value), fmt, locale.value) : ''
  }

  return { upDTL, downDTL, toISO8601, formatHTML }
}
