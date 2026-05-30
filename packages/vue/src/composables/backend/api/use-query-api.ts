import { ref } from '@vue/reactivity'

import type { FetchContext, FetchOptions, FetchError, FetchResponse } from 'ofetch'

import type { AsyncDataRequestStatus } from '~/types'

import { useHttpHeaders } from './use-http-headers'
import { useApiConfig } from './use-api-config'
import { useOFetch } from './use-ofetch'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SearchParams = Record<string, any>

export interface QueryAPIOptions {
  method?: 'get' | 'query'
  query?: SearchParams
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any> | FormData
  token?: string | null | undefined
  baseURL?: string | null | undefined
  signal?: AbortSignal
  retry?: number | false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  retryDelay?: number | ((context: FetchContext<any, 'json'>) => number)
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
  status: AsyncDataRequestStatus
  pending: boolean
}> {
  const { commonHeaders } = useHttpHeaders()
  const { baseURL: baseUrl } = useApiConfig()

  const tokenRef = ref<string | null>()

  const headers: Record<string, string> = commonHeaders.value

  if (options?.token) headers.Authorization = `Bearer ${options.token}`

  const queryOptions: FetchOptions<'json'> = {
    baseURL: options?.baseURL ?? baseUrl.value,
    headers,
    onResponse({ response }: { response: FetchResponse<T> }) {
      tokenRef.value = response.headers.get('Authorization')?.split(' ')[1] ?? options?.token
    },
  }

  if (options?.method) {
    queryOptions.method = options.method

    if (options.method === 'get') queryOptions.query = options.query ?? {}
    if (options.method === 'query') queryOptions.body = options.body ?? {}
  } else {
    if (options?.query) {
      queryOptions.method = 'get'
      queryOptions.query = options.query
    } else if (options?.body) {
      queryOptions.method = 'query'
      queryOptions.body = options.body
    }
  }

  if (options?.retry) queryOptions.retry = options.retry
  if (options?.retryDelay) queryOptions.retryDelay = options.retryDelay
  if (options?.retryStatusCodes) queryOptions.retryStatusCodes = options.retryStatusCodes

  if (options?.timeout) queryOptions.timeout = options.timeout

  if (options?.signal) queryOptions.signal = options.signal

  if (options?.onRequestError) queryOptions.onRequestError = options.onRequestError
  if (options?.onResponseError) queryOptions.onResponseError = options.onResponseError

  const { data, error, status, pending } = await useOFetch<T, E>(url, queryOptions)

  return { token: tokenRef.value, data, error, status, pending }
}
