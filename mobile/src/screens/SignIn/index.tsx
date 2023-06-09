import React, { useState } from 'react'
import { Form, Container, Header, SubTitle, Title, Footer } from './styles'
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar } from 'react-native'
import Button from '../../components/Button'
import { useTheme } from 'styled-components'
import Input from '../../components/Input'
import PasswordInput from '../../components/PasswordInput'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'

type NavigationProps = {
  navigate: (screen: string) => void;
}

export default function SignIn() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function handleSignIn() {
    try {
    const schema = Yup.object().shape({
      email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
      password: Yup.string().required('A senha é obrigatória')
    });
    await schema.validate({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message)
      } else {
        return Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais')
      }
    }
  }
  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep')
  }
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
            <Button title="Login" onPress={handleSignIn} enabled={true} loading={false}/>
            <Button title="Criar conta gratuita" onPress={handleNewAccount} enabled={true} loading={false} color={theme.colors.background_secondary} light/> 
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}