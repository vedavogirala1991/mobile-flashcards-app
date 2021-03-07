import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'

import Deck from '../components/Deck'
import Decks from '../components/Decks'
import AddDeck from '../components/AddDeck'
import AddCard from '../components/AddCard'
import Quiz from '../components/Quiz'

export const HomeStack = createStackNavigator({
  Decks : Decks,
  DeckDetail : DeckStack,
},
{
  initialRouteName: 'Decks',
})

export const AddDeckStack = createStackNavigator({
  AddDeck : AddDeck,
  Decks : Decks,
},
{
  initialRouteName: 'AddDeck',
})

export const DeckStack = createStackNavigator({
  Deck : Deck,
  AddCard : AddCard,
  Quiz : Quiz,
},
{
  initialRouteName: 'Deck',
})
