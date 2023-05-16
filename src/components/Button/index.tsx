import React from 'react'
import { Container, Title } from './styles'
import { RectButtonProps } from 'react-native-gesture-handler'

interface Props extends RectButtonProps {
  title: string
  color?: string
  enabled?: boolean
}

export default function Button({ title, color, enabled = true, ...rest }: Props) {
  return (
    <Container 
    {...rest} 
    color={color} 
    enabled={enabled}
    style={{ opacity: enabled ? 1 : 0.5 }}
    >
      <Title>{title}</Title>
    </Container>
  )
}