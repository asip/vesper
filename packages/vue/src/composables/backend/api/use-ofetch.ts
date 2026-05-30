import { computed, ref } from '@vue/reactivity'

import { ofetch } from 'ofetch'
import type { FetchOptions, FetchError } from 'ofetch'

import type { AsyncDataRequestStatus } from '~/types'

// eslint-disable-next-line
export const useOFetch = async function <T = unknown, E = any>(
  url: string,
  options?: FetchOptions<'json'>,
): Promise<{
  data: T | undefined
  error: FetchError<E> | undefined
  status: AsyncDataRequestStatus
  pending: boolean
}> {
  const status = ref<AsyncDataRequestStatus>('pending')
  const pending = computed(() => status.value === 'pending')

  const data = ref<T>()
  const error = ref<FetchError<E>>()

  try {
    data.value = await ofetch<T>(url, options)
    status.value = 'success'
  } catch (err: unknown) {
    error.value = err as FetchError<E>
    status.value = 'error'
  }

  return { data: data.value, error: error.value, status: status.value, pending: pending.value }
}
