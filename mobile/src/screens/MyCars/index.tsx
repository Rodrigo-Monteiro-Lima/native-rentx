import React, { useEffect, useState } from 'react'
import { CarWrapper, CarFooter, CarFooterTitle, CarFooterPeriod, CarFooterDate, Container, Header, Title, SubTitle, Content, Appointments, AppointmentsTitle, AppointmentsQuantity } from './styles'
import CarDTO from '../../dtos/CarDTO';
import api from '../../services/api';
import { StatusBar } from 'react-native';
import BackButton from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import Car from '../../components/Car';
import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import LoadAnimation from '../../components/LoadAnimation';

type NavigationProps = {
  navigate:(screen:string, car?: object) => void;
}

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export default function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  function handleBack() {
    navigation.navigate('Home');
  }
  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, [])
  function handleCarDetails(car: CarDTO) {
    navigation.navigate('SchedulingDetails', { car });
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
          Seus agendamentos, {'\n'}
          estão aqui.
        </Title>
        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>
      {
        loading ? <LoadAnimation /> : (
          <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
        </Appointments>
        <FlatList
          data={cars}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CarWrapper>
              <Car data={item.car} onPress={() => handleCarDetails(item.car)}/>
              <CarFooter>
                <CarFooterTitle>Período</CarFooterTitle>
                <CarFooterPeriod>
                  <CarFooterDate>{item.startDate}</CarFooterDate>
                  <AntDesign name="arrowright" size={20} color={theme.colors.title} style={{marginHorizontal: 10}}/>
                  <CarFooterDate>{item.endDate}</CarFooterDate>
                </CarFooterPeriod>
              </CarFooter>
            </CarWrapper>
          )}
        />
      </Content>
        )
      }
    </Container>
  )
}