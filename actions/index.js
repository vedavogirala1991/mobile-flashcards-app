export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
import {fetchDeckDetails} from '../utils/api'

export const recieveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export const addDeck = (deck) => {
  console.log('Actions deck : ',deck)
  return {
    type: ADD_DECK,
    deck,
  }
}
