import React, { useEffect } from 'react'
import { Container } from './styles'
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'
import { useNavigation } from '@react-navigation/native'

type NavigationProps = {
  navigate: (screen: string) => void;
}

export default function Splash() {
  const splashAnimation = useSharedValue(0)
  const navigate = useNavigation<NavigationProps>();
  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [{ translateX: interpolate(splashAnimation.value, [0, 50], [0, -50], Extrapolate.CLAMP) }],
    }
  })
  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25,  50], [0, .3, 1], Extrapolate.CLAMP),
      transform: [{ translateX: interpolate(splashAnimation.value, [0, 50], [-50, 0], Extrapolate.CLAMP)}],
    }
  })
  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 }, ()=> {
      'worklet'
      runOnJS(startApp)()
    })
  }, [])
  function startApp() {
    navigate.navigate('Home')
  }
  return (
    <Container>
      <Animated.View style={[brandStyle, {position: 'absolute'}]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>
      <Animated.View style={[logoStyle, {position: "absolute"}]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  )
}
