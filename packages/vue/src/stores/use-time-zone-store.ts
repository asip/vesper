import { computed } from '@vue/reactivity'

import { $timeZone } from './nano'

export function useTimeZoneStore() {
  const serverTimeZone = computed<string>({
    get() {
      return $timeZone.get()
    },
    set(value: string) {
      $timeZone.set(value)
    },
  })

  return { serverTimeZone }
}
