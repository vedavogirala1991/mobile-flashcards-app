//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import TextButton from './TextButton'

class Results extends Component {

  goToDeck = () => {
    const {navigation,deck} = this.props
    navigation.navigate('Deck',{deck})
  }

  goToHome = () => {
    const {navigation,deck} = this.props
    navigation.navigate('Decks')
  }

  render () {
    const {correct,count,navigation,deck,reset} = this.props
    const score = Math.round((correct/count)*100)
    console.log('score - ',score)

    return (
      <View style={styles.container}>

        <Text>Quiz Complete!</Text>
        <Text>{correct}/{count}</Text>
        <Text>Scored</Text>
        <Text>{score}</Text>
        <TextButton
          onPress={() => reset()}>
          Retake Quiz
        </TextButton>
        <TextButton
          onPress={() => this.goToDeck()}>
          Back To Deck
        </TextButton>
        <TextButton
          onPress={() => this.goToHome()}>
          Home
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

export default Results
