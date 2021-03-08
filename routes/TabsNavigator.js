import React from 'react'
import {Platform} from 'react-native'
//Icons
import {Ionicons, FontAwesome} from '@expo/vector-icons'
//Tab Navigation
import {createBottomTabNavigator} from 'react-navigation-tabs'
//Components
import Decks from '../components/Decks'
import AddDeck from '../components/AddDeck'

const TabRouteConfigs = {
  Decks : {
    screen : Decks,
    navigationOptions : {
      tabBarLabel : 'Decks',
      tabBarIcon : ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
    }
  },
  AddDeck : {
    screen : AddDeck,
    navigationOptions : {
      tabBarLabel : 'Add Deck',
      tabBarIcon : ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  },
}

const TabNavigatorConfig = {
  navigationOptions : {
    headerShown : false,
  },
  tabBarOptions : {
    activeTintColor : Platform.OS === 'ios' ? '#292477' : 'white',
    style : {
      height : 56,
      backgroundColor : Platform.OS === 'ios' ? 'white' : '#292477',
      shadowColor : 'rgba(0,0,0,0.24)',
      shadowOffset : {
        width : 0,
        height : 3,
      },
      shadowRadius : 6,
      shadowOpacity : 1,
    }
  }
}

export default Tabs = createBottomTabNavigator(TabRouteConfigs,TabNavigatorConfig)
