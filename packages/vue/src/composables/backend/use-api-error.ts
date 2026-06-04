import { computed, ref, type Ref, type WritableComputedRef } from '@vue/reactivity'

import type { FetchError } from 'ofetch'

import type {
  ErrorsResource,
  BackendErrorResource,
  BackendErrorInfo,
  Flash,
  ErrorMessages,
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
    BackendErrorInfo<BER>,
    FetchError<BER | ErrorsResource<ErrorMessages<string>>>
  >
  setError: (
    error: FetchError<ErrorsResource<ErrorMessages<string>> | BER>,
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
    BackendErrorInfo<BER>,
    FetchError<BER | ErrorsResource<ErrorMessages<string>>>
  >({
    get() {
      return info.value
    },
    set(error: FetchError<BER | ErrorsResource<ErrorMessages<string>>>) {
      clearBackendErrorInfo()
      info.value.status = error.status
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
            flash.value.alert = i18n.global.t('backend.error.api', { message: error.message })
        }
      }
      off.value = false
    },
  })

  const setError = function (
    error: FetchError<ErrorsResource<ErrorMessages<string>> | BER>,
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
