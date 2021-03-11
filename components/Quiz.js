//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import TextButton from './TextButton'
import Results from './Results'
import {formatCards} from '../utils/helpers'
import {connect} from 'react-redux'

const SCREEN_WIDTH = Dimensions.get('window').width;

class Quiz extends Component {
  state = {
    cards : Array(this.props.deck.questions.length),
    count : 0,
    correct : 0,
    incorrect : 0,
  }

  componentDidMount(){
    const {deck} = this.props
    const count = deck.questions.length
    const cards = formatCards(deck)
    this.setState(()=>({
      cards,
      count,
    }))
  }


  answered = (answer,index) => {
    this.setState((state) => ({
      correct : answer==='correct' ? state.correct + 1 : state.correct,
      incorrect : answer==='incorrect' ? state.incorrect + 1 : state.incorrect,
      cards: state.cards.map((card) => {
        if(card.index===index)
        {
          card.answered = true
        }
        return card
      }),
    }))
    this.scrollView.scrollTo({ x: (index + 1) * SCREEN_WIDTH });
  }

  toggleDisplay = (display,index) => {
    this.setState((state) => ({
      cards: state.cards.map((card) => {
        if(card.index===index)
        {
          card.display = display
        }
        return card
      }),
    }))
  }

  goToDeck = () => {
    const {navigation,deck} = this.props
    this.reset()
    navigation.navigate('Deck',{deck : deck.title})
  }

  goToHome = () => {
    const {navigation} = this.props
    this.reset()
    navigation.navigate('Decks')
  }

  reset = () => {
    this.setState(()=>({
      cards : Array(this.props.deck.questions.length),
      count : 0,
      correct : 0,
      incorrect : 0,
    }))
  }

  retakeQuiz = () => {
    console.log('--- retakeQuiz ---')
    this.setState(()=>({
      cards : formatCards(this.props.deck),
      count : this.props.deck.questions.length,
      correct : 0,
      incorrect : 0,
    }))
  }

  render () {
    const {correct,incorrect,cards,count} = this.state

    if (this.props.deck.questions.length === 0) {
      return (
        <View>
          <View>
            <Text>
              You cannot take a quiz because there are no cards in the deck.
            </Text>
            <Text>
              Please add some cards and try again.
            </Text>
            <TextButton
              onPress={() => this.goToDeck()}>
              Back To Deck
            </TextButton>
            <TextButton
              onPress={() => this.goToHome()}>
              Home
            </TextButton>
          </View>
        </View>
      )
    }

    if(correct+incorrect===count && count!==0) {
      return <Results
        deck = {this.props.deck.title}
        reset = {this.retakeQuiz}
        home = {this.goToHome}
        back= {this.goToDeck}
        correct={correct}
        count={count}
        navigation={this.props.navigation}/>
    }

    return (
      <ScrollView
        pagingEnabled={true}
        horizontal={true}
        ref={scrollView => {
          this.scrollView = scrollView;
        }}>
        {cards.map((card, index) => (
          <View style={styles.pageStyle} key={index}>
            <View>
              <Text>
                {index + 1} / {cards.length}
              </Text>
            </View>
            <View>
              <Text>
                {card.display === 'question' ? 'Question' : 'Answer'}
              </Text>
              <View>
                <Text>
                  {card.display === 'question'
                    ? card.question
                    : card.answer}
                </Text>
              </View>
            </View>
            {card.display === 'question'
            ? (<TextButton
                style={{ color: 'red' }}
                onPress={() => this.toggleDisplay('answer',index)}>
                Show Answer
              </TextButton>)
            : (<TextButton
                style={{ color: 'red' }}
                onPress={() => this.toggleDisplay('question',index)}>
                Show Question
              </TextButton>)}
            <View>
              <TextButton
                style={{ backgroundColor: 'green', borderColor: 'white' }}
                onPress={() => this.answered('correct', index)}>
                Correct
              </TextButton>
              <TextButton
                style={{ backgroundColor: 'red', borderColor: 'white' }}
                onPress={() => this.answered('incorrect', index)}>
                Incorrect
              </TextButton>
            </View>
          </View>
        ))}
      </ScrollView>
    )


  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems : 'center',
    justifyContent: 'center',
  },
  pageStyle: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    justifyContent: 'space-around',
    width: SCREEN_WIDTH
  }
})

const mapStateToProps = (decks,{navigation}) => {
  const {deck} = navigation.state.params
  return {
    deck : decks[deck],
  }
}

export default connect(mapStateToProps)(Quiz)
