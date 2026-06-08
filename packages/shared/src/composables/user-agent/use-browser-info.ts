import Bowser from 'bowser'

export const useBrowserInfo = function (): {
  browserInfo: Bowser.Parser.Parser
} {
  const browserInfo = Bowser.getParser(globalThis.navigator.userAgent)

  return { browserInfo }
}
