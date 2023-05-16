import React, { useState } from 'react'
import BackButton from '../../components/BackButton'
import { useTheme } from 'styled-components'
import ArrowSvg from '../../assets/arrow.svg'
import { Content, Footer, Container, Header, Title, RentalPeriod, DateInfo, DateTitle, DateValue } from './styles'
import { StatusBar } from 'react-native'
import Button from '../../components/Button'
import Calendar, { DayProps, MarkedDateProps } from '../../components/Calendar'
import { useNavigation, useRoute } from '@react-navigation/native'
import { generateInterval } from '../../components/Calendar/generateInterval'
import { format } from 'date-fns'
import { getPlatformDate } from '../../utils/getPlatformDate'
import CarDTO from '../../dtos/CarDTO'

type NavigationProps = {
  navigate:(screen:string, params: object ) => void;
  goBack:() => void;
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO
}

export default function Scheduling() {
  const theme = useTheme();
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { car } = route.params as Params;
  function handleConfirmRental() {
      navigation.navigate('SchedulingDetails',{
        car,
        dates: Object.keys(markedDates),
    });
  }
  function handleBack() {
    navigation.goBack();
  }
  function handleChangeDate(day: DayProps) {
    let start = !lastSelectedDate.timestamp ? day : lastSelectedDate;
    let end = day;
    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);
    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
  }
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleBack} color={theme.colors.shape}/>
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>
          <ArrowSvg/>
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>
      <Footer>
        <Button enabled={!!rentalPeriod.endFormatted} title="Confirmar" onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  )
}