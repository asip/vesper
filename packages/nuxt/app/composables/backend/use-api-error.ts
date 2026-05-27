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

  const { backendErrorInfo, off } = useBackendErrorInfo<BER>(flash, { caller })

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

export type UseApiErrorType = ReturnType<typeof useApiError>
