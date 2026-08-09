import { computed, ref, type Ref, type WritableComputedRef } from '@vue/reactivity'

import type { FetchError } from 'ofetch'

import type {
  ErrorsResource,
  BackendErrorResource,
  BackendErrorsResource,
  BackendErrorInfo,
  ErrorMessages,
  Flash,
} from '~/types'

import { useBackendErrorInfo } from './error'

import { i18n } from '~/i18n'

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
    FetchError<BackendErrorsResource<BER>>
  >
  setError: (
    error: FetchError<BackendErrorsResource<BER>>,
    options?: {
      off?: boolean
    },
  ) => void
  off: Ref<boolean, boolean>
  reload: () => void
} {
  const caller = options?.caller

  const { backendErrorInfo: info, clearBackendErrorInfo } = useBackendErrorInfo<BER>()

  const off = ref<boolean>(false)

  const backendErrorInfo = computed<
    BackendErrorInfo<BackendErrorsResource<BER>>,
    FetchError<BackendErrorsResource<BER>>
  >({
    get() {
      return info.value
    },
    set(error: FetchError<BackendErrorsResource<BER>>) {
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
    if (!off.value) flash.value.alert = i18n.global.t('backend.error.login')
    if (caller && 'clearAccount' in caller && caller.clearAccount) caller.clearAccount()
  }

  const notFound = (error: FetchError<BackendErrorsResource<BER>>) => {
    const backendError = error.data as BER
    info.value.error = backendError
  }

  const unprocessableContent = (error: FetchError<BackendErrorsResource<BER>>) => {
    if (caller && 'externalErrors' in caller && caller.externalErrors && error.data) {
      const { errors } = error.data as ErrorsResource<ErrorMessages<string>>
      // globalThis.console.log(errors)
      caller.externalErrors.value = errors
    }
  }

  const otherError = (error: FetchError<BackendErrorsResource<BER>>) => {
    flash.value.alert = i18n.global.t('backend.error.api', { message: error.message })
  }

  const setError = function (
    error: FetchError<BackendErrorsResource<BER>>,
    options?: { off?: boolean },
  ): void {
    off.value = options?.off ?? false

    backendErrorInfo.value = error
  }

  const reload = (): void => {
    if (info.value.status === 404) {
      globalThis.setTimeout(() => {
        globalThis.location.reload()
      }, 1000)
    }
  }

  return { backendErrorInfo, setError, off, reload }
}
