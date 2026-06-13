import { computed, ref, type Ref, type WritableComputedRef } from '@vue/reactivity'

import type { ErrorMessages, Flash } from '~/types'

export const useExternalErrors = function <P extends string>(
  flash: Ref<Flash>,
): {
  externalErrors: WritableComputedRef<ErrorMessages<P>>
  clearExternalErrors: () => void
  success: boolean
  isSuccess: boolean
} {
  const errors = ref<ErrorMessages<P>>({})

  const externalErrors = computed<ErrorMessages<P>>({
    get() {
      return errors.value as ErrorMessages<string>
    },
    set(value: ErrorMessages<P>) {
      if (errors.value) {
        for (const key in value) {
          ;(errors.value as ErrorMessages<P>)[key] = value[key] ?? []
        }
      }
    },
  })

  const clearExternalErrors = (): void => {
    externalErrors.value = {}
  }

  const success = computed<boolean>(() => {
    if (flash.value.alert) return false

    const errorMap = errors.value as ErrorMessages<string>
    for (const key in errorMap) {
      if ((errorMap[key] as string[]).length > 0) return false
    }

    return true
  })

  return {
    externalErrors,
    clearExternalErrors,
    success: success.value,
    isSuccess: success.value,
  }
}
