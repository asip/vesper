import { Ref } from '@vue/reactivity'

import type { FetchError } from 'ofetch'

import type {
  ErrorsResource,
  BackendErrorResource,
  BackendErrorInfo,
  Flash,
} from '../../interfaces'
import type { ErrorMessages } from '../../types'

import { useBackendErrorInfo } from './error'

import { i18n } from '../../i18n'

interface UseAlertOptions {
  flash: Ref<Flash>
  caller?: UseAlertCallerType
}

interface UseAlertCallerType {
  externalErrors?: Ref<ErrorMessages<string>>
  clearAccount?: () => void
}

export const useAlert = function <BER extends object = BackendErrorResource>({
  flash,
  caller,
}: UseAlertOptions): {
  backendErrorInfo: Ref<BackendErrorInfo<BER>, BER>
  setError: (
    error: FetchError<ErrorsResource<ErrorMessages<string>> | BER>,
    options?: {
      off?: boolean
    },
  ) => void
  reload: () => void
} {
  const { backendErrorInfo, clearBackendErrorInfo } = useBackendErrorInfo<BER>()

  const setError = function (
    error: FetchError<ErrorsResource<ErrorMessages<string>> | BER>,
    options?: { off?: boolean },
  ): void {
    const off = options?.off ?? false

    clearBackendErrorInfo()
    backendErrorInfo.value.status = error.status
    if (off) {
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
  }

  const reload = (): void => {
    if (backendErrorInfo.value.status == 404) {
      globalThis.setTimeout(() => {
        globalThis.location.reload()
      }, 1000)
    }
  }

  return { backendErrorInfo, setError, reload }
}

export type UseAlertType = ReturnType<typeof useAlert>
