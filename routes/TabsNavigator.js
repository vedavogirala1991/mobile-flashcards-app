import React from 'react'
import {Platform} from 'react-native'
//Icons
import {MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons'
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
      tabBarIcon : ({tintColor}) => <FontAwesome5 name='boxes' size={30} color={tintColor}/>
    }
  },
  AddDeck : {
    screen : AddDeck,
    navigationOptions : {
      tabBarLabel : 'Add Deck',
      tabBarIcon : ({tintColor}) => <MaterialCommunityIcons name='book-plus-multiple' size={30} color={tintColor}/>
    }
  },
}

const TabNavigatorConfig = {
  navigationOptions : {
    headerShown : true,
  },
  tabBarOptions : {
    activeTintColor : 'white',
    style : {
      height : Platform.OS === 'ios' ? 56 : 100,
      backgroundColor : '#333333',
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
