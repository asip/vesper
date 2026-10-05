import { WritableComputedRef } from '@vue/reactivity'

import { usePersistentStore } from './use-persistent-store'

export const useBaseUrlStore = function (): {
  baseURL: WritableComputedRef<string | undefined>
} {
  const baseURL = usePersistentStore('baseURL')

  return { baseURL }
}
