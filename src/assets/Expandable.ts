import type { Position, Size, Velocity } from '../ts/types'

interface Props {
  position: Position
  radius: number
  maxRadius: number
  color: string
  velocity: Velocity
  canvasSize: Size
}

class Expandable {
  position: Position
  private readonly initialRadius: number
  private radius: number
  private readonly maxRadius: number
  private readonly color: string
  private velocity: Velocity
  private readonly canvasSize: Size

  constructor({
    position,
    radius,
    maxRadius,
    color,
    velocity,
    canvasSize,
  }: Props) {
    this.position = position
    this.initialRadius = radius
    this.radius = radius
    this.maxRadius = maxRadius
    this.color = color
    this.velocity = velocity
    this.canvasSize = canvasSize
  }

  update({ expanded = false }: { expanded?: boolean }) {
    this.bounce()
    this.position = {
      x: this.position.x + this.velocity.x,
      y: this.position.y + this.velocity.y,
    }

    if (expanded) {
      this.radius *= 1.05
      if (this.radius > this.maxRadius) this.radius = this.maxRadius
    } else {
      this.radius *= 0.95
      if (this.radius < this.initialRadius) this.radius = this.initialRadius
    }
  }

  bounce() {
    if (
      this.position.x < this.radius ||
      this.position.x > this.canvasSize.width - this.radius
    ) {
      this.velocity = {
        ...this.velocity,
        x: this.velocity.x * -1,
      }
    }
    if (
      this.position.y < this.radius ||
      this.position.y > this.canvasSize.height - this.radius
    ) {
      this.velocity = {
        ...this.velocity,
        y: this.velocity.y * -1,
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { x, y } = this.position

    ctx.beginPath()
    ctx.arc(x, y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.closePath()
    ctx.fill()
  }
}

export default Expandable
