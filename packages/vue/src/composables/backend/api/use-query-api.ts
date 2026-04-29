import { ref } from '@vue/reactivity'

import type { FetchContext, FetchOptions, FetchError, FetchResponse } from 'ofetch'

import { useHttpHeaders } from './use-http-headers'
import { useApiConstants } from './use-api-constants'
import { useOFetch } from './use-ofetch'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SearchParams = Record<string, any>

export interface QueryAPIOptions {
  query?: SearchParams
  token?: string | null | undefined
  baseURL?: string | null | undefined
  signal?: AbortSignal
  retry?: number | false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  retryDelay?: number | ((context: FetchContext<any, "json">) => number)
  retryStatusCodes?: number[]
  timeout?: number
  onRequestError?: ({ error }: { error: Error }) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onResponseError?: ({ response }: { response: FetchResponse<any> }) => void
  fresh?: boolean
  cache?: boolean
}

// eslint-disable-next-line
export const useQueryApi = async function <T = unknown, E = any>(
  url: string,
  options?: QueryAPIOptions,
): Promise<{
  token: string | null | undefined
  data: T | undefined
  error: FetchError<E> | undefined
  pending: boolean
}> {
  const { commonHeaders } = useHttpHeaders()
  const { baseURL: baseUrl } = useApiConstants()

  const tokenRef = ref<string | null>()

  const headers: Record<string, string> = commonHeaders.value

  if (options?.token) headers.Authorization = `Bearer ${options.token}`

  const getOptions: FetchOptions<'json'> = {
    baseURL: options?.baseURL ?? baseUrl.value,
    method: 'get',
    query: options?.query ?? {},
    headers,
    onResponse({ response }: { response: FetchResponse<T> }) {
      tokenRef.value = response.headers.get('Authorization')?.split(' ')[1] ?? options?.token
    },
  }

  if (options?.retry) getOptions.retry = options.retry
  if (options?.retryDelay) getOptions.retryDelay = options.retryDelay
  if (options?.retryStatusCodes) getOptions.retryStatusCodes = options.retryStatusCodes

  if (options?.timeout) getOptions.timeout = options.timeout

  if (options?.signal) getOptions.signal = options.signal

  if (options?.onRequestError) getOptions.onRequestError = options.onRequestError
  if (options?.onResponseError) getOptions.onResponseError = options.onResponseError

  const { data, error, pending } = await useOFetch<T, E>(url, getOptions)

  return { token: tokenRef.value, data, error, pending: pending }
}
