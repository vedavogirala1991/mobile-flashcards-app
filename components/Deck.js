//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'

class Deck extends Component {
  render () {
    const deck = this.props.deck

    return (
      <View style={styles.container}>
      <TouchableOpacity onPress={console.log('on press deck')}>
        <Text>{deck.title}</Text>
        <Text>{deck.count} Cards</Text>
      </TouchableOpacity>
      </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})

export default Deck
