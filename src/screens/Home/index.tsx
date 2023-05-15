import React from 'react'
import { Container, Header } from './styles'
import { StatusBar } from 'react-native'
import Logo from '../../assets/logo.svg'

export default function Home() {
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
      <Header>
        <Logo/>
      </Header>
    </Container>
  )
}