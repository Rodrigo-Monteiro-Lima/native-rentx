import React from 'react'
import { About, Container, Header, CarImages, Content, Details, Rent, Price, Period, Description, Brand, Name } from './styles'
import BackButton from '../../components/BackButton'
import ImageSlider from '../../components/ImageSlider'

export default function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() =>{}}/>
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']}/>
      </CarImages>       
      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>  
        <About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Content> 
    </Container>
  )
}