import React from 'react'
//Stack Navigator
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
//Components
import Deck from '../components/Deck'
import AddCard from '../components/AddCard'
import Quiz from '../components/Quiz'
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
  Deck : {
    screen : Deck,
    navigationOptions : {
      headerTintColor : 'white',
      headerStyle : {
        backgroundColor : '#292477',
      }
    }
  },
  AddCard : {
    screen : AddCard,
    navigationOptions : {
      headerShown : true,
      headerTintColor : 'white',
      headerStyle : {
        backgroundColor : '#292477',
      }
    }
  },
  Quiz : {
    screen : Quiz,
    navigationOptions : {
      headerShown : true,
      headerTintColor : 'white',
      headerStyle : {
        backgroundColor : '#292477',
      }
    }
  },
}, {
  navigationOptions : {
    headerShown : false,
  },
}))
