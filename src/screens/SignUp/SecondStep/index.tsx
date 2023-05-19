import React, { useState } from 'react'
import { Container, Header, Steps, Title, Form, FormTitle, Subtitle } from './styles'
import BackButton from '../../../components/BackButton'
import { useNavigation, useRoute } from '@react-navigation/native'
import Bullet from '../../../components/Bullet';
import Button from '../../../components/Button';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import PasswordInput from '../../../components/PasswordInput';
import { useTheme } from 'styled-components';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export default function SignUpSecondStep() {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();
  const { user } = route.params as Params;
  function handleBack() {
    navigation.goBack()
  }
  function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação')
    }
    if (password != passwordConfirm) {
      return Alert.alert('As senhas não são iguais')
    }

    // navigation.navigate('Confirmation', {
    //   title: 'Conta criada!',
    //   message: `Agora é só fazer login\ne aproveitar`,
    //   nextScreenRoute: 'SignIn'
    // })
  }
  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>
          <Title>
            Crie sua{'\n'}
            conta
          </Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil.
          </Subtitle>
          <Form>
            <FormTitle>
              2. Senha
            </FormTitle>
            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName='lock'
              placeholder='Repetir senha'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>
          <Button title='Cadastrar' color={theme.colors.success} onPress={handleRegister}/>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}