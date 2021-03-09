//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
//React Redux
import {connect} from 'react-redux'
import {addDeckCard} from '../actions'
//UI components
import TextButton from './TextButton'
//Add deck details API
import {addDeckCardDetails} from '../utils/api'

class AddCard extends Component {
  state = {
    question : '',
    answer : '',
  }

  handleQuestion = (question) => {
    this.setState(()=> ({
      question,
    }))
  }

  handleAnswer = (answer) => {
    this.setState(()=> ({
      answer,
    }))
  }

  addDeckCard = () => {
    const {dispatch,deckName} = this.props

    const card = {
      question: this.state.question,
      answer: this.state.answer
    }

    this.toDeck()

    dispatch(addDeckCard(deckName,card))

    addDeckCardDetails(deckName,card,this.props.decks)

    this.setState(()=>({
      question : '',
      answer : '',
    }))

  }

  toDeck = () => {
    this.props.navigation.navigate('Deck',{
      deck : this.props.deckName
    })
  }



  render () {
    const {deckName} = this.props
    console.log('Deck Name : ',deckName)
    const {question,answer} = this.state

    console.log('Deck question : ',question)
    console.log('Deck answer : ',answer)

    return (
      <View style={styles.container}>
        <Text>Enter Flash cards details</Text>
        <TextInput
          style={{ width : 200,height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder = 'Question'
          placeholderTextColor = '#9a73ef'
          autoCapitalize = 'none'
          onChangeText = {this.handleQuestion}/>
        <TextInput
          style={{ width : 200,height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder = 'Answer'
          placeholderTextColor = '#9a73ef'
          autoCapitalize = 'none'
          onChangeText = {this.handleAnswer}/>
        <TextButton onPress={this.addDeckCard} style={{margin : 20}}>
          Submit
        </TextButton>
      </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = (decks, {navigation}) => {
  const {deck} = navigation.state.params

  return {
    deckName : decks[deck].title,
    decks,
  }
}

export default connect(mapStateToProps)(AddCard)
