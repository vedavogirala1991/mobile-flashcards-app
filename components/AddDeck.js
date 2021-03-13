//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Platform,ScrollView} from 'react-native'
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
import doodle2 from '../images/doodle2.png'

class AddDeck extends Component {
  state = {
    deckName : '',
  }
  componentDidMount() {
    this.setState(()=>({
      deckName : '',
    }))
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
    this.setState(()=>({
      deckName : '',
    }))
    dispatch(addDeck(deck))

    addDeckDetails(deckName)

    this.toHome()
  }


  render () {
    const {deckName} = this.state

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.borderline}>
            <Text style={styles.title}>Add a new Deck</Text>
          </View>
          <View style={styles.deckItem}>
            <ImageBackground style={styles.orange } source={doodle2}>
            <Text style={styles.deckQText}>What is the title of your new deck?</Text>
            <TextInput
              style={styles.addDeckInput}
              placeholder = 'Deck Title'
              autoCapitalize = 'none'
              onChangeText = {this.handleDeckName}/>
            </ImageBackground>
          </View>
          <View style={styles.addDeckSection}>
            <TouchableOpacity  onPress={()=>this.addDeck(deckName)}>
              <Text style={styles.addDeckBtn}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    height : '100%'
  },
  title : {
    width: 280,
    fontSize : 20,
    fontWeight : 'bold',
    color : '#6608c1',
    marginTop : 20,
    paddingTop : 10,
    marginBottom : 20,
  },
  borderline : {
    borderBottomColor: '#6608c1',
    borderBottomWidth: 3
  },
  deckItem : {
    backgroundColor : '#ffba3b',
    height : Platform.OS === 'ios' ? 300 : 340,
    width : Platform.OS === 'ios' ? 320 : 360,
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
  orange : {
    marginTop : -10,
    width : '100%',
    height : Platform.OS === 'ios' ? 300 : 340,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow : 'hidden',
    opacity : 0.6,
  },
  deckQText : {
    color : '#28034D',
    fontSize : 25,
    fontWeight : 'bold',
    paddingTop : 60,
    paddingLeft : 10,
    marginTop : 20,
    alignSelf : 'center',
  },
  addDeckInput : {
    width : 200,
    height: 40,
    borderColor : '#6608c1',
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
  addDeckSection : {
    backgroundColor : '#6608c1',
    alignSelf : 'center',
    width : 250,
    marginTop : 80,
    marginBottom : 80,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  addDeckBtn : {
    color : '#fff',
    alignSelf : 'center',
    padding : 18,
  },
})

const mapStateToProps = (state,{navigation}) => {
  return {
    state,
  }
}

export default connect(mapStateToProps)(AddDeck)
