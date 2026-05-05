import { computed, type WritableComputedRef } from '@vue/reactivity'

import { $timeZone } from './nano'

export const useTimeZoneStore = function (): {
  serverTimeZone: WritableComputedRef<string, string>
} {
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
