import { computed, ref, type WritableComputedRef, type Ref } from '@vue/reactivity'

import type { FetchError } from 'ofetch'

import type { BackendErrorInfo, Flash, ErrorsResource, ErrorMessages } from '~/types'

import { i18n } from '~/i18n'

import { UseApiErrorOptions } from '../use-api-error'

export const useBackendErrorInfo = function <R extends object>(
  flash: Ref<Flash>,
  options?: UseApiErrorOptions,
): {
  backendErrorInfo: WritableComputedRef<
    BackendErrorInfo<R>,
    FetchError<R | ErrorsResource<ErrorMessages<string>>>
  >
  clearBackendErrorInfo: () => void
  off: Ref<boolean, boolean>
} {
  const info = ref<BackendErrorInfo<R>>({})

  const off = ref<boolean>(false)

  const backendErrorInfo = computed<
    BackendErrorInfo<R>,
    FetchError<R | ErrorsResource<ErrorMessages<string>>>
  >({
    get() {
      return info.value as BackendErrorInfo<R>
    },
    set(error: FetchError<R | ErrorsResource<ErrorMessages<string>>>) {
      const caller = options?.caller

      clearBackendErrorInfo()
      backendErrorInfo.value.status = error.status
      if (off.value) {
        switch (error.status) {
          case 401:
            // flash.value.alert = i18n.t('backend.error.login')
            if (caller && 'clearAccount' in caller && caller.clearAccount) caller.clearAccount()
            break
          // default:
          //  flash.value.alert = $i18n.t('backend.error.api', { message: error.message })
        }
      } else {
        switch (error.status) {
          case 401:
            flash.value.alert = i18n.global.t('backend.error.login')
            if (caller && 'clearAccount' in caller && caller.clearAccount) caller.clearAccount()
            break
          case 404:
            {
              const backendError = error.data as R
              backendErrorInfo.value.error = backendError
            }
            break
          case 422: {
            if (caller && 'externalErrors' in caller && caller.externalErrors && error.data) {
              const { errors } = error.data as ErrorsResource<ErrorMessages<string>>
              // globalThis.console.log(errors)
              caller.externalErrors.value = errors
            }
            break
          }
          default:
            flash.value.alert = i18n.global.t('backend.error.api', { message: error.message })
        }
      }
      off.value = false
    },
  })

  const clearBackendErrorInfo = (): void => {
    info.value = {}
  }

  return { backendErrorInfo, clearBackendErrorInfo, off }
}
