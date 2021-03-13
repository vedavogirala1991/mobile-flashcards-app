import React from 'react'
//Stack Navigator
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {Ionicons} from '@expo/vector-icons'
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
      headerTintColor : '#333333',
      headerStyle : {
        height : 60,
        backgroundColor : '#ffffff',
        borderBottomColor : '#f8f8f8',
        shadowRadius : 3,
        shadowOpacity : 0.8,
        shadowColor : 'rgba(0,0,0,0.24)',
        shadowOffset : {
          width : 0,
          height : 3,
        }
      }
    }
  },
  Deck : {
    screen : Deck,
    navigationOptions : {
      headerShown : true,
      headerTintColor : '#333333',
      headerStyle : {
        height : 60,
        backgroundColor : '#ffffff',
        borderBottomColor : '#f8f8f8',
        shadowRadius : 3,
        shadowOpacity : 0.8,
        shadowColor : 'rgba(0,0,0,0.24)',
        shadowOffset : {
          width : 0,
          height : 3,
        }
      }
    }
  },
  AddCard : {
    screen : AddCard,
    navigationOptions : {
      headerShown : true,
      headerTintColor : 'white',
      headerStyle : {
        backgroundColor : '#ffffff',
      }
    }
  },
  Quiz : {
    screen : Quiz,
    navigationOptions : {
      headerShown : true,
      headerTintColor : '#333333',
      headerStyle : {
        backgroundColor : '#ffffff',
      }
    }
  },
}, {
  navigationOptions: ({navigation}) => ({
    headerLeft: <Ionicons name="chevron-back-circle" size={24} color="black" nav={navigation}/>,
  }),
}))
