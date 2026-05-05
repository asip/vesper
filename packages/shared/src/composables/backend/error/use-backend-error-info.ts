import { computed, ref, type ComputedRef } from '@vue/reactivity'
import type { BackendErrorInfo } from '~/types'

export const useBackendErrorInfo = function <R extends object>(): {
  backendErrorInfo: ComputedRef<BackendErrorInfo<R>>
  clearBackendErrorInfo: () => void
} {
  const info = ref<BackendErrorInfo<R>>({})

  const backendErrorInfo = computed<BackendErrorInfo<R>>(() => {
    return info.value as BackendErrorInfo<R>
  })

  const clearBackendErrorInfo = (): void => {
    info.value = {}
  }

  return { backendErrorInfo, clearBackendErrorInfo }
}
