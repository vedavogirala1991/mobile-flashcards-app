//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
//Navigation imports
import { createAppContainer } from 'react-navigation';
//Expo imports
import Constants from 'expo-constants'
//UI Components
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Deck from './components/Deck'
//App Navigation
import MainNavigator from './routes/MainNavigator'

const FlashCardsStatusBar = ({backgroundColor,...props}) => {
  return (
    <View style={{backgroundColor, height : Constants.statusBarHeight}}>
      <StatusBar translucent bankgroundColor={backgroundColor} {...props} />
    </View>
  )
}


class App extends Component {

  render () {
    return (
      <View style={styles.container}>
        <FlashCardsStatusBar backgroundColor={'#292477'} barStyle='light-content' />
        <MainNavigator/>
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
