import type { Size } from '../ts/types'

export interface Props {
  container: HTMLElement
}

class BaseEffect {
  private readonly container: HTMLElement
  protected readonly canvas: HTMLCanvasElement
  protected readonly ctx: CanvasRenderingContext2D

  constructor({ container }: Props) {
    this.container = container
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    container.appendChild(this.canvas)

    this.container.addEventListener('resize', this.resize.bind(this))
    this.resize()
  }

  destroy() {
    this.canvas.remove()
    this.container.removeEventListener('resize', this.resize.bind(this))
  }

  private resize() {
    const stageWidth = this.container.clientWidth
    const stageHeight = this.container.clientHeight

    this.canvas.width = stageWidth
    this.canvas.height = stageHeight
  }

  protected getCanvasSize(): Size {
    const { width, height } = this.canvas.getBoundingClientRect()
    return { width, height }
  }

  protected clearCtx() {
    const { width, height } = this.getCanvasSize()
    this.ctx.clearRect(0, 0, width, height)
  }
}

export default BaseEffect
