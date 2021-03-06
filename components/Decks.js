//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
//Import Data from api and helper calls
import {fetchDeckDetails} from '../utils/api'
import {formDeckOverview} from '../utils/helpers'

class Decks extends Component {
  state = {
    decks : {},
  }

  componentDidMount () {
    const decks = fetchDeckDetails()

    this.setState(() => ({
      decks,
    }))
  }

  render () {
    const {decks} = this.state

    console.log('render : ',decks)


    return (
      <View style={styles.container}>
        {Object.entries(decks).map((deck)=>{
          let deckDet = formDeckOverview(deck)

          return (
            <View key={deckDet.title}>
              <Text>{deckDet.title}</Text>
              <Text>{deckDet.count} Cards</Text>
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

export default Decks
