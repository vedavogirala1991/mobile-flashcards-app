//Import React and React Native
import React, {Component} from 'react'
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity,ImageBackground } from 'react-native'
//React Redux
import {connect} from 'react-redux'
import {addDeckCard} from '../actions'
//UI components
import TextButton from './TextButton'
//Add deck details API
import {addDeckCardDetails} from '../utils/api'
import bgimage2 from '../images/bgimage2.png'

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
            <View style={styles.borderline}>
              <Text style={styles.title}>Add a Card for your Deck</Text>
            </View>
            <View style={styles.cardItem}>
              <ImageBackground style={styles.gray } source={bgimage2}>
              <Text style={styles.cardQText}>Enter Flash card Question and Answer</Text>
              <TextInput
                style={styles.addCardInput}
                placeholder = 'Question'
                value={this.state.question}
                autoCapitalize = 'none'
                autoFocus={true}
                onSubmitEditing={() => this.answerTextInput.focus()}
                blurOnSubmit={false}
                onChangeText = {this.handleQuestion}/>
              <TextInput
                style={styles.addCardInput}
                placeholder = 'Answer'
                autoCapitalize = 'none'
                ref={input => {
                      this.answerTextInput = input;
                    }}
                onChangeText = {this.handleAnswer}/>
              </ImageBackground>
            </View>
          <View style={styles.addCardSection}>
            <TouchableOpacity
              onPress={this.addDeckCard}
              disabled={this.state.question === '' || this.state.answer === ''}>
              <Text style={styles.addCardBtn}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title : {
    width: 280,
    fontSize : 20,
    fontWeight : 'bold',
    color :  '#ce3e86',
    marginTop : 20,
    paddingTop : 10,
    marginBottom : 20,
  },
  borderline : {
    borderBottomColor:  '#ce3e86',
    borderBottomWidth: 3
  },
  cardItem : {
    backgroundColor : '#404040',
    height : Platform.OS === 'ios' ? 350 : 390,
    width : Platform.OS === 'ios' ? 320 : 360,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginLeft : 10,
    marginRight : 10,
    marginTop : 40,
    paddingTop : 10,
    justifyContent : 'center',
    shadowRadius : 3,
    shadowOpacity : 0.8,
    shadowColor : '#666666',
    shadowOffset : {
      width : 0,
      height : 3,
    },
  },
  gray : {
    marginTop : -10,
    width : '100%',
    height : Platform.OS === 'ios' ? 350 : 390,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow : 'hidden',
    opacity : 0.9,
  },
  cardQText : {
    color : '#fff',
    fontSize : 25,
    fontWeight : 'bold',
    paddingTop : 50,
    paddingLeft : 10,
    marginTop : 10,
    alignSelf : 'center',
  },
  addCardInput : {
    width : 200,
    height: 40,
    borderColor : '#ce3e86',
    borderWidth : 1,
    backgroundColor : '#fff',
    alignSelf : 'center',
    width : 250,
    marginTop : 60,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  addCardSection : {
    backgroundColor : '#ce3e86',
    alignSelf : 'center',
    width : 250,
    marginTop : 90,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  addCardBtn : {
    color : '#fff',
    alignSelf : 'center',
    padding : 18,
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
