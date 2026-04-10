import { persistentAtom } from '@nanostores/persistent'

export const $baseUrl = persistentAtom('baseURL', '' as string)
