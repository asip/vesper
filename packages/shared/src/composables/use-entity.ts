export const useEntity = function <M extends object, R extends object = M>(): {
  create: ({ from }: { from: M | R }) => M
  copy: ({ from, to }: { from: M | R; to: M }) => void
} {
  const create = ({ from }: { from: R | M }): M => {
    const model: Partial<M> = {}
    Object.assign(model, from)
    return model as M
  }

  const copy = ({ from, to }: { from: R | M; to: M }): void => {
    Object.assign(to, from)
  }

  return { create, copy }
}
