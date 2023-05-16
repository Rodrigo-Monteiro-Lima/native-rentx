import React from 'react'
import { Container, Details, Name, About, Rent, Brand, Period, Price, Type, CarImage } from './styles'
import { RectButtonProps } from 'react-native-gesture-handler'
import CarDTO from '../../dtos/CarDTO'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

interface Props extends RectButtonProps {
  data: CarDTO
}

export default function Car({ data: {brand,name,rent: {period, price},thumbnail, fuel_type}, ...rest }: Props) {
  const MotorIcon = getAccessoryIcon(fuel_type);
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