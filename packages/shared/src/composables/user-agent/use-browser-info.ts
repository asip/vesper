import { getParser, type Parser } from 'bowser'

export const useBrowserInfo = function (): {
  browserInfo: Parser.Parser
} {
  const browserInfo = getParser(globalThis.navigator.userAgent)

  return { browserInfo }
}
