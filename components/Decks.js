//Import React and React Native
import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, ImageBackground} from 'react-native'
import {Fontisto} from '@expo/vector-icons'
//React Redux
import {connect} from 'react-redux'
//Actions
import {recieveDecks} from '../actions'
//App loading
import AppLoading from 'expo-app-loading'
//Import Data from api and helper calls
import {fetchDeckDetails} from '../utils/api'
import doodle from '../images/doodle.png'


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
        <View style={styles.borderline}>
          <Text style={styles.title}>Decks</Text>
        </View>
        {Object.keys(decks).map((key)=>{

          const deck = decks[key]

          return (
            <View key={deck.title} style={styles.item}>
              <ImageBackground  style= { styles.backgroundImage } source={doodle}>
              <Fontisto name='favorite' size={30} color={'#fff'} style={styles.favorite}/>
              <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'Deck',
                {deck : deck.title}
              )}>
                <View>
                  <Text style={styles.deckTitle}>{deck.title}</Text>
                  <Text style={styles.deckCards}>{deck.questions ? deck.questions.length : 0 } Cards</Text>
                </View>
              </TouchableOpacity>
              </ImageBackground>
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
  favorite : {
    alignSelf : 'flex-end',
    paddingRight : 15,
    marginTop : -47,
  },
  item : {
    backgroundColor : '#e54595',
    height : 120,
    width : 320,
    borderRadius : 10,
    marginLeft : 10,
    marginRight : 10,
    marginTop : 30,
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
  deckTitle : {
    color : '#fff',
    fontSize : 25,
    marginTop : 10,
    fontWeight : 'bold',
    width : 200,
  },
  deckCards : {
    paddingTop: 5,
    color : 'white',
    paddingLeft : 10,
  },
  backgroundImage : {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop : -10,
    justifyContent: "center",
    alignItems: "center",
  },
  borderline : {
    borderBottomColor: '#6608c1',
    borderBottomWidth: 3
  }
})

const mapStateToProps = (decks) => {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)
