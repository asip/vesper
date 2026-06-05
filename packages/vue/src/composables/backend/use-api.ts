import { useMutationApi, useQueryApi } from './api'

export const useApi = function () {
  return { mutationApi: useMutationApi, queryApi: useQueryApi }
}
