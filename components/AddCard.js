//Import React and React Native
import React, {Component} from 'react'
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
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

    addDeckCardDetails(deckName,card)

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
    const {question,answer} = this.state

    return (
        <View  style={styles.container}>
          <Text>Enter Flash cards details</Text>
          <TextInput
            style={{ width : 200,height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder = 'Question'
            value={this.state.question}
            autoCapitalize = 'none'
            autoFocus={true}
            onSubmitEditing={() => this.answerTextInput.focus()}
            blurOnSubmit={false}
            onChangeText = {this.handleQuestion}/>
          <TextInput
            style={{ width : 200,height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder = 'Answer'
            autoCapitalize = 'none'
            ref={input => {
                  this.answerTextInput = input;
                }}
            onChangeText = {this.handleAnswer}/>
          <TextButton
            onPress={this.addDeckCard}
            disabled={this.state.question === '' || this.state.answer === ''}
            style={{margin : 20}}>
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
    justifyContent : 'center',
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
