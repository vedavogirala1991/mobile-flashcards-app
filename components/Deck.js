//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

class Deck extends Component {
  render () {
    const {deck, navigation} = this.props

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate(
          'DeckDetails',
          {deck : deck}
        )}>
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
