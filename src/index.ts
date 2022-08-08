import Particle, { Props as ParticleProps } from './effects/Particle'
import Ball, { Props as BallProps } from './effects/Ball'
import Web, { Props as WebProps } from "./effects/Web"

const defaultValidationCheck = (props: any) => {
  if (!props) throw new Error('Cannot find options')
  const { container } = props
  if (!container) throw new Error('Cannot find container')
  if (!(container instanceof HTMLElement))
    throw new Error('container is not a HTMLElement')
}

export const initParticle = (props: ParticleProps) => {
  defaultValidationCheck(props)

  const { container, colors } = props

  return new Particle({ container, colors })
}

export const initBall = (props: BallProps) => {
  defaultValidationCheck(props)

  return new Ball(props)
}

export const initWeb = (props: WebProps) => {
  defaultValidationCheck(props)

  return new Web(props)
}
