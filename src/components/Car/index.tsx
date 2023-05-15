import React from 'react'
import { Container, Details, Name, About, Rent, Brand, Period, Price, Type, CarImage } from './styles'
import MotorIcon from '../../assets/car.svg'

interface CarProps {
  brand: string
  name: string
  rent: {
    period: string
    price: number
  }
  thumbnail: string
}

interface Props {
  data: CarProps
}

export default function Car({ data: {brand,name,rent: {period, price},thumbnail} }: Props) {
  return (
    <Container>
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