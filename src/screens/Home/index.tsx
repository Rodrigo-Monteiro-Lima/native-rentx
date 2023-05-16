import React, { useEffect, useState } from 'react'
import { Container, Header, TotalCars, HeaderContent, CarList } from './styles'
import { StatusBar } from 'react-native'
import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize'
import Car from '../../components/Car'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import CarDTO from '../../dtos/CarDTO'

type NavigationProps = {
  navigate:(screen:string) => void;
}

export default function Home() {
  const navigation = useNavigation<NavigationProps>();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const carData = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'AO DIA',
      price: 120
    },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
  }
  const carData2 = {
    brand: 'Porsche',
    name: 'Panamera',
    rent: {
      period: 'AO DIA',
      price: 340
    },
    thumbnail: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEBUSEhISFhEVFRUXFxgWFxoVEhgWFxUWFxUVFRUYISghGBolGxUVIjEtJiorLi4uFx8zODMsNygtLysBCgoKDg0OFQ8QGC0dHh0rKzctLS0tLS0tLSsrMC0tNSs3NystLS0vLS0uLS8tODAtKzctLi0rKy0tKzcrNy0yK//AABEIAMIBAwMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xABEEAABAwIDAgwCBwYFBQEAAAABAAIDBBEFEiExQQYHEyIyUWFxgZGhsULRFFJTYnKCkiMzQ6LB8BVEVGPSg5OzwsMk/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAHBEBAAICAwEAAAAAAAAAAAAAAAERAhIhIjFh/9oADAMBAAIRAxEAPwDuKIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIq/W8LIGktiPKuaSHFn7ppFwWmTYXAgghuYjfZBYEVEq+GUvwta3wv532+ijZ+FtV9Zo7hY+6DpqLjr+FFS7+I8+Oi15ManO2Q+nyQdoLx1hfOUb1jzXD341N9f2+SxOxuf63sg7tnHWPNfQVwOThDOPisToNPVe48Rnk15VwaDa9zqd4Hd2oO9IuGfSJmNLmVElxrvBtv1BUxhfCasaA5s4kbvbJqT2XN7eYQdbRVLCeG7HEMqGGF50DtsRPY7d6q1seCAQQQdhGoQekREBERAREQEREBERAREQEREBERARF8JQfVGY/j0FHFytQ8NGxoGr3u3NY0auKrXGLwnqKfJFSsc58gvmY3ORrawOxnWS7YD32plFQkPFRVS8tV7i5xc2K/wAMebW/3tvVbW4S2JY1U1ms2anpfhp2m0sg3GpkGoB+o222zidiyQUbiADZjAAGtAtYDYGtGjQslKYhrnDneNh3fNZzUN6x5hBgqTHCwvyi42X1JO7+wqtNVue7rc4+ZOwKTx1ksrgGNJY0aWc25J2m179ngo6hjdE/O6KS7QS0ZdC/Y2/YCb+CDHXPyyOaDfKbE7sw6Vuy97LKxjJKd8h5ro22Nj0nudzSQdgtppbf1KNMT9czX33aX17Vhu8AjUB1rjcbG4Qe3scGCS3MLi0HtABI9fda5lWd9S8xti2saSQMp2naTbbtWhUXaOi6/cbIPkkmZ9m3vo0b+dvPdf2VhwnICwPbeMANNydN17jtVTbVOie08lI831Aa42026Dbr6rLjmK5HNZz8rgXAN5rtTfnX1G22zrQXzEKdjS0sAsQbgG408T1+iisLlEb3xlodrdtyRbyOtxY+CpLMQff9k2cuvtDswHeGt2+KtNByhySSA5viJ222ajrsgtb4mujDgLtO1rtQD8vmFsYJjMlJchxfTixcxx1a07HtPUNh6tuzZG01cGhzQLhw3gjXZdeDLzSLtFw4XJHRcDcWF+v0Qdew+uZMwPYbj1HYVsrleAY1FTZQJtmltoI6ir5h3CSnlsA8B3UdB5oJhERAREQEREBERAREQFEY1wghp2kuN3C3NG3UgbfFfeEOImKPm2znQXvYdptrbu6lyTHa0yyBgc4n4nO7zsG4WN+89iC11XGJI45YYm3P5j4nYs1PXVkgzSz5G9TbMFu1232VVw2aGBuY6v37z3f32rDW486Q6k5RsaL2HzKC5SYu1uge5563ONvXUrWfjvaqZHiLbnOX2sbZRrm3XJ2BazsR7T6qLS7uxztWN/CCwuXWHfYKjS4l4lazqguN3G/sO4KouU/Cv6gLu06D5lYo8XnkNgbdjRb12+qrtM4X3l25rdT4nY337FKwzP2MBJG1sdwwfjkGrvMN7HIJ6Bjhcvfa23W5H4vq+NljqMdiZoJAT3n3sR6FR1HhEz3cpJI1rIxoMrXMzW6ORwItruaexbD8MjihkqA/9ozXOXFhBt8LdMxNyNdB7BG4jjOmfIxzSbZsxdr2tNh6KPbwgO4MH4WgeyhcTrjK484kXzOcSXFztm06kAWHb2aLThIF3PdkjbbM62Y3OxrWjpONjYdhJsASCraMbed5Q17j1qpS8MBHpFRtyfWmc5z3D8hAYfNWvgjisFXcNbkkGroyQ6wv0mOsLt1A1Fxcbb3VpEdjPLvYeS0fprYXsNwLhoouhwWocbzSO1FjY88tNrszD4dB/TaV0DGsFc7IyObkrm7rNDnkAEgC5Ftd61YeDUQ6cs0p/wBydwH6Yy3TvulFomGlMbQ0AMYNg2BYp61rC3M4ZXODcwu4XN7NGUHM7TZtVogwqnYczRTNd9a0Yf8ArPO9Vsy1EI6dVCLfWlZp5lXVLQUWHSHc4DreCzTr5wC8VOGOANnNc7cLm1++ymG4hR3N6qn2/as6h2968y4zQt21MJ/C7OfJl0otWaSF5YeUiMbgSL5w/MPrWaOb5lS+Bl5OYNdl3mxy3G3VbGKVlO6nMzJGuiF8zm7RYXIttDrbAesLmuJxVc3/AOoFzQy2RrC4CIfCxjhoD5Fx7SpMK/TfByszRhh6TB5jcR52UuuTcT/Cp1U6ONw/atikEjtzshjDCO0h2v4e1dZUBERAREQEREBY6mYMY57iA1oJJJsLDt3LIqfxs1XJ4TMblocYmOIFyGukaDp27PFBXOFGPyBzmvzA3O1g/keToO9rlSJKvUneVXZauZjBydTLkGgaHyMbb8Bs2y1TjNR9pfvax3qQVRYZKwkrGalV/wDxef67f+1F/wAF9/xaXfkP/TZ/QIqcNQvDplCOxKQ7o/0gLBJiEo1BA7vkoJwyjrXpj3HoAnuCgY8eqh0ZLfkZ7lq9PxyrO2Z/gQ32RVzwuSWM3dCHtItlPMA37RfxuCpscIZwMraeNrRsHKktHhkC5S6vnO2Z573k/wBVj5QnpPJ8UTh1R+O1JP8AlmDtBJH81lA4pXTVLuTEr5Y2m+gDWF33WNGoHbcqtYU6mueXz9mXZ421U1glc5mYwzxsZ1l7QbX07QpltXX1rGMb5ZpMKkY0FzHtB0FxbyuFE0tG6onETNQHEDWwv8TiToBYEk7g250Ckq/HxvldM+xsbuyNNtt32O22wbtqYGXwUFTUxtJfYMaW6uYDrJIR1N/ZXOyzyDo5THau3vwz1vqnJMEpQDAJncqGB13Qg0xzSmLkyM3KXzDbluL9G/NVILZKCta5t25X6i99lszLjpNLXNII0LZAQpeaC+Ete4DnPbCSCHXJlfOBmBPOylrjrv1WDhQySWgp6iQESWLC47XhhPIy222e102p0PJgDQLTDRxqp5aeWZwJdI9zhe2gJ5oPWA2wHcFohg6gpCjpWy2zSsjGW+Z98umltN/yWV2Hwt6VWwn7kcj/AFIaPVGkWGrIAss0cY6Ej3H70YYPSRx9F4jFyGi5cdgGrj3AalB8COUrBwcq3i4p5APv2i/8hatbEcKkiHPMV+pssb3jva1xPoiMFJVOyvhGrZDGSPwEkad5Vumxp0UcrIxeOlywllzklzSRicubexJIeNfbRVHAzaqhvvmiHnI0LouC0cM1DUzfvC0jPJIOfykZzM5aIHLM6Nro7G/7QOeHAaokvnE6xsWM1EYuWuY4sP3ZA2Vjj3sA813Zcm4qMKvXzVX7QsFLAwPk1e97gQXuI2vyxgnb0xqdp6ygIiICIiAiIgKq8aIl/wAIqnQPcyVjGyBzSWuAjkZI+xHWxrh4q1LWxOnEkEkZBIfG9pAtchzSCBfTeg/JrcYlkLnOkjkflcTmjDXkhpsDlbY7ANq1DiL98cB7nAf+6lpqJ0NTaQkta8hwe0OqGfdcH29HA21tuUPV0AaeYI3t3dMOt2i9rqlPRqz/AKceBJ9gUbU32wPHif8AitMw6fuj4Fw9wvP0cfZu/V8mqDcdVAfwX+Z+S8mrH2Un6j8lqSht9jh+YfJDa21/gQqNn6W37F/6j8lkzNcP3Z7i8/1C1YYC/RomPcL+y320EgbqwhttryI/WSygwwTRNuH0zn/nLR6M1WX6dBuoR4ySH2Cj6rKHkbe1pBb4G2q8AdTX/wB+CtiVbNC8ENp2xuG8OkJHaMzrei1ob69v9+91rxZgeaw+OnvZbkbSOkRc6m2wX1I12keSiwW29x+X9VbsNEbaSkkdLNDKKqYxyxgPYHuZE0slj6Ra5sZBIvoTdrgVU5ei63Z7hT9DRvqcK5KIgSxVrSNbWEzGRsudwvyh7mFCXS2YRB9C5f6JTiHkjJo0mL6Ly/Ksm5O2rrftMtr25lraLnuPwRmkqXiSeaUz07pJZbNa93I1LWiOMXc0AO2uI+EBrQLKyx49E6nNKwVDY+RDweVNhC6P6E0cllvb6Papyn4iqlikMkeGubLblpK0tABuCKeMwv16s7r92qIh4weRZ3D2WLIexbxawMaDMwWaNAWucN+ov2rBy0A2ve78N2+hH9UW2eF8TRcw53f7j3ZP0R5T5uK3WcI5mjLEWQtO0QRtYD3uAzHxKjmV1OPgPfbXycSFv02P0zdsMju5/Jg94jAuiMEr5n6v5Rw23eTl83GwWM0cjhdoFusEOHm24VhouHVHEbtwynLut2Z5PfnJVW4Z4vDVTCaKFsPNyuY3oEjY9rdxI0NuoHeUGtJKYpGuGUvY9rxZwcLtILdWk21V9fVxQF9MA3kZzVSudlBflLGzXidtN4JQ0W3t61y+OQdivXBPHw8RRGmZNURWbBLlz8m25y8qwNLntZckZXN0ABuAEHdOLag5Gha02Lrhrj1uijZC/wDmicrUtLBaZsdPFGwuLWsaAX9M2Grn3+Im5PaSt1AREQEREBERAREQR2NYJBVRPinjDmvblJ2PHa121p7lx3jB4qxBGJqCXRo58U0jQ869KOR1ge0E7tOpdzVW4TcDm1d80jh7IPyrNUSNJBcQRtBXgVz/AKxXcK3iRzG7Jx4hRE/EdUfDLGfMIKFwZ+jSOca2qkhYBzRHHykjndZuLBo8ypGrpcN/h4jUn8VG0/8A0arDJxKVo2OiP5lrScTeIDY1h/MEFTqGQD93VOd30+T2kK1HT/7gP5SPmrg7ihxL7Jv6gsLuKfEh/A9QgqX0j7w8l5dP3HwCtZ4rMT/07vML4OK3E/8ATO8x80FTNQeoeQ+SNqz1eyuDeKjEz/A/mC+nilxT7EfrCCnuqXEWvp1XU9wSxFrHyQSODIaiN0Tn2vybnAiOU77Nu5ptqGyPI1spFnFJit/3LB3yBbsXE/ip2spx3y/JpQbLOB1WK4vs0Ujm5SCyTL9GEQhy8vl5L9zazuUy6XvfRVjhZXiR0cETs8NPG2IPtblXNaA+W3aRYX1ysZfW66DhvFDiLmCKetjjgvrHG+SRvXfIQ1oPmrrg/FVQQgZmukdvLjYHwCD86U+FyP6LHHwU5h/Aerl6MT/JfpikwOniFmQsFuxb7WAbAAg/PeH8UdU/pANHarHQcS4/iSjwXY0Qc7o+KKib08zvRTdLxe4ez/LRn8QurSiCLp+DlIzoU0A/I35Lfip2N6LGt7gB7LKiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIP/Z'
  }
  function handleCarDetails() {
    navigation.navigate('CarDetails')
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
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      <CarList
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Car data={item} onPress={handleCarDetails}/>}
      />
    </Container>
  )
}