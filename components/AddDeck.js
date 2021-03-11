//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import {NavigationActions} from 'react-navigation'
//Add deck details API
import {addDeckDetails} from '../utils/api'

import {formatDeck} from '../utils/helpers'
//Action
import {addDeck} from '../actions'
//React Redux
import {connect} from 'react-redux'
//UI components
import TextButton from './TextButton'

class AddDeck extends Component {
  state = {
    deckName : '',
  }
  handleDeckName = (text) => {
    this.setState(()=> ({
      deckName : text,
    }))
  }

  toHome = () => {
    this.props.navigation.navigate('Decks')
  }

  addDeck = (deckName) => {
    const {dispatch} = this.props

    const deck = formatDeck(deckName)

    dispatch(addDeck(deck))

    addDeckDetails(deckName)

    this.toHome()
    this.setState(()=>({
      deckName : '',
    }))
  }


  render () {
    const {deckName} = this.state

    return (
      <View style={styles.container}>
        <Text>Enter the Deck Name</Text>
        <TextInput
          style={{ width : 200,height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder = 'Deck Name'
          placeholderTextColor = '#9a73ef'
          autoCapitalize = 'none'
          onChangeText = {this.handleDeckName}/>
        <TextButton
          onPress={()=>this.addDeck(deckName)}
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
    justifyContent: 'center',
  },
})

const mapStateToProps = (state,{navigation}) => {
  return {
    state,
  }
}

export default connect(mapStateToProps)(AddDeck)
