import { persistentAtom } from '@nanostores/persistent'

export const $timeZone = persistentAtom('timeZone', '' as string)
