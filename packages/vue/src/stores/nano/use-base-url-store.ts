import { Ref } from '@vue/reactivity'

import { usePersistentStore } from './use-persistent-store'

export const useBaseUrlStore = function (): {
  baseURL: Ref<string | undefined>
} {
  const baseURL = usePersistentStore('baseURL')

  return { baseURL }
}
