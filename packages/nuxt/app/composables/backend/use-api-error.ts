import type { FetchError } from 'ofetch'
import type { NuxtError } from 'nuxt/app'

import type {
  ErrorsResource,
  BackendErrorInfo,
  BackendErrorResource,
  BackendErrorsResource,
  ErrorMessages,
  Flash,
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
    BackendErrorInfo<BackendErrorsResource<BER>>,
    NuxtError<BackendErrorsResource<BER>> | FetchError<BackendErrorsResource<BER>>
  >
  setError: (
    error: NuxtError<BackendErrorsResource<BER>> | FetchError<BackendErrorsResource<BER>>,
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
    BackendErrorInfo<BackendErrorsResource<BER>>,
    NuxtError<BackendErrorsResource<BER>> | FetchError<BackendErrorsResource<BER>>
  >({
    get() {
      return info.value
    },
    set(error: NuxtError<BackendErrorsResource<BER>> | FetchError<BackendErrorsResource<BER>>) {
      clearBackendErrorInfo()
      info.value.status = error.status
      if (off.value) {
        switch (error.status) {
          case 401:
            unauthorized()
            break
          // default:
          //  onOtherError(error)
        }
      } else {
        switch (error.status) {
          case 401:
            unauthorized()
            break
          case 404:
            notFound(error)
            break
          case 422: {
            unprocessableContent(error)
            break
          }
          default:
            otherError(error)
        }
      }
      off.value = false
    },
  })

  const unauthorized = () => {
    if (!off.value) flash.value.alert = $i18n.t('backend.error.login')
    if (caller && 'clearAccount' in caller && caller.clearAccount) caller.clearAccount()
  }

  const notFound = (
    error: NuxtError<BackendErrorsResource<BER>> | FetchError<BackendErrorsResource<BER>>,
  ) => {
    const backendError = error.data as BER
    info.value.error = backendError
  }

  const unprocessableContent = (
    error: NuxtError<BackendErrorsResource<BER>> | FetchError<BackendErrorsResource<BER>>,
  ) => {
    if (caller && 'externalErrors' in caller && caller.externalErrors && error.data) {
      const { errors } = error.data as ErrorsResource<ErrorMessages<string>>
      // globalThis.console.log(errors)
      caller.externalErrors.value = errors
    }
  }

  const otherError = (
    error: NuxtError<BackendErrorsResource<BER>> | FetchError<BackendErrorsResource<BER>>,
  ) => {
    flash.value.alert = $i18n.t('backend.error.api', { message: error.message })
  }

  const setError = function (
    error: NuxtError<BackendErrorsResource<BER>> | FetchError<BackendErrorsResource<BER>>,
    options?: { off?: boolean },
  ): void {
    off.value = options?.off ?? false

    backendErrorInfo.value = error
  }

  return { backendErrorInfo, setError, off }
}
