import React, { useState } from 'react'
import { Container, IconContainer, InputText } from './styles'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
}

export default function PasswordInput({ iconName, ...rest }: InputProps) {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(prevState => !prevState);
  }
  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>        
      <InputText 
        {...rest}
        secureTextEntry={isPasswordVisible}
      />
      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer>
          <Feather name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color={theme.colors.text_detail} />
        </IconContainer>
      </BorderlessButton>
    </Container>
  )
}