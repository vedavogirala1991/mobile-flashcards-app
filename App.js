//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
//Navigation imports
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
//UI Components
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import DeckDetails from './components/DeckDetails'



class App extends Component {

  render () {
    return (
      <View style={styles.container}>
        <Decks />
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
