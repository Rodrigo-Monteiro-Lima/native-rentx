import React from 'react'
import { Container, Content, Title, Message, Footer, LogoWrapper } from './styles'
import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'
import { StatusBar, useWindowDimensions } from 'react-native'
import ConfirmButton from '../../components/ConfirmButton'
import { useNavigation, useRoute } from '@react-navigation/native'

type NavigationProps = {
  navigate:(screen:string) => void;
}

interface Params {
  title: string;
  message: string;
  nextScreen: string;
}

export default function Confirmation() {
  const route = useRoute();
  const {title, message, nextScreen} = route.params as Params;
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NavigationProps>();
  function handleConfirm() {
    navigation.navigate(nextScreen);
  }
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoWrapper>
        <LogoSvg width={width} />
      </LogoWrapper>
      <Content>
        <DoneSvg width={80} height={80}/>
        <Title>{title}</Title>
        <Message>
          {message}
        </Message>
      </Content>
      <Footer>
        <ConfirmButton title='OK' onPress={handleConfirm}/>
      </Footer>
    </Container>
  )
}