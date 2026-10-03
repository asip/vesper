import type { AsyncDataRequestStatus } from 'nuxt/app'

import type { $Fetch, FetchOptions, FetchError } from 'ofetch'

// eslint-disable-next-line
export const useOFetch = async function <T = unknown, E = any>(
  url: string,
  options?: FetchOptions<'json'>,
): Promise<{
  data: Ref<T | undefined>
  error: Ref<FetchError<E> | undefined>
  status: Ref<AsyncDataRequestStatus>
  pending: ComputedRef<boolean>
}> {
  const { $api } = useNuxtApp()

  const status = ref<AsyncDataRequestStatus>('pending')
  const pending = computed(() => status.value === 'pending')

  const data = ref<T>()
  const error = ref<FetchError<E>>()

  try {
    data.value = await ($api as $Fetch)<T>(url, options)
    status.value = 'success'
  } catch (err: unknown) {
    error.value = err as FetchError<E>
    status.value = 'error'
  }

  return { data, error, status, pending }
}
