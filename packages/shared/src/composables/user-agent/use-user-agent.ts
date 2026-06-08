import Bowser from 'bowser'

export const useUserAgent = function (): {
  userAgent: Bowser.Parser.ParsedResult
} {
  const userAgent = Bowser.parse(globalThis.navigator.userAgent)

  return { userAgent }
}
