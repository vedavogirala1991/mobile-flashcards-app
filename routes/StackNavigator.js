import React from 'react'
//Stack Navigator
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
//Components
import Deck from '../components/Deck'
import Tabs from './TabsNavigator'

export default Navigator = createAppContainer(createStackNavigator({
  Home : {
    screen : Tabs,
    navigationOptions : {
      headerShown : true,
      headerTintColor : 'white',
      headerStyle : {
        backgroundColor : '#292477',
      }
    }
  },
  Details : {
    screen : Deck,
    navigationOptions : {
      headerTintColor : 'white',
      headerStyle : {
        backgroundColor : '#292477',
      }
    }
  }
}, {
  navigationOptions : {
    headerShown : false,
  },
}))
