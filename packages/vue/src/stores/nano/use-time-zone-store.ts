import { type Ref } from '@vue/reactivity'

import { usePersistentStore } from './use-persistent-store'

export const useTimeZoneStore = function (): {
  serverTZ: Ref<string | undefined>
} {
  const serverTZ = usePersistentStore('timeZone')

  return { serverTZ }
}
