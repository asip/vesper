import { useBaseUrlStore } from '../../../stores/use-base-url-store'

export const useApiConstants = function () {
  const { baseURL } = useBaseUrlStore()

  return { baseURL }
}

export type ApiConstantsType = ReturnType<typeof useApiConstants>
