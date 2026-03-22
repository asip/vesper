import { useBaseUrlStore } from '../../../stores/use-base-url-store'

export function useApiConstants() {
  const { baseURL } = useBaseUrlStore()

  return { baseURL }
}

export type ApiConstantsType = ReturnType<typeof useApiConstants>
