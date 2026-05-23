import { computed, type WritableComputedRef } from '@vue/reactivity'
import { persistentAtom } from '@nanostores/persistent'

const $serverTZ = persistentAtom<string | undefined>('timeZone', undefined)

export const useTimeZoneStore = function (): {
  serverTZ: WritableComputedRef<string | undefined>
} {
  const serverTZ = computed<string | undefined>({
    get() {
      return $serverTZ.get()
    },
    set(value: string) {
      $serverTZ.set(value)
    },
  })

  return { serverTZ }
}
