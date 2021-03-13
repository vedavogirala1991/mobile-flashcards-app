//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
//React Redux
import reducer from './reducers'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
//Expo imports
import Constants from 'expo-constants'
//App Navigation
import Navigator from './routes/StackNavigator'
import {setLocalNotification} from './utils/helpers'

const FlashCardsStatusBar = ({backgroundColor,...props}) => {
  return (
    <View style={{backgroundColor, height : Constants.statusBarHeight}}>
      <StatusBar translucent bankgroundColor={backgroundColor} {...props} />
    </View>
  )
}

class App extends Component {
  componentDidMount () {
    setLocalNotification()
  }

  render () {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <FlashCardsStatusBar backgroundColor={'#333333'} barStyle='light-content' />
          <Navigator/>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
