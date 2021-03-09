import { AsyncStorage } from 'react-native'
import {retrieveDecks,addDeck,FLASHCARDS_STORAGE_KEY} from './_decks'

export const fetchDeckDetails = () => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(retrieveDecks)
}

export const fetchDeck = (deckName) => {
  console.log('fetchDeck : deckName : ',deckName)
  const decks = AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  console.log('fetchDeck : decks : ',decks)
  return decks[deckName]
}

export const addDeckDetails = (deck) => {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY,
    JSON.stringify({deck}))
}

export const addDeckCardDetails = (deckName,card,decks) => {
  console.log('addDeckCardDetails : deckName : ',deckName)
  console.log('addDeckCardDetails : card : ',card)
  const deck = decks[deckName]
  console.log('addDeckCardDetails : deck : ',deck)
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY,
    JSON.stringify({
      [deckName] : {
        questions : [...deck.questions].concat(card)
      }
    })
  )
}

export const removeDeckDetails = (title) => {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[title] = undefined
      delete data[title]
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY,JSON.stringify(data))
    })
}
