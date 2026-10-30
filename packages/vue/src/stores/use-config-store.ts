import type { Ref } from '@vue/reactivity'

import { useBaseUrlStore, useTimeZoneStore } from './nano'

export const useConfigStore = function (): {
  baseURL: Ref<string | undefined>
  serverTZ: Ref<string | undefined>
} {
  const { baseURL } = useBaseUrlStore()
  const { serverTZ } = useTimeZoneStore()

  return { baseURL, serverTZ }
}
