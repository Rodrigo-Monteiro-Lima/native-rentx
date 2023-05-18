import React, { useState } from 'react'
import { Form, Container, Header, SubTitle, Title, Footer } from './styles'
import { Keyboard, KeyboardAvoidingView, StatusBar } from 'react-native'
import Button from '../../components/Button'
import { useTheme } from 'styled-components'
import Input from '../../components/Input'
import PasswordInput from '../../components/PasswordInput'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default function SignIn() {
  const theme = useTheme();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <KeyboardAvoidingView
      behavior='position'
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
          <Header>
            <Title>Estamos{'\n'} quase lá</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>
          <Form>
            <Input 
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
          </Form>
          <Footer>
            <Button title="Login" onPress={() => {}} enabled={false} loading={false}/>
            <Button title="Criar conta gratuita" onPress={() => {}} enabled={true} loading={false} color={theme.colors.background_secondary} light/> 
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}