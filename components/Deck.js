//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
//UI Component
import TextButton from './TextButton'

class Deck extends Component {
  render () {
    const {deck} = this.props.navigation.state.params
    console.log('Deck --- ',deck)

    return (
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{deck.count} Cards</Text>
        <TextButton onPress={this.props.navigation.navigate('AddCard')} style={{margin : 20}}>
          Add Card
        </TextButton>
        <TextButton onPress={console.log('On Press')} style={{margin : 20}}>
          Start Quiz
        </TextButton>
        <TextButton onPress={console.log('On Press')} style={{margin : 20}}>
          Delete Deck
        </TextButton>
      </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems : 'center',
    justifyContent: 'center',
  },
})

export default Deck
