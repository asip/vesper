import type { FetchError } from 'ofetch'
import type { NuxtError } from 'nuxt/app'

import type {
  ErrorsResource,
  BackendErrorInfo,
  BackendErrorResource,
  Flash,
  ErrorMessages,
} from '../../../types'

import { useBackendErrorInfo } from './error'

export interface UseApiErrorOptions {
  caller?: UseApiErrorCallerType
}

interface UseApiErrorCallerType {
  externalErrors?: Ref<ErrorMessages<string>>
  clearAccount?: () => void
}

export const useApiError = function <BER extends object = BackendErrorResource>(
  flash: Ref<Flash>,
  options?: UseApiErrorOptions,
): {
  backendErrorInfo: WritableComputedRef<
    BackendErrorInfo<BER>,
    | NuxtError<BER | ErrorsResource<ErrorMessages<string>>>
    | FetchError<BER | ErrorsResource<ErrorMessages<string>>>
  >
  setError: (
    error:
      | NuxtError<ErrorsResource<ErrorMessages<string>> | BER>
      | FetchError<ErrorsResource<ErrorMessages<string>> | BER>,
    options?: {
      off?: boolean
    },
  ) => void
  off: Ref<boolean>
} {
  const caller = options?.caller

  const { backendErrorInfo: info, clearBackendErrorInfo } = useBackendErrorInfo<BER>()

  const { $i18n } = useNuxtApp()

  const off = ref<boolean>(false)

  const backendErrorInfo = computed<
    BackendErrorInfo<BER>,
    | NuxtError<BER | ErrorsResource<ErrorMessages<string>>>
    | FetchError<BER | ErrorsResource<ErrorMessages<string>>>
  >({
    get() {
      return info.value
    },
    set(
      error:
        | NuxtError<BER | ErrorsResource<ErrorMessages<string>>>
        | FetchError<BER | ErrorsResource<ErrorMessages<string>>>,
    ) {
      clearBackendErrorInfo()
      info.value.status = error.status
      if (off.value) {
        switch (error.status) {
          case 401:
            if (caller && 'clearAccount' in caller && caller.clearAccount) caller.clearAccount()
            break
          // default:
          //  flash.value.alert = $i18n.t('backend.error.api', { message: error.message })
        }
      } else {
        switch (error.status) {
          case 401:
            flash.value.alert = $i18n.t('backend.error.login')
            if (caller && 'clearAccount' in caller && caller.clearAccount) caller.clearAccount()
            break
          case 404:
            {
              const backendError = error.data as BER
              info.value.error = backendError
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
            flash.value.alert = $i18n.t('backend.error.api', { message: error.message })
        }
      }
      off.value = false
    },
  })

  const setError = function (
    error:
      | NuxtError<ErrorsResource<ErrorMessages<string>> | BER>
      | FetchError<ErrorsResource<ErrorMessages<string>> | BER>,
    options?: { off?: boolean },
  ): void {
    off.value = options?.off ?? false

    backendErrorInfo.value = error
  }

  return { backendErrorInfo, setError, off }
}
