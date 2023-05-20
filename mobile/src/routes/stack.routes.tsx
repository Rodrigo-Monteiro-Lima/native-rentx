import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import CarDetails from '../screens/CarDetails'
import SchedulingDetails from '../screens/SchedulingDetails'
import Scheduling from '../screens/Scheduling'
import MyCars from '../screens/MyCars'
import Splash from '../screens/Splash'
import SignIn from '../screens/SignIn'
import SignUpFirstStep from '../screens/SignUp/FirstStep'
import SignUpSecondStep from '../screens/SignUp/SecondStep'
import Confirmation from '../screens/Confirmation'

export default function stackRoutes() {
  const { Navigator, Screen } = createStackNavigator()
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
      {/* <Screen name="Splash" component={Splash}/> */}
      <Screen name="SignIn" component={SignIn}/>
      <Screen name="SignUpFirstStep" component={SignUpFirstStep}/>
      <Screen name="SignUpSecondStep" component={SignUpSecondStep}/>
      <Screen name="Home" component={Home} options={{gestureEnabled: false}}/>
      <Screen name="CarDetails" component={CarDetails}/>
      <Screen name="Scheduling" component={Scheduling}/>
      <Screen name="SchedulingDetails" component={SchedulingDetails}/>
      <Screen name="Confirmation" component={Confirmation}/>
      <Screen name="MyCars" component={MyCars}/>
    </Navigator>
    )
}