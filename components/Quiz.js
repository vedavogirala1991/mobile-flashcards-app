//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions,TouchableOpacity, TouchableHighlight, ImageBackground } from 'react-native'
import {FontAwesome,Icon} from '@expo/vector-icons'
import TextButton from './TextButton'
import Results from './Results'
import {formatCards,
  setLocalNotification,
  clearLocalNotification} from '../utils/helpers'
import {connect} from 'react-redux'
import bgimage3 from '../images/bgimage3.png'

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
          <View style={{alignItems : 'center',marginTop : 50}}>
            <Text style={styles.noCardTitle}>
              Oops no cards on deck!!
            </Text>
            <View style={styles.noCardInfoSection}>
              <FontAwesome name='warning' size={24} color='#ffbf00' style={{paddingLeft : 10,}}/>
              <Text style={styles.noCardInfo}>
                You cannot take a quiz because there are no cards in the deck.
                Please add some cards and try again.
              </Text>
            </View>
          </View>
          <View style={styles.backToDeckSection}>
            <TouchableOpacity
              onPress={() => {this.goToDeck()}}>
              <Text style={styles.backToDeckBtn}>BACK TO DECK</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity  style={styles.homeBtn}
            onPress={() => {this.goToHome()}}>
            <Text style={styles.homeBtnTxt}>HOME</Text>
          </TouchableOpacity>
        </View>
      )
    }

    if(correct+incorrect===count && count!==0) {
      clearLocalNotification()
      .then(setLocalNotification())
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
              <View style={styles.cardNumbers}>
                <Text style={styles.cardNumText}>{index + 1} / {cards.length}</Text>
              </View>
              <View>
                <Text style={styles.cardDeckTitle}>{this.props.deck.title}</Text>
              </View>
            <View style={styles.deckItem}>
              <ImageBackground style={styles.orange } source={bgimage3}>
              <View style={styles.cardType}>
                <Text style={{fontWeight : 'bold',fontSize : 20,color:'#fff'}}>
                  {card.display === 'question' ? 'Question' : 'Answer'}:
                </Text>
              </View>
              <View style={styles.cardDisplay}>
                <Text style={{fontWeight : 'bold',fontSize : 20, color : '#28034D'}}>
                  {card.display === 'question'
                    ? card.question
                    : card.answer}
                </Text>
              </View>
              {card.display === 'question'
                ? (<TouchableOpacity
                    style={styles.startQuizBtn}
                    onPress={() => this.toggleDisplay('answer',index)}>
                    <Text style={styles.quizBtnText}>Click here to see Answer</Text>
                  </TouchableOpacity>)
                : (<TouchableOpacity
                    style={styles.startQuizBtn}
                    onPress={() => this.toggleDisplay('question',index)}>
                    <Text style={styles.quizBtnText}>Click here to see Question</Text>
                  </TouchableOpacity>)}
                </ImageBackground>
            </View>
            <View>
              <TouchableHighlight
                style={styles.correctBtn}
                onPress={() => this.answered('correct', index)}>
                <View style={styles.iconBtn}><FontAwesome name='check' size={20} color='#fff' /><Text style={styles.correctText}>CORRECT</Text></View>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.inCorrectBtn}
                onPress={() => this.answered('incorrect', index)}>
                <View style={styles.iconBtn}><FontAwesome name='remove' size={20} color='#fff' style={{paddingLeft:5}}/><Text style={styles.inCorrectText}>INCORRECT</Text></View>
              </TouchableHighlight>
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
  },
  borderline : {
    borderBottomColor: '#fff',
    borderBottomWidth: 3
  },
  deckItem : {
    backgroundColor : '#ffba3b',
    height : Platform.OS === 'ios' ? 350 : 400,
    width : Platform.OS === 'ios' ? 320 : 360,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginLeft : 10,
    marginRight : 10,
    marginTop : 10,
    justifyContent : 'center',
    shadowRadius : 3,
    shadowOpacity : 0.8,
    shadowColor : '#666666',
    shadowOffset : {
      width : 0,
      height : 3,
    },
  },
  orange : {
    marginTop : -10,
    width : '100%',
    height : Platform.OS === 'ios' ? 350 : 400,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow : 'hidden',
  },
  pageStyle: {
    flex: 1,
    alignItems : 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 16,
    backgroundColor : '#fff',
    width: SCREEN_WIDTH
  },
  quizContainer : {
    alignSelf : 'center',
    paddingLeft : 10,
    paddingRight:10,
  },
  startQuizBtn : {
    backgroundColor : '#fff',
    alignSelf : 'center',
    width : 250,
    marginTop : 80,
    height : 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cardNumbers : {
    height : 40,
    width : 40,
    marginLeft : 10,
    marginRight:10,
    borderRadius : 20,
    backgroundColor : '#c6c6c6',
  },
  cardNumText : {
    color : '#fff',
    paddingTop : 12,
    paddingLeft : 8,
    fontWeight : 'bold',
  },
  cardDeckTitle : {
    alignSelf : 'center',
    fontSize : 20,
    fontWeight : 'bold',
    color : '#6608c1',
    paddingTop : 10,
    marginBottom : 20,
  },
  cardType : {
    height : 50,
    padding : 10,
    marginTop : 20,
    alignSelf : 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 3
  },
  cardDisplay : {
    alignSelf : 'center',
    color : '#28034D',
    marginTop : 30,
    paddingTop : 30,
    padding : 20,
    margin: 10,
  },
  toggleButton : {
    alignSelf : 'center',
    paddingTop : 15,
  },
  correctBtn : {
    marginTop : 40,
    height : 50,
    backgroundColor : 'green',
    borderColor : '#fff',
    borderRadius : 6,
    borderWidth : 2,
  },
  iconBtn : {
    flexDirection : 'row',
    alignItems : 'center',
    alignSelf: 'center',
    padding : 5,
    paddingTop : 12,
  },
  correctText : {
    color : '#fff',
    paddingLeft : 15,
    fontSize : 20,
    fontWeight : 'bold',
  },
  inCorrectBtn : {
    marginTop : 20,
    height : 50,
    backgroundColor : '#d90000',
    borderColor : '#fff',
    borderRadius : 6,
    borderWidth : 2,
  },
  inCorrectText : {
    color : '#fff',
    paddingLeft : 15,
    fontSize : 20,
    fontWeight : 'bold',
  },
  backToDeckSection : {
    backgroundColor : '#6608c1',
    alignSelf : 'center',
    width : 250,
    marginTop : 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  backToDeckBtn : {
    color : '#fff',
    alignSelf : 'center',
    padding : 18,
  },
  homeBtn : {
    width : 250,
    alignItems : 'center',
    alignSelf : 'center',
    marginTop : 50,
    borderColor : '#6608c1',
    borderWidth : 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  homeBtnTxt : {
    color : '#6608c1',
    padding : 18,
  },
  noCardTitle : {
    fontWeight : 'bold',
    fontSize : 20,
    color : '#ce3e86',
  },
  noCardInfo : {
    fontSize : 16,
    color : '#fff',
    paddingLeft : 20,
  },
  noCardInfoSection : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    marginTop : 50,
    marginLeft : 20,
    paddingLeft : 20,
    paddingRight : 20,
    marginRight : 20,
    height : 100,
    backgroundColor: '#474747',
    borderWidth : 2,
    borderColor : '#474747',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  quizBtnText : {
    color : '#333',
    alignSelf : 'center',
    padding : 18,
  },
})

const mapStateToProps = (decks,{navigation}) => {
  const {deck} = navigation.state.params
  return {
    deck : decks[deck],
  }
}

export default connect(mapStateToProps)(Quiz)
