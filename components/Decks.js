//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage} from 'react-native'
//React Redux
import {connect} from 'react-redux'
//Actions
import {recieveDecks} from '../actions'
//App loading
import AppLoading from 'expo-app-loading'
//Import Data from api and helper calls
import {fetchDeckDetails} from '../utils/api'
import {formDeckOverview, formatDecks} from '../utils/helpers'

class Decks extends Component {
  state = {
    ready : false,
  }

  componentDidMount () {

    const {dispatch} = this.props

    fetchDeckDetails()
      .then((decks) => {
        return dispatch(recieveDecks(decks))
      })
        .then((decks)=>
          {
            if(decks){
              this.setState(() => ({
                ready : true,
              }))
            }
          })
  }

  render () {
    const {decks} = this.props
    const {ready} = this.state

    if(ready===false) {
      <AppLoading/>
    }

    return (
      <View style={styles.container}>
        {Object.keys(decks).map((key)=>{

          const deck = decks[key]

          return (
            <View key={deck.title} style={styles.item}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'Deck',
                {deck : deck.title}
              )}>
                <View>
                  <Text>{deck.title}</Text>
                  <Text>{deck.questions ? deck.questions.length : 0 } Cards</Text>
                </View>
              </TouchableOpacity>
            </View>)
        })}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item : {
    backgroundColor : 'white',
    borderRadius : Platform.OS === 'ios' ? 10 : 8,
    padding : 20,
    marginLeft : 10,
    marginRight : 10,
    marginTop : 17,
    justifyContent : 'center',
    shadowRadius : 3,
    shadowOpacity : 0.8,
    shadowColor : 'rgba(0,0,0,0.24)',
    shadowOffset : {
      width : 0,
      height : 3,
    },
  },
})

const mapStateToProps = (decks) => {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)
