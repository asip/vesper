import type { FetchContext, FetchOptions, FetchError, FetchResponse } from 'ofetch'

import { useHttpHeaders } from './use-http-headers'
import { useApiConfig } from './use-api-config'
import { useOFetch } from './use-ofetch'

interface MutationAPIOptions {
  method: 'post' | 'put' | 'delete'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any> | FormData
  token?: string | null
  baseURL?: string | null
  retry?: number | false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  retryDelay?: number | ((context: FetchContext<any, 'json'>) => number)
  retryStatusCodes?: number[]
  timeout?: number
  onRequestError?: ({ error }: { error: Error }) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onResponseError?: ({ response }: { response: FetchResponse<any> }) => void
}

/**
 *
 * @param url
 * @param options
 * @returns
 */
// eslint-disable-next-line
export const useMutationApi = async function <T = unknown, E = any>(
  url: string,
  options: MutationAPIOptions,
): Promise<{
  token: string | null | undefined
  data: T | undefined
  error: FetchError<E> | undefined
  pending: boolean
}> {
  const { commonHeaders } = useHttpHeaders()
  const { baseURL: baseUrl } = useApiConfig()

  const method = options.method
  const body = options.body ?? {}
  const token = options.token ?? null
  const baseURL = options.baseURL ?? null
  const retry = options.retry
  const retryDelay = options.retryDelay
  const retryStatusCodes = options.retryStatusCodes
  const timeout = options.timeout
  const onRequestError = options.onRequestError
  const onResponseError = options.onResponseError

  const headers: Record<string, string> = commonHeaders.value

  const tokenRef = ref<string | null>()

  if (token) headers.Authorization = `Bearer ${token}`

  const mutOptions: FetchOptions<'json'> = {
    baseURL: baseURL ?? baseUrl.value,
    headers,
    method,
  }

  if (retry) mutOptions.retry = retry
  if (retryDelay) mutOptions.retryDelay = retryDelay
  if (retryStatusCodes) mutOptions.retryStatusCodes = retryStatusCodes

  if (timeout) mutOptions.timeout = timeout

  if (onRequestError) mutOptions.onRequestError = onRequestError
  if (onResponseError) mutOptions.onResponseError = onResponseError

  if (method === 'post' || method === 'put') mutOptions.body = body

  mutOptions.onResponse = ({ response }: { response: FetchResponse<T> }) => {
    tokenRef.value = response.headers.get('Authorization')?.split(' ')[1] ?? token
  }

  const { data, error, pending } = await useOFetch<T, E>(url, mutOptions)

  return { token: tokenRef.value, data, error, pending }
}
