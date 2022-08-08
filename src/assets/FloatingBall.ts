import _ from 'lodash'

import type { Position, Size, Velocity } from "../ts/types"

interface Props {
  position: Position
  radius: number
  color: string
  canvasSize: Size
}

class FloatingBall {
  position: Position
  private readonly radius: number
  private readonly color: string
  private readonly canvasSize: Size
  private velocity: Velocity

  constructor({ position, radius, color, canvasSize }: Props) {
    this.position = position
    this.radius = radius
    this.color = color
    this.canvasSize = canvasSize
    this.velocity = {
      x: _.random(-1, 1, true),
      y:_.random(-1, 1, true)
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

  update() {
    this.bounce()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.closePath()
    ctx.fill()
  }
}

export default FloatingBall
