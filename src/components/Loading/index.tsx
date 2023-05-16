import { ActivityIndicator } from 'react-native'
import React from 'react'
import { useTheme } from 'styled-components'

export default function Loading() {
  const theme = useTheme();
  return (
    <ActivityIndicator
      size="large"
      color={theme.colors.main}
      style={{ flex: 1 }}
    />
  )
}