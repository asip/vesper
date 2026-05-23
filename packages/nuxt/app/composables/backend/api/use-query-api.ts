import { useAsyncData, useNuxtApp, type NuxtError } from 'nuxt/app'

import type { FetchContext, FetchError, FetchOptions, FetchResponse } from 'ofetch'

import { ref } from 'vue'

import { useHttpHeaders } from './use-http-headers'
import { useApiConfig } from './use-api-config'
import { useOFetch } from './use-ofetch'

type KeysOf<T> = Array<T extends T ? (keyof T extends string ? keyof T : never) : never>

type PickFrom<T, K extends Array<string>> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Array<any>
    ? T
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      T extends Record<string, any>
      ? keyof T extends K[number]
        ? T
        : K[number] extends never
          ? T
          : Pick<T, K[number]>
      : T

interface SearchParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export type QueryAPIOptions = {
  method?: 'get' | 'query'
  key?: MaybeRefOrGetter<string>
  query?: SearchParams
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any> | FormData
  token?: string | null
  baseURL?: string | null
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useQueryApi = async function <T = unknown, E = any>(
  url: string,
  options?: QueryAPIOptions,
): Promise<
  | {
      token: string | null | undefined
      data: PickFrom<T, KeysOf<T>> | undefined
      error: (E extends Error | NuxtError<unknown> ? E : NuxtError<E>) | undefined
      refresh: (opts?: never) => Promise<void>
      pending: boolean
    }
  | {
      token: string | null | undefined
      data: T | undefined
      error: FetchError<E> | undefined
      pending: boolean
      refresh?: undefined
    }
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { $api } = useNuxtApp() as any
  const { commonHeaders } = useHttpHeaders()
  const { baseURL: baseUrl } = useApiConfig()

  const key = options?.key ?? url

  const tokenRef = ref<string | null>()

  const headers: Record<string, string> = commonHeaders.value

  const fresh: boolean = options?.fresh ?? false
  const cache: boolean = options?.cache ?? true

  if (options?.token) headers.Authorization = `Bearer ${options.token}`

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryOptions: FetchOptions<'json', any> = {
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

  if (cache) {
    const { data, error, refresh, pending } = await useAsyncData<T, E>(key, () =>
      $api(url, queryOptions),
    )

    if (fresh) await refresh()

    return {
      token: tokenRef.value,
      data: data.value,
      error: error.value,
      refresh,
      pending: pending.value,
    }
  } else {
    const { data, error, pending } = await useOFetch<T, E>(url, queryOptions)

    return { token: tokenRef.value, data, error, pending }
  }
}
