import { WritableComputedRef } from '@vue/reactivity'
import { useBaseUrlStore } from '../../../stores/use-base-url-store'

export const useApiConstants = function (): {
  baseURL: WritableComputedRef<string, string>
} {
  const { baseURL } = useBaseUrlStore()

  return { baseURL }
}

export type ApiConstantsType = ReturnType<typeof useApiConstants>
