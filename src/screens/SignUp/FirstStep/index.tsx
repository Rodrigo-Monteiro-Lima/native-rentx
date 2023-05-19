import React, { useState } from 'react'
import { Container, Header, Steps, Title, Form, FormTitle, Subtitle } from './styles'
import BackButton from '../../../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import Bullet from '../../../components/Bullet';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';

type NavigationProps = {
  navigate:(screen:string, user?: object) => void;
  goBack:() => void;
}

export default function SignUpFirstStep() {
  const navigation = useNavigation<NavigationProps>();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [driverLicense, setDriverLicense] = useState('')
  function handleBack() {
    navigation.goBack()
  }
  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),
        name: Yup.string().required('Nome é obrigatório')
      })
      const data = { name, email, driverLicense }
      await schema.validate(data)
      navigation.navigate('SignUpSecondStep', { user: data })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message)
      } else {
        return Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais')
      } 
    }  
  }
  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
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
              1. Dados
            </FormTitle>
            <Input
              iconName='user'
              placeholder='Nome'
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='numeric'
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>
          <Button title='Próximo' onPress={handleNextStep}/>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}