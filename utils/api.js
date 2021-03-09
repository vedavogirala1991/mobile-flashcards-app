import { AsyncStorage } from 'react-native'
import {retrieveDecks,addDeck,FLASHCARDS_STORAGE_KEY} from './_decks'

export const fetchDeckDetails = () => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(retrieveDecks)
}

export const fetchDeck = (deckName) => {
  console.log('fetchDeck : deckName : ',deckName)
  const decks = JSON.parse(AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY))
  console.log('fetchDeck : deckName : ',deckName)
  console.log('fetchDeck : decks : ',decks)
  return decks[deckName]
}

export const addDeckDetails = (deck) => {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY,
    JSON.stringify({deck}))
}

export const addDeckCardDetails = (deckName,card) => {
  console.log('addDeckCardDetails : deckName : ',deckName)
  console.log('addDeckCardDetails : card : ',card)
  const deck = fetchDeck(deckName)
  console.log('addDeckCardDetails : deck : ',deck)
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY,
    JSON.stringify({
      [deckName] : {
        questions : [...deck.questions].concat(card)
      }
    })
  )
}
