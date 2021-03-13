export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_DECK_CARD = 'ADD_DECK_CARD'
export const REMOVE_DECK ='REMOVE_DECK'
export const RESET_DECKS = 'RESET_DECKS'
import {fetchDeckDetails} from '../utils/api'

export const recieveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck,
  }
}

export const addDeckCard = (deckName,card) => {
  return {
    type: ADD_DECK_CARD,
    deckName,
    card,
  }
}

export const removeDeck = (deckName) => {
  return {
    type: REMOVE_DECK,
    deckName,
  }
}

// export const handleInitialData = () => {
//   return (dispatch) => {
//     return retrieveDecks().then(decks => {
//       dispatch(receiveDecks(decks))
//     })
//   }
// }
