import React from 'react'
import { Container } from './styles'
import LottieView from 'lottie-react-native'
import loadingCar from '../../assets/load_animation.json'

export default function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={loadingCar}
        autoPlay
        resizeMode="contain"
        loop
        style={{ height: 200 }}
      />
    </Container>
  )
}