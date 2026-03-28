import { persistentAtom } from '@nanostores/persistent'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
export const $timeZone = persistentAtom<string>('timeZone', '')
