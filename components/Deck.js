//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
//React Redux
import {connect} from 'react-redux'
import {removeDeck} from '../actions'
import {removeDeckDetails} from '../utils/api'
//UI Component
import TextButton from './TextButton'

class Deck extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }

  toAddCard = () => {
    const {goToAddCard} = this.props
    goToAddCard()
  }

  toQuiz = () => {
    const {goToQuiz} = this.props
    goToQuiz()
  }

  removeDk = () => {
    const {remove, goBack,deck} = this.props
    remove()
    goBack()
    //Route to home
    removeDeckDetails(deck.title)
  }

  toHome = () => {
    this.props.navigation.navigate('Decks')
  }

  render () {
    const {deck} = this.props

    return (
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} Cards</Text>
        <TextButton onPress={()=>this.toAddCard()} style={{margin : 20}}>
          Add Card
        </TextButton>
        <TextButton onPress={()=>this.toQuiz()} style={{margin : 20}}>
          Start Quiz
        </TextButton>
        <TextButton onPress={()=>{this.removeDk()}} style={{margin : 20}}>
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
  return {
    deck : decks[deck],
    decks,
  }
}

const mapDispatchToProps = (dispatch, {navigation}) => {
  const {deck} = navigation.state.params

  return {
    remove : () => dispatch(removeDeck(deck)),
    goBack : () => navigation.goBack(),
    goToQuiz : () => navigation.navigate('Quiz',{deck}),
    goToAddCard : () => navigation.navigate('AddCard',{deck})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Deck)
