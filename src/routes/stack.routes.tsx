import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import CarDetails from '../screens/CarDetails'
import SchedulingComplete from '../screens/SchedulingComplete'
import SchedulingDetails from '../screens/SchedulingDetails'
import Scheduling from '../screens/Scheduling'

export default function stackRoutes() {
  const { Navigator, Screen } = createStackNavigator()
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home}/>
      <Screen name="CarDetails" component={CarDetails}/>
      <Screen name="Scheduling" component={Scheduling}/>
      <Screen name="SchedulingDetails" component={SchedulingDetails}/>
      <Screen name="SchedulingComplete" component={SchedulingComplete}/>
    </Navigator>
    )
}