import React from 'react'
import { Footer, Accessories, About, Container, Header, CarImages, Content, Details, Rent, Price, Period, Description, Brand, Name } from './styles'
import BackButton from '../../components/BackButton'
import ImageSlider from '../../components/ImageSlider'
import Accessory from '../../components/Accessory'
import SpeedSvg from '../../assets/speed.svg'
import Button from '../../components/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import CarDTO from '../../dtos/CarDTO'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

type NavigationProps = {
  navigate:(screen:string) => void;
  goBack:() => void;
}

interface Params {
  car: CarDTO
}

export default function CarDetails() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { car: {about, accessories, brand, name, photos, rent:{period, price}} } = route.params as Params;
  function handleConfirmRental() {
    navigation.navigate('Scheduling')
  }
  function handleBack() {
    navigation.goBack();
  }
  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack}/>
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={photos}/>
      </CarImages>       
      <Content>
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
      </Content>
      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  )
}