import React from 'react'
import { Container, Details, Name, About, Rent, Brand, Period, Price, Type, CarImage } from './styles'
import MotorIcon from '../../assets/car.svg'
import { RectButtonProps } from 'react-native-gesture-handler'

interface CarProps {
  brand: string
  name: string
  rent: {
    period: string
    price: number
  }
  thumbnail: string
}

interface Props extends RectButtonProps {
  data: CarProps
}

export default function Car({ data: {brand,name,rent: {period, price},thumbnail}, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>
        <About>
          <Rent>
            <Period>{period}</Period>
            <Price>{`R$ ${price}`}</Price>
          </Rent>
          <Type>
            <MotorIcon/>
          </Type>
        </About>
      </Details>
      <CarImage source={{ uri:thumbnail }}/>
    </Container>
  )
}