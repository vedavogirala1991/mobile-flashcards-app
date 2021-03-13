//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, Platform, ImageBackground,TouchableOpacity} from 'react-native'
//React Redux
import {connect} from 'react-redux'
import {removeDeck} from '../actions'
import {removeDeckDetails} from '../utils/api'
//UI Component
import TextButton from './TextButton'
import bgimage from '../images/bgimage.png'

class Deck extends Component {
  static navigationOptions = ({navigation}) => {
    const {deck} = navigation.state.params

    return {
      title : deck,
    }
  }

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
        <View style={styles.deckItem}>
          <ImageBackground  style={styles.violet } source={bgimage}>
            <View style={styles.borderline}>
              <Text style={styles.deckTitle}>{deck.title}</Text>
              <Text style={styles.deckCards}>{deck.questions.length} Cards</Text>
            </View>
            <TouchableOpacity onPress={()=>this.toQuiz()} style={styles.startQuizBtn}>
              <Text style={styles.quizBtnText}>START QUIZ</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.addCardSection}>
          <TouchableOpacity  onPress={()=>this.toAddCard()}>
            <Text style={styles.addCardBtn}>ADD CARD</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity  style={styles.deleteDeckBtn} onPress={()=>{this.removeDk()}}>
          <Text style={styles.deleteDeckBtnTxt}>DELETE DECK</Text>
        </TouchableOpacity>
      </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  deckItem : {
    backgroundColor : '#6608c1',
    height : 400,
    width : 320,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginLeft : 10,
    marginRight : 10,
    marginTop : 50,
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
  violet : {
    marginTop : -20,
    width : '100%',
    height : 420,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow : 'hidden',
  },
  deckTitle : {
    color : '#fff',
    fontSize : 25,
    fontWeight : 'bold',
    paddingTop : 100,
    marginTop : 20,
    alignSelf : 'center',
  },
  deckCards : {
    paddingTop: 20,
    marginTop : 20,
    alignSelf : 'center',
    color : 'white',
  },
  borderline : {
    alignSelf : 'center',
    paddingBottom : 30,
    width : 250,
    borderBottomColor: '#fff',
    borderBottomWidth: 3,
  },
  startQuizBtn : {
    backgroundColor : '#fff',
    alignSelf : 'center',
    width : 250,
    marginTop : 80,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  quizBtnText : {
    color : '#6608c1',
    alignSelf : 'center',
    padding : 18,
  },
  addCardSection : {
    backgroundColor : '#6608c1',
    alignSelf : 'center',
    width : 250,
    marginTop : 80,
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
  deleteDeckBtn : {
    marginTop : 50,
  },
  deleteDeckBtnTxt : {
    color : '#d90000',
    padding: 10,
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
