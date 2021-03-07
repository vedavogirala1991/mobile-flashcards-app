import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import {HomeStack, AddDeckStack} from './StackNavigator'

export default TabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  AddDeckDetails: AddDeckStack,
})
