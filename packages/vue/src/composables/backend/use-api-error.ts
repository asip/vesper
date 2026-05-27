import type { Ref, WritableComputedRef } from '@vue/reactivity'

import type { FetchError } from 'ofetch'

import type {
  ErrorsResource,
  BackendErrorResource,
  BackendErrorInfo,
  Flash,
  ErrorMessages,
} from '~/types'

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

  const { backendErrorInfo, off } = useBackendErrorInfo<BER>(flash, { caller })

  const setError = function (
    error: FetchError<ErrorsResource<ErrorMessages<string>> | BER>,
    options?: { off?: boolean },
  ): void {
    off.value = options?.off ?? false

    backendErrorInfo.value = error
  }

  const reload = (): void => {
    if (backendErrorInfo.value.status === 404) {
      globalThis.setTimeout(() => {
        globalThis.location.reload()
      }, 1000)
    }
  }

  return { backendErrorInfo, setError, off, reload }
}

export type UseApiErrorType = ReturnType<typeof useApiError>
