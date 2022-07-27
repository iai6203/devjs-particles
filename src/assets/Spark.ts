import type { Position, Size, Velocity } from '../ts/types'

interface Props {
  position: Position
  radius: number
  color: string
  velocity: Velocity
  canvasSize: Size
}

class Spark {
  life: boolean
  private position: Position
  private radius: number
  private readonly color: string
  private velocity: Velocity
  private readonly canvasSize: Size

  constructor({ position, radius, color, velocity, canvasSize }: Props) {
    this.life = true
    this.position = position
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.canvasSize = canvasSize
  }

  update() {
    this.position = {
      x: this.position.x + this.velocity.x,
      y: this.position.y + this.velocity.y,
    }
    this.radius *= 0.95

    if (
      this.radius < 0.25
      || this.position.x < -this.radius
      || this.position.x > this.canvasSize.width + this.radius
      || this.position.y < -this.radius
      || this.position.y > this.canvasSize.height + this.radius
    ) {
      this.life = false
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

export default Spark
