import React from 'react'
import { Container, Header, SubTitle, Title, Footer } from './styles'
import { StatusBar } from 'react-native'
import Button from '../../components/Button'
import { useTheme } from 'styled-components'

export default function SignIn() {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
      <Header>
        <Title>Estamos{'\n'} quase lá</Title>
        <SubTitle>
          Faça seu login para começar{'\n'}
          uma experiência incrível.
        </SubTitle>
      </Header>
      <Footer>
        <Button title="Login" onPress={() => {}} enabled={false} loading={false}/>
        <Button title="Criar conta gratuita" onPress={() => {}} enabled={true} loading={false} color={theme.colors.background_secondary} light/> 
      </Footer>
    </Container>
  )
}