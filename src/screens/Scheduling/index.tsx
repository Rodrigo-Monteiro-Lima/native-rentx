import React from 'react'
import BackButton from '../../components/BackButton'
import { useTheme } from 'styled-components'
import ArrowSvg from '../../assets/arrow.svg'
import { Content, Footer, Container, Header, Title, RentalPeriod, DateInfo, DateTitle, DateValue } from './styles'
import { StatusBar } from 'react-native'
import Button from '../../components/Button'
import Calendar from '../../components/Calendar'
import { useNavigation } from '@react-navigation/native'

type NavigationProps = {
  navigate:(screen:string) => void;
}

export default function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails');
  }
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={() => {}} color={theme.colors.shape}/>
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}></DateValue>
          </DateInfo>
          <ArrowSvg/>
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}></DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar/>
      </Content>
      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  )
}