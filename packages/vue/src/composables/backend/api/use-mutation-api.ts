import { ref } from '@vue/reactivity'

import type { FetchContext, FetchOptions, FetchError, FetchResponse } from 'ofetch'

import { useHttpHeaders } from './use-http-headers'
import { useApiConstants } from './use-api-constants'
import { useOFetch } from './use-ofetch'

interface MutationAPIOptions {
  method: 'post' | 'put' | 'delete'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any> | FormData
  token?: string | null
  baseURL?: string | null
  retry?: number | false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  retryDelay?: number | ((context: FetchContext<any, "json">) => number)
  retryStatusCodes?: number[]
  timeout?: number
  onRequestError?: ({ error }: { error: Error }) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onResponseError?: ({ response }: { response: FetchResponse<any> }) => void
}

// eslint-disable-next-line
export const useMutationApi = async function <T = unknown, E = any>(
  url: string,
  {
    method,
    body = {},
    token = null,
    baseURL = null,
    retry,
    retryDelay,
    retryStatusCodes,
    timeout,
    onRequestError,
    onResponseError,
  }: MutationAPIOptions,
): Promise<{
  token: string | null | undefined
  data: T | undefined
  error: FetchError<E> | undefined
  pending: boolean
}> {
  const { commonHeaders } = useHttpHeaders()
  const { baseURL: baseUrl } = useApiConstants()

  const headers: Record<string, string> = commonHeaders.value

  const tokenRef = ref<string | null>()

  if (token) headers.Authorization = `Bearer ${token}`

  const options: FetchOptions<'json'> = {
    baseURL: baseURL ?? baseUrl.value,
    headers,
    method,
  }

  if (retry) options.retry = retry
  if (retryDelay) options.retryDelay = retryDelay
  if (retryStatusCodes) options.retryStatusCodes = retryStatusCodes

  if (timeout) options.timeout = timeout

  if (onRequestError) options.onRequestError = onRequestError
  if (onResponseError) options.onResponseError = onResponseError

  if (method == 'post' || method == 'put') options.body = body

  options.onResponse = ({ response }: { response: FetchResponse<T> }) => {
    tokenRef.value = response.headers.get('Authorization')?.split(' ')[1] ?? token
  }

  const { data, error, pending } = await useOFetch<T, E>(url, options)

  return { token: tokenRef.value, data, error, pending }
}
