import { ref } from '@vue/reactivity'

import type { FetchOptions, FetchError, FetchResponse } from 'ofetch'

import { useHttpHeaders } from './use-http-headers'
import { useApiConstants } from './use-api-constants'
import { useOFetch } from './use-ofetch'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SearchParams = Record<string, any>

export interface QueryAPIOptions {
  query?: SearchParams
  token?: string | null
  signal?: AbortSignal
  onRequestError?: ({ error }: { error: Error }) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onResponseError?: ({ response }: { response: FetchResponse<any> }) => void
  fresh?: boolean
  cache?: boolean
}

// eslint-disable-next-line
export const useQueryApi = async <T = unknown, E = any>(
  url: string,
  options?: QueryAPIOptions,
): Promise<{
  token: string | undefined
  data: T | undefined
  error: FetchError<E> | undefined
  pending: boolean
}> => {
  const { commonHeaders } = useHttpHeaders()
  const { baseURL } = useApiConstants()

  const tokenRef = ref<string>()

  const headers: Record<string, string> = commonHeaders.value

  if (options?.token) {
    headers.Authorization = `Bearer ${options.token}`
    tokenRef.value = options.token
  }

  const getOptions: FetchOptions<'json'> = {
    baseURL: baseURL.value,
    method: 'get',
    query: options?.query ?? {},
    headers,
    onResponse({ response }: { response: FetchResponse<T> }) {
      if (!tokenRef.value) tokenRef.value = response.headers.get('Authorization')?.split(' ')[1]
    },
  }

  if (options?.signal) {
    getOptions.signal = options.signal
  }

  if (options?.onRequestError) {
    getOptions.onRequestError = options.onRequestError
  }

  if (options?.onResponseError) {
    getOptions.onResponseError = options.onResponseError
  }

  const { data, error, pending } = await useOFetch<T, E>(url, getOptions)

  return { token: tokenRef.value, data, error, pending: pending }
}
