import { computed, type WritableComputedRef } from '@vue/reactivity'

import { $timeZone } from './nano'

export const useTimeZoneStore = function (): {
  serverTZ: WritableComputedRef<string | undefined>
} {
  const serverTZ = computed<string | undefined>({
    get() {
      return $timeZone.get()
    },
    set(value: string) {
      $timeZone.set(value)
    },
  })

  return { serverTZ }
}
