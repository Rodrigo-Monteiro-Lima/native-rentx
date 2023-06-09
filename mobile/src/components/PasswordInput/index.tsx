import React, { useState } from 'react'
import { Container, IconContainer, InputText } from './styles'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export default function PasswordInput({ iconName, value, ...rest }: InputProps) {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  function handleInputFocus() {
    setIsFocused(true);
  }
  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }
  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(prevState => !prevState);
  }
  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather 
          name={iconName} 
          size={24} 
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail} 
        />
      </IconContainer>        
      <InputText 
        {...rest}
        secureTextEntry={isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer>
          <Feather name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color={theme.colors.text_detail} />
        </IconContainer>
      </BorderlessButton>
    </Container>
  )
}