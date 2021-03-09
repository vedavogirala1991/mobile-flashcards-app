//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
//React Redux
import {connect} from 'react-redux'
//UI Component
import TextButton from './TextButton'

class Deck extends Component {

  toAddCard = (title) => {
    this.props.navigation.navigate('AddCard',{
      deck : title
    })
  }

  render () {
    const {deck} = this.props
    console.log('Deck --- ',deck)

    return (
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} Cards</Text>
        <TextButton onPress={()=>this.toAddCard(deck.title)} style={{margin : 20}}>
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

export default connect(mapStateToProps)(Deck)
