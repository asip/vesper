import { ref, type Ref } from '@vue/reactivity'

import type { BackendErrorInfo } from '~/types'

export const useBackendErrorInfo = function <R extends object>(): {
  backendErrorInfo: Ref<BackendErrorInfo<R>>
  clearBackendErrorInfo: () => void
} {
  const backendErrorInfo = ref<BackendErrorInfo<R>>({}) as Ref<BackendErrorInfo<R>>

  const clearBackendErrorInfo = (): void => {
    backendErrorInfo.value = {}
  }

  return { backendErrorInfo, clearBackendErrorInfo }
}
