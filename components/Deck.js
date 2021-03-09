//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
//React Redux
import {connect} from 'react-redux'
//UI Component
import TextButton from './TextButton'

class Deck extends Component {
  render () {
    const {deck} = this.props
    console.log('Deck --- ',deck)

    return (
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} Cards</Text>
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

const mapStateToProps = (decks, {navigation}) => {
  const {deck} = navigation.state.params
  console.log('deck : ',deck)
  console.log('decks[deck] : ',decks[deck])
  return {
    deck : decks[deck]
  }
}

// const mapDispatchToProps = (dispatch, {navigation}) => {
//   const {entryId} = navigation.state.params
//
//   return {
//     remove : () => dispatch(addEntry({
//       [entryId] : timeToString() === entryId
//         ? getDailyReminderValue()
//         : new Array()
//     })),
//     goBack : () => navigation.goBack(),
//   }
// }

export default connect(mapStateToProps)(Deck)
