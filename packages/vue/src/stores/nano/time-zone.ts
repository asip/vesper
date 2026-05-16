import { persistentAtom } from '@nanostores/persistent'

export const $timeZone = persistentAtom<string | undefined>('timeZone', undefined)
