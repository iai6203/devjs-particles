import _ from 'lodash'

import BaseEffect, { Props as BaseEffectProps } from '../common/BaseEffect'
import Expandable from '../assets/Expandable'
import { Position } from '../ts/types'
import { getDistance } from '../utils/util'

export interface Props extends BaseEffectProps {
  count?: number
  distance?: number
  radius?: number
  maxRadius?: number
  colors?: string[]
}

class Ball extends BaseEffect {
  private readonly distance: number
  private readonly radius: number
  private readonly maxRadius: number
  private readonly colors: string[]

  private readonly expandables: Expandable[]
  private mousePosition: Position

  constructor({
    container,
    count = 200,
    distance = 200,
    radius = 20,
    maxRadius = 40,
    colors = ['#000'],
  }: Props) {
    super({ container })

    this.distance = distance
    this.radius = radius
    this.maxRadius = maxRadius
    this.colors = colors

    this.expandables = []
    const { width, height } = this.getCanvasSize()
    this.mousePosition = { x: width / 2, y: height / 2 }
    for (let i = 0; i < count; i++) {
      this.addExpandable()
    }

    window.addEventListener('mousemove', this.handleMouseMove.bind(this))

    window.requestAnimationFrame(this.animate.bind(this))
  }

  private handleMouseMove(e: MouseEvent) {
    const { x, y } = e
    this.mousePosition = { x, y }
  }

  private addExpandable() {
    const { width, height } = this.getCanvasSize()
    const expandable = new Expandable({
      position: {
        x: _.random(this.radius, width - this.radius),
        y: _.random(this.radius, height - this.radius),
      },
      radius: this.radius,
      maxRadius: this.maxRadius,
      color: this.colors[_.random(this.colors.length)],
      velocity: {
        x: _.random(-1, 1, true),
        y: _.random(-1, 1, true),
      },
      canvasSize: this.getCanvasSize(),
    })
    this.expandables.push(expandable)
  }

  private animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    this.clearCtx()

    for (let i = 0; i < this.expandables.length; i++) {
      const expandable = this.expandables[i]
      expandable.update({
        expanded:
          getDistance(this.mousePosition, expandable.position) < this.distance,
      })
      expandable.draw(this.ctx)
    }
  }
}

export default Ball
