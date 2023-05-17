import React, { useEffect, useState } from 'react'
import { MyCarsButton, Container, Header, TotalCars, HeaderContent, CarList } from './styles'
import { StatusBar } from 'react-native'
import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize'
import Car from '../../components/Car'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import CarDTO from '../../dtos/CarDTO'
import Loading from '../../components/Loading'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'

type NavigationProps = {
  navigate:(screen:string, car?: object) => void;
}

const AnimatedButton = Animated.createAnimatedComponent(RectButton);

export default function Home() {
  const navigation = useNavigation<NavigationProps>();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);
  const myCarsButtonStyleAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  })
  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }
  function handleOpenMyCars() {
    navigation.navigate('MyCars')
  }
  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  })
  useEffect(() => {
    async function fetchCars() {
      try { 
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, [])
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)}/>
          <TotalCars>{`Total de ${cars.length === 1 ? '1 carro' : `${cars.length} carros`}`}</TotalCars>
        </HeaderContent>
      </Header>
      {
      loading ? 
      <Loading/> : 
      <CarList
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)}/>}
      />
      }
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View 
          style={[
            myCarsButtonStyleAnimation,
            { position: 'absolute', bottom: 13, right: 22}
          ]}
        >
          <AnimatedButton onPress={handleOpenMyCars} style={[styles.button, {
            backgroundColor: theme.colors.main
          } ]}>
            <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape}/>
          </AnimatedButton>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});