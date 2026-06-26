import { computed, type ComputedRef, type WritableComputedRef } from '@vue/reactivity'

import { format, tzDate } from '@formkit/tempo'

import { useConfigStore } from '~/stores/use-config-store'

import { useLocale } from './use-locale'
import { useDatetimeLocal } from './use-datetime-local'

interface TimeZone {
  client: string
  server: string
}

interface TZOptions {
  text: string
  value: string
}

export const useTimeZone = function (fmtDT = 'YYYY/MM/DD HH:mm'): {
  timeZone: ComputedRef<TimeZone>
  serverTZ: WritableComputedRef<string | undefined>
  tzOptions: ComputedRef<TZOptions[]>
  upTZ: (datetime: string | null) => string
  downTZ: (datetime: string | null) => string
  formatTZ: (datetime: string | null, fmt: string) => string
  formatHtmlTZ: (datetime: string | null, fmt: string) => string
} {
  const { locale } = useLocale()
  const { toISO8601, formatDT } = useDatetimeLocal(fmtDT)
  const { serverTZ } = useConfigStore()

  const clientTZ = computed<string>(() => Intl.DateTimeFormat().resolvedOptions().timeZone)

  const timeZone = computed<TimeZone>(() => ({
    client: clientTZ.value,
    server: serverTZ.value ? serverTZ.value : clientTZ.value,
  }))

  const tzOptions = computed<TZOptions[]>(() =>
    Intl.supportedValuesOf('timeZone').map((e) => ({ text: e, value: e })),
  )

  const tzServerDate = (datetime: string): Date => {
    return tzDate(toISO8601(datetime), timeZone.value.server)
  }

  const tzClientDate = (datetime: string): Date => {
    return tzDate(toISO8601(datetime), timeZone.value.client)
  }

  const upTZ = (datetime: string | null): string => {
    return timeZone.value.client === timeZone.value.server
      ? (datetime ?? '')
      : datetime
        ? format({
            date: tzServerDate(datetime),
            format: fmtDT,
            locale: locale.value,
            tz: timeZone.value.client,
          })
        : ''
  }

  const downTZ = (datetime: string | null): string => {
    return timeZone.value.client === timeZone.value.server
      ? (datetime ?? '')
      : datetime
        ? format({
            date: tzClientDate(datetime),
            format: fmtDT,
            locale: locale.value,
            tz: timeZone.value.server,
          })
        : ''
  }

  const formatTZ = (datetime: string | null, fmt: string): string => {
    return timeZone.value.client === timeZone.value.server
      ? formatDT(datetime, fmt)
      : datetime
        ? format({
            date: tzServerDate(datetime),
            format: fmt,
            locale: locale.value,
            tz: timeZone.value.client,
          })
        : ''
  }

  return { timeZone, serverTZ, tzOptions, upTZ, downTZ, formatTZ, formatHtmlTZ: formatTZ }
}
