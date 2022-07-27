import type { Position } from "../ts/types";

export const getDistance = (source: Position, target: Position): number => {
  const { x: sx, y: sy } = source
  const { x: tx, y: ty } = target

  const disX = sx - tx
  const disY = sy - ty

  return Math.sqrt((disX * disX) + (disY * disY))
}
