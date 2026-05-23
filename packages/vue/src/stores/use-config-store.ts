import type { WritableComputedRef } from '@vue/reactivity'

import { useBaseUrlStore, useTimeZoneStore } from './nano'

export const useConfigStore = function (): {
  baseURL: WritableComputedRef<string | undefined>
  serverTZ: WritableComputedRef<string | undefined>
} {
  const { baseURL } = useBaseUrlStore()
  const { serverTZ } = useTimeZoneStore()

  return { baseURL, serverTZ }
}
