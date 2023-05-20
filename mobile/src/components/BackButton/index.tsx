import React from 'react'
import { Container } from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { RectButtonProps } from 'react-native-gesture-handler'

interface Props extends RectButtonProps {
  color?: string
}

export default function BackButton({ color, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ? color : theme.colors.text}
      />
    </Container>
  )
}