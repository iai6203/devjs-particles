import _ from 'lodash'

import BaseEffect from '../common/BaseEffect'
import Spark from '../assets/Spark'

import type { Props as BaseEffectProps } from '../common/BaseEffect'
import { Position } from '../ts/types'

export interface Props extends BaseEffectProps {
  colors?: string[]
}

class Particle extends BaseEffect {
  private sparks: Spark[]
  private readonly colors: string[]

  constructor({ container, colors = ['#000'] }: Props) {
    super({ container })

    this.sparks = []
    this.colors = colors

    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this))

    window.requestAnimationFrame(this.animate.bind(this))
  }

  private addSpark({ position }: { position: Position }) {
    const spark = new Spark({
      position,
      radius: _.random(10, 30),
      color: this.colors[_.random(this.colors.length)],
      velocity: {
        x: _.random(-5, 5),
        y: _.random(-5, 5),
      },
      canvasSize: this.getCanvasSize(),
    })
    this.sparks.push(spark)
  }

  private handleMouseMove(e: MouseEvent) {
    const { x, y } = e
    this.addSpark({
      position: { x, y },
    })
  }

  private animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    this.clearCtx()
    this.sparks = _.filter(this.sparks, (s) => s.life)

    for (let i = 0; i < this.sparks.length; i++) {
      const spark = this.sparks[i]
      spark.update()
      spark.draw(this.ctx)
    }
  }
}

export default Particle
