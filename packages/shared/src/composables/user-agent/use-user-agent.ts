import { parse, type Parser } from 'bowser'

export const useUserAgent = function (): {
  userAgent: Parser.ParsedResult
} {
  const userAgent = parse(globalThis.navigator.userAgent)

  return { userAgent }
}
