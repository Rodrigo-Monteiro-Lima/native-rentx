import React from 'react'
import { Footer, Accessories, About, Container, Header, CarImages, Details, Rent, Price, Period, Description, Brand, Name } from './styles'
import BackButton from '../../components/BackButton'
import ImageSlider from '../../components/ImageSlider'
import Accessory from '../../components/Accessory'
import Button from '../../components/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import CarDTO from '../../dtos/CarDTO'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { StatusBar, StyleSheet } from 'react-native'
import { useTheme } from 'styled-components'

type NavigationProps = {
  navigate:(screen:string, car: object) => void;
  goBack:() => void;
}

interface Params {
  car: CarDTO
}

export default function CarDetails() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const theme = useTheme();
  const { car } = route.params as Params;
  const { brand, name, rent: { period, price }, about, accessories, photos } = car;
  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car })
  }
  function handleBack() {
    navigation.goBack();
  }
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  })
  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP)
    }
  })
  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP)
    }
  })
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.View 
        style={[
          headerStyleAnimation, 
          styles.header,
          { backgroundColor: theme.colors.background_secondary}
          ]}>
        <Header>
          <BackButton onPress={handleBack} />
        </Header>
        <Animated.View style={[sliderCarsStyleAnimation]}>
          <CarImages>
            <ImageSlider imagesUrl={photos}/>
          </CarImages>
        </Animated.View>
        </Animated.View>
      <Animated.ScrollView
      contentContainerStyle={{
        paddingHorizontal: 24,
        alignItems: 'center',
        paddingTop: getStatusBarHeight() + 160,
      }}
      showsVerticalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{brand}</Brand>
            <Name>{name}</Name>
          </Description>
          <Rent>
            <Period>{period}</Period>
            <Price>{`R$ ${price}`}</Price>
          </Rent>
        </Details>
        <Accessories>
          {accessories
          .map(({name, type}) => (
          <Accessory 
          key={type} 
          name={name} 
          icon={getAccessoryIcon(type)}/>
          ))
          }
        </Accessories>
        <About>
          {about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  }
})