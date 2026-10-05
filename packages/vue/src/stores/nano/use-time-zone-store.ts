import { type WritableComputedRef } from '@vue/reactivity'

import { usePersistentStore } from './use-persistent-store'

export const useTimeZoneStore = function (): {
  serverTZ: WritableComputedRef<string | undefined>
} {
  const serverTZ = usePersistentStore('timeZone')

  return { serverTZ }
}
