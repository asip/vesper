import type { WritableComputedRef } from '@vue/reactivity'

import { useConfigStore } from '~/stores/use-config-store'

export const useConfig = function (): {
  baseURL: WritableComputedRef<string | undefined>
  serverTZ: WritableComputedRef<string | undefined>
} {
  const { baseURL, serverTZ } = useConfigStore()

  return { baseURL, serverTZ }
}
