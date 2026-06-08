import Bowser from 'bowser'

export const useUserAgent = function (): {
  userAgent: Bowser.Parser.ParsedResult
  browserInfo: Bowser.Parser.Parser
} {
  const userAgent = Bowser.parse(globalThis.navigator.userAgent)
  const browserInfo = Bowser.getParser(globalThis.navigator.userAgent)

  return { userAgent, browserInfo }
}
