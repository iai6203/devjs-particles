import _ from 'lodash'

import BaseEffect, { Props as BaseProps } from '../common/BaseEffect'
import FloatingBall from '../assets/FloatingBall'
import Line from '../assets/Line'
import { getDistance } from '../utils/util'
import type { Position } from '../ts/types'

export interface Props extends BaseProps {
  ballCnt?: number
  ballColor?: string
  distance?: number
}

class Web extends BaseEffect {
  private triggerPosition: Position = { x: 0, y: 0 }
  private floatingBalls: FloatingBall[] = []
  private lines: Line[] = []
  private readonly ballColor: string
  private readonly distance: number

  constructor({
    container,
    ballCnt = 500,
    ballColor = '#000',
    distance = 100,
  }: Props) {
    super({ container })
    this.ballColor = ballColor
    this.distance = distance
    for (let i = 0; i < ballCnt; i++) this.addFloatingBall()
    window.addEventListener('mousemove', this.moveMoveHandler.bind(this), false)
    window.requestAnimationFrame(this.animate.bind(this))
  }

  private moveMoveHandler(e: MouseEvent) {
    const { x, y } = e
    this.triggerPosition = { x, y }
  }

  private addFloatingBall() {
    const canvasSize = this.getCanvasSize()
    const radius: number = 3
    const position: Position = {
      x: _.random(radius, canvasSize.width - radius),
      y: _.random(radius, canvasSize.height - radius),
    }

    const ball = new FloatingBall({
      position,
      radius,
      color: this.ballColor,
      canvasSize,
    })
    this.floatingBalls.push(ball)
  }

  private addLine(targetPosition: Position, color: string) {
    const line = new Line({
      sourcePosition: this.triggerPosition,
      targetPosition,
      color,
    })
    this.lines.push(line)
  }

  private renderFloatingBalls() {
    for (let i = 0; i < this.floatingBalls.length; i++) {
      const ball = this.floatingBalls[i]
      const distance = getDistance(this.triggerPosition, ball.position)
      if (distance < this.distance)
        this.addLine(
          ball.position,
          `rgba(0, 0, 0, ${1 - distance / this.distance})`,
        )
      ball.update()
      ball.draw(this.ctx)
    }
  }

  private renderLines() {
    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i]
      line.draw(this.ctx)
    }
  }

  private animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    this.lines = []
    this.clearCtx()
    this.renderFloatingBalls()
    this.renderLines()
  }
}

export default Web
