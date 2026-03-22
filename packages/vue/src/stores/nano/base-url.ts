import { persistentAtom } from '@nanostores/persistent'

export const $baseUrl = persistentAtom<string>('baseURL', '')
