import type { Position } from "../ts/types"

interface Props {
  sourcePosition: Position
  targetPosition: Position
  color: string
}

class Line {
  private sourcePosition: Position
  private targetPosition: Position
  private readonly color: string

  constructor({ sourcePosition, targetPosition, color }: Props) {
    this.sourcePosition = sourcePosition
    this.targetPosition = targetPosition
    this.color = color
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.moveTo(this.sourcePosition.x, this.sourcePosition.y)
    ctx.lineTo(this.targetPosition.x, this.targetPosition.y)
    ctx.strokeStyle = this.color
    ctx.closePath()
    ctx.stroke()
  }
}

export default Line
