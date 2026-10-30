import type { Ref } from '@vue/reactivity'

import { useConfigStore } from '~/stores/use-config-store'

export const useConfig = function (): {
  baseURL: Ref<string | undefined>
  serverTZ: Ref<string | undefined>
} {
  const { baseURL, serverTZ } = useConfigStore()

  return { baseURL, serverTZ }
}
