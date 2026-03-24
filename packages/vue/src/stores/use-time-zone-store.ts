import { computed } from '@vue/reactivity'

import { $timeZone } from './nano'

export const useTimeZoneStore = function () {
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
