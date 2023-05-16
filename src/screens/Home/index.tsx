import React, { useEffect, useState } from 'react'
import { Container, Header, TotalCars, HeaderContent, CarList } from './styles'
import { StatusBar } from 'react-native'
import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize'
import Car from '../../components/Car'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import CarDTO from '../../dtos/CarDTO'
import Loading from '../../components/Loading'

type NavigationProps = {
  navigate:(screen:string, car: object) => void;
}

export default function Home() {
  const navigation = useNavigation<NavigationProps>();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }
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
    </Container>
  )
}