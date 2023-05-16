import React, { useEffect, useState } from 'react'
import BackButton from '../../components/BackButton'
import ImageSlider from '../../components/ImageSlider'
import Accessory from '../../components/Accessory'
import Button from '../../components/Button'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import CarDTO from '../../dtos/CarDTO'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { format } from 'date-fns'
import { getPlatformDate } from '../../utils/getPlatformDate'
import api from '../../services/api'
import { Alert } from 'react-native'

type NavigationProps = {
  navigate:(screen:string) => void;
  goBack:() => void;
}

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export default function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const { brand, name, photos, rent: { period, price }, accessories } = car;
  async function handleConfirmRental() {
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates
    ];
    await api.post('/schedules_byuser', {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    });
    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    }).then(() => navigation.navigate('SchedulingComplete'))
    .catch(() => {
      Alert.alert('Erro', 'Não foi possível confirmar o agendamento.');
    })

  }
  function handleBack() {
    navigation.goBack();
  }
  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    })
  }, [])
  const rentTotal = price * dates.length;
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
          <Price>R$ {price}</Price>
        </Rent>
      </Details>
      <Accessories>
        {
          accessories.map(({ name, type }) => (
            <Accessory
              key={type}
              name={name}
              icon={getAccessoryIcon(type)}
            />
          ))
        }
      </Accessories>
      <RentalPeriod>
        <CalendarIcon>
          <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape}/>
        </CalendarIcon>
        <DateInfo>
          <DateTitle>DE</DateTitle>
          <DateValue>{rentalPeriod.start}</DateValue>
        </DateInfo>
        <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text}/>
        <DateInfo>
          <DateTitle>ATÉ</DateTitle>
          <DateValue>{rentalPeriod.end}</DateValue>
        </DateInfo>
      </RentalPeriod>
      <RentalPrice>
        <RentalPriceLabel>TOTAL</RentalPriceLabel>
        <RentalPriceDetails>
          <RentalPriceQuota>{`R$ ${price} x${dates.length} diárias`}</RentalPriceQuota>
          <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
        </RentalPriceDetails>
      </RentalPrice>
    </Content>
    <Footer>
      <Button title="Alugar agora" color={theme.colors.success} onPress={handleConfirmRental}/>
    </Footer>
  </Container>
  )
}