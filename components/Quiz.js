//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import TextButton from './TextButton'
import Results from './Results'
import {formatCards} from '../utils/helpers'
import {connect} from 'react-redux'

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
    this.updateScore()
  }

  updateScore = () => {
    if((this.state.correct + this.state.incorrect) === this.state.count){
      this.props.updateScore(correct,incorrect)
    }
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

  render () {
    const {correct,incorrect,cards,count} = this.state
    if(correct+incorrect===count){
      return <Results/>
    }

    return (
      <ScrollView
        pagingEnabled={true}
        horizontal={true}
        onMomentumScrollBegin={this.handleScroll}
        ref={scrollView => {
          this.scrollView = scrollView;
        }}
      >
        {cards.map((card, index) => (
          <View key={index}>
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
      </ScrollView>)
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

const mapStateToProps = (decks,{navigation}) => {
  const {deck} = navigation.state.params
  return {
    deck : decks[deck],
  }
}

export default connect(mapStateToProps)(Quiz)
