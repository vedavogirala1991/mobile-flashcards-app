//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
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
      .then((decks) => dispatch(recieveDecks(decks)))
      .then(()=>this.setState(() => ({
          ready : true,
        })))
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
            <View key={deck.title}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'Details',
                {deck : deck.title}
              )}>
                <View>
                  <Text>{deck.title}</Text>
                  <Text>{deck.questions.length} Cards</Text>
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
})

const mapStateToProps = (decks) => {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)
