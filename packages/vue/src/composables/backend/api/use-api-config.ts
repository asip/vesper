import { WritableComputedRef } from '@vue/reactivity'
import { useConfigStore } from '~/stores/use-config-store'

export const useApiConfig = function (): {
  baseURL: WritableComputedRef<string | undefined>
} {
  const { baseURL } = useConfigStore()

  return { baseURL }
}

// export type ApiConfigType = ReturnType<typeof useApiConfig>
