import { WritableComputedRef } from '@vue/reactivity'
import { useConfigStore } from '~/stores/use-config-store'

export const useApiConstants = function (): {
  baseURL: WritableComputedRef<string | undefined>
} {
  const { baseURL } = useConfigStore()

  return { baseURL }
}

export type ApiConstantsType = ReturnType<typeof useApiConstants>
