//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
//Navigation imports
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
//Expo imports
import Constants from 'expo-constants'
//Icons
import { FontAwesome, Ionicons } from '@expo/vector-icons'
//UI Components
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import DeckDetails from './components/DeckDetails'

const FlashCardsStatusBar = ({backgroundColor,...props}) => {
  return (
    <View style={{backgroundColor, height : Constants.statusBarHeight}}>
      <StatusBar translucent bankgroundColor={backgroundColor} {...props} />
    </View>
  )
}

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

const Tabs = createBottomTabNavigator(TabRouteConfigs,TabNavigatorConfig)

const MainNav = createAppContainer(createStackNavigator({
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
  DeckDetails : {
    screen : DeckDetails,
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

class App extends Component {

  render () {
    return (
      <View style={styles.container}>
        <FlashCardsStatusBar backgroundColor={'#292477'} barStyle='light-content' />
        <MainNav />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
